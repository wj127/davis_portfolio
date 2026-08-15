import { type ResumeRole } from '@/app/work-experience/cv/cv.types';

export const proptexEN: ResumeRole = {
  company: 'Proptex',
  location: 'Barcelona, Spain',
  startDate: '2021-11',
  endDate: '2022-04',
  current: false,
  displayTitle: 'Full Stack Developer',

  titles: [
    {
      title: 'Full Stack Developer',
      startDate: '2021-11',
      endDate: '2022-04',
    },
  ],

  facts: [
    {
      id: 'proptex-api-development',
      statement: 'Built and maintained backend API services.',
      type: 'technical',
      tags: ['backend', 'api-development', 'api-maintenance', 'software-development'],
      priority: 8,
    },

    {
      id: 'proptex-microservices-kubernetes',
      statement: 'Built new microservices and worked with their networking and deployment environment in Kubernetes.',
      type: 'technical',
      tags: ['backend', 'microservices', 'kubernetes', 'infrastructure', 'distributed-systems'],
      priority: 9,
    },

    {
      id: 'proptex-tdd-ddd',
      statement: 'Applied Test-Driven Development and Domain-Driven Design practices during software development.',
      type: 'technical',
      tags: ['tdd', 'ddd', 'testing', 'software-design', 'engineering-practices', 'code-quality'],
      priority: 7,
    },

    {
      id: 'proptex-frontend-development',
      statement: 'Developed frontend application logic using Angular 13 and Pug.',
      type: 'technical',
      tags: ['frontend', 'angular', 'feature-development'],
      priority: 7,
    },

    {
      id: 'proptex-senior-collaboration',
      statement:
        'Worked closely with the CTO and supported the senior frontend engineer on technical implementation and engineering decisions.',
      type: 'scope',
      tags: ['collaboration', 'technical-guidance', 'frontend', 'engineering'],
      priority: 5,
    },
  ],
  technologies: ['Angular 13', 'Pug', 'Kubernetes', 'TDD', 'NestJS', 'PostgreSQL', 'MikroORM'],
};

export const proptexES: ResumeRole = {
  company: 'Proptex',
  location: 'Barcelona, España',
  startDate: '2021-11',
  endDate: '2022-04',
  current: false,
  displayTitle: 'Desarrollador full stack',

  titles: [
    {
      title: 'Desarrollador full stack',
      startDate: '2021-11',
      endDate: '2022-04',
    },
  ],

  facts: [
    {
      id: 'proptex-api-development',
      statement: 'Construí y mantuve servicios de API.',
      type: 'technical',
      tags: ['backend', 'api-development', 'api-maintenance', 'software-development'],
      priority: 8,
    },

    {
      id: 'proptex-microservices-kubernetes',
      statement: 'Construí nuevos microservicios y controlé la red en Kubernetes.',
      type: 'technical',
      tags: ['backend', 'microservices', 'kubernetes', 'infrastructure', 'distributed-systems'],
      priority: 9,
    },

    {
      id: 'proptex-tdd-ddd',
      statement: 'Empecé a aplicar TDD (Test Driven Development) respaldado por DDD (Domain Driven Design).',
      type: 'technical',
      tags: ['tdd', 'ddd', 'testing', 'software-design', 'engineering-practices', 'code-quality'],
      priority: 7,
    },

    {
      id: 'proptex-frontend-development',
      statement: 'Desarrollé y diseñé la lógica del frontend con Angular 13 y Pug.',
      type: 'technical',
      tags: ['frontend', 'angular', 'feature-development'],
      priority: 7,
    },

    {
      id: 'proptex-senior-collaboration',
      statement:
        'Trabajé codo a codo con el CTO y di soporte al desarrollador front-end senior en la implementación técnica y las decisiones de ingeniería.',
      type: 'scope',
      tags: ['collaboration', 'technical-guidance', 'frontend', 'engineering'],
      priority: 5,
    },
  ],
  technologies: ['Angular 13', 'Pug', 'Kubernetes', 'TDD', 'NestJS', 'PostgreSQL', 'MikroORM'],
};
