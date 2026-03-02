"use client";
import { signOutAction } from "../login/server-actions";

export default function SignOutButton() {
  async function handleSignOut() {
    await signOutAction();
  }
  return (
    <button
      onClick={() => handleSignOut()}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Sign Out
    </button>
  );
}
