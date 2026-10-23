import os
import urllib.request
import io
from PIL import Image, ImageDraw, ImageEnhance

os.makedirs('public/assets/images/blog', exist_ok=True)

IMAGES = [
    {
        'filename': 'wordpress-php-vip-sub-1s-lcp.webp',
        'url': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop&q=85',
        'badge': 'PHP 8.2 VIP • REDIS OBJECT CACHING',
        'title': 'Decoupled WordPress Architecture: Sub-1s LCP'
    },
    {
        'filename': 'vapi-ai-voice-telephony-architecture.webp',
        'url': 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=675&fit=crop&q=85',
        'badge': 'VAPI • TWILIO SIP • SUB-600MS LATENCY',
        'title': 'Autonomous AI Voice Telephony & Call Handoff'
    },
    {
        'filename': 'woocommerce-hpos-high-concurrency-checkout.webp',
        'url': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=675&fit=crop&q=85',
        'badge': 'WOOCOMMERCE HPOS • 10K+ DAILY ORDERS',
        'title': 'High-Concurrency Checkout & Order Sharding'
    },
    {
        'filename': 'n8n-self-hosted-cluster-automation.webp',
        'url': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop&q=85',
        'badge': 'SELF-HOSTED N8N • REDIS QUEUES • DOCKER',
        'title': 'Enterprise Automation Clusters vs Zapier'
    },
    {
        'filename': 'enterprise-rag-vector-hybrid-search.webp',
        'url': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=675&fit=crop&q=85',
        'badge': 'QDRANT VECTOR STORE • HYBRID BM25 SEARCH',
        'title': 'Production RAG & Zero-Hallucination Retrieval'
    },
    {
        'filename': 'geo-generative-engine-optimization-schema.webp',
        'url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&fit=crop&q=85',
        'badge': 'GEO • SCHEMA ENTITY GRAPH • AEO CITATIONS',
        'title': 'Generative Engine Optimization & LLM Ranking'
    },
    {
        'filename': 'agentic-ai-langgraph-multi-agent.webp',
        'url': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop&q=85',
        'badge': 'LANGGRAPH • PYTHON SUPERVISOR • AGENTS',
        'title': 'Deterministic Multi-Agent Execution Graphs'
    },
    {
        'filename': 'white-label-agency-development-infrastructure.webp',
        'url': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop&q=85',
        'badge': 'AGENCY WHITE-LABEL • GIT & CI/CD PIPELINES',
        'title': 'The Invisible Technical Partner for Digital Agencies'
    },
    {
        'filename': 'wordpress-database-autoload-transient-cleaner.webp',
        'url': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=675&fit=crop&q=85',
        'badge': 'WP_OPTIONS AUTOLOAD • MYSQL INNODB TUNING',
        'title': 'Eliminating Database Bloat & Transient Queries'
    },
    {
        'filename': 'b2b-executive-bi-etl-pipeline-dashboards.webp',
        'url': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=85',
        'badge': 'EVENT-DRIVEN ETL • POSTGRESQL • METABASE BI',
        'title': 'Automating B2B Executive Intelligence & Telemetry'
    }
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for item in IMAGES:
    target_path = os.path.join('public', 'assets', 'images', 'blog', item['filename'])
    print(f"Fetching {item['filename']}...")
    try:
        req = urllib.request.Request(item['url'], headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            img_data = response.read()
        
        base_img = Image.open(io.BytesIO(img_data)).convert('RGB')
        base_img = base_img.resize((1200, 675), Image.Resampling.LANCZOS)
        
        # Apply dark tech grading
        enhancer = ImageEnhance.Color(base_img)
        base_img = enhancer.enhance(0.9)
        bright_enhancer = ImageEnhance.Brightness(base_img)
        base_img = bright_enhancer.enhance(0.7)
        
        # Create subtle gradient overlay
        overlay = Image.new('RGBA', (1200, 675), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        
        # Vignette & bottom dark gradient
        for y in range(350, 675):
            alpha = int(220 * ((y - 350) / 325))
            draw.line([(0, y), (1200, y)], fill=(8, 10, 15, alpha))
            
        # Subtle cyan tech ambient line at bottom
        draw.line([(0, 674), (1200, 674)], fill=(0, 229, 255, 180), width=3)
        
        # Combine
        final_img = Image.alpha_composite(base_img.convert('RGBA'), overlay).convert('RGB')
        final_draw = ImageDraw.Draw(final_img)
        
        # Tech badge overlay on bottom-left
        final_draw.rectangle([50, 560, 50 + len(item['badge']) * 11 + 20, 595], fill=(15, 23, 42), outline=(0, 229, 255), width=1)
        final_draw.text((60, 570), item['badge'], fill=(0, 229, 255))
        final_draw.text((50, 610), item['title'], fill=(255, 255, 255))
        
        # Save as optimized webp
        final_img.save(target_path, 'WEBP', quality=88, method=6)
        print(f"  [OK] Saved {target_path} (1200x675 WEBP)")
    except Exception as e:
        print(f"  [FAIL] Failed {item['filename']}: {e}")
        # Fallback generator
        fallback = Image.new('RGB', (1200, 675), color=(10, 14, 22))
        fdraw = ImageDraw.Draw(fallback)
        for x in range(0, 1200, 60):
            fdraw.line([(x, 0), (x, 675)], fill=(18, 26, 40), width=1)
        for y in range(0, 675, 60):
            fdraw.line([(0, y), (1200, y)], fill=(18, 26, 40), width=1)
        fdraw.text((60, 300), item['title'], fill=(255, 255, 255))
        fdraw.text((60, 340), item['badge'], fill=(0, 229, 255))
        fallback.save(target_path, 'WEBP', quality=88)
        print(f"  [FALLBACK] Generated fallback {target_path}")

print("\nAll 10 blog images fetched and optimized!")
