import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caseService } from '../services/caseService';
import { ArrowLeft, Edit3, Shield, Users, Calendar, Activity, FileSearch } from 'lucide-react';
import toast from 'react-hot-toast';

const CaseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCaseData();
    }, [id]);

    const fetchCaseData = async () => {
        try {
            setLoading(true);
            const data = await caseService.getCaseById(id);
            setCaseData(data);
        } catch (error) {
            toast.error('Failed to load case details. It may not exist.');
            navigate('/cases');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400 space-y-4">
               <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
               <p>Loading case dossier...</p>
            </div>
        );
    }

    if (!caseData) return null;

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
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Cases
            </button>

            <div className="glass-panel p-8 relative overflow-hidden">
                 {/* Decorative background hash */}
                 <div className="absolute -right-20 -top-20 text-[200px] text-white/[0.02] font-black pointer-events-none select-none tracking-tighter transform -rotate-12">
                    {caseData.caseNumber}
                 </div>

                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-white">{caseData.title}</h1>
                            <span className={`badge ${statusClass(caseData.status)} text-sm px-3 py-1`}>{caseData.status}</span>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed">{caseData.description || "No detailed description provided."}</p>
                        
                        <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-primary-400" />
                                <span>ID: <strong className="text-white">{caseData.caseNumber}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-amber-400" />
                                <span>Lead Investigator: <strong className="text-white">{caseData.assignedTo || "Unassigned"}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-emerald-400" />
                                <span>Opened: <strong className="text-white">{new Date(caseData.createdAt).toLocaleDateString()}</strong></span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="btn-primary flex items-center gap-2 shrink-0">
                        <Edit3 size={16} /> Edit Dossier
                    </button>
                 </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                   <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700/50 pb-2">Linked Evidence (Simulation)</h2>
                   <div className="glass-panel p-6">
                       <ul className="space-y-4">
                           <li className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg border border-slate-700/30">
                              <div className="flex items-center gap-3">
                                  <FileSearch size={20} className="text-emerald-400" />
                                  <div>
                                      <p className="text-white font-medium">screenshot_leak.png</p>
                                      <p className="text-xs text-slate-500 font-mono">c5a898dfef1240a23fe</p>
                                  </div>
                              </div>
                              <button className="text-xs font-medium text-primary-400 hover:text-primary-300">View File</button>
                           </li>
                           <li className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg border border-slate-700/30">
                              <div className="flex items-center gap-3">
                                  <Activity size={20} className="text-amber-400" />
                                  <div>
                                      <p className="text-white font-medium">capture.pcap (Network log)</p>
                                      <p className="text-xs text-slate-500 font-mono">9b71d224bd62f37851a</p>
                                  </div>
                              </div>
                              <button className="text-xs font-medium text-primary-400 hover:text-primary-300">View File</button>
                           </li>
                       </ul>
                   </div>
               </div>

               <div className="space-y-6">
                   <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700/50 pb-2">Quick Actions</h2>
                   <div className="glass-panel p-6 space-y-3">
                       <button className="w-full py-2 bg-dark-800 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 rounded-lg transition-colors text-sm font-medium">
                           Upload New Evidence
                       </button>
                       <button className="w-full py-2 bg-dark-800 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 rounded-lg transition-colors text-sm font-medium">
                           Request Lab Test
                       </button>
                       <button className="w-full py-2 bg-dark-800 border border-slate-700 hover:border-purple-500/50 text-slate-300 hover:text-purple-400 rounded-lg transition-colors text-sm font-medium">
                           Generate Case Report
                       </button>
                   </div>
               </div>
            </div>
        </div>
    );
};

export default CaseDetails;
