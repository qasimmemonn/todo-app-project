
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { User, Todo } from '../types';
import { storage } from '../services/storage';
import { suggestTasks } from '../services/aiService';
import TodoItem from '../components/TodoItem';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [aiLoading, setAiLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allTodos = storage.get<Todo[]>('todos') || [];
    const userTodos = allTodos.filter(t => t.userId === user.id);
    setTodos(userTodos);

    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [user.id]);

  const syncTodos = useCallback((updatedTodos: Todo[]) => {
    const allTodos = storage.get<Todo[]>('todos') || [];
    const otherUsersTodos = allTodos.filter(t => t.userId !== user.id);
    storage.set('todos', [...otherUsersTodos, ...updatedTodos]);
  }, [user.id]);

  const addTodo = (title: string, desc: string) => {
    if (!title.trim()) return;
    const newTodo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      title: title.trim(),
      description: desc.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    const updated = [newTodo, ...todos];
    setTodos(updated);
    syncTodos(updated);
    setNewTitle('');
    setNewDesc('');
  };

  const toggleTodo = (id: string) => {
    const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos(updated);
    syncTodos(updated);
  };

  const deleteTodo = (id: string) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    syncTodos(updated);
  };

  const editTodo = (id: string, newTitle: string, newDesc: string) => {
    const updated = todos.map(t => t.id === id ? { ...t, title: newTitle, description: newDesc } : t);
    setTodos(updated);
    syncTodos(updated);
  };

  const handleAiSuggest = async () => {
    if (!newTitle.trim()) return;
    setAiLoading(true);
    const suggestions = await suggestTasks(newTitle);
    if (suggestions.length > 0) {
      const bulletPoints = suggestions.map(s => `• ${s}`).join('\n');
      setNewDesc(prev => prev ? `${prev}\n\nAI Plan:\n${bulletPoints}` : `AI Plan:\n${bulletPoints}`);
    }
    setAiLoading(false);
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, percent };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             t.description.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [todos, filter, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dynamic Header */}
      <header className="glass-nav sticky top-0 z-50 border-b border-slate-200/50">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">T</div>
            <span className="font-extrabold text-lg tracking-tight text-slate-800">TaskFlow</span>
          </div>

          <div className="relative" ref={profileMenuRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-1 px-2 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-bold text-slate-700">{user.name.split(' ')[0]}</span>
              <svg className={`h-4 w-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-200 py-2 animate-slide-up origin-top-right overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Logged in as</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                </div>
                <div className="p-1">
                  <button onClick={onLogout} className="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-8 gap-8">
        
        {/* Modern Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 gap-6 shrink-0">
          <div className="bg-white border border-slate-200 rounded-3xl p-2 shadow-sm">
            <div className="p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Workspace</p>
              <nav className="flex flex-col gap-1">
                <button 
                  onClick={() => setFilter('all')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${filter === 'all' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                  All Tasks
                </button>
                <button 
                  onClick={() => setFilter('active')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${filter === 'active' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Pending
                </button>
                <button 
                  onClick={() => setFilter('completed')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${filter === 'completed' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Completed
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 min-w-0">
          
          {/* Welcome Header */}
          <div className="mb-10 animate-fade-in">
            <h2 className="text-3xl font-black text-slate-900 leading-tight">Hello, {user.name.split(' ')[0]}! 👋</h2>
            <p className="text-slate-500 font-medium">You have <span className="text-indigo-600 font-bold">{stats.pending} tasks</span> remaining for today.</p>
          </div>

          {/* Statistics Section */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Tasks</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-slate-900 leading-none">{stats.total}</p>
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Completed</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-emerald-600 leading-none">{stats.completed}</p>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-amber-600 leading-none">{stats.pending}</p>
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Progress</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-indigo-600 leading-none">{stats.percent}%</p>
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                </div>
              </div>
            </div>
          </section>

          {/* New Task Creator Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white mb-10 shadow-2xl shadow-indigo-900/10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black tracking-tight">New Goal</h3>
              <div className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/5">Local Cloud Sync</div>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Task title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 outline-none transition-all font-bold text-white placeholder-white/30"
                />
                <button 
                  onClick={handleAiSuggest}
                  disabled={!newTitle.trim() || aiLoading}
                  className={`absolute right-3 top-3.5 p-1.5 rounded-xl transition-all ${!newTitle.trim() || aiLoading ? 'text-white/10' : 'text-indigo-400 hover:bg-white/10'}`}
                >
                  {aiLoading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              
              <textarea 
                placeholder="Details & context..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 outline-none transition-all text-sm text-white/70 resize-none h-24 placeholder-white/20"
              />
              
              <div className="flex justify-end">
                <button 
                  onClick={() => addTodo(newTitle, newDesc)}
                  disabled={!newTitle.trim()}
                  className="bg-white hover:bg-slate-100 disabled:bg-white/10 disabled:text-white/20 text-slate-900 font-black py-4 px-10 rounded-2xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>

          {/* List Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-80 group">
               <input 
                  type="text" 
                  placeholder="Search keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all"
               />
               <svg className="w-5 h-5 absolute left-4 top-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>

            <div className="lg:hidden flex bg-slate-200 p-1 rounded-xl w-full sm:w-auto">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Task List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo, idx) => (
                <div key={todo.id} className="animate-fade-in" style={{ animationDelay: `${0.3 + idx * 0.05}s` }}>
                  <TodoItem 
                    todo={todo} 
                    onToggle={toggleTodo} 
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-400">Workspace is empty</h3>
                <p className="text-sm text-slate-300 mt-1">Try changing the filter or add a new goal.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
