const state = { lang: 'en', filter: 'all', mode: 'dev', theme: 'dark' };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const t = (key) => translations[state.lang][key] || key;

const projectsGrid = $('#projectsGrid');
const featuredGrid = $('#featuredGrid');
const featuredWrap = $('#featuredWrap');
const skillGrid = $('#skillGrid');
const terminalOutput = $('#terminalOutput');
const terminalInput = $('#terminalInput');

function categories(project) {
  return Array.isArray(project.category) ? project.category : [project.category];
}

function scoreProject(project) {
  const cats = categories(project);
  return (project.featured ? 10 : 0) + (cats.includes('fullstack') ? 2 : 0) + (cats.includes('security') ? 2 : 0) + project.stack.length / 10;
}

function getVisibleProjects() {
  return [...projects]
    .sort((a, b) => scoreProject(b) - scoreProject(a))
    .filter(project => state.filter === 'all' || categories(project).includes(state.filter));
}

function renderCard(project, featured = false) {
  const cats = categories(project);
  return `
    <article class="project-card ${featured ? 'featured' : ''}" data-project-id="${project.id}">
      <div class="card-glow"></div>
      <div class="card-top">
        <div class="project-badges">
          ${cats.map(cat => `
            <span class="badge badge-role ${cat}">${cat === 'fullstack' ? t('roleFullstack') : t('roleSecurity')}</span>
          `).join('')}
        </div>
        <h3>${project.title[state.lang]}</h3>
        <p class="project-desc">${project.description[state.lang]}</p>
      </div>

      <div class="card-bottom">
        <div class="project-meta">
          ${project.stack.map(item => `<span class="badge tech-badge">${item}</span>`).join('')}
        </div>

        <div class="project-footer">
          <div class="footer-left">
            <strong>${t('difficulty')}:</strong>
            <span>${project.difficulty[state.lang]}</span>
          </div>
          <details class="why">
            <summary>${t('whyItWorks')}</summary>
            <p>${project.value[state.lang]}</p>
          </details>
        </div>

        ${project.link?.github ? `
          <a href="${project.link.github}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation()">
            ${t('viewProject')}
          </a>
        ` : ''}
      </div>
    </article>
  `;
}

function renderProjects() {
  const visible = getVisibleProjects();
  const featured = visible.filter(p => p.featured);
  const normal = visible.filter(p => !p.featured);

  featuredWrap.style.display = featured.length ? 'block' : 'none';
  featuredGrid.innerHTML = featured.map(project => renderCard(project, true)).join('');
  projectsGrid.innerHTML = normal.map(project => renderCard(project)).join('');

  wireCards();
}

function renderSkills() {
  skillGrid.innerHTML = skills.map(skill => `
    <article class="skill-card">
      <div class="skill-top"><strong>${skill.name}</strong><span>${skill.level}%</span></div>
      <div class="skill-bar"><i style="width:${skill.level}%"></i></div>
      <div class="skill-tags">${skill.items.map(item => `<span>${item}</span>`).join('')}</div>
    </article>
  `).join('');
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  $('#langToggle').textContent = lang === 'en' ? 'SV' : 'EN';
  $('#modeToggle').textContent = state.mode === 'dev' ? t('devMode') : t('securityMode');
  renderProjects();
}

function setMode(mode) {
  state.mode = mode;
  document.body.dataset.mode = mode;
  $('#modeToggle').textContent = mode === 'dev' ? t('devMode') : t('securityMode');
}

function setTheme(theme) {
  state.theme = theme;
  document.body.dataset.theme = theme;
  $('#themeToggle').textContent = theme === 'dark' ? '☾' : '☀';
}

function wireCards() {
  $$('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
}

function addTerminalLine(text, type = '') {
  terminalOutput.innerHTML += `<div class="terminal-line ${type}">${text}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function runCommand(command) {
  const cmd = command.trim().toLowerCase();
  addTerminalLine(`$ ${command}`, 'command');

  const responses = {
    help: 'commands: projects, featured, skills, contact, security, fullstack, about, clear',
    projects: `${projects.length} projects loaded. Use the filters above to view Fullstack or Security projects.`,
    featured: projects.filter(p => p.featured).map(p => `• ${p.title[state.lang]}`).join('<br>'),
    skills: skills.map(s => `• ${s.name}: ${s.items.join(', ')}`).join('<br>'),
    contact: 'Email: Ghanem.lamloumi1@gmail.com<br>GitHub: github.com/Ghanemla',
    security: 'Security focus: Linux, DNS, Hack The Box learning, automation, scripting and secure application thinking.',
    fullstack: 'Fullstack focus: React, Next.js, Node.js, APIs, databases, mobile and UI/product thinking.',
    about: 'Educated as a fullstack web developer and IT security technician, with a structured, self-driven and detail-focused working style.'
  };

  if (cmd === 'clear') {
    terminalOutput.innerHTML = '';
    return;
  }

  addTerminalLine(responses[cmd] || `Unknown command: ${cmd}. Type help.`, cmd in responses ? 'success' : 'error');
}

function revealOnScroll() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach(el => observer.observe(el));
}

$('#langToggle').addEventListener('click', () => setLanguage(state.lang === 'en' ? 'sv' : 'en'));
$('#themeToggle').addEventListener('click', () => setTheme(state.theme === 'dark' ? 'light' : 'dark'));
$('#modeToggle').addEventListener('click', () => setMode(state.mode === 'dev' ? 'security' : 'dev'));

$$('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    $$('.filter-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    state.filter = button.dataset.filter;
    renderProjects();
  });
});

terminalInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    runCommand(terminalInput.value);
    terminalInput.value = '';
  }
});


renderSkills();
renderProjects();
setLanguage('en');
setMode('dev');
setTheme('dark');
revealOnScroll();
addTerminalLine('Welcome. Type help to explore this portfolio.', 'success');
