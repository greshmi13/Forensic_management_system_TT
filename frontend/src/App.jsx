import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import CaseDetails from './pages/CaseDetails';
import Evidence from './pages/Evidence';
import AuditTrail from './pages/AuditTrail';
import LabManagement from './pages/LabManagement';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{
          style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' }
      }} />
      <div className="flex h-screen bg-dark-900 text-slate-200 overflow-hidden font-sans">
        <Sidebar className="z-20" />
        <div className="flex-1 flex flex-col pl-64 overflow-hidden relative">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4 z-0"></div>
             
             {/* Main Content Area */}
             <div className="relative z-10 w-full h-full">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/cases" element={<Cases />} />
                  <Route path="/cases/:id" element={<CaseDetails />} />
                  <Route path="/evidence" element={<Evidence />} />
                  <Route path="/lab" element={<LabManagement />} />
                  <Route path="/reports" element={<PlaceholderPage title="Report Generator" description="Export comprehensive reports in PDF and DOCX formats." />} />
                  <Route path="/audit" element={<AuditTrail />} />
                  <Route path="/users" element={<PlaceholderPage title="User Management" description="Manage user roles and RBAC permissions." />} />
                  <Route path="/settings" element={<PlaceholderPage title="System Settings" description="Configure global variables and integrations." />} />
                  <Route path="*" element={<div className="p-8"><h2 className="text-2xl text-white">404 - Not Found</h2></div>} />
                </Routes>
             </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;