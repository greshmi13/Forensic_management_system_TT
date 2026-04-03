import React from 'react';
import { HelpCircle } from 'lucide-react';

const PlaceholderPage = ({ title, description = 'This module is currently under construction.' }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
          <p className="text-slate-400 text-sm">Explore the {title.toLowerCase()} capabilities.</p>
        </div>
      </div>
      
      <div className="glass-panel p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mb-6 border border-primary-500/20">
            <HelpCircle size={32} className="text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{title} Module</h2>
        <p className="text-slate-400 max-w-sm mb-6">{description}</p>
        <button className="btn-primary">
            Notify me when ready
        </button>
      </div>
    </div>
  );
};

export default PlaceholderPage;
