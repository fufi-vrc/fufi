const canvas = document.getElementById('network');
const ctx = canvas.getContext('2d');
const page = document.getElementById('page');
const hero = document.querySelector('.hero');
const avatar = document.querySelector('.avatar-wrap');
const card = document.querySelector('.discord-card');
const glows = document.querySelectorAll('.glow');

let points = [];
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  points = Array.from({ length: 60 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    r: Math.random() * 1.25 + 0.35
  }));
}

function drawNetwork() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (const p of points) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -20 || p.x > innerWidth + 20) p.vx *= -1;
    if (p.y < -20 || p.y > innerHeight + 20) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,23,68,.62)';
    ctx.fill();
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i], b = points[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 150) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255,23,68,${(1 - d / 150) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawNetwork);
}

function parallax() {
  const nx = (mouse.x / innerWidth - 0.5) * 2;
  const ny = (mouse.y / innerHeight - 0.5) * 2;

  hero.style.transform =
    `rotateX(${(-ny * 3.2).toFixed(2)}deg) rotateY(${(nx * 4).toFixed(2)}deg)`;

  card.style.transform =
    `translate3d(${(nx * 7).toFixed(1)}px,${(ny * 7).toFixed(1)}px,0)
     rotateX(${(-ny * 2).toFixed(2)}deg)
     rotateY(${(nx * 3).toFixed(2)}deg)`;

  avatar.style.transform =
    `translate3d(${(nx * -10).toFixed(1)}px,${(ny * -10).toFixed(1)}px,30px)`;

  glows.forEach((g, i) => {
    const power = i === 0 ? 22 : -18;
    g.style.transform = `translate(${(nx * power).toFixed(1)}px,${(ny * power).toFixed(1)}px)`;
  });
}

addEventListener('resize', resize);
addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  parallax();
});
addEventListener('mouseleave', () => {
  hero.style.transform = '';
  card.style.transform = '';
  avatar.style.transform = '';
  glows.forEach(g => g.style.transform = '');
});

resize();
drawNetwork();
