// Reduced portfolio example. Verification must occur on a trusted server before
// constructing these events. The boolean below is not a signature verifier.
export function applyPaymentEvent(state, event) {
  if (!event.verified || !event.id || event.orderId !== state.orderId) {
    throw new Error('A verified event for this order is required');
  }
  if (state.processed.includes(event.id)) return state;
  if (!['payment', 'refund'].includes(event.type)) throw new Error('Unknown event');
  if (!Number.isSafeInteger(event.amount) || event.amount < 0) throw new Error('Invalid amount');
  const next = { ...state, processed: [...state.processed, event.id] };
  if (event.type === 'payment') next.collected += event.amount;
  else next.refunded += event.amount;
  next.access = next.collected > next.refunded;
  next.commission = Math.floor(Math.max(0, next.collected - next.refunded) * next.rateBasisPoints / 10000);
  return next;
}
