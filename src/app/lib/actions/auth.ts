"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { db } from "@/src/app/lib/db";
import { createSession } from "@/src/app/lib/session";
import { LoginState, RegisterState } from "@/src/app/lib/types";

export async function register(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Fill in all fields please", name, email };
  }

  if (!email.includes("@")) {
    return { error: "Not a valid email.", name, email };
  }

  if (password.length < 3) {
    return { error: "Password needs to be longer than 3 characters", name, email };
  }

  const existingUser = await db("users").where({ email }).first();
  if (existingUser) {
    return { error: "User already exists", name, email };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const [userId] = await db("users").insert({
    name,
    email,
    password_hash: passwordHash,
  });

  await createSession(userId);
  redirect("/");
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Fill in all fields please", email };
  }

  const user = await db("users").where({ email }).first();
  const passwordIsCorrect = user ? await bcrypt.compare(password, user.password_hash) : false;

  if (!user || !passwordIsCorrect) {
    return { error: "Email or password is incorrect", email };
  }

  await createSession(user.id);
  redirect("/");
}
