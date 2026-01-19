import React from 'react';
import { Player, Team } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip } from 'recharts';

interface TeamDashboardProps {
  team: Team;
}

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
};

const TeamDashboard: React.FC<TeamDashboardProps> = ({ team }) => {
  const capCeiling = 88000000;
  const committed = capCeiling - team.capSpace;
  
  const chartData = [
    { name: 'Committed', value: committed, color: '#94a3b8' },
    { name: 'Available', value: team.capSpace, color: team.capSpace >= 0 ? '#16a34a' : '#ef4444' },
  ];

  const forwards = team.roster.filter(p => ['C', 'LW', 'RW'].includes(p.position));
  const defense = team.roster.filter(p => p.position === 'D');
  const goalies = team.roster.filter(p => p.position === 'G');

  const RosterTable = ({ title, players }: { title: string, players: Player[] }) => (
    <div className="mb-8 bg-white shadow rounded-lg overflow-hidden border border-slate-200">
      <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 uppercase text-sm tracking-wider">{title}</h3>
        <span className="text-xs font-semibold text-slate-500">{players.length} Contracts</span>
      </div>
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
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-slate-900">{player.name}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500">{player.position}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500">{player.age}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-900 font-mono text-right font-medium">
                  {formatMoney(player.capHit)}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500 font-mono text-right">
                  {formatMoney(player.aav)}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500 text-center">
                  {player.contractYear}/{player.contractLength}
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
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-white shadow rounded-lg p-6 border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-slate-200">
                {team.logoCode}
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
                <p className="text-xs text-slate-500 uppercase font-semibold">Contracts</p>
                <p className="text-xl font-bold font-mono text-slate-800">
                  {team.roster.length}/50
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
                <span className="text-slate-500">LTIR Used:</span>
                <span className="font-mono font-medium text-orange-600">{formatMoney(team.ltirUsed)}</span>
             </div>
          </div>
        </div>
      </div>

      <RosterTable title="Forwards" players={forwards} />
      <RosterTable title="Defense" players={defense} />
      <RosterTable title="Goaltenders" players={goalies} />
    </div>
  );
};

export default TeamDashboard;
