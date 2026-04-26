const translations = {
  en: {
    navProjects: 'Projects', navSkills: 'Skills', navTerminal: 'Terminal', navAbout: 'About', navContact: 'Contact',
    devMode: 'Dev Mode', securityMode: 'Security Mode', eyebrow: 'Developer with a security mindset',
    heroTitle: 'Fullstack Developer & Ethical Hacker',
    heroText: 'I build practical web and mobile applications, while also learning how systems break, how to secure them, and how to communicate findings clearly.',
    viewProjects: 'View Projects', available: 'Open to fullstack and junior security roles',
    aboutEyebrow: 'About me',
    aboutTitle: 'Fullstack developer with an IT security foundation',
    aboutIntro: 'I am Ghanem Lamloumi, educated as both a fullstack web developer and IT security technician. I like working across different parts of IT: building applications, improving user experience, structuring content, and learning how systems can be secured.',
    aboutDevTitle: 'Development background',
    aboutDevText: 'Through my fullstack studies and LIA, I have worked with React Native, Expo, SQLite, WordPress themes and Elementor. I am strongest in JavaScript and TypeScript and continue building projects with modern web and mobile tools.',
    aboutSecTitle: 'Security mindset',
    aboutSecText: 'My IT security training gave me a base in Linux, DNS, Packet Tracer and Docker. I also keep my knowledge fresh through Hack The Box Academy and IT-related courses.',
    aboutWorkTitle: 'How I work',
    aboutWorkText: 'I am structured, self-driven and detail-oriented, but flexible enough to work independently or in a team. I enjoy varied tasks and like turning broad technical knowledge into practical results.',
    skillEyebrow: 'Capability map', skillsTitle: 'Skills that support both career paths',
    projectEyebrow: 'Selected work', projectsTitle: 'Projects built around development, security and automation',
    filterAll: 'All', roleFullstack: 'Fullstack', roleSecurity: 'Security', difficulty: 'Difficulty', whyItWorks: 'Why it works',
    featuredTitle: 'Featured projects', featuredNote: 'Best proof pieces for recruiters', allProjectsTitle: 'All projects', allProjectsNote: 'Filter by role focus',
    terminalTitle: 'Portfolio terminal', terminalIntro: 'Try commands like help, projects, skills, contact, security, fullstack or about.',
    contactEyebrow: 'Next step', contactTitle: 'Let’s build secure, useful software.', contactText: 'I am open to fullstack developer, junior ethical hacker, junior pentester and IT security technician opportunities.',
    viewProject: 'View Project'
  },
  sv: {
    navProjects: 'Projekt', navSkills: 'Kunskaper', navTerminal: 'Terminal', navAbout: 'Om mig', navContact: 'Kontakt',
    devMode: 'Dev-läge', securityMode: 'Säkerhetsläge', eyebrow: 'Utvecklare med säkerhetstänk',
    heroTitle: 'Fullstack-utvecklare & Etisk hackare',
    heroText: 'Jag bygger praktiska webb- och mobilapplikationer, samtidigt som jag lär mig hur system kan gå sönder, hur de säkras och hur fynd kommuniceras tydligt.',
    viewProjects: 'Visa projekt', available: 'Öppen för fullstack- och juniora säkerhetsroller',
    aboutEyebrow: 'Om mig',
    aboutTitle: 'Fullstack-utvecklare med grund inom IT-säkerhet',
    aboutIntro: 'Jag heter Ghanem Lamloumi och är utbildad både som fullstack webbutvecklare och IT-säkerhetstekniker. Jag trivs med att arbeta brett inom IT: bygga applikationer, förbättra användarupplevelser, strukturera innehåll och lära mig hur system kan säkras.',
    aboutDevTitle: 'Utvecklingsbakgrund',
    aboutDevText: 'Genom mina fullstack-studier och LIA har jag arbetat med React Native, Expo, SQLite, WordPress-teman och Elementor. Jag är starkast i JavaScript och TypeScript och fortsätter bygga projekt med moderna webb- och mobilverktyg.',
    aboutSecTitle: 'Säkerhetstänk',
    aboutSecText: 'Min IT-säkerhetsutbildning gav mig en grund inom Linux, DNS, Packet Tracer och Docker. Jag håller även kunskaperna uppdaterade genom Hack The Box Academy och IT-relaterade kurser.',
    aboutWorkTitle: 'Hur jag arbetar',
    aboutWorkText: 'Jag är strukturerad, självgående och noggrann med detaljer, men även flexibel nog att arbeta både självständigt och i team. Jag gillar varierande arbetsuppgifter och att omvandla bred teknisk kunskap till praktiska resultat.',
    skillEyebrow: 'Kompetenskarta', skillsTitle: 'Kunskaper som stödjer båda karriärvägarna',
    projectEyebrow: 'Utvalda arbeten', projectsTitle: 'Projekt inom utveckling, säkerhet och automation',
    filterAll: 'Alla', roleFullstack: 'Fullstack', roleSecurity: 'Säkerhet', difficulty: 'Svårighetsgrad', whyItWorks: 'Varför det funkar',
    featuredTitle: 'Utvalda projekt', featuredNote: 'Starkaste bevisen för rekryterare', allProjectsTitle: 'Alla projekt', allProjectsNote: 'Filtrera efter rollfokus',
    terminalTitle: 'Portfolio-terminal', terminalIntro: 'Testa kommandon som help, projects, skills, contact, security, fullstack eller about.',
    contactEyebrow: 'Nästa steg', contactTitle: 'Låt oss bygga säker och användbar mjukvara.', contactText: 'Jag är öppen för roller som fullstack-utvecklare, junior etisk hackare, junior pentestare och IT-säkerhetstekniker.',
    viewProject: 'Visa projekt'
  }
};

