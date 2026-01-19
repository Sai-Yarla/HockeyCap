import React from 'react';
import { NHL_TEAMS } from '../data/teams';
import { Team } from '../types';

interface TeamListProps {
  onSelectTeam: (team: Team) => void;
}

const TeamList: React.FC<TeamListProps> = ({ onSelectTeam }) => {
  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900">League Teams</h2>
        <p className="text-slate-500 mt-2">Select a team to view detailed salary cap and roster information.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {NHL_TEAMS.map((team) => (
          <div 
            key={team.id}
            onClick={() => onSelectTeam(team)}
            className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-green-500 transition-all cursor-pointer flex flex-col items-center text-center group"
          >
            <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 border-4 border-slate-100 group-hover:border-green-100">
              {team.logoCode}
            </div>
            <div className="text-sm font-bold text-slate-900">{team.city}</div>
            <div className="text-xs text-slate-500">{team.name.split(' ').slice(-1)}</div>
            <div className={`text-xs mt-2 font-mono font-medium ${team.capSpace >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(team.capSpace / 1000000).toFixed(1)}M
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
