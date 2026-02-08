
import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDesc: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSave = () => {
    if (title.trim()) {
      onEdit(todo.id, title, description);
      setIsEditing(false);
    }
  };

  return (
    <div className={`group relative bg-white rounded-3xl border border-slate-100 p-5 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 ${todo.completed ? 'bg-slate-50/50' : ''}`}>
      {/* Top Status Tag */}
      <div className="absolute top-4 right-4">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
          todo.completed 
          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
        }`}>
          {todo.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      {isEditing ? (
        <div className="space-y-3 flex-1">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold"
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none h-24"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
            <button onClick={handleSave} className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-100">Save</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 pr-16 mb-4">
            <h3 className={`text-lg font-extrabold text-slate-800 leading-tight mb-2 ${todo.completed ? 'line-through text-slate-400' : ''}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`text-sm text-slate-500 line-clamp-3 leading-relaxed ${todo.completed ? 'text-slate-300' : ''}`}>
                {todo.description}
              </p>
            )}
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsEditing(true)} 
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <button 
                onClick={() => onDelete(todo.id)} 
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>

            <button 
              onClick={() => onToggle(todo.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 ${
                todo.completed 
                ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100'
              }`}
            >
              {todo.completed ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Undo
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  Complete
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
