import { Course } from '../types';

export interface PopularCourseItem {
  id: string;
  title: string;
  badge: string;
  badgeIcon: 'crown' | 'star' | 'flame' | 'eye' | 'rocket' | 'briefcase' | 'chart' | 'bulb';
  bannerGradient: string;
  accentColor: string;
  buttonBorderColor: string;
  description: string;
  duration: string;
  level: string;
  projectsCount: string;
  fee: string;
  originalFee: string;
  category: string;
  modules: string[];
  courseData: Course;
}

export const POPULAR_COURSES: PopularCourseItem[] = [
  {
    id: 'java-full-stack',
    title: 'Java Full Stack Development',
    badge: 'Bestseller',
    badgeIcon: 'crown',
    bannerGradient: 'from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8]',
    accentColor: '#2563EB',
    buttonBorderColor: 'border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/10',
    description: 'Master Java, Spring Boot, React and build real-world projects from scratch.',
    duration: '6 Months',
    level: 'Beginner to Pro',
    projectsCount: '20+ Projects',
    fee: '₹14,999',
    originalFee: '₹34,999',
    category: 'FULL STACK',
    modules: [
      'Core Java 21 & OOPs',
      'Data Structures & Algorithms',
      'Spring Boot 3 & Microservices',
      'REST APIs & Spring Security',
      'React 19 & TypeScript',
      'PostgreSQL & Hibernate',
      'Docker & Containerization',
      'AWS Cloud Deployment'
    ],
    courseData: {
      id: 'crs-java-full-stack',
      slug: 'java-full-stack',
      title: 'Java Full Stack Development',
      category: 'FULL STACK',
      description: 'Master Java, Spring Boot, React and build real-world projects from scratch. Build production-grade enterprise software with microservices, security, and cloud deployment.',
      icon: 'BookOpen',
      modules: ['Core Java 21', 'Spring Boot 3', 'Microservices', 'React 19', 'PostgreSQL', 'Docker', 'AWS'],
      level: 'Beginner to Pro',
      duration: '6 Months',
      fee: '₹14,999',
      originalFee: '₹34,999',
      discountPercent: 57,
      emiStartsAt: '₹2,499/mo',
      status: 'Open for Enrollment',
      isPopular: true,
      startDate: '17th SEP 2026',
      timings: '7:00 PM - 8:30 PM',
      buttonText: 'Enroll Now',
      language: 'Telugu & English',
      syllabus: [
        { week: 'Phase 1', topic: 'Core Java 21, OOPs, Collections & Multi-Threading', details: 'Deep dive into language fundamentals, memory management, garbage collection and streams.' },
        { week: 'Phase 2', topic: 'Spring Boot 3, RESTful Services & JPA/Hibernate', details: 'Build enterprise backend services, database migrations with Flyway, and API documentation.' },
        { week: 'Phase 3', topic: 'Frontend with React 19, Hooks, Redux & Tailwind', details: 'Create high performance client web applications with responsive interfaces and real-time state.' },
        { week: 'Phase 4', topic: 'Microservices Architecture, Docker, Kafka & AWS', details: 'Service discovery, API gateway, circuit breaker, messaging queues, and CI/CD pipelines.' }
      ],
      learningOutcomes: [
        'Build and deploy scalable enterprise microservices on AWS',
        'Master end-to-end full stack development from databases to modern React UIs',
        '20+ industry-grade portfolio projects reviewed by senior tech leads'
      ]
    }
  },
  {
    id: 'python-data-science',
    title: 'Python for Data Science',
    badge: 'Most Popular',
    badgeIcon: 'star',
    bannerGradient: 'from-[#0F172A] via-[#0E7490] to-[#0891B2]',
    accentColor: '#0891B2',
    buttonBorderColor: 'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2]/10',
    description: 'Learn Python, ML, Data Analysis and work on real-world datasets.',
    duration: '4 Months',
    level: 'Beginner Friendly',
    projectsCount: '15+ Projects',
    fee: '₹12,499',
    originalFee: '₹28,999',
    category: 'DATA & AI',
    modules: [
      'Python 3.12 Fundamentals',
      'NumPy & Pandas Data Wrangling',
      'Data Visualization (Matplotlib & Seaborn)',
      'Exploratory Data Analysis (EDA)',
      'Scikit-Learn Machine Learning',
      'SQL for Data Analysts',
      'Power BI & Interactive Dashboards',
      'Model Deployment with Streamlit'
    ],
    courseData: {
      id: 'crs-python-data-science',
      slug: 'python-for-data-science',
      title: 'Python for Data Science',
      category: 'DATA & AI',
      description: 'Learn Python, ML, Data Analysis and work on real-world datasets. Gain mastery over statistical analysis, predictive modeling, and executive dashboarding.',
      icon: 'BookOpen',
      modules: ['Python 3.12', 'Pandas & NumPy', 'Machine Learning', 'Power BI', 'SQL', 'Streamlit'],
      level: 'Beginner Friendly',
      duration: '4 Months',
      fee: '₹12,499',
      originalFee: '₹28,999',
      discountPercent: 56,
      emiStartsAt: '₹2,080/mo',
      status: 'Open for Enrollment',
      isPopular: true,
      startDate: '22nd SEP 2026',
      timings: '6:30 PM - 8:00 PM',
      buttonText: 'Enroll Now',
      language: 'Telugu & English',
      syllabus: [
        { week: 'Phase 1', topic: 'Python Programming, Data Structures & File I/O', details: 'Comprehensive programming foundation with practical scripting and automation exercises.' },
        { week: 'Phase 2', topic: 'Data Wrangling, Statistics & Cleaning with Pandas', details: 'Handling messy datasets, feature engineering, missing values, and time-series analysis.' },
        { week: 'Phase 3', topic: 'Supervised & Unsupervised Machine Learning Algorithms', details: 'Regression, Classification, Decision Trees, Random Forests, K-Means clustering, and model metrics.' },
        { week: 'Phase 4', topic: 'Power BI Dashboards, SQL Analytics & Real Deployment', details: 'Building executive KPI dashboards, relational database querying, and live web apps.' }
      ],
      learningOutcomes: [
        'Analyze complex business data and deliver actionable data-driven insights',
        'Build and train predictive ML models with evaluation metrics',
        'Create interactive dashboards and portfolio datasets on GitHub'
      ]
    }
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & ML',
    badge: 'Trending',
    badgeIcon: 'flame',
    bannerGradient: 'from-[#2E1065] via-[#6B21A8] to-[#9333EA]',
    accentColor: '#9333EA',
    buttonBorderColor: 'border-[#9333EA] text-[#9333EA] hover:bg-[#9333EA]/10',
    description: 'Learn AI, Machine Learning, Deep Learning and build intelligent solutions.',
    duration: '6 Months',
    level: 'Intermediate',
    projectsCount: '12+ Projects',
    fee: '₹18,999',
    originalFee: '₹39,999',
    category: 'DATA & AI',
    modules: [
      'Mathematics for AI (Calculus & Linear Algebra)',
      'Deep Learning & Neural Networks',
      'PyTorch & TensorFlow Foundations',
      'Computer Vision & Image Classification',
      'Natural Language Processing (NLP)',
      'Large Language Models (LLMs) & Prompting',
      'RAG Architectures & Vector DBs',
      'Generative AI Application Deployment'
    ],
    courseData: {
      id: 'crs-ai-ml',
      slug: 'ai-and-ml',
      title: 'Artificial Intelligence & ML',
      category: 'DATA & AI',
      description: 'Learn AI, Machine Learning, Deep Learning and build intelligent solutions. Specialize in modern generative AI, neural networks, and agentic workflows.',
      icon: 'BookOpen',
      modules: ['Deep Learning', 'PyTorch', 'Computer Vision', 'NLP', 'LLMs & RAG', 'LangChain'],
      level: 'Intermediate',
      duration: '6 Months',
      fee: '₹18,999',
      originalFee: '₹39,999',
      discountPercent: 52,
      emiStartsAt: '₹3,160/mo',
      status: 'Open for Enrollment',
      isPopular: true,
      startDate: '25th SEP 2026',
      timings: '7:30 PM - 9:00 PM',
      buttonText: 'Enroll Now',
      language: 'Telugu & English',
      syllabus: [
        { week: 'Phase 1', topic: 'Mathematics, Statistics & Neural Network Foundations', details: 'Backpropagation, gradient descent, activation functions, loss functions and architectures.' },
        { week: 'Phase 2', topic: 'Computer Vision with CNNs, YOLO & OpenCV', details: 'Object detection, face recognition, semantic segmentation and real-time video processing.' },
        { week: 'Phase 3', topic: 'Natural Language Processing & Transformer Models', details: 'Tokenization, attention mechanisms, BERT, GPT models, and sequence-to-sequence pipelines.' },
        { week: 'Phase 4', topic: 'Generative AI, LLM Fine-Tuning, RAG & LangChain', details: 'Building retrieval-augmented generation pipelines with vector databases like Pinecone and Chroma.' }
      ],
      learningOutcomes: [
        'Develop production-grade Generative AI and deep learning applications',
        'Fine-tune open-source LLMs and implement custom knowledge retrieval (RAG)',
        '12+ advanced capstone projects in computer vision, NLP, and multimodal AI'
      ]
    }
  },
  {
    id: 'cloud-aws',
    title: 'Cloud Computing (AWS)',
    badge: 'New',
    badgeIcon: 'eye',
    bannerGradient: 'from-[#082F49] via-[#0369A1] to-[#0284C7]',
    accentColor: '#0284C7',
    buttonBorderColor: 'border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7]/10',
    description: 'Learn AWS services, architecture, and deploy real-world applications.',
    duration: '3 Months',
    level: 'Beginner Friendly',
    projectsCount: '10+ Projects',
    fee: '₹9,999',
    originalFee: '₹22,999',
    category: 'CLOUD & TOOLS',
    modules: [
      'AWS Cloud Fundamentals & IAM',
      'Compute (EC2, ECS, Lambda Serverless)',
      'Storage (S3, EBS, EFS)',
      'Networking (VPC, Subnets, Route 53)',
      'Database Solutions (RDS, DynamoDB)',
      'Infrastructure as Code (Terraform)',
      'Monitoring & CloudWatch',
      'AWS Solutions Architect Associate Prep'
    ],
    courseData: {
      id: 'crs-cloud-aws',
      slug: 'cloud-computing-aws',
      title: 'Cloud Computing (AWS)',
      category: 'CLOUD & TOOLS',
      description: 'Learn AWS services, architecture, and deploy real-world applications. Master cloud security, high availability, serverless architectures, and Terraform IaC.',
      icon: 'BookOpen',
      modules: ['AWS IAM & EC2', 'VPC Networking', 'S3 Storage', 'Lambda Serverless', 'RDS', 'Terraform'],
      level: 'Beginner Friendly',
      duration: '3 Months',
      fee: '₹9,999',
      originalFee: '₹22,999',
      discountPercent: 56,
      emiStartsAt: '₹1,999/mo',
      status: 'Open for Enrollment',
      isPopular: true,
      startDate: '1st OCT 2026',
      timings: '8:00 AM - 9:30 AM',
      buttonText: 'Enroll Now',
      language: 'Telugu & English',
      syllabus: [
        { week: 'Phase 1', topic: 'AWS Core Services & Security Governance', details: 'IAM policies, multi-factor authentication, EC2 instance types, security groups, and key pairs.' },
        { week: 'Phase 2', topic: 'Virtual Private Cloud (VPC) & Hybrid Networking', details: 'Custom VPCs, public/private subnets, NAT gateways, peering, and Route 53 DNS.' },
        { week: 'Phase 3', topic: 'Serverless Computing & Cloud Storage Architectures', details: 'AWS Lambda, API Gateway, S3 lifecycle rules, DynamoDB NoSQL, and EventBridge triggers.' },
        { week: 'Phase 4', topic: 'DevOps on AWS, Terraform IaC & Exam Simulation', details: 'Automating multi-tier infrastructure deployments and practice mock exams for SAA-C03.' }
      ],
      learningOutcomes: [
        'Design fault-tolerant, scalable, cost-efficient cloud architectures on AWS',
        'Automate cloud infrastructure provisioning using Terraform IaC',
        'Prepare thoroughly for the AWS Certified Solutions Architect Associate exam'
      ]
    }
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    badge: 'In Demand',
    badgeIcon: 'rocket',
    bannerGradient: 'from-[#1E1B4B] via-[#4338CA] to-[#6366F1]',
    accentColor: '#6366F1',
    buttonBorderColor: 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/5',
    description: 'Master HTML, CSS, JavaScript, React.js and build beautiful user interfaces.',
    duration: '4 Months',
    level: 'Beginner Friendly',
    projectsCount: '15+ Projects',
    fee: '',
    originalFee: '',
    category: 'FRONTEND',
    modules: [
      'HTML5 Semantic Markup & Accessibility',
      'Modern CSS3, Flexbox, Grid & Animations',
      'Tailwind CSS Component Systems',
      'JavaScript ES6+ & Asynchronous Programming',
      'React 18 & Hooks Architecture',
      'TypeScript for Modern Web Applications',
      'State Management & REST API Integration',
      'Vite Build Tools & Production Deployment'
    ],
    courseData: {
      id: 'crs-frontend-dev',
      slug: 'frontend-development',
      title: 'Frontend Development',
      category: 'FRONTEND',
      description: 'Master HTML, CSS, JavaScript, React.js and build beautiful user interfaces.',
      icon: 'BookOpen',
      modules: ['HTML5 & CSS3', 'JavaScript ES6+', 'React 18', 'Tailwind CSS', 'TypeScript', 'Vite & Vercel'],
      level: 'Beginner Friendly',
      duration: '4 Months',
      fee: '',
      originalFee: '',
      status: 'Open for Enrollment',
      isPopular: true,
      startDate: '19th SEP 2026',
      timings: '7:00 PM - 8:30 PM',
      buttonText: 'Enroll Now',
      language: 'Telugu & English',
      syllabus: [
        { week: 'Phase 1', topic: 'HTML5 & Modern CSS3 Mastery', details: 'Semantic Structure, Accessibility (WCAG) & SEO, Flexbox & CSS Grid Deep Dive, Responsive Layouts & Modern Tailwind CSS.' },
        { week: 'Phase 2', topic: 'JavaScript & TypeScript Foundations', details: 'ES6+ Features, DOM Manipulation & Event-driven Architecture, Async/Await & Fetch API, TypeScript Types.' },
        { week: 'Phase 3', topic: 'React 18 Component Engineering', details: 'JSX, Components, Props & Virtual DOM, React Hooks: useState, useEffect, Custom Hooks & Context API State Sharing.' },
        { week: 'Phase 4', topic: 'State Management, API Integration & Production Deployment', details: 'RESTful Endpoints Consumption, Error Handling, Client-side Routing, Vite Build Tooling, and Automated Deployments.' }
      ],
      learningOutcomes: [
        'Modern frontend foundations to modern React SPA architecture',
        'Mobile-first responsive web design with Tailwind CSS',
        'Asynchronous JavaScript, TypeScript & API integration',
        'Portfolio-grade interactive web projects',
        'Production deployment and SEO best practices'
      ]
    }
  },
  {
    id: 'software-testing',
    title: 'Software Testing & Automation',
    badge: 'Career Booster',
    badgeIcon: 'briefcase',
    bannerGradient: 'from-[#881337] via-[#BE123C] to-[#E11D48]',
    accentColor: '#E11D48',
    buttonBorderColor: 'border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48]/10',
    description: 'Learn Manual Testing, Selenium, TestNG and become a QA expert.',
    duration: '3 Months',
    level: 'All Levels',
    projectsCount: '10+ Projects',
    fee: '₹8,999',
    originalFee: '₹21,999',
    category: 'TESTING',
    modules: [
      'Manual Testing & SDLC / STLC Models',
      'Agile Methodology & JIRA Sprint Tracking',
      'Test Case Design & Defect Life Cycle',
      'Core Java for Automation Testers',
      'Selenium WebDriver 4 Framework Design',
      'TestNG Annotations & Parallel Execution',
      'Cucumber BDD Framework',
      'Postman API Testing & CI/CD with Jenkins'
    ],
    courseData: {
      id: 'crs-software-testing',
      slug: 'software-testing-automation',
      title: 'Software Testing & Automation',
      category: 'TESTING',
      description: 'Learn Manual Testing, Selenium, TestNG and become a QA expert. Master automated web testing frameworks, API validation, and continuous integration pipelines.',
      icon: 'BookOpen',
      modules: ['Manual Testing', 'Selenium WebDriver', 'TestNG', 'Cucumber BDD', 'Postman API', 'Jenkins CI'],
      level: 'All Levels',
      duration: '3 Months',
      fee: '₹8,999',
      originalFee: '₹21,999',
      discountPercent: 59,
      emiStartsAt: '₹1,799/mo',
      status: 'Open for Enrollment',
      isPopular: true,
      startDate: '28th SEP 2026',
      timings: '8:00 PM - 9:30 PM',
      buttonText: 'Enroll Now',
      language: 'Telugu & English',
      syllabus: [
        { week: 'Phase 1', topic: 'Manual Testing Fundamentals, STLC & JIRA Tool', details: 'Requirement analysis, test scenario preparation, black box techniques, bug reporting in JIRA.' },
        { week: 'Phase 2', topic: 'Core Java for QA & Selenium WebDriver Automation', details: 'Locators (XPath, CSS), handling dynamic elements, alerts, frames, windows, and waits.' },
        { week: 'Phase 3', topic: 'TestNG, Page Object Model (POM) & Data-Driven QA', details: 'Framework architecture, Apache POI for Excel data, assertions, and ExtentReports generation.' },
        { week: 'Phase 4', topic: 'Cucumber BDD, Postman API Testing & Jenkins CI/CD', details: 'Feature files, Gherkin syntax, REST API status/payload validation, and nightly build regression.' }
      ],
      learningOutcomes: [
        'Design and execute enterprise automated test suites from scratch',
        'Master both Manual QA processes and Selenium + TestNG automation frameworks',
        'Hands-on experience in API automation and continuous test integration'
      ]
    }
  },
  {
    id: 'sql-db',
    title: 'SQL & Database Management',
    badge: 'High Demand',
    badgeIcon: 'chart',
    bannerGradient: 'from-[#7C2D12] via-[#C2410C] to-[#EA580C]',
    accentColor: '#EA580C',
    buttonBorderColor: 'border-[#EA580C] text-[#EA580C] hover:bg-[#EA580C]/10',
    description: 'Learn SQL, Database concepts, queries and real-world data handling.',
    duration: '2 Months',
    level: 'Beginner Friendly',
    projectsCount: '8+ Projects',
    fee: '₹6,999',
    originalFee: '₹16,999',
    category: 'DATA & AI',
    modules: [
      'Relational Database Concepts (RDBMS)',
      'DDL, DML, DCL & TCL Commands',
      'Advanced Joins & Subqueries',
      'Window Functions & CTEs',
      'Indexes & Query Performance Tuning',
      'Stored Procedures, Triggers & Views',
      'PostgreSQL & MySQL Administration',
      'Database Modeling & Normalization'
    ],
    courseData: {
      id: 'crs-sql-db',
      slug: 'sql-database-management',
      title: 'SQL & Database Management',
      category: 'DATA & AI',
      description: 'Learn SQL, Database concepts, queries and real-world data handling. Write lightning-fast queries, analyze millions of rows, and design resilient schemas.',
      icon: 'BookOpen',
      modules: ['RDBMS Fundamentals', 'Complex SQL Queries', 'Window Functions', 'Query Optimization', 'PostgreSQL', 'Database Design'],
      level: 'Beginner Friendly',
      duration: '2 Months',
      fee: '₹6,999',
      originalFee: '₹16,999',
      discountPercent: 58,
      emiStartsAt: '₹1,399/mo',
      status: 'Open for Enrollment',
      isPopular: true,
      startDate: '5th OCT 2026',
      timings: '6:00 PM - 7:00 PM',
      buttonText: 'Enroll Now',
      language: 'Telugu & English',
      syllabus: [
        { week: 'Phase 1', topic: 'Relational Database Architecture & Query Fundamentals', details: 'Database normalization (1NF, 2NF, 3NF, BCNF), constraints, primary & foreign keys, filtering.' },
        { week: 'Phase 2', topic: 'Complex Joins, Grouping & Multi-Table Aggregations', details: 'Inner/outer joins, self joins, grouping sets, rollup, cube, and having clauses.' },
        { week: 'Phase 3', topic: 'Window Functions, CTEs & Advanced SQL Analytics', details: 'ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, partition by, running totals, and recursive queries.' },
        { week: 'Phase 4', topic: 'Indexing, Execution Plans & Performance Optimization', details: 'B-Tree indexes, query execution plan analysis (EXPLAIN ANALYZE), and database transactions.' }
      ],
      learningOutcomes: [
        'Write complex, optimized SQL queries for high-volume enterprise databases',
        'Master analytical window functions and common table expressions (CTEs)',
        'Design scalable database schemas with industry-standard normalization'
      ]
    }
  },
  {
    id: 'android-dev',
    title: 'Android App Development',
    badge: 'Project Based',
    badgeIcon: 'bulb',
    bannerGradient: 'from-[#064E3B] via-[#047857] to-[#059669]',
    accentColor: '#059669',
    buttonBorderColor: 'border-[#059669] text-[#059669] hover:bg-[#059669]/10',
    description: 'Learn Android Development with Kotlin and build real-world mobile apps.',
    duration: '4 Months',
    level: 'Beginner to Pro',
    projectsCount: '12+ Projects',
    fee: '₹11,999',
    originalFee: '₹26,999',
    category: 'FULL STACK',
    modules: [
      'Kotlin 2.0 Modern Language Features',
      'Android Studio & Emulator Setup',
      'Jetpack Compose Declarative UI',
      'Material 3 Theming & Responsive Layouts',
      'MVVM Architecture & ViewModel',
      'Room Database & Local Persistence',
      'Retrofit REST API Integration',
      'Firebase Auth, Cloud Messaging & Play Store'
    ],
    courseData: {
      id: 'crs-android-dev',
      slug: 'android-app-development',
      title: 'Android App Development',
      category: 'FULL STACK',
      description: 'Learn Android Development with Kotlin and build real-world mobile apps. Build sleek, fast, and feature-rich Android apps using Jetpack Compose and clean architecture.',
      icon: 'BookOpen',
      modules: ['Kotlin 2.0', 'Jetpack Compose', 'MVVM Architecture', 'Room DB', 'Retrofit', 'Firebase', 'Play Store'],
      level: 'Beginner to Pro',
      duration: '4 Months',
      fee: '₹11,999',
      originalFee: '₹26,999',
      discountPercent: 55,
      emiStartsAt: '₹1,999/mo',
      status: 'Open for Enrollment',
      isPopular: true,
      startDate: '24th SEP 2026',
      timings: '7:30 PM - 9:00 PM',
      buttonText: 'Enroll Now',
      language: 'Telugu & English',
      syllabus: [
        { week: 'Phase 1', topic: 'Kotlin Programming Fundamentals & Coroutines', details: 'Object-oriented Kotlin, null safety, extension functions, lambdas, coroutines, and flow.' },
        { week: 'Phase 2', topic: 'Jetpack Compose Declarative UI Development', details: 'Composable functions, state hoisting, layouts, animations, and Material Design 3 components.' },
        { week: 'Phase 3', topic: 'MVVM Clean Architecture & Data Persistence with Room', details: 'Repository pattern, Room local database, LiveData/StateFlow, and dependency injection.' },
        { week: 'Phase 4', topic: 'Networking with Retrofit, Firebase & Play Store Publish', details: 'JSON parsing, push notifications, authentication, and publishing live APK/AAB to Google Play.' }
      ],
      learningOutcomes: [
        'Build native Android applications from scratch using Kotlin and Jetpack Compose',
        'Implement clean MVVM architecture with local database caching and REST APIs',
        '12+ real-world mobile applications deployed to the Google Play Store'
      ]
    }
  }
];
