
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, AppRoute } from '../types';
import { storage } from '../services/storage';

interface SignupProps {
  onLogin: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Storage Check
    const users = storage.get<User[]>('users') || [];
    if (users.some(u => u.email === email)) {
      setError('Email is already registered.');
      return;
    }

    // Create User
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password
    };

    storage.set('users', [...users, newUser]);
    
    // Auto Login
    const { password: _, ...userSafe } = newUser;
    onLogin(userSafe as User);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">TODO WEB</span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-500 mb-10">Start your journey to better productivity today.</p>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800"
                placeholder="Minimum 6 characters"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
            >
              Sign Up Now
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500">
              Already have an account? <Link to={AppRoute.LOGIN} className="text-indigo-600 font-bold hover:underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
