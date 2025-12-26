import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from '../src/models/Project.js';

dotenv.config();

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v;
}

async function fetchRepo(repoSlug) {
  const url = `https://api.github.com/repos/${repoSlug}`;
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json'
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub request failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function run() {
  try {
    const uri = requireEnv('MONGODB_URI');
    const repo = requireEnv('GITHUB_REPO'); // owner/repo

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const data = await fetchRepo(repo);

    const title = data.name || repo.split('/').pop();
    const description = process.env.PROJECT_DESCRIPTION || data.description || '';
    const githubLink = data.html_url || `https://github.com/${repo}`;
    const liveLink = process.env.PROJECT_LIVE_LINK || data.homepage || '';
    const techStack = []; // Could be enhanced via topics API with auth token

    const payload = { title, description, githubLink, liveLink, techStack };

    const updated = await Project.findOneAndUpdate(
      { title },
      { $set: payload },
      { upsert: true, new: true }
    );

    console.log(`✅ Upserted project: ${updated.title}`);
    if (updated.githubLink) console.log(`   GitHub: ${updated.githubLink}`);
    if (updated.liveLink) console.log(`   Live:   ${updated.liveLink}`);
    if (updated.description) console.log(`   Desc:   ${updated.description}`);

    await mongoose.disconnect();
    console.log('✅ Done');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  }
}

run();
