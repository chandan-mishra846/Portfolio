import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from '../src/models/Project.js';
import Skill from '../src/models/Skill.js';
import Testimonial from '../src/models/Testimonial.js';

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Testimonial.deleteMany({});

    await Project.insertMany([
      {
        title: 'Filter Your University',
        description: 'College filtering web app helping students find their perfect university match based on preferences, rankings, and location with interactive search.',
        image: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black',
        liveLink: 'https://universityfilter.vercel.app/',
        githubLink: 'https://github.com/chandan-mishra846/filter-your-university',
        techStack: ['React', 'JavaScript', 'CSS', 'API Integration']
      },
      {
        title: 'E-commerce Website',
        description: 'Dynamic e-commerce fashion website built with HTML, CSS & JavaScript featuring product pages, cart system with localStorage, and responsive design.',
        image: 'https://img.shields.io/badge/HTML-E34C26?style=for-the-badge&logo=html5&logoColor=white',
        liveLink: '',
        githubLink: 'https://github.com/chandan-mishra846/ecommerce-website',
        techStack: ['HTML', 'CSS', 'JavaScript', 'localStorage']
      },
      {
        title: 'E-commerce Backend',
        description: 'Full-featured REST API backend for e-commerce platform with Node.js and Express, handling product management, orders, and user authentication.',
        image: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white',
        liveLink: 'https://ecommerce-frontend-two-dun.vercel.app/',
        githubLink: 'https://github.com/chandan-mishra846/ecommerce-backend',
        techStack: ['Node.js', 'Express', 'MongoDB']
      },
      {
        title: 'E-commerce Frontend',
        description: 'Modern React frontend for e-commerce platform with interactive UI, product filtering, shopping cart, and checkout functionality.',
        image: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black',
        liveLink: 'https://ecommerce-frontend-two-dun.vercel.app/',
        githubLink: 'https://github.com/chandan-mishra846/ecommerce-frontend',
        techStack: ['React', 'Axios', 'CSS', 'JavaScript']
      },
      {
        title: 'Stone Paper Scissors Game',
        description: 'Interactive Rock Paper Scissors game built with vanilla JavaScript featuring AI opponent, score tracking, and smooth animations.',
        image: 'https://img.shields.io/badge/Game-JavaScript-yellow?style=for-the-badge&logo=javascript',
        liveLink: '',
        githubLink: 'https://github.com/chandan-mishra846/stone-paper-scissors',
        techStack: ['HTML', 'CSS', 'JavaScript']
      },
      {
        title: 'Calendar Application',
        description: 'Full-featured calendar application built with TypeScript featuring event management, date navigation, and beautiful UI with Tailwind CSS.',
        image: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white',
        liveLink: 'https://calander-xi.vercel.app/',
        githubLink: 'https://github.com/chandan-mishra846/Calander',
        techStack: ['TypeScript', 'React', 'Tailwind CSS']
      },
      {
        title: 'Portfolio Website',
        description: 'Modern, responsive portfolio website with smooth animations, dark mode toggle, dynamic content from backend, and beautiful UI/UX design.',
        image: 'https://img.shields.io/badge/Portfolio-React-blue?style=for-the-badge&logo=react',
        liveLink: '',
        githubLink: 'https://github.com/chandan-mishra846/Portfolio',
        techStack: ['React', 'Vite', 'Tailwind', 'Express', 'MongoDB', 'Framer Motion']
      }
    ]);

    await Skill.insertMany([
      // Frontend
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', proficiency: 90 },
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', proficiency: 85 },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', proficiency: 85 },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', proficiency: 70 },
      { name: 'HTML & CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', proficiency: 90 },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', proficiency: 80 },
      
      // Backend
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', proficiency: 80 },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', proficiency: 80 },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', proficiency: 75 },
      { name: 'Mongoose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg', proficiency: 75 },
      { name: 'REST API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', proficiency: 85 },
      
      // DSA
      { name: 'Data Structures', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', proficiency: 80 },
      { name: 'Algorithms', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', proficiency: 75 },
      { name: 'LeetCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', proficiency: 85 },
      { name: 'CodeChef', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', proficiency: 70 },
      
      // Tools
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', proficiency: 85 },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', proficiency: 85 },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', proficiency: 90 },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', proficiency: 80 },
      { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', proficiency: 75 },
      
      // Other

      { name: 'Axios', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg', proficiency: 85 },
      { name: 'JWT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', proficiency: 70 }
    ]);

    await Testimonial.insertMany([
      { name: 'Sarah Johnson', role: 'Project Manager', message: 'Chandan delivered an excellent e-commerce platform ahead of schedule. His attention to detail and problem-solving skills are outstanding!', image: '' },
      { name: 'Alex Chen', role: 'Design Lead', message: 'Fantastic developer to work with. Converted our designs into pixel-perfect React components with smooth animations.', image: '' },
      { name: 'Emma Wilson', role: 'Client', message: 'Professional, reliable, and highly skilled. The portfolio website looks amazing and performs beautifully!', image: '' }
    ]);

    console.log('✅ Seeded 7 projects, 22 skills, 3 testimonials successfully!');
    process.exit(0);
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
}

run();
