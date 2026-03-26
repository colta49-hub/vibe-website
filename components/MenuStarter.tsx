/**
 * 🍵 MENU - Design luxury/premium
 */

'use client';

import { useState } from 'react';

const menuData = {
  Espresso: [
    { name: 'Espresso', price: 2.5, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Doppio', price: 3, image: 'https://images.pexels.com/photos/1233528/pexels-photo-1233528.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Ristretto', price: 2.5, image: 'https://images.pexels.com/photos/350478/pexels-photo-350478.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Lungo', price: 2.8, image: '/lungo.jpeg' },
    { name: 'Macchiato', price: 3, image: 'https://images.pexels.com/photos/1193335/pexels-photo-1193335.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Cortado', price: 3.2, image: '/cortado.jpeg' },
  ],
  Specialty: [
    { name: 'Flat White', price: 4, image: '/flat-white.webp' },
    { name: 'Cappuccino', price: 3.5, image: '/cappuccino.jpeg' },
    { name: 'Latte', price: 3.8, image: '/latte.jpeg' },
    { name: 'Oat Latte', price: 4.5, image: '/oat-latte.jpeg' },
    { name: 'Matcha Latte', price: 5, image: '/matcha-latte.jpeg' },
    { name: 'Turmeric Latte', price: 5, image: '/turmeric-latte.jpeg' },
  ],
  'Cold Brew': [
    { name: 'Cold Brew Classic', price: 4.5, image: '/cold-brew-classic2.jpeg' },
    { name: 'Cold Brew cu Lapte', price: 5, image: '/cold-brew-lapte.jpeg' },
    { name: 'Nitro Cold Brew', price: 5.5, image: '/nitro-cold-brew.jpeg' },
    { name: 'Cold Brew Tonic', price: 5.2, image: '/tonic.jpeg' },
    { name: 'Iced Latte', price: 4.8, image: '/iced-latte.jpeg' },
    { name: 'Iced Matcha', price: 5.2, image: '/iced-matcha.jpeg' },
  ],
  Patiserie: [
    { name: 'Croissant cu Unt', price: 3.5, image: '/croissant.jpeg' },
    { name: 'Pain au Chocolat', price: 4, image: '/pain-au-chocolat.jpeg' },
    { name: 'Brioche', price: 3.8, image: '/brioche.jpeg' },
    { name: 'Ecler cu Vanilie', price: 4.5, image: '/ecler.jpeg' },
    { name: 'Tartă cu Fructe', price: 5, image: '/tarta-fructe.jpeg' },
    { name: 'Cheesecake', price: 5.5, image: '/cheesecake.webp' },
  ],
};

const categories = ['Espresso', 'Specialty', 'Cold Brew', 'Patiserie'] as const;
type Category = typeof categories[number];

export default function MenuStarter() {
  const [activeTab, setActiveTab] = useState<Category>('Espresso');

  return (
    <section id="menu" className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #faf5ec 0%, #f5efe0 50%, #faf8f4 100%)' }}>
      <div className="max-w-5xl mx-auto">

        {/* TITLU */}
        <div className="text-center mb-14 relative">
          {/* Glow în spate */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '500px',
              height: '160px',
              background: 'radial-gradient(ellipse, rgba(245,158,11,0.25) 0%, rgba(251,191,36,0.1) 50%, transparent 75%)',
              filter: 'blur(20px)',
            }} />
          </div>

          <p className="relative text-amber-600 text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            style={{ textShadow: '0 0 20px rgba(245,158,11,0.5)' }}
          >
            Selecția noastră
          </p>
          <h2 className="relative text-5xl md:text-6xl font-bold text-gray-900"
            style={{ textShadow: '0 2px 20px rgba(180,83,9,0.15), 0 4px 40px rgba(245,158,11,0.1)' }}
          >
            Meniul Nostru
          </h2>
          <div className="w-12 h-px bg-amber-400 mx-auto mt-6" />
        </div>

        {/* TAB-URI — 3D cu shadow */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-7 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-500 hover:text-gray-800'
              }`}
              style={
                activeTab === cat
                  ? {
                      boxShadow: '0 6px 0 #b45309, 0 8px 20px rgba(180,83,9,0.4)',
                      transform: 'translateY(-2px)',
                    }
                  : {
                      boxShadow: '0 4px 0 #d1c5b0, 0 6px 15px rgba(0,0,0,0.08)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PRODUSE — card cu imagine + info jos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {menuData[activeTab].map((item) => (
            <div
              key={item.name}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Imagine */}
              <div className="h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* Info */}
              <div className="px-4 py-3 flex justify-between items-center border-t border-gray-50">
                <span
                  className="font-bold text-base tracking-wide"
                  style={{
                    background: 'linear-gradient(90deg, #1c1c1c 0%, #b45309 50%, #1c1c1c 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 3s linear infinite',
                  }}
                >{item.name}</span>
                <span className="text-amber-600 font-bold text-sm">{item.price.toFixed(2)} €</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
