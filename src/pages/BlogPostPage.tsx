import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  User, 
  Sparkles,
  BookOpen,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { BLOG_POSTS, BlogPost } from '../data/blogData';

interface BlogPostPageProps {
  onOpenInquiry: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenInquiry }) => {
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return <Navigate to="/blog/" replace />;
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))).slice(0, 3);

  // Full BlogPosting Schema for Google & AEO
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://sheharyarsiraj.com/blog/${post.slug}/#article`,
    url: `https://sheharyarsiraj.com/blog/${post.slug}/`,
    headline: post.title,
    description: post.metaDescription,
    datePublished: `${post.publishedDate}T09:00:00+05:00`,
    dateModified: `${post.updatedDate}T12:00:00+05:00`,
    inLanguage: 'en-US',
    mainEntityOfPage: `https://sheharyarsiraj.com/blog/${post.slug}/`,
    image: {
      '@type': 'ImageObject',
      url: `https://sheharyarsiraj.com${post.featuredImage}`,
      width: 1200,
      height: 630
    },
    author: {
      '@type': 'Person',
      '@id': 'https://sheharyarsiraj.com/#person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: 'https://sheharyarsiraj.com/',
      sameAs: [
        'https://www.linkedin.com/in/sheharyar-siraj/',
        'https://github.com/sheharyarsiraj',
        'https://www.upwork.com/freelancers/sheharyarsiraj'
      ]
    },
    publisher: {
      '@type': 'ProfessionalService',
      '@id': 'https://sheharyarsiraj.com/#business',
      name: 'Sheharyar Siraj - AI Systems & Web Architecture',
      url: 'https://sheharyarsiraj.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sheharyarsiraj.com/og-image.png'
      }
    },
    keywords: post.tags.join(', ')
  };

  return (
    <div className="pt-24 pb-20">
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="px-4 sm:px-8 max-w-5xl mx-auto">
        <SEOHead
          title={post.seoTitle}
          description={post.metaDescription}
          canonicalUrl={`https://sheharyarsiraj.com/blog/${post.slug}/`}
          schema={blogPostingSchema}
        />

        <Breadcrumbs
          items={[
            { label: 'BLOG', href: '/blog/' },
            { label: post.category.toUpperCase(), href: '/blog/' },
            { label: post.title.slice(0, 32) + '...' }
          ]}
        />

        {/* Back Button */}
        <div className="my-6">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
              <Calendar size={13} />
              Published: {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
              <Clock size={13} />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          <p className="text-brand-secondary text-base sm:text-lg leading-relaxed font-body mb-8">
            {post.excerpt}
          </p>

          {/* Author Strip & Share */}
          <div className="p-4 rounded-2xl bg-surface-1 border border-brand-border/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-heading font-black text-accent text-sm">
                SS
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-white">{post.author.name}</div>
                <div className="text-[11px] font-mono text-accent">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-surface-2 border border-brand-border text-xs font-mono text-brand-secondary hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Share2 size={13} />
                <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Executive Key Takeaways Box (AEO Optimized) */}
        <div className="mb-12 p-6 sm:p-7 rounded-2xl bg-surface-1/90 border border-accent/30 shadow-lg">
          <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={15} />
            <span>EXECUTIVE KEY TAKEAWAYS (AEO SUMMARY)</span>
          </div>
          <ul className="space-y-2.5">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white font-body leading-relaxed">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 p-5 rounded-2xl bg-surface-2/40 border border-brand-border/60">
          <div className="text-xs font-mono text-white font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BookOpen size={13} className="text-accent" />
            <span>TABLE OF CONTENTS</span>
          </div>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {post.tableOfContents.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-brand-secondary hover:text-accent transition-colors flex items-center gap-2 py-1"
              >
                <span className="text-accent font-bold">0{idx + 1}.</span>
                <span className="truncate">{item.title}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Article Body */}
        <article className="prose prose-invert max-w-none font-body leading-relaxed text-brand-secondary space-y-6 text-sm sm:text-base">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              const headingText = paragraph.replace('### ', '');
              const matchingToc = post.tableOfContents.find(t => headingText.toLowerCase().includes(t.title.toLowerCase().slice(0, 10)));
              const anchorId = matchingToc ? matchingToc.id : `section-${idx}`;
              return (
                <h2
                  key={idx}
                  id={anchorId}
                  className="font-heading text-xl sm:text-2xl font-bold text-white pt-8 pb-2 border-b border-brand-border/40 scroll-mt-28"
                >
                  {headingText}
                </h2>
              );
            }

            if (paragraph.startsWith('```')) {
              const lines = paragraph.split('\n');
              const language = lines[0].replace('```', '') || 'code';
              const code = lines.slice(1, -1).join('\n');
              return (
                <div key={idx} className="my-6 rounded-2xl overflow-hidden border border-brand-border bg-black/60 shadow-xl">
                  <div className="px-4 py-2 bg-surface-2 border-b border-brand-border/60 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                    <span>{language.toUpperCase()}</span>
                    <span>Production Architecture</span>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto text-emerald-400 leading-relaxed custom-scrollbar">
                    <code>{code}</code>
                  </pre>
                </div>
              );
            }

            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n- ').map(i => i.replace(/^- /, ''));
              return (
                <ul key={idx} className="space-y-2 my-4 pl-4">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="list-disc marker:text-accent text-white/90">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={idx} className="text-white/80 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-brand-border/60 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
            <Tag size={13} /> Tags:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-brand-secondary bg-surface-1 border border-brand-border/60 px-3 py-1 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Technical FAQs Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16 pt-10 border-t border-brand-border">
            <div className="flex items-center gap-2 text-xs font-mono text-accent font-bold uppercase tracking-wider mb-2">
              <HelpCircle size={14} />
              <span>FREQUENTLY ASKED QUESTIONS (AEO/GEO GROUNDING)</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-6">
              Technical Q&amp;A
            </h3>

            <div className="space-y-3">
              {post.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-surface-1 border border-brand-border/60 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-heading font-bold text-sm sm:text-base text-white hover:text-accent transition-colors flex items-center justify-between gap-4"
                  >
                    <span>{faq.question}</span>
                    {openFaq === idx ? (
                      <ChevronUp size={16} className="text-accent shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-brand-muted shrink-0" />
                    )}
                  </button>

                  {openFaq === idx && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-brand-secondary font-body leading-relaxed border-t border-brand-border/40 bg-surface-2/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio Card */}
        <div className="mt-16 p-6 rounded-2xl bg-surface-1 border border-brand-border/80 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center font-heading font-black text-accent text-xl shrink-0">
            SS
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h4 className="font-heading font-bold text-lg text-white">{post.author.name}</h4>
              <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-mono text-[10px] font-bold">
                VERIFIED ARCHITECT
              </span>
            </div>
            <p className="text-xs text-accent font-mono">{post.author.role}</p>
            <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-brand-border">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-6">
              Related Engineering Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}/`}
                  className="p-5 rounded-xl bg-surface-1 border border-brand-border/60 hover:border-accent transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-accent uppercase font-bold">
                      {rel.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white group-hover:text-accent transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-brand-secondary line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-brand-muted pt-3 flex items-center justify-between">
                    <span>{rel.readTime}</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-surface-1 border border-accent/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
              READY TO IMPLEMENT THIS ARCHITECTURE?
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Engineer Your High-Performance Web & AI Stack
            </h3>
            <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
              Skip the trial-and-error. Sheharyar Siraj designs and deploys zero-bloat WordPress VIP platforms, sub-600ms AI voice agents, and custom workflow automations for international businesses under strict SLAs.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="px-6 py-3.5 rounded-xl bg-accent text-black font-mono text-xs font-bold hover:bg-white transition-all shadow-lg shadow-accent/25 shrink-0 flex items-center gap-2 active:scale-95"
          >
            <span>Book Architectural Consultation</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
