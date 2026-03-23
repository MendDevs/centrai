import { useState } from 'react';
import { Play, Info, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface MovieCardProps {
  title: string;
  genre: string;
  rating: number;
  votes: number;
  popularity: number;
  imageUrl: string;
  predictedGenre?: string;
}

export function MovieCard({ title, genre, rating, votes, popularity, imageUrl, predictedGenre }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative min-w-[200px] md:min-w-[250px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-lg overflow-hidden bg-zinc-900">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[300px] md:h-[350px] object-cover"
        />
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-4"
          >
            <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm">{rating.toFixed(1)}</span>
              <span className="text-zinc-400 text-sm">• {votes.toLocaleString()} votes</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-zinc-300">Genre: {genre}</span>
              {predictedGenre && (
                <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                  Predicted: {predictedGenre}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-zinc-200 transition">
                <Play className="w-4 h-4 fill-current" />
                <span className="text-sm">Play</span>
              </button>
              <button className="bg-zinc-700/80 text-white px-3 py-2 rounded-md hover:bg-zinc-600 transition">
                <Info className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
