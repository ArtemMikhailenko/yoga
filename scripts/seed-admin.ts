import dbConnect from '../lib/mongodb';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';

async function seedAdmin() {
  try {
    await dbConnect();

    // Check if any admins exist
    const existingAdmins = await Admin.countDocuments();
    
    if (existingAdmins > 0) {
      console.log('Admins already exist. Skipping seed.');
      process.exit(0);
    }

    // Create initial superadmin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await Admin.create({
      email: 'vladybookings@gmail.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'superadmin',
      isActive: true,
    });

    console.log('✅ Successfully created initial superadmin account');
    console.log('Email: vladybookings@gmail.com');
    console.log('Password: admin123');
    console.log('⚠️  ВАЖНО: Смените пароль после первого входа!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
