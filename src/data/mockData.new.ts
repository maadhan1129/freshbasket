import { Product, Banner, Testimonial, Offer, Category } from '../types';

// Categories
export const categories: { id: Category; name: string; icon: string }[] = [
  { id: 'fruits-veggies', name: 'Fruits & Vegetables', icon: '🥬' },
  { id: 'dairy', name: 'Dairy & Bakery', icon: '🥛' },
  { id: 'grocery', name: 'Grocery & Staples', icon: '🍚' },
  { id: 'spices', name: 'Spices & Masalas', icon: '🌶️' },
  { id: 'snacks', name: 'Snacks & Beverages', icon: '🍪' },
  { id: 'personal-care', name: 'Personal Care', icon: '🧴' },
  { id: 'household', name: 'Household Items', icon: '🧹' },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: '💄' },
  { id: 'sweets-desserts', name: 'Sweets & Desserts', icon: '🍦' }
];

// Products
export const products: Product[] = [
  // Fruits & Vegetables
  {
    id: '550e8400-e29b-41d4-a716-446655440105',
    name: 'Fresh Apples',
    price: 249,
    category: 'fruits-veggies',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&w=400&q=80',
    unit: '1 kg',
    description: 'Fresh and juicy apples from Himachal Pradesh',
    stock: 100,
    brand: 'Local Farm',
    rating: 4.5,
    tags: ['fruits', 'fresh']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440106',
    name: 'Bananas',
    price: 49,
    category: 'fruits-veggies',
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&w=400&q=80',
    unit: '1 dozen',
    description: 'Ripe and fresh bananas from local farms',
    stock: 50,
    brand: 'Local Farm',
    rating: 4.3,
    tags: ['fruits', 'fresh']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440107',
    name: 'Tomatoes',
    price: 39,
    category: 'fruits-veggies',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&w=400&q=80',
    unit: '1 kg',
    description: 'Fresh and ripe tomatoes from local farms',
    stock: 75,
    brand: 'Local Farm',
    rating: 4.0,
    tags: ['vegetables', 'fresh']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440108',
    name: 'Onions',
    price: 29,
    category: 'fruits-veggies',
    image: 'https://images.pexels.com/photos/23413831/pexels-photo-23413831/free-photo-of-pile-of-onions.jpeg?auto=compress&cs=tinysrgb&w=600',
    unit: '1 kg',
    description: 'Fresh onions from Maharashtra',
    stock: 100,
    brand: 'Local Farm',
    rating: 4.0,
    tags: ['vegetables', 'fresh']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440109',
    name: 'Potatoes',
    price: 35,
    category: 'fruits-veggies',
    image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=600',
    unit: '1 kg',
    description: 'Fresh potatoes from Uttar Pradesh',
    stock: 120,
    brand: 'Local Farm',
    rating: 4.1,
    tags: ['vegetables', 'fresh']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440110',
    name: 'Mangoes',
    price: 199,
    category: 'fruits-veggies',
    image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600',
    unit: '1 kg',
    description: 'Sweet and juicy Alphonso mangoes from Maharashtra',
    stock: 80,
    brand: 'Local Farm',
    rating: 4.7,
    tags: ['fruits', 'seasonal']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440111',
    name: 'Green Capsicum',
    price: 89,
    category: 'fruits-veggies',
    image: 'https://images.pexels.com/photos/1199562/pexels-photo-1199562.jpeg?auto=compress&w=400&q=80',
    unit: '500g',
    description: 'Fresh green capsicum from local farms',
    stock: 60,
    brand: 'Local Farm',
    rating: 4.2,
    tags: ['vegetables', 'fresh']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440112',
    name: 'Carrots',
    price: 45,
    category: 'fruits-veggies',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&w=400&q=80',
    unit: '500g',
    description: 'Fresh carrots from local farms',
    stock: 90,
    brand: 'Local Farm',
    rating: 4.0,
    tags: ['vegetables', 'fresh']
  },
  
  // Dairy & Bakery
  {
    id: '550e8400-e29b-41d4-a716-446655440113',
    name: 'Amul Full Cream Milk',
    price: 58,
    category: 'dairy',
    image: 'https://up.yimg.com/ib/th?id=OIP.LFocd2TOA709hxtilukqRgHaI1&pid=Api&rs=1&c=1&qlt=95&w=86&h=103',
    unit: '1 L',
    description: 'Fresh full cream milk from Amul',
    stock: 150,
    brand: 'Amul',
    rating: 4.5,
    tags: ['dairy', 'milk']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440114',
    name: 'Fresh Paneer',
    price: 199,
    category: 'dairy',
    image: 'https://up.yimg.com/ib/th?id=OIP.PI9h8AHiHNYVKMCb5lgj3wHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117',
    unit: '500g',
    description: 'Fresh homemade paneer',
    stock: 80,
    brand: 'Local Dairy',
    rating: 4.6,
    tags: ['dairy', 'paneer']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440115',
    name: 'Brown Bread',
    price: 35,
    category: 'dairy',
    image: 'https://up.yimg.com/ib/th?id=OIP.vRJTSWixp1AHX6J3Q3KmVAHaEc&pid=Api&rs=1&c=1&qlt=95&w=191&h=114',
    unit: '400g',
    description: 'Fresh brown bread from local bakery',
    stock: 60,
    brand: 'Local Bakery',
    rating: 4.2,
    tags: ['bakery', 'bread']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440116',
    name: 'Amul Butter',
    price: 55,
    category: 'dairy',
    image: 'https://up.yimg.com/ib/th?id=OIP.4fKJCMqsTXprsYyMtxeM1QHaHa&pid=Api&rs=1&c=1&qlt=95&w=111&h=111',
    unit: '100g',
    description: 'Pure butter from Amul',
    stock: 100,
    brand: 'Amul',
    rating: 4.7,
    tags: ['dairy', 'butter']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440117',
    name: 'Heritage Curd',
    price: 45,
    category: 'dairy',
    image: 'https://tse2.mm.bing.net/th?id=OIP.4YPypVTzmGamDIs-gi4v-AHaHa&pid=Api&P=0&h=180',
    unit: '500g',
    description: 'Fresh homemade curd',
    stock: 70,
    brand: 'Local Dairy',
    rating: 4.4,
    tags: ['dairy', 'curd']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440118',
    name: 'Amul Vanilla Ice Cream',
    price: 120,
    category: 'dairy',
    image: 'https://tse4.mm.bing.net/th?id=OIP.zFpQ9-_CS6WAOlZmwWzhlAHaHa&pid=Api&P=0&h=180',
    unit: '500ml',
    description: 'Creamy vanilla ice cream from Amul',
    stock: 80,
    brand: 'Amul',
    rating: 4.5,
    tags: ['dairy', 'ice-cream', 'vanilla']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440119',
    name: 'Amul Chocolate Ice Cream',
    price: 160,
    category: 'dairy',
    image: 'https://images.pexels.com/photos/1346345/pexels-photo-1346345.jpeg?auto=compress&cs=tinysrgb&w=600',
    unit: '500ml',
    description: 'Delicious chocolate ice cream from Amul',
    stock: 75,
    brand: 'Amul',
    rating: 4.7,
    tags: ['dairy', 'ice-cream', 'chocolate']
  },
  
  // Grocery & Staples
  {
    id: '550e8400-e29b-41d4-a716-446655440120',
    name: 'Premium Basmati Rice',
    price: 149,
    category: 'grocery',
    image: 'https://tse1.mm.bing.net/th?id=OIP.HmD35dN85IcNIvMJt_SupgHaJQ&pid=Api&P=0&h=180',
    unit: '1 kg',
    description: 'Premium aged basmati rice from Punjab',
    stock: 200,
    brand: 'India Gate',
    rating: 4.8,
    tags: ['rice', 'staple']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440121',
    name: 'Aashirvaad Atta',
    price: 55,
    category: 'grocery',
    image: 'https://up.yimg.com/ib/th?id=OIP.7QFJi4qJm2FeSYM3-I7lUgHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121',
    unit: '1 kg',
    description: 'Whole wheat atta from ITC',
    stock: 180,
    brand: 'Aashirvaad',
    rating: 4.6,
    tags: ['atta', 'staple']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440122',
    name: 'Toor Dal',
    price: 159,
    category: 'grocery',
    image: 'https://tse4.mm.bing.net/th?id=OIP.T2po5ix4FXF-NBbNeKD45AHaGK&pid=Api&P=0&h=180',
    unit: '1 kg',
    description: 'Premium toor dal from Karnataka',
    stock: 150,
    brand: 'Tata Sampann',
    rating: 4.5,
    tags: ['dal', 'pulses']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440123',
    name: 'Chana Dal',
    price: 139,
    category: 'grocery',
    image: 'https://tse1.mm.bing.net/th?id=OIP.05XspGMhaPEEsdY3gw8qLQHaHa&pid=Api&P=0&h=180',
    unit: '1 kg',
    description: 'Premium chana dal from Madhya Pradesh',
    stock: 150,
    brand: 'Tata Sampann',
    rating: 4.4,
    tags: ['dal', 'pulses']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440124',
    name: 'Sugar',
    price: 49,
    category: 'grocery',
    image: 'https://tse3.mm.bing.net/th?id=OIP._laCprR5v91MSm__goQBlgHaE7&pid=Api&P=0&h=180',
    unit: '1 kg',
    description: 'Pure refined sugar',
    stock: 200,
    brand: 'Dwarikesh',
    rating: 4.3,
    tags: ['sugar', 'staple']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440125',
    name: 'Salt',
    price: 20,
    category: 'grocery',
    image: 'https://tse2.mm.bing.net/th?id=OIP.AX5ySZVF6KcY2WsDVKqVOAHaHa&pid=Api&P=0&h=180',
    unit: '1 kg',
    description: 'Iodized salt',
    stock: 250,
    brand: 'Tata Salt',
    rating: 4.2,
    tags: ['salt', 'staple']
  },
  
  // Spices & Masalas
  {
    id: '550e8400-e29b-41d4-a716-446655440126',
    name: 'Turmeric Powder',
    price: 89,
    category: 'spices',
    image: 'https://tse2.mm.bing.net/th?id=OIP.HaIp-OT4ThzmkO4YNQf0IwHaHa&pid=Api&P=0&h=180',
    unit: '200g',
    description: 'Pure turmeric powder from Kerala',
    stock: 100,
    brand: 'MDH',
    rating: 4.5,
    tags: ['spices', 'masala']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440127',
    name: 'Garam Masala',
    price: 99,
    category: 'spices',
    image: 'https://tse3.mm.bing.net/th?id=OIP.oVy3JgouPyywEWaOPB0umQAAAA&pid=Api&P=0&h=180',
    unit: '100g',
    description: 'Premium garam masala blend',
    stock: 80,
    brand: 'MDH',
    rating: 4.6,
    tags: ['spices', 'masala']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440128',
    name: 'Red Chilli Powder',
    price: 79,
    category: 'spices',
    image: 'https://tse4.mm.bing.net/th?id=OIP.0k5K4G2wjK3aA99Ie95FawHaE8&pid=Api&P=0&h=180',
    unit: '200g',
    description: 'Pure red chilli powder from Andhra Pradesh',
    stock: 90,
    brand: 'MDH',
    rating: 4.4,
    tags: ['spices', 'masala']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440129',
    name: 'Cumin Seeds',
    price: 129,
    category: 'spices',
    image: 'https://5.imimg.com/data5/SELLER/Default/2021/11/JQ/HB/UW/86379293/organic-cummins-seeds-1000x1000.jpeg',
    unit: '100g',
    description: 'Premium cumin seeds',
    stock: 70,
    brand: 'MDH',
    rating: 4.5,
    tags: ['spices', 'seeds']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440130',
    name: 'Coriander Powder',
    price: 89,
    category: 'spices',
    image: 'https://tse1.mm.bing.net/th?id=OIP.qTfbJsk75OtkEM2ZTobVwgHaHa&pid=Api&P=0&h=180',
    unit: '200g',
    description: 'Pure coriander powder',
    stock: 85,
    brand: 'MDH',
    rating: 4.3,
    tags: ['spices', 'masala']
  },
  
  // Snacks & Beverages
  {
    id: '550e8400-e29b-41d4-a716-446655440131',
    name: 'Haldirams Namkeen',
    price: 45,
    category: 'snacks',
    image: 'https://tse4.mm.bing.net/th?id=OIP.oF4azKAX3mLV97n7oLqR5gHaHa&pid=Api&P=0&h=180',
    unit: '200g',
    description: 'Mixed namkeen from Haldirams',
    stock: 120,
    brand: 'Haldirams',
    rating: 4.7,
    tags: ['snacks', 'namkeen']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440132',
    name: 'Parle-G Biscuits',
    price: 30,
    category: 'snacks',
    image: 'https://tse1.mm.bing.net/th?id=OIP.ZwIOYKei3Pofm6HLvdqFPwHaHa&pid=Api&P=0&h=180',
    unit: '200g',
    description: 'Classic glucose biscuits from Parle',
    stock: 150,
    brand: 'Parle-G',
    rating: 4.8,
    tags: ['snacks', 'biscuits']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440133',
    name: 'Niloufer Tea',
    price: 55,
    category: 'snacks',
    image: 'https://tse2.mm.bing.net/th?id=OIP.SRyq7CwTZuwxxocuNT9AoQHaFY&pid=Api&P=0&h=180',
    unit: '250g',
    description: 'Premium tea leaves from Niloufer',
    stock: 100,
    brand: 'Niloufer',
    rating: 4.6,
    tags: ['beverages', 'tea']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440134',
    name: "Lay's Chips",
    price: 20,
    category: 'snacks',
    image: 'https://tse4.mm.bing.net/th?id=OIP.9hZIY8jNxPydarMvs_Qz7AHaHa&pid=Api&P=0&h=180',
    unit: '30g',
    description: 'Classic salted potato chips',
    stock: 200,
    brand: "Lay's",
    rating: 4.5,
    tags: ['snacks', 'chips']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440135',
    name: 'Coca Cola',
    price: 35,
    category: 'snacks',
    image: 'https://tse4.mm.bing.net/th?id=OIP.1scpVWjxaCMsSzsGSH5vcQHaIV&pid=Api&P=0&h=180',
    unit: '750ml',
    description: 'Refreshing cola drink',
    stock: 150,
    brand: 'Coca Cola',
    rating: 4.4,
    tags: ['beverages', 'soft-drinks']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440136',
    name: 'Cadbury Dairy Milk Silk',
    price: 175,
    category: 'sweets-desserts',
    image: 'https://tse1.mm.bing.net/th?id=OIP.YYqr7xW2MuC79BjiyMa8WwHaHa&pid=Api&P=0&h=180',
    unit: '150g',
    description: 'Smooth and creamy milk chocolate',
    stock: 100,
    brand: 'Cadbury',
    rating: 4.8,
    tags: ['sweets-desserts', 'chocolate', 'dairy-milk']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440137',
    name: 'Cadbury Dairy Milk Fruit & Nut',
    price: 120,
    category: 'sweets-desserts',
    image: 'https://tse1.mm.bing.net/th?id=OIP.zoopSBqCh2c6S4Df46mOPgHaHa&pid=Api&P=0&h=180',
    unit: '100g',
    description: 'Milk chocolate with fruit and nuts',
    stock: 90,
    brand: 'Cadbury',
    rating: 4.7,
    tags: ['sweets-desserts', 'chocolate', 'dairy-milk', 'fruit-nut']
  },
  
  // Personal Care (Existing products moved to 'beauty' category below)
  
  // Household Items
  {
    id: '550e8400-e29b-41d4-a716-446655440138',
    name: 'Vim Dishwash Bar',
    price: 35,
    category: 'household',
    image: 'https://tse3.mm.bing.net/th?id=OIP.yLbBbkyVlnzuI2E0DuXLtgHaHa&pid=Api&P=0&h=180',
    unit: '150g',
    description: 'Effective dishwashing bar from Vim',
    stock: 120,
    brand: 'Vim',
    rating: 4.3,
    tags: ['household', 'cleaning']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440139',
    name: 'Surf Excel',
    price: 249,
    category: 'household',
    image: 'https://tse3.mm.bing.net/th?id=OIP.k-wrRlrr1zk-pqe2s6VT4wHaHa&pid=Api&P=0&h=180',
    unit: '1 kg',
    description: 'Premium washing powder from Surf Excel',
    stock: 80,
    brand: 'Surf Excel',
    rating: 4.5,
    tags: ['household', 'detergent']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440140',
    name: 'Harpic Toilet Cleaner',
    price: 129,
    category: 'household',
    image: 'https://sp.yimg.com/ib/th?id=OPAC.6NrTAnP%2fR7tI1w474C474&o=5&pid=21.1&w=160&h=105',
    unit: '750ml',
    description: 'Powerful toilet cleaner from Harpic',
    stock: 90,
    brand: 'Harpic',
    rating: 4.4,
    tags: ['household', 'cleaning']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440141',
    name: 'Scotch Brite Scrubber',
    price: 45,
    category: 'household',
    image: 'https://tse4.mm.bing.net/th?id=OIP.-gx8zI94e522tIhwT8MbuQHaHa&pid=Api&P=0&h=180',
    unit: '1 piece',
    description: 'Durable scrubber from Scotch Brite',
    stock: 150,
    brand: 'Scotch Brite',
    rating: 4.6,
    tags: ['household', 'cleaning']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440142',
    name: 'Good Knight Mosquito Repellent',
    price: 199,
    category: 'household',
    image: 'https://tse2.mm.bing.net/th?id=OIP.ciQVi4l9dbGujkQWrm0SvAHaHa&pid=Api&P=0&h=180',
    unit: '45ml',
    description: 'Effective mosquito repellent from Good Knight',
    stock: 100,
    brand: 'Good Knight',
    rating: 4.5,
    tags: ['household', 'repellent']
  },

  // Beauty & Personal Care (New Category)
  {
    id: '550e8400-e29b-41d4-a716-446655440143',
    name: 'Lakme Eyeconic Kajal',
    price: 250,
    category: 'beauty',
    image: 'https://tse1.mm.bing.net/th?id=OIP.iCa4YsjZOLgmrGl-j0yNLQHaIV&pid=Api&P=0&h=180',
    unit: '1 piece',
    description: 'Smudge-proof and water-resistant kajal',
    stock: 70,
    brand: 'Lakme',
    rating: 4.5,
    tags: ['beauty', 'makeup', 'kajal']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440144',
    name: 'Maybelline New York Fit Me Foundation',
    price: 600,
    category: 'beauty',
    image: 'https://sp.yimg.com/ib/th?id=OPAC.XmeUx2pGzbDeLg474C474&o=5&pid=21.1&w=160&h=105',
    unit: '30ml',
    description: 'Natural-looking foundation for a flawless finish',
    stock: 60,
    brand: 'Maybelline New York',
    rating: 4.7,
    tags: ['beauty', 'makeup', 'foundation']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440145',
    name: 'Bella Vita Perfume',
    price: 5500,
    category: 'beauty',
    image: 'https://sp.yimg.com/ib/th?id=OPAC.wZekelx%2bkuEWDQ474C474&o=5&pid=21.1&w=160&h=105',
    unit: '100ml',
    description: 'A captivating fragrance',
    stock: 40,
    brand: 'Bella Vita',
    rating: 4.8,
    tags: ['beauty', 'fragrance', 'perfume']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440146',
    name: 'Chanel No. 5 Perfume',
    price: 12000,
    category: 'beauty',
    image: 'https://tse1.mm.bing.net/th?id=OIP.sG4dVCSBzGEo_mg8UsbKjQHaJ1&pid=Api&P=0&h=180',
    unit: '100ml',
    description: 'Iconic floral aldehyde fragrance for women',
    stock: 30,
    brand: 'Chanel',
    rating: 4.9,
    tags: ['beauty', 'fragrance', 'perfume', 'women']
  },
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Colgate Toothpaste',
    price: 95,
    category: 'beauty',
    image: 'https://tse1.mm.bing.net/th?id=OIP.1D5u0zU9UrADFEcm_d7bwgHaHa&pid=Api&P=0&h=180',
    unit: '100g',
    description: 'Strong teeth toothpaste from Colgate',
    stock: 100,
    brand: 'Colgate',
    rating: 4.6,
    tags: ['personal-care', 'toothpaste', 'beauty']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440147',
    name: 'Dove Shampoo',
    price: 199,
    category: 'beauty',
    image: 'https://tse2.mm.bing.net/th?id=OIP._oqIlmiICmMM2NqpjIFR5QHaHa&pid=Api&P=0&h=180',
    unit: '1 L',
    description: 'Nourishing shampoo from Dove',
    stock: 90,
    brand: 'Dove',
    rating: 4.7,
    tags: ['personal-care', 'shampoo', 'beauty']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440148',
    name: 'Dettol Soap',
    price: 45,
    category: 'beauty',
    image: 'https://tse1.mm.bing.net/th?id=OIP.ozj0uL1PiMC7v8J_JtmUWwHaHa&pid=Api&P=0&h=180',
    unit: '75g',
    description: 'Antibacterial soap from Dettol',
    stock: 120,
    brand: 'Dettol',
    rating: 4.5,
    tags: ['personal-care', 'soap', 'beauty']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440149',
    name: 'Himalaya Face Wash',
    price: 149,
    category: 'beauty',
    image: 'https://tse2.mm.bing.net/th?id=OIP.woDNn_b7Wgm7zWh1YFXrFgHaHZ&pid=Api&P=0&h=180',
    unit: '100g',
    description: 'Natural face wash from Himalaya',
    stock: 80,
    brand: 'Himalaya',
    rating: 4.4,
    tags: ['personal-care', 'face-wash', 'beauty']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440150',
    name: 'Nivea Cream',
    price: 299,
    category: 'beauty',
    image: 'https://tse2.mm.bing.net/th?id=OIP.2VdgUDJf1kyk_JFa1A9RgQHaFo&pid=Api&P=0&h=180',
    unit: '200g',
    description: 'Moisturizing cream from Nivea',
    stock: 70,
    brand: 'Nivea',
    rating: 4.6,
    tags: ['personal-care', 'cream', 'beauty']
  },

  // Sweets & Desserts (New Category)
  {
    id: '550e8400-e29b-41d4-a716-446655440151',
    name: 'Cadbury Dairy Milk Silk',
    price: 175,
    category: 'sweets-desserts',
    image: 'https://tse1.mm.bing.net/th?id=OIP.YYqr7xW2MuC79BjiyMa8WwHaHa&pid=Api&P=0&h=180',
    unit: '150g',
    description: 'Smooth and creamy milk chocolate',
    stock: 100,
    brand: 'Cadbury',
    rating: 4.8,
    tags: ['sweets-desserts', 'chocolate', 'dairy-milk']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440152',
    name: 'Cadbury Dairy Milk Fruit & Nut',
    price: 120,
    category: 'sweets-desserts',
    image: 'https://tse1.mm.bing.net/th?id=OIP.zoopSBqCh2c6S4Df46mOPgHaHa&pid=Api&P=0&h=180',
    unit: '100g',
    description: 'Milk chocolate with fruit and nuts',
    stock: 90,
    brand: 'Cadbury',
    rating: 4.7,
    tags: ['sweets-desserts', 'chocolate', 'dairy-milk', 'fruit-nut']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440153',
    name: 'Amul Vanilla Ice Cream',
    price: 150,
    category: 'sweets-desserts',
    image: 'https://images.pexels.com/photos/305716/pexels-photo-305716.jpeg?auto=compress&cs=tinysrgb&w=600',
    unit: '500ml',
    description: 'Rich and creamy vanilla ice cream from Amul',
    stock: 80,
    brand: 'Amul',
    rating: 4.6,
    tags: ['sweets-desserts', 'ice-cream', 'vanilla']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440154',
    name: 'Amul Chocolate Ice Cream',
    price: 160,
    category: 'sweets-desserts',
    image: 'https://tse3.mm.bing.net/th?id=OIP.iQdFWUAWBtsJrkxhNK_XKwHaHa&pid=Api&P=0&h=180',
    unit: '500ml',
    description: 'Delicious chocolate ice cream from Amul',
    stock: 75,
    brand: 'Amul',
    rating: 4.7,
    tags: ['sweets-desserts', 'ice-cream', 'chocolate']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440155',
    name: 'Cadbury Five Star',
    price: 20,
    category: 'sweets-desserts',
    image: 'https://tse1.mm.bing.net/th?id=OIP.hTYGGQJOuACP2hMNCUaTcAHaDS&pid=Api&P=0&h=180',
    unit: '40g',
    description: 'Delicious 5 Star chocolate',
    stock: 150,
    brand: 'Cadbury',
    rating: 4.2,
    tags: ['sweets-desserts', 'chocolate']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440156',
    name: 'Amul Strawberry Ice Cream',
    price: 155,
    category: 'sweets-desserts',
    image: 'https://tse1.mm.bing.net/th?id=OIP.THoCAxrcWgy6lzJfuB5abQHaE7&pid=Api&P=0&h=180',
    unit: '500ml',
    description: 'Sweet and tangy strawberry ice cream from Amul',
    stock: 70,
    brand: 'Amul',
    rating: 4.6,
    tags: ['sweets-desserts', 'ice-cream', 'strawberry']
  }
];

