import requests
from bs4 import BeautifulSoup
import json
import sys
import re

# Usage: python scraper.py [team_slug]
# Example: python scraper.py tampa_bay_lightning > contracts.json

team_slug = sys.argv[1] if len(sys.argv) > 1 else "tampa_bay_lightning"
url = f"https://capwages.com/teams/{team_slug}"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
except Exception as e:
    # Output error as JSON so frontend doesn't crash if it tries to read it (though it's stdout)
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

soup = BeautifulSoup(response.content, "html.parser")
contracts = {}

def clean_money(s):
    if not s: return 0
    # Remove $ and ,
    clean = re.sub(r'[$,]', '', s)
    try:
        return int(clean)
    except:
        return 0

def clean_name(s):
    # Remove newlines, tabs, numbers like "1. "
    s = re.sub(r'[\n\t]', '', s)
    s = re.sub(r'^\d+\.\s*', '', s).strip()
    
    # "Last, First" -> "First Last"
    if ',' in s:
        parts = s.split(',')
        if len(parts) >= 2:
            return f"{parts[1].strip()} {parts[0].strip()}"
    return s

# Find all tables
tables = soup.find_all("table")

for table in tables:
    thead = table.find("thead")
    if not thead: continue
    
    header_cells = [th.get_text(strip=True).upper() for th in thead.find_all("th")]
    
    # Identify Player column
    try:
        player_idx = next(i for i, h in enumerate(header_cells) if "PLAYER" in h)
    except StopIteration:
        continue # Not a contract table
        
    rows = table.find("tbody").find_all("tr")
    for row in rows:
        cells = row.find_all("td")
        if not cells or len(cells) < len(header_cells): continue
        
        # 1. Name
        raw_name = cells[player_idx].get_text(strip=True)
        name = clean_name(raw_name)
        if not name: continue
        
        # 2. Search whole row text for clauses
        row_text = row.get_text(" ", strip=True).upper()
        clause = None
        if "NMC" in row_text: clause = "NMC"
        elif "M-NTC" in row_text: clause = "M-NTC"
        elif "NTC" in row_text: clause = "NTC"
        
        # 3. Find Cap Hit
        # Look for the first cell with "$" that is NOT the Terms column (if Terms has $)
        # A safer bet for CapWages is scanning cells after the player name column
        cap_hit = 0
        for cell in cells[player_idx+1:]:
            txt = cell.get_text(strip=True)
            if "$" in txt:
                val = clean_money(txt)
                if val > 100000: # Filter out small numbers just in case
                    cap_hit = val
                    break
        
        if cap_hit > 0:
            # Create a normalized key for matching in the JS app
            # Lowercase + remove accents/diacritics
            # Simple normalization for python side
            key = name.lower()
            
            contracts[key] = {
                "name": name,
                "capHit": cap_hit,
                "aav": cap_hit,
                "clause": clause,
                "isSigned": True
            }

# Output valid JSON
print(json.dumps(contracts, indent=2))
