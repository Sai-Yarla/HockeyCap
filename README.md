# HockeyCap
HockeyCap is a comprehensive salary cap analysis tool designed for hockey fans, armchair GMs, and capologists. Inspired by the legacy of CapFriendly, this application provides interactive rosters, buyout calculations, and an AI-powered expert to answer complex questions about the Collective Bargaining Agreement (CBA).

## Screenshots

### League Dashboard
<img width="1087" height="694" alt="image" src="https://github.com/user-attachments/assets/6e80e198-f9ba-40b9-b5e5-2e2fbccf5499" />

*Real-time overview of league-wide cap space and team status.*

### Team Analysis
<img width="1083" height="693" alt="image" src="https://github.com/user-attachments/assets/ebfc7351-5052-472e-ac56-e7f355770b81" />

*Detailed roster breakdown including Cap Hits, AAV, Terms, and No-Move Clauses.*

## Features

- **League Overview**: View accurate salary cap ceilings, floors, and team statuses.
- **Team Dashboards**: Deep dives into active rosters, non-roster players, and prospect pools with detailed contract breakdowns (Cap Hit, AAV, Term, Clauses).
- **Armchair GM Tool**: Create your own roster scenarios. Remove players, simulate buyouts/trades, and see real-time updates to your projected cap space.
- **CBA Expert Chat**: An integrated AI assistant trained on NHL salary cap rules to answer questions about LTIR, waivers, offer sheets, and more.
- **Real-Time Data Sync**: Includes a custom Python scraper to fetch the latest contract data from external sources (CapWages) and import it directly into the app.

## Using the Data Scraper

To get the most accurate, up-to-the-minute contract data (including No-Move Clauses and exact AAVs), HockeyCap includes a Python utility.

### 1. Install Dependencies
Ensure you have Python installed, then install the required packages:

```bash
pip install requests beautifulsoup4
```

### 2. Run the Scraper
Generate a data file for a specific team using their slug (e.g., `tampa_bay_lightning`, `toronto_maple_leafs`):

```bash
# Syntax: python scraper.py [team_slug] > [output_filename.json]
python scraper.py tampa_bay_lightning > contracts.json
```

### 3. Import Data
1. Open HockeyCap in your browser.
2. Navigate to the specific team's dashboard (e.g., Tampa Bay).
3. Click the **"Import Scraped Data"** button.
4. Select your generated `contracts.json` file.
5. The roster will instantly update with the verified contract details from the scrape.

## AI Features Configuration

To enable the **CBA Expert** and **AI Search** features, the application requires access to Google's Gemini models.

- Ensure a valid `API_KEY` is set in your environment variables.
- The application uses the `@google/genai` SDK to communicate with the model.

## Technologies

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Visualization**: Recharts
- **Icons**: Lucide React
- **AI**: Google GenAI SDK
- **Data Utility**: Python (BeautifulSoup)

## Disclaimer

HockeyCap is a fan-made project and is not affiliated with the National Hockey League (NHL) or any specific team. Initial data is simulated for demonstration purposes; use the scraper for live data.
