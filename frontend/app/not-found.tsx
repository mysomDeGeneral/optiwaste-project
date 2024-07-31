"use client"
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background dark:bg-background-dark">
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        prefetch={false}
      >
        Return Home
      </Link>
      <style jsx>{`
        div {
          text-align: center;
        }
        a {
          transition: background-color 0.3s;
        }
      `}</style>
    </div>
  );
}
