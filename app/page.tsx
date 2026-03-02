import { auth, signOut } from "./auth";
import GeoInfoView from "./components/GeoInfoView";
import SignOutButton from "./components/SignOutButton";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96 text-center">
          <h1 className="text-2xl font-bold mb-4">IP Geo Web</h1>
          <p className="mb-4">Please log in to see your information.</p>
          <a href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md flex flex-col items-center w-full">
        <nav className="w-full flex justify-between mb-4">
          <h1 className="text-3xl font-bold mb-4 self-start">
            Welcome, {session.user?.name}!
          </h1>
          <SignOutButton />
        </nav>

        <div className="w-full mb-6">
          <GeoInfoView />
        </div>
      </div>
    </main>
  );
}
