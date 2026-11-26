/* =====================================================================
   Boletín Fotón-IA — comportamiento de la página.
   No hace falta editar este archivo para cambiar textos (están en
   index.html) ni medios (están en assets/js/config.js).
   Las listas que sí viven aquí están marcadas con "EDITABLE".
   ===================================================================== */
{
const CFG = window.FOTONIA_CONFIG || {MEDIA_BASE:'media/',EXTENSION:'.jpg',VIDEO:{},OVERRIDES:{}};
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- Medios: arma la URL de cada imagen a partir de config.js ---------- */
const mediaUrl = key => CFG.OVERRIDES && CFG.OVERRIDES[key] ? CFG.OVERRIDES[key] : (CFG.MEDIA_BASE || '') + key + (CFG.EXTENSION || '');
const missing = img => {
  if (img.dataset.fallback === 'name') {          // logos: si falta el archivo, se muestra solo el nombre
    const n = document.createElement('div');
    n.className = 'lg-name';
    n.textContent = img.alt;
    img.replaceWith(n);
    return;
  }
  const d = document.createElement('div');
  d.className = 'media-missing';
  d.textContent = 'Imagen pendiente: ' + (img.dataset.media || '') + ' (revise assets/js/config.js)';
  img.replaceWith(d);
};
const loadImg = img => {
  img.addEventListener('error', () => missing(img), {once:true});
  img.loading = 'lazy';
  img.decoding = 'async';
  img.src = mediaUrl(img.dataset.media);
};
document.querySelectorAll('img[data-media]').forEach(loadImg);

/* ---------- Índice y números de página ---------- */
const pages = [...document.querySelectorAll('.page[data-t]')];
$('#tocList').innerHTML = pages.map((p,i) => `<li><a href="#${p.id}"><span class="n">${i+1}</span>${esc(p.dataset.t)}<i></i><em>p. ${i+3}</em></a></li>`).join('');
pages.forEach((p,i) => { const pg = p.querySelector('.pg'); if (pg) pg.textContent = 'Página ' + (i+3); });

/* ---------- Capítulo 3: un día de medición (ejemplo ilustrativo) ---------- */
const bad = [4,5,6,7,37];   // medias horas con vertimiento: 2:00–4:00 a. m. y 6:30 p. m.
const day = $('#day');
day.innerHTML = Array.from({length:48}, () => '<span></span>').join('');
const cells = [...day.children];
const show = m => {
  $('#mHoy').setAttribute('aria-pressed', m === 'hoy');
  $('#mFoton').setAttribute('aria-pressed', m !== 'hoy');
  cells.forEach((c,i) => { c.className = m === 'hoy' ? (i === 20 ? 'sample' : '') : (bad.includes(i) ? 'bad' : 'm'); });
  const v = $('#verdict');
  if (m === 'hoy') { v.className = 'verdict'; v.textContent = 'La muestra de las 10 a. m. dice que el agua está normal. El vertimiento de las 2 a. m. y el de la tarde pasaron sin que nadie lo supiera.'; }
  else { v.className = 'verdict alert'; v.textContent = 'Con 48 mediciones al día, el sistema detecta el vertimiento a las 2 a. m., avisa en el Tablero y queda registrado con hora y lugar para la denuncia.'; }
};
$('#mHoy').addEventListener('click', () => show('hoy'));
$('#mFoton').addEventListener('click', () => show('foton'));
show('hoy');

/* ---------- Capítulo 4: glosario (EDITABLE) ---------- */
const glosario = [
  ['Fotónica','La ciencia de usar la luz. La luz cambia cuando toca agua contaminada, y ese cambio se puede medir.'],
  ['Chip de luz','Una pieza más pequeña que una moneda, con caminos por donde viaja la luz. Funciona como un sensor muy sensible.'],
  ['Fibra óptica','Un hilo de vidrio o plástico que lleva luz. Si se modifica, sirve para “sentir” el agua.'],
  ['Inteligencia artificial','Programas que aprenden de muchos datos a reconocer patrones, por ejemplo, cómo se ve un vertimiento.'],
  ['Tiempo real','Saber lo que pasa casi en el mismo momento en que ocurre, no días después.'],
  ['Alerta temprana','Un aviso que llega a tiempo para actuar: verificar, denunciar o protegerse.'],
  ['Veeduría','Que la comunidad acompañe y vigile un proyecto para que cumpla lo que promete.'],
  ['Transmisión inalámbrica (MQTT)','La forma en que la caja envía sus mediciones, sin cables y de manera automática, hasta el sistema. MQTT es el “idioma” que usan para hablar entre ellas.'],
  ['Semáforo de riesgo','Colores que resumen cómo está el agua. Naranja (alto) o rojo (muy alto) es una alerta temprana: algo se salió de lo normal y conviene verificar.'],
  ['Bandas de incertidumbre','La franja sombreada alrededor de la línea en la gráfica de la app. Muestra el margen que la inteligencia artificial espera alrededor de su predicción.']
];
$('#gloss').innerHTML = glosario.map(g => `<button type="button" class="card" aria-pressed="false"><b>${esc(g[0])}</b><span class="front"><small>Ver significado</small></span><span class="back">${esc(g[1])}</span></button>`).join('');
$('#gloss').addEventListener('click', e => { const c = e.target.closest('.card'); if (!c) return; const on = c.classList.toggle('on'); c.setAttribute('aria-pressed', on); });

/* ---------- Capítulo 5: video del sensor y sus pasos (EDITABLE: segundos y textos) ---------- */
const pasos = [
  [0,  'La caja junto a la quebrada','Una manguera lleva agua de la quebrada a una caja pequeña de medición.'],
  [12, '¿Qué hay dentro?','Una microbomba que mueve el agua, un chip y un lector de luz.'],
  [17, 'La luz mide el agua','Un diodo envía luz al anillo del chip mientras el agua pasa por encima.'],
  [25, 'El plomo corre la señal','Si hay plomo, el pico de luz se corre. Ese corrimiento se convierte en cuánto plomo hay.'],
  [36, 'El dato viaja','La caja envía la medición sin cables, por internet, hacia las casas.'],
  [41, 'Cada familia ve el riesgo','En una página se ve la cifra y un color: verde, naranja o rojo.']
];
const fmt = s => '0:' + String(s).padStart(2,'0');
$('#vsteps').innerHTML = pasos.map((p,i) => `<li><button type="button" data-i="${i}"><time>${fmt(p[0])}</time><b>${i+1}. ${esc(p[1])}</b><span>${esc(p[2])}</span></button></li>`).join('');
const vbox = $('#video');
const V = CFG.VIDEO || {};
let seek = () => {};
if (V.mp4) {
  const vid = document.createElement('video');
  vid.controls = true; vid.playsInline = true; vid.preload = 'metadata';
  if (V.portada) vid.poster = mediaUrl(V.portada);
  vid.src = V.mp4;
  vid.addEventListener('error', () => { vbox.innerHTML = '<div class="media-missing">Video pendiente (revise VIDEO en assets/js/config.js)</div>'; });
  vbox.appendChild(vid);
  seek = t => { vid.currentTime = t; vid.play().catch(() => {}); };
  vid.addEventListener('timeupdate', () => {
    let k = 0; pasos.forEach((p,i) => { if (vid.currentTime >= p[0]) k = i; });
    document.querySelectorAll('#vsteps button').forEach((b,i) => b.setAttribute('aria-current', i === k));
  });
} else if (V.youtube) {
  const id = encodeURIComponent(V.youtube);
  const frame = start => `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1${start !== undefined ? '&autoplay=1&start=' + start : ''}" title="Video del sensor fotónico" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  vbox.innerHTML = frame();
  seek = t => { vbox.innerHTML = frame(t); };
} else {
  vbox.innerHTML = '<div class="media-missing">Video pendiente (revise VIDEO en assets/js/config.js)</div>';
}
$('#vsteps').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('#vsteps button').forEach(x => x.setAttribute('aria-current', x === b));
  seek(pasos[+b.dataset.i][0]);
});

/* ---------- Capítulo 8: galería por temas (EDITABLE: nombre del archivo y pie de foto) ---------- */
const galeria = {
  'Con la JAC': [['comunidad-grupo','Equipo Fotón-IA en la sede de la JAC Guanteros'],['comunidad-reunion','Reunión de trabajo con la comunidad'],['comunidad-charla','Diálogo con la JAC sobre los puntos de medición']],
  'Chips de luz': [['chip-nitruro','Chip de nitruro de silicio fabricado en Francia'],['chip-moneda','Chip fabricado en Francia junto a una moneda de 200 pesos'],['chip-montaje','El chip, listo para probarlo con luz en el laboratorio'],['mascara','Plano del chip: tres sensores diferentes en una pieza']],
  'Congresos': [['congreso-laop','Charla en el congreso latinoamericano de óptica LAOP 2026, Bogotá'],['congreso-poster-udem','Presentando un póster del proyecto'],['posters','Tres pósteres en el congreso internacional de óptica, Nueva York'],['poster-itm','Póster del ITM en un congreso internacional en línea']],
  'Sensores': [['nodo-sensores','Sensores conectados a la caja de medición'],['nodo-oled','La caja de medición mostrando sus lecturas'],['lab-montaje','Pruebas con fibras ópticas en el ITM'],['lab-fibras','Montaje con luz en el laboratorio'],['lab-fibra-optica','Equipo para trabajar las fibras ópticas']],
  'Agua y energía': [['bio-reactores','Celdas que buscan sacar energía del agua, en la UdeA'],['bio-muestras','Muestras de agua en análisis'],['bio-lab','Trabajo de laboratorio con las muestras'],['bio-horno','Horno para medir la arena y el barro del agua'],['bio-celda','Montaje de una celda de laboratorio']],
  'La app': [['app-concentraciones','Prototipo de la app con los datos del agua'],['app-riesgo','Medidor de riesgo en el celular'],['app-tendencia','La historia del día y las alertas']]
};
const temas = Object.keys(galeria);
const gal = $('#gal');
const setG = k => {
  [...$('#tabs').children].forEach(b => b.setAttribute('aria-pressed', b.dataset.k === k));
  gal.innerHTML = galeria[k].map(([f,c]) => `<figure><img data-media="${esc(f)}" alt="${esc(c)}" data-cap="${esc(c)}"><figcaption>${esc(c)}</figcaption></figure>`).join('');
  gal.querySelectorAll('img[data-media]').forEach(loadImg);
  gal.scrollTo({left:0});
};
$('#tabs').innerHTML = temas.map(k => `<button type="button" data-k="${esc(k)}">${esc(k)}</button>`).join('');
$('#tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setG(b.dataset.k); });
setG(temas[0]);
const step = d => { const f = gal.querySelector('figure'); gal.scrollBy({left: d * ((f ? f.offsetWidth : 300) + 12), behavior:'smooth'}); };
$('#gPrev').addEventListener('click', () => step(-1));
$('#gNext').addEventListener('click', () => step(1));
gal.addEventListener('keydown', e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });

/* ---------- Foto ampliada (toque cualquier foto) ---------- */
const lb = $('#lb');
document.addEventListener('click', e => {
  const im = e.target.closest('img[data-cap]'); if (!im) return;
  $('#lbImg').src = im.currentSrc || im.src; $('#lbImg').alt = im.alt; $('#lbCap').textContent = im.dataset.cap;
  lb.classList.add('on'); $('#lbX').focus();
});
const close = () => lb.classList.remove('on');
$('#lbX').addEventListener('click', close);
lb.addEventListener('click', e => { if (e.target === lb) close(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

/* ---------- Capítulo 12: lista de veeduría (EDITABLE) ---------- */
const preguntas = [
  '¿Ya se definieron con la JAC los puntos exactos donde se instalarán los equipos?',
  '¿Cómo van las pruebas de los chips de luz?',
  '¿Cuándo se instala la primera estación en La Picacha?',
  '¿Qué indicadores tendrá el Tablero Comunitario y cómo los veremos?',
  '¿Cuándo empiezan los talleres de Vigías Ambientales?',
  '¿Quién cuidará los equipos y a quién avisamos si hay un daño?',
  '¿Cuándo es la próxima reunión del Comité JAC–Academia?'
];
const KEY = 'fotonia-veeduria-n1';
let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
$('#check').innerHTML = preguntas.map((t,i) => `<li><label><input type="checkbox" id="v${i}"><span>${esc(t)}</span></label></li>`).join('');
const upd = () => { const n = preguntas.filter((_,i) => $('#v'+i).checked).length; $('#prog').textContent = `${n} de ${preguntas.length} preguntas revisadas`; };
preguntas.forEach((_,i) => {
  const c = $('#v'+i); c.checked = !!saved[i];
  c.addEventListener('change', () => { saved[i] = c.checked; try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} upd(); });
});
$('#reset').addEventListener('click', () => { saved = {}; preguntas.forEach((_,i) => $('#v'+i).checked = false); try { localStorage.removeItem(KEY); } catch (e) {} upd(); });
upd();

/* ---------- Barra inferior: capítulo actual, anterior y siguiente ---------- */
let cur = -1;
const setCur = i => {
  cur = i; const w = $('#where');
  if (i < 0) { w.innerHTML = 'Portada<small>Boletín Fotón-IA</small>'; }
  else { w.textContent = pages[i].dataset.t; const s = document.createElement('small'); s.textContent = `Capítulo ${i+1} de ${pages.length}`; w.appendChild(s); }
  $('#meter').style.width = ((i+1) / pages.length * 100) + '%';
  $('#prev').disabled = i < 0; $('#next').disabled = i >= pages.length - 1;
};
const pageObserver = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setCur(pages.indexOf(e.target)); }), {rootMargin:'-45% 0px -50% 0px'});
pages.forEach(p => pageObserver.observe(p));
const coverObserver = new IntersectionObserver(es => { if (es[0].isIntersecting) setCur(-1); }, {rootMargin:'-45% 0px -50% 0px'});
coverObserver.observe($('#portada'));
$('#prev').addEventListener('click', () => (cur <= 0 ? $('#portada') : pages[cur-1]).scrollIntoView());
$('#next').addEventListener('click', () => pages[Math.min(cur+1, pages.length-1)].scrollIntoView());
setCur(-1);

/* ---------- Capítulo 14: formulario de evaluación (Google Forms) ---------- */
{
  const url = CFG.FORM_URL || '';
  const open = $('#formOpen'), here = $('#formHere'), box = $('#formFrame');
  if (!url) {
    open.replaceWith(Object.assign(document.createElement('p'), {className:'note', textContent:'Formulario pendiente (revise FORM_URL en assets/js/config.js).'}));
    here.remove();
  } else {
    open.href = url;
    here.addEventListener('click', () => {
      const show = box.hidden;
      box.hidden = !show;
      here.setAttribute('aria-expanded', show);
      here.textContent = show ? 'Ocultar el formulario' : 'Responderlo aquí mismo';
      if (show && !box.firstChild) {   // el formulario solo se carga si la persona lo pide
        const f = document.createElement('iframe');
        f.src = url + '?embedded=true';
        f.title = 'Formulario de evaluación de la capacitación Fotón-IA';
        f.loading = 'lazy';
        box.appendChild(f);
      }
      if (show) box.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
}

/* ---------- Capítulo 6: simulador del semáforo del agua (ejemplo pedagógico) ---------- */
{
  const T = $('#sTurb'), P = $('#sPh'), O = $('#sOx'), Pb = $('#sPb');
  // EDITABLE: niveles del medidor (límite superior, nombre, color, qué hacer)
  const niveles = [
    [.15,'Muy bajo','#1f8a4c','Todo tranquilo.','La quebrada está como en un día normal. Los sensores siguen midiendo cada 30 minutos.'],
    [.35,'Bajo','#6aa82f','Normal, con pequeños cambios.','Nada que hacer por ahora. El sistema sigue vigilando.'],
    [.55,'Moderado','#d9a400','Atención.','Algo está cambiando, por ejemplo después de un aguacero. El sistema vigila de cerca.'],
    [.75,'Alto','#f08c2a','Alerta temprana (naranja).','Algo se salió de lo normal. El Comité JAC–Academia verifica en el punto, toma fotos y anota la hora.'],
    [9,'Muy alto','#e4573d','Alerta (rojo).','Posible vertimiento. Evite el contacto con el agua, avise al comité y reporte a la autoridad ambiental con los datos del sistema.']
  ];
  // EDITABLE: momentos de ejemplo [turbiedad, pH, oxígeno, plomo µg/L]
  const momentos = { normal:[12,7.3,7.8,2], lluvia:[180,7.1,6.8,6], oxigeno:[40,7.0,1.8,3], plomo:[20,7.2,7.0,32], vertimiento:[220,9.6,2.2,28] };
  // arcos del medidor
  const arcs = $('#simArcs'), R = 92, cx = 120, cy = 120;
  const pt = a => [cx + R*Math.cos(Math.PI*(1-a)), cy - R*Math.sin(Math.PI*(1-a))];
  let a0 = 0;
  arcs.innerHTML = niveles.map((n,i) => {
    const a1 = (i+1)/niveles.length, [x0,y0] = pt(a0+.006), [x1,y1] = pt(a1-.006); a0 = a1;
    return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${n[2]}" stroke-width="22"/>`;
  }).join('');
  // burbujas
  const bubG = $('#simBubbles');
  bubG.innerHTML = Array.from({length:10}, (_,i) => `<circle class="bub" cx="${18 + i*21}" cy="${140 - (i%3)*8}" r="${2 + (i%3)}" style="animation-delay:${(-i*.37).toFixed(2)}s"/>`).join('');
  const bubs = [...bubG.children];
  // partículas de plomo: puntos grises que aparecen en el agua según la concentración
  let sd = 11; const rnd = () => (sd = sd*16807 % 2147483647) / 2147483647;
  $('#simLead').innerHTML = Array.from({length:25}, () => `<circle cx="${(8 + rnd()*224).toFixed(0)}" cy="${(74 + rnd()*70).toFixed(0)}" r="${(1.4 + rnd()*1.6).toFixed(1)}"/>`).join('');
  const leads = [...$('#simLead').children];
  const mix = (c1, c2, k) => { const h = c => [1,3,5].map(i => parseInt(c.slice(i,i+2),16)); const A = h(c1), B = h(c2); return 'rgb(' + A.map((v,i) => Math.round(v + (B[i]-v)*k)).join(',') + ')'; };
  const clamp = v => Math.max(0, Math.min(1, v));
  const fmt = v => String(v).replace('.', ',');
  const calc = () => {
    const t = +T.value, p = +P.value, o = +O.value, b = +Pb.value;
    // plomo: sin riesgo bajo 5 µg/L; el límite del agua para tomar (10 µg/L) ya suma; desde 30 µg/L es el máximo
    const s = [clamp((t-25)/225), clamp(Math.max(6.5-p, p-8.5)/2), clamp((6-o)/5), clamp((b-5)/25)];
    const mx = Math.max(...s), risk = .65*mx + .35*(s[0]+s[1]+s[2]+s[3])/4;
    const n = niveles.find(x => risk < x[0]);
    $('#vTurb').textContent = (t < 10 ? 'Cristalina' : t < 50 ? 'Un poco turbia' : t < 150 ? 'Turbia' : 'Muy turbia') + ' · ' + t + ' NTU';
    $('#vPh').textContent = (p < 6.5 ? 'Ácida' : p <= 8.5 ? 'Normal' : 'Alcalina, como jabonosa') + ' · ' + fmt(p.toFixed(1));
    $('#vPb').textContent = (b < 5 ? 'Muy bajo' : b <= 10 ? 'Dentro del límite' : b < 25 ? 'Por encima del límite' : 'Muy alto') + ' · ' + fmt(b.toFixed(1)) + ' µg/L';
    $('#vOx').textContent = (o < 3 ? 'Muy poco' : o < 5 ? 'Poco' : 'Bueno') + ' · ' + fmt(o.toFixed(1)) + ' mg/L';
    $('#simNeedle').style.transform = 'rotate(' + (-90 + Math.min(risk,1)*180).toFixed(1) + 'deg)';
    const lv = $('#simLevel'); lv.textContent = n[1]; lv.style.color = n[2];
    $('#simMsg').style.borderLeftColor = n[2];
    $('#simMsgT').textContent = n[3]; $('#simMsgT').style.color = n[2];
    $('#simMsgD').textContent = n[4];
    const why = ['la turbiedad', 'la acidez', 'el poco oxígeno', 'el plomo'][s.indexOf(mx)];
    $('#simWhy').textContent = risk >= .15 ? 'Lo que más pesa ahora: ' + why + '.' : '';
    $('#simWater').setAttribute('fill', mix('#3fb3c9', '#8a6a3a', clamp(t/260)));
    $('#simFoam').setAttribute('opacity', clamp((Math.max(s[0], s[1]) - .5)/.3).toFixed(2));   // espuma: agua turbia o jabonosa
    $('#simFish').setAttribute('opacity', (1 - clamp(s[2]*1.1 + s[1]*.6 + s[3]*.8)).toFixed(2));   // los peces se van con poco oxígeno, acidez o plomo
    $('#simLed').setAttribute('fill', n[2]);
    const np = Math.round(b/2);
    leads.forEach((d,i) => d.style.display = i < np ? '' : 'none');
    const nb = Math.round(o);
    bubs.forEach((b,i) => b.style.display = i < nb ? '' : 'none');
  };
  [T,P,O,Pb].forEach(r => r.addEventListener('input', () => { document.querySelectorAll('.sim-presets button').forEach(b => b.setAttribute('aria-pressed', false)); calc(); }));
  document.querySelector('.sim-presets').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const v = momentos[b.dataset.p]; [T.value, P.value, O.value, Pb.value] = v;
    document.querySelectorAll('.sim-presets button').forEach(x => x.setAttribute('aria-pressed', x === b));
    calc();
  });
  document.querySelector('.sim-presets button').setAttribute('aria-pressed', true);
  calc();
}

