
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
      <div className="flex flex-col items-center p-4 transition-all duration-300 transform hover:scale-110 hover:shadow-lg rounded-lg">
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md transition-all duration-300 ${color}`}
        >
          <img src={icon} alt={name} className="w-8 h-8 transform transition-transform duration-300 group-hover:scale-110" />
        </div>
        <span className="text-sm font-medium text-textdark text-center group-hover:text-primary transition-colors duration-300">{name}</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
