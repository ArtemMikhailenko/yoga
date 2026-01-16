import dbConnect from '../lib/mongodb';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';

async function createMainAdmin() {
  try {
    await dbConnect();

    // Check if this specific admin exists
    const existingAdmin = await Admin.findOne({ email: 'vladybookings@gmail.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin vladybookings@gmail.com already exists');
      console.log('Name:', existingAdmin.name);
      console.log('Role:', existingAdmin.role);
      console.log('Active:', existingAdmin.isActive);
      process.exit(0);
    }

    // Create the admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await Admin.create({
      email: 'vladybookings@gmail.com',
      password: hashedPassword,
      name: 'Vlady Bookings',
      role: 'superadmin',
      isActive: true,
    });

    console.log('✅ Successfully created admin account:');
    console.log('Email: vladybookings@gmail.com');
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('⚠️  ВАЖНО: Смените пароль после первого входа!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createMainAdmin();
