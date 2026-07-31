# Josh's Bar & Grill — Website

A static, single-page website for **Josh's Bar & Grill**, 1938 E Pembroke Ave,
Hampton, VA 23663 — a neighborhood bar & grill with handmade burgers, BBQ,
steak & seafood, pool, darts, and weekend live music/karaoke.

No build step, no framework, no API keys required to run it.

## Data sources

Address, phone number, and general description were compiled from public
listings (Yelp, MenuPix, 757area, MilitaryBridge) as of July 2026. Map
coordinates are geocoded from the address via OpenStreetMap Nominatim.
**None of the photos, review text, or menu prices are scraped from those
sites** — the menu PDF is a starter sample built from commonly-mentioned
signature dishes, and reviews are shown as aggregate ratings + links out to
the real review platforms. Treat this as a strong starting point, not a
mirror of the official listing — swap in the real menu, photos, and hours
whenever the owner provides them.

## Structure

```
index.html              Single-page site: hero, highlights, and a tabbed
                         Menu / Hours / Reviews / Location / Order section
css/styles.css           All styling (dark pub theme, fully responsive)
js/config.js              Business info + integration links — edit this file
                          to update contact info or turn on ordering/delivery
js/main.js                Tabs, open/closed status, map, directions links,
                          integration button rendering
assets/menu/joshs-menu.pdf  The PDF loaded by the Menu tab
scripts/generate_menu.py   Regenerates the sample menu PDF (reportlab)
```

## Running locally

It's plain static files — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Updating the menu

Replace `assets/menu/joshs-menu.pdf` with the real menu PDF (same filename,
or update the path in `index.html`). The Menu tab and download/open-in-new-tab
buttons pick it up automatically. To regenerate the sample instead:

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
