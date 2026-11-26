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
  ['Veeduría','Que la comunidad acompañe y vigile un proyecto para que cumpla lo que promete.']
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
  'Chips de luz': [['chip-moneda','Chip fabricado en Francia junto a una moneda de 200 pesos'],['chip-montaje','El chip, listo para probarlo con luz en el laboratorio'],['mascara','Plano del chip: tres sensores diferentes en una pieza'],['posters','Pósteres presentados en un congreso internacional en Nueva York']],
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

/* ---------- Casas del barrio en la ilustración de portada ---------- */
let sd = 7; const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
let h = '';
for (let i = 0; i < 26; i++) { const x = 40 + i*44 + r()*20, y = 245 + Math.sin(i*.5)*14 + r()*30, s = .7 + r()*.5; h += `<use href="#house" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})"/>`; }
$('#town').innerHTML = h;
}
