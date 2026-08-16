require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Category = require('./models/Category');

const categories = [
  { name: 'Plumber', slug: 'plumber', icon: 'Wrench', description: 'Pipe leaks, taps, drainage & fittings', startingPrice: 500, color: '#38bdf8' },
  { name: 'Electrician', slug: 'electrician', icon: 'Zap', description: 'Wiring, sockets, switches & installations', startingPrice: 600, color: '#38bdf8' },
  { name: 'AC Repair', slug: 'ac-repair', icon: 'Snowflake', description: 'AC servicing, gas refill & installation', startingPrice: 1200, color: '#38bdf8' },
  { name: 'Carpenter', slug: 'carpenter', icon: 'Hammer', description: 'Furniture repair, doors & woodwork', startingPrice: 800, color: '#38bdf8' },
  { name: 'Painter', slug: 'painter', icon: 'PaintBucket', description: 'Wall painting, texture & touch-ups', startingPrice: 1500, color: '#38bdf8' },
  { name: 'Gas Fitter', slug: 'gas-fitter', icon: 'Flame', description: 'Gas leaks, stove & pipeline fitting', startingPrice: 700, color: '#38bdf8' },
  { name: 'Appliance Repair', slug: 'appliance-repair', icon: 'WashingMachine', description: 'Washing machine, fridge & microwave', startingPrice: 900, color: '#38bdf8' },
  { name: 'Cleaning', slug: 'cleaning', icon: 'Sparkles', description: 'Home deep cleaning & sanitization', startingPrice: 1000, color: '#38bdf8' },
  { name: 'Home Maintenance', slug: 'home-maintenance', icon: 'Home', description: 'General repairs & upkeep services', startingPrice: 600, color: '#38bdf8' },
  { name: 'Emergency Services', slug: 'emergency', icon: 'Siren', description: '24/7 urgent home rescue response', startingPrice: 1500, color: '#38bdf8' },
];

const seed = async () => {
  try {
    await connectDB();

    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log(`${categories.length} categories seeded`);

    // Purane admin accounts ko database se delete karega taake password conflict na aaye
    await Admin.deleteMany({});
    
    // Naya fresh admin account banayega
    await Admin.create({
      name: 'Shivani Batra',
      email: 'shivanibatra978@gmail.com',
      password: 'Shivani@123',
      phone: '+923123269180',
    });
    console.log('Fresh Admin account created: shivanibatra978@gmail.com / Shivani@123');

    console.log('Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();