import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.DB_NAME);

const ALLOWED_ROLES = ["seeker", "recruiter"];
const ALLOWED_PLANS = ["seeker_starter", "recruiter_starter"];

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      // NOT "role" — that name is reserved/protected by the admin plugin
      requestedRole: {
        type: "string",
        input: true, // explicitly allow this one from client input
      },
      plan: {
        type: "string",
        default: "seeker_starter",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const requestedRole = ctx?.body?.requestedRole;
          const requestedPlan = ctx?.body?.plan;

          const role = ALLOWED_ROLES.includes(requestedRole)
            ? requestedRole
            : "seeker";

          const plan = ALLOWED_PLANS.includes(requestedPlan)
            ? requestedPlan
            : "seeker_starter";

          return {
            data: {
              ...user,
              role,
              plan,
              requestedRole: undefined, // don't persist the scratch field
            },
          };
        },
      },
    },
  },
  plugins: [admin()],
});
