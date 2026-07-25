// @ts-nocheck
// Prisma singleton — run `npm run db:generate` locally to get full types

let prisma: any;

if (process.env.NODE_ENV === 'production') {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    const { PrismaClient } = require('@prisma/client');
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export { prisma };
