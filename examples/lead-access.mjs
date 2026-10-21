// Pure policy example. Production routes must enforce authorization server-side.
export function visibleLeads(actor, leads) {
  if (!actor?.active) return [];
  if (actor.role === 'admin') return leads.map(({ id, stage, ownerId }) => ({ id, stage, ownerId }));
  if (actor.role !== 'partner') return [];
  return leads.filter(lead => lead.ownerId === actor.id)
    .map(({ id, stage, ownerId }) => ({ id, stage, ownerId }));
}
