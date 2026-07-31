"""Generates the placeholder menu PDF for Josh's Bar & Grill.

This produces assets/menu/joshs-menu.pdf, a starter menu built from
publicly-listed signature dishes (burgers, club sandwiches, mac & cheese,
BBQ ribs, steak & seafood). The owner should swap in the real, current
menu and pricing -- this exists so the "Menu" tab has a real PDF to load.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

INK = HexColor("#f4ead6")
GOLD = HexColor("#d4a84b")
BG = HexColor("#1b1310")
RULE = HexColor("#3a2b22")
MUTED = HexColor("#c9b89a")

PAGE_W, PAGE_H = letter
MARGIN = 0.65 * inch

SECTIONS = [
    ("Starters", [
        ("Loaded Potato Skins", "Bacon, cheddar, scallions, sour cream", "10"),
        ("Buffalo Wings", "Tossed in-house, celery, blue cheese or ranch", "13"),
        ("Fried Pickles", "Hand-breaded, served with dipping sauce", "8"),
        ("Nachos Supreme", "Queso, jalapenos, pico, black olives", "11"),
    ]),
    ("Burgers & Sandwiches", [
        ("Josh's Classic Cheeseburger", "Half-pound handmade patty, house sauce", "12"),
        ("Bacon Cheeseburger", "Applewood bacon, cheddar, all the fixings", "13"),
        ("Club Sandwich", "Triple-decker, turkey, ham, bacon, fries", "12"),
        ("Philly Cheesesteak", "Shaved steak, peppers, onions, provolone", "13"),
        ("Grilled Chicken Sandwich", "Marinated breast, lettuce, tomato", "11"),
    ]),
    ("From the Grill", [
        ("BBQ Baby Back Ribs (Half Rack)", "House BBQ sauce, coleslaw, fries", "17"),
        ("BBQ Baby Back Ribs (Full Rack)", "House BBQ sauce, coleslaw, fries", "24"),
        ("8oz Sirloin Steak", "Grilled to order, choice of two sides", "19"),
        ("Grilled Shrimp Skewers", "Old Bay butter, choice of two sides", "16"),
    ]),
    ("Comfort Plates", [
        ("Mac & Cheese", "Three-cheese blend, toasted breadcrumb", "9"),
        ("Mac & Cheese with Bacon", "Add applewood bacon", "11"),
        ("Fried Fish Basket", "Beer-battered, fries, hushpuppies", "14"),
        ("Chicken Tenders Basket", "Hand-breaded, fries, choice of sauce", "11"),
    ]),
    ("Sides", [
        ("French Fries", "", "4"),
        ("Onion Rings", "", "5"),
        ("Coleslaw", "", "3"),
        ("Side Salad", "", "4"),
    ]),
    ("From the Bar", [
        ("Domestic Draft", "Ask about our rotating taps", "4"),
        ("Craft & Import Bottles", "", "5"),
        ("House Cocktails", "", "8"),
        ("Wine (Glass)", "Red or white", "7"),
    ]),
]

FOOTER_NOTE = (
    "Menu items and prices are a starter sample — please replace with "
    "Josh's current, official menu. Prices subject to change. "
    "20% gratuity added to parties of 6+."
)


def draw_header(c, page_num, total_pages):
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 30)
    title = "JOSH'S BAR & GRILL"
    tw = stringWidth(title, "Helvetica-Bold", 30)
    c.drawString((PAGE_W - tw) / 2, PAGE_H - MARGIN - 6, title)

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    sub = "1938 E Pembroke Ave, Hampton, VA 23663  |  (757) 723-8003"
    sw = stringWidth(sub, "Helvetica", 11)
    c.drawString((PAGE_W - sw) / 2, PAGE_H - MARGIN - 26, sub)

    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.line(MARGIN, PAGE_H - MARGIN - 38, PAGE_W - MARGIN, PAGE_H - MARGIN - 38)

    if page_num == 1:
        c.setFillColor(INK)
        c.setFont("Helvetica-Oblique", 12)
        tagline = "Handmade Burgers  •  BBQ  •  Steak & Seafood  •  Cold Beer"
        twl = stringWidth(tagline, "Helvetica-Oblique", 12)
        c.drawString((PAGE_W - twl) / 2, PAGE_H - MARGIN - 58, tagline)


def draw_footer(c, page_num, total_pages):
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 8)
    c.drawCentredString(PAGE_W / 2, MARGIN - 22, FOOTER_NOTE)
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - MARGIN, MARGIN - 22, f"Page {page_num} of {total_pages}")


def render():
    path = "assets/menu/joshs-menu.pdf"
    c = canvas.Canvas(path, pagesize=letter)

    layout_pages = [SECTIONS[:3], SECTIONS[3:]]
    total_pages = len(layout_pages)

    for page_num, sections in enumerate(layout_pages, start=1):
        draw_header(c, page_num, total_pages)
        y = PAGE_H - MARGIN - (86 if page_num == 1 else 60)
        col_x = MARGIN

        for name, items in sections:
            if y < MARGIN + 90:
                draw_footer(c, page_num, total_pages)
                c.showPage()
                page_num += 1
                draw_header(c, page_num, total_pages)
                y = PAGE_H - MARGIN - 60

            c.setFillColor(GOLD)
            c.setFont("Helvetica-Bold", 15)
            c.drawString(col_x, y, name.upper())
            y -= 6
            c.setStrokeColor(RULE)
            c.setLineWidth(0.75)
            c.line(col_x, y, PAGE_W - MARGIN, y)
            y -= 18

            for item_name, desc, price in items:
                c.setFillColor(INK)
                c.setFont("Helvetica-Bold", 11.5)
                c.drawString(col_x, y, item_name)

                c.setFont("Helvetica-Bold", 11.5)
                pw = stringWidth(f"${price}", "Helvetica-Bold", 11.5)
                c.drawString(PAGE_W - MARGIN - pw, y, f"${price}")

                dotted_start = col_x + stringWidth(item_name, "Helvetica-Bold", 11.5) + 6
                dotted_end = PAGE_W - MARGIN - pw - 6
                if dotted_end > dotted_start:
                    c.setStrokeColor(RULE)
                    c.setDash(1, 2)
                    c.line(dotted_start, y + 3, dotted_end, y + 3)
                    c.setDash()

                y -= 15
                if desc:
                    c.setFillColor(MUTED)
                    c.setFont("Helvetica-Oblique", 9.5)
                    c.drawString(col_x, y, desc)
                    y -= 14
                else:
                    y -= 2
                y -= 6

            y -= 8

        draw_footer(c, page_num, total_pages)
        c.showPage()

    c.save()
    print(f"Wrote {path}")


if __name__ == "__main__":
    render()
