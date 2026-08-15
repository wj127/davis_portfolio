import { ResumeEducation } from '@/app/work-experience/cv/cv.types';

export const universityOfBarcelonaEN: ResumeEducation = {
  institution: 'University of Barcelona (UB)',
  location: 'Barcelona, Spain',
  degree: "Bachelor's Degree in Computer Engineering",
  field: 'Computer Science',
  startDate: '2013-08',
  endDate: '2017-06',

  facts: [
    {
      id: 'ub-computer-science-foundations',

      statement:
        'Completed undergraduate studies covering areas including mathematics, physics, operating systems, software engineering and artificial intelligence.',

      tags: ['computer-science', 'software-engineering', 'operating-systems', 'artificial-intelligence', 'mathematics'],

      priority: 5,

      domains: ['Computer Science', 'Software Engineering'],
    },

    {
      id: 'ub-bachelor-thesis',

      statement:
        "Completed a bachelor's thesis developing a web application that attempted to forecast Bitcoin prices using machine-learning models available at the time.",

      tags: ['machine-learning', 'artificial-intelligence', 'web-development', 'data-analysis', 'bachelor-thesis'],

      priority: 7,

      domains: ['Machine Learning', 'Artificial Intelligence', 'Web Development'],
    },

    {
      id: 'ub-bachelor-thesis-grade',

      statement: "Received an outstanding grade for the bachelor's thesis.",

      tags: ['bachelor-thesis', 'academic-achievement'],

      priority: 5,
    },

    {
      id: 'ub-early-professional-experience',

      statement:
        'Started working part-time in software-related professional work during the final year of university, transitioning into the first full-time role after graduation.',

      tags: ['professional-experience', 'software-engineering', 'early-career'],

      priority: 3,
    },
  ],
};

export const universityOfBarcelonaES: ResumeEducation = {
  institution: 'Universidad de Barcelona (UB)',
  location: 'Barcelona, España',
  degree: 'Grado en Informática',
  field: 'Informática',
  startDate: '2013-08',
  endDate: '2017-06',

  facts: [
    {
      id: 'ub-computer-science-foundations',

      statement:
        'Cursé estudios de grado en una variedad de asignaturas que iban desde matemáticas hasta física, de Sistemas Operativos a Visión/Inteligencia Artificial, etc.',

      tags: ['computer-science', 'software-engineering', 'operating-systems', 'artificial-intelligence', 'mathematics'],

      priority: 5,

      domains: ['Informática', 'Ingeniería de software'],
    },

    {
      id: 'ub-bachelor-thesis',

      statement:
        'Completé un trabajo de fin de grado desarrollando una web que intentaba predecir el precio del Bitcoin usando los modelos de machine learning disponibles en aquel momento (2015).',

      tags: ['machine-learning', 'artificial-intelligence', 'web-development', 'data-analysis', 'bachelor-thesis'],

      priority: 7,

      domains: ['Aprendizaje automático', 'Inteligencia artificial', 'Desarrollo web'],
    },

    {
      id: 'ub-bachelor-thesis-grade',

      statement: 'Obtuve una calificación de "excelente" en el trabajo de fin de grado.',

      tags: ['bachelor-thesis', 'academic-achievement'],

      priority: 5,
    },

    {
      id: 'ub-early-professional-experience',

      statement:
        'Comencé mi trayectoria profesional trabajando a media jornada para una empresa durante mi 4º y último año de carrera, en lo que más tarde se convertiría en mi primer trabajo a tiempo completo.',

      tags: ['professional-experience', 'software-engineering', 'early-career'],

      priority: 3,
    },
  ],
};
