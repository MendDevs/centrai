import { Play, Info, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroBannerProps {
  title: string;
  description: string;
  genre: string;
  rating: number;
  votes: number;
  popularity: number;
  imageUrl: string;
}

export function HeroBanner({ title, description, genre, rating, votes, popularity, imageUrl }: HeroBannerProps) {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center px-4 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-400 text-lg font-semibold">{(rating * 10).toFixed(0)}% Match</span>
            <span className="text-white text-lg">{genre}</span>
            <div className="flex items-center gap-1 text-yellow-400">
              <TrendingUp className="w-5 h-5" />
              <span>{popularity.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-white text-base md:text-lg mb-6 line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-white text-black px-8 py-3 rounded-md flex items-center gap-2 hover:bg-zinc-200 transition font-semibold">
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </button>
            <button className="bg-zinc-700/80 text-white px-8 py-3 rounded-md flex items-center gap-2 hover:bg-zinc-600 transition font-semibold">
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
          <div className="mt-6 text-zinc-400 text-sm">
            {votes.toLocaleString()} votes • Rating: {rating.toFixed(1)}/10
          </div>
        </motion.div>
      </div>
    </div>
  );
}
