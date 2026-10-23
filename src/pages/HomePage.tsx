import React from 'react';
import { Hero } from '../components/sections/Hero';
import { TrustMetrics } from '../components/sections/TrustMetrics';
import { Services } from '../components/sections/Services';
import { SystemFlow } from '../components/sections/SystemFlow';
import { CaseStudies } from '../components/sections/CaseStudies';
import { WordPressFoundation } from '../components/sections/WordPressFoundation';
import { Process } from '../components/sections/Process';
import { TechStack } from '../components/sections/TechStack';
import { AboutTimeline } from '../components/sections/AboutTimeline';
import { Testimonials } from '../components/sections/Testimonials';
import { AeoFaq } from '../components/sections/AeoFaq';
import { CtaContact } from '../components/sections/CtaContact';
import { SEOHead } from '../components/seo/SEOHead';
import { CaseStudy } from '../data/portfolioData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface HomePageProps {
  onOpenInquiry: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenInquiry,
  onSelectCaseStudy,
}) => {
  const homeSchema = generateSchemaGraph('/');

  return (
    <>
      <SEOHead
        title="Sheharyar Siraj | AI Automation Architect & WordPress Systems Engineer"
        description="I build connected digital systems where WordPress provides the foundation, AI provides intelligence, and automation handles execution. 1,200+ projects delivered worldwide."
        canonicalUrl="https://sheharyarsiraj.com/"
        schema={homeSchema}
      />
      <Hero onOpenInquiry={onOpenInquiry} />
      <TrustMetrics />
      <Services onOpenInquiry={onOpenInquiry} />
      <SystemFlow />
      <CaseStudies onSelectCaseStudy={onSelectCaseStudy} />
      <WordPressFoundation />
      <Process />
      <TechStack />
      <AboutTimeline />
      <Testimonials />
      <AeoFaq />
      <CtaContact onOpenInquiry={onOpenInquiry} />
    </>
  );
};
