import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { User, Course, Enrollment, ContactSubmission, AppointmentBooking, ShopOrder, Testimonial, NewsletterSubscriber, BlogPost } from '../src/types.js';

const EXCEL_FILE_PATH = path.join(process.cwd(), 'ewd_data_store.xlsx');

// Initial Seed Data for EWD
const INITIAL_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'EWD Chief Administrator',
  email: 'Evolutionarywebdude@gmail.com',
  password: 'Evolutionarywebdude@ewd523',
  role: 'ADMIN',
  phone: '+91 98765 43210',
  organization: 'Evolutionary Web Dude Start-up',
  bio: 'Lead system administrator for Evolutionary Web Dude platform.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-01-01 10:00:00'
};

const INITIAL_USER: User = {
  id: 'usr-demo-02',
  name: 'Pavan Bathygari',
  email: 'pavanbathygari@gmail.com',
  password: 'user12345',
  role: 'USER',
  phone: '+91 91234 56789',
  organization: 'Hyderabad Tech Scholar',
  bio: 'Software engineer passionate about scalable full-stack web applications.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-02-15 14:30:00'
};

const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-java-fullstack',
    title: 'Java Full Stack Development',
    category: 'FULL STACK',
    description: 'Master Java, Spring Boot, React and build real-world projects from scratch.',
    icon: 'Coffee',
    modules: ['Core Java 21', 'Spring Boot 3', 'REST APIs', 'Microservices', 'React 19', 'PostgreSQL', 'Docker', 'AWS Deployment'],
    level: 'Beginner to Pro',
    duration: '6 Months',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Phase 1', topic: 'Core Java 21, OOPs & Collections', details: 'Language fundamentals, memory management, garbage collection and streams.' },
      { week: 'Phase 2', topic: 'Spring Boot 3, REST APIs & Microservices', details: 'Build enterprise backend services, database migrations, and API documentation.' },
      { week: 'Phase 3', topic: 'Frontend with React 19 & Tailwind CSS', details: 'Create high performance client web applications with responsive interfaces.' },
      { week: 'Phase 4', topic: 'Docker, CI/CD Pipelines & AWS Cloud', details: 'Containerization, automated build workflows, and live cloud deployment.' }
    ],
    learningOutcomes: [
      'Architect robust enterprise Java Spring Boot backend services',
      'Design fluid, high-performance React user interfaces with TypeScript',
      'Deploy full-stack cloud applications with automated pipelines'
    ]
  },
  {
    id: 'crs-python-data-science',
    title: 'Python for Data Science',
    category: 'DATA & AI',
    description: 'Learn Python, ML, Data Analysis and work on real-world datasets.',
    icon: 'Code2',
    modules: ['Python 3.12', 'Pandas & NumPy', 'Data Visualization', 'Machine Learning', 'SQL', 'Power BI', 'Streamlit'],
    level: 'Beginner Friendly',
    duration: '4 Months',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Phase 1', topic: 'Python Programming & Data Structures', details: 'Practical scripting, data structures, and automation workflows.' },
      { week: 'Phase 2', topic: 'Data Wrangling with Pandas & NumPy', details: 'Handling messy datasets, feature engineering, and statistical analysis.' },
      { week: 'Phase 3', topic: 'Machine Learning with Scikit-Learn', details: 'Regression, classification, decision trees, and model evaluation.' },
      { week: 'Phase 4', topic: 'Power BI Dashboards & SQL Analytics', details: 'Building executive KPI dashboards and deploying web apps.' }
    ],
    learningOutcomes: [
      'Analyze complex business data and deliver actionable insights',
      'Build and train predictive ML models with evaluation metrics',
      'Create interactive dashboards and portfolio datasets'
    ]
  },
  {
    id: 'crs-ai-ml',
    title: 'Artificial Intelligence & ML',
    category: 'DATA & AI',
    description: 'Learn AI, Machine Learning, Deep Learning and build intelligent solutions.',
    icon: 'Sparkles',
    modules: ['Deep Learning', 'PyTorch', 'Neural Networks', 'Computer Vision', 'NLP', 'LLMs', 'RAG Architectures', 'LangChain'],
    level: 'Intermediate',
    duration: '6 Months',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Phase 1', topic: 'Mathematics & Neural Network Foundations', details: 'Backpropagation, gradient descent, loss functions and architectures.' },
      { week: 'Phase 2', topic: 'Computer Vision with CNNs & OpenCV', details: 'Object detection, face recognition, and video stream processing.' },
      { week: 'Phase 3', topic: 'Natural Language Processing & Transformers', details: 'Tokenization, attention mechanisms, BERT, and GPT models.' },
      { week: 'Phase 4', topic: 'Generative AI, LLMs, RAG & LangChain', details: 'Custom knowledge retrieval with vector databases and agents.' }
    ],
    learningOutcomes: [
      'Develop production-grade Generative AI and deep learning applications',
      'Fine-tune open-source LLMs and implement custom RAG pipelines',
      '12+ advanced capstone projects in computer vision and NLP'
    ]
  },
  {
    id: 'crs-cloud-aws',
    title: 'Cloud Computing (AWS)',
    category: 'CLOUD & TOOLS',
    description: 'Learn AWS services, architecture, and deploy real-world applications.',
    icon: 'Cloud',
    modules: ['AWS IAM & EC2', 'VPC Networking', 'S3 Storage', 'Lambda Serverless', 'RDS', 'Terraform', 'CloudWatch'],
    level: 'Beginner Friendly',
    duration: '3 Months',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Phase 1', topic: 'AWS Core Services & Security Governance', details: 'IAM policies, EC2 instance types, security groups, and key pairs.' },
      { week: 'Phase 2', topic: 'Virtual Private Cloud (VPC) Networking', details: 'Custom VPCs, public/private subnets, NAT gateways, and Route 53.' },
      { week: 'Phase 3', topic: 'Serverless Computing & Cloud Storage', details: 'AWS Lambda, API Gateway, S3 lifecycle, and DynamoDB NoSQL.' },
      { week: 'Phase 4', topic: 'DevOps on AWS & Terraform IaC', details: 'Automating multi-tier infrastructure deployments on AWS.' }
    ],
    learningOutcomes: [
      'Design fault-tolerant, scalable, cost-efficient cloud architectures',
      'Automate cloud infrastructure provisioning using Terraform IaC',
      'Prepare thoroughly for AWS Certified Solutions Architect exam'
    ]
  },
  {
    id: 'crs-frontend-dev',
    title: 'Frontend Development',
    category: 'FRONTEND',
    description: 'Master HTML, CSS, JavaScript, React.js and build beautiful user interfaces.',
    icon: 'Globe',
    modules: ['HTML5 & CSS3', 'JavaScript ES6+', 'React 19', 'Tailwind CSS', 'TypeScript', 'Next.js', 'Redux Toolkit'],
    level: 'Beginner Friendly',
    duration: '4 Months',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Phase 1', topic: 'Responsive Web Design & Tailwind CSS', details: 'Mobile-first layout design, responsive typography, and animations.' },
      { week: 'Phase 2', topic: 'Modern JavaScript (ES6+) & Async APIs', details: 'Closures, promises, async/await, DOM events, and REST APIs.' },
      { week: 'Phase 3', topic: 'React 19 Components & Custom Hooks', details: 'Component composition, state management, and custom hooks.' },
      { week: 'Phase 4', topic: 'Next.js, TypeScript & Production Deployment', details: 'Server components, client rendering, SEO optimization and Vercel.' }
    ],
    learningOutcomes: [
      'Build fast, responsive, and aesthetically stunning modern web applications',
      'Become proficient in React 19, TypeScript, and Tailwind CSS design systems',
      '15+ live web applications for your developer portfolio'
    ]
  },
  {
    id: 'crs-software-testing',
    title: 'Software Testing & Automation',
    category: 'TESTING',
    description: 'Learn Manual Testing, Selenium, TestNG and become a QA expert.',
    icon: 'CheckCircle2',
    modules: ['Manual Testing', 'Selenium WebDriver', 'TestNG', 'Cucumber BDD', 'Postman API Testing', 'Jenkins CI/CD'],
    level: 'All Levels',
    duration: '3 Months',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Phase 1', topic: 'Manual Testing Fundamentals & JIRA Tool', details: 'Requirement analysis, test scenarios, black box techniques, and bug tracking.' },
      { week: 'Phase 2', topic: 'Core Java for QA & Selenium WebDriver', details: 'Locators, handling dynamic elements, alerts, frames, and waits.' },
      { week: 'Phase 3', topic: 'TestNG, Page Object Model (POM) & Data-Driven QA', details: 'Framework architecture, Apache POI for Excel data, and assertions.' },
      { week: 'Phase 4', topic: 'Cucumber BDD, Postman API Testing & Jenkins', details: 'Feature files, Gherkin syntax, REST API status validation, and CI/CD.' }
    ],
    learningOutcomes: [
      'Design and execute enterprise automated test suites from scratch',
      'Master both Manual QA processes and Selenium + TestNG automation',
      'Hands-on experience in API automation and continuous test integration'
    ]
  },
  {
    id: 'crs-sql-db',
    title: 'SQL & Database Management',
    category: 'DATA & AI',
    description: 'Learn SQL, Database concepts, queries and real-world data handling.',
    icon: 'Database',
    modules: ['Relational Database Concepts', 'Complex SQL Queries', 'Window Functions', 'Query Optimization', 'PostgreSQL', 'Database Design'],
    level: 'Beginner Friendly',
    duration: '2 Months',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Phase 1', topic: 'Relational Database Architecture & Query Fundamentals', details: 'Database normalization, constraints, keys, filtering, and aggregations.' },
      { week: 'Phase 2', topic: 'Complex Joins, Grouping & Multi-Table Queries', details: 'Inner/outer joins, self joins, grouping sets, and having clauses.' },
      { week: 'Phase 3', topic: 'Window Functions, CTEs & Advanced SQL', details: 'ROW_NUMBER, RANK, LEAD, LAG, partition by, and running totals.' },
      { week: 'Phase 4', topic: 'Indexing, Execution Plans & Performance Tuning', details: 'B-Tree indexes, query execution analysis (EXPLAIN), and transactions.' }
    ],
    learningOutcomes: [
      'Write complex, optimized SQL queries for high-volume databases',
      'Master analytical window functions and common table expressions',
      'Design scalable database schemas with industry-standard normalization'
    ]
  },
  {
    id: 'crs-android-dev',
    title: 'Android App Development',
    category: 'FULL STACK',
    description: 'Learn Android Development with Kotlin and build real-world mobile apps.',
    icon: 'Smartphone',
    modules: ['Kotlin Core', 'Jetpack Compose', 'Android SDK', 'MVVM Architecture', 'Room DB', 'Retrofit', 'Firebase'],
    level: 'Beginner to Pro',
    duration: '4 Months',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Phase 1', topic: 'Kotlin Programming Fundamentals & Coroutines', details: 'Object-oriented Kotlin, null safety, lambdas, coroutines, and flow.' },
      { week: 'Phase 2', topic: 'Jetpack Compose Declarative UI Development', details: 'Composable functions, state hoisting, layouts, and animations.' },
      { week: 'Phase 3', topic: 'MVVM Clean Architecture & Room Local DB', details: 'Repository pattern, Room database, LiveData, and dependency injection.' },
      { week: 'Phase 4', topic: 'Networking with Retrofit, Firebase & Play Store', details: 'JSON parsing, push notifications, authentication, and APK/AAB publishing.' }
    ],
    learningOutcomes: [
      'Build native Android applications from scratch using Kotlin and Compose',
      'Implement clean MVVM architecture with local database caching and REST APIs',
      '12+ real-world mobile applications deployed to the Google Play Store'
    ]
  }
];

