export interface Ingredient {
  item: string;
  amount: string;
  unit?: string;
}

export interface Instruction {
  step: number;
  text: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: 'Easy' | 'Intermediate' | 'Pro';
  author: string;
  category: string;
  servings: number;
  calories: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
