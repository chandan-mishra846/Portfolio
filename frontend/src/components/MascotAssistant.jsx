import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function MascotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [mood, setMood] = useState('happy'); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: null, y: null });
  const [message, setMessage] = useState("Namaste! I'm your guide! Hover over anything to learn more!");
  const [isGone, setIsGone] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const voicesRef = useRef(null);
  const clickCount = useRef(0);
  const hasWelcomed = useRef(false);

  // 1. Voice Setup with Indian Accent
  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    const indianVoice = availableVoices.find(v => 
      (v.lang.includes('en-IN') || v.lang.includes('hi-IN')) && 
      (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Heera'))
    );
    voicesRef.current = indianVoice || availableVoices[0];
  }, []);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    
    // Welcome message on page load
    if (!hasWelcomed.current) {
      hasWelcomed.current = true;
      setTimeout(() => {
        const welcomeMessages = [
          "Oohoo! Someone came to visit the portfolio! Welcome!",
          "Namaste! I'm so happy you're here! Let's explore together!",
          "Welcome welcome welcome! Ready to see some amazing work?",
          "Heyy! Great to see you here! I'm your guide, let's get started!"
        ];
        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        setMood('happy');
        speak(randomWelcome, 'happy');
      }, 500);
    }
  }, [loadVoices]);

  const speak = useCallback((text, currentMood = 'happy') => {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech and clear immediately
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessage(text); // Update message instantly

    // Create and speak new utterance immediately
    const utterance = new SpeechSynthesisUtterance(text);
    if (voicesRef.current) utterance.voice = voicesRef.current;
    
    utterance.pitch = currentMood === 'angry' ? 0.8 : currentMood === 'blushing' ? 2.2 : 1.8; 
    utterance.rate = 1; // Normal speed
    utterance.volume = 1; // Max volume
    utterance.onstart = () => { setIsSpeaking(true); setIsOpen(true); };
    utterance.onend = () => { setIsSpeaking(false); setIsOpen(false); };
    utterance.onerror = () => { setIsSpeaking(false); };
    
    window.speechSynthesis.speak(utterance);
  }, []);

  // 2. SMART INTERACTIONS: Projects, Buttons, etc.
  useEffect(() => {
    // Project card HOVER (not click)
    const handleProjectHover = (e) => {
      if (isGone) return;
      const projectCard = e.target.closest('[data-project-title]');
      if (projectCard) {
        setHasInteracted(true);
        const title = projectCard.getAttribute('data-project-title');
        const desc = projectCard.getAttribute('data-project-desc');
        setMood('blushing');
        const messages = [
          `Wow! ${title}! ${desc.substring(0, 70)}... Dekho the tech stack below!`,
          `${title} is really cool! ${desc.substring(0, 70)}... Check out the live demo!`,
          `Oho! This project - ${title}! Amazing work here. Want to see it live?`
        ];
        speak(messages[Math.floor(Math.random() * messages.length)], 'blushing');
      }
    };

    // About section hover
    const handleAboutHover = (e) => {
      if (isGone) return;
      const aboutSection = e.target.closest('[data-about-section]');
      if (aboutSection) {
        setHasInteracted(true);
        setMood('happy');
        const messages = [
          "Let me tell you about him! IIIT Vadodara student, 234 LeetCode problems crushed with 1750+ rating, 97.4 percentile in JEE! Bahut smart hai!",
          "This section has all the juicy details! B.Tech student with 1750+ LeetCode rating and serious coding skills. Look at those stats!",
          "About section! He's from IIIT Vadodara, 1750+ LeetCode rating, loves solving problems, and has amazing JEE percentile. Very impressive!"
        ];
        speak(messages[Math.floor(Math.random() * messages.length)], 'happy');
      }
    };

    // Education/Experience hovers
    const handleEducationHover = (e) => {
      if (isGone) return;
      const eduItem = e.target.closest('[data-education-title]');
      if (eduItem) {
        setHasInteracted(true);
        const title = eduItem.getAttribute('data-education-title');
        const place = eduItem.getAttribute('data-education-place');
        setMood('happy');
        const messages = [
          `${title} from ${place}! This is a key milestone in his journey!`,
          `Arre wah! ${place} - ${title}! Education bhi bohot achha hai!`,
          `Check this out - ${title} at ${place}! Such an impressive background!`
        ];
        speak(messages[Math.floor(Math.random() * messages.length)], 'happy');
      }
    };

    // Hire Me / Contact button hovers
    const handleButtonHover = (e) => {
      if (isGone) return;
      const btn = e.target.closest('[data-mascot-trigger]');
      if (btn) {
        setHasInteracted(true);
        const trigger = btn.getAttribute('data-mascot-trigger');
        
        const messages = {
          'hire': { mood: 'blushing', texts: [
            "Ohhh! Ready to hire? That's wonderful! Just scroll down and fill the contact form below!",
            "You want to work with him? Smart choice! The contact form is waiting for you!",
            "Hire karna chahte ho? Perfect! Fill the form and let's make it happen!"
          ]},
          'contact': { mood: 'happy', texts: [
            "Ready to connect? Fill in your details and he'll get back super quick!",
            "Contact form time! Share your details and start the conversation!",
            "Let's connect! Fill this form and he'll reply faster than you can say 'JavaScript'!"
          ]},
          'viewwork': { mood: 'happy', texts: [
            "Curious about his projects? Scroll down to see the amazing work!",
            "Want to see what he's built? Projects section is just below!",
            "Ready to explore his portfolio? Scroll down for some cool projects!"
          ]},
          'github': { mood: 'happy', texts: [
            "GitHub! Where all the magic code lives! Click to explore his repositories!",
            "Checking out the code? Very smart! His GitHub has tons of projects!",
            "Code enthusiast? His GitHub profile is waiting for you!"
          ]},
          'linkedin': { mood: 'happy', texts: [
            "LinkedIn pe connect karna? Professional networking ka best platform!",
            "Professional connection time! LinkedIn is the place to be!",
            "Want to connect professionally? LinkedIn is calling!"
          ]},
          'leetcode': { mood: 'happy', texts: [
            "LeetCode warrior! 234 problems solved with 1750+ rating! He's a problem-solving machine!",
            "LeetCode profile! Iska rating dekho - 1750+! Very impressive!",
            "234 problems solved on LeetCode with 1750+ rating! That's serious dedication!"
          ]},
          'codechef': { mood: 'blushing', texts: [
            "CodeChef 3 star! 1622 rating! Competitive programming master hai ye!",
            "3 stars on CodeChef! Very impressive competitive programming skills!",
            "CodeChef! Where he proves his algorithmic prowess!"
          ]},
          'twitter': { mood: 'happy', texts: [
            "Twitter pe milte hain! Follow for tech updates and insights!",
            "Social butterfly mode! Click to follow on Twitter!",
            "Stay updated! His Twitter has all the latest thoughts!"
          ]},
          'email': { mood: 'happy', texts: [
            "Direct email? Old school but professional! Click to send!",
            "Email karna hai? Classic communication method!",
            "Professional email contact! Click to reach out directly!"
          ]},
          'live': { mood: 'blushing', texts: [
            "Live demo dekho! See the project in action!",
            "Want to test it yourself? Live version is just a click away!",
            "Click to see this project running live! It's amazing!"
          ]},
          'projectgithub': { mood: 'happy', texts: [
            "Source code time! Dive into the implementation details!",
            "GitHub repository! See how it's built from scratch!",
            "Want to see the code? Click to explore the repository!"
          ]}
        };
        
        const msg = messages[trigger];
        if (msg) {
          const randomText = msg.texts[Math.floor(Math.random() * msg.texts.length)];
          setMood(msg.mood);
          speak(randomText, msg.mood);
        }
      }
    };

    // Skills section hover
    const handleSkillHover = (e) => {
      if (isGone) return;
      const skill = e.target.closest('[data-skill-name]');
      if (skill) {
        setHasInteracted(true);
        const skillName = skill.getAttribute('data-skill-name');
        setMood('happy');
        const messages = [
          `${skillName}! He's really good with this technology!`,
          `${skillName} expert here! Check that proficiency level!`,
          `Wow, ${skillName}! He's been mastering this one!`,
          `${skillName}! This skill is in his toolkit!`
        ];
        speak(messages[Math.floor(Math.random() * messages.length)], 'happy');
      }
    };

    window.addEventListener('mouseover', handleProjectHover);
    window.addEventListener('mouseover', handleButtonHover);
    window.addEventListener('mouseover', handleSkillHover);
    window.addEventListener('mouseover', handleEducationHover);
    window.addEventListener('mouseover', handleAboutHover);
    
    return () => {
      window.removeEventListener('mouseover', handleProjectHover);
      window.removeEventListener('mouseover', handleButtonHover);
      window.removeEventListener('mouseover', handleSkillHover);
      window.removeEventListener('mouseover', handleEducationHover);
      window.removeEventListener('mouseover', handleAboutHover);
    };
  }, [isGone, speak]);

  const handleReturn = () => {
    setIsGone(false);
    clickCount.current = 0;
    setMood('blushing');
    const comebackMessages = [
      "Aa gye na meri yaad! I knew you'd miss me! 😊",
      "Aa gye na! I was waiting for you to bring me back! Itni tezi se nahi chhode na mujhe...",
      "Dekho, aa hi gye! I'm so happy you wanted me back! Sach me itna miss kiya? 🥺",
      "Arre, aa gye finally! Meri yaad aayi na? 🥰 Main humesha aapke saath hu!",
      "Aww, you brought me back! Tum mujhe karte ho pass - that's so sweet! 💕",
      "Main return to ho gai! Chalo ab sath se portfolio explore karenge! Let's go!",
      "Badha tha main tumse... but I knew you'd come back for me! 🎉"
    ];
    const randomMessage = comebackMessages[Math.floor(Math.random() * comebackMessages.length)];
    speak(randomMessage, 'blushing');
  };

  // Click behavior
  const handleMascotClick = (e) => {
    e.stopPropagation();
    setHasInteracted(true);
    clickCount.current += 1;

    if (clickCount.current >= 8) {
      setMood('angry');
      speak("Bas! That's enough poking! I'm leaving now. Bye bye!", 'angry');
      setTimeout(() => setIsGone(true), 1500);

    } else if (clickCount.current >= 4) {
      setMood('angry');
      const angryMessages = [
        "Arre, stop poking me! I'm trying to help you, not get bullied! 😠",
        "Behave yourself! I'm your guide, not a toy! Dignity rakho meri! 💢",
        "Chalo, enough clicks! Focus on the portfolio instead of torturing me!",
        "Itna poking karte ho? Main ro dunga! 😤 Hover on content instead!",
        "Samajh nahi aata kya? Hover karo, click nahi! I'm getting frustrated! 🤨"
      ];
      speak(angryMessages[Math.floor(Math.random() * angryMessages.length)], 'angry');
    } else {
      setMood('surprised');
      const surprisedMessages = [
        "Oye! What are you doing? Hover on things to learn!",
        "Hehe! That tickles! But hover on the content instead!",
        "Arre! Click on the buttons and links, not on me!"
      ];
      speak(surprisedMessages[Math.floor(Math.random() * surprisedMessages.length)]);
    }
  };

  // Eyes tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 12, 
        y: (e.clientY / window.innerHeight - 0.5) * 15 
      });
    };
    const handleGlobalClick = (e) => {
      if (e.target.closest('.mascot-body') || isGone) return;
      setHasInteracted(true);
      setIsWalking(true); 
      setTargetPos({ x: e.clientX - 56, y: e.clientY - 120 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleGlobalClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [isGone]);

  if (isDisabled) return (
    <motion.button 
      onClick={() => { setIsDisabled(false); handleReturn(); }} 
      className="fixed bottom-10 right-10 z-[10000] bg-orange-600 text-white px-6 py-2 rounded-full font-mono text-xs shadow-2xl border-2 border-black hover:bg-orange-700 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      👋 ENABLE GUIDE
    </motion.button>
  );

  if (isGone) return (
    <button onClick={handleReturn} className="fixed bottom-10 right-10 z-[10000] bg-orange-600 text-white px-6 py-2 rounded-full font-mono text-xs shadow-2xl border-2 border-black hover:bg-orange-700">
      🔙 BRING BACK YOUR GUIDE
    </button>
  );

  return (
    <motion.div 
      className="fixed z-[9999] pointer-events-none"
      animate={{ left: targetPos.x ?? 'auto', top: targetPos.y ?? 'auto', right: targetPos.x === null ? 24 : 'auto', bottom: targetPos.y === null ? 96 : 'auto' }}
      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
      onAnimationComplete={() => setIsWalking(false)} 
      style={{ filter: 'drop-shadow(0 10px 30px rgba(251, 146, 60, 0.4)) drop-shadow(0 0 15px rgba(251, 146, 60, 0.3))' }}
    >
      <div className="flex flex-col items-center pointer-events-auto no-move relative mascot-body">
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-3 border-2 bg-black/90 rounded-xl font-mono text-[10px] shadow-2xl transition-all 
                ${mood === 'angry' ? 'border-red-500 text-red-400 shadow-red-500/50' : mood === 'blushing' ? 'border-pink-400 text-pink-300 shadow-pink-400/50' : 'border-orange-500 text-orange-400 shadow-orange-500/50'}`}
            >
              "{message}"
            </motion.div>
          )}
        </AnimatePresence>

        <div onClick={handleMascotClick}>
          <motion.div className="w-24 h-24 relative flex items-center justify-center rounded-full"
            animate={{ rotate: isWalking ? [0, -10, 10, 0] : 0, y: isWalking ? [0, -15, 0] : [0, -3, 0] }}
            transition={{ duration: 0.4, repeat: isWalking ? Infinity : 0 }}
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))' }}
          >
            <svg viewBox="0 0 100 140" className="w-full h-full overflow-visible fill-none stroke-black stroke-[3]">
              <motion.circle cx="50" cy="50" r="46" animate={{ fill: mood === 'angry' ? '#ef4444' : mood === 'blushing' ? '#fda4af' : '#fb923c' }} stroke="#000" strokeWidth="3" />
              <g transform="translate(35, 42)">
                 <ellipse cx="0" cy="0" rx="9" ry="14" fill="white" stroke="black" />
                 <motion.circle r="4.5" fill="black" animate={{ cx: mousePos.x, cy: mousePos.y }} />
                 <motion.circle cx="-8" cy="15" r="5" fill="#f472b6" animate={{ opacity: mood === 'blushing' ? 0.6 : 0 }} />
              </g>
              <g transform="translate(65, 42)">
                 <ellipse cx="0" cy="0" rx="9" ry="14" fill="white" stroke="black" />
                 <motion.circle r="4.5" fill="black" animate={{ cx: mousePos.x, cy: mousePos.y }} />
                 <motion.circle cx="8" cy="15" r="5" fill="#f472b6" animate={{ opacity: mood === 'blushing' ? 0.6 : 0 }} />
              </g>
              <motion.g>
                <motion.path 
                  d={mood === 'angry' ? "M 35 75 Q 50 65 65 75 Q 50 70 35 75 Z" : "M 35 70 Q 50 80 65 70 Q 50 78 35 70 Z"}
                  fill="white" stroke="black" strokeWidth="2.5" 
                  animate={isOpen ? { 
                    d: [
                      mood === 'angry' ? "M 35 75 Q 50 65 65 75 Q 50 70 35 75 Z" : "M 35 70 Q 50 80 65 70 Q 50 78 35 70 Z",
                      mood === 'angry' ? "M 35 75 Q 50 55 65 75 Q 50 60 35 75 Z" : "M 35 65 Q 50 90 65 65 Q 50 85 35 65 Z",
                      mood === 'angry' ? "M 35 75 Q 50 60 65 75 Q 50 65 35 75 Z" : "M 35 68 Q 50 88 65 68 Q 50 83 35 68 Z",
                      mood === 'angry' ? "M 35 75 Q 50 55 65 75 Q 50 60 35 75 Z" : "M 35 64 Q 50 92 65 64 Q 50 87 35 64 Z",
                      mood === 'angry' ? "M 35 75 Q 50 65 65 75 Q 50 70 35 75 Z" : "M 35 70 Q 50 80 65 70 Q 50 78 35 70 Z"
                    ]
                  } : { d: mood === 'angry' ? "M 35 75 Q 50 65 65 75 Q 50 70 35 75 Z" : "M 35 70 Q 50 80 65 70 Q 50 78 35 70 Z" }}
                  transition={{ 
                    repeat: isOpen ? Infinity : 0, 
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                />
              </motion.g>
              <g stroke="black" strokeWidth="3.5" fill="none">
                <motion.g animate={isWalking ? { rotate: [-35, 35, -35] } : { rotate: 0 }} style={{ originY: "92px", originX: "42px" }} transition={{ repeat: Infinity, duration: 0.5 }}>
                  <path d="M 42 92 L 42 120" strokeLinecap="round" /> <rect x="34" y="118" width="14" height="8" rx="4" fill="#000" />
                </motion.g>
                <motion.g animate={isWalking ? { rotate: [35, -35, 35] } : { rotate: 0 }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.25 }} style={{ originY: "92px", originX: "58px" }}>
                  <path d="M 58 92 L 58 120" strokeLinecap="round" /> <rect x="52" y="118" width="14" height="8" rx="4" fill="#000" />
                </motion.g>
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Disable Button */}
        <motion.button
          onClick={() => setIsDisabled(true)}
          className="mt-2 px-2 py-1 bg-gray-800 text-white rounded-md text-[8px] font-bold hover:bg-red-600 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Hide Miss Minutes"
        >
          ✕ DISABLE
        </motion.button>
      </div>
    </motion.div>
  );
}