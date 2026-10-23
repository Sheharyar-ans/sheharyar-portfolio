import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  schema?: object;
  type?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  keywords,
  schema,
  type = 'website'
}) => {
  useEffect(() => {
    // Dynamically update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update Open Graph
    const setOgMeta = (property: string, content: string) => {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', property);
        document.head.appendChild(og);
      }
      og.setAttribute('content', content);
    };

    setOgMeta('og:title', title);
    setOgMeta('og:description', description);
    setOgMeta('og:url', canonicalUrl);
    setOgMeta('og:type', type);

    // Update Twitter
    const setTwitterMeta = (property: string, content: string) => {
      let tw = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!tw) {
        tw = document.createElement('meta');
        tw.setAttribute('name', property);
        document.head.appendChild(tw);
      }
      tw.setAttribute('content', content);
    };

    setTwitterMeta('twitter:title', title);
    setTwitterMeta('twitter:description', description);
    setTwitterMeta('twitter:url', canonicalUrl);

    // Update or insert route-specific JSON-LD Schema
    const existingRouteSchema = document.getElementById('route-schema-ld');
    if (existingRouteSchema) {
      existingRouteSchema.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'route-schema-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById('route-schema-ld');
      if (s) s.remove();
    };
  }, [title, description, canonicalUrl, keywords, schema, type]);

  return null;
};
