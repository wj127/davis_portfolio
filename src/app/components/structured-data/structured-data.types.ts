type SchemaOrgBase = {
  '@context': 'https://schema.org';
};

export type PersonSchema = SchemaOrgBase & {
  '@type': 'Person';
  name: string;
  alternateName: string[];
  jobTitle: string;
  url: string;
  email: string;
  image: string;
  sameAs: string[];
  knowsLanguage: string[];
};

export type WebSiteSchema = SchemaOrgBase & {
  '@type': 'WebSite';
  name: string;
  url: string;
  inLanguage: string[];
  author: {
    '@type': 'Person';
    name: string;
  };
};
