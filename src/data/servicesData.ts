import { ServiceDetail } from '../types';

export interface ServiceCardData extends ServiceDetail {
  name: string;
  shortName: string;
  subTags?: string[];
  gradient: string;
  iconType: 'consultation' | 'develop' | 'design' | 'ai' | 'architecture' | 'cloud' | 'security' | 'workflow' | 'performance' | 'mobile' | 'maintenance';
}

export const servicesList: ServiceCardData[] = [
  {
    id: 'srv-consultation',
    number: '1',
    name: 'Consultation',
    shortName: 'Consultation',
    title: 'Consultation & Tech Advisory',
    tagline: 'Strategic architecture consulting, code audits, and digital transformation roadmaps.',
    description: 'Expert technology advisory, technical feasibility audits, and engineering roadmaps designed for startups and enterprises.',
    subTags: ['TESTING', 'ANALYZE'],
    gradient: 'from-[#7C3AED] via-[#8B5CF6] to-[#A855F7]',
    iconType: 'consultation',
    features: [
      'Technical Architecture Audits',
      'Scalability & Security Reviews',
      'Cloud Migration Roadmaps',
      'Team Mentorship & Best Practices'
    ],
    startingPrice: '$499',
    timeline: '1-2 Weeks',
    techStack: ['Architecture Design', 'Code Audit', 'System Analysis', 'DevSecOps']
  },
  {
    id: 'srv-1',
    number: '2',
    name: 'Develope',
    shortName: 'Develope',
    title: 'Adaptive Web Development',
    tagline: 'Dynamic websites that evolve and self-optimize based on real-time user interaction data.',
    description: 'Modern, ultra-fast web applications built with React 19, TypeScript, and microservices for seamless scalability.',
    subTags: ['SPEED', 'SCALE'],
    gradient: 'from-[#EA580C] via-[#F97316] to-[#F59E0B]',
    iconType: 'develop',
    features: [
      'Evolutionary Self-Optimization',
      'Sub-Second Page Loads',
      'Responsive Fluid Interfaces',
      'Full API & Microservices Sync'
    ],
    startingPrice: '$999',
    timeline: '2-4 Weeks',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Spring Boot 3']
  },
  {
    id: 'srv-2',
    number: '3',
    name: 'Design',
    shortName: 'Design',
    title: 'Innovative UX/UI Design',
    tagline: 'State-of-the-art visual design system built with deep psychology and micro-animations.',
    description: 'State-of-the-art user experience design, interactive Figma prototypes, and design systems that maximize user engagement.',
    subTags: ['UI', 'UX'],
    gradient: 'from-[#0891B2] via-[#0D9488] to-[#10B981]',
    iconType: 'design',
    features: [
      'Figma Component Design Systems',
      'Fluid Micro-Animations & Motion',
      'WCAG 2.1 AA Accessibility',
      'User Journey & Persona Research'
    ],
    startingPrice: '$749',
    timeline: '1-3 Weeks',
    techStack: ['Figma', 'Motion', 'Tailwind CSS', 'Radix UI']
  },
  {
    id: 'srv-3',
    number: '4',
    name: 'AI Integration',
    shortName: 'AI Integration',
    title: 'AI Integration & Intelligent Modules',
    tagline: 'Empower your application with intelligent LLM APIs, autonomous agents, and smart search.',
    description: 'Incorporate intelligent Gemini & OpenAI models, semantic vector search, and autonomous workflows into your web platform.',
    subTags: ['LLM', 'AGENTS'],
    gradient: 'from-[#4F46E5] via-[#6366F1] to-[#8B5CF6]',
    iconType: 'ai',
    features: [
      'Custom Conversational Copilots',
      'Retrieval-Augmented Generation (RAG)',
      'Autonomous Task Automation Agents',
      'Predictive Business Intelligence'
    ],
    startingPrice: '$1,499',
    timeline: '3-5 Weeks',
    techStack: ['Gemini API', 'LangChain', 'Vector Search', 'Python']
  },
  {
    id: 'srv-4',
    number: '5',
    name: 'Microservices',
    shortName: 'Microservices',
    title: 'Full-Stack Architecture & Microservices',
    tagline: 'High-throughput backend architectures with distributed microservices and robust API gateways.',
    description: 'Enterprise backend systems with distributed microservices, Apache Kafka event streams, and resilient API gateways.',
    subTags: ['KAFKA', 'DOCKER'],
    gradient: 'from-[#1E40AF] via-[#2563EB] to-[#38BDF8]',
    iconType: 'architecture',
    features: [
      'Distributed Spring Boot Microservices',
      'Kafka Event-Driven Architecture',
      'PostgreSQL Query Optimization',
      'Resilient Circuit Breaker Patterns'
    ],
    startingPrice: '$1,299',
    timeline: '3-6 Weeks',
    techStack: ['Spring Boot 3', 'Kafka', 'PostgreSQL', 'Docker']
  },
  {
    id: 'srv-7',
    number: '6',
    name: 'Cloud DevOps',
    shortName: 'Cloud DevOps',
    title: 'Cloud Deployment & DevOps Automation',
    tagline: 'Zero-downtime CI/CD deployment pipelines on Google Cloud, AWS, and containerized clusters.',
    description: 'Automated CI/CD pipelines, Kubernetes container orchestration, and serverless infrastructure with 99.99% uptime.',
    subTags: ['AWS', 'K8S'],
    gradient: 'from-[#0284C7] via-[#06B6D4] to-[#38BDF8]',
    iconType: 'cloud',
    features: [
      'GitHub Actions Automated CI/CD',
      'Docker & Kubernetes Clusters',
      'AWS / GCP Cloud Run Deployment',
      'Infrastructure as Code (Terraform)'
    ],
    startingPrice: '$899',
    timeline: '2-3 Weeks',
    techStack: ['Google Cloud', 'AWS', 'Docker', 'GitHub Actions']
  },
  {
    id: 'srv-9',
    number: '7',
    name: 'Cyber Security',
    shortName: 'Cyber Security',
    title: 'Enterprise Security & Compliance Audits',
    tagline: 'Hardened cybersecurity reviews, vulnerability assessments, and OWASP compliance auditing.',
    description: 'End-to-end vulnerability scanning, penetration testing, encrypted storage, and OWASP compliance defense.',
    subTags: ['AUDIT', 'DEFENSE'],
    gradient: 'from-[#BE123C] via-[#E11D48] to-[#FB7185]',
    iconType: 'security',
    features: [
      'OWASP Top 10 Penetration Testing',
      'Data-at-Rest & In-Transit Encryption',
      'OAuth2 & JWT Token Hardening',
      'Regulatory Compliance Review'
    ],
    startingPrice: '$849',
    timeline: '1-2 Weeks',
    techStack: ['Spring Security', 'JWT', 'SSL/TLS', 'PenTest Tools']
  },
  {
    id: 'srv-5',
    number: '8',
    name: 'Workflow Systems',
    shortName: 'Workflow Systems',
    title: 'Paperless Office & Workflow Digitization',
    tagline: 'Eliminate paper clutter in universities, thesis submissions, and enterprise approvals.',
    description: 'Automate physical paper forms with digital signature verification, multi-stage approval hierarchies, and cloud syncing.',
    subTags: ['PAPERLESS', 'SYNC'],
    gradient: 'from-[#047857] via-[#059669] to-[#34D399]',
    iconType: 'workflow',
    features: [
      'Digital PDF Generation & Signing',
      'Multi-Level Approval Pipelines',
      'Real-Time Excel Data Sync',
      'Audit Trail & Version History'
    ],
    startingPrice: '$1,199',
    timeline: '2-4 Weeks',
    techStack: ['ExcelJS', 'PDF-Lib', 'React', 'Node.js']
  },
  {
    id: 'srv-6',
    number: '9',
    name: 'Performance',
    shortName: 'Performance',
    title: 'Performance Optimization & Core Web Vitals',
    tagline: 'Elevate page load speeds, Lighthouse 100/100 ratings, and search engine organic rankings.',
    description: 'Supercharge your web performance with sub-second FCP, zero layout shifts, and CDN edge optimization.',
    subTags: ['LIGHTHOUSE', 'SEO'],
    gradient: 'from-[#0F766E] via-[#0D9488] to-[#14B8A6]',
    iconType: 'performance',
    features: [
      'Sub-Second First Contentful Paint',
      'Zero Cumulative Layout Shift (CLS)',
      'Edge Asset Caching & Brotli Compression',
      'Code Splitting & Bundle Minimization'
    ],
    startingPrice: '$599',
    timeline: '1-2 Weeks',
    techStack: ['Vite', 'Cloudflare CDN', 'Brotli', 'Lighthouse']
  },
  {
    id: 'srv-11',
    number: '10',
    name: 'Mobile PWA',
    shortName: 'Mobile PWA',
    title: 'Mobile-First Progressive Web Apps (PWA)',
    tagline: 'Native app-like speed, offline capabilities, and push notifications with zero install barrier.',
    description: 'Build fast, installable progressive web apps that work offline, send push notifications, and feel like native mobile apps.',
    subTags: ['OFFLINE', 'NATIVE'],
    gradient: 'from-[#7E22CE] via-[#9333EA] to-[#C084FC]',
    iconType: 'mobile',
    features: [
      'Service Worker Offline Caching',
      'Add-To-Home-Screen Support',
      'Background Push Notifications',
      'Fluid Touch & Gesture Interactions'
    ],
    startingPrice: '$899',
    timeline: '2-4 Weeks',
    techStack: ['PWA', 'Workbox', 'React 19', 'IndexedDB']
  },
  {
    id: 'srv-10',
    number: '11',
    name: 'SLA Support',
    shortName: 'SLA Support',
    title: 'Continuous Maintenance & Evolutionary SLA',
    tagline: 'Ongoing algorithmic updates, security patches, uptime SLAs, and active code maintenance.',
    description: 'Round-the-clock uptime monitoring, automated database backups, security patching, and on-demand engineering support.',
    subTags: ['24/7', 'BACKUP'],
    gradient: 'from-[#B45309] via-[#D97706] to-[#F59E0B]',
    iconType: 'maintenance',
    features: [
      '24/7 Real-Time Health Monitoring',
      'Continuous Security Updates',
      'Automated Daily Excel & DB Backups',
      'Dedicated Hyderabad Engineering SLA'
    ],
    startingPrice: '$399/mo',
    timeline: 'Ongoing SLA',
    techStack: ['Uptime Kuma', 'Backup Pipelines', 'Health Monitors']
  }
];
