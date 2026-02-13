const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const yesBtn = document.getElementById('yesBtn');
const noBtn  = document.getElementById('noBtn');

const quotes = window.__QUOTES__ || [];
let idx = 0;

function clamp(v,min,max){ return Math.max(min, Math.min(max,v)); }

function moveNoButton(){
  const rect = noBtn.getBoundingClientRect();
  const pad = 16;

  const maxX = window.innerWidth - rect.width - pad;
  const maxY = window.innerHeight - rect.height - pad;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top  = y + 'px';
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener(
  'touchstart',
  (e)=>{ e.preventDefault(); moveNoButton(); },
  {passive:false}
);

yesBtn.addEventListener('click', ()=>{
  screen1.classList.add('hidden');
  screen2.classList.remove('hidden');
  render();
});

document.getElementById('restart').addEventListener('click', ()=>{
  idx = 0;
  screen2.classList.add('hidden');
  screen1.classList.remove('hidden');
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
});

const whoEl  = document.getElementById('who');
const metaEl = document.getElementById('meta');
const textEl = document.getElementById('text');
const dotsEl = document.getElementById('dots');

function renderDots(){
  dotsEl.innerHTML = '';
  quotes.forEach((_,i)=>{
    const d = document.createElement('div');
    d.className = 'dot' + (i===idx ? ' active' : '');
    d.addEventListener('click', ()=>{ idx=i; render(); });
    dotsEl.appendChild(d);
  });
}

function render(){
  if(!quotes.length) return;
  idx = clamp(idx, 0, quotes.length-1);

  whoEl.textContent  = quotes[idx].who  || '';
  metaEl.textContent = quotes[idx].dt   || '';
  textEl.textContent = quotes[idx].text || '';

  renderDots();
}

document.getElementById('prev').addEventListener('click', ()=>{
  idx = (idx-1+quotes.length)%quotes.length;
  render();
});
document.getElementById('next').addEventListener('click', ()=>{
  idx = (idx+1)%quotes.length;
  render();
});

/* Сердечки на фоне */
const heart = () => {
  const el = document.createElement('div');
  el.textContent = '❤';
  el.style.position='fixed';
  el.style.left = (Math.random()*100)+'vw';
  el.style.top  = '110vh';
  el.style.fontSize = (12 + Math.random()*22)+'px';
  el.style.opacity = (0.25 + Math.random()*0.45).toFixed(2);
  el.style.filter = 'drop-shadow(0 6px 12px rgba(0,0,0,.25))';
  el.style.zIndex = -1;
  el.style.pointerEvents = 'none';

  const dur = 6000 + Math.random()*5000;
  el.animate(
    [
      { transform: 'translateY(0) rotate(0deg)'},
      { transform: 'translateY(-140vh) rotate('+(Math.random()*120-60)+'deg)'}
    ],
    { duration: dur, easing: 'linear' }
  );

  document.body.appendChild(el);
  setTimeout(()=>el.remove(), dur);
};
setInterval(heart, 450);
