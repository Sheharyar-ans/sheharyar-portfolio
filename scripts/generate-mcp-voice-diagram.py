import os
from PIL import Image, ImageDraw, ImageFont

def generate_banner():
    width, height = 1280, 720
    # Deep high-end dark slate canvas
    img = Image.new('RGBA', (width, height), color=(8, 10, 15, 255))
    draw = ImageDraw.Draw(img)

    # 1. Subtle grid lines in background
    grid_color = (25, 30, 42, 120)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(y, 0), (y, height)], fill=grid_color, width=1)

    # 2. Glowing ambient circles in background
    # Top-center glow
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([width//2 - 250, 10, width//2 + 250, 260], fill=(183, 255, 60, 25))
    glow_draw.ellipse([200, 300, 600, 600], fill=(16, 185, 129, 20))
    glow_draw.ellipse([700, 300, 1100, 600], fill=(6, 182, 212, 20))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # Fonts
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 34)
        font_subtitle = ImageFont.truetype("arial.ttf", 18)
        font_node_title = ImageFont.truetype("arialbd.ttf", 16)
        font_node_body = ImageFont.truetype("arial.ttf", 12)
        font_badge = ImageFont.truetype("arialbd.ttf", 12)
        font_metric = ImageFont.truetype("arialbd.ttf", 22)
    except:
        font_large = font_subtitle = font_node_title = font_node_body = font_badge = font_metric = ImageFont.load_default()

    # Outer Border with Accent Corners
    draw.rounded_rectangle([(16, 16), (width - 16, height - 16)], radius=24, outline=(40, 48, 65), width=2)
    
    # Header Banner Area
    # Top Tag
    tag_text = "ENTERPRISE TELEPHONY • AGENTIC AI ARCHITECTURE"
    tag_w = draw.textlength(tag_text, font=font_badge) if hasattr(draw, 'textlength') else 320
    draw.rounded_rectangle([(width//2 - tag_w//2 - 16, 40), (width//2 + tag_w//2 + 16, 68)], radius=14, fill=(183, 255, 60, 25), outline=(183, 255, 60, 120), width=1)
    draw.text((width//2 - tag_w//2, 47), tag_text, fill=(183, 255, 60), font=font_badge)

    # Main Title
    title = "Model Context Protocol (MCP) in Real-Time Voice AI Telephony"
    title_w = draw.textlength(title, font=font_large) if hasattr(draw, 'textlength') else 650
    draw.text((width//2 - title_w//2, 85), title, fill=(255, 255, 255), font=font_large)

    subtitle = "Sub-600ms Conversational Latency • Stateless Remote SSE Transport • Live Enterprise Tool-Calling"
    sub_w = draw.textlength(subtitle, font=font_subtitle) if hasattr(draw, 'textlength') else 550
    draw.text((width//2 - sub_w//2, 130), subtitle, fill=(156, 163, 175), font=font_subtitle)

    # 4 Architecture Stages (Left to Right)
    stages = [
        {
            "num": "01",
            "title": "Inbound Telephony",
            "badge": "PSTN / Twilio SIP",
            "badge_color": (59, 130, 246),
            "lines": [
                "• G.711 u-law @ 8kHz",
                "• E.164 Global Inbound",
                "• Twilio Elastic SIP Trunk",
                "• Latency: < 75ms"
            ],
            "x": 60,
            "y": 200,
            "w": 250,
            "h": 260
        },
        {
            "num": "02",
            "title": "Voice AI Orchestrator",
            "badge": "Vapi / Retell Engine",
            "badge_color": (16, 185, 129),
            "lines": [
                "• Deepgram Nova-2 STT",
                "• Acoustic Echo Cancellation",
                "• ElevenLabs Turbo v2.5",
                "• Voice Turn: 480ms"
            ],
            "x": 355,
            "y": 200,
            "w": 250,
            "h": 260
        },
        {
            "num": "03",
            "title": "MCP Tool Gateway",
            "badge": "Model Context Protocol",
            "badge_color": (183, 255, 60),
            "lines": [
                "• Stateless Remote SSE",
                "• FastMCP Tool Schemas",
                "• Mutual TLS & Auth Tokens",
                "• Async Task Execution"
            ],
            "x": 650,
            "y": 200,
            "w": 270,
            "h": 260
        },
        {
            "num": "04",
            "title": "Enterprise Backends",
            "badge": "Production Actions",
            "badge_color": (168, 85, 247),
            "lines": [
                "• PostgreSQL Direct Reads",
                "• HubSpot / CRM Sync",
                "• Google Calendar Booking",
                "• Stripe Invoice Dispatch"
            ],
            "x": 965,
            "y": 200,
            "w": 250,
            "h": 260
        }
    ]

    # Draw Connecting Flow Arrows
    for i in range(len(stages) - 1):
        s1 = stages[i]
        s2 = stages[i+1]
        x1 = s1["x"] + s1["w"]
        x2 = s2["x"]
        y_mid = s1["y"] + s1["h"] // 2
        # Arrow line
        draw.line([(x1 + 4, y_mid), (x2 - 4, y_mid)], fill=(183, 255, 60, 200), width=2)
        # Arrowhead
        draw.polygon([(x2 - 4, y_mid), (x2 - 12, y_mid - 6), (x2 - 12, y_mid + 6)], fill=(183, 255, 60))

    # Draw Cards
    for s in stages:
        # Card background
        draw.rounded_rectangle([(s["x"], s["y"]), (s["x"] + s["w"], s["y"] + s["h"])], radius=18, fill=(17, 22, 32, 235), outline=(45, 55, 75), width=2)
        # Accent top bar inside card
        draw.rounded_rectangle([(s["x"] + 14, s["y"] + 14), (s["x"] + 46, s["y"] + 36)], radius=6, fill=(255, 255, 255, 20))
        draw.text((s["x"] + 20, s["y"] + 18), s["num"], fill=(255, 255, 255), font=font_badge)

        # Badge
        b_text = s["badge"]
        b_w = draw.textlength(b_text, font=font_badge) if hasattr(draw, 'textlength') else 100
        draw.rounded_rectangle([(s["x"] + s["w"] - b_w - 24, s["y"] + 14), (s["x"] + s["w"] - 14, s["y"] + 36)], radius=6, fill=(s["badge_color"][0]//5, s["badge_color"][1]//5, s["badge_color"][2]//5, 255), outline=s["badge_color"], width=1)
        draw.text((s["x"] + s["w"] - b_w - 19, s["y"] + 18), b_text, fill=s["badge_color"], font=font_badge)

        # Title
        draw.text((s["x"] + 16, s["y"] + 55), s["title"], fill=(255, 255, 255), font=font_node_title)
        draw.line([(s["x"] + 16, s["y"] + 85), (s["x"] + s["w"] - 16, s["y"] + 85)], fill=(35, 45, 60), width=1)

        # Feature lines
        line_y = s["y"] + 105
        for line in s["lines"]:
            draw.text((s["x"] + 18, line_y), line, fill=(209, 213, 219), font=font_node_body)
            line_y += 32

    # Bottom Telemetry Dashboard Metric Cards (3 Cards)
    metrics = [
        {"title": "CONVERSATIONAL TURN LATENCY", "value": "540 ms", "desc": "Sub-600ms human-like speech turn with audio barge-in", "color": (183, 255, 60)},
        {"title": "MCP TOOL INVOCATION SPEED", "value": "115 ms", "desc": "Stateless Remote SSE query to enterprise databases", "color": (6, 182, 212)},
        {"title": "ENTERPRISE RESOLUTION RATE", "value": "84.2%", "desc": "Tier-1 inquiries resolved without human agent escalation", "color": (16, 185, 129)}
    ]

    card_w = 360
    card_gap = 40
    start_x = 60
    m_y = 500

    for m in metrics:
        draw.rounded_rectangle([(start_x, m_y), (start_x + card_w, m_y + 160)], radius=16, fill=(15, 20, 30, 240), outline=(40, 50, 70), width=1)
        draw.text((start_x + 20, m_y + 20), m["title"], fill=(156, 163, 175), font=font_badge)
        draw.text((start_x + 20, m_y + 45), m["value"], fill=m["color"], font=font_metric)
        draw.text((start_x + 20, m_y + 90), m["desc"], fill=(229, 231, 235), font=font_node_body)
        draw.text((start_x + 20, m_y + 120), "• Production Verified • Enterprise Grade", fill=(107, 114, 128), font=font_badge)
        start_x += card_w + card_gap

    # Save output
    out_path = 'public/assets/images/blog/mcp-voice-ai-agent-telephony-architecture.webp'
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.convert('RGB').save(out_path, 'WEBP', quality=95)
    print(f"Successfully generated: {out_path}")

if __name__ == "__main__":
    generate_banner()
