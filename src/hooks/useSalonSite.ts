"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { galleryImgUrls, serviceData, TEAM } from "@/lib/salon-data";

export type BookingLocation = "lindenau" | "seetal" | null;

export type BookingService = {
  id: string;
  name: string;
  price: string;
} | null;

export type BookingState = {
  location: BookingLocation;
  service: BookingService;
  stylist: string | null;
  date: Date | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
};

type CalDay = {
  key: string;
  dayNum: string;
  onClick: (() => void) | null;
  cellStyle: React.CSSProperties;
};

type TimeSlot = {
  time: string;
  onClick: () => void;
  slotStyle: React.CSSProperties;
};

type ServiceItem = (typeof serviceData)[number] & {
  onClick: () => void;
  itemStyle: React.CSSProperties;
};

type StylistItem = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imgStyle: React.CSSProperties;
  onClick: () => void;
  cardStyle: React.CSSProperties;
};

type GalleryImage = {
  src: string;
  bgStyle: React.CSSProperties;
  onClick: () => void;
};

function freshBooking() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return {
    bookingOpen: true,
    bookingStep: 1,
    booking: {
      location: null,
      service: null,
      stylist: null,
      date: null,
      time: null,
      name: "",
      email: "",
      phone: "",
    } as BookingState,
    calendarMonth: t.getMonth(),
    calendarYear: t.getFullYear(),
  };
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 72,
      behavior: "smooth",
    });
  }
}

