import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all">
      <div className="px-5 py-3.5 rounded-2xl bg-slate-900 border border-brand-500/40 text-white shadow-glow flex items-center space-x-3 text-sm font-semibold">
        <Sparkles className="w-5 h-5 text-brand-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{message}</span>
      </div>
    </div>
  );
}
