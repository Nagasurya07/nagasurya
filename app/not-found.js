export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center p-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
        <a href="/" className="inline-block px-5 py-3 bg-black text-white rounded-lg">Go home</a>
      </div>
    </div>
  );
}
