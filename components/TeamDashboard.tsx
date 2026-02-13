import React, { useState, useRef } from 'react';
import { Player, Team } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip } from 'recharts';
import { ChevronLeft, Upload, Download } from 'lucide-react';

interface TeamDashboardProps {
  team: Team;
  onBack?: () => void;
  onSyncContracts?: (team: Team, data?: Record<string, Partial<Player>>) => Promise<void>;
}

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
};

const TeamDashboard: React.FC<TeamDashboardProps> = ({ team, onBack, onSyncContracts }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text);
        
        if (onSyncContracts) {
          setIsSyncing(true);
          await onSyncContracts(team, data);
          setIsSyncing(false);
        }
      } catch (err) {
        alert("Failed to parse JSON file. Please ensure it is the correct output from scraper.py");
        console.error(err);
      }
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const capCeiling = 88000000;
  const committed = capCeiling - team.capSpace;
  
  const chartData = [
    { name: 'Committed', value: committed, color: '#94a3b8' },
    { name: 'Available', value: team.capSpace, color: team.capSpace >= 0 ? '#16a34a' : '#ef4444' },
  ];

  const forwards = team.roster.filter(p => ['C', 'LW', 'RW', 'L', 'R'].includes(p.position));
  const defense = team.roster.filter(p => p.position === 'D');
  const goalies = team.roster.filter(p => p.position === 'G');

  // Separation of Non-Roster players
  const signedNonRoster = team.nonRoster.filter(p => p.isSigned).sort((a, b) => b.capHit - a.capHit);
  const unsignedProspects = team.nonRoster.filter(p => !p.isSigned).sort((a, b) => a.name.localeCompare(b.name));

  const contractCount = team.roster.length + signedNonRoster.length;

  const RosterTable = ({ title, players, isNonRoster = false }: { title: string, players: Player[], isNonRoster?: boolean }) => (
    <div className="mb-8 bg-white shadow rounded-lg overflow-hidden border border-slate-200">
      <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 uppercase text-sm tracking-wider">{title}</h3>
        <span className="text-xs font-semibold text-slate-500">{players.length} {isNonRoster ? 'Players' : 'Contracts'}</span>
      </div>
      {players.length > 0 ? (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Player</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pos</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Age</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Cap Hit</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">AAV</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Term</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Clause</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-slate-900 flex items-center">
                    {player.headshot && <img src={player.headshot} className="h-6 w-6 rounded-full mr-2 bg-slate-100" alt="" />}
                    {player.name}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500">{player.position}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500">{player.age}</td>
                  <td className={`px-6 py-2 whitespace-nowrap text-sm font-mono text-right font-medium ${player.capHit === 0 ? 'text-slate-400' : 'text-slate-900'}`}>
                    {player.capHit === 0 ? '-' : formatMoney(player.capHit)}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500 font-mono text-right">
                    {player.aav === 0 ? '-' : formatMoney(player.aav)}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500 text-center">
                    {player.isSigned && player.contractLength > 0 ? `${player.contractYear}/${player.contractLength}` : '-'}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-center">
                     {player.clause ? (
                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                         {player.clause}
                       </span>
                     ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-slate-500">
                    {player.expiryStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-slate-500 italic">No players in this category found in database.</div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        {onBack ? (
          <button onClick={onBack} className="flex items-center text-sm text-slate-500 hover:text-green-600 transition-colors">
            <ChevronLeft size={16} className="mr-1" /> Back to League
          </button>
        ) : <div></div>}
        
        {onSyncContracts && (
          <div className="flex gap-2">
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isSyncing}
              className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors text-sm font-medium border border-green-200"
              title="Upload the JSON file generated by scraper.py"
            >
              <Upload size={14} />
              <span>Import Scraped Data</span>
            </button>
            <a 
              href="/scraper.py" 
              download="scraper.py"
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-md hover:bg-slate-100 transition-colors text-sm font-medium border border-slate-200"
              title="Download Python Scraper Script"
              onClick={(e) => {
                 // Prevent default if no actual file serving is set up, but let's assume user grabs the code from the view
                 // In a real app we'd serve the static file. Here we just show the button.
              }}
            >
               <Download size={14} />
               <span className="hidden sm:inline">Get Script</span>
            </a>
          </div>
        )}
      </div>

      {/* Header Summary */}
      <div className="bg-white shadow rounded-lg p-6 border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <div className="h-16 w-16 flex items-center justify-center">
                {team.logoUrl ? (
                  <img src={team.logoUrl} alt={team.name} className="max-h-full max-w-full" />
                ) : (
                  <div className="bg-slate-900 rounded-full h-full w-full flex items-center justify-center text-white font-bold text-2xl border-4 border-slate-200">{team.logoCode}</div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{team.name}</h1>
                <p className="text-slate-500">{team.city}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-xs text-slate-500 uppercase font-semibold">Projected Cap Space</p>
                <p className={`text-xl font-bold font-mono ${team.capSpace >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatMoney(team.capSpace)}
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-xs text-slate-500 uppercase font-semibold">Standard Contracts</p>
                <p className={`text-xl font-bold font-mono ${contractCount > 50 ? 'text-red-600' : 'text-slate-800'}`}>
                  {contractCount}/50
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 h-48 w-full flex justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ReTooltip formatter={(value: number) => formatMoney(value)} />
                </PieChart>
             </ResponsiveContainer>
          </div>
          
          <div className="text-sm space-y-2 border-l border-slate-100 pl-4">
             <div className="flex justify-between">
                <span className="text-slate-500">Cap Ceiling:</span>
                <span className="font-mono font-medium">{formatMoney(capCeiling)}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-slate-500">Cap Floor:</span>
                <span className="font-mono font-medium">{formatMoney(65000000)}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-slate-500">Active Roster:</span>
                <span className="font-mono font-medium text-slate-900">
                   {team.roster.length}/23
                </span>
             </div>
          </div>
        </div>
      </div>

      <RosterTable title="Forwards" players={forwards} />
      <RosterTable title="Defense" players={defense} />
      <RosterTable title="Goaltenders" players={goalies} />
      
      {signedNonRoster.length > 0 && (
         <RosterTable title="In The System (Signed)" players={signedNonRoster} isNonRoster={true} />
      )}

      {unsignedProspects.length > 0 && (
         <RosterTable title="Unsigned Draft Rights" players={unsignedProspects} isNonRoster={true} />
      )}
    </div>
  );
};

export default TeamDashboard;