const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-101',
    courseId: 'crs-java-fullstack',
    courseTitle: 'Java Full Stack Development',
    courseCategory: 'FULL STACK',
    userId: 'usr-demo-02',
    userName: 'Pavan Bathygari',
    userEmail: 'pavanbathygari@gmail.com',
    userPhone: '+91 91234 56789',
    educationOrJob: 'B.Tech Graduate / Software Engineer',
    experienceLevel: '1-2 Years',
    mode: 'Hybrid',
    preferredBatch: 'Weekend',
    notes: 'Interested in Spring Boot 3 and cloud deployment modules.',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    enrolledAt: '2026-02-18 11:20:00'
  },
  {
    id: 'enr-102',
    courseId: 'crs-web-dev',
    courseTitle: 'Web Development',
    courseCategory: 'FRONTEND',
    userName: 'Kavitha Reddy',
    userEmail: 'kavitha.reddy@example.com',
    userPhone: '+91 98480 22334',
    educationOrJob: 'Final Year MCA Student',
    experienceLevel: 'Beginner',
    mode: 'Online Live',
    preferredBatch: 'Morning',
    notes: 'Excited for React and TypeScript training.',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    enrolledAt: '2026-02-20 09:45:00'
  },
  {
    id: 'enr-103',
    courseId: 'crs-practical-projects',
    courseTitle: 'Career-Oriented Practical Projects',
    courseCategory: 'PROJECTS',
    userName: 'Suresh Kumar',
    userEmail: 'suresh.kumar@techmail.com',
    userPhone: '+91 97001 88990',
    educationOrJob: 'Junior Developer',
    experienceLevel: '6 Months',
    mode: 'Hybrid',
    preferredBatch: 'Evening',
    notes: 'Need assistance with enterprise project portfolio.',
    status: 'Under Review',
    paymentStatus: 'Pending',
    enrolledAt: '2026-02-22 16:15:00'
  }
];

const INITIAL_CONTACTS: ContactSubmission[] = [
  {
    id: 'cnt-201',
    name: 'Dr. Ramesh Sharma',
    email: 'ramesh.sharma@osmania.ac.in',
    phone: '+91 98490 11223',
    subject: 'Academic Paperless Portal Inquiry',
    serviceInterest: 'Paperless Academic Solutions',
    message: 'We are seeking an adaptive digital submission portal for our university thesis and evaluation process in Hyderabad.',
    status: 'New',
    submittedAt: '2026-02-21 14:10:00'
  },
  {
    id: 'cnt-202',
    name: 'Ananya Verma',
    email: 'ananya@v-enterprises.com',
    phone: '+91 99887 66554',
    subject: 'Enterprise Web Application Rebuild',
    serviceInterest: 'Adaptive Web Development',
    message: 'Looking to modernize our legacy office internal workflows into paperless zero-clutter web systems.',
    status: 'In Progress',
    submittedAt: '2026-02-22 10:30:00'
  }
];

const INITIAL_APPOINTMENTS: AppointmentBooking[] = [
  {
    id: 'apt-301',
    name: 'Vikram Joshi',
    email: 'vikram.j@fintechsys.io',
    phone: '+91 94401 55667',
    serviceType: 'Enterprise Office Automation',
    date: '2026-08-28',
    timeSlot: '11:00 AM - 12:00 PM IST',
    topic: 'Transitioning academic evaluation records to paperless digital signatures.',
    meetingType: 'Google Meet',
    status: 'Confirmed',
    createdAt: '2026-08-23 09:00:00'
  }
];

