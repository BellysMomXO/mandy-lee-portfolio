// Only structural configuration is handled here, not HTML or script injection.
const allowed = new Set(['hero', 'services', 'testimonials', 'contact']);
export function validatePage(page) {
  if (!page || typeof page.title !== 'string' || !page.title.trim()) throw new Error('A page title is required');
  if (!Array.isArray(page.sections) || page.sections.length === 0 || page.sections.length > 12) throw new Error('Invalid section count');
  const ids = new Set();
  for (const section of page.sections) {
    if (!section || typeof section.id !== 'string' || !section.id || ids.has(section.id) || !allowed.has(section.type)) throw new Error('Invalid or duplicate section');
    ids.add(section.id);
  }
  return { title: page.title.trim(), sections: page.sections.map(({ id, type }) => ({ id, type })) };
}
