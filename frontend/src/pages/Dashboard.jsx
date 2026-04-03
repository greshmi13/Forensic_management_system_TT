import React, { useState, useEffect } from 'react';
import { Briefcase, FileSearch, FlaskConical, Users, ArrowUpRight, Plus, Upload, Activity, FileText } from 'lucide-react';
import { caseService } from '../services/caseService';
import NewCaseModal from '../components/NewCaseModal';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [recentCases, setRecentCases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestCases();
  }, []);

  const fetchLatestCases = async () => {
    try {
      setLoading(true);
      const data = await caseService.getAllCases();
      // Sort by latest and take top 5
      const sorted = data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
      setRecentCases(sorted);
    } catch (error) {
      console.error('Failed to fetch cases', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: 'Total Cases', value: '24', change: '+12 this month', icon: Briefcase, color: 'bg-primary-500/10 text-primary-500 border-primary-500/20' },
    { title: 'Evidence Items', value: '156', change: '+28 new', icon: FileSearch, color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    { title: 'Lab Tests', value: '45', change: 'In Progress', icon: FlaskConical, color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    { title: 'Users', value: '8', change: 'Active users', icon: Users, color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  ];

  const systemActivity = [
    { icon: Upload, title: 'New evidence uploaded', time: '10:30 AM', color: 'text-primary-400' },
    { icon: Activity, title: 'Lab test completed', time: '09:15 AM', color: 'text-emerald-400' },
    { icon: FileText, title: 'Report generated', time: 'Yesterday', color: 'text-purple-400' },
  ];

  const statusClass = (status) => {
      if (!status) return 'badge-closed';
      switch(status.toLowerCase()) {
          case 'open': return 'badge-open';
          case 'in progress': return 'badge-progress';
          case 'closed': return 'badge-closed';
          default: return 'badge-closed';
      }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm">Welcome back! Here is what's happening today.</p>
        </div>
        <div className="flex gap-4">
           <button className="glass-card py-2 px-4 !bg-dark-800 text-sm font-medium hover:!bg-dark-700 flex items-center gap-2">
             <Upload size={16} /> Import
           </button>
           <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
             <Plus size={18} /> New Case
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-panel p-6 relative overflow-hidden group hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl border ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-xs font-medium text-emerald-400 relative z-10">
              <ArrowUpRight size={14} />
              <span>{stat.change}</span>
            </div>
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 blur-3xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity ${stat.color.split(' ')[0]}`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases Table */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Cases</h2>
            <Link to="/cases" className="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors">View All</Link>
          </div>
          <div className="overflow-x-auto min-h-[300px]">
            {loading ? (
                <div className="flex flex-col justify-center items-center h-40 text-slate-500 space-y-4">
                    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    <p>Loading cases...</p>
                </div>
            ) : recentCases.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-40 text-slate-500 space-y-4">
                    <p>No recent cases found.</p>
                    <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Create Case</button>
                </div>
            ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Case ID</th>
                      <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
                      <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned To</th>
                      <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {recentCases.map((c) => (
                      <tr key={c.id} onClick={() => navigate(`/cases/${c.id}`)} className="hover:bg-dark-800/50 transition-colors group cursor-pointer">
                        <td className="py-4 text-sm font-medium text-white">{c.caseNumber}</td>
                        <td className="py-4 text-sm text-slate-300">{c.title}</td>
                        <td className="py-4">
                          <span className={`badge ${statusClass(c.status)}`}>{c.status || 'Unknown'}</span>
                        </td>
                        <td className="py-4 text-sm text-slate-300 flex items-center gap-2">
                           {c.assignedTo ? (
                             <>
                               <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                                 {c.assignedTo.charAt(0).toUpperCase()}
                               </div>
                               {c.assignedTo}
                             </>
                           ) : (
                               <span className="text-slate-500 italic">Unassigned</span>
                           )}
                        </td>
                        <td className="py-4 text-sm text-slate-400">{new Date(c.updatedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            )}
          </div>
        </div>

        {/* System Activity Feed */}
        <div className="glass-panel p-6">
          <h2 className="text-lg font-bold text-white mb-6">System Activity</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
             {systemActivity.map((activity, idx) => (
               <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-dark-800 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                     <activity.icon size={16} className={activity.color} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-700/50 bg-dark-800/50 backdrop-blur-sm shadow-sm md:group-odd:text-right">
                     <p className="text-sm font-semibold text-slate-200">{activity.title}</p>
                     <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
               </div>
             ))}
          </div>
          <button className="w-full mt-6 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-dark-700/50 transition-colors">
            View Full Activity Log
          </button>
        </div>
      </div>

      <NewCaseModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         onCaseCreated={() => {
             setIsModalOpen(false);
             fetchLatestCases();
         }}
      />
    </div>
  );
};

export default Dashboard;
