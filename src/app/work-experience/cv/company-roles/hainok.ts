import { type ResumeRole } from '@/app/work-experience/cv/cv.types';

export const hainokEN: ResumeRole = {
  company: 'Hainok Technologies SL.',
  location: 'Barcelona, Spain',
  startDate: '2024-07',
  current: true,
  displayTitle: 'Technical Lead → CTO (Hands-on Engineering)',
  titles: [
    {
      title: 'Technical Lead',
      startDate: '2024-07',
      endDate: '2025-10',
    },
    {
      title: 'CTO',
      startDate: '2025-10',
    },
  ],

  facts: [
    {
      id: 'hainok-team-leadership',
      statement:
        'Lead a three-person team consisting of a senior engineer, a junior engineer and a Customer Success team member.',
      type: 'leadership',
      tags: ['team-leadership', 'people-management', 'engineering-leadership', 'cross-functional'],
      priority: 9,
      metrics: {
        teamSize: 3,
      },
    },

    {
      id: 'hainok-architecture',
      statement:
        'Own technology-stack decisions and architecture of the infrastructure foundations for company products.',
      type: 'technical',
      tags: ['architecture', 'system-design', 'infrastructure', 'technology-strategy', 'technical-ownership'],
      priority: 10,
    },

    {
      id: 'hainok-technical-roadmap',
      statement: 'Design, manage and execute the technical roadmap for the company products.',
      type: 'leadership',
      tags: ['technical-roadmap', 'technical-strategy', 'delivery', 'planning', 'technical-ownership'],
      priority: 10,
    },

    {
      id: 'hainok-business-model',
      statement: 'Participate in business-model planning together with CEOs and shareholders.',
      type: 'business',
      tags: ['business-strategy', 'executive-collaboration', 'product-strategy', 'stakeholder-management'],
      priority: 7,
    },

    {
      id: 'hainok-engineering-process',
      statement: 'Introduced Agile methodologies and recurring engineering processes within the team.',
      type: 'leadership',
      tags: ['agile', 'engineering-process', 'team-process', 'delivery'],
      priority: 6,
    },

    {
      id: 'hainok-client-facing',
      statement:
        'Work directly with customers, prospective clients and Spanish public administrations to support sales and resolve technical questions.',
      type: 'business',
      tags: [
        'client-facing',
        'pre-sales',
        'sales-engineering',
        'public-sector',
        'stakeholder-management',
        'technical-communication',
      ],
      priority: 8,
    },

    {
      id: 'hainok-product-strategy',
      statement:
        'Contribute to product strategy by identifying new milestones, differentiation opportunities and potential partnerships.',
      type: 'business',
      tags: ['product-strategy', 'product-differentiation', 'partnerships', 'business-strategy'],
      priority: 6,
    },

    {
      id: 'hainok-hiring',
      statement: 'Conduct technical hiring and interview processes.',
      type: 'leadership',
      tags: ['hiring', 'technical-interviewing', 'team-building'],
      priority: 7,
    },

    {
      id: 'hainok-costs',
      statement:
        'Own technical-cost control and forecasting. For example, migrate all data from ELasticSearch to Atlas Search indexes to reduce costs in around 200 euros a month and having one source of truth for the data, synced.',
      type: 'business',
      tags: ['cost-control', 'budgeting', 'forecasting', 'infrastructure-costs'],
      priority: 6,
    },

    {
      id: 'hainok-ai',
      statement:
        'Drive the adoption and integration of AI into internal processes, tools and customer-facing products.',
      type: 'technical',
      tags: ['ai', 'ai-integration', 'automation', 'technical-strategy', 'product-development'],
      priority: 8,
    },

    {
      id: 'hainok-mentoring',
      statement: 'Mentor and provide technical guidance to engineers on the team.',
      type: 'leadership',
      tags: ['mentoring', 'coaching', 'engineering-leadership', 'technical-guidance'],
      priority: 8,
    },

    {
      id: 'hainok-hands-on-engineering',
      statement:
        'Remain actively involved in software development, including legacy migrations, bug fixing and feature development.',
      type: 'technical',
      tags: ['hands-on-engineering', 'software-development', 'legacy-migration', 'feature-development', 'maintenance'],
      priority: 10,
    },

    {
      id: 'hainok-revenue-growth',
      statement: 'Increased revenue by 30% this year by fulfilling customer needs.',
      type: 'business',
      tags: ['revenue-growth', 'customer-needs', 'customer-satisfaction', 'customer-retention'],
      priority: 10,
      metrics: {
        revenueGrowth: 30,
      },
    },
  ],

  technologies: [
    'React',
    'NestJS',
    'MongoDB Atlas',
    'PostgreSQL',
    'PostGis',
    'Elasticsearch',
    'Docker',
    'AWS',
    'BullMQ',
    'Python',
    'Redis',
    'Scrapy',
    'Linux',
    'CircleCI',
    'DigitalOcean',
    'Hetzner',
    'Supabase',
    'NextJs',
    'GoLang',
    'OpenAI',
    'Anthropic',
  ],
};

