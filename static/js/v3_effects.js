// DMA Variant 3 - Premium "Gradient Luxe" Animations & Canvas Controllers
// Offloaded static Javascript logic for maximum performance

document.addEventListener('DOMContentLoaded', () => {
  // Ensure Lenis, GSAP, and ScrollTrigger are registered & active
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is missing.');
    return;
  }
  
  // Register Draggable
  if (typeof Draggable !== 'undefined') {
    gsap.registerPlugin(Draggable);
  }

  // Helper: check if element is in viewport for performance throttling
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // ─── 1. HERO MORPHING WAVE MESH CANVAS ───
  (function() {
    const canvas = document.getElementById('hero-canvas-el');
    const hero = document.getElementById('hero-vanta');
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');
    
    let mouse = { x: null, y: null, tx: null, ty: null };
    let time = 0;
    
    function resize() {
      canvas.width = hero.clientWidth;
      canvas.height = hero.clientHeight;
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.006;
      
      if (mouse.tx !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
        } else {
          mouse.x += (mouse.tx - mouse.x) * 0.1;
          mouse.y += (mouse.ty - mouse.y) * 0.1;
        }
      }
      
      const rows = 16;
      const cols = 26;
      const cellW = canvas.width / (cols - 1);
      const cellH = canvas.height / (rows - 1);
      
      // Draw horizontal waves
      ctx.strokeStyle = 'rgba(124, 111, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          let x = c * cellW;
          let y = r * cellH;
          
          const wave = Math.sin(c * 0.25 + r * 0.15 + time * 4) * 20;
          const wave2 = Math.cos(c * 0.15 - r * 0.2 + time * 2) * 12;
          y += wave + wave2;
          
          if (mouse.x !== null) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const force = (220 - dist) / 220;
              y += dy * force * 0.4;
              x += dx * force * 0.4;
            }
          }
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      // Draw vertical waves
      ctx.strokeStyle = 'rgba(80, 200, 255, 0.09)';
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          let x = c * cellW;
          let y = r * cellH;
          
          const wave = Math.sin(c * 0.25 + r * 0.15 + time * 4) * 20;
          const wave2 = Math.cos(c * 0.15 - r * 0.2 + time * 2) * 12;
          y += wave + wave2;
          
          if (mouse.x !== null) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const force = (220 - dist) / 220;
              y += dy * force * 0.4;
              x += dx * force * 0.4;
            }
          }
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Intersections glowing
      ctx.fillStyle = 'var(--acc2)';
      for (let r = 2; r < rows - 2; r += 3) {
        for (let c = 2; c < cols - 2; c += 4) {
          let x = c * cellW;
          let y = r * cellH;
          
          const wave = Math.sin(c * 0.25 + r * 0.15 + time * 4) * 20;
          const wave2 = Math.cos(c * 0.15 - r * 0.2 + time * 2) * 12;
          y += wave + wave2;
          
          if (mouse.x !== null) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const force = (220 - dist) / 220;
              y += dy * force * 0.4;
              x += dx * force * 0.4;
            }
          }
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.shadowColor = 'var(--acc2)';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => {
      mouse.tx = null; mouse.ty = null; mouse.x = null; mouse.y = null;
    });
    
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 2. ETHOS GRAVITATIONAL WARP GRID CANVAS ───
  (function() {
    const canvas = document.getElementById('ethos-bg-canvas');
    const section = document.getElementById('ethos-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let mouse = { x: null, y: null, tx: null, ty: null };
    const spacing = 45;
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (mouse.tx !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
        } else {
          mouse.x += (mouse.tx - mouse.x) * 0.1;
          mouse.y += (mouse.ty - mouse.y) * 0.1;
        }
      }
      
      const cols = Math.floor(canvas.width / spacing) + 2;
      const rows = Math.floor(canvas.height / spacing) + 2;
      
      ctx.strokeStyle = 'rgba(80, 200, 255, 0.08)';
      ctx.lineWidth = 0.5;
      
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          let bx = c * spacing;
          let by = r * spacing;
          let x = bx, y = by;
          
          if (mouse.x !== null) {
            const dx = mouse.x - bx;
            const dy = mouse.y - by;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 200) {
              const force = (200 - dist) / 200;
              x += dx * force * 0.35;
              y += dy * force * 0.35;
            }
          }
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          let bx = c * spacing;
          let by = r * spacing;
          let x = bx, y = by;
          
          if (mouse.x !== null) {
            const dx = mouse.x - bx;
            const dy = mouse.y - by;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 200) {
              const force = (200 - dist) / 200;
              x += dx * force * 0.35;
              y += dy * force * 0.35;
            }
          }
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    section.addEventListener('mousemove', e => {
      const rect = section.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    });
    section.addEventListener('mouseleave', () => {
      mouse.tx = null; mouse.ty = null; mouse.x = null; mouse.y = null;
    });
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 3. CATALYST MAGNETIC ATTRACTOR CANVAS ───
  (function() {
    const canvas = document.getElementById('catalyst-bg-canvas');
    const section = document.getElementById('catalyst-matrix');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let mouse = { x: null, y: null, active: false };
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      init();
    }
    
    function init() {
      particles = [];
      const count = 70;
      for (let i = 0; i < count; i++) {
        const ox = Math.random() * canvas.width;
        const oy = Math.random() * canvas.height;
        particles.push({
          x: ox,
          y: oy,
          ox: ox,
          oy: oy,
          vx: 0,
          vy: 0,
          radius: Math.random() * 2 + 1,
          hue: Math.random() > 0.4 ? 245 : 195,
          angle: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.2
        });
      }
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        let targetX, targetY, attractionStrength;
        
        if (mouse.active) {
          targetX = mouse.x;
          targetY = mouse.y;
          attractionStrength = 0.35;
        } else {
          // Orbit gently around original home coordinates
          targetX = p.ox + Math.cos(p.angle) * 30;
          targetY = p.oy + Math.sin(p.angle) * 30;
          attractionStrength = 0.12;
        }
        
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 1) {
          p.vx += (dx / dist) * attractionStrength;
          p.vy += (dy / dist) * attractionStrength;
        }
        
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.speed * 0.05;
        
        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, 0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connection lines to close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
          if (ldist < 120) {
            ctx.strokeStyle = `rgba(124, 111, 255, ${(1 - ldist/120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    section.addEventListener('mousemove', e => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    section.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
    });
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 4. BRAND RIPPLE MATRIX GRID CANVAS ───
  (function() {
    const canvas = document.getElementById('brand-bg-canvas');
    const section = document.getElementById('brand-matrix-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let mouse = { x: null, y: null };
    const spacing = 50;
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;
      
      ctx.fillStyle = 'rgba(80, 200, 255, 0.12)';
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          let offset = 0;
          
          if (mouse.x !== null) {
            const dx = mouse.x - bx;
            const dy = mouse.y - by;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              offset = (180 - dist) / 180 * 8;
            }
          }
          
          // Draw tiny cross meshes
          ctx.fillRect(bx - 1 + offset * 0.1, by - 4, 2, 8);
          ctx.fillRect(bx - 4, by - 1 + offset * 0.1, 8, 2);
        }
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    section.addEventListener('mousemove', e => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    section.addEventListener('mouseleave', () => { mouse.x = null; });
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 5. TESTIMONIAL KINETIC SOUNDWAVE AURA CANVAS ───
  (function() {
    const canvas = document.getElementById('testimonial-bg-canvas');
    const section = document.getElementById('testimonial-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let time = 0;
    let mouse = { x: null, y: null };
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      let factor = 1;
      if (mouse.x !== null) {
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        factor = 1 + (dist / Math.max(cx, cy)) * 2;
      }
      
      ctx.strokeStyle = 'rgba(124, 111, 255, 0.08)';
      ctx.lineWidth = 1.5;
      
      // Draw concentric aura rings with soundwave distortions
      for (let r = 80; r < 500; r += 50) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.08) {
          const noise = Math.sin(a * 8 + time * 3) * (6 * factor);
          const rad = r + noise;
          const x = cx + Math.cos(a) * rad;
          const y = cy + Math.sin(a) * rad;
          
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    section.addEventListener('mousemove', e => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    section.addEventListener('mouseleave', () => { mouse.x = null; });
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 6. PILLARS CYBER SPLINE STREAMS CANVAS ───
  (function() {
    const canvas = document.getElementById('pillars-bg-canvas');
    const section = document.getElementById('pillars-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let splines = [];
    let time = 0;
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      init();
    }
    
    function init() {
      splines = [];
      const num = 6;
      for (let i = 0; i < num; i++) {
        splines.push({
          y: (canvas.height / (num + 1)) * (i + 1),
          amplitude: Math.random() * 40 + 20,
          freq: 0.0015 + Math.random() * 0.001,
          speed: 0.015 + Math.random() * 0.01,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(124, 111, 255, 0.12)' : 'rgba(80, 200, 255, 0.1)'
        });
      }
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;
      
      for (let i = 0; i < splines.length; i++) {
        const s = splines[i];
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = s.color;
        
        for (let x = 0; x <= canvas.width; x += 15) {
          const y = s.y + Math.sin(x * s.freq + time * s.speed + s.phase) * s.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 7. TIERS DIGITAL MATRIX CASCADE CANVAS ───
  (function() {
    const canvas = document.getElementById('tiers-bg-canvas');
    const section = document.getElementById('tiers-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let matrixBars = [];
    let mouse = { x: null, y: null };
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      init();
    }
    
    function init() {
      matrixBars = [];
      const cols = Math.floor(canvas.width / 40);
      for (let i = 0; i < cols; i++) {
        matrixBars.push({
          x: i * 40 + 20,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          len: Math.random() * 80 + 40,
          opacity: Math.random() * 0.35 + 0.1
        });
      }
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < matrixBars.length; i++) {
        const bar = matrixBars[i];
        bar.y += bar.speed;
        if (bar.y > canvas.height) {
          bar.y = -bar.len;
          bar.speed = Math.random() * 2 + 1;
        }
        
        let drawX = bar.x;
        // Push bar away from mouse on X axis
        if (mouse.x !== null) {
          const dx = drawX - mouse.x;
          const dy = bar.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 140) {
            const push = (140 - dist) / 140 * 25;
            drawX += dx > 0 ? push : -push;
          }
        }
        
        const grad = ctx.createLinearGradient(drawX, bar.y, drawX, bar.y + bar.len);
        grad.addColorStop(0, 'rgba(80, 200, 255, 0)');
        grad.addColorStop(1, `rgba(124, 111, 255, ${bar.opacity})`);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(drawX, bar.y);
        ctx.lineTo(drawX, bar.y + bar.len);
        ctx.stroke();
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    section.addEventListener('mousemove', e => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    section.addEventListener('mouseleave', () => { mouse.x = null; });
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 8. WORK ABYSSAL RADIAL SPOTLIGHT CANVAS ───
  (function() {
    const canvas = document.getElementById('work-bg-canvas');
    const section = document.getElementById('work-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000, active: false };
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
        
        const rad = 380;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, rad);
        grad.addColorStop(0, 'rgba(124, 111, 255, 0.13)');
        grad.addColorStop(0.5, 'rgba(80, 200, 255, 0.03)');
        grad.addColorStop(1, 'rgba(6, 7, 15, 0)');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    section.addEventListener('mousemove', e => {
      const rect = section.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      if (!mouse.active) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
        mouse.active = true;
      }
    });
    section.addEventListener('mouseleave', () => { mouse.active = false; });
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();



  // ─── 10. ROSTER COSMIC SPARKLES BOKEH CANVAS ───
  (function() {
    const canvas = document.getElementById('roster-bg-canvas');
    const section = document.getElementById('roster-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let sparkles = [];
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      init();
    }
    
    function init() {
      sparkles = [];
      const count = 50;
      for (let i = 0; i < count; i++) {
        sparkles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.4 - Math.random() * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.1,
          glow: Math.random() * 6 + 3
        });
      }
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        
        if (s.y < -10) {
          s.y = canvas.height + 10;
          s.x = Math.random() * canvas.width;
        }
        
        ctx.fillStyle = 'rgba(80, 200, 255, 0.7)';
        ctx.shadowColor = '#50c8ff';
        ctx.shadowBlur = s.glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 11. BTS ABSTRACT GLITCH SHARDS CANVAS ───
  (function() {
    const canvas = document.getElementById('bts-bg-canvas');
    const section = document.getElementById('bts-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    
    let shards = [];
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      init();
    }
    
    function init() {
      shards = [];
      const count = 30;
      for (let i = 0; i < count; i++) {
        shards.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 25 + 10,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          rot: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.015,
          opacity: Math.random() * 0.15 + 0.05
        });
      }
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < shards.length; i++) {
        const s = shards[i];
        s.x += s.vx;
        s.y += s.vy;
        s.rot += s.rotSpeed;
        
        if (s.x < -40) s.x = canvas.width + 40;
        if (s.x > canvas.width + 40) s.x = -40;
        if (s.y < -40) s.y = canvas.height + 40;
        if (s.y > canvas.height + 40) s.y = -40;
        
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.strokeStyle = `rgba(124, 111, 255, ${s.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Draw a triangle shard
        ctx.moveTo(0, -s.size / 2);
        ctx.lineTo(s.size / 2, s.size / 2);
        ctx.lineTo(-s.size / 2, s.size / 2);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();

  // ─── 12. MAP RADAR SWEEP CANVAS & HQ PULSER ───
  (function() {
    const canvas = document.getElementById('map-bg-canvas');
    const section = document.getElementById('map-section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    const hqPoints = document.querySelectorAll('.hq-point');
    
    let mapAngle = 0;
    let ripples = [];
    
    function resize() {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    }
    
    function createCanvasRipple(x, y) {
      ripples.push({ x, y, r: 2, maxR: 50, opacity: 1 });
    }
    
    function drawRipples() {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += 1.6;
        rip.opacity -= 0.022;
        if (rip.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(80, 200, 255, ${rip.opacity * 0.8})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    
    function draw() {
      if (!isElementInViewport(canvas)) return;
      
      ctx.fillStyle = 'rgba(6, 7, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.max(cx, cy) * 1.4;
      
      mapAngle += 0.012;
      const sweepVectorAngle = mapAngle - Math.PI / 2;
      const normalizedSweepVector = Math.atan2(Math.sin(sweepVectorAngle), Math.cos(sweepVectorAngle));
      
      // Draw radar sweep
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(mapAngle);
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -radius);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(80, 200, 255, 0.85)';
      ctx.shadowColor = '#50c8ff';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, -Math.PI / 2 - 0.4, -Math.PI / 2, false);
      ctx.closePath();
      const wedge = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      wedge.addColorStop(0, 'rgba(80, 200, 255, 0.2)');
      wedge.addColorStop(0.5, 'rgba(124, 111, 255, 0.07)');
      wedge.addColorStop(1, 'rgba(6, 7, 15, 0)');
      ctx.fillStyle = wedge;
      ctx.fill();
      
      ctx.restore();
      
      // Radar rings
      ctx.strokeStyle = 'rgba(124, 111, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, i * (radius / 4.5), 0, Math.PI * 2);
        ctx.stroke();
      }
      
      drawRipples();
      
      // Radar detection scan
      hqPoints.forEach(point => {
        const rect = section.getBoundingClientRect();
        const ptRect = point.getBoundingClientRect();
        const px = (ptRect.left + ptRect.width / 2) - (rect.left + cx);
        const py = (ptRect.top + ptRect.height / 2) - (rect.top + cy);
        
        const ptAngle = Math.atan2(py, px);
        let diff = normalizedSweepVector - ptAngle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        
        if (diff > 0 && diff < 0.12) {
          if (!point.classList.contains('radar-pulsed')) {
            point.classList.add('radar-pulsed');
            
            // Pulse element
            gsap.fromTo(point,
              { scale: 1, filter: 'brightness(1)' },
              {
                scale: 1.4,
                filter: 'brightness(2.2) drop-shadow(0 0 10px var(--acc2))',
                duration: 0.25,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
                onComplete: () => {
                  gsap.to(point, { scale: 1, filter: 'brightness(1)', duration: 0.4 });
                }
              }
            );
            createCanvasRipple(cx + px, cy + py);
          }
        } else if (Math.abs(diff) > 0.4) {
          point.classList.remove('radar-pulsed');
        }
      });
    }
    
    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    
    window.addEventListener('resize', resize);
    resize();
    loop();
  })();



  // ─── 14. DMA BRAND IDENTITY CANVAS ANIMATION ───
  (function() {
    const canvas = document.getElementById('dma-brand-canvas');
    const wrap   = canvas ? canvas.parentElement : null;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');

    const PURPLE = '#7c6fff';
    const CYAN   = '#50c8ff';
    const GREEN  = '#39e39f';
    const PINK   = '#ff7edb';

    let W, H, cx, cy;
    let t = 0;
    let mouse = { x: null, y: null };

    // ── Orbital ring data ──
    const rings = [
      { r: 0, target: 0, speed: 0.003, dir:  1, color: PURPLE, alpha: 0.18, lw: 1.0 },
      { r: 0, target: 0, speed: 0.005, dir: -1, color: CYAN,   alpha: 0.12, lw: 0.8 },
      { r: 0, target: 0, speed: 0.007, dir:  1, color: GREEN,  alpha: 0.09, lw: 0.6 },
    ];
    
    // Orbital nodes (icons / metrics) that travel on the rings
    const nodes = [
      { ring: 0, angle: 0,          size: 5, color: PURPLE, label: '📊' },
      { ring: 0, angle: Math.PI,    size: 5, color: PURPLE, label: '🎯' },
      { ring: 1, angle: Math.PI/3,  size: 4, color: CYAN,   label: '📱' },
      { ring: 1, angle: Math.PI+Math.PI/3, size: 4, color: CYAN, label: '✦' },
      { ring: 2, angle: Math.PI*0.7, size: 3, color: GREEN, label: '🤖' },
    ];

    // Floating background particles
    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: [PURPLE, CYAN, GREEN, PINK][Math.floor(Math.random() * 4)],
    }));

    // Typewriter / scramble state for "DIGITAL MARKETING AGENCY"
    const FULL_TEXT = 'DIGITAL MARKETING AGENCY';
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&';
    let revealedCount = 0;
    let scrambleT = 0;
    const REVEAL_SPEED = 0.018; // chars revealed per frame

    function resize() {
      const rect = wrap.getBoundingClientRect();
      W = canvas.width  = rect.width  || 340;
      H = canvas.height = rect.height || 320;
      cx = W / 2;
      cy = H / 2;
      const minDim = Math.min(W, H);
      rings[0].target = minDim * 0.31;
      rings[1].target = minDim * 0.42;
      rings[2].target = minDim * 0.52;
      rings.forEach(ring => { if (!ring.r) ring.r = ring.target; });
    }

    function lerp(a, b, f) { return a + (b - a) * f; }

    function draw() {
      if (!isElementInViewport(canvas)) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      // Smooth ring radii
      rings.forEach(ring => { ring.r = lerp(ring.r, ring.target, 0.05); });

      // ── 1. Background halo glow behind center ──
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, rings[2].target * 1.1);
      halo.addColorStop(0,   'rgba(124, 111, 255, 0.10)');
      halo.addColorStop(0.5, 'rgba(80,  200, 255, 0.04)');
      halo.addColorStop(1,   'rgba(6,   7,   15,  0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, rings[2].target * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // ── 2. Floating background particles ──
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 1.8 + p.x * 10));
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // ── 3. Orbital rings (dashed arcs + glow) ──
      rings.forEach((ring, idx) => {
        const dashLen  = [14, 8, 5][idx];
        const gapLen   = [18, 12, 8][idx];
        const angle    = t * ring.speed * ring.dir;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.alpha;
        ctx.lineWidth   = ring.lw;
        ctx.setLineDash([dashLen, gapLen]);
        ctx.shadowColor = ring.color;
        ctx.shadowBlur  = 8;
        ctx.beginPath();
        ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.setLineDash([]);
        ctx.restore();
      });

      // ── 4. Orbital nodes (emoji labels) ──
      nodes.forEach(node => {
        const ring  = rings[node.ring];
        const speed = rings[node.ring].speed * 0.6;
        node.angle += speed * rings[node.ring].dir;
        const nx = cx + Math.cos(node.angle) * ring.r;
        const ny = cy + Math.sin(node.angle) * ring.r;

        // Glow dot
        ctx.beginPath();
        ctx.arc(nx, ny, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Emoji label
        ctx.font = `${node.size * 2.2}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.9;
        ctx.fillText(node.label, nx, ny);
        ctx.globalAlpha = 1;
      });

      // ── 5. Central DMA glyph (pulsing ring + text) ──
      const pulse = 0.8 + 0.2 * Math.sin(t * 2.2);
      
      // Outer pulse ring
      ctx.beginPath();
      ctx.arc(cx, cy, 28 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = PURPLE;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.4 * pulse;
      ctx.shadowColor = PURPLE;
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Inner fill
      const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
      innerGrad.addColorStop(0, 'rgba(124, 111, 255, 0.3)');
      innerGrad.addColorStop(1, 'rgba(80, 200, 255, 0.05)');
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = innerGrad;
      ctx.fill();

      // "DMA" text
      ctx.font = 'bold 16px "Inter", "Outfit", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = CYAN;
      ctx.shadowBlur = 10;
      ctx.fillText('DMA', cx, cy);
      ctx.shadowBlur = 0;

      // ── 6. Typewriter / scramble text at bottom of card ──
      scrambleT += REVEAL_SPEED;
      revealedCount = Math.min(FULL_TEXT.length, Math.floor(scrambleT));

      const textY = H - 42;
      ctx.font = '600 9.5px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let display = '';
      for (let i = 0; i < FULL_TEXT.length; i++) {
        if (FULL_TEXT[i] === ' ') {
          display += ' ';
        } else if (i < revealedCount) {
          display += FULL_TEXT[i];
        } else if (i < revealedCount + 4 && scrambleT < FULL_TEXT.length) {
          display += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          display += '·';
        }
      }

      // Gradient fill for the text
      const tGrad = ctx.createLinearGradient(cx - 100, textY, cx + 100, textY);
      tGrad.addColorStop(0, PURPLE);
      tGrad.addColorStop(0.5, CYAN);
      tGrad.addColorStop(1, PURPLE);

      ctx.fillStyle = tGrad;
      ctx.shadowColor = CYAN;
      ctx.shadowBlur  = 6;
      ctx.fillText(display, cx, textY);
      ctx.shadowBlur = 0;

      // Blinking cursor
      if (revealedCount < FULL_TEXT.length || Math.sin(t * 6) > 0) {
        ctx.fillStyle = CYAN;
        ctx.fillText('|', cx + ctx.measureText(display).width / 2 + 5, textY);
      }

      // ── 7. Thin separator line ──
      ctx.beginPath();
      const sepGrad = ctx.createLinearGradient(40, H - 58, W - 40, H - 58);
      sepGrad.addColorStop(0, 'rgba(124,111,255,0)');
      sepGrad.addColorStop(0.5, 'rgba(80,200,255,0.2)');
      sepGrad.addColorStop(1, 'rgba(124,111,255,0)');
      ctx.strokeStyle = sepGrad;
      ctx.lineWidth = 0.8;
      ctx.moveTo(40, H - 58);
      ctx.lineTo(W - 40, H - 58);
      ctx.stroke();

      // Mouse interaction: nearby particles get tugged
      if (mouse.x !== null) {
        particles.forEach(p => {
          const dx = p.x * W - mouse.x;
          const dy = p.y * H - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const force = (80 - dist) / 80 * 0.0008;
            p.vx -= dx * force;
            p.vy -= dy * force;
          }
        });
      }
    }

    function loop() { draw(); requestAnimationFrame(loop); }

    wrap.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    wrap.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
    window.addEventListener('resize', () => { resize(); });

    resize();
    // Wait a frame for layout
    requestAnimationFrame(() => { resize(); loop(); });
  })();




  // ─── GSAP INTERACTIVE AND SCROLL TRIGGERS ───

  // PRE-SET: ensure all animated elements are visible by default
  // (GSAP will override for the animation, but CSS fallback makes them visible)
  gsap.set([
    '.catalyst-card', '.logo-item', '.test-card', '.pillar-tab',
    '.tier-card', '.creator-card', '.collage-img', '.faq-item',
    '.map-container', '#catalyst-matrix .sec-lbl',
    '#catalyst-matrix h2', '#brand-matrix-section .sec-lbl',
    '#pillars-section .sec-lbl', '#tiers-section .sec-lbl',
    '#roster-section .sec-lbl', '#bts-section .sec-lbl',
    '#faq-section .sec-lbl', '#map-section .sec-lbl'
  ], { opacity: 1, y: 0 }); // safe defaults in case triggers don't fire

  // Hero Char Entrance
  gsap.set('.hero-title .word .char', { y: '100%' });
  gsap.timeline({ delay: 0.2 })
    .to('.hero-title .word .char', {
      y: '0%',
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.04
    });

  // Ethos Scrub Reveal
  const splitText = document.getElementById('split-text');
  if (splitText) {
    const textContent = splitText.textContent.trim();
    const words = textContent.split(/\s+/);
    splitText.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');

    gsap.fromTo('#split-text .word', 
      { color: 'rgba(255, 255, 255, 0.1)' },
      {
        color: '#ffffff',
        textShadow: '0 0 20px rgba(80, 200, 255, 0.65), 0 0 40px rgba(124, 111, 255, 0.25)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '#ethos-section',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true
        }
      }
    );
  }



  // Capabilities Console tab switcher and SVG video previews
  const tabs = document.querySelectorAll('.pillar-tab');
  const panels = document.querySelectorAll('.pillar-panel');
  const hoverWrap = document.getElementById('svc-hover-bg');
  let currentVideoSrc = '';
  let isSwitching = false;

  tabs.forEach(tab => {
    const handleSwitch = () => {
      if (tab.classList.contains('active')) return;
      
      if (isSwitching) {
        gsap.killTweensOf(panels);
      }
      isSwitching = true;
      
      document.querySelector('.pillar-tab.active')?.classList.remove('active');
      const activePanel = document.querySelector('.pillar-panel.active');
      
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetPanel = document.getElementById(`panel-${targetId}`);
      
      if (activePanel && targetPanel && activePanel !== targetPanel) {
        gsap.to(activePanel, {
          opacity: 0,
          y: -15,
          duration: 0.2,
          overwrite: "auto",
          onComplete: () => {
            activePanel.classList.remove('active');
            panels.forEach(p => {
              if (p !== targetPanel) p.classList.remove('active');
            });
            targetPanel.classList.add('active');
            gsap.fromTo(targetPanel, 
              { opacity: 0, y: 15 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.35, 
                ease: "power2.out",
                overwrite: "auto",
                onComplete: () => {
                  isSwitching = false;
                }
              }
            );
          }
        });
      } else if (targetPanel) {
        panels.forEach(p => {
          if (p !== targetPanel) p.classList.remove('active');
        });
        targetPanel.classList.add('active');
        gsap.fromTo(targetPanel, 
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.35, 
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => {
              isSwitching = false;
            }
          }
        );
      }
    };

    tab.addEventListener('click', handleSwitch);
    tab.addEventListener('mouseenter', handleSwitch);

    // Hover Video Preview
    tab.addEventListener('mouseenter', () => {
      const vSrc = tab.getAttribute('data-video');
      if (vSrc && vSrc !== currentVideoSrc) {
        hoverWrap.innerHTML = `<video autoplay loop muted playsinline><source src="${vSrc}" type="video/mp4"></video>`;
        currentVideoSrc = vSrc;
      }
      hoverWrap.classList.add('active');
      gsap.to('#displacementMap', { attr: { scale: 35 }, duration: 0.35, yoyo: true, repeat: 1 });
    });
    
    tab.addEventListener('mouseleave', () => {
      hoverWrap.classList.remove('active');
    });
  });



  // Catalyst circles stroke animation on scroll reveal
  gsap.utils.toArray('.cat-hud-val').forEach(circle => {
    const val = parseFloat(circle.getAttribute('data-val') || 0);
    const targetOffset = 220 - (220 * val / 100);
    gsap.fromTo(circle, 
      { strokeDashoffset: 220 },
      {
        strokeDashoffset: targetOffset,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '#catalyst-matrix',
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Draggable Creator Roster track with dynamic resize-safe boundaries
  const track = document.getElementById('drag-track');
  if (track) {
    const dragInst = Draggable.create(track, {
      type: "x",
      bounds: { minX: 0, maxX: 0 },
      inertia: true
    })[0];
    
    function updateDragBounds() {
      const minX = -(track.scrollWidth - window.innerWidth + 104);
      dragInst.applyBounds({ minX: Math.min(0, minX), maxX: 0 });
    }
    
    window.addEventListener('resize', updateDragBounds);
    updateDragBounds();
  }

  // BTS collage images float depth parallax (individually scrubbed)
  gsap.utils.toArray('.collage-img').forEach((img, idx) => {
    const yMoves = [ -110, 75, -130, 120 ];
    const rotMoves = [ -10, 6, -7, 9 ];
    const yMove = yMoves[idx % yMoves.length];
    const rotMove = rotMoves[idx % rotMoves.length];
    
    gsap.fromTo(img,
      { y: 0, rotation: rotMove * 0.4 },
      {
        y: yMove,
        rotation: rotMove,
        ease: "none",
        scrollTrigger: {
          trigger: '#bts-section',
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      }
    );
  });

  // Horizontal Work Gallery Horizontal scroll with image parallax
  const workGallery = document.querySelector('.work-gallery');
  const workWrap = document.querySelector('.work-gallery-wrap');
  if (workGallery && workWrap) {
    let scrollTween = gsap.to(workGallery, {
      x: () => -(workGallery.scrollWidth - window.innerWidth + 104),
      ease: "none",
      scrollTrigger: {
        trigger: workWrap,
        pin: true,
        scrub: 1,
        end: () => "+=" + workGallery.scrollWidth
      }
    });
    
    gsap.utils.toArray('.parallax-img').forEach(img => {
      gsap.to(img, {
        x: 140,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          containerAnimation: scrollTween,
          start: "left right",
          end: "right left",
          scrub: true
        }
      });
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const a = q.nextElementSibling;
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        a.style.maxHeight = '0';
      } else {
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-a').style.maxHeight = '0';
        });
        item.classList.add('active');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Infinite Marquee
  gsap.to('.marquee-inner', { xPercent: -50, ease: "none", duration: 15, repeat: -1 });

  // Magnetic interactive items
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.32, y: y * 0.32, duration: 0.35, ease: "power2.out" });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.3)" });
    });
  });

  // Entrance reveals — one-shot, never reverse (content stays visible)
  const entryReveals = [
    { trigger: '#catalyst-matrix', elements: '#catalyst-matrix .sec-lbl, #catalyst-matrix h2, .catalyst-card' },
    { trigger: '#brand-matrix-section', elements: '#brand-matrix-section .sec-lbl, .logo-item' },
    { trigger: '#testimonial-section', elements: '#testimonial-section .test-card' },
    { trigger: '#pillars-section', elements: '#pillars-section .sec-lbl, .pillar-tab' },
    { trigger: '#tiers-section', elements: '#tiers-section .sec-lbl, .tier-card' },
    { trigger: '#roster-section', elements: '#roster-section .sec-lbl, .creator-card' },
    { trigger: '#bts-section', elements: '#bts-section .sec-lbl, .collage-img' },
    { trigger: '#faq-section', elements: '#faq-section .sec-lbl, .faq-item' },
    { trigger: '#map-section', elements: '#map-section .sec-lbl, .map-container' }
  ];

  entryReveals.forEach(rev => {
    // First ensure elements are visible (in case ScrollTrigger never fires)
    gsap.set(rev.elements, { opacity: 1, y: 0 });

    gsap.from(rev.elements, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rev.trigger,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    });
  });
});


