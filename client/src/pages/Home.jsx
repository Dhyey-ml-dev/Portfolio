import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  CheckCircle2,
  Zap,
  Code2,
  BarChart3,
  Settings2,
  MessageCircle,
  Sparkles,
  X
} from 'lucide-react';

/* ─── Helpers ─────────────────────────────────── */

const FadeUp = ({ children, delay = 0, className = '', style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
};

/* ─── Rotating Skill Text ────────────────────── */

const SKILLS = ['Next.js', 'React', 'Python', 'Machine Learning', 'AI Systems'];

const RotatingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SKILLS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      style={{
        display: 'inline-flex',
        height: '1em',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        alignItems: 'flex-start',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={SKILLS[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="text-blue"
          style={{ display: 'block', whiteSpace: 'nowrap', fontWeight: 900 }}
        >
          {SKILLS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ─── Dashboard Mock ─────────────────────────── */

const DashboardMock = () => (
  <div className="dashboard-preview">
    <div className="dash-header">
      <div className="dash-dot" />
      <div className="dash-dot" />
      <div className="dash-dot" />
    </div>
    <div className="dash-bar" style={{ width: '55%' }} />
    <div className="dash-chart">
      <div className="dash-chart-line" />
      {[35, 55, 45, 70, 55, 80, 65, 90].map((h, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${i * 12.5}%`,
            width: '8%',
            height: `${h}%`,
            background: 'rgba(96,165,250,0.35)',
            borderRadius: '3px 3px 0 0',
          }}
        />
      ))}
    </div>
    <div className="dash-bar" style={{ width: '80%' }} />
    <div className="dash-grid-preview">
      <div className="dash-cell" />
      <div className="dash-cell" />
      <div className="dash-cell" />
      <div className="dash-cell" />
    </div>
  </div>
);

/* ─── Project Card ───────────────────────────── */

const ProjectCard = ({ project, index, onProjectClick }) => (
  <FadeUp delay={index * 80}>
    <motion.div
      className="card project-card card-glow"
      style={{ padding: 0, height: '100%' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
    >
      <div className="project-card__img" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
        {project.image ? (
          <img src={`http://localhost:5001${project.image}`} alt={project.title} />
        ) : (
          <div className="project-card__img-placeholder">
            <Sparkles size={40} strokeWidth={1.2} />
          </div>
        )}
      </div>
      <div className="project-card__body">
        <div className="project-card__num">Project {String(index + 1).padStart(2, '0')}</div>
        <div className="project-card__title">{project.title}</div>
        <div className="project-card__desc">{project.description}</div>
        <button 
          onClick={() => onProjectClick(project)} 
          className="project-card__cta" 
          style={{ 
            background: 'none', border: 'none', color: 'inherit', 
            padding: 0, cursor: 'pointer', font: 'inherit', 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            appearance: 'none', textAlign: 'left'
          }}
        >
          View case study <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  </FadeUp>
);

/* ─── Section Header ─────────────────────────── */

const SectionHeader = ({ label, title, subtitle, align = 'left', titleStyle = {} }) => (
  <FadeUp>
    <div style={{ textAlign: align, marginBottom: '4rem' }}>
      {label && <div className="section-label">{label}</div>}
      <h2 className="section-title" style={titleStyle}>{title}</h2>
      {subtitle && <p className="section-subtitle" style={align === 'center' ? { margin: '0 auto' } : {}}>{subtitle}</p>}
    </div>
  </FadeUp>
);

/* ─── Page ───────────────────────────────────── */

const Home = ({ settings }) => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const caseStudiesData = {
    'Solar System Portfolio': "Your Solar System Portfolio is not a normal website but a fully interactive 3D experience where users explore your work like they are traveling through space. You built this using Three.js along with React and Tailwind CSS, which allows you to create real-time 3D graphics directly in the browser. In this project, the Sun is placed at the center and acts as the main light source, and all eight planets revolve around it smoothly with continuous animations, creating a realistic solar system environment. You also added background stars and ambient space sound, which makes the experience feel cinematic and immersive rather than just a webpage. Each planet is interactive, so when a user clicks on a specific planet, it responds to that action. The most important interaction is with Earth, where clicking it triggers a smooth camera zoom and transition into your main portfolio content, making the entry feel like a story rather than a simple page load. This project mainly shows your ability to combine creativity with advanced frontend development, including handling animations, managing camera movements, and creating interactive experiences using real-time rendering. Unlike traditional portfolios that use simple scrolling and templates, your portfolio focuses on storytelling and engagement, which makes it unique, memorable, and a strong representation of your design and technical skills. However, because it uses 3D rendering, it can be heavy on performance for low-end devices and requires optimization to run smoothly on all systems.",
    'CreditCheck AI': "CreditCheck AI is a web-based system that you developed to predict whether a person is eligible for credit approval using machine learning combined with a Django backend. The idea behind this project is to replace slow and manual decision-making processes with a faster and more consistent automated system. In this application, users enter their financial details such as income, employment status, loan history, and more advanced factors like Debt-to-Income Ratio, which are important in determining financial stability. This data is then sent to a trained machine learning model, such as Random Forest or XGBoost, which analyzes patterns in the data and predicts whether the application should be approved or rejected. One of the strongest parts of your project is that it doesn’t just give a result but also explains the decision using SHAP, which shows which factors influenced the outcome and why the model made that prediction. This makes the system more transparent and closer to real-world financial applications where explainability is very important. The system works quickly and can generate results within seconds, reducing human effort and avoiding inconsistent judgments. It is also designed in a way that it can be expanded into a real industry-level system by adding features like APIs, fraud detection, and analytics dashboards. However, like any machine learning system, it has limitations such as dependency on the quality of the dataset, the possibility of bias in predictions, the need for regular updates to the model, and the lack of real-world banking data, which can affect accuracy. Overall, this project shows your ability to combine web development with applied machine learning in a practical and meaningful way.",
    'Jarvis Voice Assistant': "Jarvis is a fully Python-based intelligent voice assistant that you built to create a smart and interactive system capable of understanding voice commands, performing tasks, and answering questions in real time. It runs locally on your system and continuously listens to the user through a microphone, converting spoken language into text using a speech-to-text engine. Once the input is converted into text, it is passed through a central routing system that decides whether the input is a command or a general question. If it is a command, Jarvis can perform actions like opening applications, searching on the internet, or automating tasks. If it is a question or requires explanation, the system connects with advanced AI models like Gemini or GPT to generate intelligent and conversational responses. One of the key features of Jarvis is its multilingual capability, where it can understand and respond in languages like English, Hindi, and Gujarati, either automatically or based on user preference. You also built a modern web-based interface for it that runs on a local server and can be accessed through a browser, which includes features like a chat display, microphone controls, continuous listening mode, and status indicators that show whether the assistant is listening, thinking, or speaking. To make the interaction more natural, Jarvis uses text-to-speech technology to reply in a human-like voice. Additionally, the system stores all interactions in a database like SQLite, including the voice command, its text version, the response, timestamps, and language details, and even allows exporting this data to Excel for analysis. This project combines multiple complex systems such as voice processing, AI integration, automation, database management, and frontend UI into one powerful assistant, making it highly practical, scalable, and impressive, although it depends on microphone quality, internet connection for AI responses, and speech recognition accuracy.",
    'Shabari Restaurant Web App': "The Shabari Restaurant Web App is a complete full-stack project that you built to create a digital platform for a restaurant where users can browse the menu and the admin can manage all the content dynamically. The frontend of the website is designed to be clean, modern, and user-friendly, allowing customers to easily explore food items, view categories, and check details like images, prices, and descriptions. Instead of using static content, the website is connected to a backend system through APIs, which means all the data is dynamic and can be updated at any time. The most important part of this project is the admin panel, which acts like a control center for the entire website. It includes a secure login system so only authorized users can access it, and it allows the admin to perform full CRUD operations, meaning they can add new food items, edit existing ones, delete items, and update details like price, category, and images. The admin can also manage categories, which helps organize the menu properly on the frontend. Whenever any change is made in the admin panel, it reflects instantly on the website, making the system efficient and easy to manage. This project follows a real-world architecture where the frontend, backend, and database are all connected, making it similar to actual restaurant management systems used in businesses. It demonstrates your ability to build complete systems, not just user interfaces, and shows strong understanding of full-stack development, API integration, and dynamic data handling. However, it requires proper backend maintenance, secure authentication handling, and scaling considerations if used in a real production environment."
  };

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/projects')
      .then((r) => setProjects(r.data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/contact', form);
      setFormStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const displayProjects =
    projects.length > 0
      ? projects
      : [
          { _id: '1', title: 'Solar System Portfolio', description: 'Interactive 3D portfolio built with Three.js featuring planet-based navigation and immersive storytelling.', image: '/project_solar.png', link: '#' },
          { _id: '2', title: 'CreditCheck AI', description: 'Machine learning-based credit approval system using Random Forest and XGBoost with explainable AI (SHAP).', image: '/project_creditcheck.png', link: '#' },
          { _id: '3', title: 'Jarvis Voice Assistant', description: 'AI-powered multilingual voice assistant with speech recognition, automation, and real-time interaction.', image: '/project_jarvis.jpg', link: '#' },
          { _id: '4', title: 'Shabari Restaurant Web App', description: 'Full-stack restaurant platform with admin panel for real-time menu and category management.', image: '/project_shabari.jpg', link: '#' },
        ];

  return (
    <main style={{ paddingTop: '80px' }}>

      {/* ═══════════════════════════════ HERO */}
      <section className="hero" id="home" style={{ padding: '0 0 5rem' }}>
        {/* Background squares */}
        {[
          { w: 200, h: 200, top: '8%', right: '38%', opacity: 0.035 },
          { w: 120, h: 120, top: '60%', right: '42%', opacity: 0.025 },
          { w: 80,  h: 80,  top: '25%', right: '30%', opacity: 0.02  },
        ].map((sq, i) => (
          <div
            key={i}
            className="hero__sq"
            style={{ width: sq.w, height: sq.h, top: sq.top, right: sq.right, opacity: sq.opacity }}
          />
        ))}

        <div className="container" style={{ width: '100%' }}>
          <div className="hero__grid">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div className="hero__badge">
                <span className="hero__badge-dot" />
                Available for new projects
              </div>

              {/* Eyebrow */}
              <p className="hero-eyebrow" style={{ marginBottom: '1.25rem' }}>
                DS TECHVIBE · Developer & AI Engineer
              </p>

              {/* Headline */}
              <h1 className="hero-title" style={{ marginBottom: '1.75rem' }}>
                Your go-to engineer<br />
                for{' '}
                <RotatingText />
                <br />
                <span style={{ color: 'var(--gray-500)' }}>web applications</span>
              </h1>

              {/* Sub */}
              <p className="hero-sub" style={{ marginBottom: '3rem' }}>
                Bringing ideas to life with clean, scalable code. Specializing in AI systems, full-stack development, and intelligent automation.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <motion.a
                  href="#contact"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact me <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="#projects"
                  className="btn btn-ghost"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View projects
                </motion.a>
              </div>
            </motion.div>

            {/* Right — Portrait */}
            <motion.div
              className="hero__img-wrap"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero__img-container">
                <div className="hero__bg-grid" />
                <img src="/hero-portrait.png" alt="DS TECHVIBE" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ TRUST BAR */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-bar__inner">
            {[
              { label: 'Current Role', value: 'Data Scientist · BrainyBeam' },
              { label: 'Projects Shipped', value: '4 Projects Shipped' },
              { label: 'Core Expertise', value: 'AI + Full-Stack' },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div className="trust-bar__item">
                  <div className="trust-bar__label">{item.label}</div>
                  <div className="trust-bar__value">{item.value}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════ FEATURED PROJECT */}
      <section id="featured">
        <div className="container">
          <SectionHeader
            label="Case Study"
            title="Discover what I've created"
            subtitle="A deep look at our most technically demanding AI implementation."
          />

          <FadeUp delay={100}>
            <div className="featured__inner">
              {/* Left */}
              <div>
                <div className="featured__tag">
                  <Sparkles size={14} />
                  Featured Project
                </div>
                <h3
                  className="section-title"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '1.5rem' }}
                >
                  CreditCheck AI – Intelligent Credit Risk Prediction
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--gray-400)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Problem</h4>
                    <p>Manual credit approval is slow and inconsistent.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Solution</h4>
                    <p>ML models automate prediction, resulting in fast, consistent, explainable decisions using SHAP.</p>
                  </div>
                </div>

                <div className="featured__stats">
                  <div className="featured__stat-box">
                    <div className="featured__stat-val text-blue">94%</div>
                    <div className="featured__stat-label">Prediction Accuracy</div>
                  </div>
                  <div className="featured__stat-box">
                    <div className="featured__stat-val" style={{ color: 'var(--gray-200)' }}>−30%</div>
                    <div className="featured__stat-label">Default Rate Reduction</div>
                  </div>
                </div>

                {/* Tech stack tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
                  {['XGBoost', 'Python', 'FastAPI', 'React', 'PostgreSQL'].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.85rem',
                        borderRadius: '9999px',
                        border: '1px solid var(--border-md)',
                        color: 'var(--gray-400)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — dashboard preview */}
              <div>
                <DashboardMock />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════ PROJECTS GRID */}
      <section id="projects" style={{ background: 'var(--bg-1)' }}>
        <div className="container">
          <SectionHeader
            label="Selected Works"
            title="Projects I'm proud of"
            subtitle="A curated collection of results-driven products built with precision and purpose."
          />
          <div className="projects-grid">
            {displayProjects.map((p, i) => (
              <ProjectCard key={p._id || i} project={p} index={i} onProjectClick={setSelectedCaseStudy} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SERVICES */}
      <section id="services">
        <div className="container">
          <SectionHeader
            label="Expertise"
            title="What I do best"
            subtitle="Strategic, scalable solutions tailored to move your business forward."
          />
          <div className="services__grid">
            {[
              {
                num: '01',
                icon: <Zap size={18} />,
                title: 'AI Web Applications',
                desc: 'Intelligent dashboards, LLM-powered tools, and custom AI interfaces that solve real business problems.',
              },
              {
                num: '02',
                icon: <Code2 size={18} />,
                title: 'Full-Stack Development',
                desc: 'Secure, performant architectures built with Next.js, React, Node.js, and modern cloud infrastructure.',
              },
              {
                num: '03',
                icon: <BarChart3 size={18} />,
                title: 'Data Science Solutions',
                desc: 'Predictive modeling, deep data analysis, and ML pipelines that surface actionable business insights.',
              },
              {
                num: '04',
                icon: <Settings2 size={18} />,
                title: 'Business Automation',
                desc: 'End-to-end workflow automation that eliminates repetitive tasks, saves time, and boosts efficiency.',
              },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 80}>
                <motion.div
                  className="service-item"
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <div className="service-item__num">{s.num}</div>
                    <div style={{ color: 'var(--gray-700)' }}>{s.icon}</div>
                  </div>
                  <div className="service-item__title">{s.title}</div>
                  <div className="service-item__desc">{s.desc}</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ WHY CHOOSE ME */}
      <section id="why" style={{ background: 'var(--bg-1)' }}>
        <div className="container">
          <div className="why__grid">
            <FadeUp>
              <div>
                <div className="section-label">Why work with me</div>
                <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
                  Technical depth meets<br />
                  <span className="text-accent">business clarity</span>
                </h2>
                <p className="section-subtitle">
                  I combine deep engineering expertise with a sharp understanding of product goals — shipping code that actually moves the needle.
                </p>
              </div>
            </FadeUp>

            <div className="why__features">
              {[
                { icon: <Zap size={16} />, title: 'AI + Web Expertise', desc: 'Bridging ML complexity with user-friendly, production-ready interfaces.' },
                { icon: <CheckCircle2 size={16} />, title: 'Scalable Code', desc: 'Industry-standard practices ensuring longevity and maintainability.' },
                { icon: <BarChart3 size={16} />, title: 'Business-Focused', desc: 'Every decision is driven by ROI, user growth, and real-world impact.' },
                { icon: <MessageCircle size={16} />, title: 'Fast Communication', desc: 'Direct access and transparent updates from kickoff to launch.' },
              ].map((f, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <div className="why__feature">
                    <div className="why__feature-icon">{f.icon}</div>
                    <div className="why__feature-title">{f.title}</div>
                    <div className="why__feature-desc">{f.desc}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ TESTIMONIALS */}
      <section>
        <div className="container">
          <SectionHeader label="Testimonials" title="Words from clients" subtitle="What the people I've worked with have to say." />
          <div className="testimonials__grid">
            {[
              {
                text: 'DS TECHVIBE transformed our manual process into a fully automated AI system. The efficiency gains were immediate and measurable.',
                author: 'CEO, BrainyBeam Technologies',
              },
              {
                text: "The cleanest code we've ever integrated. The focus on scalability made a massive difference when we scaled to 10× users.",
                author: 'CTO, Nexus Platform',
              },
            ].map((t, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="testimonial-card">
                  <p className="testimonial-card__text">"{t.text}"</p>
                  <p className="testimonial-card__author">— {t.author}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CONTACT */}
      <section id="contact" style={{ paddingBottom: '10rem' }}>
        <div className="container">
          <FadeUp>
            <div className="contact__inner">
              <div className="contact__grid">
                {/* Left info */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '3rem' }}>
                  <div>
                    <div className="section-label">Get in touch</div>
                    <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
                      Let's build something <span className="text-accent">impactful</span> together
                    </h2>
                    <p className="section-subtitle">
                      Have a project in mind? I'm open to discussing new opportunities, freelance work, and exciting challenges.
                    </p>
                  </div>

                  <div className="contact__info">
                    <a
                      href={`mailto:${settings?.contactInfo?.email || 'pavagadhidhyey2@gmail.com'}`}
                      className="contact__email-link"
                    >
                      <div className="contact__email-icon">
                        <Mail size={18} />
                      </div>
                      <span style={{ fontSize: '0.95rem' }}>
                        {settings?.contactInfo?.email || 'pavagadhidhyey2@gmail.com'}
                      </span>
                    </a>

                    <motion.a
                      href="https://wa.me/919265783369"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      style={{ alignSelf: 'flex-start', gap: '10px', background: 'rgba(37,211,102,0.08)', borderColor: 'rgba(37,211,102,0.2)', color: '#4ade80' }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <MessageCircle size={16} /> WhatsApp Me
                    </motion.a>
                  </div>
                </div>

                {/* Right form */}
                <form onSubmit={handleSubmit} className="contact__form">
                  <div className="form-row">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <input
                      className="form-input"
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                  <motion.button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message <ArrowRight size={16} />
                  </motion.button>
                  {formStatus === 'success' && (
                    <p style={{ textAlign: 'center', color: '#4ade80', fontSize: '0.88rem' }}>
                      ✓ Message sent! I'll get back to you soon.
                    </p>
                  )}
                  {formStatus === 'error' && (
                    <p style={{ textAlign: 'center', color: '#f87171', fontSize: '0.88rem' }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════ FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <span className="footer__copy">© 2026 DS TECHVIBE All rights reserved.</span>
          <div className="footer__links">
            <a href="#home" className="footer__link">Home</a>
            <a href="#projects" className="footer__link">Work</a>
            <a href="#contact" className="footer__link">Contact</a>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__link" style={{ display: 'flex' }}>
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__link" style={{ display: 'flex' }}>
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${settings?.contactInfo?.email || 'pavagadhidhyey2@gmail.com'}`} className="footer__link" style={{ display: 'flex' }}>
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setSelectedCaseStudy(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                backgroundColor: 'var(--gray-900)', border: '1px solid var(--gray-800)',
                borderRadius: '16px', padding: '2rem', maxWidth: '800px', width: '90%',
                maxHeight: '85vh', overflowY: 'auto', position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCaseStudy(null)}
                style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
              
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>
                {selectedCaseStudy.title}
              </h2>
              {selectedCaseStudy.image && (
                <img 
                  src={`http://localhost:5001${selectedCaseStudy.image}`} 
                  alt={selectedCaseStudy.title}
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.5rem' }}
                />
              )}
              <div style={{ color: 'var(--gray-400)', fontSize: '1.05rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {caseStudiesData[selectedCaseStudy.title] || selectedCaseStudy.description}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Home;