const INITIAL_ORDERS: ShopOrder[] = [
  {
    id: 'ord-401',
    userId: 'usr-demo-02',
    customerName: 'Pavan Bathygari',
    customerEmail: 'pavanbathygari@gmail.com',
    customerPhone: '+91 91234 56789',
    companyName: 'Academic Tech Hub',
    items: [
      { productId: 'prod-paperless-suite', productTitle: 'EWD Paperless Office Starter Kit', price: 499, quantity: 1 }
    ],
    subtotal: 499,
    tax: 44.91,
    total: 543.91,
    paymentMethod: 'Razorpay / Stripe',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-02-19 15:20:00'
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'tst-501',
    name: 'Prof. K. Ramaswamy',
    role: 'Dean of Academic Affairs',
    companyOrCollege: 'Telangana Higher Education Consortium',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceOrCourse: 'Paperless Academic Solutions',
    comment: 'Evolutionary Web Dude replaced 40,000 physical verification paper forms across our university departments with their adaptive digital portal. Remarkable turn-around and 100% paperless efficiency!',
    isApproved: true,
    featured: true,
    date: '2026-02-10'
  },
  {
    id: 'tst-502',
    name: 'Sneha Patel',
    role: 'Full Stack Java Engineer',
    companyOrCollege: 'Global Software Labs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceOrCourse: 'Java Full Stack Development Program',
    comment: 'The project-based curriculum at EWD was career-transforming. Working with real Spring Boot microservices, React, and Excel pipeline integrations landed me a Senior Developer role within 2 months of graduation.',
    isApproved: true,
    featured: true,
    date: '2026-02-14'
  },
  {
    id: 'tst-503',
    name: 'Rajesh Goud',
    role: 'Operations Director',
    companyOrCollege: 'Apex Logistics Hub',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceOrCourse: 'Adaptive Web Architecture',
    comment: 'Their self-optimizing web systems drastically reduced our document cycle times. The team in Hyderabad was responsive, agile, and truly lived up to the name Evolutionary Web Dude.',
    isApproved: true,
    featured: true,
    date: '2026-02-18'
  }
];

const INITIAL_NEWSLETTER: NewsletterSubscriber[] = [
  { id: 'nl-601', email: 'director@academics-telangana.org', status: 'Active', subscribedAt: '2026-01-15 08:30:00' },
  { id: 'nl-602', email: 'techlead@cloudventures.in', status: 'Active', subscribedAt: '2026-02-01 12:00:00' }
];

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'architecting-zero-paper-academic-thesis',
    title: 'Architecting Zero-Paper Academic Thesis Submissions in Hyderabad',
    excerpt: 'How our proprietary digital verification pipeline eradicated 40,000+ paper forms and reduced thesis approval cycles from 21 days to 4 hours.',
    content: 'Academic institutions in Telangana and Andhra Pradesh have historically grappled with massive logistical bottlenecks during annual thesis review cycles. Physical copies, ink-signed approvals, and ledger archiving cost millions of rupees annually.\n\nAt Evolutionary Web Dude, we deployed an end-to-end digital verification platform that eliminated 40,000+ physical forms, accelerated approvals to under 4 hours, and ensured 100% digital audit compliance.',
    category: 'Paperless Architecture',
    author: 'Pavan Bathygari',
    authorRole: 'Founder & Lead Architect',
    readTime: '6 min read',
    publishedAt: '2026-02-15 10:00:00',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    tags: ['Paperless', 'ExcelJS', 'React 18', 'Academic Tech'],
    likes: 42
  },
  {
    id: 'blog-2',
    slug: 'evolutionary-optimization-web-development',
    title: 'Evolutionary Optimization: Why Static Web Development Is Obsolete',
    excerpt: 'Biological evolution provides the ultimate blueprint for web engineering. Discover how telemetry-driven self-optimizing UI engines function.',
    content: 'Modern users demand interfaces that dynamically anticipate intent. Rigid, static websites designed once and never adapted suffer from high drop-off rates.\n\nBy tracking client-side micro-interactions—such as focus retention, reading speed, and viewport scaling—our evolutionary web engine modifies layout spacing and typography contrast in real-time.',
    category: 'System Design',
    author: 'EWD Research Lab',
    authorRole: 'Systems & Algorithms Team',
    readTime: '8 min read',
    publishedAt: '2026-01-28 14:30:00',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    tags: ['Evolutionary Alg', 'Telemetry', 'Performance', 'A/B Testing'],
    likes: 38
  },
  {
    id: 'blog-3',
    slug: 'spring-boot-react-microservices-masterclass',
    title: 'Spring Boot 3 + React 18: Microservices Masterclass for Indian Tech Careers',
    excerpt: 'A comprehensive roadmap for engineering students and aspiring developers looking to bridge the gap between academic theory and enterprise scale.',
    content: 'The contemporary software market demands engineers who can not only write clean code, but architect distributed systems with security and data persistence in mind.\n\nKey pillars include Spring Boot 3 with JWT token rotation, modern React with TypeScript and Framer Motion, and high-performance Excel/database pipelines.',
    category: 'Engineering Guide',
    author: 'Academic Mentor Team',
    authorRole: 'Technical Instructors',
    readTime: '10 min read',
    publishedAt: '2026-01-10 09:15:00',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    tags: ['Java', 'Spring Boot', 'Full Stack', 'Careers'],
    likes: 56
  }
];

export class ExcelStorageEngine {
  private static instance: ExcelStorageEngine;

  private constructor() {
    this.ensureWorkbookExists();
  }

  public static getInstance(): ExcelStorageEngine {
    if (!ExcelStorageEngine.instance) {
      ExcelStorageEngine.instance = new ExcelStorageEngine();
    }
    return ExcelStorageEngine.instance;
  }

