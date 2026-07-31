/**
 * Site configuration for Josh's Bar & Grill.
 *
 * Everything the owner might need to change lives here: contact info,
 * map coordinates, and integration links that aren't live yet. Fill in
 * a URL and the matching button on the site activates automatically —
 * no other file needs to change.
 */
window.JOSHS_CONFIG = {
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
      icon: "🛍️",
      url: null, // e.g. a Toast / Square Online / ChowNow ordering link
    },
    {
      id: "reservations",
      label: "Reserve a Table",
      description: "Book a table or a spot for weekend live music.",
      icon: "🪑",
      url: null, // e.g. an OpenTable / Resy booking link
    },
    {
      id: "doordash",
      label: "DoorDash",
      description: "Delivery through DoorDash.",
      icon: "🚗",
      url: null,
    },
    {
      id: "ubereats",
      label: "Uber Eats",
      description: "Delivery through Uber Eats.",
      icon: "🚙",
      url: null,
    },
    {
      id: "grubhub",
      label: "Grubhub",
      description: "Delivery through Grubhub.",
      icon: "🛵",
      url: null,
    },
    {
      id: "gift-cards",
      label: "Gift Cards",
      description: "Send a gift card to a regular (or yourself).",
      icon: "🎁",
      url: null,
    },
  ],
};
