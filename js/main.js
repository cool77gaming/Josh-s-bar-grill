(function () {
  "use strict";

  var CFG = window.JOSHS_CONFIG;

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");
  navToggle.addEventListener("click", function () {
    var open = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  primaryNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Tabs ---------- */
  var tabButtons = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));
  var tabPanels = Array.prototype.slice.call(document.querySelectorAll(".tab-panel"));
  var mapInitialized = false;

  function activateTab(name) {
    tabButtons.forEach(function (btn) {
      var active = btn.dataset.tab === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    tabPanels.forEach(function (panel) {
      var active = panel.id === "panel-" + name;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
    if (name === "location") {
      // Leaflet needs the container visible before sizing itself.
      requestAnimationFrame(function () {
        initMap();
        if (window.__joshsMap) window.__joshsMap.invalidateSize();
      });
    }
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activateTab(btn.dataset.tab);
    });
  });

  document.querySelectorAll("[data-tab-link]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      var tab = el.dataset.tabLink;
      activateTab(tab);
      // Let the default anchor jump happen for <a href="#tabs">.
    });
  });

  /* ---------- Directions links ---------- */
  var addr = CFG.business.address;
  var fullAddress = [addr.line1, addr.city + ", " + addr.state + " " + addr.zip].join(", ");
  var directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(fullAddress);

  ["heroDirections", "directionsBtn", "ctaDirections"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = directionsUrl;
  });

  var googleReviewsLink = document.getElementById("googleReviewsLink");
  if (googleReviewsLink) {
    googleReviewsLink.href = CFG.googlePlaceId
      ? "https://search.google.com/local/reviews?placeid=" + CFG.googlePlaceId
      : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CFG.business.name + " " + fullAddress);
  }

  var fb = document.getElementById("footerFacebook");
  var ig = document.getElementById("footerInstagram");
  if (fb) {
    if (CFG.social.facebook) { fb.href = CFG.social.facebook; }
    else { fb.href = "https://www.facebook.com/search/top?q=" + encodeURIComponent(CFG.business.name + " Hampton VA"); fb.textContent = "Find us on Facebook"; }
  }
  if (ig) {
    if (CFG.social.instagram) { ig.href = CFG.social.instagram; }
    else { ig.remove(); }
  }

  /* ---------- Hours / open-now status ---------- */
  // 0 = Sunday ... 6 = Saturday. Close hour > 24 means "past midnight".
  var HOURS = [
    { open: 12, close: 22 },   // Sun
    { open: 11, close: 24 },   // Mon
    { open: 11, close: 24 },   // Tue
    { open: 11, close: 24 },   // Wed
    { open: 11, close: 24 },   // Thu
    { open: 11, close: 26 },   // Fri (2am)
    { open: 11, close: 26 },   // Sat (2am)
  ];

  function easternNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var day = dayNames.indexOf(map.weekday);
    var hour = parseInt(map.hour, 10) % 24;
    var minute = parseInt(map.minute, 10);
    return { day: day, decimalHour: hour + minute / 60 };
  }

  function computeStatus() {
    var now = easternNow();
    var today = HOURS[now.day];
    var yesterday = HOURS[(now.day + 6) % 7];

    var openToday = now.decimalHour >= today.open && now.decimalHour < today.close;
    var openFromYesterday =
      yesterday.close > 24 && now.decimalHour < yesterday.close - 24;

    return openToday || openFromYesterday;
  }

  function renderStatus() {
    var isOpen = computeStatus();
    var dot = document.getElementById("statusDot");
    var text = document.getElementById("statusText");
    var pill = document.getElementById("statusPill");
    if (!dot || !text) return;
    pill.classList.toggle("is-open", isOpen);
    pill.classList.toggle("is-closed", !isOpen);
    text.textContent = isOpen ? "Open now" : "Closed now";
  }

  function highlightToday() {
    var now = easternNow();
    var row = document.querySelector('#hoursTable tr[data-day="' + now.day + '"]');
    if (row) row.classList.add("is-today");
  }

  renderStatus();
  highlightToday();
  setInterval(renderStatus, 60 * 1000);

  /* ---------- Map ---------- */
  function initMap() {
    if (mapInitialized || !window.L) return;
    mapInitialized = true;

    var coords = CFG.business.coords;
    var map = L.map("map", { scrollWheelZoom: false }).setView([coords.lat, coords.lng], 15);
    window.__joshsMap = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    var pinIcon = L.divIcon({
      className: "map-pin",
      html:
        '<div class="map-pin-dot"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" /><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" /><path d="m2.1 21.8 6.4-6.3" /><path d="m19 5-7 7" /></svg></div><div class="map-pin-stem"></div>',
      iconSize: [34, 46],
      iconAnchor: [17, 46],
      popupAnchor: [0, -40],
    });

    L.marker([coords.lat, coords.lng], { icon: pinIcon })
      .addTo(map)
      .bindPopup(
        "<strong>" + CFG.business.name + "</strong><br>" + fullAddress +
        '<br><a href="' + directionsUrl + '" target="_blank" rel="noopener">Get directions</a>'
      );
  }

  // If Location tab happens to be the active one on load (e.g. deep link), init now.
  if (document.getElementById("panel-location").classList.contains("is-active")) {
    initMap();
  }

  /* ---------- Integrations (Order & Reserve) ---------- */
  var grid = document.getElementById("integrationGrid");
  if (grid) {
    CFG.integrations.forEach(function (item) {
      var card = document.createElement("div");
      card.className = "integration-card" + (item.url ? "" : " is-pending");

      var live = Boolean(item.url);
      var iconSvg = (CFG.icons && CFG.icons[item.icon]) || "";
      card.innerHTML =
        '<span class="integration-icon">' + iconSvg + "</span>" +
        "<h3>" + item.label + "</h3>" +
        "<p>" + item.description + "</p>" +
        (live
          ? '<a class="btn btn-small btn-primary" href="' + item.url + '" target="_blank" rel="noopener">Open</a>'
          : '<span class="btn btn-small btn-disabled" aria-disabled="true">Coming soon</span>');

      grid.appendChild(card);
    });
  }
})();