  private async ensureWorkbookExists() {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      console.log(`[ExcelStorageEngine] Initializing fresh Excel data store at: ${EXCEL_FILE_PATH}`);
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Evolutionary Web Dude Storage System';
      workbook.lastModifiedBy = 'EWD Storage Engine';
      workbook.created = new Date();
      workbook.modified = new Date();

      // 1. Users Sheet
      const usersSheet = workbook.addWorksheet('Users', { views: [{ state: 'frozen', ySplit: 1 }] });
      usersSheet.columns = [
        { header: 'ID', key: 'id', width: 18 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 32 },
        { header: 'Password', key: 'password', width: 30 },
        { header: 'Role', key: 'role', width: 14 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'Organization', key: 'organization', width: 30 },
        { header: 'Bio', key: 'bio', width: 40 },
        { header: 'Avatar', key: 'avatar', width: 45 },
        { header: 'CreatedAt', key: 'createdAt', width: 22 }
      ];
      usersSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      usersSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      [INITIAL_ADMIN, INITIAL_USER].forEach(u => usersSheet.addRow(u));

      // 2. Courses Sheet
      const coursesSheet = workbook.addWorksheet('Courses', { views: [{ state: 'frozen', ySplit: 1 }] });
      coursesSheet.columns = [
        { header: 'ID', key: 'id', width: 24 },
        { header: 'Title', key: 'title', width: 35 },
        { header: 'Category', key: 'category', width: 24 },
        { header: 'Description', key: 'description', width: 60 },
        { header: 'Modules', key: 'modules', width: 50 },
        { header: 'Level', key: 'level', width: 20 },
        { header: 'Duration', key: 'duration', width: 20 },
        { header: 'Fee', key: 'fee', width: 18 },
        { header: 'Status', key: 'status', width: 22 },
        { header: 'IsPopular', key: 'isPopular', width: 14 },
        { header: 'SyllabusJSON', key: 'syllabusJSON', width: 60 },
        { header: 'OutcomesJSON', key: 'outcomesJSON', width: 60 },
        { header: 'BannerImage', key: 'bannerImage', width: 40 },
        { header: 'Mode', key: 'mode', width: 25 },
        { header: 'Language', key: 'language', width: 25 },
        { header: 'WhoShouldJoinJSON', key: 'whoShouldJoinJSON', width: 60 },
        { header: 'SkillsJSON', key: 'skillsJSON', width: 60 },
        { header: 'CurriculumJSON', key: 'curriculumJSON', width: 60 },
        { header: 'ProjectsJSON', key: 'projectsJSON', width: 60 },
        { header: 'SyllabusFileName', key: 'syllabusFileName', width: 40 },
        { header: 'SyllabusFileBase64', key: 'syllabusFileBase64', width: 20 }
      ];
      coursesSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      coursesSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3B4D' } };
      INITIAL_COURSES.forEach(c => {
        coursesSheet.addRow({
          ...c,
          modules: c.modules.join(', '),
          syllabusJSON: JSON.stringify(c.syllabus),
          outcomesJSON: JSON.stringify(c.learningOutcomes),
          bannerImage: '',
          mode: 'Live Online & Interactive',
          language: 'Telugu & English',
          whoShouldJoinJSON: JSON.stringify([]),
          skillsJSON: JSON.stringify([]),
          curriculumJSON: JSON.stringify([]),
          projectsJSON: JSON.stringify([]),
          syllabusFileName: '',
          syllabusFileBase64: ''
        });
      });

      // 3. Enrollments Sheet
      const enrollSheet = workbook.addWorksheet('Enrollments', { views: [{ state: 'frozen', ySplit: 1 }] });
      enrollSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'CourseID', key: 'courseId', width: 24 },
        { header: 'CourseTitle', key: 'courseTitle', width: 32 },
        { header: 'CourseCategory', key: 'courseCategory', width: 22 },
        { header: 'UserID', key: 'userId', width: 18 },
        { header: 'UserName', key: 'userName', width: 25 },
        { header: 'UserEmail', key: 'userEmail', width: 30 },
        { header: 'UserPhone', key: 'userPhone', width: 18 },
        { header: 'EducationOrJob', key: 'educationOrJob', width: 30 },
        { header: 'ExperienceLevel', key: 'experienceLevel', width: 18 },
        { header: 'Mode', key: 'mode', width: 16 },
        { header: 'PreferredBatch', key: 'preferredBatch', width: 18 },
        { header: 'Notes', key: 'notes', width: 35 },
        { header: 'Status', key: 'status', width: 18 },
        { header: 'PaymentStatus', key: 'paymentStatus', width: 18 },
        { header: 'EnrolledAt', key: 'enrolledAt', width: 22 }
      ];
      enrollSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      enrollSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_ENROLLMENTS.forEach(e => enrollSheet.addRow(e));

      // 4. Contacts Sheet
      const contactsSheet = workbook.addWorksheet('Contacts', { views: [{ state: 'frozen', ySplit: 1 }] });
      contactsSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'Subject', key: 'subject', width: 30 },
        { header: 'ServiceInterest', key: 'serviceInterest', width: 28 },
        { header: 'Message', key: 'message', width: 50 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'SubmittedAt', key: 'submittedAt', width: 22 }
      ];
      contactsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      contactsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3B4D' } };
      INITIAL_CONTACTS.forEach(c => contactsSheet.addRow(c));

      // 5. Appointments Sheet
      const apptSheet = workbook.addWorksheet('Appointments', { views: [{ state: 'frozen', ySplit: 1 }] });
      apptSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'ServiceType', key: 'serviceType', width: 28 },
        { header: 'Date', key: 'date', width: 16 },
        { header: 'TimeSlot', key: 'timeSlot', width: 25 },
        { header: 'Topic', key: 'topic', width: 40 },
        { header: 'MeetingType', key: 'meetingType', width: 18 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'CreatedAt', key: 'createdAt', width: 22 }
      ];
      apptSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      apptSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_APPOINTMENTS.forEach(a => apptSheet.addRow(a));

      // 6. Orders Sheet
      const ordersSheet = workbook.addWorksheet('Orders', { views: [{ state: 'frozen', ySplit: 1 }] });
      ordersSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'UserID', key: 'userId', width: 18 },
        { header: 'CustomerName', key: 'customerName', width: 25 },
        { header: 'CustomerEmail', key: 'customerEmail', width: 30 },
        { header: 'CustomerPhone', key: 'customerPhone', width: 20 },
        { header: 'CompanyName', key: 'companyName', width: 25 },
        { header: 'ItemsJSON', key: 'itemsJSON', width: 50 },
        { header: 'Subtotal', key: 'subtotal', width: 14 },
        { header: 'Tax', key: 'tax', width: 12 },
        { header: 'Total', key: 'total', width: 14 },
        { header: 'PaymentMethod', key: 'paymentMethod', width: 22 },
        { header: 'PaymentStatus', key: 'paymentStatus', width: 16 },
        { header: 'OrderStatus', key: 'orderStatus', width: 18 },
        { header: 'CreatedAt', key: 'createdAt', width: 22 }
      ];
      ordersSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      ordersSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3B4D' } };
      INITIAL_ORDERS.forEach(o => {
        ordersSheet.addRow({
          ...o,
          itemsJSON: JSON.stringify(o.items)
        });
      });

      // 7. Testimonials Sheet
      const testSheet = workbook.addWorksheet('Testimonials', { views: [{ state: 'frozen', ySplit: 1 }] });
      testSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Role', key: 'role', width: 25 },
        { header: 'CompanyOrCollege', key: 'companyOrCollege', width: 32 },
        { header: 'Rating', key: 'rating', width: 12 },
        { header: 'ServiceOrCourse', key: 'serviceOrCourse', width: 30 },
        { header: 'Comment', key: 'comment', width: 60 },
        { header: 'IsApproved', key: 'isApproved', width: 14 },
        { header: 'Featured', key: 'featured', width: 14 },
        { header: 'Date', key: 'date', width: 16 }
      ];
      testSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      testSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_TESTIMONIALS.forEach(t => testSheet.addRow(t));

      // 8. Newsletter Sheet
      const newsSheet = workbook.addWorksheet('Newsletter', { views: [{ state: 'frozen', ySplit: 1 }] });
      newsSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Email', key: 'email', width: 35 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'SubscribedAt', key: 'subscribedAt', width: 22 }
      ];
      newsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      newsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3B4D' } };
      INITIAL_NEWSLETTER.forEach(n => newsSheet.addRow(n));

      // 9. Blogs Sheet
      const blogsSheet = workbook.addWorksheet('Blogs', { views: [{ state: 'frozen', ySplit: 1 }] });
      blogsSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Slug', key: 'slug', width: 32 },
        { header: 'Title', key: 'title', width: 45 },
        { header: 'Excerpt', key: 'excerpt', width: 50 },
        { header: 'Content', key: 'content', width: 60 },
        { header: 'Category', key: 'category', width: 24 },
        { header: 'Author', key: 'author', width: 24 },
        { header: 'AuthorRole', key: 'authorRole', width: 24 },
        { header: 'ReadTime', key: 'readTime', width: 16 },
        { header: 'PublishedAt', key: 'publishedAt', width: 22 },
        { header: 'CoverImage', key: 'coverImage', width: 40 },
        { header: 'Tags', key: 'tags', width: 35 },
        { header: 'Likes', key: 'likes', width: 12 }
      ];
      blogsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      blogsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_BLOGS.forEach(b => {
        blogsSheet.addRow([
          b.id,
          b.slug,
          b.title,
          b.excerpt,
          b.content,
          b.category,
          b.author,
          b.authorRole,
          b.readTime,
          b.publishedAt,
          b.coverImage || '',
          b.tags.join(', '),
          b.likes || 0
        ]);
      });

      await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
      console.log(`[ExcelStorageEngine] Successfully generated initial Excel workbook with 9 sheets at: ${EXCEL_FILE_PATH}`);
    }
  }

  private async getWorkbook(): Promise<ExcelJS.Workbook> {
    await this.ensureWorkbookExists();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);

    // If Blogs sheet missing in existing Excel file, add it
    let blogsSheet = workbook.getWorksheet('Blogs');
    if (!blogsSheet) {
      blogsSheet = workbook.addWorksheet('Blogs', { views: [{ state: 'frozen', ySplit: 1 }] });
      blogsSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Slug', key: 'slug', width: 32 },
        { header: 'Title', key: 'title', width: 45 },
        { header: 'Excerpt', key: 'excerpt', width: 50 },
        { header: 'Content', key: 'content', width: 60 },
        { header: 'Category', key: 'category', width: 24 },
        { header: 'Author', key: 'author', width: 24 },
        { header: 'AuthorRole', key: 'authorRole', width: 24 },
        { header: 'ReadTime', key: 'readTime', width: 16 },
        { header: 'PublishedAt', key: 'publishedAt', width: 22 },
        { header: 'CoverImage', key: 'coverImage', width: 40 },
        { header: 'Tags', key: 'tags', width: 35 },
        { header: 'Likes', key: 'likes', width: 12 }
      ];
      blogsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      blogsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_BLOGS.forEach(b => {
        blogsSheet!.addRow([
          b.id,
          b.slug,
          b.title,
          b.excerpt,
          b.content,
          b.category,
          b.author,
          b.authorRole,
          b.readTime,
          b.publishedAt,
          b.coverImage || '',
          b.tags.join(', '),
          b.likes || 0
        ]);
      });
      await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
    }

    return workbook;
  }

  private async saveWorkbook(workbook: ExcelJS.Workbook): Promise<void> {
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
  }

  // --- USERS OPERATIONS ---
  public async getAllUsers(): Promise<User[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Users');
    if (!sheet) return [INITIAL_ADMIN, INITIAL_USER];

    const users: User[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Header
      const values = row.values as any[];
      if (values[1]) {
        users.push({
          id: String(values[1] || ''),
          name: String(values[2] || ''),
          email: String(values[3] || '').trim(),
          password: String(values[4] || ''),
          role: (String(values[5] || 'USER').toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER'),
          phone: String(values[6] || ''),
          organization: String(values[7] || ''),
          bio: String(values[8] || ''),
          avatar: String(values[9] || ''),
          createdAt: String(values[10] || '')
        });
      }
    });
    return users;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const users = await this.getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
  }

  public async createUser(user: Partial<User>): Promise<User> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Users');
    if (!sheet) throw new Error('Users worksheet missing');

    const newUser: User = {
      id: `usr-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      name: user.name || 'Anonymous User',
      email: user.email!.trim(),
      password: user.password || '',
      role: user.role || 'USER',
      phone: user.phone || '',
      organization: user.organization || '',
      bio: user.bio || '',
      avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.role,
      newUser.phone,
      newUser.organization,
      newUser.bio,
      newUser.avatar,
      newUser.createdAt
    ]);

    await this.saveWorkbook(workbook);
    return newUser;
  }

  public async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Users');
    if (!sheet) return null;

    let updatedUser: User | null = null;

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        const user: User = {
          id: values[1],
          name: updates.name ?? values[2],
          email: updates.email ?? values[3],
          password: updates.password ?? values[4],
          role: updates.role ?? values[5],
          phone: updates.phone ?? values[6],
          organization: updates.organization ?? values[7],
          bio: updates.bio ?? values[8],
          avatar: updates.avatar ?? values[9],
          createdAt: values[10]
        };
        row.getCell(2).value = user.name;
        row.getCell(3).value = user.email;
        if (updates.password) row.getCell(4).value = user.password;
        if (updates.role) row.getCell(5).value = user.role;
        row.getCell(6).value = user.phone;
        row.getCell(7).value = user.organization;
        row.getCell(8).value = user.bio;
        row.getCell(9).value = user.avatar;
        updatedUser = user;
      }
    });

    if (updatedUser) {
      await this.saveWorkbook(workbook);
    }
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Users');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        targetRow = rowNumber;
      }
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- COURSES OPERATIONS ---
  public async getAllCourses(): Promise<Course[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Courses');
    if (!sheet) return INITIAL_COURSES;

    const courses: Course[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        let syllabus = [];
        let learningOutcomes = [];
        let whoShouldJoin: string[] = [];
        let skills: string[] = [];
        let curriculum: any[] = [];
        let projects: any[] = [];
        try {
          syllabus = values[11] ? JSON.parse(values[11]) : [];
        } catch {
          syllabus = [];
        }
        try {
          learningOutcomes = values[12] ? JSON.parse(values[12]) : [];
        } catch {
          learningOutcomes = [];
        }
        try {
          whoShouldJoin = values[16] ? JSON.parse(values[16]) : [];
        } catch {
          whoShouldJoin = [];
        }
        try {
          skills = values[17] ? JSON.parse(values[17]) : [];
        } catch {
          skills = [];
        }
        try {
          curriculum = values[18] ? JSON.parse(values[18]) : [];
        } catch {
          curriculum = [];
        }
        try {
          projects = values[19] ? JSON.parse(values[19]) : [];
        } catch {
          projects = [];
        }

        const courseTitle = String(values[2] || '');
        const autoSlug = courseTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        courses.push({
          id: String(values[1] || ''),
          slug: autoSlug || String(values[1] || '').replace('crs-', ''),
          title: courseTitle,
          category: values[3] as any,
          description: String(values[4] || ''),
          icon: 'BookOpen',
          modules: values[5] ? String(values[5]).split(',').map(s => s.trim()) : [],
          level: String(values[6] || 'All Levels'),
          duration: String(values[7] || ''),
          fee: String(values[8] || 'Contact EWD'),
          status: values[9] as any || 'Open for Enrollment',
          isPopular: values[10] === true || String(values[10]).toLowerCase() === 'true',
          syllabus,
          learningOutcomes,
          bannerImage: values[13] ? String(values[13]) : undefined,
          mode: values[14] ? String(values[14]) : '',
          language: values[15] ? String(values[15]) : '',
          whoShouldJoin,
          skills,
          curriculum,
          projects,
          syllabusFileName: values[20] ? String(values[20]) : undefined,
          syllabusFile: values[21] ? String(values[21]) : undefined
        });
      }
    });

    // Check if Excel contains the new 8 courses; if it still holds old 6 dummy courses, sync with INITIAL_COURSES
    const hasNewCourses = courses.some(c => c.id === 'crs-ai-ml' || c.id === 'crs-cloud-aws' || c.id === 'crs-frontend-dev');
    if (!hasNewCourses) {
      while (sheet.rowCount > 1) {
        sheet.spliceRows(2, 1);
      }
      INITIAL_COURSES.forEach(c => {
        sheet.addRow([
          c.id,
          c.title,
          c.category,
          c.description,
          c.modules.join(', '),
          c.level,
          c.duration,
          c.fee,
          c.status,
          c.isPopular,
          JSON.stringify(c.syllabus),
          JSON.stringify(c.learningOutcomes),
          '',
          'Live Online & Interactive',
          'Telugu & English',
          JSON.stringify([]),
          JSON.stringify([]),
          JSON.stringify([]),
          JSON.stringify([]),
          '',
          ''
        ]);
      });
      await this.saveWorkbook(workbook);
      return INITIAL_COURSES;
    }

    return courses.length ? courses : INITIAL_COURSES;
  }

  public async createCourse(course: Partial<Course>): Promise<Course> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Courses');
    if (!sheet) throw new Error('Courses sheet missing');

    const titleSlug = (course.title || 'course')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const syllabusFileName = (course as any).syllabusFileName || '';
    const syllabusFile = (course as any).syllabusFile || '';

    const newCourse: Course = {
      id: course.id || `crs-${Date.now().toString(36)}`,
      slug: course.slug || titleSlug,
      title: course.title || 'New Training Program',
      category: course.category || 'FULL STACK',
      description: course.description || '',
      icon: course.icon || 'BookOpen',
      modules: course.modules || [],
      level: course.level || 'All Levels',
      duration: course.duration !== undefined ? course.duration : '',
      fee: course.fee || 'Contact EWD',
      status: course.status || 'Open for Enrollment',
      isPopular: !!course.isPopular,
      bannerImage: course.bannerImage || '',
      mode: course.mode !== undefined ? course.mode : '',
      language: course.language !== undefined ? course.language : '',
      syllabus: course.syllabus || [],
      learningOutcomes: course.learningOutcomes || [],
      whoShouldJoin: course.whoShouldJoin || [],
      skills: course.skills || [],
      curriculum: course.curriculum || [],
      projects: course.projects || [],
      syllabusFileName: syllabusFileName || undefined,
      syllabusFile: syllabusFile || undefined
    };

    sheet.addRow([
      newCourse.id,
      newCourse.title,
      newCourse.category,
      newCourse.description,
      newCourse.modules.join(', '),
      newCourse.level,
      newCourse.duration,
      newCourse.fee,
      newCourse.status,
      newCourse.isPopular,
      JSON.stringify(newCourse.syllabus),
      JSON.stringify(newCourse.learningOutcomes),
      newCourse.bannerImage || '',
      newCourse.mode || 'Live Online & Interactive',
      newCourse.language || 'Telugu & English',
      JSON.stringify(newCourse.whoShouldJoin || []),
      JSON.stringify(newCourse.skills || []),
      JSON.stringify(newCourse.curriculum || []),
      JSON.stringify(newCourse.projects || []),
      syllabusFileName,
      syllabusFile
    ]);

    await this.saveWorkbook(workbook);
    return newCourse;
  }

  public async updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Courses');
    if (!sheet) return null;

    let updated: Course | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.title) row.getCell(2).value = updates.title;
        if (updates.category) row.getCell(3).value = updates.category;
        if (updates.description) row.getCell(4).value = updates.description;
        if (updates.modules) row.getCell(5).value = updates.modules.join(', ');
        if (updates.level) row.getCell(6).value = updates.level;
        if (updates.duration) row.getCell(7).value = updates.duration;
        if (updates.fee) row.getCell(8).value = updates.fee;
        if (updates.status) row.getCell(9).value = updates.status;
        if (updates.isPopular !== undefined) row.getCell(10).value = updates.isPopular;
        if (updates.syllabus) row.getCell(11).value = JSON.stringify(updates.syllabus);
        if (updates.learningOutcomes) row.getCell(12).value = JSON.stringify(updates.learningOutcomes);
        if (updates.bannerImage !== undefined) row.getCell(13).value = updates.bannerImage;
        if (updates.mode !== undefined) row.getCell(14).value = updates.mode;
        if (updates.language !== undefined) row.getCell(15).value = updates.language;
        if (updates.whoShouldJoin !== undefined) row.getCell(16).value = JSON.stringify(updates.whoShouldJoin);
        if (updates.skills !== undefined) row.getCell(17).value = JSON.stringify(updates.skills);
        if (updates.curriculum !== undefined) row.getCell(18).value = JSON.stringify(updates.curriculum);
        if (updates.projects !== undefined) row.getCell(19).value = JSON.stringify(updates.projects);
        // Only overwrite syllabus fields if a new non-empty value is provided
        if ((updates as any).syllabusFileName) row.getCell(20).value = (updates as any).syllabusFileName;
        if ((updates as any).syllabusFile) row.getCell(21).value = (updates as any).syllabusFile;

        updated = {
          id,
          title: updates.title ?? values[2],
          category: updates.category ?? values[3],
          description: updates.description ?? values[4],
          icon: 'BookOpen',
          modules: updates.modules ?? (values[5] ? String(values[5]).split(',').map(s => s.trim()) : []),
          level: updates.level ?? values[6],
          duration: updates.duration ?? values[7],
          fee: updates.fee ?? values[8],
          status: updates.status ?? values[9],
          isPopular: updates.isPopular ?? values[10],
          syllabus: updates.syllabus ?? (values[11] ? JSON.parse(values[11]) : []),
          learningOutcomes: updates.learningOutcomes ?? (values[12] ? JSON.parse(values[12]) : []),
          bannerImage: updates.bannerImage ?? values[13],
          mode: updates.mode ?? values[14],
          language: updates.language ?? values[15],
          whoShouldJoin: updates.whoShouldJoin ?? (values[16] ? JSON.parse(values[16]) : []),
          skills: updates.skills ?? (values[17] ? JSON.parse(values[17]) : []),
          curriculum: updates.curriculum ?? (values[18] ? JSON.parse(values[18]) : []),
          projects: updates.projects ?? (values[19] ? JSON.parse(values[19]) : []),
          syllabusFileName: (updates as any).syllabusFileName ?? (values[20] ? String(values[20]) : undefined),
          syllabusFile: (updates as any).syllabusFile ?? (values[21] ? String(values[21]) : undefined)
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteCourse(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Courses');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- ENROLLMENTS OPERATIONS ---
  public async getAllEnrollments(): Promise<Enrollment[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Enrollments');
    if (!sheet) return INITIAL_ENROLLMENTS;

    const enrollments: Enrollment[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        enrollments.push({
          id: String(values[1] || ''),
          courseId: String(values[2] || ''),
          courseTitle: String(values[3] || ''),
          courseCategory: String(values[4] || ''),
          userId: String(values[5] || ''),
          userName: String(values[6] || ''),
          userEmail: String(values[7] || ''),
          userPhone: String(values[8] || ''),
          educationOrJob: String(values[9] || ''),
          experienceLevel: String(values[10] || ''),
          mode: (values[11] || 'Online Live') as any,
          preferredBatch: (values[12] || 'Morning') as any,
          notes: String(values[13] || ''),
          status: (values[14] || 'Under Review') as any,
          paymentStatus: (values[15] || 'Pending') as any,
          enrolledAt: String(values[16] || '')
        });
      }
    });
    return enrollments;
  }

  public async createEnrollment(enrollment: Partial<Enrollment>): Promise<Enrollment> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Enrollments');
    if (!sheet) throw new Error('Enrollments sheet missing');

    const newEnrollment: Enrollment = {
      id: `enr-${Date.now().toString(36)}`,
      courseId: enrollment.courseId || 'crs-general',
      courseTitle: enrollment.courseTitle || 'EWD Technology Program',
      courseCategory: enrollment.courseCategory || 'FULL STACK',
      userId: enrollment.userId || '',
      userName: enrollment.userName || 'Anonymous Student',
      userEmail: enrollment.userEmail || '',
      userPhone: enrollment.userPhone || '',
      educationOrJob: enrollment.educationOrJob || 'Graduate / Professional',
      experienceLevel: enrollment.experienceLevel || 'Beginner',
      mode: enrollment.mode || 'Hybrid',
      preferredBatch: enrollment.preferredBatch || 'Morning',
      notes: enrollment.notes || '',
      status: 'Confirmed',
      paymentStatus: enrollment.paymentStatus || 'Paid',
      enrolledAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newEnrollment.id,
      newEnrollment.courseId,
      newEnrollment.courseTitle,
      newEnrollment.courseCategory,
      newEnrollment.userId,
      newEnrollment.userName,
      newEnrollment.userEmail,
      newEnrollment.userPhone,
      newEnrollment.educationOrJob,
      newEnrollment.experienceLevel,
      newEnrollment.mode,
      newEnrollment.preferredBatch,
      newEnrollment.notes,
      newEnrollment.status,
      newEnrollment.paymentStatus,
      newEnrollment.enrolledAt
    ]);

    await this.saveWorkbook(workbook);
    return newEnrollment;
  }

  public async updateEnrollment(id: string, updates: Partial<Enrollment>): Promise<Enrollment | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Enrollments');
    if (!sheet) return null;

    let updated: Enrollment | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.status) row.getCell(14).value = updates.status;
        if (updates.paymentStatus) row.getCell(15).value = updates.paymentStatus;
        if (updates.notes) row.getCell(13).value = updates.notes;

        updated = {
          id,
          courseId: values[2],
          courseTitle: values[3],
          courseCategory: values[4],
          userId: values[5],
          userName: values[6],
          userEmail: values[7],
          userPhone: values[8],
          educationOrJob: values[9],
          experienceLevel: values[10],
          mode: values[11],
          preferredBatch: values[12],
          notes: updates.notes ?? values[13],
          status: updates.status ?? values[14],
          paymentStatus: updates.paymentStatus ?? values[15],
          enrolledAt: values[16]
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteEnrollment(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Enrollments');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- CONTACTS OPERATIONS ---
  public async getAllContacts(): Promise<ContactSubmission[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Contacts');
    if (!sheet) return INITIAL_CONTACTS;

    const contacts: ContactSubmission[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        contacts.push({
          id: String(values[1] || ''),
          name: String(values[2] || ''),
          email: String(values[3] || ''),
          phone: String(values[4] || ''),
          subject: String(values[5] || ''),
          serviceInterest: String(values[6] || ''),
          message: String(values[7] || ''),
          status: (values[8] || 'New') as any,
          submittedAt: String(values[9] || '')
        });
      }
    });
    return contacts;
  }

  public async createContact(contact: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Contacts');
    if (!sheet) throw new Error('Contacts sheet missing');

    const newContact: ContactSubmission = {
      id: `cnt-${Date.now().toString(36)}`,
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      subject: contact.subject || 'General Inquiry',
      serviceInterest: contact.serviceInterest || 'Web Engineering',
      message: contact.message || '',
      status: 'New',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newContact.id,
      newContact.name,
      newContact.email,
      newContact.phone,
      newContact.subject,
      newContact.serviceInterest,
      newContact.message,
      newContact.status,
      newContact.submittedAt
    ]);

    await this.saveWorkbook(workbook);
    return newContact;
  }

  public async updateContact(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Contacts');
    if (!sheet) return null;

    let updated: ContactSubmission | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.status) row.getCell(8).value = updates.status;

        updated = {
          id,
          name: values[2],
          email: values[3],
          phone: values[4],
          subject: values[5],
          serviceInterest: values[6],
          message: values[7],
          status: updates.status ?? values[8],
          submittedAt: values[9]
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteContact(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Contacts');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- APPOINTMENTS OPERATIONS ---
  public async getAllAppointments(): Promise<AppointmentBooking[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Appointments');
    if (!sheet) return INITIAL_APPOINTMENTS;

    const appointments: AppointmentBooking[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        appointments.push({
          id: String(values[1] || ''),
          name: String(values[2] || ''),
          email: String(values[3] || ''),
          phone: String(values[4] || ''),
          serviceType: String(values[5] || ''),
          date: String(values[6] || ''),
          timeSlot: String(values[7] || ''),
          topic: String(values[8] || ''),
          meetingType: (values[9] || 'Google Meet') as any,
          status: (values[10] || 'Confirmed') as any,
          createdAt: String(values[11] || '')
        });
      }
    });
    return appointments;
  }

  public async createAppointment(appointment: Partial<AppointmentBooking>): Promise<AppointmentBooking> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Appointments');
    if (!sheet) throw new Error('Appointments sheet missing');

    const newAppt: AppointmentBooking = {
      id: `apt-${Date.now().toString(36)}`,
      name: appointment.name || '',
      email: appointment.email || '',
      phone: appointment.phone || '',
      serviceType: appointment.serviceType || 'General Consultation',
      date: appointment.date || new Date().toISOString().substring(0, 10),
      timeSlot: appointment.timeSlot || '10:00 AM - 11:00 AM IST',
      topic: appointment.topic || 'Consultation Discussion',
      meetingType: appointment.meetingType || 'Google Meet',
      status: 'Confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newAppt.id,
      newAppt.name,
      newAppt.email,
      newAppt.phone,
      newAppt.serviceType,
      newAppt.date,
      newAppt.timeSlot,
      newAppt.topic,
      newAppt.meetingType,
      newAppt.status,
      newAppt.createdAt
    ]);

    await this.saveWorkbook(workbook);
    return newAppt;
  }

  public async updateAppointment(id: string, updates: Partial<AppointmentBooking>): Promise<AppointmentBooking | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Appointments');
    if (!sheet) return null;

    let updated: AppointmentBooking | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.status) row.getCell(10).value = updates.status;

        updated = {
          id,
          name: values[2],
          email: values[3],
          phone: values[4],
          serviceType: values[5],
          date: values[6],
          timeSlot: values[7],
          topic: values[8],
          meetingType: values[9],
          status: updates.status ?? values[10],
          createdAt: values[11]
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteAppointment(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Appointments');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- ORDERS OPERATIONS ---
  public async getAllOrders(): Promise<ShopOrder[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Orders');
    if (!sheet) return INITIAL_ORDERS;

    const orders: ShopOrder[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        let items = [];
        try {
          items = values[7] ? JSON.parse(values[7]) : [];
        } catch {
          items = [];
        }

        orders.push({
          id: String(values[1] || ''),
          userId: String(values[2] || ''),
          customerName: String(values[3] || ''),
          customerEmail: String(values[4] || ''),
          customerPhone: String(values[5] || ''),
          companyName: String(values[6] || ''),
          items,
          subtotal: Number(values[8] || 0),
          tax: Number(values[9] || 0),
          total: Number(values[10] || 0),
          paymentMethod: (values[11] || 'Razorpay / Stripe') as any,
          paymentStatus: (values[12] || 'Paid') as any,
          orderStatus: (values[13] || 'Delivered') as any,
          createdAt: String(values[14] || '')
        });
      }
    });
    return orders;
  }

  public async createOrder(order: Partial<ShopOrder>): Promise<ShopOrder> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Orders');
    if (!sheet) throw new Error('Orders sheet missing');

    const newOrder: ShopOrder = {
      id: `ord-${Date.now().toString(36)}`,
      userId: order.userId || '',
      customerName: order.customerName || 'Customer',
      customerEmail: order.customerEmail || '',
      customerPhone: order.customerPhone || '',
      companyName: order.companyName || '',
      items: order.items || [],
      subtotal: order.subtotal || 0,
      tax: order.tax || 0,
      total: order.total || 0,
      paymentMethod: order.paymentMethod || 'Razorpay / Stripe',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newOrder.id,
      newOrder.userId,
      newOrder.customerName,
      newOrder.customerEmail,
      newOrder.customerPhone,
      newOrder.companyName,
      JSON.stringify(newOrder.items),
      newOrder.subtotal,
      newOrder.tax,
      newOrder.total,
      newOrder.paymentMethod,
      newOrder.paymentStatus,
      newOrder.orderStatus,
      newOrder.createdAt
    ]);

    await this.saveWorkbook(workbook);
    return newOrder;
  }

  // --- TESTIMONIALS OPERATIONS ---
  public async getAllTestimonials(): Promise<Testimonial[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Testimonials');
    if (!sheet) return INITIAL_TESTIMONIALS;

    const testimonials: Testimonial[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        testimonials.push({
          id: String(values[1] || ''),
          name: String(values[2] || ''),
          role: String(values[3] || ''),
          companyOrCollege: String(values[4] || ''),
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          rating: Number(values[5] || 5),
          serviceOrCourse: String(values[6] || ''),
          comment: String(values[7] || ''),
          isApproved: values[8] === true || String(values[8]).toLowerCase() === 'true',
          featured: values[9] === true || String(values[9]).toLowerCase() === 'true',
          date: String(values[10] || '')
        });
      }
    });
    return testimonials;
  }

  public async createTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Testimonials');
    if (!sheet) throw new Error('Testimonials sheet missing');

    const newTestimonial: Testimonial = {
      id: `tst-${Date.now().toString(36)}`,
      name: t.name || 'Anonymous Reviewer',
      role: t.role || 'Client / Student',
      companyOrCollege: t.companyOrCollege || 'Tech Enterprise',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: t.rating || 5,
      serviceOrCourse: t.serviceOrCourse || 'General Service',
      comment: t.comment || '',
      isApproved: true, // Default active for immediate display, admin can moderate
      featured: false,
      date: new Date().toISOString().substring(0, 10)
    };

    sheet.addRow([
      newTestimonial.id,
      newTestimonial.name,
      newTestimonial.role,
      newTestimonial.companyOrCollege,
      newTestimonial.rating,
      newTestimonial.serviceOrCourse,
      newTestimonial.comment,
      newTestimonial.isApproved,
      newTestimonial.featured,
      newTestimonial.date
    ]);

    await this.saveWorkbook(workbook);
    return newTestimonial;
  }

  public async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Testimonials');
    if (!sheet) return null;

    let updated: Testimonial | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.isApproved !== undefined) row.getCell(8).value = updates.isApproved;
        if (updates.featured !== undefined) row.getCell(9).value = updates.featured;

        updated = {
          id,
          name: values[2],
          role: values[3],
          companyOrCollege: values[4],
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          rating: Number(values[5] || 5),
          serviceOrCourse: values[6],
          comment: values[7],
          isApproved: updates.isApproved ?? values[8],
          featured: updates.featured ?? values[9],
          date: values[10]
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteTestimonial(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Testimonials');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- NEWSLETTER OPERATIONS ---
  public async getAllSubscribers(): Promise<NewsletterSubscriber[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Newsletter');
    if (!sheet) return INITIAL_NEWSLETTER;

    const subscribers: NewsletterSubscriber[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        subscribers.push({
          id: String(values[1] || ''),
          email: String(values[2] || ''),
          status: (values[3] || 'Active') as any,
          subscribedAt: String(values[4] || '')
        });
      }
    });
    return subscribers;
  }

  public async subscribeNewsletter(email: string): Promise<NewsletterSubscriber> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Newsletter');
    if (!sheet) throw new Error('Newsletter sheet missing');

    const cleanEmail = email.trim().toLowerCase();
    const all = await this.getAllSubscribers();
    const existing = all.find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return existing;
    }

    const newSub: NewsletterSubscriber = {
      id: `nl-${Date.now().toString(36)}`,
      email: cleanEmail,
      status: 'Active',
      subscribedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newSub.id,
      newSub.email,
      newSub.status,
      newSub.subscribedAt
    ]);

    await this.saveWorkbook(workbook);
    return newSub;
  }

  // --- BLOGS OPERATIONS ---
  public async getAllBlogs(): Promise<BlogPost[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Blogs');
    if (!sheet) return INITIAL_BLOGS;

    const blogs: BlogPost[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        blogs.push({
          id: String(values[1] || ''),
          slug: String(values[2] || ''),
          title: String(values[3] || ''),
          excerpt: String(values[4] || ''),
          content: String(values[5] || ''),
          category: String(values[6] || 'Technology'),
          author: String(values[7] || 'EWD Team'),
          authorRole: String(values[8] || 'Editor'),
          readTime: String(values[9] || '5 min read'),
          publishedAt: String(values[10] || ''),
          coverImage: String(values[11] || ''),
          tags: values[12] ? String(values[12]).split(',').map(s => s.trim()).filter(Boolean) : [],
          likes: Number(values[13] || 0)
        });
      }
    });
    return blogs.length ? blogs : INITIAL_BLOGS;
  }

  public async createBlog(blog: Partial<BlogPost>): Promise<BlogPost> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Blogs');
    if (!sheet) throw new Error('Blogs sheet missing');

    const newBlog: BlogPost = {
      id: blog.id || `blog-${Date.now().toString(36)}`,
      slug: blog.slug || (blog.title ? blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `post-${Date.now()}`),
      title: blog.title || 'Untitled Article',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'Tech Article',
      author: blog.author || 'Pavan Bathygari',
      authorRole: blog.authorRole || 'Author & Tech Lead',
      readTime: blog.readTime || '5 min read',
      publishedAt: blog.publishedAt || new Date().toISOString().replace('T', ' ').substring(0, 19),
      coverImage: blog.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      tags: blog.tags || ['Technology', 'EWD'],
      likes: blog.likes || 0
    };

    sheet.addRow([
      newBlog.id,
      newBlog.slug,
      newBlog.title,
      newBlog.excerpt,
      newBlog.content,
      newBlog.category,
      newBlog.author,
      newBlog.authorRole,
      newBlog.readTime,
      newBlog.publishedAt,
      newBlog.coverImage,
      newBlog.tags.join(', '),
      newBlog.likes
    ]);

    await this.saveWorkbook(workbook);
    return newBlog;
  }

  public async updateBlog(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Blogs');
    if (!sheet) return null;

    let updated: BlogPost | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        const currentTags = values[12] ? String(values[12]).split(',').map(s => s.trim()).filter(Boolean) : [];
        const nextTags = updates.tags ? updates.tags : currentTags;

        if (updates.slug) row.getCell(2).value = updates.slug;
        if (updates.title) row.getCell(3).value = updates.title;
        if (updates.excerpt) row.getCell(4).value = updates.excerpt;
        if (updates.content) row.getCell(5).value = updates.content;
        if (updates.category) row.getCell(6).value = updates.category;
        if (updates.author) row.getCell(7).value = updates.author;
        if (updates.authorRole) row.getCell(8).value = updates.authorRole;
        if (updates.readTime) row.getCell(9).value = updates.readTime;
        if (updates.coverImage !== undefined) row.getCell(11).value = updates.coverImage;
        if (updates.tags) row.getCell(12).value = nextTags.join(', ');
        if (updates.likes !== undefined) row.getCell(13).value = updates.likes;

        updated = {
          id,
          slug: updates.slug ?? values[2],
          title: updates.title ?? values[3],
          excerpt: updates.excerpt ?? values[4],
          content: updates.content ?? values[5],
          category: updates.category ?? values[6],
          author: updates.author ?? values[7],
          authorRole: updates.authorRole ?? values[8],
          readTime: updates.readTime ?? values[9],
          publishedAt: values[10],
          coverImage: updates.coverImage ?? values[11],
          tags: nextTags,
          likes: updates.likes ?? Number(values[13] || 0)
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteBlog(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Blogs');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- RAW SPREADSHEET MANAGER API (For Admin Dashboard Live Excel Grid) ---
  public async getRawSheetsOverview(): Promise<{ name: string; rowCount: number; headers: string[]; rows: any[] }[]> {
    const workbook = await this.getWorkbook();
    const result: { name: string; rowCount: number; headers: string[]; rows: any[] }[] = [];

    workbook.eachSheet(sheet => {
      const headers: string[] = [];
      const rows: any[] = [];

      sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          row.eachCell({ includeEmpty: true }, (cell) => {
            headers.push(String(cell.value || ''));
          });
        } else {
          const rowObj: Record<string, any> = { _rowNumber: rowNumber };
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const header = headers[colNumber - 1] || `Col_${colNumber}`;
            rowObj[header] = cell.value;
          });
          rows.push(rowObj);
        }
      });

      result.push({
        name: sheet.name,
        rowCount: rows.length,
        headers,
        rows
      });
    });

    return result;
  }

  public async updateCellInSheet(sheetName: string, rowNumber: number, columnKey: string, newValue: any): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) return false;

    const row = sheet.getRow(rowNumber);
    if (!row) return false;

    // Find column index by matching header in row 1
    const headerRow = sheet.getRow(1);
    let targetCol = -1;
    headerRow.eachCell((cell, colIndex) => {
      if (String(cell.value).toLowerCase() === columnKey.toLowerCase()) {
        targetCol = colIndex;
      }
    });

    if (targetCol > 0) {
      row.getCell(targetCol).value = newValue;
      await this.saveWorkbook(workbook);
      return true;
    }

    return false;
  }

  public getFilePath(): string {
    return EXCEL_FILE_PATH;
  }
}
