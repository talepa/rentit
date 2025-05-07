
import React from 'react';
import ItemCard from './ItemCard';

interface FeatureSectionProps {
  title: string;
  viewAllLink?: string;
  items: {
    id: string;
    title: string;
    image: string;
    price: number;
    rating?: number;
    category: string;
    distance?: string;
    type: 'product' | 'service' | 'stay';
  }[];
}

const FeatureSection = ({ title, viewAllLink, items }: FeatureSectionProps) => {
  return (
    <div className="my-8 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <h2 className="text-xl font-bold font-poppins text-textdark relative z-10">{title}</h2>
          <div className="absolute -bottom-1 left-0 h-3 w-1/2 bg-primary/10 rounded-full -z-[1]"></div>
        </div>
        {viewAllLink && (
          <a 
            href={viewAllLink} 
            className="text-primary text-sm font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            View All
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={item.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <ItemCard 
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              category={item.category}
              distance={item.distance}
              type={item.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
