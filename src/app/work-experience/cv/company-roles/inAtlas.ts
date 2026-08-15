import { type ResumeRole } from '@/app/work-experience/cv/cv.types';

export const inAtlasEN: ResumeRole = {
  company: 'inAtlas (Intelligent Atlas)',
  location: 'Barcelona, Spain',
  startDate: '2016-10',
  endDate: '2021-09',
  current: false,
  displayTitle: 'Data Miner & Junior Full Stack Developer',

  titles: [
    {
      title: 'Data Miner',
      startDate: '2016-10',
      endDate: '2021-09',
    },
    {
      title: 'Junior Full Stack Developer',
      startDate: '2019-05',
      endDate: '2021-09',
    },
  ],

  facts: [
    {
      id: 'inatlas-crawler-network',
      statement:
        'Created and maintained the crawler network used to acquire data from numerous online platforms in Spain, including Airbnb, Booking and TripAdvisor.',
      type: 'technical',

      tags: [
        'web-crawling',
        'web-scraping',
        'data-acquisition',
        'distributed-crawling',
        'automation',
        'data-engineering',
      ],

      priority: 10,
    },

    {
      id: 'inatlas-api-data-acquisition',
      statement: 'Acquired data primarily through platform internal APIs and, in specific cases, web services.',
      type: 'technical',

      tags: ['api-integration', 'web-crawling', 'data-acquisition', 'reverse-engineering', 'data-engineering'],

      priority: 9,
    },

    {
      id: 'inatlas-data-processing',
      statement:
        'Managed post-acquisition data processing workflows including cleaning, normalisation and analysis to prepare collected data for consumption.',
      type: 'technical',

      tags: ['data-processing', 'data-cleaning', 'data-normalisation', 'data-pipelines', 'data-engineering'],

      priority: 9,
    },

    {
      id: 'inatlas-backend-services',
      statement:
        'Built backend services that allowed other teams and applications within the company to consume and interact with collected data.',
      type: 'technical',

      tags: ['backend', 'api-development', 'data-services', 'system-integration', 'internal-platform'],

      priority: 10,
    },

    {
      id: 'inatlas-angular-refactoring',
      statement:
        'Refactored small- to medium-complexity components in an Angular 8 application while transitioning into frontend development.',
      type: 'technical',

      tags: ['frontend', 'angular', 'refactoring', 'legacy-modernisation'],

      priority: 6,
    },

    {
      id: 'inatlas-frontend-features',
      statement:
        'Developed new frontend features and application logic under the guidance of a senior full-stack engineer.',
      type: 'technical',

      tags: ['frontend', 'feature-development', 'fullstack', 'software-development'],

      priority: 6,
    },

    {
      id: 'inatlas-design-collaboration',
      statement: 'Worked directly with a UX/UI designer during frontend feature development.',
      type: 'scope',

      tags: ['cross-functional', 'ux', 'ui', 'design-collaboration', 'frontend'],

      priority: 4,
    },

    {
      id: 'inatlas-agile',
      statement: 'Worked within an Agile software-development environment.',
      type: 'scope',

      tags: ['agile', 'engineering-process', 'software-development'],

      priority: 3,
    },
  ],

  technologies: [
    'Angular 8',
    'TypeScript',
    'JavaScript',
    'GitHub',
    'Scrapy',
    'Selenium',
    'BeautifulSoup',
    'Python',
    'Snowflake',
    'Docker',
    'AWS',
    'PostgreSQL',
    'MySQL',
    'Puppeteer',
    'Node.js',
    'Flask',
  ],
};

export const inAtlasES: ResumeRole = {
  company: 'inAtlas (Intelligent Atlas)',
  location: 'Barcelona, España',
  startDate: '2016-10',
  endDate: '2021-09',
  current: false,
  displayTitle: 'Data Miner y desarrollador full stack junior',

  titles: [
    {
      title: 'Data Miner',
      startDate: '2016-10',
      endDate: '2021-09',
    },
    {
      title: 'Desarrollador full stack junior',
      startDate: '2019-05',
      endDate: '2021-09',
    },
  ],

  facts: [
    {
      id: 'inatlas-crawler-network',
      statement:
        'Creé y mantuve toda la red de crawlers para obtener datos en profundidad de numerosas plataformas en España (como Airbnb, Booking, TripAdvisor… y muchas más).',
      type: 'technical',

      tags: [
        'web-crawling',
        'web-scraping',
        'data-acquisition',
        'distributed-crawling',
        'automation',
        'data-engineering',
      ],

      priority: 10,
    },

    {
      id: 'inatlas-api-data-acquisition',
      statement:
        'Obtuve datos principalmente desde sus APIs internas y, en algunos casos específicos y pequeños, desde servicios web.',
      type: 'technical',

      tags: ['api-integration', 'web-crawling', 'data-acquisition', 'reverse-engineering', 'data-engineering'],

      priority: 9,
    },

    {
      id: 'inatlas-data-processing',
      statement:
        'Gestioné los procesos posteriores al crawling, como la limpieza, normalización y análisis de los datos, dejándolos listos para ser consumidos.',
      type: 'technical',

      tags: ['data-processing', 'data-cleaning', 'data-normalisation', 'data-pipelines', 'data-engineering'],

      priority: 9,
    },

    {
      id: 'inatlas-backend-services',
      statement:
        'Construí servicios de Backend para que los demás equipos de la empresa consumieran e interactuaran con los datos.',
      type: 'technical',

      tags: ['backend', 'api-development', 'data-services', 'system-integration', 'internal-platform'],

      priority: 10,
    },

    {
      id: 'inatlas-angular-refactoring',
      statement:
        'Refactoricé componentes de complejidad pequeña a media en nuestra aplicación Angular 8 mientras transitaba hacia el desarrollo frontend.',
      type: 'technical',

      tags: ['frontend', 'angular', 'refactoring', 'legacy-modernisation'],

      priority: 6,
    },

    {
      id: 'inatlas-frontend-features',
      statement: 'Desarrollé nuevas features y lógica, tutorizado por mi desarrollador full stack senior asignado.',
      type: 'technical',

      tags: ['frontend', 'feature-development', 'fullstack', 'software-development'],

      priority: 6,
    },

    {
      id: 'inatlas-design-collaboration',
      statement: 'Empecé a trabajar codo a codo con un diseñador UX/UI durante el desarrollo de features frontend.',
      type: 'scope',

      tags: ['cross-functional', 'ux', 'ui', 'design-collaboration', 'frontend'],

      priority: 4,
    },

    {
      id: 'inatlas-agile',
      statement: 'Trabajé en un entorno Agile de desarrollo de software.',
      type: 'scope',

      tags: ['agile', 'engineering-process', 'software-development'],

      priority: 3,
    },
  ],

  technologies: [
    'Angular 8',
    'TypeScript',
    'JavaScript',
    'GitHub',
    'Scrapy',
    'Selenium',
    'BeautifulSoup',
    'Python',
    'Snowflake',
    'Docker',
    'AWS',
    'PostgreSQL',
    'MySQL',
    'Puppeteer',
    'Node.js',
    'Flask',
  ],
};
