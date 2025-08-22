import React from 'react';
import { User, Heart, Brain, Camera, Pill } from 'lucide-react';

const NavigationTabs = ({ navItems, activeTab, onTabChange }) => {
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'User': return User;
      case 'Heart': return Heart;
      case 'Brain': return Brain;
      case 'Camera': return Camera;
      case 'Pill': return Pill;
      default: return User;
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 mb-6 border border-gray-200 shadow-lg">
      <div className="flex space-x-2 overflow-x-auto">
        {navItems.map((item) => {
          const IconComponent = getIconComponent(item.icon);
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;