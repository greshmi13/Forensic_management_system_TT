import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  Briefcase, 
  FileSearch, 
  FlaskConical, 
  FileText, 
  History, 
  Users, 
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Cases', icon: Briefcase, path: '/cases' },
    { name: 'Evidence', icon: FileSearch, path: '/evidence' },
    { name: 'Lab Management', icon: FlaskConical, path: '/lab' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Audit Trail', icon: History, path: '/audit' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-dark-800 border-r border-slate-700/50 flex flex-col fixed left-0 top-0 pt-4 z-[100] shadow-2xl">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 mb-8">
        <div className="bg-primary-600/20 p-2 rounded-lg border border-primary-500/30">
          <Shield className="text-primary-500" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">A22_FCMS</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
      {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600/10 text-primary-500 border border-primary-500/20 shadow-[inset_0_0_15px_rgba(59,130,246,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-dark-700/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-primary-500' : 'text-slate-400'} />
                <span className="font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Premium UI Component at Bottom */}
      <div className="p-4 mt-auto">
         <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-4 flex flex-col items-center text-center">
            <HelpCircle size={24} className="text-indigo-400 mb-2" />
            <h4 className="font-medium text-sm text-white mb-1">Need Help?</h4>
            <p className="text-xs text-slate-400 mb-3">Check our detailed user guide</p>
            <button className="w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-lg text-xs font-semibold transition-colors">
              Documentation
            </button>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
