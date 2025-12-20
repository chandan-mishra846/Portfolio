import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from './src/models/Project.js';

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Update Calendar live link
  await Project.updateOne(
    { title: 'Calendar Application' },
    { $set: { liveLink: 'https://calander-xi.vercel.app/' } }
  );
  
  // Update E-commerce Frontend live link
  await Project.updateOne(
    { title: 'E-commerce Frontend' },
    { $set: { liveLink: 'https://ecommerce-frontend-two-dun.vercel.app/' } }
  );
  
  // Update E-commerce Backend live link
  await Project.updateOne(
    { title: 'E-commerce Backend' },
    { $set: { liveLink: 'https://ecommerce-frontend-two-dun.vercel.app/' } }
  );
  
  // Remove live links for projects without deployments
  await Project.updateOne(
    { title: 'E-commerce Website' },
    { $set: { liveLink: '' } }
  );
  
  await Project.updateOne(
    { title: 'Stone Paper Scissors Game' },
    { $set: { liveLink: '' } }
  );
  
  await Project.updateOne(
    { title: 'Portfolio Website' },
    { $set: { liveLink: '' } }
  );

  console.log('✅ Updated all project links!');
  
  const projects = await Project.find();
  console.log('\nProjects with live links:');
  projects.forEach(p => {
    if (p.liveLink) console.log(`- ${p.title}: ${p.liveLink}`);
  });
  
  process.exit(0);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
