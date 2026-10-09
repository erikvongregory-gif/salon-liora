"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { galleryImgUrls, serviceData, TEAM } from "@/lib/salon-data";
import { lockScroll, scrollToId } from "@/lib/motion";

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

export type CalDay = {
  key: string;
  dayNum: string;
  disabled: boolean;
  selected: boolean;
  isToday: boolean;
  onClick: (() => void) | null;
};

const EMPTY_BOOKING: BookingState = {
  location: null,
  service: null,
  stylist: null,
  date: null,
  time: null,
  name: "",
  email: "",
  phone: "",
};

const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const STEP_TITLES = [
  "Standort wählen",
  "Leistung wählen",
  "Stylistin wählen",
  "Datum & Uhrzeit",
  "Ihre Kontaktdaten",
  "Demo-Hinweis",
];

function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

export function useSalonSite() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>(EMPTY_BOOKING);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (galleryOpen) setGalleryOpen(false);
        else if (bookingOpen) setBookingOpen(false);
      }
      if (galleryOpen) {
        const n = galleryImgUrls.length;
        if (e.key === "ArrowLeft") setGalleryIndex((i) => (i - 1 + n) % n);
        if (e.key === "ArrowRight") setGalleryIndex((i) => (i + 1) % n);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen, bookingOpen]);

  useEffect(() => {
    lockScroll(bookingOpen || galleryOpen);
    return () => lockScroll(false);
  }, [bookingOpen, galleryOpen]);

  const resetBooking = useCallback((patch: Partial<BookingState>, step: number) => {
    const t = startOfToday();
    setBooking({ ...EMPTY_BOOKING, ...patch });
    setBookingStep(step);
    setCalendarMonth(t.getMonth());
    setCalendarYear(t.getFullYear());
    setBookingOpen(true);
  }, []);

  const openBooking = useCallback(() => resetBooking({}, 1), [resetBooking]);

  /** Öffnet die Buchung mit vorausgewählter Leistung (z. B. aus der Preisliste). */
  const openBookingWithService = useCallback(
    (id: string) => {
      const svc = serviceData.find((s) => s.id === id);
      resetBooking(svc ? { service: { id: svc.id, name: svc.name, price: svc.price } } : {}, 1);
    },
    [resetBooking],
  );

  const openBookingAt = useCallback(
    (location: Exclude<BookingLocation, null>) => resetBooking({ location }, 2),
    [resetBooking],
  );

  const closeBooking = useCallback(() => setBookingOpen(false), []);
  const backStep = useCallback(() => setBookingStep((s) => Math.max(1, s - 1)), []);

  const selectLocation = useCallback(
    (location: Exclude<BookingLocation, null>) => {
      setBooking((b) => ({ ...b, location }));
      setBookingStep(booking.service ? 3 : 2);
    },
    [booking.service],
  );

  const selectService = useCallback((id: string) => {
    const svc = serviceData.find((s) => s.id === id);
    if (!svc) return;
    setBooking((b) => ({ ...b, service: { id: svc.id, name: svc.name, price: svc.price } }));
    setBookingStep(3);
  }, []);

  const selectStylist = useCallback((name: string) => {
    setBooking((b) => ({ ...b, stylist: name }));
    setBookingStep(4);
  }, []);

  const selectTime = useCallback((time: string) => setBooking((b) => ({ ...b, time })), []);

  const today = useMemo(() => startOfToday(), []);

  const firstWeekday = (new Date(calendarYear, calendarMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const monthName = new Date(calendarYear, calendarMonth).toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });
  const canGoPrev = !(calendarMonth === today.getMonth() && calendarYear === today.getFullYear());

  const calDays: CalDay[] = useMemo(() => {
    const days: CalDay[] = [];
    for (let i = 0; i < firstWeekday; i++) {
      days.push({ key: "e" + i, dayNum: "", disabled: true, selected: false, isToday: false, onClick: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(calendarYear, calendarMonth, d);
      const disabled = dt < today || dt.getDay() === 0;
      days.push({
        key: "d" + d,
        dayNum: String(d),
        disabled,
        selected: !!booking.date && booking.date.toDateString() === dt.toDateString(),
        isToday: dt.toDateString() === today.toDateString(),
        onClick: disabled ? null : () => setBooking((b) => ({ ...b, date: dt, time: null })),
      });
    }
    return days;
  }, [firstWeekday, daysInMonth, calendarYear, calendarMonth, booking.date, today]);

  const canStep4 = !!booking.date && !!booking.time;
  const canStep5 = !!(booking.name.trim() && booking.email.trim());

  const goToStep5 = useCallback(() => {
    if (canStep4) setBookingStep(5);
  }, [canStep4]);

  const goToStep6 = useCallback(async () => {
    if (!canStep5 || !booking.service || !booking.date || !booking.time || !booking.location) return;
    // Demo-Referenzprojekt: keine echte Buchung speichern
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setBookingStep(6);
  }, [canStep5, booking]);

  const prevMonth = useCallback(() => {
    if (!canGoPrev) return;
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else setCalendarMonth((m) => m - 1);
  }, [canGoPrev, calendarMonth]);

  const nextMonth = useCallback(() => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else setCalendarMonth((m) => m + 1);
  }, [calendarMonth]);

  const openGallery = useCallback((i: number) => {
    setGalleryIndex(i);
    setGalleryOpen(true);
  }, []);
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
    scrollTo: scrollToId,

    bookingOpen,
    bookingStep,
    bookingStepTitle: STEP_TITLES[bookingStep - 1] || "",
    showBack: bookingStep > 1 && bookingStep < 6,
    progress: (bookingStep - 1) / 5,

    openBooking,
    openBookingWithService,
    openBookingAt,
    closeBooking,
    backStep,
    selectLocation,
    selectService,
    selectStylist,
    selectTime,
    goToStep5,
    goToStep6,
    canStep4,
    canStep5,
    submitting,

    services: serviceData,
    stylists: TEAM,
    times: TIMES,
    calDays,
    monthName,
    canGoPrev,
    prevMonth,
    nextMonth,

    booking,
    bookingLocationStr:
      booking.location === "lindenau" ? "Lindenau" : booking.location === "seetal" ? "Seetal" : "",
    bookingDateStr: booking.date
      ? booking.date.toLocaleDateString("de-DE", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
    setName: (e: React.ChangeEvent<HTMLInputElement>) =>
      setBooking((b) => ({ ...b, name: e.target.value })),
    setEmail: (e: React.ChangeEvent<HTMLInputElement>) =>
      setBooking((b) => ({ ...b, email: e.target.value })),
    setPhone: (e: React.ChangeEvent<HTMLInputElement>) =>
      setBooking((b) => ({ ...b, phone: e.target.value })),

    galleryOpen,
    galleryIndex,
    openGallery,
    closeGallery,
    prevGallery,
    nextGallery,
  };
}

export type SalonSiteState = ReturnType<typeof useSalonSite>;
