/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, DiningZoneInfo } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Wild Mushroom & Truffle Risotto',
    description: 'Arborio rice, aged 36-month parmesan, freshly shaved winter black truffles.',
    category: 'signature',
    price: 45,
    isSignature: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR4DWIpsa5Qu1VJU-SjtXBH0fQtY3eX3Bs-TgykvFZeE_pzs2ZnklfRxlcIjrwtg9W5YOBfG6M8PQaELMBgcoXFPRpozx6V8pS8X898HVjIsGkyZdvl8TtFqT8LBsCB2gguY-LN5iPk7McRdLDGet9DUcHwLqzH3BWeyEm1V7zrhv2Tsy6-rxuDCtnDvnExBBf1rlIGaruw0Fk_s6caxezrZIfxoSMCE8l6X1vUEelMEI__EJ7ypbGsutEE4zGGXAWbEThLSD_WREV',
    winePairing: 'Barolo DOCG, Piedmont Classic 2018',
    ingredients: ['Arborio Rice', '36-month Parmesan', 'Winter Truffles', 'Echiré Butter', 'White Wine Essence']
  },
  {
    id: 'm2',
    name: 'A5 Wagyu Striploin',
    description: 'Perfectly seared Japanese Kagoshima A5 Wagyu, black garlic puree, charred pearl onion, dark bone-marrow demi-glace.',
    category: 'signature',
    price: 95,
    isSignature: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtriw_MkWbv8ELO5Do_U4XTAlG1Scw2U_z7HQ0h5rKEMK4a_Tg2uNEKIzkkd50Xd_gkmAnFb53bw9xen_E17YJgKmNWKe2_85_yT-Kijc-Bqf2GDsFIa9tH3FoY7ZW5bi4jWaI59sTMftT3HfTj9nk7TGdt8KoGc8Vh1CC6AQ1g7ds-uWag4fPnTS0suLj0-WWC36LuT_c5xCh_Wes3K9c5nvwT8X8PO4B3CIAD-S1AEXB-i4Z-0nXNwhEUvnCENtwuB2_Zj9goDl7',
    winePairing: 'Cabernet Sauvignon, Napa Valley Estate 2015',
    ingredients: ['Kagoshima A5 Wagyu', 'Black Garlic', 'Pearl Onion', 'Marrow Demi-glace', 'Maldon Fleur de Sel']
  },
  {
    id: 'm3',
    name: 'Dark Cocoa Sphere',
    description: 'Valrhona 70% Guanaja, raspberry coulis, gold dust, textured cocoa nib crumble.',
    category: 'signature',
    price: 24,
    isSignature: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLQAX3Z528CxCKutqZHd7o3lqSp4---LU0zUqSR-S-wp9wQiNrNC5A_1lVvZP17Ny6RcZS72ON36z23gs_zB1XngzZl-BTLwtXvK9hzWhQkKElPzMYfN1NacoJ0_kypdZMKcdiYr9W6wMKbJ5HakLt9AuMJWmG91nZJLES8c0Cbpz2UsNGRGYEmz9aEsNguQe5fQWsxcnRz-S78ZE92ZM_CEQjM2rfR8Lq0Tmns4BKOgfG5k0ewWE7tZ26dgcy145oaTrRkUR79MNN',
    winePairing: 'Tawny Port 20 Year, Douro Valley',
    ingredients: ['Valrhona Guanaja 70%', 'Fresh Raspberries', '24k Gold Leaf', 'Madagascar Bourbon Vanilla']
  },
  {
    id: 'm4',
    name: 'Spring Awakening Asparagus',
    description: 'Vibrant local asparagus, wild ramps, sweet english peas, wild sorrel, champagne vinaigrette.',
    category: 'appetizer',
    price: 28,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFcg1dmdglWKfkdi20y-Ibp1o0kKTJK6BSDInhq20UBDIAANDzvDpzdSQUBXG9VKfhJDhi2HMUNs09azhz7G9W7VeEEKQ007ewPlpsvVKMKPeBvdXjvCFP2Sc26RdbF6m9bXGptef1xnDaaZObRZWPdMTS3kxlEiyXElGa88byAN9mJLwOsj2XD7h9_juURphGUEseM5RBlXggHnDJacKYmo3DIL3eIfd7ObdN6Tgj7pHfpcU8ALajPHkLjAYWp5bzFxwoQhvpEwAU',
    winePairing: 'Sauvignon Blanc, Sancerre Heritage 2021',
    ingredients: ['Local Asparagus', 'Foraged Ramps', 'English Peas', 'Wild Sorrel', 'Champagne Vinaigrette']
  },
  {
    id: 'm5',
    name: 'Atlantic Seared Diver Scallops',
    description: 'Glazed scallops, saffron foam emulsification, micro fennel salad, citrus blood-orange reduction.',
    category: 'appetizer',
    price: 36,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsq5UI82mEDBCk7NvYcRw_p3D4R_SPCw9l7VQprNTscnQrYWWq7NFRrOPZDGIcxgRwPMV1wbVnYhQB1OtvgnZkZD5SuxUMW7gbjulHjqDuxrUKzDGDA8xVLv0qFoX5by6674AZrzfZ-JEb1vaMB9zZ8IzYorY7wKrWT21G_pGB7gyL7JklAi2_Xn6Pn54d9nJpJjIZvlJHcZzqSiSghQ1qMWpKOTk9xd9tW-gYFxjxM2tUwF6-ntNkpCq980uIUztMRZAQj3Kc3so',
    winePairing: 'Chardonnay, Grand Cru Burgundy 2019',
    ingredients: ['Diver Scallops', 'Saffron', 'Micro Fennel', 'Blood Orange', 'Fleur de Sel']
  },
  {
    id: 'm6',
    name: 'Glazed Heirloom Beet Salad',
    description: 'Slow-roasted multi-color beets, artisanal goat cheese whip, toasted pistachio praline, microgreens.',
    category: 'appetizer',
    price: 22,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFcg1dmdglWKfkdi20y-Ibp1o0kKTJK6BSDInhq20UBDIAANDzvDpzdSQUBXG9VKfhJDhi2HMUNs09azhz7G9W7VeEEKQ007ewPlpsvVKMKPeBvdXjvCFP2Sc26RdbF6m9bXGptef1xnDaaZObRZWPdMTS3kxlEiyXElGa88byAN9mJLwOsj2XD7h9_juURphGUEseM5RBlXggHnDJacKYmo3DIL3eIfd7ObdN6Tgj7pHfpcU8ALajPHkLjAYWp5bzFxwoQhvpEwAU',
    winePairing: 'Rosé Provence, Grenache Blend 2022',
    ingredients: ['Heirloom Beets', 'Goat Cheese', 'Pistachios', 'Micro Herbs', 'Aged Balsamic']
  },
  {
    id: 'm7',
    name: 'Black Cod Glacier',
    description: 'Slow-poached glacier cod, white miso dashi broth, baby bok choy, toasted sesame charcoal oil.',
    category: 'main',
    price: 54,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzjkuwHwmlfJFRUHaY2UMXq3xD64hEmzfHPnhlZvDtzWnDbRA9yl_nIPwYSdgQLUCtvLRXhLjF4TeH0-DwS9wIoczuRJwFi9NYCVW9-Nb0M108HakULAPfql2LFGJQEzDUN2aGdr-DpmW-n462hc6UY5OA-K_MzMqUpXmXuD1kZvAuKzeYXavtRKTpA5-ApOUtHrlck01UTVzR-EIvbLzGQD3Tgu2GgAmkSsjrCi1UwD8PAiP9YvJP3UblDOsK3Cgx1-Yul9jlPSsV',
    winePairing: 'Riesling Grand Cru, Alsace 2017',
    ingredients: ['Black Cod', 'Miso Dashi', 'Bok Choy', 'Sesame Charcoal', 'Ginger Root']
  },
  {
    id: 'm8',
    name: 'Herb-encrusted Lamb Cannon',
    description: 'Pistachio and herb crust, sweet parsnip puree, wild huckleberry jus, roasted brassica blooms.',
    category: 'main',
    price: 58,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzjkuwHwmlfJFRUHaY2UMXq3xD64hEmzfHPnhlZvDtzWnDbRA9yl_nIPwYSdgQLUCtvLRXhLjF4TeH0-DwS9wIoczuRJwFi9NYCVW9-Nb0M108HakULAPfql2LFGJQEzDUN2aGdr-DpmW-n462hc6UY5OA-K_MzMqUpXmXuD1kZvAuKzeYXavtRKTpA5-ApOUtHrlck01UTVzR-EIvbLzGQD3Tgu2GgAmkSsjrCi1UwD8PAiP9YvJP3UblDOsK3Cgx1-Yul9jlPSsV',
    winePairing: 'Syrah, Northern Rhône Valley 2016',
    ingredients: ['Lamb Loin', 'Pistachio Crumble', 'Parsnip', 'Wild Huckleberries', 'Garden Herbs']
  },
  {
    id: 'm9',
    name: 'Duo of Caviar & Oysters',
    description: 'Six chilled Kumamoto oysters, Imperial Osetra caviar, frozen champagne split mignonette.',
    category: 'signature',
    price: 80,
    isSignature: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR4DWIpsa5Qu1VJU-SjtXBH0fQtY3eX3Bs-TgykvFZeE_pzs2ZnklfRxlcIjrwtg9W5YOBfG6M8PQaELMBgcoXFPRpozx6V8pS8X898HVjIsGkyZdvl8TtFqT8LBsCB2gguY-LN5iPk7McRdLDGet9DUcHwLqzH3BWeyEm1V7zrhv2Tsy6-rxuDCtnDvnExBBf1rlIGaruw0Fk_s6caxezrZIfxoSMCE8l6X1vUEelMEI__EJ7ypbGsutEE4zGGXAWbEThLSD_WREV',
    winePairing: 'Champagne Brut, Dom Pérignon vintage',
    ingredients: ['Kumamoto Oysters', 'Imperial Osetra Caviar', 'Champagne', 'Chives']
  }
];