const skills = [
  { name: 'Frontend', level: 84, items: ['React', 'Next.js', 'Angular', 'TailwindCSS'] },
  { name: 'Backend', level: 72, items: ['Node.js', 'PHP', 'APIs', 'Auth'] },
  { name: 'Mobile', level: 70, items: ['React Native', 'Expo', 'Redux'] },
  { name: 'Security', level: 68, items: ['Linux', 'DNS', 'HTB', 'Pentest basics'] },
  { name: 'Automation', level: 74, items: ['Python', 'Bots', 'APIs', 'Scripting'] },
  { name: 'Data', level: 66, items: ['SQL', 'SQLite', 'MongoDB', 'Modeling'] }
];

const projects = [
  {
    id: 'fs-7', category: ['fullstack'], featured: true,
    title: { en: 'Postbox - Media Platform', sv: 'Postbox - Media plattform' },
    difficulty: { en: 'Medium–Hard', sv: 'Medel–Svår' },
    stack: ['Next.js', 'NextAuth', 'Cloudinary', 'Pusher'],
    description: { en: 'A fullstack media platform for managing content, authentication, uploads and real-time interaction.', sv: 'En fullstack media-plattform för innehåll, autentisering, uppladdningar och realtidsinteraktion.' },
    value: { en: 'Demonstrates fullstack architecture, API design, authentication and scalable data handling.', sv: 'Visar fullstack-arkitektur, API-design, autentisering och skalbar datahantering.' },
    link: { github: 'https://github.com/Ghanemla/postbox' }
  },
  {
    id: 'fs-12', category: ['fullstack', 'security'], featured: true,
    title: { en: 'Twitch Chatbot', sv: 'Twitch-chatbot' },
    difficulty: { en: 'Medium', sv: 'Medel' },
    stack: ['Python', 'API', 'Automation', 'AI'],
    description: { en: 'A Python chatbot that connects to Twitch chat, processes messages in real time, and responds with automated logic.', sv: 'En Python-baserad chatbot som ansluter till Twitch-chat, bearbetar meddelanden i realtid och svarar med automatiserad logik.' },
    value: { en: 'Demonstrates API integration, real-time processing and automation logic in a live environment.', sv: 'Visar API-integration, realtidshantering och automatiseringslogik i en live-miljö.' },
    link: { github: 'https://github.com/Ghanemla/Twitch-chatbot' }
  },
  {
    id: 'sec-7', category: ['security'], featured: true,
    title: { en: 'Aim Trainer Bot', sv: 'Aim Trainer-bot' },
    difficulty: { en: 'Medium', sv: 'Medel' },
    stack: ['Python', 'Automation', 'Scripting'],
    description: { en: 'A Python automation script designed to interact with a game environment and simulate input.', sv: 'Ett Python-skript för automation som interagerar med en spelmiljö och simulerar input.' },
    value: { en: 'Demonstrates scripting, automation and system-level interaction, useful for security tooling.', sv: 'Visar scripting, automation och systeminteraktion, användbart för säkerhetsverktyg.' },
    link: { github: 'https://github.com/Ghanemla/Aim_trainer' }
  },
  {
    id: 'fs-8', category: ['fullstack'],
    title: { en: 'LudusDB - Game Database', sv: 'LudusDB - Speldatabas' },
    difficulty: { en: 'Medium', sv: 'Medel' },
    stack: ['Angular', 'TypeScript', 'TailwindCSS'],
    description: { en: 'A database-focused project exploring data structure, storage and application logic.', sv: 'Ett databasfokuserat projekt som utforskar datastruktur, lagring och applikationslogik.' },
    value: { en: 'Demonstrates data modeling, frontend structure and database-oriented thinking.', sv: 'Visar datamodellering, frontendstruktur och databastänk.' },
    link: { github: 'https://github.com/Ghanemla/LudusDB' }
  },
  {
    id: 'fs-9', category: ['fullstack'],
    title: { en: 'Todo App', sv: 'Todo-app' },
    difficulty: { en: 'Easy', sv: 'Lätt' },
    stack: ['MySQL', 'PHP'],
    description: { en: 'A task management app for creating, updating and deleting tasks.', sv: 'En uppgiftshanteringsapp för att skapa, uppdatera och ta bort uppgifter.' },
    value: { en: 'Demonstrates CRUD operations, persistence and basic user interaction.', sv: 'Visar CRUD-operationer, persistens och grundläggande användarinteraktion.' },
    link: { github: 'https://github.com/Ghanemla/u04-todo-app-Ghanemla' }
  },
  {
    id: 'fs-10', category: ['fullstack'],
    title: { en: 'ClearView - Weather App', sv: 'ClearView - Väderapp' },
    difficulty: { en: 'Medium', sv: 'Medel' },
    stack: ['TypeScript', 'Next.js', 'TailwindCSS', 'UI'],
    description: { en: 'A weather app focused on clean UI structure, API-driven data and user experience.', sv: 'En väderapp med fokus på ren UI-struktur, API-driven data och användarupplevelse.' },
    value: { en: 'Demonstrates UI/UX thinking, API usage and clean frontend implementation.', sv: 'Visar UI/UX-tänk, API-användning och ren frontendimplementation.' },
    link: { github: 'https://github.com/Ghanemla/clearview' }
  },
  {
    id: 'fs-11', category: ['fullstack'],
    title: { en: 'Native Fitness App', sv: 'Native Fitness-app' },
    difficulty: { en: 'Medium', sv: 'Medel' },
    stack: ['TypeScript', 'React Native', 'Expo', 'Redux', 'Mobile'],
    description: { en: 'A mobile fitness application for tracking workouts and user progress.', sv: 'En mobil träningsapp för att spåra träning och användarens utveckling.' },
    value: { en: 'Demonstrates mobile development, state management and cross-platform UI.', sv: 'Visar mobilutveckling, state-hantering och plattformsoberoende UI.' },
    link: { github: 'https://github.com/Ghanemla/native_fitness' }
  },
  {
    id: 'fs-13', category: ['fullstack'],
    title: { en: 'Pokedex App', sv: 'Pokedex-app' },
    difficulty: { en: 'Easy–Medium', sv: 'Lätt–Medel' },
    stack: ['Python', 'API', 'Data Handling'],
    description: { en: 'An application that fetches and displays Pokémon data from an external API.', sv: 'En applikation som hämtar och visar Pokémon-data från ett externt API.' },
    value: { en: 'Demonstrates API usage, data processing and structured application output.', sv: 'Visar API-användning, databehandling och strukturerad output.' },
    link: { github: 'https://github.com/Ghanemla/pokedex' }
  }
];
