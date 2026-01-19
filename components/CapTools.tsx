import React, { useState, useRef, useEffect } from 'react';
import { askCBAExpert } from '../services/geminiService';
import { ChatMessage, Team, Player } from '../types';
import { Send, User, Bot, Trash2 } from 'lucide-react';

export const CBAExpertChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      content: "Hello! I'm your Salary Cap Assistant. Ask me anything about the NHL CBA, LTIR, waivers, or contract limits.",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askCBAExpert(input);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-[600px] border border-slate-200">
      <div className="bg-slate-800 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-green-400" />
          <h2 className="font-bold text-lg">Cap Rules Expert</h2>
        </div>
        <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">Powered by Gemini</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-slate-200 p-3 rounded-lg rounded-bl-none shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200 rounded-b-lg">
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text"
            className="flex-1 border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ask about waivers, buyouts, or LTIR..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium flex items-center
              ${isLoading ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-700'}`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

// Simple Mock Armchair GM Tool
export const ArmchairGM: React.FC<{ initialTeam: Team }> = ({ initialTeam }) => {
  const [roster, setRoster] = useState<Player[]>(initialTeam.roster);
  const [removedPlayers, setRemovedPlayers] = useState<Player[]>([]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const calculateCap = () => {
    const total = roster.reduce((sum, p) => sum + p.capHit, 0);
    return 88000000 - total;
  };

  const removePlayer = (id: string) => {
    const player = roster.find(p => p.id === id);
    if (player) {
      setRoster(roster.filter(p => p.id !== id));
      setRemovedPlayers([...removedPlayers, player]);
    }
  };

  const restorePlayer = (id: string) => {
    const player = removedPlayers.find(p => p.id === id);
    if (player) {
      setRemovedPlayers(removedPlayers.filter(p => p.id !== id));
      setRoster([...roster, player]);
    }
  };

  const capSpace = calculateCap();

  return (
    <div className="space-y-6">
       <div className="bg-white p-6 rounded-lg shadow border border-slate-200 flex justify-between items-center sticky top-20 z-40">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Armchair GM: {initialTeam.name}</h2>
            <p className="text-sm text-slate-500">Experiment with roster moves.</p>
          </div>
          <div className={`text-right ${capSpace >= 0 ? 'text-green-600' : 'text-red-600'}`}>
             <p className="text-xs uppercase font-bold text-slate-400">Projected Cap Space</p>
             <p className="text-3xl font-mono font-bold">{formatMoney(capSpace)}</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
             <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700">Active Roster ({roster.length})</div>
             <div className="divide-y divide-slate-100">
               {roster.map(p => (
                 <div key={p.id} className="p-3 flex justify-between items-center hover:bg-slate-50">
                    <div>
                      <div className="font-medium text-slate-800">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.position} | {formatMoney(p.capHit)}</div>
                    </div>
                    <button onClick={() => removePlayer(p.id)} className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50">
                       <Trash2 size={16} />
                    </button>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden border border-dashed border-slate-300">
             <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-500">Trading Block / Waived</div>
             {removedPlayers.length === 0 && (
                <div className="p-8 text-center text-slate-400 italic">No players removed yet.</div>
             )}
             <div className="divide-y divide-slate-100">
               {removedPlayers.map(p => (
                 <div key={p.id} className="p-3 flex justify-between items-center bg-slate-50">
                    <div className="opacity-70">
                      <div className="font-medium text-slate-800">{p.name}</div>
                      <div className="text-xs text-slate-500">{formatMoney(p.capHit)}</div>
                    </div>
                    <button onClick={() => restorePlayer(p.id)} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                       Restore
                    </button>
                 </div>
               ))}
             </div>
          </div>
       </div>
    </div>
  );
};
