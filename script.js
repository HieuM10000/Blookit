let user = {
  name: '',
  xp: 0,
  sets: []
};

function login() {
  const name = document.getElementById('username').value.trim();
  if (!name) return alert("Enter your username.");
  const saved = localStorage.getItem("user_" + name);
  if (saved) {
    user = JSON.parse(saved);
  } else {
    user.name = name;
    user.xp = 100;
    user.sets = [];
    saveUser();
  }
  document.getElementById('user-name').innerText = user.name;
  document.getElementById('xp-display').innerText = user.xp;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
}

function saveUser() {
  localStorage.setItem("user_" + user.name, JSON.stringify(user));
}

function showPage(id) {
  const pages = ['create-set', 'discover-sets', 'dashboard'];
  pages.forEach(p => document.getElementById(p).classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  if (id === 'discover-sets') loadSets();
}

let questionIndex = 0;

function addQuestion() {
  const container = document.createElement('div');
  container.className = "question";
  container.innerHTML = `
    <input type="text" placeholder="Question" id="q-${questionIndex}" />
    <input type="text" placeholder="Correct Answer" id="a-${questionIndex}" />
  `;
  document.getElementById('question-list').appendChild(container);
  questionIndex++;
}

function saveSet() {
  const title = document.getElementById('set-title').value.trim();
  const desc = document.getElementById('set-desc').value.trim();
  if (!title) return alert("Title is required!");

  const questions = [];
  for (let i = 0; i < questionIndex; i++) {
    const q = document.getElementById(`q-${i}`);
    const a = document.getElementById(`a-${i}`);
    if (q && a && q.value && a.value) {
      questions.push({ q: q.value, a: a.value });
    }
  }

  const newSet = {
    title,
    desc,
    questions
  };

  user.sets.push(newSet);
  saveUser();
  alert("Set saved!");
  document.getElementById('set-title').value = '';
  document.getElementById('set-desc').value = '';
  document.getElementById('question-list').innerHTML = '';
  questionIndex = 0;
}

function loadSets() {
  const container = document.getElementById('set-display');
  container.innerHTML = '';
  if (user.sets.length === 0) {
    container.innerHTML = '<p>No sets yet.</p>';
    return;
  }
  user.sets.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h4>${s.title}</h4><p>${s.desc}</p><p>Questions: ${s.questions.length}</p>`;
    container.appendChild(div);
  });
}
