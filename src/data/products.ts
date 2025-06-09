export const categories = [
  {
    id: 'fruits-veggies',
    name: 'Fruits & Vegetables',
    image: '/images/categories/fruits-veggies.jpg'
  },
  {
    id: 'dairy',
    name: 'Dairy & Bakery',
    image: '/images/categories/dairy.jpg'
  },
  {
    id: 'grocery',
    name: 'Grocery & Staples',
    image: '/images/categories/grocery.jpg'
  },
  {
    id: 'spices',
    name: 'Spices & Masalas',
    image: '/images/categories/spices.jpg'
  },
  {
    id: 'snacks',
    name: 'Snacks & Beverages',
    image: '/images/categories/snacks.jpg'
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    image: '/images/categories/personal-care.jpg'
  },
  {
    id: 'household',
    name: 'Household Items',
    image: '/images/categories/household.jpg'
  }
];

export const products = [
  // Fruits & Vegetables
  {
    id: '1',
    name: 'Fresh Apples',
    price: 249,
    category: 'fruits-veggies',
    image: '/images/products/fruits/apples.jpg',
    unit: '1 kg',
    description: 'Fresh and juicy apples from Himachal Pradesh',
    stock: 100
  },
  {
    id: '2',
    name: 'Bananas',
    price: 49,
    category: 'fruits-veggies',
    image: '/images/products/fruits/bananas.jpg',
    unit: '1 dozen',
    description: 'Ripe and fresh bananas from local farms',
    stock: 50
  },
  {
    id: '3',
    name: 'Tomatoes',
    price: 39,
    category: 'fruits-veggies',
    image: '/images/products/vegetables/tomatoes.jpg',
    unit: '1 kg',
    description: 'Fresh and ripe tomatoes from local farms',
    stock: 75
  },
  {
    id: '4',
    name: 'Onions',
    price: 29,
    category: 'fruits-veggies',
    image: '/images/products/vegetables/onions.jpg',
    unit: '1 kg',
    description: 'Fresh onions from Maharashtra',
    stock: 100
  },
  {
    id: '5',
    name: 'Potatoes',
    price: 35,
    category: 'fruits-veggies',
    image: '/images/products/vegetables/potatoes.jpg',
    unit: '1 kg',
    description: 'Fresh potatoes from Uttar Pradesh',
    stock: 120
  },
  
  // Dairy & Bakery
  {
    id: '6',
    name: 'Amul Full Cream Milk',
    price: 58,
    category: 'dairy',
    image: '/images/products/dairy/amul-milk.jpg',
    unit: '1 L',
    description: 'Fresh full cream milk from Amul',
    stock: 150
  },
  {
    id: '7',
    name: 'Fresh Paneer',
    price: 199,
    category: 'dairy',
    image: '/images/products/dairy/paneer.jpg',
    unit: '500g',
    description: 'Fresh homemade paneer',
    stock: 80
  },
  {
    id: '8',
    name: 'Brown Bread',
    price: 35,
    category: 'dairy',
    image: '/images/products/bakery/brown-bread.jpg',
    unit: '400g',
    description: 'Fresh brown bread from local bakery',
    stock: 60
  },
  
  // Grocery & Staples
  {
    id: '9',
    name: 'Premium Basmati Rice',
    price: 149,
    category: 'grocery',
    image: '/images/products/grocery/basmati-rice.jpg',
    unit: '1 kg',
    description: 'Premium aged basmati rice from Punjab',
    stock: 200
  },
  {
    id: '10',
    name: 'Aashirvaad Atta',
    price: 55,
    category: 'grocery',
    image: '/images/products/grocery/aashirvaad-atta.jpg',
    unit: '1 kg',
    description: 'Whole wheat atta from ITC',
    stock: 180
  },
  {
    id: '11',
    name: 'Toor Dal',
    price: 159,
    category: 'grocery',
    image: '/images/products/grocery/toor-dal.jpg',
    unit: '1 kg',
    description: 'Premium toor dal from Karnataka',
    stock: 150
  },
  {
    id: '12',
    name: 'Chana Dal',
    price: 139,
    category: 'grocery',
    image: '/images/products/grocery/chana-dal.jpg',
    unit: '1 kg',
    description: 'Premium chana dal from Madhya Pradesh',
    stock: 150
  },
  
  // Spices & Masalas
  {
    id: '13',
    name: 'Turmeric Powder',
    price: 89,
    category: 'spices',
    image: '/images/products/spices/turmeric.jpg',
    unit: '200g',
    description: 'Pure turmeric powder from Kerala',
    stock: 100
  },
  {
    id: '14',
    name: 'Garam Masala',
    price: 99,
    category: 'spices',
    image: '/images/products/spices/garam-masala.jpg',
    unit: '100g',
    description: 'Premium garam masala blend',
    stock: 80
  },
  {
    id: '15',
    name: 'Red Chilli Powder',
    price: 79,
    category: 'spices',
    image: '/images/products/spices/chilli-powder.jpg',
    unit: '200g',
    description: 'Pure red chilli powder from Andhra Pradesh',
    stock: 90
  },
  
  // Snacks & Beverages
  {
    id: '16',
    name: 'Haldirams Namkeen',
    price: 45,
    category: 'snacks',
    image: '/images/products/snacks/haldirams-namkeen.jpg',
    unit: '200g',
    description: 'Mixed namkeen from Haldirams',
    stock: 120
  },
  {
    id: '17',
    name: 'Parle-G Biscuits',
    price: 30,
    category: 'snacks',
    image: '/images/products/snacks/parle-g.jpg',
    unit: '200g',
    description: 'Classic glucose biscuits from Parle',
    stock: 150
  },
  {
    id: '18',
    name: 'Tata Tea Premium',
    price: 55,
    category: 'snacks',
    image: '/images/products/beverages/tata-tea.jpg',
    unit: '250g',
    description: 'Premium tea leaves from Tata',
    stock: 100
  },
  
  // Personal Care
  {
    id: '19',
    name: 'Colgate Toothpaste',
    price: 95,
    category: 'personal-care',
    image: '/images/products/personal-care/colgate.jpg',
    unit: '100g',
    description: 'Strong teeth toothpaste from Colgate',
    stock: 100
  },
  {
    id: '20',
    name: 'Dove Shampoo',
    price: 199,
    category: 'personal-care',
    image: '/images/products/personal-care/dove-shampoo.jpg',
    unit: '1 L',
    description: 'Nourishing shampoo from Dove',
    stock: 90
  },
  
  // Household Items
  {
    id: '21',
    name: 'Vim Dishwash Bar',
    price: 35,
    category: 'household',
    image: '/images/products/household/vim.jpg',
    unit: '150g',
    description: 'Effective dishwashing bar from Vim',
    stock: 120
  },
  {
    id: '22',
    name: 'Surf Excel',
    price: 249,
    category: 'household',
    image: '/images/products/household/surf-excel.jpg',
    unit: '1 kg',
    description: 'Premium washing powder from Surf Excel',
    stock: 80
  }
];
