import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, requireIdentity } from "./lib/auth";

const userValidator = v.object({
  _id: v.id("users"),
  _creationTime: v.number(),
  tokenIdentifier: v.string(),
  clerkUserId: v.string(),
  email: v.optional(v.string()),
  name: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
});

export const current = query({
  args: {},
  returns: v.union(userValidator, v.null()),
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

/**
 * Upsert the signed-in user from their Clerk identity. Called from the client
 * on every authenticated session start (see hooks/use-store-user.ts), so a
 * user row exists before any other function needs it.
 */
export const store = mutation({
  args: {},
  returns: v.id("users"),
  handler: async (ctx) => {
    const identity = await requireIdentity(ctx);

    const existing = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    const profile = {
      email: identity.email,
      name: identity.name ?? identity.nickname,
      imageUrl: identity.pictureUrl,
    };

    if (existing) {
      await ctx.db.patch(existing._id, profile);
      return existing._id;
    }

    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      clerkUserId: identity.subject,
      ...profile,
    });
  },
});
