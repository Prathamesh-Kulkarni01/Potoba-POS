interface SiteData {
  name: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
  };
  content: {
    title: string;
    features: string[];
  };
}

const mockData: Record<string, SiteData> = {
  demo: {
    name: 'Demo Site',
    description: 'A demonstration of our multi-tenant platform',
    theme: {
      primary: '#2563eb',
      secondary: '#1e40af',
    },
    content: {
      title: 'Welcome to Demo Site',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
  },
  acme: {
    name: 'Acme Corporation',
    description: 'Leading provider of innovative solutions',
    theme: {
      primary: '#dc2626',
      secondary: '#991b1b',
    },
    content: {
      title: 'Acme Corp Solutions',
      features: ['Enterprise Solutions', 'Cloud Services', 'Consulting'],
    },
  },
  startup: {
    name: 'Tech Startup',
    description: 'Next-generation technology solutions',
    theme: {
      primary: '#059669',
      secondary: '#047857',
    },
    content: {
      title: 'Innovate with Us',
      features: ['AI Integration', 'Blockchain', 'IoT Solutions'],
    },
  },
};

export async function getData(subdomain: string): Promise<SiteData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!mockData[subdomain]) {
    throw new Error('Subdomain not found');
  }

  return mockData[subdomain];
}

export async function createSubdomain(name: string): Promise<{ success: boolean }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Validate subdomain name
  if (!/^[a-z0-9-]+$/.test(name)) {
    throw new Error('Invalid subdomain name. Use only lowercase letters, numbers, and hyphens.');
  }

  // Check if subdomain already exists
  if (mockData[name]) {
    throw new Error('Subdomain already exists');
  }

  // In a real application, you would create the subdomain here
  // For now, we'll just return success
  return { success: true };
}



//ORDERS
interface OrderItem {
  id: number;
  name: string;
  price: number;
}

interface Order {
  orderId: number;
  tableId: number;
  restaurant: string;
  items: OrderItem[];
}

let orders: Order[] = [
  {
    orderId: 1,
    tableId: 2,
    restaurant: 'Pizza Place',
    items: [
      { id: 1, name: 'Pizza', price: 12.99 },
      { id: 2, name: 'Coke', price: 1.99 },
    ],
  },
];

export async function getOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return orders;
}


export async function addOrder(newOrder: Order): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (orders.some((order) => order.orderId === newOrder.orderId)) {
    throw new Error(`Order with ID ${newOrder.orderId} already exists`);
  }
  orders.push(newOrder);
  return newOrder;
}

export async function updateOrder(orderId: number, updatedData: Partial<Order>): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const orderIndex = orders.findIndex((order) => order.orderId === orderId);
  if (orderIndex === -1) {
    throw new Error(`Order with ID ${orderId} not found`);
  }
  orders[orderIndex] = { ...orders[orderIndex], ...updatedData };
  return orders[orderIndex];
}

export async function deleteOrder(orderId: number): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const orderIndex = orders.findIndex((order) => order.orderId === orderId);
  if (orderIndex === -1) {
    throw new Error(`Order with ID ${orderId} not found`);
  }
  orders.splice(orderIndex, 1);
  return { success: true };
}
