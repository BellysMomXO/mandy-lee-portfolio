// Illustrative deterministic logic, not production scoring or financial advice.
export function recommend({ manualWork, missedInquiries }) {
  for (const answer of [manualWork, missedInquiries]) {
    if (!Number.isInteger(answer) || answer < 0 || answer > 3) throw new Error('Answers must be integers from 0 to 3');
  }
  return [
    { capability: 'Workflow automation', score: manualWork, reason: 'Reduce repeated manual steps.' },
    { capability: 'Customer intake', score: missedInquiries, reason: 'Make it easier to capture and route inquiries.' },
  ].filter(item => item.score > 0).sort((a, b) => b.score - a.score);
}
