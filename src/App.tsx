import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { CustomCursor } from './components/visuals/CustomCursor';
import { CaseStudy } from './data/portfolioData';

// Route Pages
import { HomePage } from './pages/HomePage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { SubServicePage } from './pages/SubServicePage';
import { WhiteLabelPage } from './pages/WhiteLabelPage';
import { LocationPage } from './pages/LocationPage';
import { LocationsHubPage } from './pages/LocationsHubPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { ToolsHubPage } from './pages/ToolsHubPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { LocalSchemaGeneratorPage } from './pages/LocalSchemaGeneratorPage';
import { DatabaseBloatEstimatorPage } from './pages/DatabaseBloatEstimatorPage';
import { CptCodeExporterPage } from './pages/CptCodeExporterPage';
import { WordpressPluginBoilerplateGeneratorPage } from './pages/WordpressPluginBoilerplateGeneratorPage';
import { VoiceAgentRoiCalculatorPage } from './pages/VoiceAgentRoiCalculatorPage';
import { VoicePromptDesignerPage } from './pages/VoicePromptDesignerPage';
import { WebhookPayloadTesterPage } from './pages/WebhookPayloadTesterPage';
import { N8nErrorHandlerPage } from './pages/N8nErrorHandlerPage';
import { LlmSeoMetaGeneratorPage } from './pages/LlmSeoMetaGeneratorPage';
import { WooCommerceSkuAuditorPage } from './pages/WooCommerceSkuAuditorPage';
import { AboutPage } from './pages/AboutPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ContactPage } from './pages/ContactPage';
import { FreelancerInPakistanPage } from './pages/FreelancerInPakistanPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CodeArcadePage } from './pages/CodeArcadePage';
import { AiChatbotWidget } from './components/chat/AiChatbotWidget';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';

