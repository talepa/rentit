
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface ItemCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating?: number;
  category: string;
  distance?: string;
  type: 'product' | 'service' | 'stay';
}

const ItemCard = ({ 
  id, 
  title, 
  image, 
  price, 
  rating = 0, 
  category,
  distance,
  type
}: ItemCardProps) => {
  const getTypeBadge = () => {
    switch (type) {
      case 'product':
        return <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">Product</span>;
      case 'service':
        return <span className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs font-medium">Service</span>;
      case 'stay':
        return <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">Stay</span>;
    }
  };

  return (
    <Link to={`/item/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group transform hover:translate-y-[-5px] animate-fade-in">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 animate-slide-in-right">
            {getTypeBadge()}
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium line-clamp-2 text-textdark group-hover:text-primary transition-colors duration-300">{title}</h3>
            {rating > 0 && (
              <div className="flex items-center bg-accent/10 px-1.5 py-0.5 rounded group-hover:bg-accent/20 transition-colors duration-300">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="text-xs ml-1 font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{category}</p>
          {distance && <p className="text-xs text-gray-400 mt-1">{distance} away</p>}
          <div className="mt-2 flex justify-between items-center">
            <p className="font-bold text-textdark">
              <span className="text-sm mr-1">$</span>
              {price}
              <span className="text-xs font-normal text-gray-500">/day</span>
            </p>
            <button className="text-primary text-sm relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">Details</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
