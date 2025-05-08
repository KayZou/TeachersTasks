import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {/* Header Skeleton */}
      <header className="flex justify-between items-center p-8">
        <div className="flex items-center gap-4 justify-center">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-lg" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex gap-4 flex-1 p-4">
        {[1, 2, 3].map((col) => (
          <div key={col} className="w-80">
            <Skeleton className="h-30 w-full mb-4 rounded-lg" />
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((task) => (
                <Skeleton key={task} className="h-50 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Footer Skeleton */}
      <footer className="p-8">
        <div className="flex justify-center">
          <Skeleton className="h-6 w-48 rounded-lg" />
        </div>
      </footer>
    </div>
  );
}
