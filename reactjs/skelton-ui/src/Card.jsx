const Card = () => {
  return (
    <div className="w-72 rounded-2xl shadow-lg overflow-hidden bg-white">
      {/* Product Image */}
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
        alt="Smart Watch"
        className="w-full h-48 object-cover"
      />

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
          Electronics
        </span>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 leading-tight">
          Premium Smart Watch
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">
          Track your fitness, receive notifications, and stay connected with
          this premium smart watch featuring AMOLED display.
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1">(128 reviews)</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-gray-900">$199</span>
            <span className="text-sm text-gray-400 line-through ml-2">$249</span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
