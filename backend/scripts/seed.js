import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from '../src/models/Project.js';
import Skill from '../src/models/Skill.js';
import Testimonial from '../src/models/Testimonial.js';

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');

    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Testimonial.deleteMany({});

    await Project.insertMany([
      { title: 'Portfolio Site', description: 'Modern React + Tailwind portfolio', image: '', liveLink: '#', githubLink: '#', techStack: ['React', 'Tailwind', 'Express'] },
      { title: 'API Server', description: 'Express + MongoDB REST API', image: '', liveLink: '#', githubLink: '#', techStack: ['Node', 'Express', 'MongoDB'] }
    ]);

    await Skill.insertMany([
      { name: 'JavaScript', icon: '', proficiency: 85 },
      { name: 'React', icon: '', proficiency: 80 },
      { name: 'Node.js', icon: '', proficiency: 75 }
    ]);

    await Testimonial.insertMany([
      { name: 'John Doe', role: 'Client', message: 'Great collaboration and delivery!', image: '' },
      { name: 'Jane Smith', role: 'Manager', message: 'Professional and timely work.', image: '' }
    ]);

    console.log('Seeded data');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();
