import React, { useEffect, useState } from "react";
import "./AddToCalendar.css";

const AddToCalendar = ({ weddingDate }) => {
  const [platform, setPlatform] = useState("desktop");

  const getPlatform = () => {
    const ua = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
    if (/ipad|iphone|ipod/.test(ua)) return "ios";
    if (/android/.test(ua)) return "android";
    if (/macintosh|mac os x/.test(ua)) return "macos";
    if (/windows/.test(ua)) return "windows";
    return "desktop";
  };

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  const title = "Matrimonio Martina & Marcello";
  const location = "Podere Calvanella, San Clemente BO";
  const startDate = weddingDate;
  const endDate = new Date(weddingDate.getTime() + 4 * 60 * 60 * 1000);

  const formatDateUTC = (date) =>
    date.toISOString().replace(/[-:]|\.\d{3}/g, "");

  const saveToICS = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${formatDateUTC(startDate)}
DTEND:${formatDateUTC(endDate)}
LOCATION:${location}
END:VEVENT
END:VCALENDAR
`;
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "martina-marcello-wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = () => {
    const start = formatDateUTC(startDate);
    const end = formatDateUTC(endDate);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${start}/${end}`,
      location: location,
      sf: "true",
      output: "xml",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-buttons">
        {(platform === "ios" || platform === "macos") && (
          <button className="calendar-btn" onClick={saveToICS}>
            Aggiungi al calendario
          </button>
        )}
        {(platform === "android" || platform === "windows" || platform === "desktop") && (
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-btn"
          >
            Aggiungi al calendario
          </a>
        )}
      </div>
    </div>
  );
};

export default AddToCalendar;