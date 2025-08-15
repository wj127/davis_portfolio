import HainokoLogo from '@public/company-logos/hainok-icono-fondo-oscuro-logo.png';
import THMLogo from '@public/company-logos/THM-logo.png';
import ProptexLogo from '@public/company-logos/proptex-logo.png';
import InAtlasLogo from '@public/company-logos/inatlas-based-on-location-logo.png';
import BCNUniLogo from '@public/company-logos/Universitat_de_Barcelona-logo.png';

export const TimeLineSections = [
  {
    year: 2024,
    subTitle: '(to the present)',
    colour: '#f0f0f0',
    id: 'year-2024',
    logo: HainokoLogo,
    gradientColor: '#495057',
  },
  {
    year: 2022,
    subTitle: '(to August 2024)',
    colour: '#f0f0f0',
    id: 'year-2022',
    logo: THMLogo,
    gradientColor: '#a3ea2a',
  },
  {
    year: 2021,
    subTitle: '(to April 2022)',
    colour: '#f0f0f0',
    id: 'year-2021',
    logo: ProptexLogo,
    gradientColor: '#F50AE6',
  },
  {
    year: 2016,
    subTitle: '(to September 2021)',
    colour: '#f0f0f0',
    id: 'year-2016',
    logo: InAtlasLogo,
    gradientColor: '#9d9d9d',
  },
  {
    year: 2013,
    subTitle: '(to June 2017)',
    colour: '#f0f0f0',
    id: 'year-2013',
    logo: BCNUniLogo,
    gradientColor: '#ffffff',
  },
] as const;

export const timelineYears = TimeLineSections.map(({ year }) => year).filter(Boolean);
