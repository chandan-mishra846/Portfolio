export function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'] || req.headers['authorization']?.replace('Bearer ', '');
  if (!process.env.ADMIN_TOKEN) return res.status(500).json({ error: 'Admin token not configured' });
  if (token !== process.env.ADMIN_TOKEN) return res.status(403).json({ error: 'Forbidden' });
  next();
}
