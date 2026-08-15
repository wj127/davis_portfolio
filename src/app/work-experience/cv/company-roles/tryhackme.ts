import { type ResumeRole } from '@/app/work-experience/cv/cv.types';

export const tryHackMeEN: ResumeRole = {
  company: 'TryHackMe',
  location: 'London, United Kingdom',
  startDate: '2022-04',
  endDate: '2024-08',
  current: false,
  displayTitle: 'Full Stack Developer',

  titles: [
    {
      title: 'Full Stack Developer',
      startDate: '2022-04',
      endDate: '2024-08',
    },
  ],

  facts: [
    {
      id: 'thm-platform-migration',
      statement:
        'Contributed to the migration of a tightly coupled EJS and Express.js application into a React 18 frontend and an independent Express.js TypeScript backend module.',
      type: 'technical',
      tags: [
        'fullstack',
        'frontend',
        'backend',
        'platform-migration',
        'legacy-modernisation',
        'architecture',
        'typescript',
        'react',
      ],
      priority: 10,
    },

    {
      id: 'thm-legacy-maintenance',
      statement: 'Maintained legacy features and API endpoints while the platform migration was in progress.',
      type: 'technical',
      tags: ['legacy-systems', 'maintenance', 'backend', 'migration'],
      priority: 5,
    },

    {
      id: 'thm-feature-api-development',
      statement: 'Developed new APIs and product features across the migrated frontend and backend codebases.',
      type: 'technical',
      tags: ['fullstack', 'api-development', 'feature-development', 'frontend', 'backend'],
      priority: 8,
    },

    {
      id: 'thm-api-performance',
      statement:
        'Optimised API performance by refactoring MongoDB queries and application logic, achieving a median approximately 34x performance improvement on targeted workloads and up to approximately 77x in exceptional cases.',
      type: 'achievement',
      tags: ['backend', 'performance', 'performance-optimisation', 'database', 'mongodb', 'api'],
      priority: 10,
      metrics: {
        medianPerformanceImprovement: '~34x',
        maximumPerformanceImprovement: '~77x',
      },
    },

    {
      id: 'thm-frontend-performance',
      statement:
        'Improved performance of complex React pages using techniques including lazy loading, caching and pre-rendering, with a focus on reducing First Contentful Paint.',
      type: 'technical',
      tags: [
        'frontend',
        'react',
        'performance',
        'web-performance',
        'lazy-loading',
        'caching',
        'first-contentful-paint',
      ],
      priority: 9,
    },

    {
      id: 'thm-cross-squad-contribution',
      statement:
        'Worked primarily within the B2B squad while contributing technical support across Growth and B2C teams due to broad knowledge of the product codebase.',
      type: 'scope',
      tags: ['cross-team', 'cross-functional', 'b2b', 'b2c', 'growth', 'product-knowledge'],
      priority: 8,
    },

    {
      id: 'thm-careers-squad-leadership',
      statement: 'Provided major technical support to and temporarily led the Careers squad.',
      type: 'leadership',
      tags: ['technical-leadership', 'team-leadership', 'cross-team', 'delivery'],
      priority: 8,
    },

    {
      id: 'thm-soc-simulator',
      statement:
        'Contributed to delivery of a major SOC Simulator feature within the B2B product, working with AWS on-demand compute resources, virtual machines and cybersecurity content engineers.',
      type: 'technical',
      tags: ['aws', 'cloud', 'virtual-machines', 'b2b', 'cybersecurity', 'cross-functional', 'product-development'],
      priority: 9,
    },

    {
      id: 'thm-cross-functional-collaboration',
      statement:
        'Worked closely with UX/UI designers, Product Managers, Customer Success and Sales throughout product development.',
      type: 'scope',
      tags: ['cross-functional', 'product', 'design', 'customer-success', 'sales', 'stakeholder-management'],
      priority: 7,
    },

    {
      id: 'thm-b2b-prospects',
      statement:
        'Participated in meetings with prospective B2B customers and leads, providing technical and product context.',
      type: 'business',
      tags: ['b2b', 'customer-facing', 'pre-sales', 'sales-engineering', 'technical-communication'],
      priority: 7,
    },

    {
      id: 'thm-product-ideation',
      statement:
        'Participated in internal hackathons, go-to-market weeks and product brainstorming sessions with company leadership, product teams and other stakeholders.',
      type: 'scope',
      tags: ['product-strategy', 'innovation', 'hackathons', 'go-to-market', 'stakeholder-collaboration'],
      priority: 6,
    },

    {
      id: 'thm-mentoring',
      statement: 'Mentored and supported developers joining or working across the squads in which I participated.',
      type: 'leadership',
      tags: ['mentoring', 'technical-mentorship', 'developer-support', 'engineering-leadership'],
      priority: 8,
    },

    {
      id: 'thm-experimentation',
      statement:
        'Worked within a strong experimentation and A/B testing culture and applied those practices to product development.',
      type: 'scope',
      tags: ['ab-testing', 'experimentation', 'product-development', 'data-driven-development'],
      priority: 7,
    },

    {
      id: 'thm-b2c-to-b2b-experiment',
      statement: 'Worked on an experimental B2C-to-B2B growth flow.',
      type: 'technical',
      tags: ['growth', 'b2c', 'b2b', 'experimentation', 'product-development'],
      priority: 6,
    },
  ],
  technologies: [
    'EJS',
    'Express.js',
    'TypeScript',
    'React 18',
    'MongoDB',
    'AWS',
    'Virtual Machines',
    'Linux',
    'GitHub Actions',
    'Docker',
    'Jest',
    'OpenAI',
  ],
};

