import { Recipe } from './types';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Signature Smoked Ribeye',
    description: 'A masterclass in heat control and dry-rub balance. Seared over cast iron and finished with rosemary-infused wagyu fat.',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800',
    time: '45 Min',
    difficulty: 'Pro',
    author: 'Chef Marcus',
    category: 'Gourmet',
    servings: 2,
    calories: 850,
    tags: ['High Protein', 'Gluten Free', 'Dinner'],
    ingredients: [
      { item: 'Dry-aged Ribeye', amount: '24', unit: 'oz' },
      { item: 'Unsalted Butter', amount: '4', unit: 'tbsp' },
      { item: 'Fresh Rosemary', amount: '3', unit: 'sprigs' },
      { item: 'Garlic Cloves', amount: '4', unit: 'crushed' }
    ],
    instructions: [
      { step: 1, text: 'Temper the steak at room temperature for 45 minutes before cooking.' },
      { step: 2, text: 'Season aggressively with kosher salt and cracked black pepper.' },
      { step: 3, text: 'Sear in a ripping hot cast iron skillet until a deep crust forms.' }
    ]
  },
  {
    id: '2',
    title: 'Midnight Pasta Carbonara',
    description: 'The ultimate comfort dish for late nights. Real guanciale, pecorino romano, and farm-fresh egg yolks only.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800',
    time: '20 Min',
    difficulty: 'Intermediate',
    author: 'Elena Rossi',
    category: 'Italian',
    servings: 1,
    calories: 620,
    tags: ['Quick', 'Classic', 'Late Night'],
    ingredients: [
      { item: 'Spaghetti', amount: '100', unit: 'g' },
      { item: 'Guanciale', amount: '50', unit: 'g' },
      { item: 'Egg Yolks', amount: '3', unit: 'pcs' },
      { item: 'Pecorino Romano', amount: '30', unit: 'g' }
    ],
    instructions: [
      { step: 1, text: 'Boil pasta in salted water until al dente.' },
      { step: 2, text: 'Render guanciale until crispy in a cold pan over medium heat.' },
      { step: 3, text: 'Whisk yolks and cheese, combine with pasta and a splash of pasta water off-heat.' }
    ]
  },
  {
    id: '3',
    title: 'Charred Miso Salmon',
    description: 'Umami-packed glaze with a perfectly crisp skin. Served over a bed of jasmine rice and sesame-seared bok choy.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    time: '25 Min',
    difficulty: 'Easy',
    author: 'Yuki Tanaka',
    category: 'Japanese',
    servings: 2,
    calories: 420,
    tags: ['Healthy', 'Pescatarian', 'Umami'],
    ingredients: [
      { item: 'Salmon Fillets', amount: '2', unit: 'pcs' },
      { item: 'White Miso', amount: '2', unit: 'tbsp' },
      { item: 'Mirin', amount: '1', unit: 'tbsp' },
      { item: 'Ginger', amount: '1', unit: 'tsp' }
    ],
    instructions: [
      { step: 1, text: 'Whisk miso, mirin, and ginger into a thick glaze.' },
      { step: 2, text: 'Coat salmon and let marinate for at least 30 minutes.' },
      { step: 3, text: 'Bake at 400°F until caramelized and flaky.' }
    ]
  }
];
