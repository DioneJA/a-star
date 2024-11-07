import enUs from './langs/enUs';
import ptBr from './langs/ptBr';

const messages = {
  enUs: enUs,
  ptBr: ptBr,
};

const Locales = {
  enUs: 'enUs',
  ptBr: 'ptBr',
};

const LocalesOptions = [
  {
    value: Locales.enUs,
    label: 'English',
    flag: 'usa',
  },
  {
    value: Locales.ptBr,
    label: 'Português',
    flag: 'br',
  },
];

export {
  messages,
  Locales,
  LocalesOptions,
};