export const tryHackMeES: ResumeRole = {
  company: 'TryHackMe',
  location: 'Londres, Reino Unido',
  startDate: '2022-04',
  endDate: '2024-08',
  current: false,
  displayTitle: 'Desarrollador full stack',

  titles: [
    {
      title: 'Desarrollador full stack',
      startDate: '2022-04',
      endDate: '2024-08',
    },
  ],

  facts: [
    {
      id: 'thm-platform-migration',
      statement:
        'Participé en la migración de una aplicación EJS y Express.js fuertemente acoplada hacia un frontend React 18 y un submódulo backend independiente de Express.js con TypeScript.',
      type: 'technical',
      tags: [
        'fullstack',
        'frontend',
        'backend',
        'platform-migration',
        'legacy-modernisation',
        'architecture',
        'typescript',
        'react',
      ],
      priority: 10,
    },

    {
      id: 'thm-legacy-maintenance',
      statement: 'Mantuve features y endpoints legacy mientras la migración de la plataforma estaba en curso.',
      type: 'technical',
      tags: ['legacy-systems', 'maintenance', 'backend', 'migration'],
      priority: 5,
    },

    {
      id: 'thm-feature-api-development',
      statement: 'Desarrollé nuevas APIs y features en los códigos migrados de frontend y backend.',
      type: 'technical',
      tags: ['fullstack', 'api-development', 'feature-development', 'frontend', 'backend'],
      priority: 8,
    },

    {
      id: 'thm-api-performance',
      statement:
        'Me centré en mejorar la velocidad y eficiencia de las APIs, principalmente refactorizando consultas y código de MongoDB, con una mediana de ~34x en velocidad y casos excepcionales de ~77x.',
      type: 'achievement',
      tags: ['backend', 'performance', 'performance-optimisation', 'database', 'mongodb', 'api'],
      priority: 10,
      metrics: {
        medianPerformanceImprovement: '~34x',
        maximumPerformanceImprovement: '~77x',
      },
    },

    {
      id: 'thm-frontend-performance',
      statement:
        'Me centré en mejorar el rendimiento de React en páginas pesadas, usando técnicas de lazy loading, sistemas de caché y pre-renderizados para hacer el First Contentful Paint más rápido.',
      type: 'technical',
      tags: [
        'frontend',
        'react',
        'performance',
        'web-performance',
        'lazy-loading',
        'caching',
        'first-contentful-paint',
      ],
      priority: 9,
    },

    {
      id: 'thm-cross-squad-contribution',
      statement:
        'Trabajé y me especialicé en el squad B2B, pero gracias a mi conocimiento de todo el código, di soporte a otros squads que lo necesitaban, como los de Growth y B2C.',
      type: 'scope',
      tags: ['cross-team', 'cross-functional', 'b2b', 'b2c', 'growth', 'product-knowledge'],
      priority: 8,
    },

    {
      id: 'thm-careers-squad-leadership',
      statement: 'Di gran soporte técnico y lideré temporalmente el squad de Careers.',
      type: 'leadership',
      tags: ['technical-leadership', 'team-leadership', 'cross-team', 'delivery'],
      priority: 8,
    },

    {
      id: 'thm-soc-simulator',
      statement:
        'Contribuí a la entrega de una feature importante del SOC Simulator dentro del producto B2B, trabajando con recursos de cómputo on-demand de AWS, máquinas virtuales e ingenieros de Contenido (Cyber).',
      type: 'technical',
      tags: ['aws', 'cloud', 'virtual-machines', 'b2b', 'cybersecurity', 'cross-functional', 'product-development'],
      priority: 9,
    },

    {
      id: 'thm-cross-functional-collaboration',
      statement:
        'Mantuve un contacto cercano con diseñadores UX/UI, Product Managers, Customer Success y Ventas durante el desarrollo del producto.',
      type: 'scope',
      tags: ['cross-functional', 'product', 'design', 'customer-success', 'sales', 'stakeholder-management'],
      priority: 7,
    },

    {
      id: 'thm-b2b-prospects',
      statement: 'Tuve reuniones con prospectos y leads B2B potenciales, aportando contexto técnico y de producto.',
      type: 'business',
      tags: ['b2b', 'customer-facing', 'pre-sales', 'sales-engineering', 'technical-communication'],
      priority: 7,
    },

    {
      id: 'thm-product-ideation',
      statement:
        'Participé en Hackathons internos, Go To Market Weeks y sesiones de brainstorming con la dirección de la empresa, equipos de producto y otros stakeholders.',
      type: 'scope',
      tags: ['product-strategy', 'innovation', 'hackathons', 'go-to-market', 'stakeholder-collaboration'],
      priority: 6,
    },

    {
      id: 'thm-mentoring',
      statement:
        'Mentoricé y tutoricé a nuevos desarrolladores en los distintos squads en los que participé y di soporte.',
      type: 'leadership',
      tags: ['mentoring', 'technical-mentorship', 'developer-support', 'engineering-leadership'],
      priority: 8,
    },

    {
      id: 'thm-experimentation',
      statement:
        'Absorbí la fuerte mentalidad de A/B testing de la empresa y apliqué esas prácticas al desarrollo del producto.',
      type: 'scope',
      tags: ['ab-testing', 'experimentation', 'product-development', 'data-driven-development'],
      priority: 7,
    },

    {
      id: 'thm-b2c-to-b2b-experiment',
      statement: 'Trabajé en un flujo experimental para el crecimiento B2C-2B.',
      type: 'technical',
      tags: ['growth', 'b2c', 'b2b', 'experimentation', 'product-development'],
      priority: 6,
    },
  ],
  technologies: [
    'EJS',
    'Express.js',
    'TypeScript',
    'React 18',
    'MongoDB',
    'AWS',
    'Virtual Machines',
    'Linux',
    'GitHub Actions',
    'Docker',
    'Jest',
    'OpenAI',
  ],
};