const CaseStudyModal = React.lazy(() =>
  import('./components/modals/CaseStudyModal').then((m) => ({ default: m.CaseStudyModal }))
);
const DirectConnectModal = React.lazy(() =>
  import('./components/modals/DirectConnectModal').then((m) => ({ default: m.DirectConnectModal }))
);

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  // Initialize Lenis smooth scroll and connect with GSAP
  useEffect(() => {
    // Respect reduced motion OR mobile touch devices
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 1024 ||
      'ontouchstart' in window
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white relative selection:bg-accent selection:text-black">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Background grain texture */}
      <div className="bg-grain" aria-hidden="true" />

      {/* Custom follower cursor */}
      <CustomCursor />

      {/* Sticky navigation */}
      <Navbar onOpenInquiry={() => setIsConnectOpen(true)} />

      {/* Main page content with programmatic routes */}
      <main id="main-content">
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenInquiry={() => setIsConnectOpen(true)}
                onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
              />
            }
          />

          {/* Services Hub */}
          <Route
            path="/services"
            element={<ServicesHubPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/services/"
            element={<ServicesHubPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Sub-Services */}
          <Route
            path="/services/:serviceSlug"
            element={<SubServicePage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/services/:serviceSlug/"
            element={<SubServicePage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* White-Label Agency Portals */}
          <Route
            path="/white-label/:portalSlug"
            element={<WhiteLabelPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/white-label/:portalSlug/"
            element={<WhiteLabelPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Global Locations Hub */}
          <Route
            path="/locations"
            element={<LocationsHubPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/locations/"
            element={<LocationsHubPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Programmatic Regional GEO Pages */}
          <Route
            path="/locations/:geoSlug"
            element={<LocationPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/locations/:geoSlug/"
            element={<LocationPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Verification Hubs */}
          <Route
            path="/case-studies"
            element={
              <CaseStudiesPage
                onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
                onOpenInquiry={() => setIsConnectOpen(true)}
              />
            }
          />
          <Route
            path="/case-studies/"
            element={
              <CaseStudiesPage
                onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
                onOpenInquiry={() => setIsConnectOpen(true)}
              />
            }
          />

          {/* Systems & Utility Tools Hub */}
          <Route
            path="/tools"
            element={<ToolsHubPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/"
            element={<ToolsHubPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* AI-Powered Local Schema & Entity Graph Generator */}
          <Route
            path="/tools/local-schema-generator"
            element={<LocalSchemaGeneratorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/local-schema-generator/"
            element={<LocalSchemaGeneratorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* WordPress Database Bloat & Transient Cleaner Estimator */}
          <Route
            path="/tools/wordpress-database-bloat-estimator"
            element={<DatabaseBloatEstimatorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/wordpress-database-bloat-estimator/"
            element={<DatabaseBloatEstimatorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* WordPress Custom Post Type & Meta Field Code Exporter */}
          <Route
            path="/tools/wordpress-cpt-code-exporter"
            element={<CptCodeExporterPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/wordpress-cpt-code-exporter/"
            element={<CptCodeExporterPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* WordPress Custom Plugin Boilerplate Generator */}
          <Route
            path="/tools/wordpress-plugin-boilerplate-generator"
            element={<WordpressPluginBoilerplateGeneratorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/wordpress-plugin-boilerplate-generator/"
            element={<WordpressPluginBoilerplateGeneratorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Voice Agent & Workflow Cost/ROI Calculator */}
          <Route
            path="/tools/voice-agent-roi-calculator"
            element={<VoiceAgentRoiCalculatorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/voice-agent-roi-calculator/"
            element={<VoiceAgentRoiCalculatorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* AI Voice Agent Flowchart & Prompt Architecture Designer */}
          <Route
            path="/tools/ai-voice-prompt-designer"
            element={<VoicePromptDesignerPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/ai-voice-prompt-designer/"
            element={<VoicePromptDesignerPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* n8n / Make Webhook Payload Tester & Debugger */}
          <Route
            path="/tools/webhook-payload-tester"
            element={<WebhookPayloadTesterPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/webhook-payload-tester/"
            element={<WebhookPayloadTesterPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* n8n Error Handler & JSON Payload Transformer */}
          <Route
            path="/tools/n8n-error-handler-generator"
            element={<N8nErrorHandlerPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/n8n-error-handler-generator/"
            element={<N8nErrorHandlerPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Dynamic LLM Prompt Generator & SEO Meta Optimizer */}
          <Route
            path="/tools/llm-seo-meta-generator"
            element={<LlmSeoMetaGeneratorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/llm-seo-meta-generator/"
            element={<LlmSeoMetaGeneratorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* WooCommerce SKU & Metadata Health Auditor */}
          <Route
            path="/tools/woocommerce-seo-sku-auditor"
            element={<WooCommerceSkuAuditorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/woocommerce-seo-sku-auditor/"
            element={<WooCommerceSkuAuditorPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Standalone Tool Detail Pages */}
          <Route
            path="/tools/:toolSlug"
            element={<ToolDetailPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/tools/:toolSlug/"
            element={<ToolDetailPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          <Route
            path="/about"
            element={<AboutPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/about/"
            element={<AboutPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Dedicated Certifications & Technical Credentials */}
          <Route
            path="/certifications"
            element={<CertificationsPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/certifications/"
            element={<CertificationsPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/credentials"
            element={<CertificationsPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/credentials/"
            element={<CertificationsPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          <Route
            path="/contact"
            element={<ContactPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/contact/"
            element={<ContactPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Freelancer in Pakistan Dedicated Landing Page */}
          <Route
            path="/freelancer-in-pakistan"
            element={<FreelancerInPakistanPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/freelancer-in-pakistan/"
            element={<FreelancerInPakistanPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Legal, Governance & Compliance */}
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicyPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/privacy-policy/"
            element={<PrivacyPolicyPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          <Route
            path="/terms"
            element={<TermsPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/terms/"
            element={<TermsPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/terms-and-conditions"
            element={<TermsPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/terms-and-conditions/"
            element={<TermsPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Engineering Blog & Knowledge Base */}
          <Route
            path="/blog"
            element={<BlogListingPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/blog/"
            element={<BlogListingPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/blog/:slug"
            element={<BlogPostPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/blog/:slug/"
            element={<BlogPostPage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* 3D Code Arcade Practice Game */}
          <Route
            path="/code-arcade"
            element={<CodeArcadePage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />
          <Route
            path="/code-arcade/"
            element={<CodeArcadePage onOpenInquiry={() => setIsConnectOpen(true)} />}
          />

          {/* Prevent routing duplicates / canonical aliases */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/home/" element={<Navigate to="/" replace />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/index.php" element={<Navigate to="/" replace />} />

          {/* 404 Fallback - canonical redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Site footer */}
      <Footer onOpenInquiry={() => setIsConnectOpen(true)} />

      {/* Autonomous Voice AI Telephony Assistant (Zero-Cost Client Speech Pipeline) */}
      <VoiceAssistantModal onOpenInquiry={() => setIsConnectOpen(true)} />

      {/* Floating RAG AI Chatbot Widget */}
      <AiChatbotWidget onOpenInquiry={() => setIsConnectOpen(true)} />

      {/* Modals (Dynamically loaded on demand) */}
      <React.Suspense fallback={null}>
        {selectedCaseStudy && (
          <CaseStudyModal
            caseStudy={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
          />
        )}

        {isConnectOpen && (
          <DirectConnectModal
            isOpen={isConnectOpen}
            onClose={() => setIsConnectOpen(false)}
          />
        )}
      </React.Suspense>
    </div>
  );
};

export default App;