export const hainokES: ResumeRole = {
  company: 'Hainok Technologies SL.',
  location: 'Barcelona, España',
  startDate: '2024-07',
  current: true,
  displayTitle: 'Tech Lead → CTO (Ingeniería práctica)',
  titles: [
    {
      title: 'Tech Lead',
      startDate: '2024-07',
      endDate: '2025-10',
    },
    {
      title: 'CTO',
      startDate: '2025-10',
    },
  ],

  facts: [
    {
      id: 'hainok-team-leadership',
      statement:
        'Liderar un equipo de tres personas compuesto por un ingeniero senior, un ingeniero junior y una persona del equipo de Customer Success.',
      type: 'leadership',
      tags: ['team-leadership', 'people-management', 'engineering-leadership', 'cross-functional'],
      priority: 9,
      metrics: {
        teamSize: 3,
      },
    },

    {
      id: 'hainok-architecture',
      statement:
        'Decidir el stack tecnológico y la arquitectura de los cimientos de infraestructura de los productos de la empresa.',
      type: 'technical',
      tags: ['architecture', 'system-design', 'infrastructure', 'technology-strategy', 'technical-ownership'],
      priority: 10,
    },

    {
      id: 'hainok-technical-roadmap',
      statement: 'Diseñar, controlar y ejecutar la hoja de ruta técnica de los productos de la empresa.',
      type: 'leadership',
      tags: ['technical-roadmap', 'technical-strategy', 'delivery', 'planning', 'technical-ownership'],
      priority: 10,
    },

    {
      id: 'hainok-business-model',
      statement: 'Participar en la planificación del modelo de negocio junto con CEOs y accionistas.',
      type: 'business',
      tags: ['business-strategy', 'executive-collaboration', 'product-strategy', 'stakeholder-management'],
      priority: 7,
    },

    {
      id: 'hainok-engineering-process',
      statement: 'Implantar metodologías Agile y procesos de ingeniería recurrentes dentro del equipo.',
      type: 'leadership',
      tags: ['agile', 'engineering-process', 'team-process', 'delivery'],
      priority: 6,
    },

    {
      id: 'hainok-client-facing',
      statement:
        'Hablar directamente con clientes, clientes potenciales y administraciones públicas españolas para dar soporte a ventas y resolver dudas técnicas.',
      type: 'business',
      tags: [
        'client-facing',
        'pre-sales',
        'sales-engineering',
        'public-sector',
        'stakeholder-management',
        'technical-communication',
      ],
      priority: 8,
    },

    {
      id: 'hainok-product-strategy',
      statement:
        'Contribuir a la estrategia de producto identificando nuevos hitos, oportunidades de diferenciación y posibles alianzas.',
      type: 'business',
      tags: ['product-strategy', 'product-differentiation', 'partnerships', 'business-strategy'],
      priority: 6,
    },

    {
      id: 'hainok-hiring',
      statement: 'Conducir procesos de contratación y entrevistas técnicas.',
      type: 'leadership',
      tags: ['hiring', 'technical-interviewing', 'team-building'],
      priority: 7,
    },

    {
      id: 'hainok-costs',
      statement:
        'Controlar los costes técnicos y las previsiones. Por ejemplo, migrar todos los datos de Elasticsearch a índices de Atlas Search para reducir costes en unos 200 euros al mes y tener una única fuente de verdad para los datos, sincronizada.',
      type: 'business',
      tags: ['cost-control', 'budgeting', 'forecasting', 'infrastructure-costs'],
      priority: 6,
    },

    {
      id: 'hainok-ai',
      statement:
        'Impulsar la adopción e integración de la IA en procesos internos, herramientas y productos orientados al cliente.',
      type: 'technical',
      tags: ['ai', 'ai-integration', 'automation', 'technical-strategy', 'product-development'],
      priority: 8,
    },

    {
      id: 'hainok-mentoring',
      statement: 'Mentorizar y proporcionar orientación técnica a los ingenieros del equipo.',
      type: 'leadership',
      tags: ['mentoring', 'coaching', 'engineering-leadership', 'technical-guidance'],
      priority: 8,
    },

    {
      id: 'hainok-hands-on-engineering',
      statement:
        'Seguir implicándome activamente en el desarrollo de software, incluyendo migraciones de código legacy, corrección de bugs y desarrollo de features.',
      type: 'technical',
      tags: ['hands-on-engineering', 'software-development', 'legacy-migration', 'feature-development', 'maintenance'],
      priority: 10,
    },

    {
      id: 'hainok-revenue-growth',
      statement: 'Aumenté los ingresos un 30% este año satisfaciendo las necesidades de los clientes.',
      type: 'business',
      tags: ['revenue-growth', 'customer-needs', 'customer-satisfaction', 'customer-retention'],
      priority: 10,
      metrics: {
        revenueGrowth: 30,
      },
    },
  ],

  technologies: [
    'React',
    'NestJS',
    'MongoDB Atlas',
    'PostgreSQL',
    'PostGis',
    'Elasticsearch',
    'Docker',
    'AWS',
    'BullMQ',
    'Python',
    'Redis',
    'Scrapy',
    'Linux',
    'CircleCI',
    'DigitalOcean',
    'Hetzner',
    'Supabase',
    'NextJs',
    'GoLang',
    'OpenAI',
    'Anthropic',
  ],
};
