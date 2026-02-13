import { Player } from '../types';

// Using AllOrigins with a cache buster to ensure fresh data
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

const getTeamSlug = (name: string): string => {
  // CapWages uses snake_case: 'Tampa Bay Lightning' -> 'tampa_bay_lightning'
  // 'St. Louis Blues' -> 'st_louis_blues'
  return name.toLowerCase()
    .replace(/\./g, '') // Remove dots
    .replace(/\s+/g, '_'); // Spaces to underscores
};

const parseMoney = (str: string): number => {
  if (!str) return 0;
  // Handle "$9,500,000" -> 9500000
  const clean = str.replace(/[$,]/g, '').trim();
  return parseInt(clean, 10) || 0;
};

const formatName = (rawName: string): string => {
  // CapWages often uses "Last, First" (e.g. "Kucherov, Nikita")
  // We want "Nikita Kucherov"
  const cleaned = rawName.replace(/[\n\t]/g, '').replace(/^\d+\.\s*/, '').trim();
  
  if (cleaned.includes(',')) {
    const parts = cleaned.split(',');
    if (parts.length >= 2) {
      return `${parts[1].trim()} ${parts[0].trim()}`;
    }
  }
  return cleaned;
};

export const scrapePuckPedia = async (teamName: string): Promise<Record<string, Partial<Player>>> => {
  const slug = getTeamSlug(teamName);
  const targetUrl = `https://capwages.com/teams/${slug}`;
  // Add timestamp to prevent caching
  const url = `${PROXY_URL}${encodeURIComponent(targetUrl)}&timestamp=${Date.now()}`;
  
  console.log(`Scraping CapWages: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch CapWages page');
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // CapWages has multiple tables. Based on the python script, we look for tables with headers.
    const tables = doc.querySelectorAll('table');
    const scrapedData: Record<string, Partial<Player>> = {};

    tables.forEach((table) => {
      const thead = table.querySelector('thead');
      if (!thead) return;

      const headerCells = Array.from(thead.querySelectorAll('th')).map(th => th.textContent?.trim().toUpperCase() || '');
      
      // Heuristic: Ensure this is a contract table (needs Player and some money/term columns)
      const playerIdx = headerCells.findIndex(h => h.includes('PLAYER'));
      if (playerIdx === -1) return; // Not a player table

      // Based on python script: Player | Terms | Age | 2025-26 | ...
      // Sometimes "Terms" contains the Clause (M-NTC)
      // Cap Hit is often the first money column or labeled "AAV" / "CAP HIT"
      
      let clauseIdx = headerCells.findIndex(h => h.includes('TERMS') || h.includes('CLAUSE'));
      let aavIdx = headerCells.findIndex(h => h.includes('AAV') || h.includes('CAP HIT'));
      let termIdx = headerCells.findIndex(h => h.includes('LENGTH') || h.includes('TERM'));
      
      // If no explicit AAV column, look for the first column with a year (e.g. "2024-25")
      // The script suggests the money columns follow Age.
      if (aavIdx === -1) {
         // Find first column that looks like a year "20xx-xx"
         const yearColIdx = headerCells.findIndex(h => /\d{4}-\d{2}/.test(h));
         if (yearColIdx !== -1) {
             aavIdx = yearColIdx; // Assume first year column represents current cap hit for simplicity
         }
      }

      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length < headerCells.length) return;

        // 1. Name
        const nameCell = cells[playerIdx];
        // Name might be in a span or div or link
        const rawName = nameCell.textContent || '';
        const name = formatName(rawName);
        if (!name) return;

        // 2. Clause
        let clause: 'NMC' | 'NTC' | 'M-NTC' | null = null;
        if (clauseIdx !== -1) {
            const clauseText = cells[clauseIdx]?.textContent?.trim().toUpperCase() || '';
            if (clauseText.includes('NMC')) clause = 'NMC';
            else if (clauseText.includes('M-NTC')) clause = 'M-NTC';
            else if (clauseText.includes('NTC')) clause = 'NTC';
        }

        // 3. Cap Hit / AAV
        let capHit = 0;
        if (aavIdx !== -1) {
            capHit = parseMoney(cells[aavIdx]?.textContent || '');
        }

        // 4. Term
        let length = 0;
        if (termIdx !== -1) {
            const termText = cells[termIdx]?.textContent || '';
            length = parseInt(termText, 10) || 0;
        }

        // If we found valid data, store it
        if (capHit > 0) {
             // Create normalized key for fuzzy matching
             const key = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
             
             scrapedData[key] = {
                 capHit,
                 aav: capHit,
                 contractLength: length > 0 ? length : 1,
                 clause,
                 isSigned: true
             };
        }
      });
    });

    console.log(`Scraped ${Object.keys(scrapedData).length} contracts from CapWages`);
    return scrapedData;

  } catch (error) {
    console.error('Error scraping CapWages:', error);
    return {};
  }
};