/* ---------- Lo que sigue: las paradas aparecen una a una al llegar al río ---------- */
{
  const river = document.getElementById('river');
  if (river && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    river.classList.add('anim');
    const riverObserver = new IntersectionObserver(es => { if (es[0].isIntersecting) { river.classList.add('go'); riverObserver.disconnect(); } }, {threshold:.25});
    riverObserver.observe(river);
  }
}

/* ---------- Portada: el celular muestra datos que cambian (ilustrativo) ---------- */
{
  const line = document.getElementById('phLine'), end = document.getElementById('phEnd');
  const card = document.getElementById('phCard'), dot = document.getElementById('phDot');
  const st = document.getElementById('phState'), val = document.getElementById('phVal');
  // 0 = agua tranquila, 1 = vertimiento fuerte. La serie se repite en bucle.
  const guion = [.25,.3,.22,.28,.32,.26,.3,.35,.5,.72,.9,.84,.62,.42,.3,.27,.24,.3,.26,.22];
  let datos = guion.slice(0,12), k = 12;
  const estados = [
    [.55,'Bien','#e6f4dc','#5e9a1c','#2f5c0c'],
    [.78,'Atención','#fff1d6','#e09a1a','#7a4c00'],
    [9,'Alerta','#fde2dc','#e4573d','#8f2412']
  ];
  const pinta = () => {
    const pts = datos.map((v,i) => [18 + i*(84/11), 180 - v*46]);
    line.setAttribute('points', pts.map(p => p[0].toFixed(1)+','+p[1].toFixed(1)).join(' '));
    const u = pts[pts.length-1]; end.setAttribute('cx', u[0]); end.setAttribute('cy', u[1]);
    const v = datos[datos.length-1];
    const e = estados.find(x => v < x[0]);
    st.textContent = e[1]; card.setAttribute('fill', e[2]); dot.setAttribute('fill', e[3]); st.setAttribute('fill', e[4]);
    end.setAttribute('fill', e[3]);
    const ph = (7.3 - v*1.4).toFixed(1).replace('.', ',');
    val.textContent = 'pH ' + ph + ' · ' + (23 + Math.round(v*3)) + ' °C';
  };
  pinta();
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => { datos.shift(); datos.push(guion[k % guion.length]); k++; pinta(); }, 1500);
  }
}

/* ---------- Portada: en pantallas angostas se encuadra la caja y el celular ---------- */
{
  const scene = document.querySelector('.scene svg');
  const mq = matchMedia('(max-width: 600px)');
  const frame = () => scene.setAttribute('viewBox', mq.matches ? '400 0 700 470' : '0 0 1200 470');
  frame(); mq.addEventListener('change', frame);
}

/* ---------- Casas del barrio en la ilustración de portada ---------- */
let sd = 7; const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
let h = '';
for (let i = 0; i < 26; i++) { const x = 40 + i*44 + r()*20, y = 245 + Math.sin(i*.5)*14 + r()*30, s = .7 + r()*.5; h += `<use href="#house" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})"/>`; }
$('#town').innerHTML = h;
}
