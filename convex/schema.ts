import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    /** Stable identifier from the JWT: issuer + "|" + subject. */
    tokenIdentifier: v.string(),
    /** Clerk user ID (JWT subject). Also used to link Stripe records. */
    clerkUserId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_clerk_user_id", ["clerkUserId"]),
});
