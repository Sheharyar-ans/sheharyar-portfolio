import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from '../data/blogData';

interface BlogListingPageProps {
  onOpenInquiry: () => void;
}

export const BlogListingPage: React.FC<BlogListingPageProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sortedBlogs = useMemo(() => {
    return [...BLOG_POSTS].sort(
      (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  }, []);

  const filteredPosts = useMemo(() => {
    return sortedBlogs.filter((post) => {
      const matchesCategory = selectedCategory === 'All Articles' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [sortedBlogs, selectedCategory, searchQuery]);

  const featuredPost = sortedBlogs[0];

  const listingSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://sheharyarsiraj.com/blog/#collectionpage',
    url: 'https://sheharyarsiraj.com/blog/',
    name: 'Technical Architecture & Systems Engineering Blog | Sheharyar Siraj',
    description: 'In-depth engineering articles on custom WordPress VIP architectures, sub-600ms AI voice agents, WooCommerce HPOS scaling, and self-hosted n8n automations.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://sheharyarsiraj.com/#website',
      name: 'Sheharyar Siraj',
      url: 'https://sheharyarsiraj.com/'
    },
    about: {
      '@type': 'Person',
      '@id': 'https://sheharyarsiraj.com/#person',
      name: 'Sheharyar Siraj'
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Technical Architecture & AI Automation Blog | Sheharyar Siraj"
        description="In-depth engineering guides: custom WordPress VIP architectures, sub-600ms conversational AI voice agents, WooCommerce HPOS, and enterprise workflow automations."
        canonicalUrl="https://sheharyarsiraj.com/blog/"
        schema={listingSchema}
      />

      <Breadcrumbs items={[{ label: 'TECHNICAL BLOG & DOSSIER' }]} />

      {/* Header */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <BookOpen size={14} />
          <span>ENGINEERING DOSSIER & PILLAR GUIDES</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Architectural Insights & <span className="text-accent">Systems Engineering</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Zero-fluff technical deep dives on decoupled WordPress development, sub-600ms conversational AI telephony, high-concurrency database tuning, and enterprise automation pipelines.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4 mb-12">
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. HPOS, Vapi, Redis, n8n, Schema)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-1 border border-brand-border/80 text-white placeholder-brand-muted text-xs sm:text-sm font-mono focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-accent text-black font-bold shadow-md shadow-accent/20'
                  : 'bg-surface-1 border border-brand-border/60 text-brand-secondary hover:text-white hover:border-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Pillar Article Spotlight */}
      {selectedCategory === 'All Articles' && !searchQuery && featuredPost && (
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-surface-1 border border-brand-border/80 hover:border-accent transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-[11px] font-bold uppercase tracking-wider">
                  FEATURED PILLAR ARTICLE
                </span>
                <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(featuredPost.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
                  <Clock size={12} />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-accent transition-colors">
                <Link to={`/blog/${featuredPost.slug}/`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-brand-secondary font-body leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {featuredPost.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-mono text-brand-muted bg-surface-2 px-2.5 py-1 rounded-md border border-brand-border/40">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to={`/blog/${featuredPost.slug}/`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-black font-mono text-xs font-bold hover:bg-white transition-all shadow-md shadow-accent/20 group-hover:translate-x-1 active:scale-95"
                >
                  <span>Read Technical Dossier</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Featured Image & Author Card */}
            <div className="w-full lg:w-96 shrink-0 space-y-4">
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-brand-border/60 shadow-xl bg-surface-2 relative">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.featuredImageAlt || featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width="600"
                  height="338"
                  loading="eager"
                />
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/60 border border-brand-border/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-heading font-black text-accent text-sm">
                    SS
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-white">{featuredPost.author.name}</div>
                    <div className="text-[10px] font-mono text-brand-muted">Lead Systems Engineer</div>
                  </div>
                </div>
                <p className="text-[11px] text-brand-secondary font-body leading-relaxed">
                  {featuredPost.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="p-5 sm:p-6 rounded-2xl bg-surface-1 border border-brand-border/60 hover:border-accent hover:-translate-y-1 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Responsive 16:9 Image Container (0 CLS) */}
              <Link to={`/blog/${post.slug}/`} className="block w-full aspect-video rounded-xl overflow-hidden border border-brand-border/60 bg-surface-2 relative">
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt || post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="338"
                />
              </Link>

              <div className="flex items-center justify-between text-xs font-mono text-brand-muted">
                <span className="px-2 py-0.5 rounded bg-surface-2 border border-brand-border/60 text-accent font-bold text-[10px] uppercase">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors line-clamp-2">
                <Link to={`/blog/${post.slug}/`}>
                  {post.title}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm text-brand-secondary font-body line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] font-mono text-brand-muted bg-surface-2 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-brand-border/40 flex items-center justify-between">
              <span className="text-[11px] font-mono text-brand-muted">
                {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>

              <Link
                to={`/blog/${post.slug}/`}
                className="text-xs font-mono font-bold text-accent group-hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Read Guide</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-20 text-center font-mono text-brand-muted text-sm">
          No articles found matching &quot;{searchQuery}&quot;. Try selecting another category above.
        </div>
      )}

      {/* Consultation Scoping Banner */}
      <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-surface-1 border border-brand-border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>CUSTOM ARCHITECTURAL ROADMAP</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Have a Complex Systems or AI Engineering Project?
          </h3>
          <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
            Connect directly with Sheharyar Siraj. We review your technical requirements and provide a fixed milestone roadmap with guaranteed sub-2 hour communication SLA.
          </p>
        </div>

        <button
          onClick={onOpenInquiry}
          className="px-6 py-3 rounded-xl bg-accent text-black font-mono text-xs font-bold hover:bg-white transition-all shadow-lg shadow-accent/20 shrink-0 flex items-center gap-2 active:scale-95"
        >
          <span>Schedule Scoping Session</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
