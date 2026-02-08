
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative selection:bg-indigo-100 selection:text-indigo-900">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-[120px] opacity-40 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-50 rounded-full blur-[100px] opacity-40 -z-10"></div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-black text-lg italic">T</span>
          </div>
          <span className="font-black text-2xl text-slate-900 tracking-tight">TaskFlow</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to={AppRoute.LOGIN} className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Sign In</Link>
          <Link to={AppRoute.SIGNUP} className="bg-slate-900 text-white text-sm font-bold px-7 py-3 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest rounded-full mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              AI-Powered Productivity
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter animate-slide-up">
              Master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">daily flow.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium animate-slide-up [animation-delay:100ms]">
              The next-generation task manager that blends minimalist design with powerful Gemini AI to help you achieve more with less stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-slide-up [animation-delay:200ms]">
              <Link to={AppRoute.SIGNUP} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-[2rem] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest text-xs">
                Start Your Journey
              </Link>
              <div className="flex items-center gap-4 px-8 py-5 bg-white border border-slate-100 rounded-[2rem] text-slate-500 font-bold text-sm shadow-sm">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                Privacy First
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative group animate-fade-in [animation-delay:300ms]">
            {/* Mock UI Preview */}
            <div className="bg-white rounded-[3rem] shadow-2xl p-4 border border-slate-100 relative overflow-hidden transform group-hover:-rotate-1 transition-transform duration-700">
              <div className="bg-slate-50 rounded-[2.5rem] p-8">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Today's Goals</h3>
                    <p className="text-slate-400 text-sm font-bold">Tuesday, May 24</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { t: 'Launch TaskFlow v2.0', desc: 'Finalize landing page and push to production', c: true, color: 'indigo' },
                    { t: 'Design System Audit', desc: 'Check color contrast and spacing consistency', c: false, color: 'emerald' },
                    { t: 'AI Integration Test', desc: 'Refine Gemini 3 Flash prompts for better results', c: false, color: 'rose' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow cursor-default">
                      <div className={`w-7 h-7 rounded-xl border-2 flex-shrink-0 flex items-center justify-center transition-all ${item.c ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200'}`}>
                        {item.c && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-black text-slate-800 leading-tight mb-1 ${item.c ? 'line-through text-slate-400' : ''}`}>{item.t}</h4>
                        <p className="text-xs text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating Element */}
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Collaborate</p>
                  <p className="text-sm font-black text-slate-800">Team Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: 'AI Smart Planning', 
              desc: 'Leverage Gemini AI to automatically break down your high-level goals into small, manageable steps.', 
              icon: '🤖',
              color: 'bg-indigo-50 text-indigo-600'
            },
            { 
              title: 'Zen Mode UI', 
              desc: 'A distraction-free interface designed to help you maintain deep focus and stay in your creative flow.', 
              icon: '✨',
              color: 'bg-emerald-50 text-emerald-600'
            },
            { 
              title: 'Privacy Locked', 
              desc: 'Your data is yours. Local-first storage ensures your tasks never leave your device without your permission.', 
              icon: '🛡️',
              color: 'bg-amber-50 text-amber-600'
            },
            { 
              title: 'Instant Chat', 
              desc: 'Manage everything through conversation. Our assistant can add, update, and toggle tasks on the fly.', 
              icon: '💬',
              color: 'bg-rose-50 text-rose-600'
            }
          ].map((f, i) => (
            <div key={i} className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-500">
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Detailed Description Section */}
        <section className="mt-40 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tighter italic">"The most beautiful way to stay organized."</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium mb-12">
              TaskFlow isn't just another todo list. It's a professional-grade productivity engine built with React 19 and the latest Gemini 3 Flash models. 
              Whether you're a solo developer, a marketing manager, or a student, TaskFlow adapts to your needs with an interface that feels like second nature.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-slate-50">
              <div>
                <p className="text-4xl font-black text-slate-900 mb-1">0ms</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Latency</p>
              </div>
              <div>
                <p className="text-4xl font-black text-indigo-600 mb-1">100%</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Private</p>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900 mb-1">24/7</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Support</p>
              </div>
              <div>
                <p className="text-4xl font-black text-emerald-600 mb-1">∞</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Growth</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="mt-40 bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl font-black mb-8 tracking-tighter">Ready to enter flow state?</h2>
            <p className="text-white/60 text-lg mb-12 font-medium italic">Join the next generation of productive professionals today. No credit card required.</p>
            <Link to={AppRoute.SIGNUP} className="inline-block px-12 py-6 bg-white text-slate-900 font-black rounded-[2rem] hover:bg-indigo-50 hover:scale-105 transition-all active:scale-95 uppercase tracking-widest text-xs">
              Create Your Free Account
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600/10 rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 font-black text-xs">T</span>
            </div>
            <span className="font-black text-slate-400 text-lg tracking-tight">TaskFlow</span>
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} TaskFlow all right reserved
          </p>
          <div className="flex gap-8">
            <Link to={AppRoute.PRIVACY} className="text-xs font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest">Privacy</Link>
            <Link to={AppRoute.TERMS} className="text-xs font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest">Terms</Link>
            <a href="#" className="text-xs font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest">Github</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
