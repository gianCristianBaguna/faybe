export default function Welcome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 snap-start" id="next-section">
      <section>
      <div className="max-w-2xl text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to the About page! This is where you can share details about
          your project, company, or team. Explain your mission, goals, and the
          story behind what you’re building.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Back to Home
        </a>
      </div></section>
    </main>
  );
}
