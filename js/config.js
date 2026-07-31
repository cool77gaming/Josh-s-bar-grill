/**
 * Site configuration for Josh's Bar & Grill.
 *
 * Everything the owner might need to change lives here: contact info,
 * map coordinates, and integration links that aren't live yet. Fill in
 * a URL and the matching button on the site activates automatically —
 * no other file needs to change.
 */
// Lucide icons (ISC license), inlined so the site has zero icon-font/CDN
// dependency. Referenced by key from `integrations` below.
var JOSHS_ICONS = {
  "shopping-bag":
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0" /><path d="M3.103 6.034h17.794" /><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" /></svg>',
  armchair:
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" /><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" /><path d="M5 18v2" /><path d="M19 18v2" /></svg>',
  car:
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>',
  truck:
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>',
  bike:
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" /></svg>',
  gift:
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14" /><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" /><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" /><rect x="3" y="7" width="18" height="4" rx="1" /></svg>',
};

window.JOSHS_CONFIG = {
  icons: JOSHS_ICONS,

  business: {
    name: "Josh's Bar & Grill",
    phone: "(757) 723-8003",
    phoneHref: "tel:+17577238003",
    address: {
      line1: "1938 E Pembroke Ave",
      city: "Hampton",
      state: "VA",
      zip: "23663",
    },
    // From OpenStreetMap/Nominatim geocoding of the address above.
    coords: { lat: 37.0393278, lng: -76.3070439 },
  },

  // Social links -- add real profile URLs when available.
  social: {
    facebook: null, // e.g. "https://www.facebook.com/JoshsBarGrillHampton"
    instagram: null,
  },

  // Optional: a Google Place ID enables a "Google Reviews" deep link
  // and, if you add the Places API later, live ratings.
  googlePlaceId: null,

  /**
   * Integration routes. Each is null until wired up. The Order & Reserve
   * tab reads this object and renders either a live button (url set) or
   * a "Coming soon" placeholder (url null) -- fill these in whenever the
   * business signs up with a provider.
   */
  integrations: [
    {
      id: "online-order",
      label: "Order Online",
      description: "Pickup & delivery ordering directly from Josh's.",
      icon: "shopping-bag",
      url: null, // e.g. a Toast / Square Online / ChowNow ordering link
    },
    {
      id: "reservations",
      label: "Reserve a Table",
      description: "Book a table or a spot for weekend live music.",
      icon: "armchair",
      url: null, // e.g. an OpenTable / Resy booking link
    },
    {
      id: "doordash",
      label: "DoorDash",
      description: "Delivery through DoorDash.",
      icon: "car",
      url: null,
    },
    {
      id: "ubereats",
      label: "Uber Eats",
      description: "Delivery through Uber Eats.",
      icon: "truck",
      url: null,
    },
    {
      id: "grubhub",
      label: "Grubhub",
      description: "Delivery through Grubhub.",
      icon: "bike",
      url: null,
    },
    {
      id: "gift-cards",
      label: "Gift Cards",
      description: "Send a gift card to a regular (or yourself).",
      icon: "gift",
      url: null,
    },
  ],
};
