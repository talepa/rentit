
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from "@/components/ui/carousel";
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryCarouselProps {
  categories: {
    id: string;
    name: string;
    icon: string;
    color: string;
  }[];
}

const CategoryCard = ({ id, name, icon, color }: CategoryCardProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Simplified animations for mobile to improve performance
  const mobileAnimations = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
    whileHover: { scale: 1.05 }
  };
  
  // Full animations for desktop
  const desktopAnimations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.5,
      type: "spring", 
      stiffness: 300 
    },
    whileHover: { 
      scale: 1.1, 
      y: -5,
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    }
  };

  const animations = isMobile ? mobileAnimations : desktopAnimations;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/categories/${id}`);
  };

  return (
    <Link to={`/categories/${id}`} className="group" onClick={handleClick}>
      <motion.div 
        className="flex flex-col items-center p-4 transition-all duration-300 transform hover:shadow-lg rounded-lg"
        initial={animations.initial}
        animate={animations.animate}
        transition={animations.transition}
        whileHover={animations.whileHover}
      >
        <motion.div 
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md transition-all duration-300 ${color}`}
          whileHover={{ rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img 
            src={icon} 
            alt={name} 
            className="w-8 h-8" 
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            loading="lazy"
          />
        </motion.div>
        <span 
          className="text-sm font-medium text-textdark text-center group-hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left"
        >
          {name}
        </span>
      </motion.div>
    </Link>
  );
};

export const CategoryCarousel = ({ categories }: CategoryCarouselProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/categories');
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
          Discover Categories
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-primary hover:text-primary/80"
          onClick={handleViewAll}
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1 animate-bounce-subtle" />
        </Button>
      </div>
      
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category) => (
            <CarouselItem 
              key={category.id} 
              className={`pl-2 md:pl-4 ${isMobile ? 'basis-1/3' : 'basis-1/6'}`}
            >
              <CategoryCard 
                id={category.id}
                name={category.name}
                icon={category.icon}
                color={category.color}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="animate-pulse-subtle">
          <ChevronLeft className="h-4 w-4" />
        </CarouselPrevious>
        <CarouselNext className="animate-pulse-subtle">
          <ChevronRight className="h-4 w-4" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCard;
