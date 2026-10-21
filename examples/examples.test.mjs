import test from 'node:test';
import assert from 'node:assert/strict';
import { applyPaymentEvent } from './enrollment.mjs';
import { visibleLeads } from './lead-access.mjs';
import { validatePage } from './page-config.mjs';
import { recommend } from './assessment.mjs';
const order = () => ({ orderId: 'sample-order', processed: [], collected: 0, refunded: 0, access: false, commission: 0, rateBasisPoints: 2000 });
test('duplicate delivery cannot duplicate enrollment revenue or commission', () => {
  const event = { verified: true, id: 'sample-event', orderId: 'sample-order', type: 'payment', amount: 10000 };
  const paid = applyPaymentEvent(order(), event);
  assert.equal(paid.commission, 2000);
  assert.deepEqual(applyPaymentEvent(paid, event), paid);
  assert.equal(order().collected, 0);
});
test('refunds proportionally adjust commission and full refund removes access', () => {
  const paid = applyPaymentEvent(order(), { verified: true, id: 'a', orderId: 'sample-order', type: 'payment', amount: 10000 });
  const partial = applyPaymentEvent(paid, { verified: true, id: 'b', orderId: 'sample-order', type: 'refund', amount: 2500 });
  assert.equal(partial.commission, 1500); assert.equal(partial.access, true);
  const full = applyPaymentEvent(partial, { verified: true, id: 'c', orderId: 'sample-order', type: 'refund', amount: 7500 });
  assert.equal(full.access, false); assert.equal(full.commission, 0);
});
test('unverified and mismatched payment events are rejected', () => {
  assert.throws(() => applyPaymentEvent(order(), { verified: false }));
  assert.throws(() => applyPaymentEvent(order(), { verified: true, id: 'x', orderId: 'other' }));
});
test('partner cannot see another owner’s records or private contact fields', () => {
  const leads = [{ id: 'sample-1', ownerId: 'partner-a', stage: 'new', email: 'sample@example.invalid' }, { id: 'sample-2', ownerId: 'partner-b', stage: 'warm' }];
  assert.deepEqual(visibleLeads({ active: true, role: 'partner', id: 'partner-a' }, leads), [{ id: 'sample-1', ownerId: 'partner-a', stage: 'new' }]);
  assert.deepEqual(visibleLeads({ active: false, role: 'admin' }, leads), []);
  assert.deepEqual(visibleLeads({ active: true, role: 'affiliate' }, leads), []);
});
test('page configuration rejects duplicate sections and unsupported types', () => {
  assert.throws(() => validatePage({ title: 'Sample', sections: [{ id: 'a', type: 'script' }] }));
  assert.throws(() => validatePage({ title: 'Sample', sections: [{ id: 'a', type: 'hero' }, { id: 'a', type: 'contact' }] }));
  assert.deepEqual(validatePage({ title: ' Sample ', sections: [{ id: 'a', type: 'hero', privateField: 'omit' }] }), { title: 'Sample', sections: [{ id: 'a', type: 'hero' }] });
});
test('assessment rejects invalid inputs and explains ranked recommendations', () => {
  assert.throws(() => recommend({ manualWork: '3', missedInquiries: 1 }));
  assert.deepEqual(recommend({ manualWork: 0, missedInquiries: 0 }), []);
  const result = recommend({ manualWork: 1, missedInquiries: 3 });
  assert.equal(result[0].capability, 'Customer intake'); assert.ok(result[0].reason);
});
