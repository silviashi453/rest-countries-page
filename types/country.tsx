// types/country.ts
export type Country = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: { official: string };
    };
  };
  flags: { svg: string };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies?: { [key: string]: { name: string } };
  languages?: { [key: string]: string };
  borders?: string[];
};
