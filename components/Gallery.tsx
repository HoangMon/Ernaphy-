
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Users, Maximize2, X } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  category: 'landscape' | 'portrait' | 'yearbook';
  title: string;
  description: string;
}

const photos: Photo[] = [
  { id: 1, category: 'landscape', url: 'https://picsum.photos/seed/mountain/800/600', title: 'Mountain Majesty', description: 'Sunset over the jagged peaks of the Alps.' },
  { id: 2, category: 'landscape', url: 'https://picsum.photos/seed/ocean/800/600', title: 'Azure Depths', description: 'The rhythmic dance of waves on a secluded shore.' },
  { id: 3, category: 'portrait', url: 'https://picsum.photos/seed/person1/800/600', title: 'Soulful Gaze', description: 'Capturing the depth of human emotion in a single look.' },
  { id: 4, category: 'portrait', url: 'https://picsum.photos/seed/person2/800/600', title: 'Urban Elegance', description: 'Style meets the city streets at golden hour.' },
  { id: 5, category: 'yearbook', url: 'https://picsum.photos/seed/grad1/800/600', title: 'The Final Chapter', description: 'Celebrating the journey and the friendships made.' },
  { id: 6, category: 'yearbook', url: 'https://picsum.photos/seed/grad2/800/600', title: 'Future Bound', description: 'The excitement of new beginnings and endless possibilities.' },
  { id: 7, category: 'landscape', url: 'https://picsum.photos/seed/forest/800/600', title: 'Emerald Canopy', description: 'Sunlight filtering through ancient forest giants.' },
  { id: 8, category: 'portrait', url: 'https://picsum.photos/seed/person3/800/600', title: 'Quiet Strength', description: 'A moment of reflection in a busy world.' },
  { id: 9, category: 'yearbook', url: 'https://picsum.photos/seed/grad3/800/600', title: 'Legacy of Joy', description: 'Capturing the laughter that defined the school years.' },
];

export const PortfolioGallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'landscape' | 'portrait' | 'yearbook'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.category === filter);

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['all', 'landscape', 'portrait', 'yearbook'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-6 py-2 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 border ${
              filter === cat 
                ? 'bg-lumina-dark text-white border-lumina-dark shadow-md' 
                : 'bg-white text-stone-500 border-stone-200 hover:border-lumina-gold hover:text-lumina-gold'
            }`}
          >
            {cat === 'all' ? 'Tất cả' : cat === 'landscape' ? 'Phong cảnh' : cat === 'portrait' ? 'Chân dung' : 'Kỉ yếu'}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img 
                src={photo.url} 
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white font-serif text-xl mb-1">{photo.title}</h4>
                <p className="text-white/70 text-xs uppercase tracking-widest">{photo.category}</p>
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <Maximize2 size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>
            <div 
              className="max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-80 text-white">
                <div className="text-lumina-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">{selectedPhoto.category}</div>
                <h3 className="font-serif text-3xl mb-4">{selectedPhoto.title}</h3>
                <div className="w-12 h-0.5 bg-lumina-gold mb-6"></div>
                <p className="text-stone-400 leading-relaxed mb-8">{selectedPhoto.description}</p>
                <button 
                  className="w-full py-3 bg-white text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-lumina-gold hover:text-white transition-all duration-300"
                  onClick={() => setSelectedPhoto(null)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ServiceCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    transition={{ duration: 0.3 }}
    className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
  >
    <div className="w-14 h-14 bg-stone-50 rounded-xl flex items-center justify-center text-lumina-gold mb-6 group-hover:bg-lumina-gold group-hover:text-white transition-colors duration-500">
      {icon}
    </div>
    <h3 className="font-serif text-2xl text-stone-900 mb-4">{title}</h3>
    <p className="text-stone-500 leading-relaxed">{description}</p>
  </motion.div>
);
