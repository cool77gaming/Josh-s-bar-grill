"""Generates the menu PDF for Josh's Bar & Grill.

Content transcribed from photos of the restaurant's own laminated menu
(appetizers, salads, Josh's Famous Burgers, sandwiches, entrees, sides) --
this is the real menu, not a placeholder. Re-run this script any time
prices change: assets/menu/joshs-menu.pdf feeds the site's Menu tab.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

# Palette matches the site (and Josh's actual sign): cream card stock,
# navy ink, mustard-gold accent, sky-blue tint.
BG = HexColor("#faf3e3")
CARD = HexColor("#fffdf8")
INK = HexColor("#23324a")
NAVY = HexColor("#1d3557")
MUTED = HexColor("#5c6a7e")
GOLD = HexColor("#9c6913")
RULE = HexColor("#e6d9b8")

PAGE_W, PAGE_H = letter
MARGIN = 0.6 * inch

SECTIONS = [
    ("Appetizers", [
        ("Sampler Platter", "Breaded wings, poppers, mozzarella sticks, onion rings & fried mushrooms", "11.99"),
        ("Nachos", "Meat, cheese, lettuce, tomato, onions, salsa, sour cream & olives", "9.99"),
        ("Quesadillas", "Chicken or beef, with cheese, lettuce, tomato & onions", "9.99"),
        ("Veggie Quesadilla", "", "6.99"),
        ("Hot Wings (10)", "", "10.99"),
        ("Breaded Wings (10)", "", "10.99"),
        ("Potato Boats (4)", "Stuffed with beef, mushrooms, onions, cheese, bacon & sour cream", "9.99"),
        ("Tenders (4) with Fries", "", "7.99"),
        ("Fried Mushrooms (12)", "", "6.99"),
        ("Jalapeno Poppers (6)", "", "6.99"),
        ("Cheese Stix (6)", "", "6.99"),
        ("Cheese Fries with Bacon", "", "6.99"),
        ("Basket of Fries or Onion Rings", "", "3.99"),
    ]),
    ("Salads", [
        ("Chef Salad", "", "10.99"),
        ("Grilled Chicken Salad", "", "10.99"),
        ("Tuna Salad Cold Plate", "", "10.99"),
        ("Chicken Salad Cold Plate", "", "10.99"),
        ("Greek Salad", "", "10.99"),
        ("Dinner Salad", "", "3.99"),
    ]),
    ("Josh's Famous Burgers", [
        ("Hamburger", "8oz, mayo, lettuce, tomato, pickle & onion, side of fries", "9.59"),
        ("Cheeseburger", "8oz, mayo, lettuce, tomato, pickle & onion, side of fries", "9.99"),
        ("Bacon Cheeseburger", "8oz, mayo, lettuce, tomato, pickle & onion, side of fries", "10.99"),
        ("Bacon Mushroom Swiss Burger", "8oz, mayo, lettuce, tomato, pickle & onion, side of fries", "11.99"),
    ]),
    ("Sandwiches", [
        ("Pastrami Reuben", "Hot mustard or 1000 island", "10.99"),
        ("Turkey or Ham & Cheese Club", "", "9.99"),
        ("Turkey or Ham & Cheese Sandwich", "", "7.99"),
        ("BLT", "", "7.99"),
        ("Crispy Chic Filet", "", "7.99"),
        ("Grilled Chicken Sandwich", "", "7.99"),
        ("Tuna Salad Sandwich", "", "7.99"),
        ("Chicken Salad Sandwich", "", "7.99"),
        ("Grilled Cheese Sandwich", "", "5.99"),
        ("BBQ Sandwich", "With slaw", "8.99"),
    ]),
    ("Entrees", [
        ("14oz Delmonico Steak", "Served on a sizzle plate, choice of two sides", "17.99"),
        ("1/2 lb Scallop Dinner", "Blackened, grilled or fried, choice of two sides", "14.99"),
        ("1/2 lb Shrimp Dinner", "Steamed or fried, choice of two sides", "12.99"),
        ("10oz Groundsteak", "Brown gravy, onions & mushrooms, choice of two sides", "11.99"),
        ("Two Fried Pork Chops", "Choice of two sides", "12.99"),
        ("Fried Flounder", "Choice of two sides", "13.99"),
        ("Grilled Chicken Breast Dinner", "Cheese, bacon, grilled onions, peppers & mushrooms", "11.99"),
        ("Open Faced Roast Beef", "Smothered in brown gravy, choice of two sides", "11.99"),
        ("Stuffed Shells", "Served with side salad only", "12.99"),
    ]),
]

SIDES_LINE = "Corn · Green Beans · Broccoli · Slaw · Baked Beans · Onion Rings · Fries · Baked Potato · Mashed Potatoes — $3.99"

FOOTER_NOTE = (
    "Consuming raw or undercooked meat may increase risk of foodborne illness "
    "and these items are cooked to order. Prices subject to change."
)


def draw_header(c, page_num):
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 30)
    title = "JOSH'S"
    tw = stringWidth(title, "Helvetica-Bold", 30)
    c.drawString((PAGE_W - tw) / 2, PAGE_H - MARGIN - 4, title)

    c.setFillColor(GOLD)
    c.setFont("Helvetica-BoldOblique", 15)
    sub = "Bar & Grill"
    sw = stringWidth(sub, "Helvetica-BoldOblique", 15)
    c.drawString((PAGE_W - sw) / 2, PAGE_H - MARGIN - 24, sub)

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9.5)
    tag = "a great local place for food, fun and friendly faces"
    tagw = stringWidth(tag, "Helvetica", 9.5)
    c.drawString((PAGE_W - tagw) / 2, PAGE_H - MARGIN - 38, tag)

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    contact = "1938 E Pembroke Ave, Hampton, VA 23663  |  (757) 723-8003"
    cw = stringWidth(contact, "Helvetica", 9)
    c.drawString((PAGE_W - cw) / 2, PAGE_H - MARGIN - 52, contact)

    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.line(MARGIN, PAGE_H - MARGIN - 62, PAGE_W - MARGIN, PAGE_H - MARGIN - 62)


def draw_footer(c, page_num):
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 7.5)
    c.drawCentredString(PAGE_W / 2, MARGIN - 22, FOOTER_NOTE)
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - MARGIN, MARGIN - 22, f"Page {page_num}")


def render():
    path = "assets/menu/joshs-menu.pdf"
    c = canvas.Canvas(path, pagesize=letter)
    col_x = MARGIN
    top_y = PAGE_H - MARGIN - 84

    state = {"page_num": 1, "y": top_y}
    draw_header(c, state["page_num"])

    def new_page():
        draw_footer(c, state["page_num"])
        c.showPage()
        state["page_num"] += 1
        draw_header(c, state["page_num"])
        state["y"] = top_y

    def ensure_space(min_height):
        if state["y"] < MARGIN + min_height:
            new_page()

    for name, items in SECTIONS:
        ensure_space(90)
        y = state["y"]

        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 15)
        c.drawString(col_x, y, name.upper())
        y -= 6
        c.setStrokeColor(RULE)
        c.setLineWidth(0.75)
        c.line(col_x, y, PAGE_W - MARGIN, y)
        y -= 18

        for item_name, desc, price in items:
            if y < MARGIN + 40:
                state["y"] = y
                new_page()
                y = state["y"]

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
        state["y"] = y

    ensure_space(50)
    y = state["y"]
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(col_x, y, "SIDES")
    y -= 16
    c.setFillColor(INK)
    c.setFont("Helvetica", 10)
    c.drawString(col_x, y, SIDES_LINE)
    state["y"] = y

    draw_footer(c, state["page_num"])
    c.showPage()
    c.save()
    print(f"Wrote {path} ({state['page_num']} pages)")


if __name__ == "__main__":
    render()