export function useSalonSite() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    location: null,
    service: null,
    stylist: null,
    date: null,
    time: null,
    name: "",
    email: "",
    phone: "",
  });
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (galleryOpen) setGalleryOpen(false);
        else if (bookingOpen) setBookingOpen(false);
      }
      if (galleryOpen) {
        const n = galleryImgUrls.length;
        if (e.key === "ArrowLeft") {
          setGalleryIndex((i) => (i - 1 + n) % n);
        }
        if (e.key === "ArrowRight") {
          setGalleryIndex((i) => (i + 1) % n);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen, bookingOpen]);

  useEffect(() => {
    document.body.style.overflow = bookingOpen || galleryOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen, galleryOpen]);

  const openBooking = useCallback(() => {
    const fb = freshBooking();
    setBookingOpen(fb.bookingOpen);
    setBookingStep(fb.bookingStep);
    setBooking(fb.booking);
    setCalendarMonth(fb.calendarMonth);
    setCalendarYear(fb.calendarYear);
  }, []);

  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const backStep = useCallback(
    () => setBookingStep((s) => Math.max(1, s - 1)),
    [],
  );

  const selectLindenau = useCallback(() => {
    setBooking((b) => ({ ...b, location: "lindenau" }));
    setBookingStep(2);
  }, []);

  const selectSeetal = useCallback(() => {
    setBooking((b) => ({ ...b, location: "seetal" }));
    setBookingStep(2);
  }, []);

  const selectLindenauFromContact = useCallback(() => {
    const fb = freshBooking();
    setBookingOpen(fb.bookingOpen);
    setBookingStep(2);
    setBooking({ ...fb.booking, location: "lindenau" });
    setCalendarMonth(fb.calendarMonth);
    setCalendarYear(fb.calendarYear);
  }, []);

  const selectSeetalFromContact = useCallback(() => {
    const fb = freshBooking();
    setBookingOpen(fb.bookingOpen);
    setBookingStep(2);
    setBooking({ ...fb.booking, location: "seetal" });
    setCalendarMonth(fb.calendarMonth);
    setCalendarYear(fb.calendarYear);
  }, []);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const firstWeekday = (new Date(calendarYear, calendarMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const monthName = new Date(calendarYear, calendarMonth).toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });
  const canGoPrev = !(calendarMonth === today.getMonth() && calendarYear === today.getFullYear());

  const emptyCell: React.CSSProperties = {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const calDays: CalDay[] = useMemo(() => {
    const days: CalDay[] = [];
    for (let i = 0; i < firstWeekday; i++) {
      days.push({ key: "e" + i, dayNum: "", onClick: null, cellStyle: emptyCell });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(calendarYear, calendarMonth, d);
      const disabled = dt < today || dt.getDay() === 0;
      const isSel = booking.date && booking.date.toDateString() === dt.toDateString();
      const isToday = dt.toDateString() === today.toDateString();
      const day = d;
      days.push({
        key: "d" + d,
        dayNum: String(d),
        onClick: !disabled
          ? () =>
              setBooking((b) => ({
                ...b,
                date: new Date(calendarYear, calendarMonth, day),
                time: null,
              }))
          : null,
        cellStyle: {
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          cursor: disabled ? "default" : "pointer",
          background: isSel ? "#C4674A" : "transparent",
          color: disabled ? "#D5CCC6" : isSel ? "#fff" : isToday ? "#C4674A" : "#1A1410",
          fontSize: "14px",
          fontWeight: isToday && !isSel ? "500" : "400",
          border:
            isToday && !isSel ? "1px solid rgba(196,103,74,0.45)" : "1px solid transparent",
          transition: "all 0.15s",
          fontFamily: "'DM Sans',sans-serif",
        },
      });
    }
    return days;
  }, [firstWeekday, daysInMonth, calendarYear, calendarMonth, booking.date, today, emptyCell]);

  const timeSlots: TimeSlot[] = useMemo(
    () =>
      ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(
        (t) => ({
          time: t,
          onClick: () => setBooking((b) => ({ ...b, time: t })),
          slotStyle: {
            padding: "11px 4px",
            textAlign: "center" as const,
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "300",
            fontFamily: "'DM Sans',sans-serif",
            border: `1px solid ${booking.time === t ? "#C4674A" : "#E5DDD4"}`,
            background: booking.time === t ? "#C4674A" : "transparent",
            color: booking.time === t ? "#fff" : "#1A1410",
            transition: "all 0.15s",
          },
        }),
      ),
    [booking.time],
  );

  const servicesList: ServiceItem[] = useMemo(
    () =>
      serviceData.map((svc) => ({
        ...svc,
        onClick: () => {
          setBooking((b) => ({
            ...b,
            service: { id: svc.id, name: svc.name, price: svc.price },
          }));
          setBookingStep(3);
        },
        itemStyle: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 18px",
          cursor: "pointer",
          transition: "all 0.15s",
          border: `1px solid ${booking.service?.id === svc.id ? "#C4674A" : "#E5DDD4"}`,
          background:
            booking.service?.id === svc.id ? "rgba(196,103,74,0.06)" : "#FEFCFA",
        },
      })),
    [booking.service],
  );

  const stylists: StylistItem[] = useMemo(
    () =>
      TEAM.map((member) => ({
        id: member.id,
        name: member.name,
        specialty: member.specialty,
        bio: member.bookingBio,
        imgStyle: {
          width: "96px",
          height: "116px",
          backgroundImage: `url('${member.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          flexShrink: "0",
        },
        onClick: () => {
          setBooking((b) => ({ ...b, stylist: member.name }));
          setBookingStep(4);
        },
        cardStyle: {
          border: `2px solid ${booking.stylist === member.name ? "#C4674A" : "#E5DDD4"}`,
          cursor: "pointer",
          overflow: "hidden",
          background: "#FEFCFA",
          transition: "border-color 0.2s",
        },
      })),
    [booking.stylist],
  );

  const canStep4 = !!booking.date && !!booking.time;
  const canStep5 = !!(booking.name.trim() && booking.email.trim());

  const bookingDateStr = booking.date
    ? booking.date.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const stepTitles = [
    "Standort wählen",
    "Leistung wählen",
    "Stylistin wählen",
    "Datum & Uhrzeit",
    "Ihre Kontaktdaten",
    "Demo-Hinweis",
  ];

  const bookingLocationStr =
    booking.location === "lindenau"
      ? "Lindenau"
      : booking.location === "seetal"
        ? "Seetal"
        : "";

  const goToStep5 = useCallback(() => {
    if (canStep4) setBookingStep(5);
  }, [canStep4]);

  const goToStep6 = useCallback(async () => {
    if (!canStep5 || !booking.service || !booking.date || !booking.time || !booking.location) {
      return;
    }

    // Demo-Referenzprojekt: keine echte Buchung speichern
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    setBookingStep(6);
  }, [canStep5, booking]);

  const prevMonth = useCallback(() => {
    if (!canGoPrev) return;
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  }, [canGoPrev, calendarMonth]);

  const nextMonth = useCallback(() => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  }, [calendarMonth]);

  const galleryImages: GalleryImage[] = useMemo(
    () =>
      galleryImgUrls.map((src, i) => ({
        src,
        bgStyle: {
          backgroundImage: `url('${src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          paddingBottom: "135%",
        },
        onClick: () => {
          setGalleryIndex(i);
          setGalleryOpen(true);
        },
      })),
    [],
  );

  const closeGallery = useCallback(() => setGalleryOpen(false), []);

  const prevGallery = useCallback(() => {
    const n = galleryImgUrls.length;
    setGalleryIndex((i) => (i - 1 + n) % n);
  }, []);

  const nextGallery = useCallback(() => {
    const n = galleryImgUrls.length;
    setGalleryIndex((i) => (i + 1) % n);
  }, []);

  return {
    navScrolled,
    navBg: navScrolled ? "rgba(249,244,238,0.97)" : "transparent",
    navBlur: navScrolled ? "blur(16px)" : "none",
    navBorderColor: navScrolled ? "rgba(26,20,16,0.1)" : "transparent",
    navTextColor: navScrolled ? "#1A1410" : "#F9F4EE",

    scrollToAbout: (e?: React.MouseEvent) => {
      e?.preventDefault();
      scrollTo("about");
    },
    scrollToServices: (e?: React.MouseEvent) => {
      e?.preventDefault();
      scrollTo("services");
    },
    scrollToGallery: (e?: React.MouseEvent) => {
      e?.preventDefault();
      scrollTo("gallery");
    },
    scrollToContact: (e?: React.MouseEvent) => {
      e?.preventDefault();
      scrollTo("contact");
    },

    bookingOpen,
    bookingStep,
    bookingStepTitle: stepTitles[bookingStep - 1] || "",
    isStep1: bookingStep === 1,
    isStep2: bookingStep === 2,
    isStep3: bookingStep === 3,
    isStep4: bookingStep === 4,
    isStep5: bookingStep === 5,
    isStep6: bookingStep === 6,
    showBack: bookingStep > 1 && bookingStep < 6,
    progressPct: Math.round(((bookingStep - 1) / 5) * 100) + "%",

    openBooking,
    closeBooking,
    backStep,
    selectLindenau,
    selectSeetal,
    selectLindenauFromContact,
    selectSeetalFromContact,
    goToStep5,
    goToStep6,
    submitting,

    servicesList,
    stylists,
    calDays,
    timeSlots,
    monthName,
    canGoPrev,
    prevMonth,
    nextMonth,
    prevMonthColor: canGoPrev ? "#7A6A60" : "#D5CCC6",
    prevMonthCursor: canGoPrev ? "pointer" : "default",

    booking,
    bookingLocationStr,
    bookingDateStr,
    setName: (e: React.ChangeEvent<HTMLInputElement>) =>
      setBooking((b) => ({ ...b, name: e.target.value })),
    setEmail: (e: React.ChangeEvent<HTMLInputElement>) =>
      setBooking((b) => ({ ...b, email: e.target.value })),
    setPhone: (e: React.ChangeEvent<HTMLInputElement>) =>
      setBooking((b) => ({ ...b, phone: e.target.value })),

    step4ContinueStyle: {
      background: canStep4 ? "#1A1410" : "#E5DDD4",
      color: canStep4 ? "#F9F4EE" : "#B0A498",
      border: "none",
      padding: "14px 28px",
      fontSize: "12px",
      fontWeight: "400",
      letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
      cursor: canStep4 ? "pointer" : "default",
      width: "100%",
      marginTop: "22px",
      transition: "background 0.2s",
      fontFamily: "'DM Sans',sans-serif",
    },
    step5ContinueStyle: {
      background: canStep5 && !submitting ? "#C4674A" : "#E5DDD4",
      color: canStep5 && !submitting ? "#F9F4EE" : "#B0A498",
      border: "none",
      padding: "15px 28px",
      fontSize: "13px",
      fontWeight: "400",
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      cursor: canStep5 && !submitting ? "pointer" : "default",
      width: "100%",
      transition: "background 0.2s",
      fontFamily: "'DM Sans',sans-serif",
    },

    galleryImages,
    galleryOpen,
    lightboxImgStyle: {
      backgroundImage: `url('${galleryImgUrls[galleryIndex] || ""}')`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "80vw",
      height: "88vh",
      animation: "fadeIn 0.3s ease",
    },
    closeGallery,
    prevGallery,
    nextGallery,
  };
}

export type SalonSiteState = ReturnType<typeof useSalonSite>;
