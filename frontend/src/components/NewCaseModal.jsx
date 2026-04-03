import React, { useState } from 'react';
import { caseService } from '../services/caseService';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const NewCaseModal = ({ isOpen, onClose, onCaseCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    caseNumber: '',
    description: '',
    status: 'Open',
    assignedTo: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple frontend validation
    if (!formData.caseNumber.trim() || !formData.title.trim()) {
        toast.error('Case Number and Title are required.');
        setLoading(false);
        return;
    }

    try {
      await caseService.createCase(formData);
      toast.success('Case successfully created!');
      onCaseCreated();
      setFormData({ title: '', caseNumber: '', description: '', status: 'Open', assignedTo: '' });
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
          toast.error('Network Error: Unable to reach the backend server.');
      } else {
          toast.error(err.response?.data?.message || 'Failed to create case. Case Number might already exist.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-dark-800 border border-slate-700/50 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <h2 className="text-lg font-bold text-white">Create New Case</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
           <form id="new-case-form" onSubmit={handleSubmit} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Case Number</label>
                    <input 
                       required
                       type="text" 
                       name="caseNumber"
                       value={formData.caseNumber}
                       onChange={handleChange}
                       placeholder="e.g. FC-2024-001"
                       className="w-full bg-dark-900 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-600"
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Status</label>
                    <select 
                       name="status"
                       value={formData.status}
                       onChange={handleChange}
                       className="w-full bg-dark-900 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                    >
                       <option value="Open">Open</option>
                       <option value="In Progress">In Progress</option>
                       <option value="Closed">Closed</option>
                    </select>
                 </div>
             </div>
             
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Title</label>
                <input 
                   required
                   type="text" 
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   placeholder="Brief title for the investigation..."
                   className="w-full bg-dark-900 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-600"
                />
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Assigned To</label>
                <input 
                   type="text" 
                   name="assignedTo"
                   value={formData.assignedTo}
                   onChange={handleChange}
                   placeholder="Investigator name..."
                   className="w-full bg-dark-900 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-600"
                />
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Description</label>
                <textarea 
                   name="description"
                   rows="4"
                   value={formData.description}
                   onChange={handleChange}
                   placeholder="Detailed context and objective..."
                   className="w-full bg-dark-900 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none placeholder:text-slate-600"
                ></textarea>
             </div>
           </form>
        </div>

        <div className="p-6 border-t border-slate-700/50 bg-dark-800/50 flex justify-end gap-3 mt-auto">
           <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
           >
              Cancel
           </button>
           <button 
              type="submit" 
              form="new-case-form"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
           >
              {loading ? 'Creating...' : 'Create Case'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default NewCaseModal;
