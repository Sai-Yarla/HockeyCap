import { Team, Player } from '../types';

const PROXY_URL = 'https://corsproxy.io/?'; // Use a CORS proxy if direct access is blocked
const BASE_URL = 'https://api-web.nhle.com/v1';

// Helper to generate mock contract data since public API lacks it
const generateMockContract = (age: number, isProspect = false) => {
  if (isProspect) {
    // Prospects are either unsigned or on ELCs
    // 60% chance a prospect in the system is signed to an SPC
    const isSigned = Math.random() > 0.4; 
    
    if (!isSigned) {
      return {
        capHit: 0,
        aav: 0,
        contractLength: 0,
        contractYear: 0,
        expiryStatus: 'RFA',
        clause: null,
        isSigned: false
      };
    }
    
    // ELC
    const capHit = Math.floor(Math.random() * 100000) + 850000;
    return {
      capHit,
      aav: capHit,
      contractLength: 3,
      contractYear: Math.floor(Math.random() * 3) + 1,
      expiryStatus: 'RFA',
      clause: null,
      isSigned: true
    };
  }

  const isEntryLevel = age <= 22;
  
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
    isSigned: true
  };
};

const calculateAge = (birthDate: string) => {
  if (!birthDate) return 20;
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

    // 2. Map basic team data
    const teams: Team[] = teamsList.map((t: any) => ({
      id: t.teamAbbrev.default.toLowerCase(),
      name: t.teamName.default,
      city: t.placeName.default,
      logoCode: t.teamAbbrev.default,
      logoUrl: t.teamLogo,
      roster: [], 
      nonRoster: [],
      capSpace: 0, 
      projectedCapSpace: 0, 
      ltirUsed: 0
    }));

    // 3. Fetch Rosters and Prospects in parallel
    const rosterPromises = teams.map(async (team) => {
      try {
        const [rosterRes, prospectsRes] = await Promise.all([
          fetch(`${PROXY_URL}${encodeURIComponent(`${BASE_URL}/roster/${team.logoCode}/current`)}`),
          fetch(`${PROXY_URL}${encodeURIComponent(`${BASE_URL}/prospects/${team.logoCode}`)}`)
        ]);

        const rosterData = await rosterRes.ok ? await rosterRes.json() : { forwards: [], defensemen: [], goalies: [] };
        let prospectsData: any = {};
        try {
          if (prospectsRes.ok) {
            prospectsData = await prospectsRes.json();
          }
        } catch(e) { console.warn('Prospect parse error'); }

        // --- Process Active Roster ---
        const allRosterPlayers = [
          ...(rosterData.forwards || []),
          ...(rosterData.defensemen || []),
          ...(rosterData.goalies || [])
        ];

        const rosterIds = new Set(); // Track IDs to prevent duplicates in non-roster

        team.roster = allRosterPlayers.map((p: any) => {
          const age = calculateAge(p.birthDate);
          const contract = generateMockContract(age, false);
          rosterIds.add(p.id);
          
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
            number: p.sweaterNumber,
            isSigned: true
          };
        });

        // --- Process Prospects / Non-Roster ---
        const prospectList = prospectsData.prospects || [];
        
        team.nonRoster = prospectList
          .filter((p: any) => !rosterIds.has(p.id)) // Deduplicate: Remove if already on active roster
          .map((p: any) => {
             const age = calculateAge(p.birthDate);
             const contract = generateMockContract(age, true);
             
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
               clause: null,
               team: team.logoCode,
               headshot: p.headshot,
               number: undefined, // Prospects often don't have numbers assigned yet
               isSigned: contract.isSigned
             };
          });

        // Calculate a mock cap space based on the roster + signed non-roster
        // Note: In reality, non-roster players in AHL only count if > $1.15M, but for simplicity we'll sum roster
        const rosterCap = team.roster.reduce((sum, p) => sum + p.capHit, 0);
        const ceiling = 88000000;
        team.capSpace = ceiling - rosterCap;
        team.projectedCapSpace = team.capSpace + 100000;

      } catch (err) {
        console.error(`Failed to fetch data for ${team.logoCode}`, err);
      }
      return team;
    });

    return await Promise.all(rosterPromises);

  } catch (error) {
    console.error("Error fetching NHL data", error);
    return [];
  }
};
