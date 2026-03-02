"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import loginAction from "./server-actions";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const result = await loginAction(username, password);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      router.replace("/");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
