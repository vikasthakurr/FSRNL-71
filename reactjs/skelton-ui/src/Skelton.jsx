const Skelton = () => {
  return (
    <div className="w-72 rounded-2xl shadow-lg overflow-hidden bg-white">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 animate-pulse" />

      {/* Card Body Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />

        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"
            />
          ))}
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse ml-1" />
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-14 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Skelton;
