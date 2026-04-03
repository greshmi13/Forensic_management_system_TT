import React, { useState, useEffect } from 'react';
import { caseService } from '../services/caseService';
import NewCaseModal from '../components/NewCaseModal';
import { Plus, Search, Filter } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCases();
  }, [searchQuery]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      let data = [];
      if (searchQuery) {
        data = await caseService.searchCases(searchQuery);
      } else {
        data = await caseService.getAllCases();
      }
      setCases(data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Cases Directory</h1>
          <p className="text-slate-400 text-sm">Manage, search, and track all forensic investigations.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="glass-card py-2 px-4 !bg-dark-800 text-sm font-medium hover:!bg-dark-700 flex items-center gap-2">
             <Filter size={16} /> Filter
           </button>
           <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
             <Plus size={18} /> New Case
           </button>
        </div>
      </div>

      <div className="glass-panel p-6">
        {loading ? (
           <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-4">
               <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
               <p>Fetching cases...</p>
           </div>
        ) : cases.length === 0 ? (
           <div className="text-center py-16 flex flex-col items-center justify-center">
              <Search size={48} className="text-slate-600 mb-4" />
              <h3 className="text-lg font-medium text-white">No cases found</h3>
              <p className="text-slate-400 max-w-sm mt-2 text-sm">{searchQuery ? `No results for "${searchQuery}"` : "You haven't created any cases yet. Click New Case to start tracking."}</p>
              {!searchQuery && (
                 <button className="btn-primary mt-6" onClick={() => setIsModalOpen(true)}>
                    Create First Case
                 </button>
              )}
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Case Number</th>
                  <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned To</th>
                  <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {cases.map((c) => (
                  <tr key={c.id} onClick={() => navigate(`/cases/${c.id}`)} className="hover:bg-dark-800/50 transition-colors group cursor-pointer">
                    <td className="py-4 px-4 text-sm font-medium text-white">{c.caseNumber}</td>
                    <td className="py-4 px-4 text-sm text-slate-300">
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{c.description}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge ${statusClass(c.status)}`}>{c.status || 'Unknown'}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-300 flex items-center gap-2 h-full min-h-[60px]">
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
                    <td className="py-4 px-4 text-sm text-slate-400">
                       {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <NewCaseModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         onCaseCreated={() => {
             setIsModalOpen(false);
             fetchCases();
         }}
      />
    </div>
  );
};

export default Cases;
