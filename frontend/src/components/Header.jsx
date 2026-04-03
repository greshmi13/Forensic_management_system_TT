import React, { useState } from 'react';
import { Search, Bell, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cases?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/cases`);
    }
  };

  return (
    <header className="h-20 glass-panel border-x-0 border-t-0 rounded-none w-full flex items-center justify-between px-8 sticky top-0 z-10 z-[50]">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 flex items-center">
        <div className="relative w-full max-w-md">
          <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases, evidence..." 
            className="w-full bg-dark-700/50 border border-slate-600/50 text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-500"
          />
        </div>
      </form>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
           <button className="relative p-2 text-slate-400 hover:text-white hover:bg-dark-700/50 rounded-full transition-colors">
             <Bell size={20} />
             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full border border-dark-900"></span>
           </button>
           <button className="p-2 text-slate-400 hover:text-white hover:bg-dark-700/50 rounded-full transition-colors">
             <SettingsIcon size={20} />
           </button>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-600 to-purple-600 p-0.5">
             <div className="w-full h-full bg-dark-800 rounded-full flex items-center justify-center overflow-hidden border border-dark-800">
               <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Admin" className="w-full h-full object-cover" />
             </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">Admin</span>
            <span className="text-xs text-slate-400">Chief Investigator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
