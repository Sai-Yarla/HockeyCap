import React, { useState } from 'react';
import { Search, Menu, X, DollarSign, Calculator, Users, HelpCircle, FileText } from 'lucide-react';
import { AppView, Player } from '../types';
import { searchPlayerOrTeam } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  onPlayerFound: (player: Player) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setCurrentView, onPlayerFound }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const player = await searchPlayerOrTeam(searchQuery);
    setIsSearching(false);
    
    if (player) {
      onPlayerFound(player);
      setSearchQuery('');
    } else {
      alert("Player not found or API unavailable. Try 'Connor McDavid' or ensure API key is set.");
    }
  };

  const NavLink = ({ view, label, icon: Icon }: { view: AppView; label: string; icon: any }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${currentView === view 
          ? 'bg-slate-800 text-white' 
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentView(AppView.HOME)}>
              <div className="bg-green-600 p-1.5 rounded mr-2">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">HockeyCap</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
              <NavLink view={AppView.HOME} label="League" icon={Users} />
              <NavLink view={AppView.TEAM} label="Teams" icon={FileText} />
              <NavLink view={AppView.GM_TOOL} label="Armchair GM" icon={Calculator} />
              <NavLink view={AppView.CBA_EXPERT} label="CBA Expert" icon={HelpCircle} />
            </nav>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xs ml-4">
              <form onSubmit={handleSearch} className="relative w-full text-slate-900">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-md leading-5 bg-slate-100 text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search Players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isSearching && (
                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                     <div className="animate-spin h-4 w-4 border-2 border-green-500 rounded-full border-t-transparent"></div>
                   </div>
                )}
              </form>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink view={AppView.HOME} label="League" icon={Users} />
              <NavLink view={AppView.TEAM} label="Teams" icon={FileText} />
              <NavLink view={AppView.GM_TOOL} label="Armchair GM" icon={Calculator} />
              <NavLink view={AppView.CBA_EXPERT} label="CBA Expert" icon={HelpCircle} />
            </div>
            <div className="px-4 pt-2">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="block w-full px-3 py-2 rounded-md text-slate-900 bg-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-green-500"
                  placeholder="Search Players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-white font-semibold mb-1">HockeyCap</h3>
            <p className="text-xs">Based on the legacy of CapFriendly.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">FAQ</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <div className="mt-4 md:mt-0 text-xs">
            &copy; {new Date().getFullYear()} HockeyCap Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;