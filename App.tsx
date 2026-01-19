import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TeamDashboard from './components/TeamDashboard';
import TeamList from './components/TeamList';
import { CBAExpertChat, ArmchairGM } from './components/CapTools';
import { AppView, Team, Player } from './types';
import { Activity, TrendingUp, DollarSign } from 'lucide-react';
import { fetchAllTeamsData } from './services/nhlService';

const HomeDashboard = ({ onViewTeam }: { onViewTeam: () => void }) => (
  <div className="space-y-8">
    <div className="text-center py-10">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
        The Cap is King.
      </h1>
      <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
        Your ultimate source for NHL salary cap data, contract analytics, and roster management tools.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button onClick={onViewTeam} className="px-6 py-3 rounded-md bg-green-600 text-white font-bold hover:bg-green-700 transition">
          View Teams
        </button>
        <button className="px-6 py-3 rounded-md bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition">
          Browse Free Agents
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg"><Activity className="text-blue-600" size={24}/></div>
          <h3 className="font-bold text-slate-800">Recent Signings</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">L. Draisaitl (EDM)</span>
            <span className="font-mono text-slate-900">$14.0M x 8</span>
          </li>
          <li className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">J. Swayman (BOS)</span>
            <span className="font-mono text-slate-900">$8.25M x 8</span>
          </li>
          <li className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">S. Crosby (PIT)</span>
            <span className="font-mono text-slate-900">$8.7M x 2</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-green-100 p-2 rounded-lg"><DollarSign className="text-green-600" size={24}/></div>
          <h3 className="font-bold text-slate-800">League Cap Status</h3>
        </div>
        <div className="space-y-3 text-sm">
           <div className="flex justify-between border-b border-slate-100 pb-2">
             <span className="text-slate-500">Salary Cap Ceiling</span>
             <span className="font-mono font-bold text-slate-900">$88,000,000</span>
           </div>
           <div className="flex justify-between border-b border-slate-100 pb-2">
             <span className="text-slate-500">Salary Cap Floor</span>
             <span className="font-mono font-bold text-slate-900">$65,000,000</span>
           </div>
           <div className="flex justify-between pt-1">
             <span className="text-slate-500">Teams using LTIR</span>
             <span className="font-mono font-bold text-orange-600">14</span>
           </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-purple-100 p-2 rounded-lg"><TrendingUp className="text-purple-600" size={24}/></div>
          <h3 className="font-bold text-slate-800">Buyout Calculator</h3>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Calculate the cost and cap hit impact of buying out a player's contract under current CBA rules.
        </p>
        <button className="w-full py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-50 font-medium text-sm">
          Launch Tool
        </button>
      </div>
    </div>
  </div>
);

const PlayerProfileModal = ({ player, onClose }: { player: Player; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
      <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
        <div className="flex items-center gap-4">
          {player.headshot && (
            <img src={player.headshot} alt={player.name} className="w-16 h-16 rounded-full border-2 border-white bg-slate-800" />
          )}
          <div>
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <p className="text-slate-400">#{player.number} | {player.position} | {player.team}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <span className="text-2xl">&times;</span>
        </button>
      </div>
      <div className="p-6">
         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-3 rounded">
              <span className="block text-xs text-slate-500 uppercase">Cap Hit</span>
              <span className="block text-xl font-mono font-bold text-slate-900">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(player.capHit)}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded">
              <span className="block text-xs text-slate-500 uppercase">Contract Status</span>
              <span className="block text-xl font-bold text-slate-900">{player.expiryStatus}</span>
            </div>
         </div>
         <div className="space-y-2 text-sm text-slate-700">
           <p><strong>Age:</strong> {player.age}</p>
           <p><strong>Term:</strong> Year {player.contractYear} of {player.contractLength}</p>
           <p><strong>Clauses:</strong> {player.clause || 'None'}</p>
         </div>
         <div className="mt-6 pt-4 border-t border-slate-100">
           <p className="text-xs text-slate-400 italic">
             Data source: NHL API (Contracts are simulated for demonstration)
           </p>
         </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchedPlayer, setSearchedPlayer] = useState<Player | null>(null);
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingTeams(true);
      const fetchedTeams = await fetchAllTeamsData();
      setTeams(fetchedTeams);
      setIsLoadingTeams(false);
    };
    loadData();
  }, []);

  const handlePlayerFound = (player: Player) => {
    setSearchedPlayer(player);
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setCurrentView(AppView.TEAM);
  };

  const handleBackToTeams = () => {
    setSelectedTeam(null);
  };

  // Reset selected team when navigating away from TEAM view
  const handleSetView = (view: AppView) => {
    if (view !== AppView.TEAM) {
      setSelectedTeam(null);
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeDashboard onViewTeam={() => handleSetView(AppView.TEAM)} />;
      case AppView.TEAM:
        if (selectedTeam) {
          return <TeamDashboard team={selectedTeam} onBack={handleBackToTeams} />;
        }
        return <TeamList teams={teams} onSelectTeam={handleTeamSelect} />;
      case AppView.GM_TOOL:
        // Use selected team if available, otherwise default to first available
        const gmTeam = selectedTeam || teams[0];
        if (!gmTeam) return <div className="p-10 text-center">Loading teams for GM Tool...</div>;
        return <ArmchairGM initialTeam={gmTeam} />;
      case AppView.CBA_EXPERT:
        return (
          <div className="max-w-2xl mx-auto">
             <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900">Ask the Cap Expert</h2>
                <p className="text-slate-500">Powered by Gemini models trained on CBA data</p>
             </div>
             <CBAExpertChat />
          </div>
        );
      default:
        return <HomeDashboard onViewTeam={() => handleSetView(AppView.TEAM)} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={handleSetView}
      onPlayerFound={handlePlayerFound}
      teams={teams}
    >
      {renderContent()}
      {searchedPlayer && (
        <PlayerProfileModal 
          player={searchedPlayer} 
          onClose={() => setSearchedPlayer(null)} 
        />
      )}
    </Layout>
  );
};

export default App;
