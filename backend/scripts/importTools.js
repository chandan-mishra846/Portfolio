import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Skill from '../src/models/Skill.js';

dotenv.config();

const tools = [
  { name: 'Git', proficiency: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', proficiency: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Docker', proficiency: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Vercel', proficiency: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'Netlify', proficiency: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
  { name: 'Postman', proficiency: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { name: 'VS Code', proficiency: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'MongoDB Atlas', proficiency: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'npm', proficiency: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
  { name: 'Vite', proficiency: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Figma', proficiency: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Jira', proficiency: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI');
    process.exit(1);
  }
  
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');

  for (const tool of tools) {
    const updated = await Skill.findOneAndUpdate(
      { name: tool.name },
      { $set: { icon: tool.icon, proficiency: tool.proficiency } },
      { upsert: true, new: true }
    );
    console.log(`Upserted: ${updated.name} -> ${updated.proficiency}%`);
  }

  await mongoose.disconnect();
  console.log('✅ Finished importing tools');
  process.exit(0);
}

run().catch(err => {
  console.error('❌ Import failed:', err.message);
  process.exit(1);
});
