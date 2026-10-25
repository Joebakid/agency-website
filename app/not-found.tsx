import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-6">
      <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
        System Route Not Found
      </h2>
      <p className="text-gray-400 max-w-md mb-10 text-lg">
        It looks like our engineering team hasn't built this endpoint yet, or the page has been deprecated.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
