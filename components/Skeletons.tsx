
export function MediaCardSkeleton() {

    return (
        <div className="w-full max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"></div>
                    <div className="block mt-1 w-full animate-pulse bg-gray-500 h-4 rounded"></div>
                    <div className="mt-2 animate-pulse bg-gray-500 h-4 rounded"></div>
                    <div className="mt-2 animate-pulse bg-gray-500 h-4 rounded w-5/6"></div>
                </div>
            </div>
        </div>

    );

}

export function MediaCardsSkeleton() {
    return (
        <div className="md:grid md:grid-cols-4 md:items-start flex flex-col items-center gap-4">
            {Array(20).fill(0).map((_, i) => <MediaCardSkeleton key={i} />)}
        </div>
    );
}
