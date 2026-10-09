const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
});

// Cache active tenant ID
let cachedTenantId = null;

async function getActiveTenantId() {
  if (cachedTenantId !== null) {
    return cachedTenantId;
  }

  // 1. Check if TENANT_ID is explicitly configured in environment
  if (process.env.TENANT_ID) {
    cachedTenantId = parseInt(process.env.TENANT_ID, 10);
    return cachedTenantId;
  }

  try {
    // 2. Search for a tenant matching 'aurelia'
    const aureliaTenant = await prisma.tenant.findFirst({
      where: {
        isActive: true,
        Businessname: {
          contains: 'aurelia',
          mode: 'insensitive'
        }
      }
    });

    if (aureliaTenant) {
      cachedTenantId = aureliaTenant.id;
      return cachedTenantId;
    }

    // 3. Fallback to the first active tenant
    const tenant = await prisma.tenant.findFirst({
      where: { isActive: true }
    });
    if (!tenant) {
      console.warn('Warning: No active tenant found in the database.');
      return 1; // Fallback to tenant ID 1
    }
    cachedTenantId = tenant.id;
    return cachedTenantId;
  } catch (error) {
    console.error('Error fetching active tenant:', error.message);
    return 1; // Fallback
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = {
  prisma,
  getActiveTenantId
};
