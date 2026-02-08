
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">TODO WEB</span>
        </div>
        <div className="flex gap-4">
          <Link to={AppRoute.LOGIN} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 px-4 py-2">Log In</Link>
          <Link to={AppRoute.SIGNUP} className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md">Sign Up</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center md:text-left md:flex md:items-center">
        <div className="md:w-1/2 md:pr-12">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">Built for Professionals</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Organize your life, <span className="text-indigo-600">effortlessly.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-xl">
            TODO WEB is a modern task management system that helps you stay on top of your goals with a clean interface and AI-powered workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={AppRoute.SIGNUP} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-105">
              Get Started for Free
            </Link>
            <div className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-medium cursor-default">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Persistent Data
            </div>
          </div>
          
          <div className="mt-12 flex items-center gap-6 justify-center md:justify-start">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://picsum.photos/seed/${i+100}/100/100`} alt="user" />
               ))}
             </div>
             <p className="text-sm text-slate-500 font-medium">Joined by 10,000+ planners today</p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 relative">
          <div className="bg-white rounded-3xl shadow-2xl p-4 border relative overflow-hidden">
            <div className="bg-slate-50 rounded-2xl p-6">
               <div className="flex gap-2 mb-6">
                 <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
               </div>
               <div className="space-y-3">
                 {[
                   { t: 'Design New UI Kit', c: true },
                   { t: 'Review Marketing Copy', c: false },
                   { t: 'Plan Team Offsite', c: false }
                 ].map((item, i) => (
                   <div key={i} className="bg-white p-4 rounded-xl border flex items-center gap-3">
                     <div className={`w-5 h-5 rounded border ${item.c ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}></div>
                     <div className={`h-2 rounded bg-slate-200 w-${item.c ? '20' : '40'}`}></div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
          {/* Floating UI Elements */}
          <div className="absolute -bottom-8 -left-8 bg-emerald-500 text-white p-6 rounded-3xl shadow-xl max-w-[200px] animate-bounce-slow">
            <p className="text-xs font-bold uppercase mb-1">Efficiency Boost</p>
            <p className="text-xl font-bold">42% Higher Productivity</p>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-slate-100 py-12">
         <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm font-medium">
           &copy; {new Date().getFullYear()} TODO WEB. A concept application.
         </div>
      </footer>
    </div>
  );
};

export default Landing;
