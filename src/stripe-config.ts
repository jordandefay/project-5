export interface Product {
  id: string;
  name: string;
  description: string;
  priceId: string;
  mode: 'payment' | 'subscription';
}

export const products: Product[] = [
  // Session été products (one-time payment)
  {
    id: 'session-ete-quatro',
    name: 'Session été - Quatro',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0egAxIe6WFk2wtweEe22z',
    mode: 'payment'
  },
  {
    id: 'session-ete-trio',
    name: 'Session été - Trio',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0dyAxIe6WFk2wqSKTX2RK',
    mode: 'payment'
  },
  {
    id: 'session-ete-duo',
    name: 'Session été - Duo',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0cVAxIe6WFk2wFDtg3DRZ',
    mode: 'payment'
  },
  {
    id: 'session-ete-solo',
    name: 'Session été - Solo',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0bbAxIe6WFk2wHiTm8NoJ',
    mode: 'payment'
  },

  // Al Forqane products (subscription)
  {
    id: 'al-forqane-quatro',
    name: 'Al Forqane - Quatro',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0aRAxIe6WFk2wzsjbuxVY',
    mode: 'subscription'
  },
  {
    id: 'al-forqane-trio',
    name: 'Al Forqane - Trio',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0ZMAxIe6WFk2wmyV9w5At',
    mode: 'subscription'
  },
  {
    id: 'al-forqane-duo',
    name: 'Al Forqane - Duo',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0XFAxIe6WFk2wd1s8BueL',
    mode: 'subscription'
  },
  {
    id: 'al-forqane-solo',
    name: 'Al Forqane - Solo',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0VEAxIe6WFk2wkMpDj0IQ',
    mode: 'subscription'
  },

  // Kitab de Médine products (subscription)
  {
    id: 'kitab-medine-quatro',
    name: 'Kitab de Médine - Quatro',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0U4AxIe6WFk2wXAaRqgdU',
    mode: 'subscription'
  },
  {
    id: 'kitab-medine-trio',
    name: 'Kitab de Médine - Trio',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0TFAxIe6WFk2wS7sW7ESD',
    mode: 'subscription'
  },
  {
    id: 'kitab-medine-duo',
    name: 'Kitab de Médine - Duo',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0RmAxIe6WFk2wz3MtXN1X',
    mode: 'subscription'
  },
  {
    id: 'kitab-medine-solo',
    name: 'Kitab de Médine - Solo',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0QuAxIe6WFk2wM1g4RELg',
    mode: 'subscription'
  },

  // Alphabétisation products (subscription)
  {
    id: 'alphabetisation-quatro',
    name: 'Alphabétisation - Quatro',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0PnAxIe6WFk2wE0C2BRMU',
    mode: 'subscription'
  },
  {
    id: 'alphabetisation-trio',
    name: 'Alphabétisation - Trio',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0OnAxIe6WFk2wyO6aAfIf',
    mode: 'subscription'
  },
  {
    id: 'alphabetisation-duo',
    name: 'Alphabétisation - Duo',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1Rf0NQAxIe6WFk2wg0YaL66w',
    mode: 'subscription'
  },
  {
    id: 'alphabetisation-solo',
    name: 'Alphabétisation - Solo',
    description: 'Session de 1 mois (5 semaines) - 10 heures en classe virtuelle (2h/semaine)',
    priceId: 'price_1RexhqAxIe6WFk2wc4kv8Uqc',
    mode: 'subscription'
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(product => product.priceId === priceId);
}