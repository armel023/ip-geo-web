
import { auth, signOut } from "./auth";
import GeoInfoView from "./components/GeoInfoView";

export default async function HomePage() {

  const session = await auth();

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96 text-center">
          <h1 className="text-2xl font-bold mb-4">IP Geo Web</h1>
          <p className="mb-4">Please log in to see your information.</p>
          <a href="/login" className="text-blue-500 hover:underline">Go to Login</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
        <GeoInfoView />
        <div className="flex gap-4">
          <form action={handleSignOut}>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Sign Out</button>
          </form>
        </div>
      </div>
    </main>
  );
}