// Seasonal Banners
export const banners: Banner[] = [
  {
    id: 'b1',
    title: 'Summer Fresh Picks',
    subtitle: 'Enjoy 20% off on all seasonal fruits',
    image: 'https://images.pexels.com/photos/4443344/pexels-photo-4443344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=fruits',
  },
  {
    id: 'b2',
    title: 'Healthy Breakfast Ideas',
    subtitle: 'Start your day right with our breakfast essentials',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?tag=breakfast',
  },
  {
    id: 'b3',
    title: 'Baking Season is Here',
    subtitle: 'All baking supplies at special prices',
    image: 'https://images.pexels.com/photos/6287298/pexels-photo-6287298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?tag=baking',
  },
];

// Sample Ads for Hero Slider
export const sampleAds = [
  {
    image: 'https://image.freepik.com/free-psd/super-grocery-sale-web-banner_120329-267.jpg',
    text: 'Super Grocery Sale',
    description: 'Up to 50% off on fresh groceries',
    link: '/products?category=groceries'
  }
];

// Get products by category
export const getProductsByCategory = (category: Category): Product[] => {
  return products.filter(product => product.category === category);
};

// Get popular products
export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.isPopular);
};

// Get products on sale
export const getProductsOnSale = (): Product[] => {
  return products.filter(product => product.isOnSale);
};

// Get new products
export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}; 