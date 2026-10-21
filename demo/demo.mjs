import { applyPaymentEvent } from '../examples/enrollment.mjs';
import { validatePage } from '../examples/page-config.mjs';
import { recommend } from '../examples/assessment.mjs';
const tabs = [...document.querySelectorAll('[role=tab]')];
function activate(button) {
  for (const tab of tabs) tab.setAttribute('aria-selected', String(tab === button));
  for (const panel of document.querySelectorAll('.tab')) panel.hidden = panel.id !== button.dataset.tab;
}
for (const [index, button] of tabs.entries()) {
  button.addEventListener('click', () => activate(button));
  button.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    activate(tabs[next]); tabs[next].focus();
  });
}
const initial = () => ({ orderId: 'sample-order', processed: [], collected: 0, refunded: 0, access: false, commission: 0, rateBasisPoints: 2000 });
let state = initial();
function show() { document.querySelector('#school-result').textContent = `Collected: $${state.collected / 100}\nRefunded: $${state.refunded / 100}\nAccess: ${state.access ? 'unlocked' : 'locked'}\nSample commission: $${state.commission / 100}\nUnique events: ${state.processed.length}`; }
function event(type) {
  if (type === 'refund' && !state.collected) { document.querySelector('#school-result').textContent = 'Apply a sample payment first.'; return; }
  state = applyPaymentEvent(state, { id: `sample-${type}`, orderId: 'sample-order', verified: true, type, amount: 10000 }); show();
}
document.querySelector('#pay').onclick = () => event('payment');
document.querySelector('#duplicate').onclick = () => event('payment');
document.querySelector('#refund').onclick = () => event('refund');
document.querySelector('#reset').onclick = () => { state = initial(); show(); };
document.querySelector('#validate').onclick = () => {
  const choice = document.querySelector('#structure').value;
  const sections = choice === 'valid' ? [{ id: 'a', type: 'hero' }, { id: 'b', type: 'services' }, { id: 'c', type: 'contact' }] : choice === 'duplicate' ? [{ id: 'a', type: 'hero' }, { id: 'a', type: 'contact' }] : [{ id: 'a', type: 'script' }];
  try { const page = validatePage({ title: 'Sample Business', sections }); document.querySelector('#studio-result').textContent = `Valid configuration: ${page.sections.map(s => s.type).join(' → ')}`; }
  catch (error) { document.querySelector('#studio-result').textContent = error.message; }
};
document.querySelector('#recommend').onclick = () => {
  const items = recommend({ manualWork: Number(document.querySelector('#manual').value), missedInquiries: Number(document.querySelector('#missed').value) });
  document.querySelector('#assessment-result').textContent = items.map(i => `${i.capability}: ${i.reason}`).join('\n') || 'No recommendation from these sample answers.';
};
