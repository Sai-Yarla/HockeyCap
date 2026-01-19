import { Team, Player } from '../types';

const PROXY_URL = 'https://corsproxy.io/?'; // Use a CORS proxy if direct access is blocked
const BASE_URL = 'https://api-web.nhle.com/v1';

// Helper to generate mock contract data since public API lacks it
const generateMockContract = (age: number) => {
  const isEntryLevel = age <= 22;
  const isVeteran = age > 32;
  
  let capHit = 775000;
  if (!isEntryLevel) {
    // Random cap hit between 1M and 10M for non-ELC
    capHit = Math.floor(Math.random() * 9000000) + 1000000;
    // Skew higher for some
    if (Math.random() > 0.8) capHit += 3000000;
  } else {
    capHit = Math.floor(Math.random() * 150000) + 800000;
  }

  const length = Math.floor(Math.random() * 8) + 1;
  const year = Math.floor(Math.random() * length) + 1;
  
  return {
    capHit,
    aav: capHit,
    contractLength: length,
    contractYear: year,
    expiryStatus: (age < 27) ? 'RFA' : 'UFA',
    clause: (capHit > 6000000) ? (Math.random() > 0.5 ? 'NMC' : 'M-NTC') : null,
  };
};

const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const fetchAllTeamsData = async (): Promise<Team[]> => {
  try {
    // 1. Fetch Teams
    const standingsRes = await fetch(`${PROXY_URL}${encodeURIComponent(`${BASE_URL}/standings/now`)}`);
    const standingsData = await standingsRes.json();
    
    const teamsList: any[] = standingsData.standings;

    // 2. Map basic team data and prepare roster fetches
    // We limit to first 32 to be safe, though standings endpoint usually returns all
    const teams: Team[] = teamsList.map((t: any) => ({
      id: t.teamAbbrev.default.toLowerCase(),
      name: t.teamName.default,
      city: t.placeName.default,
      logoCode: t.teamAbbrev.default,
      logoUrl: t.teamLogo,
      roster: [], // Will populate below
      capSpace: 0, // Will calculate
      projectedCapSpace: 0, 
      ltirUsed: 0
    }));

    // 3. Fetch Rosters for all teams in parallel
    // Note: Fetching 32 endpoints at once might rate limit, but NHL API is usually robust. 
    // We will do batches of 8 if needed, but Promise.all is usually fine for client-side valid demos.
    const rosterPromises = teams.map(async (team) => {
      try {
        const rosterRes = await fetch(`${PROXY_URL}${encodeURIComponent(`${BASE_URL}/roster/${team.logoCode}/current`)}`);
        const rosterData = await rosterRes.json();
        
        const allPlayers = [
          ...(rosterData.forwards || []),
          ...(rosterData.defensemen || []),
          ...(rosterData.goalies || [])
        ];

        team.roster = allPlayers.map((p: any) => {
          const age = p.birthDate ? calculateAge(p.birthDate) : 25;
          const contract = generateMockContract(age);
          
          return {
            id: p.id.toString(),
            name: `${p.firstName.default} ${p.lastName.default}`,
            position: p.positionCode,
            age: age,
            capHit: contract.capHit,
            aav: contract.aav,
            contractLength: contract.contractLength,
            contractYear: contract.contractYear,
            expiryStatus: contract.expiryStatus as 'UFA' | 'RFA',
            clause: contract.clause as any,
            team: team.logoCode,
            headshot: p.headshot,
            number: p.sweaterNumber
          };
        });

        // Calculate a mock cap space based on the random contracts
        const totalCap = team.roster.reduce((sum, p) => sum + p.capHit, 0);
        const ceiling = 88000000;
        team.capSpace = ceiling - totalCap;
        team.projectedCapSpace = team.capSpace + 100000; // Mock projection

      } catch (err) {
        console.error(`Failed to fetch roster for ${team.logoCode}`, err);
      }
      return team;
    });

    return await Promise.all(rosterPromises);

  } catch (error) {
    console.error("Error fetching NHL data", error);
    return [];
  }
};
