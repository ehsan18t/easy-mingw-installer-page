export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500 border-opacity-25"></div>
      <div className="ml-2 text-xl font-semibold text-blue-500">Loading...</div>
    </div>
  );
}
