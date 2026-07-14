import { Recipe } from './types';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Hyderabadi Dum Biryani',
    description: 'A timeless Nizami classic. Premium long-grain basmati rice layered with tender meat, infused with saffron, fresh mint, and traditional hand-ground spices, slow-cooked in small brass pots under charcoal embers.',
    image: '/assets/hyderabadi_biryani.png',
    time: '40 Min',
    difficulty: 'Pro',
    author: 'Chef Fatima Begum',
    category: 'Biryani',
    servings: 2,
    calories: 750,
    tags: ['Signature', 'Spicy', 'Nizami'],
    ingredients: [
      { item: 'Basmati Rice', amount: '500', unit: 'g' },
      { item: 'Marinated Mutton/Chicken', amount: '500', unit: 'g' },
      { item: 'Saffron Strands', amount: '1', unit: 'pinch' },
      { item: 'Fried Onions', amount: '1', unit: 'cup' },
      { item: 'Fresh Mint & Coriander', amount: '1', unit: 'bunch' }
    ],
    instructions: [
      { step: 1, text: 'Marinate the meat in yogurt, ginger-garlic paste, and traditional spices for 4 hours.' },
      { step: 2, text: 'Parboil basmati rice with whole spices until 70% cooked.' },
      { step: 3, text: 'Layer the meat and rice in a pot, add saffron milk, seal the lid with dough, and slow-cook (Dum) for 35 minutes.' }
    ]
  },
  {
    id: '2',
    title: 'Dal Makhani with Naan',
    description: 'A rich, creamy Punjabi staple. Whole black lentils and red kidney beans simmered slowly overnight on traditional tandoor embers, finished with farm-fresh butter and cream.',
    image: '/assets/dal_makhani.png',
    time: '30 Min',
    difficulty: 'Intermediate',
    author: 'Chef Rajesh Sharma',
    category: 'North Indian',
    servings: 2,
    calories: 600,
    tags: ['Comfort Food', 'Vegetarian', 'Creamy'],
    ingredients: [
      { item: 'Black Lentils (Urad Dal)', amount: '200', unit: 'g' },
      { item: 'Kidney Beans (Rajma)', amount: '50', unit: 'g' },
      { item: 'Fresh Cream', amount: '4', unit: 'tbsp' },
      { item: 'Butter', amount: '50', unit: 'g' },
      { item: 'Tomato Puree & Spices', amount: '1', unit: 'cup' }
    ],
    instructions: [
      { step: 1, text: 'Soak lentils and beans overnight, then pressure cook until completely soft.' },
      { step: 2, text: 'Simmer on low heat with tomato puree, ginger, and garlic for at least 2 hours.' },
      { step: 3, text: 'Mash the lentils slightly, stir in fresh butter and cream, and serve hot with clay-tandoor naan.' }
    ]
  },
  {
    id: '3',
    title: 'Chettinad Chicken Curry',
    description: 'An authentic fiery delight from Tamil Nadu. Tender chicken simmered in a freshly roasted paste of coconut, black pepper, poppy seeds, and traditional Chettinad spices cooked in an earthenware clay pot.',
    image: '/assets/chettinad_chicken.png',
    time: '35 Min',
    difficulty: 'Intermediate',
    author: 'Chef Selvan Kumar',
    category: 'South Indian',
    servings: 2,
    calories: 480,
    tags: ['Spicy', 'Earthenware', 'Authentic'],
    ingredients: [
      { item: 'Chicken pieces', amount: '500', unit: 'g' },
      { item: 'Freshly grated coconut', amount: '1/2', unit: 'cup' },
      { item: 'Black Peppercorns & Fennel', amount: '2', unit: 'tbsp' },
      { item: 'Shallots (Sambar Onions)', amount: '1', unit: 'cup' },
      { item: 'Curry Leaves & Sesame Oil', amount: '3', unit: 'sprigs' }
    ],
    instructions: [
      { step: 1, text: 'Dry roast the coconut, peppercorns, fennel seeds, and red chilies, then grind into a fine paste.' },
      { step: 2, text: 'Heat sesame oil in a clay pot, sauté shallots and curry leaves until golden.' },
      { step: 3, text: 'Add chicken, spice paste, water, and simmer on low heat until the chicken is tender and oil separates.' }
    ]
  }
];
