"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[50vh] grid place-items-center p-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-6">{error?.message || "An unexpected error occurred."}</p>
        <button onClick={() => reset()} className="px-5 py-3 bg-black text-white rounded-lg">
          Try again
        </button>
      </div>
    </div>
  );
}
