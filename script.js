function r(v) { return Math.round(v); }
function fmt(v) { return r(v).toLocaleString('ru-RU') + ' ₽'; }
 
function calc() {
  const hourly   = parseFloat(document.getElementById('hourly').value)   || 0;
  const overhead = parseFloat(document.getElementById('overhead').value) || 0;
  const orders   = parseFloat(document.getElementById('orders').value)   || 1;
  const margin   = parseFloat(document.getElementById('margin').value)   || 0;
  const discount = parseFloat(document.getElementById('discount').value) || 0;
 
  const mTime = parseFloat(document.getElementById('m-time').value) || 0;
  const mCosm = parseFloat(document.getElementById('m-cosm').value) || 0;
  const mCons = parseFloat(document.getElementById('m-cons').value) || 0;
 
  const hTime = parseFloat(document.getElementById('h-time').value) || 0;
  const hProd = parseFloat(document.getElementById('h-prod').value) || 0;
  const hCons = parseFloat(document.getElementById('h-cons').value) || 0;
 
  const overPer  = overhead / orders;
  const mLabor   = (mTime / 60) * hourly;
  const hLabor   = (hTime / 60) * hourly;
  const mMat     = mCosm + mCons;
  const hMat     = hProd + hCons;
  const mCost    = mMat + mLabor + overPer;
  const hCost    = hMat + hLabor + overPer;
  const mFull    = mCost * (1 + margin / 100);
  const hFull    = hCost * (1 + margin / 100);
  const mFinal   = r(mFull * (1 - discount / 100));
  const hFinal   = r(hFull * (1 - discount / 100));
  const combo    = r((mFull + hFull) * (1 - discount / 100));
 
  set('out-makeup', fmt(mFinal));
  set('out-hair',   fmt(hFinal));
  set('out-combo',  fmt(combo));
  set('out-makeup-base', discount > 0 ? `Без скидки: ${fmt(r(mFull))}` : '');
  set('out-hair-base',   discount > 0 ? `Без скидки: ${fmt(r(hFull))}` : '');
  set('discount-badge', discount > 0 ? `−${r(discount)}% скидка` : 'Без скидки');
 
  set('b-m-mat',   fmt(mMat));
  set('b-m-labor', fmt(mLabor));
  set('b-m-over',  fmt(overPer));
  set('b-m-cost',  fmt(mCost));
  set('b-h-mat',   fmt(hMat));
  set('b-h-labor', fmt(hLabor));
  set('b-h-over',  fmt(overPer));
  set('b-h-cost',  fmt(hCost));
 
  ['out-makeup','out-hair','out-combo'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('updated');
    void el.offsetWidth;
    el.classList.add('updated');
    setTimeout(() => el.classList.remove('updated'), 800);
  });
}
 
function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
 
function switchTab(name) {
  document.querySelectorAll('.tab').forEach((t, i) => {
    t.classList.toggle('active', (i === 0 && name === 'makeup') || (i === 1 && name === 'hair'));
  });
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
}
 
function toggleHelp(btn) {
  const body = document.getElementById('help-body');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
}
 
document.querySelectorAll('input[type="number"]').forEach(el => el.addEventListener('input', calc));
calc();