export const DINING_ZONES: DiningZoneInfo[] = [
  {
    id: 'main-hall',
    name: 'Grand Symphony Hall',
    description: 'Uncompromising grand dining space framed by towering dark accents, low-level warm luxury lighting, and ambient strings.',
    capacityText: 'Tables for 2 to 8 guests',
    depositText: '$50 per guest (applied to final bill)',
    ambiance: 'Immersive, luxurious acoustics with table proximity overlooking our curated wine cabinets.'
  },
  {
    id: 'glasshouse-garden',
    name: 'The Glasshouse Garden',
    description: 'A magical canopy dining structure surrounded by evergreen seasonal microgreens and cascading glowing lights.',
    capacityText: 'Tables for 2 to 4 guests',
    depositText: '$75 per guest (premium reservation)',
    ambiance: 'Romantic, high-ceiling airy conservatory with comfortable leather banquettes.'
  },
  {
    id: 'chefs-vault',
    name: "Chef Antoine's Reserve Vault",
    description: 'An exclusive, soundproof private chamber adjacent to our live hearth, featuring personal chef menu-curation.',
    capacityText: 'Single booking daily, 4 to 12 guests',
    depositText: '$150 per guest (bespoke menu minimum)',
    ambiance: 'Intimate, stone & cedar vault structure with dedicated sommelier sequence.'
  }
];

export const TIME_SLOTS = [
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30'
];
