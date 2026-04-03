import React, { useState } from 'react';
import { Upload, Filter, Search, File, FileText, Image as ImageIcon, Binary, Hash } from 'lucide-react';

const Evidence = () => {
  const [evidenceItems] = useState([
    { id: 'EV-8901', name: 'disk_image_main.raw', case: 'FC-2024-001', type: 'system', fileType: 'Binary', hash: '8f434346648f6b96e...d5', date: '2024-03-12', log: 'Extracted by John S.' },
    { id: 'EV-8902', name: 'financial_records.xlsx', case: 'FC-2024-001', type: 'document', fileType: 'Document', hash: 'e2c4d9bc23851b22e...77', date: '2024-03-13', log: 'Seized from suspect PC' },
    { id: 'EV-8903', name: 'cctv_lobby_cam.mp4', case: 'FC-2024-001', type: 'video', fileType: 'Video', hash: '9b71d224bd62f3785...1a', date: '2024-03-15', log: 'Provided by Bank Security' },
    { id: 'EV-8904', name: 'malware_payload.exe', case: 'FC-2024-002', type: 'system', fileType: 'Executable', hash: '4da10118eb3ebfed6...0b', date: '2024-03-20', log: 'Quarantined from Server CPU' },
    { id: 'EV-8905', name: 'ransom_note.txt', case: 'FC-2024-003', type: 'document', fileType: 'Document', hash: 'f1e422205565bb24c...dc', date: '2024-03-25', log: 'Found in Root Directory' },
    { id: 'EV-8906', name: 'screenshot_leak.png', case: 'FC-2024-004', type: 'image', fileType: 'Image', hash: 'c5a898dfef1240a23...fe', date: '2024-04-01', log: 'Intercepted Email Attachment' },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'document': return <FileText size={18} className="text-amber-400" />;
      case 'image': return <ImageIcon size={18} className="text-emerald-400" />;
      case 'video': return <Binary size={18} className="text-purple-400" />;
      case 'system': return <File size={18} className="text-primary-400" />;
      default: return <File size={18} className="text-slate-400" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Evidence Vault</h1>
          <p className="text-slate-400 text-sm">Secure chain of custody and digital evidence tracking.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="Search hash, name..." className="bg-dark-800 border border-slate-700/50 text-sm text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-primary-500" />
           </div>
           <button className="glass-card py-2 px-4 !bg-dark-800 text-sm font-medium hover:!bg-dark-700 flex items-center gap-2">
             <Filter size={16} /> Filter
           </button>
           <button className="btn-primary">
             <Upload size={18} /> Upload Evidence
           </button>
        </div>
      </div>

      <div className="glass-panel p-6">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Item Name & Details</th>
                <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Linked Case</th>
                <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Hash (MD5/SHA)</th>
                <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Chain of Custody Log</th>
                <th className="pb-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Acquired On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {evidenceItems.map((item) => (
                <tr key={item.id} className="hover:bg-dark-800/50 transition-colors group cursor-pointer">
                  <td className="py-4 px-4 text-sm text-white">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-dark-900 border border-slate-700/50 flex items-center justify-center">
                              {getIcon(item.type)}
                          </div>
                          <div>
                              <div className="font-semibold">{item.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{item.id} • {item.fileType}</div>
                          </div>
                      </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="badge badge-progress">{item.case}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2 font-mono text-xs bg-dark-900/50 px-2 py-1 rounded border border-slate-700/30 w-full max-w-[150px] truncate">
                          <Hash size={12} className="text-primary-400 shrink-0" />
                          <span className="truncate">{item.hash}</span>
                      </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400 max-w-[200px] truncate">
                    {item.log}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400">
                     {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Evidence;
