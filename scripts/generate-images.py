import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/assets/images', exist_ok=True)

# 1. Generate hero-poster.webp (1920x1080)
hero_img = Image.new('RGB', (1920, 1080), color=(8, 8, 8))
draw = ImageDraw.Draw(hero_img)

# Draw subtle ambient glows
for i in range(120, 0, -2):
    alpha_color = (int(0 + i * 0.2), int(180 * (i / 120)), int(216 * (i / 120)))
    draw.ellipse([1200 - i * 4, 300 - i * 3, 1600 + i * 4, 700 + i * 3], outline=alpha_color, width=2)

for i in range(80, 0, -2):
    draw.ellipse([200 - i * 3, 100 - i * 2, 500 + i * 3, 400 + i * 2], outline=(int(100 * (i/80)), int(60 * (i/80)), int(220 * (i/80))), width=1)

# Subtle grid lines
for x in range(0, 1920, 80):
    draw.line([(x, 0), (x, 1080)], fill=(18, 22, 28), width=1)
for y in range(0, 1080, 80):
    draw.line([(y, 0), (1920, y)], fill=(18, 22, 28), width=1)

# Text watermark for hero background
draw.text((120, 480), "SHEHARYAR SIRAJ", fill=(255, 255, 255))
draw.text((120, 530), "AI AUTOMATION ARCHITECT & WORDPRESS SYSTEMS ENGINEER", fill=(0, 229, 255))

hero_img.save('public/assets/images/hero-poster.webp', 'WEBP', quality=90)
print("Generated public/assets/images/hero-poster.webp (1920x1080)")

# 2. Generate og-image (1200x630)
og_img = Image.new('RGB', (1200, 630), color=(10, 12, 16))
og_draw = ImageDraw.Draw(og_img)

for x in range(0, 1200, 60):
    og_draw.line([(x, 0), (x, 630)], fill=(18, 24, 32), width=1)
for y in range(0, 630, 60):
    og_draw.line([(0, y), (1200, y)], fill=(18, 24, 32), width=1)

# Glows
for i in range(80, 0, -2):
    og_draw.ellipse([800 - i*3, 150 - i*2, 1100 + i*3, 450 + i*2], outline=(0, int(200*(i/80)), int(255*(i/80))), width=2)

# Card border
og_draw.rectangle([30, 30, 1170, 600], outline=(40, 50, 70), width=2)
og_draw.text((80, 160), "SHEHARYAR SIRAJ", fill=(255, 255, 255))
og_draw.text((80, 220), "AI Automation Architect & WordPress Systems Engineer", fill=(0, 229, 255))
og_draw.text((80, 280), "WordPress VIP • Autonomous AI Voice (Vapi) • n8n Workflows • High-Performance Systems", fill=(180, 190, 205))
og_draw.text((80, 360), "Verified Metrics: Sub-600ms Voice Latency • 1,200+ Deployments • 99.98% System Uptime", fill=(245, 158, 11))
og_draw.text((80, 480), "sheharyarsiraj.com | Global: US • UK • UAE • SA • CA • NL", fill=(120, 140, 165))

og_img.save('public/assets/images/sheharyar-siraj-ai-automation.webp', 'WEBP', quality=92)
og_img.save('public/assets/images/sheharyar-siraj-ai-automation.jpg', 'JPEG', quality=90)
og_img.save('public/og-image.webp', 'WEBP', quality=92)
og_img.save('public/og-image.png', 'PNG')
print("Generated og-images in WEBP, JPG, and PNG formats.")
