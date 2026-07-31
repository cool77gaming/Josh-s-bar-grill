# Josh's Bar & Grill — Website

A static, single-page website for **Josh's Bar & Grill**, 1938 E Pembroke Ave,
Hampton, VA 23663 — a low-key, family-owned neighborhood bar & grill: Josh's
Famous Burgers, steak & seafood, pool, darts, and weekend live music/karaoke.
"A great local place for food, fun and friendly faces" is their own tagline,
straight off their sign.

No build step, no framework, no API keys required to run it.

## Data sources

- **Address, phone, description**: public listings (Yelp, MenuPix, 757area,
  MilitaryBridge), July 2026.
- **Hours**: transcribed directly from Josh's own Facebook page.
- **Menu & prices**: transcribed from photos of the restaurant's actual
  laminated menu — this is the real menu, not a placeholder. Re-run
  `scripts/generate_menu.py` any time prices change.
- **Palette & tagline**: pulled from photos of Josh's real sign (sky blue,
  navy, mustard-gold script lettering, cream card stock) and their Facebook
  "About" text — the goal was to match the actual low-key, unpretentious,
  family-run feel rather than invent a moodier "craft cocktail bar" look.
  The wordmark/icon here is an original design inspired by those colors,
  not a reproduction of their logo artwork.
- **Map**: coordinates geocoded from the address via OpenStreetMap Nominatim.
- **Reviews**: shown as aggregate ratings + links out to the real review
  platforms, not scraped review text.

Treat this as a strong, accurate starting point — swap in real photos and
double-check pricing/hours with the owner before treating it as official.

## Structure

```
index.html              Single-page site: hero, highlights, and a tabbed
                         Menu / Hours / Reviews / Location / Order section
css/styles.css           All styling (warm sign-inspired palette, responsive)
js/config.js              Business info + integration links — edit this file
                          to update contact info or turn on ordering/delivery
js/main.js                Tabs, open/closed status, map, directions links,
                          integration button rendering
assets/menu/joshs-menu.pdf  The PDF loaded by the Menu tab (real menu)
assets/fonts/               Vendored Caveat webfont (tagline/script accents)
assets/icons/                Vendored Lucide icon set (no CDN dependency)
scripts/generate_menu.py   Regenerates the menu PDF from real data (reportlab)
```

## Running locally

It's plain static files — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Updating the menu

The menu content lives in `scripts/generate_menu.py` as plain data (name,
description, price per item). Edit that and re-run the script, or replace
`assets/menu/joshs-menu.pdf` outright with a freshly scanned/exported menu
PDF (same filename, or update the path in `index.html`). The Menu tab and
download/open-in-new-tab buttons pick it up automatically.

```bash
pip install reportlab
python3 scripts/generate_menu.py
```

## Turning on ordering, delivery & reservations

The "Order & Reserve" tab reads `js/config.js` → `integrations`. Each entry
starts with `url: null` and renders as a disabled "Coming soon" button. Paste
in a real link (Toast/Square/ChowNow ordering page, OpenTable/Resy booking
page, DoorDash/Uber Eats/Grubhub store page, gift card store) and that
button goes live immediately — no other code changes needed.

## Map & directions

The Location tab uses [Leaflet](https://leafletjs.com/) (vendored in
`vendor/leaflet/`, no CDN dependency) + OpenStreetMap tiles (free, no API
key, fetched live so the page needs internet access to show map imagery).
"Get Directions" buttons link out to Google Maps
directions using the address in `js/config.js`. If you'd rather show live
Google reviews or an official Google Map embed, add a `googlePlaceId` and/or
a Google Maps Embed API key in `js/config.js`.

## Ideas for later

- Wire up a real photo gallery once official photos are available
- Live star ratings via the Yelp Fusion or Google Places API
- An events calendar for live music / karaoke nights
- Email signup / newsletter integration
