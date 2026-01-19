import React from 'react';
import { Team } from '../types';

interface TeamListProps {
  teams: Team[];
  onSelectTeam: (team: Team) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onSelectTeam }) => {
  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900">League Teams</h2>
        <p className="text-slate-500 mt-2">Select a team to view detailed salary cap and roster information.</p>
      </div>
      
      {teams.length === 0 ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-slate-500">Loading NHL Data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {teams.map((team) => (
            <div 
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-green-500 transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="h-16 w-16 flex items-center justify-center mb-3">
                 {team.logoUrl ? (
                   <img src={team.logoUrl} alt={team.name} className="max-h-full max-w-full drop-shadow-sm group-hover:drop-shadow-md transition-all" />
                 ) : (
                   <div className="bg-slate-900 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold">{team.logoCode}</div>
                 )}
              </div>
              <div className="text-sm font-bold text-slate-900">{team.city}</div>
              <div className="text-xs text-slate-500">{team.name}</div>
              <div className={`text-xs mt-2 font-mono font-medium ${team.capSpace >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${(team.capSpace / 1000000).toFixed(1)}M
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;
