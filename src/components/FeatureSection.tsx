
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
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-poppins text-textdark">{title}</h2>
        {viewAllLink && (
          <a 
            href={viewAllLink} 
            className="text-primary text-sm font-medium hover:underline"
          >
            View All
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <ItemCard 
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            category={item.category}
            distance={item.distance}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
