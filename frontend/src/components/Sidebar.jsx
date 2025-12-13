import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, Trash2, User, Plus } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="w-64 bg-white border-r h-screen hidden md:flex flex-col sticky top-0">
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" /><path d="M15 3v5h5" /><path d="M8 12h8" /><path d="M8 16h5" /></svg>
                    </div>
                    <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">QuickNotes</h1>
                </div>
            </div>

            <div className="px-4 mb-6">
                <NavLink to="/create" className="flex items-center gap-2 w-full p-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition shadow-lg shadow-slate-200">
                    <div className="bg-white/20 p-1 rounded-full"><Plus size={16} /></div>
                    <span className="font-medium">Add new</span>
                </NavLink>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                <NavLink to="/" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-slate-50 text-slate-900 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <LayoutGrid size={20} />
                    <span>My Notes</span>
                </NavLink>

                <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-slate-50 text-slate-900 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <User size={20} />
                    <span>Profile</span>
                </NavLink>

                <div className="pt-4 mt-4 border-t border-slate-100">
                    <NavLink to="/trash" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-red-50 text-red-600 font-semibold' : 'text-slate-500 hover:bg-red-50 hover:text-red-600'}`}>
                        <Trash2 size={20} />
                        <span>Trash</span>
                    </NavLink>
                </div>
            </nav>


        </div>
    );
}
