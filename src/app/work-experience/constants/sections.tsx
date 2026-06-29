import HainokoLogo from '@public/company-logos/hainok-icono-fondo-oscuro-logo.png';
import THMLogo from '@public/company-logos/thmlogo-gray_scale.png';
import ProptexLogo from '@public/company-logos/proptex-logo.png';
import InAtlasLogo from '@public/company-logos/inatlas-based-on-location-logo.png';
import BCNUniLogo from '@public/company-logos/universitat_de_barcelona-logo.png';
import { CompanyKey } from '@/app/work-experience/types';

type TimelineSection = {
  year: number;
  colour: string;
  id: string;
  logo: typeof HainokoLogo;
  gradientColor: string;
  companyKey: CompanyKey;
};

export const TimeLineSections: readonly TimelineSection[] = [
  {
    year: 2024,
    colour: '#f0f0f0',
    id: 'year-2024',
    logo: HainokoLogo,
    gradientColor: '#18282f',
    companyKey: 'hainok',
  },
  {
    year: 2022,
    colour: '#f8f8fb',
    id: 'year-2022',
    logo: THMLogo,
    gradientColor: '#232c40',
    companyKey: 'thm',
  },
  {
    year: 2021,
    colour: '#2f364f',
    id: 'year-2021',
    logo: ProptexLogo,
    gradientColor: '#fdfdfd',
    companyKey: 'proptex',
  },
  {
    year: 2016,
    colour: '#02203d',
    id: 'year-2016',
    logo: InAtlasLogo,
    gradientColor: '#9d9d9d',
    companyKey: 'inatlas',
  },
  {
    year: 2013,
    colour: '#080a09',
    id: 'year-2013',
    logo: BCNUniLogo,
    gradientColor: '#ffffff',
    companyKey: 'ub',
  },
];

export const timelineYears = TimeLineSections.map(({ year }) => year).filter(Boolean);
