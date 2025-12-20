import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Skill from '../src/models/Skill.js';

dotenv.config();

const skills = [
  // LeetCode DSA topics
  { name: 'Array (LeetCode)', proficiency: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Dynamic Programming (LeetCode)', proficiency: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Hash Table (LeetCode)', proficiency: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Binary Search (LeetCode)', proficiency: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Monotonic Stack (LeetCode)', proficiency: 55, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Union Find (LeetCode)', proficiency: 55, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'String (LeetCode)', proficiency: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Sorting (LeetCode)', proficiency: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  // Competitive profiles summary
  { name: 'LeetCode Contest Rating: 1732', proficiency: 75, icon: 'https://assets.leetcode.com/static_assets/public/icons/favicon-16x16.png' },
  { name: 'LeetCode Problems Solved: 234', proficiency: 80, icon: 'https://assets.leetcode.com/static_assets/public/icons/favicon-16x16.png' },
  { name: 'CodeChef Rating: 1622 (Div 2, 3★)', proficiency: 65, icon: 'https://cdn.codechef.com/images/cc-logo.svg' },
  { name: 'CodeChef Problems Solved: 27', proficiency: 55, icon: 'https://cdn.codechef.com/images/cc-logo.svg' },
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');

  for (const s of skills) {
    const updated = await Skill.findOneAndUpdate(
      { name: s.name },
      { $set: { icon: s.icon, proficiency: s.proficiency } },
      { upsert: true, new: true }
    );
    console.log(`Upserted: ${updated.name} -> ${updated.proficiency}%`);
  }

  await mongoose.disconnect();
  console.log('✅ Finished importing competitive skills');
  process.exit(0);
}

run().catch(err => {
  console.error('❌ Import failed:', err.message);
  process.exit(1);
});
