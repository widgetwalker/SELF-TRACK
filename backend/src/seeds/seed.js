const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models with correct paths
const User = require('../models/user.model');
const Task = require('../models/task.model');
const Leave = require('../models/leave.model');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // Create demo users
        console.log('\n📝 Creating demo users...');

        const hashedPassword = await bcrypt.hash('demo123', 10);
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);

        const demoEmployee = await User.findOneAndUpdate(
            { email: 'demo@selftrack.com' },
            {
                email: 'demo@selftrack.com',
                password: hashedPassword,
                fullName: 'Demo Employee',
                role: 'employee',
                skills: [
                    { name: 'JavaScript', level: 4 },
                    { name: 'Node.js', level: 4 },
                    { name: 'MongoDB', level: 3 }
                ]
            },
            { upsert: true, new: true }
        );

        const demoAdmin = await User.findOneAndUpdate(
            { email: 'admin@selftrack.com' },
            {
                email: 'admin@selftrack.com',
                password: hashedAdminPassword,
                fullName: 'Admin User',
                role: 'admin',
                skills: [
                    { name: 'Leadership', level: 5 },
                    { name: 'Project Management', level: 4 }
                ]
            },
            { upsert: true, new: true }
        );

        console.log('✅ Created demo users');
        console.log('   Employee: demo@selftrack.com / demo123');
        console.log('   Admin: admin@selftrack.com / admin123');

        // Create demo tasks for employee
        console.log('\n📝 Creating demo tasks...');

        const existingTasks = await Task.find({ assignedTo: demoEmployee._id });
        if (existingTasks.length === 0) {
            const demoTasks = [
                {
                    title: 'Complete Project Report',
                    description: 'Finish the Q1 project report and submit to management',
                    status: 'in_progress',
                    assignedTo: demoEmployee._id,
                    createdBy: demoAdmin._id
                },
                {
                    title: 'Team Meeting Preparation',
                    description: 'Prepare slides for weekly team sync',
                    status: 'pending',
                    assignedTo: demoEmployee._id,
                    createdBy: demoAdmin._id
                },
                {
                    title: 'Code Review - Authentication Module',
                    description: 'Review pull request #234 for authentication improvements',
                    status: 'completed',
                    assignedTo: demoEmployee._id,
                    createdBy: demoAdmin._id
                },
                {
                    title: 'Update Documentation',
                    description: 'Update API documentation with new endpoints',
                    status: 'pending',
                    assignedTo: demoEmployee._id,
                    createdBy: demoEmployee._id
                },
                {
                    title: 'Bug Fix - Login Issue',
                    description: 'Fix the login timeout issue reported by users',
                    status: 'completed',
                    assignedTo: demoEmployee._id,
                    createdBy: demoAdmin._id
                }
            ];

            await Task.insertMany(demoTasks);
            console.log('✅ Created 5 demo tasks');
        } else {
            console.log('ℹ️  Tasks already exist, skipping...');
        }

        // Create demo leaves
        console.log('\n📝 Creating demo leaves...');

        const existingLeaves = await Leave.find({ employee: demoEmployee._id });
        if (existingLeaves.length === 0) {
            const demoLeaves = [
                {
                    employee: demoEmployee._id,
                    startDate: new Date('2026-01-15'),
                    endDate: new Date('2026-01-16'),
                    reason: 'Medical appointment',
                    status: 'approved',
                    reviewedBy: demoAdmin._id
                },
                {
                    employee: demoEmployee._id,
                    startDate: new Date('2026-02-01'),
                    endDate: new Date('2026-02-05'),
                    reason: 'Family vacation',
                    status: 'pending'
                },
                {
                    employee: demoEmployee._id,
                    startDate: new Date('2025-12-24'),
                    endDate: new Date('2025-12-26'),
                    reason: 'Holiday break',
                    status: 'approved',
                    reviewedBy: demoAdmin._id
                }
            ];

            await Leave.insertMany(demoLeaves);
            console.log('✅ Created 3 demo leaves');
        } else {
            console.log('ℹ️  Leaves already exist, skipping...');
        }

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Login credentials:');
        console.log('┌─────────────────────────────────────────┐');
        console.log('│ Employee Account                        │');
        console.log('│ Email: demo@selftrack.com               │');
        console.log('│ Password: demo123                       │');
        console.log('├─────────────────────────────────────────┤');
        console.log('│ Admin Account                           │');
        console.log('│ Email: admin@selftrack.com              │');
        console.log('│ Password: admin123                      │');
        console.log('└─────────────────────────────────────────┘');
        console.log('\n🌐 Access: http://localhost:3000\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
