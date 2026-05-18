import React from 'react';
import { 
  Smartphone, Laptop, Shirt, Home, Camera, Watch, Headphones, Gamepad2, 
  ShoppingBag, Sparkles, Heart, Dumbbell, Trophy, BookOpen, Compass, 
  Briefcase, Car, Utensils, Apple, Leaf, Music, Tag, Tv, Cpu
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function CategoryIcon({ name, className, size = 24 }: CategoryIconProps) {
  const lowerName = name.toLowerCase();

  // Match keyword to lucide icon component
  if (lowerName.includes('phone') || lowerName.includes('mobile')) return <Smartphone className={className} size={size} />;
  if (lowerName.includes('laptop') || lowerName.includes('computer') || lowerName.includes('pc')) return <Laptop className={className} size={size} />;
  if (lowerName.includes('tv') || lowerName.includes('television')) return <Tv className={className} size={size} />;
  if (lowerName.includes('electronic') || lowerName.includes('gadget') || lowerName.includes('tech') || lowerName.includes('appliances')) return <Cpu className={className} size={size} />;
  if (lowerName.includes('audio') || lowerName.includes('headphone') || lowerName.includes('speaker') || lowerName.includes('music')) return <Headphones className={className} size={size} />;
  if (lowerName.includes('camera') || lowerName.includes('photography')) return <Camera className={className} size={size} />;
  
  if (lowerName.includes('fashion') || lowerName.includes('cloth') || lowerName.includes('wear') || lowerName.includes('shirt') || lowerName.includes('dress') || lowerName.includes('shoe') || lowerName.includes('bag')) return <Shirt className={className} size={size} />;
  if (lowerName.includes('watch') || lowerName.includes('smartwatch') || lowerName.includes('wearable')) return <Watch className={className} size={size} />;
  
  if (lowerName.includes('home') || lowerName.includes('kitchen') || lowerName.includes('furniture') || lowerName.includes('decor')) return <Home className={className} size={size} />;
  if (lowerName.includes('garden') || lowerName.includes('plant') || lowerName.includes('outdoor')) return <Leaf className={className} size={size} />;
  
  if (lowerName.includes('beauty') || lowerName.includes('cosmetics') || lowerName.includes('makeup')) return <Sparkles className={className} size={size} />;
  if (lowerName.includes('care') || lowerName.includes('health') || lowerName.includes('fitness') || lowerName.includes('gym') || lowerName.includes('sports') || lowerName.includes('workout')) return <Dumbbell className={className} size={size} />;
  
  if (lowerName.includes('book') || lowerName.includes('read') || lowerName.includes('education') || lowerName.includes('stationery')) return <BookOpen className={className} size={size} />;
  if (lowerName.includes('travel') || lowerName.includes('luggage')) return <Briefcase className={className} size={size} />;
  
  if (lowerName.includes('game') || lowerName.includes('gaming') || lowerName.includes('toy')) return <Gamepad2 className={className} size={size} />;
  if (lowerName.includes('automotive') || lowerName.includes('car') || lowerName.includes('bike')) return <Car className={className} size={size} />;
  
  return <ShoppingBag className={className} size={size} />;
}
