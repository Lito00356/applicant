import { db } from "@/src/app/lib/db";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

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
