/* ==========================================================================
   STUDENT REPUBLIC — SITE LOGIC
   You normally don't need to edit this file. Edit js/draftsr.js instead.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- Helpers ---------------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Accepts "2026-09-3T10:27" (day without a leading zero) on every browser
  function toDate(str) {
    const m = String(str).match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}):(\d{2}))?/);
    return m ? new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)) : new Date(str);
  }

  function parseEvent(e) {
    return {
      ...e,
      startDate: toDate(e.start),
      endDate: toDate(e.end)
    };
  }

  const now = () => new Date();

  function getStatus(e, ref = now()) {
    if (ref >= e.startDate && ref <= e.endDate) return "ongoing";
    if (ref < e.startDate) return "upcoming";
    return "past";
  }

  function initials(name) {
    return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }

  function fmtDate(d) {
    return d.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
  }
  function fmtDateRange(start, end) {
    const sameDay = start.toDateString() === end.toDateString();
    if (sameDay) {
      const time = start.toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" });
      return `${fmtDate(start)} &middot; ${time}`;
    }
    return `${fmtDate(start)} &ndash; ${fmtDate(end)}`;
  }

  function mediaBlock(item, isOfficer) {
    if (item.image || item.photo) {
      const src = item.image || item.photo;
      // item.focus (optional, set in js/draftsr.js) = which part of the photo stays visible, e.g. "center top"
      const pos = item.focus ? ` style="object-position:${item.focus}"` : "";
      return `<div class="media"><img src="${src}" alt="${item.title || item.name}" loading="lazy" decoding="async"${pos}></div>`;
    }
    const label = isOfficer ? initials(item.name) : initials(item.title);
    return `<div class="media"><span class="initials">${label}</span></div>`;
  }

  /* ---------------- Data prep ---------------- */
  const allEvents = (typeof eventsData !== "undefined" ? eventsData : [])
    .filter(e => e.announced !== false)
    .map(parseEvent)
    .sort((a, b) => a.startDate - b.startDate);

  const officers = typeof officersData !== "undefined" ? officersData : [];

  // Shared with js/features.js (notifications)
  window.SR = { allEvents, getStatus, fmtDateRange };

  /* ---------------- Splash screen ---------------- */
  const splash = $("#splash");
  const MIN_SPLASH_MS = 4000;
  const startTime = Date.now();

  function hideSplash() {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, MIN_SPLASH_MS - elapsed);

    setTimeout(() => {
      splash?.classList.add("hide");
    }, delay);
  }

  if (splash) {
    splash.classList.add("visible");
    hideSplash();
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = $("#footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Facebook link ---------------- */
  const socialList = $("#footer-social");
  if (socialList && typeof FACEBOOK_URL !== "undefined") {
    socialList.innerHTML = `
      <li>
        <a href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">
          <svg class="fb-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/>
          </svg>
          Facebook Page
        </a>
      </li>`;
  }

  /* ---------------- Officers grid ---------------- */
  const officersGrid = $("#officers-grid");
  if (officersGrid) {
    officersGrid.innerHTML = officers.map(o => `
      <div class="event-card tilt-card reveal">
        ${mediaBlock(o, true)}
        <div class="body">
          <span class="role-badge">${o.role}</span>
          <h3>${o.name}</h3>
        </div>
      </div>
    `).join("");
  }

  /* ---------------- Live / ongoing events ---------------- */
  const liveEl = $("#live-events");
  const ongoing = allEvents.filter(e => getStatus(e) === "ongoing");
  if (liveEl) {
    liveEl.innerHTML = ongoing.length
      ? ongoing.map(eventCardHTML).join("")
      : `<p class="empty-note">Nothing live at this exact moment &mdash; check Upcoming Events below.</p>`;
  }

  /* ---------------- Upcoming events ---------------- */
  const upcomingEl = $("#upcoming-events");
  const upcoming = allEvents.filter(e => getStatus(e) === "upcoming").slice(0, 6);
  if (upcomingEl) {
    upcomingEl.innerHTML = upcoming.length
      ? upcoming.map(eventCardHTML).join("")
      : `<p class="empty-note">No upcoming events announced yet. Check back soon!</p>`;
  }

  /* ---------------- Past events ---------------- */
  const pastEl = $("#past-events");
  const past = allEvents.filter(e => getStatus(e) === "past").slice(0, 6);
  if (pastEl) {
    pastEl.innerHTML = past.length
      ? past.map(eventCardHTML).join("")
      : `<p class="empty-note">No past events to display yet.</p>`;
  }

  function eventCardHTML(e) {
    const status = getStatus(e);
    const label = status === "ongoing" ? "Ongoing" : status === "upcoming" ? "Upcoming" : "Past";
    return `
      <div class="event-card tilt-card reveal" data-event="${String(e.title).replace(/"/g, '&quot;')}">
        ${mediaBlock(e, false)}
        <div class="body">
          <span class="status-tag status-${status}">${label}</span>
          <span class="date">${fmtDateRange(e.startDate, e.endDate)}</span>
          <h3>${e.title}</h3>
          <p>${e.description || ""}</p>
          <span class="loc">${e.location || ""}</span>
        </div>
      </div>`;
  }

  /* ---------------- Countdown timer ---------------- */
  const cdLabel = $("#countdown-label");
  const cdName  = $("#countdown-event-name");
  const dEl = $("#cd-days"), hEl = $("#cd-hours"), mEl = $("#cd-mins"), sEl = $("#cd-secs");

  const nextEvent = allEvents.find(e => getStatus(e) !== "past");

  function tickCountdown() {
    if (!nextEvent) {
      cdLabel.textContent = "No upcoming events";
      cdName.textContent = "Check back soon for announcements!";
      [dEl, hEl, mEl, sEl].forEach(el => el.textContent = "00");
      return;
    }
    const status = getStatus(nextEvent);
    const target = status === "ongoing" ? nextEvent.endDate : nextEvent.startDate;
    const diff = Math.max(0, target - now());

    const days = Math.floor(diff / 86400000);
    const hrs  = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    cdLabel.textContent = status === "ongoing" ? "Ongoing event ends in" : "Upcoming event in";
    dEl.textContent = String(days).padStart(2, "0");
    hEl.textContent = String(hrs).padStart(2, "0");
    mEl.textContent = String(mins).padStart(2, "0");
    sEl.textContent = String(secs).padStart(2, "0");
    cdName.textContent = nextEvent.title;
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------------- Calendar ---------------- */
  const calGrid   = $("#calendar-grid");
  const calLabel  = $("#cal-month-label");
  const dayTitle  = $("#day-panel-title");
  const dayEvents = $("#day-panel-events");
  let viewDate = new Date(); // month currently shown
  viewDate.setDate(1);

  function eventsOnDate(d) {
    return allEvents.filter(e => {
      const dayStart = new Date(d); dayStart.setHours(0,0,0,0);
      const dayEnd = new Date(d); dayEnd.setHours(23,59,59,999);
      return e.startDate <= dayEnd && e.endDate >= dayStart;
    });
  }

  function pastEventsOnDate(d) {
    return eventsOnDate(d).filter(e => getStatus(e) === "past");
  }

  function renderCalendar() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    calLabel.textContent = viewDate.toLocaleDateString("en-PH", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    let html = "";
    for (let i = 0; i < firstDay; i++) html += `<div class="cal-day empty"></div>`;

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const has = eventsOnDate(d).length > 0;
      const hasPast = pastEventsOnDate(d).length > 0;
      const evs = eventsOnDate(d);
      const live = evs.some(e => getStatus(e) === "ongoing");
      const soon = evs.some(e => getStatus(e) === "upcoming");
      const isToday = d.toDateString() === today.toDateString();
      const classes = ["cal-day"];
      if (hasPast) classes.push("has-past-event");
      else if (has) classes.push("has-event");
      if (!hasPast && live) classes.push("ev-live");
      else if (!hasPast && soon) classes.push("ev-up");
      if (isToday) classes.push("today");
      const tip = evs.map(e => e.title).join(", ").replace(/"/g, "&quot;");
      html += `<div class="${classes.join(" ")}" data-date="${d.toISOString()}"${has ? ` title="${tip}"` : ""}>
                 <span>${day}</span>${has ? '<span class="cal-pin"></span>' : ""}${evs.length > 1 ? `<span class="cal-count">${evs.length}</span>` : ""}
               </div>`;
    }
    calGrid.innerHTML = html;

    $$(".cal-day.has-event, .cal-day.has-past-event", calGrid).forEach(el => {
      el.addEventListener("click", () => {
        $$(".cal-day.selected", calGrid).forEach(x => x.classList.remove("selected"));
        el.classList.add("selected");
        showDayEvents(new Date(el.dataset.date));
      });
    });
  }

  function showDayEvents(d) {
    dayTitle.textContent = d.toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" });
    const evs = eventsOnDate(d);
    dayEvents.innerHTML = evs.length
      ? evs.map(e => `
          <div class="day-event-item">
            <h5>${e.title}</h5>
            <p>${fmtDateRange(e.startDate, e.endDate)}${e.location ? " &middot; " + e.location : ""}</p>
          </div>`).join("")
      : `<p class="day-panel-empty">No events on this date.</p>`;
  }

  $("#cal-prev")?.addEventListener("click", () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    renderCalendar();
  });
  $("#cal-next")?.addEventListener("click", () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    renderCalendar();
  });
  renderCalendar();

  /* ---------------- Scroll reveal (3D) ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  function observeRevealables() {
    $$(".reveal, .tilt-card").forEach(el => io.observe(el));
  }
  observeRevealables();
  // Re-scan shortly after render in case elements were injected after first pass
  setTimeout(observeRevealables, 300);

  /* ---------------- Ambient parallax glows ---------------- */
  const glowLeft  = $(".glow-left");
  const glowRight = $(".glow-right");
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (glowLeft)  glowLeft.style.transform  = `translateY(${y * 0.12}px)`;
      if (glowRight) glowRight.style.transform = `translateY(${-y * 0.1}px)`;
      ticking = false;
    });
  }, { passive: true });

  /* The three-line menu button is handled in js/features.js */

});