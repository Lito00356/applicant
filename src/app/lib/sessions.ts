import { db } from "@/src/app/lib/db";
import { CurrentUser } from "@/src/app/lib/types";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function createSession(userId: number): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_DURATION_MS;

  await db("sessions").insert({
    id: token,
    user_id: userId,
    expires_at: expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const row = await db("sessions")
    .join("users", "users.id", "sessions.user_id")
    .where("sessions.id", token)
    .select("users.id", "users.name", "users.email", "sessions.expires_at as expiresAt")
    .first();

  if (!row) return null;

  if (row.expiresAt < Date.now()) {
    await db("sessions").where("id", token).del();

    return null;
  }

  return { id: row.id, name: row.name, email: row.email };
});

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  return user;
}
