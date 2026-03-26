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
    { name: 'Lungo', price: 2.8, image: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Macchiato', price: 3, image: 'https://images.pexels.com/photos/1193335/pexels-photo-1193335.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Cortado', price: 3.2, image: 'https://images.pexels.com/photos/5946641/pexels-photo-5946641.jpeg?w=400&auto=compress&cs=tinysrgb' },
  ],
  Specialty: [
    { name: 'Flat White', price: 4, image: 'https://images.pexels.com/photos/3541383/pexels-photo-3541383.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Cappuccino', price: 3.5, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Latte', price: 3.8, image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Oat Latte', price: 4.5, image: 'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Matcha Latte', price: 5, image: 'https://images.pexels.com/photos/5946634/pexels-photo-5946634.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Turmeric Latte', price: 5, image: 'https://images.pexels.com/photos/6802982/pexels-photo-6802982.jpeg?w=400&auto=compress&cs=tinysrgb' },
  ],
  'Cold Brew': [
    { name: 'Cold Brew Classic', price: 4.5, image: 'https://images.pexels.com/photos/1544947/pexels-photo-1544947.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Cold Brew cu Lapte', price: 5, image: 'https://images.pexels.com/photos/4264098/pexels-photo-4264098.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Nitro Cold Brew', price: 5.5, image: 'https://images.pexels.com/photos/7362089/pexels-photo-7362089.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Cold Brew Tonic', price: 5.2, image: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Iced Latte', price: 4.8, image: 'https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Iced Matcha', price: 5.2, image: 'https://images.pexels.com/photos/8330546/pexels-photo-8330546.jpeg?w=400&auto=compress&cs=tinysrgb' },
  ],
  Patiserie: [
    { name: 'Croissant cu Unt', price: 3.5, image: 'https://images.pexels.com/photos/1510682/pexels-photo-1510682.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Pain au Chocolat', price: 4, image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Brioche', price: 3.8, image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Ecler cu Vanilie', price: 4.5, image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Tartă cu Fructe', price: 5, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=400&auto=compress&cs=tinysrgb' },
    { name: 'Cheesecake', price: 5.5, image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?w=400&auto=compress&cs=tinysrgb' },
  ],
};

const categories = ['Espresso', 'Specialty', 'Cold Brew', 'Patiserie'] as const;
type Category = typeof categories[number];

export default function MenuStarter() {
  const [activeTab, setActiveTab] = useState<Category>('Espresso');

  return (
    <section id="menu" className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #f0ebe0 0%, #e8d9c0 40%, #faf8f4 100%)' }}>
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
                <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                <span className="text-amber-600 font-bold text-sm">{item.price.toFixed(2)} €</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
