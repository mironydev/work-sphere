import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import { getUserForMail } from "./sendEmail";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.DB_NAME);

const ALLOWED_ACCOUNT_TYPES = ["seeker", "recruiter"];
const ALLOWED_PLANS = ["seeker_starter", "recruiter_starter"];
export const auth = betterAuth({
  trustedOrigins: process.env.TRUSTED_ORIGINS.split(","),

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
    transaction: false,
  }),

  user: {
    additionalFields: {
      accountType: {
        type: "string",
        input: true,
      },

      plan: {
        type: "string",
        input: true,
      },
      billingCycle: {
        type: "string",
        input: true,
        required: false,
      },

      phone: {
        type: "string",
        input: true,
        required: false,
      },

      city: {
        type: "string",
        input: true,
        required: false,
      },

      country: {
        type: "string",
        input: true,
        required: false,
      },

      headline: {
        type: "string",
        input: true,
        required: false,
      },

      yearsOfExperience: {
        type: "number",
        input: true,
        required: false,
      },

      resumeLink: {
        type: "string",
        input: true,
        required: false,
      },

      bio: {
        type: "string",
        input: true,
        required: false,
      },

      skills: {
        type: "string",
        input: true,
        required: false,
      },

      portfolio: {
        type: "string",
        input: true,
        required: false,
      },

      linkedin: {
        type: "string",
        input: true,
        required: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const accountType = ctx?.body?.accountType;
          const plan = ctx?.body?.plan;

          const validAccountType = ALLOWED_ACCOUNT_TYPES.includes(accountType)
            ? accountType
            : undefined;

          const validPlan = ALLOWED_PLANS.includes(plan) ? plan : undefined;
          return {
            data: {
              ...user,
              ...(validAccountType && { accountType: validAccountType }),
              ...(validPlan && { plan: validPlan }),
            },
          };
        },
        after: async (user) => {
          //send welcome email to the user's email
          await getUserForMail(user.name, user.email);
        },
      },
    },
  },

  plugins: [admin()],
});
