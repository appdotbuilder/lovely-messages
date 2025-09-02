import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas and handlers
import { 
  createLoveMessageInputSchema, 
  getMessagesByCategoryInputSchema 
} from './schema';
import { createLoveMessage } from './handlers/create_love_message';
import { getRandomLoveMessage } from './handlers/get_random_love_message';
import { getAllLoveMessages } from './handlers/get_all_love_messages';
import { getMessageCategories } from './handlers/get_message_categories';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Core functionality: Get a random love message (with optional category filter)
  getRandomLoveMessage: publicProcedure
    .input(getMessagesByCategoryInputSchema)
    .query(({ input }) => getRandomLoveMessage(input)),
  
  // Create a new love message
  createLoveMessage: publicProcedure
    .input(createLoveMessageInputSchema)
    .mutation(({ input }) => createLoveMessage(input)),
  
  // Get all love messages (with optional category filter)
  getAllLoveMessages: publicProcedure
    .input(getMessagesByCategoryInputSchema)
    .query(({ input }) => getAllLoveMessages(input)),
  
  // Get all available message categories
  getMessageCategories: publicProcedure
    .query(() => getMessageCategories()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`Love Messages TRPC server listening at port: ${port}`);
}

start();