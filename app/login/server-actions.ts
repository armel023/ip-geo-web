"use server";
import { signIn, signOut } from "../auth";

export default async function loginAction(username: string, password: string) {
  try {
    console.log("Attempting to sign in user:", username);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    console.log("Sign in response:", res);
    if (res?.error) {
      return {
        error: "Login failed. Please check your credentials and try again.",
      };
    }
    return { success: true };
  } catch (err) {
    return {
      error: "Login failed. Please check your credentials and try again.",
    };
  }
}

export async function signOutAction() {
  try {
    await signOut();
  } catch (err) {
    console.error("Sign out failed:", err);
  }
}
