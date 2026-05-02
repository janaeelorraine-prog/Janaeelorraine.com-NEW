const bcrypt = require('bcryptjs');

async function authenticateAdmin(sb, adminEmail, adminPassword) {
  if (!adminEmail || !adminPassword) return null;
  const email = String(adminEmail).trim().toLowerCase();
  const { data: admin } = await sb
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();
  if (!admin) return null;
  if (!admin.is_admin) return null;
  const valid = await bcrypt.compare(adminPassword, admin.password_hash);
  if (!valid) return null;
  return admin;
}

module.exports = { authenticateAdmin };
