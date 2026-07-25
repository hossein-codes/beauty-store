// Temporary type declaration for PrismaClient
// Run `npm run db:generate` (or `npx prisma generate`) to replace this with real generated types.

declare module '@prisma/client' {
  export class PrismaClient {
    product: any;
    category: any;
    user: any;
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    $transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T>;
  }
}
