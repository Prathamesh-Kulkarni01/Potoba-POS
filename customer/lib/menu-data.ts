import { MenuItem } from './store';

export const menuItems: MenuItem[] = [
  {
    id: 'app-1',
    name: 'Crispy Calamari',
    description: 'Tender calamari rings, lightly breaded and fried, served with marinara sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24',
    category: 'Appetizers',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true
    }
  },
  {
    id: 'app-2',
    name: 'Bruschetta',
    description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f',
    category: 'Appetizers',
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: false,
      dairyFree: true
    }
  },
  {
    id: 'main-1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon, grilled to perfection with lemon herb butter',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927',
    category: 'Main Course',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: false
    },
    customization: {
      options: ['Well Done', 'Medium', 'Medium Rare'],
      maxSelections: 1
    }
  },
  {
    id: 'main-2',
    name: 'Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and Parmesan',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371',
    category: 'Main Course',
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false
    }
  },
  {
    id: 'dessert-1',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    category: 'Desserts',
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    }
  },
  {
    id: 'dessert-2',
    name: 'Fresh Fruit Sorbet',
    description: 'Assorted seasonal fruit sorbets',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e',
    category: 'Desserts',
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true
    }
  }
];