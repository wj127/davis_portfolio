import HainokoLogo from '@public/company-logos/hainok-icono-fondo-oscuro-logo.png';
import THMLogo from '@public/company-logos/THM-logo.png';
import ProptexLogo from '@public/company-logos/proptex-logo.png';
import InAtlasLogo from '@public/company-logos/inatlas-based-on-location-logo.png';
import BCNUniLogo from '@public/company-logos/Universitat_de_Barcelona-logo.png';

export const TimeLineSections = [
  {
    year: 2024,
    colour: '#f0f0f0',
    id: 'year-2024',
    logo: HainokoLogo,
  },
  {
    year: 2022,
    colour: '#f0f0f0',
    id: 'year-2022',
    logo: THMLogo,
  },
  {
    year: 2021,
    colour: '#f0f0f0',
    id: 'year-2021',
    logo: ProptexLogo,
  },
  {
    year: 2016,
    colour: '#f0f0f0',
    id: 'year-2016',
    logo: InAtlasLogo,
  },
  {
    year: 2013,
    colour: '#f0f0f0',
    id: 'year-2013',
    logo: BCNUniLogo,
  },
] as const;

export const timelineYears = TimeLineSections.map(({ year }) => year).filter(Boolean);
