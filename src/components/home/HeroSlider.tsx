import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sampleAds } from '../../data/mockData';

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sampleAds.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      {sampleAds.map((ad, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${ad.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-xl text-[#333333] space-y-6">
              <div className="flex justify-center">
                <Link
                  to={ad.link}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-[#333333] bg-[#FFD700] hover:bg-[#FFC107] rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sampleAds.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full bg-[#FFD700]/50 hover:bg-[#FFD700] transition-colors duration-300 ${
              idx === currentSlide
                ? 'bg-[#FFD700]'
                : 'bg-[#FFD700]/50 hover:bg-[#FFD700]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;