import React from 'react';
import { FlaskConical, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const LabManagement = () => {
    const labJobs = [
        { id: 'JOB-901', test: 'Malware Reverse Engineering', item: 'EV-8904 (malware_payload.exe)', status: 'processing', progress: 65, investigator: 'S. Wilson', priority: 'High', estimatedTime: '2 hrs' },
        { id: 'JOB-902', test: 'Steganography Analysis', item: 'EV-8906 (screenshot_leak.png)', status: 'completed', progress: 100, investigator: 'M. Johnson', priority: 'Medium', estimatedTime: 'Done' },
        { id: 'JOB-903', test: 'Deleted File Recovery', item: 'EV-8901 (disk_image_main.raw)', status: 'processing', progress: 30, investigator: 'J. Smith', priority: 'Critical', estimatedTime: '8 hrs' },
        { id: 'JOB-904', test: 'Network Packet Decryption', item: 'EV-8842 (capture.pcap)', status: 'queued', progress: 0, investigator: 'System', priority: 'Low', estimatedTime: 'Waiting' },
    ];

    const getStatusUI = (status) => {
        if (status === 'completed') return { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500', text: 'Completed' };
        if (status === 'processing') return { icon: Clock, color: 'text-primary-400', bg: 'bg-primary-500', text: 'In Progress' };
        return { icon: AlertCircle, color: 'text-slate-400', bg: 'bg-slate-500', text: 'Queued' };
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                <h1 className="text-2xl font-bold text-white mb-1">Lab Testing & Processing</h1>
                <p className="text-slate-400 text-sm">Monitor automated analysis scripts and manual lab routines.</p>
                </div>
                <button className="btn-primary">
                    <FlaskConical size={18} /> Request New Test
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 {/* Quick Lab Stats */}
                 <div className="glass-panel p-5">
                    <div className="text-slate-400 text-sm mb-1">Active Processing</div>
                    <div className="text-2xl font-bold text-primary-400 flex items-center gap-2"><Clock size={20}/> 2 Jobs</div>
                 </div>
                 <div className="glass-panel p-5">
                    <div className="text-slate-400 text-sm mb-1">Queued Tests</div>
                    <div className="text-2xl font-bold text-slate-300">1 Job</div>
                 </div>
                 <div className="glass-panel p-5">
                    <div className="text-slate-400 text-sm mb-1">Tests Completed (24h)</div>
                    <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2"><CheckCircle2 size={20}/> 8 Jobs</div>
                 </div>
            </div>

            <div className="space-y-4">
                {labJobs.map((job) => {
                    const ui = getStatusUI(job.status);
                    return (
                        <div key={job.id} className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-600 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-white">{job.test}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${job.priority === 'Critical' ? 'bg-rose-500/10 border-rose-500/50 text-rose-400' : 'bg-dark-700 border-slate-700 text-slate-300'}`}>{job.priority}</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-4">Target: <strong className="text-slate-300">{job.item}</strong> • Investigator: {job.investigator}</p>
                                
                                <div className="relative w-full h-2 bg-dark-900 rounded-full overflow-hidden border border-slate-700/50">
                                    <div 
                                        className={`absolute top-0 left-0 h-full ${ui.bg} shadow-[0_0_10px_rgba(var(--tw-colors-primary-500),0.5)] transition-all duration-1000 ease-out`}
                                        style={{ width: `${job.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="flex flex-row md:flex-col items-center justify-between md:justify-center md:items-end w-full md:w-48 gap-2 border-t md:border-t-0 md:border-l border-slate-700/50 pt-4 md:pt-0 md:pl-6">
                                <div className={`flex items-center gap-2 font-medium ${ui.color}`}>
                                    <ui.icon size={18} />
                                    <span>{job.progress}%</span>
                                </div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider">{ui.text} • {job.estimatedTime}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LabManagement;
