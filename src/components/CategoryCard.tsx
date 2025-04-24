
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const CategoryCard = ({ id, name, icon, color }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${id}`} className="group">
      <div className="flex flex-col items-center p-4 transition-all duration-200 transform hover:scale-105">
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-sm ${color}`}
        >
          <img src={icon} alt={name} className="w-8 h-8" />
        </div>
        <span className="text-sm font-medium text-textdark text-center">{name}</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
