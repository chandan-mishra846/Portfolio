import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from '../src/models/Project.js';

dotenv.config();

function getEnv(name, required = false) {
  const val = process.env[name];
  if (required && !val) {
    throw new Error(`${name} is required`);
  }
  return val || '';
}

async function run() {
  try {
    const uri = getEnv('MONGODB_URI', true);

    const title = getEnv('PROJECT_TITLE', true);
    const description = getEnv('PROJECT_DESCRIPTION', true);
    const image = getEnv('PROJECT_IMAGE');
    const liveLink = getEnv('PROJECT_LIVE_LINK');
    const githubLink = getEnv('PROJECT_GITHUB_LINK');
    const techRaw = getEnv('PROJECT_TECH_STACK');
    const techStack = techRaw
      ? techRaw.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const payload = { title, description, image, liveLink, githubLink, techStack };

    const updated = await Project.findOneAndUpdate(
      { title },
      { $set: payload },
      { upsert: true, new: true }
    );

    console.log(`✅ Upserted project: ${updated.title}`);
    if (updated.githubLink) console.log(`   GitHub: ${updated.githubLink}`);
    if (updated.liveLink) console.log(`   Live:   ${updated.liveLink}`);
    if (updated.techStack?.length) console.log(`   Tech:   ${updated.techStack.join(', ')}`);

    await mongoose.disconnect();
    console.log('✅ Done');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  }
}

run();
