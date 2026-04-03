import React from 'react';
import { History, ShieldAlert, UserPlus, UploadCloud, FileEdit, LogIn } from 'lucide-react';

const AuditTrail = () => {
  const auditLogs = [
    { id: 1, type: 'critical', action: 'System Login Override', user: 'SYSTEM', ip: '10.0.0.1', details: 'Emergency maintenance mode accessed via SSH.', time: 'Just now', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/20' },
    { id: 2, type: 'action', action: 'Case Created', user: 'Admin User', ip: '192.168.1.105', details: 'Created Case FC-2024-004 "Corporate Embezzlement".', time: '2 hours ago', icon: FileEdit, color: 'text-primary-400', bg: 'bg-primary-500/10 border-primary-500/20' },
    { id: 3, type: 'upload', action: 'Evidence Upload', user: 'John Smith', ip: '192.168.1.112', details: 'Uploaded disk_image_main.raw (14.2 GB). Linked to FC-2024-001.', time: '5 hours ago', icon: UploadCloud, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { id: 4, type: 'action', action: 'Case Status Changed', user: 'Sarah Wilson', ip: '192.168.1.120', details: 'Changed FC-2024-002 status from "Open" to "In Progress".', time: 'Yesterday, 14:30', icon: FileEdit, color: 'text-primary-400', bg: 'bg-primary-500/10 border-primary-500/20' },
    { id: 5, type: 'admin', action: 'User Role Updated', user: 'Admin User', ip: '192.168.1.105', details: 'Granted "Reviewer" permissions to user: mike.j.', time: 'Yesterday, 10:15', icon: UserPlus, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { id: 6, type: 'auth', action: 'Successful Login', user: 'Mike Johnson', ip: '203.0.113.44', details: 'Authenticated via 2FA (Mobile).', time: 'Mar 30, 2024', icon: LogIn, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Global Audit Trail</h1>
          <p className="text-slate-400 text-sm">Immutable ledger of all system actions, access, and modifications.</p>
        </div>
        <button className="glass-card py-2 px-4 !bg-dark-800 text-sm font-medium hover:!bg-dark-700 flex items-center gap-2">
            Export Logs (CSV)
        </button>
      </div>

      <div className="glass-panel p-8">
          <div className="relative border-l border-slate-700/50 pl-8 ml-4 space-y-10">
              {auditLogs.map((log) => (
                  <div key={log.id} className="relative group">
                      <div className={`absolute -left-[45px] w-10 h-10 rounded-full border flex items-center justify-center ${log.bg} shadow-lg ring-4 ring-dark-900 group-hover:scale-110 transition-transform`}>
                          <log.icon size={18} className={log.color} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                          <div className="md:col-span-3 space-y-1 mt-1">
                              <h3 className="text-white font-medium text-base">{log.action}</h3>
                              <p className="text-slate-400 text-sm">{log.details}</p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-mono">
                                 <span>User: <strong className="text-slate-300">{log.user}</strong></span>
                                 <span>•</span>
                                 <span>IP: <strong className="text-slate-300">{log.ip}</strong></span>
                              </div>
                          </div>
                          <div className="text-right text-sm text-slate-500 md:mt-1">
                              {log.time}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default AuditTrail;
