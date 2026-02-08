
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="glass-nav sticky top-0 z-50 border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to={AppRoute.LANDING} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md">T</div>
            <span className="font-extrabold text-lg tracking-tight text-slate-800">TaskFlow</span>
          </Link>
          <Link to={AppRoute.LANDING} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Back to Home</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[2.5rem] p-10 sm:p-16 border border-slate-100 shadow-xl shadow-slate-200/50">
          <h1 className="text-4xl sm:text-5xl font-black mb-8 tracking-tight italic">Privacy Policy</h1>
          <p className="text-slate-400 text-sm font-bold mb-12 uppercase tracking-widest">Last Updated: October 2023</p>

          <div className="prose prose-slate max-w-none space-y-12">
            <section>
              <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">01</span>
                Introduction
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                At TaskFlow, your privacy is our highest priority. We believe that your productivity data is deeply personal. This policy outlines how we handle your information and our commitment to transparency.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">02</span>
                Local-First Data Storage
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                TaskFlow utilizes a "local-first" architecture. Most of your data, including your tasks, notes, and local settings, is stored directly on your device using browser local storage. This ensures that you maintain control over your data even when offline.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm">03</span>
                AI Processing Disclosure
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                When you use our AI features (such as Task Suggestions or the Assistant Chatbot), the specific text you provide is transmitted to Google's Gemini API for processing. This data is used solely to provide you with intelligent feedback and is not permanently stored by TaskFlow on our own servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-sm">04</span>
                Your Rights
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Since your data is stored locally, you have the right to delete your information at any time by clearing your browser's site data or using the "Sign Out" feature which clears your session data.
              </p>
            </section>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-sm font-medium">Questions about your privacy? Contact us at privacy@taskflow.io</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
