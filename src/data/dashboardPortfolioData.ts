export interface DashboardProject {
  id: string;
  title: string;
  client: string;
  category: 'Power BI' | 'Advanced Excel' | 'Data Analytics & SEO' | 'Python & Machine Learning';
  badge: string;
  tool: string;
  tools: string[];
  image: string;
  liveUrl?: string;
  shortDesc: string;
  fullDesc: string;
  metrics: {
    kpi: string;
    secondaryKpi: string;
    impact: string;
  };
  chartsIncluded: string[];
  deliverables: string[];
}

export const DASHBOARD_PROJECTS: DashboardProject[] = [
  {
    id: 'dash-customer-churn-streamlit',
    title: 'Customer Churn Prediction & Retention Machine Learning App',
    client: 'Subscription & Telecom Analytics (Live Streamlit App)',
    category: 'Python & Machine Learning',
    badge: 'STREAMLIT & MACHINE LEARNING',
    tool: 'Python, Streamlit & Scikit-learn',
    tools: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Predictive Modeling', 'Cloud Deployment'],
    image: '/assets/images/dashboards/dashboard-customer-churn-streamlit.webp',
    liveUrl: 'https://dsaprojectjp.streamlit.app/',
    shortDesc: 'Live cloud-deployed machine learning application that predicts customer churn probabilities using 15 demographic, contract, and usage parameters.',
    fullDesc: 'Engineered an interactive predictive data science application hosted live on Streamlit Cloud (dsaprojectjp.streamlit.app). Trained on multi-parametric customer telemetry including contract duration, monthly charges, tenure, support ticket frequency, and payment history to compute real-time churn risk classifications.',
    metrics: {
      kpi: '15-Feature ML Model',
      secondaryKpi: 'Sub-Second Inference',
      impact: 'Interactive Churn Scoring'
    },
    chartsIncluded: [
      'Multi-Factor Customer Telemetry Inputs (Tenure, Contract, Monthly Usage)',
      'Real-Time Binary Churn Classification & Risk Probability Meter',
      'Customer Support Call Frequency Hazard Scoring',
      'Contract Type & Payment Method Sensitivity Analysis',
      'Interactive Web-Based Prediction Workspace on Streamlit Cloud'
    ],
    deliverables: [
      'End-to-End Supervised ML Pipeline with Scikit-learn',
      'Live Cloud-Hosted Interactive Streamlit Deployment (dsaprojectjp.streamlit.app)',
      'Dynamic Form Ingestion & Multi-Parametric Normalization',
      'Real-Time Probability Estimation & Churn Retention Flags'
    ]
  },
  {
    id: 'dash-housing-data-report',
    title: 'Housing Market Valuation & Property Analytics Dashboard',
    client: 'Real Estate Investment Trust (USA & EU)',
    category: 'Power BI',
    badge: 'POWER BI REAL ESTATE BI',
    tool: 'Power BI & DAX',
    tools: ['Power BI', 'DAX Measures', 'Spatial Modeling', 'Statistical Valuation', 'Interactive Filters'],
    image: '/assets/images/dashboards/dashboard-real-estate-housing.webp',
    shortDesc: 'Comprehensive executive property market valuation dashboard analyzing 546 properties, pricing variance by furnishing, stories, and structural amenities.',
    fullDesc: 'Architected an end-to-end real estate market intelligence dashboard in Power BI. Analyzed $4.77M average property pricing across furnished ($5.61M), semi-furnished ($4.87M), and unfurnished tiers. Features parametric multi-story price per square meter analysis, basement/guestroom correlation models, and air conditioning premium valuations.',
    metrics: {
      kpi: '$4.77M Overall Avg Price',
      secondaryKpi: '546 Properties Evaluated',
      impact: '64% AC & 67% Basement Correlation'
    },
    chartsIncluded: [
      'Average Price by Furnishing Status ($5.61M vs $3.90M)',
      'Number of Stories per Square Metre (1 to 4 stories)',
      'Status of Basement and Guestroom Distribution',
      'Structural Story Ratio (42.9% semi-furnished, 33.6% unfurnished)',
      'AC Valuation Premium Ratio (59.8% with AC at $5.96M avg)'
    ],
    deliverables: [
      'ETL Data Cleansing & Normalization in Power Query',
      'Custom DAX Measures for Parametric Property Valuation',
      'Interactive Multi-Select Slicers & Dynamic Filtering',
      'Executive Summary Report Exportable to C-Suite'
    ]
  },
  {
    id: 'dash-sales-financial-excel',
    title: 'Executive Sales, Revenue & Financial KPI Model',
    client: 'Multinational Wholesale Distributor',
    category: 'Advanced Excel',
    badge: 'EXCEL FINANCIAL MODELING',
    tool: 'Advanced Excel & Power Query',
    tools: ['Advanced Excel', 'Power Query', 'Financial Modeling', 'Pivot Charts', 'YoY / MoM Variance'],
    image: '/assets/images/dashboards/dashboard-sales-financial-excel.webp',
    shortDesc: 'Executive financial model consolidating $127.93M in gross sales, $101.83M net revenue, and $16.89M net profit across 5 enterprise market tiers.',
    fullDesc: 'Engineered an advanced financial and commercial sales performance model in Microsoft Excel utilizing automated Power Query ETL. Consolidates 1.13M units sold and $127.93M gross sales across Government (470K units), Midmarket, Enterprise, Channel Partners, and Small Business tiers with dynamic YoY, MoM, and QoQ variance analysis.',
    metrics: {
      kpi: '$101.83M Net Revenue',
      secondaryKpi: '$16.89M Net Profit (16.6%)',
      impact: '1.13M Units Tracked Globally'
    },
    chartsIncluded: [
      'Product Discount Allocation Donut Breakdown',
      'Units Sold by Enterprise Market Segment',
      'Product Profit Contribution Matrix',
      'Monthly Revenue vs. Gross Sales Seasonal Bar Chart',
      'Regional Performance YoY, MoM, and QoQ Pivot Grid'
    ],
    deliverables: [
      'Automated Power Query Multi-Source Data Ingestion',
      'Dynamic YoY / MoM / QoQ Variance Slicers & Scenarios',
      'Multi-Product Discount Sensitivity Financial Tables',
      'C-Suite Executive Presentation Workbook'
    ]
  },
  {
    id: 'dash-seo-audit-traffic',
    title: 'Web Traffic, Security Audit & SEO Infrastructure Telemetry',
    client: 'Enterprise SaaS & Web Publishing Network',
    category: 'Data Analytics & SEO',
    badge: 'SEO & SECURITY TELEMETRY',
    tool: 'Data Studio / Power BI & GA4',
    tools: ['Google Analytics 4 API', 'Search Console', 'Security Audits', 'Backlink Velocity', 'Power BI'],
    image: '/assets/images/dashboards/dashboard-seo-audit-traffic.webp',
    shortDesc: 'Centralized web operations telemetry dashboard tracking 360,000 visitors, 73% website security score, global search rankings, and backlink velocity.',
    fullDesc: 'Designed an integrated web operations, security health, and SEO telemetry dashboard monitoring 360,000 total visitors and 60,000 monthly unique visitors. Simultaneously tracks cyber health metrics (resolving 42 loading errors, 15 malicious intrusions, 108 warning logs, and 26 attack vectors) alongside backlink acquisition velocity and search rankings.',
    metrics: {
      kpi: '360,000 Total Visitors',
      secondaryKpi: '73% Infrastructure Audit Score',
      impact: '40% Organic Traffic Dominance'
    },
    chartsIncluded: [
      'Global Alexa & Search Ranking Velocity (+23% YTD)',
      'Security Audit Health Matrix (Errors, Warnings, Intrusions)',
      'Backlink Distribution (Editorial, Guest, Citations, Text Links)',
      'Traffic Channel Acquisition (40% Organic, 20% Direct, 20% Email)',
      'Monthly New vs. Lost Link Differential Chart'
    ],
    deliverables: [
      'Multi-Source API Aggregation (GA4, Search Console, Security Logs)',
      'Real-Time Vulnerability Alert & Resolution Tracker',
      'Organic Acquisition Attribution & Conversion Models',
      'Automated Executive Performance Scorecards'
    ]
  },
  {
    id: 'dash-cloud-migration-powerbi',
    title: 'Enterprise Cloud Migration Portfolio & Workload Governance',
    client: 'Fortune 500 Enterprise IT Division',
    category: 'Power BI',
    badge: 'POWER BI CLOUD ANALYTICS',
    tool: 'Power BI Enterprise & DAX',
    tools: ['Power BI', 'DAX Measures', 'Cloud Telemetry', 'Cost Governance', 'Multi-Cloud / Hybrid'],
    image: '/assets/images/dashboards/dashboard-cloud-migration-powerbi.webp',
    shortDesc: 'Multi-cloud migration governance dashboard tracking 73,000 migrated workloads, $929.07M total program capital, and cross-platform downtime telemetry.',
    fullDesc: 'Architected a mission-critical Cloud Migration Governance Dashboard in Power BI for a global enterprise IT program. Visualizes 73,000 enterprise workloads across Hybrid Cloud ($0.22B), Google Cloud ($0.20B), and Multi-Cloud ($0.19B) environments with SLA downtime tracking (24.4 hrs avg) and team allocation across 13,000 engineers.',
    metrics: {
      kpi: '73K Workloads Migrated',
      secondaryKpi: '$929.07M Capital Managed',
      impact: '24.4h Avg Migration SLA'
    },
    chartsIncluded: [
      'Migration Status Breakdown (33.4% Completed, 29.2% In-Progress)',
      'Actual Cost by Target Cloud Architecture (Hybrid, GCP, Multi-Cloud)',
      'Engineering Team Size Distribution by Priority',
      'Sub-System Platform Analysis & Industry Review Drill-Downs',
      'Migration Strategy Timelines & Monthly Budget Trends'
    ],
    deliverables: [
      'Enterprise Multi-Cloud Telemetry Data Warehouse Integration',
      'Executive Portfolio Governance & Risk Metrics',
      'Real-Time Project Milestone Tracking Gauges',
      'Cross-Industry Cost Benchmark & Budget Variance Visuals'
    ]
  },
  {
    id: 'dash-marketing-growth-bi',
    title: 'Omni-Channel Marketing, Social Audience & Traffic BI',
    client: 'Digital Agency & Performance Marketing Network',
    category: 'Power BI',
    badge: 'MARKETING & AUDIENCE BI',
    tool: 'Power BI & Social Analytics',
    tools: ['Power BI', 'Meta API', 'Google Search Console', 'Multi-Channel Attribution', 'DAX'],
    image: '/assets/images/dashboards/dashboard-marketing-growth-bi.webp',
    shortDesc: 'Omni-channel marketing analytics dashboard uniting 200,000 web visitors, 32,000 social followers across 4 platforms, and search ranking trajectories.',
    fullDesc: 'Built an omni-channel marketing and audience growth intelligence dashboard. Consolidates Facebook, Twitter, LinkedIn, and YouTube follower expansion (8,000 followers each with up to 23% YTD growth) alongside 200,000 site visitors, 82% technical audit rating, and 30-day search volume patterns.',
    metrics: {
      kpi: '200,000 Visitors Tracked',
      secondaryKpi: '32,000 Social Audience',
      impact: '+23% Ranking Velocity'
    },
    chartsIncluded: [
      'Cross-Platform Social Follower Growth (Facebook, X, LinkedIn, YouTube)',
      'Daily Traffic Patterns Over Rolling 7 Days',
      'Site Technical Audit Score & Issue Log (82% / 20 Resolved)',
      'Monthly Estimated vs. Actual Visitor Volume Area Chart',
      '30-Day Search Query Volume Velocity Graph'
    ],
    deliverables: [
      'Social Media & Web Analytics API Automated Ingestion',
      'Unified Omni-Channel Attribution Data Model',
      'Automated Weekly Executive Performance Reporting',
      'SEO Search Intent & Technical Issue Resolution Log'
    ]
  }
];
