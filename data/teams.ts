import { Team, Player } from '../types';

// Helper to create players easily
const createPlayer = (
  id: string, name: string, pos: 'C'|'LW'|'RW'|'D'|'G', age: number, 
  capHit: number, length: number, year: number, status: 'UFA'|'RFA', 
  team: string, clause: 'NMC'|'NTC'|'M-NTC'|null = null
): Player => ({
  id, name, position: pos, age, capHit, aav: capHit, 
  contractLength: length, contractYear: year, expiryStatus: status, clause, team, isSigned: true
});

export const NHL_TEAMS: Team[] = [
  {
    id: 'ana', name: 'Anaheim Ducks', city: 'Anaheim', logoCode: 'ANA',
    capSpace: 21500000, projectedCapSpace: 24000000, ltirUsed: 0,
    roster: [
      createPlayer('ana1', 'Troy Terry', 'RW', 26, 7000000, 7, 2, 'UFA', 'ANA'),
      createPlayer('ana2', 'Trevor Zegras', 'C', 23, 5750000, 3, 2, 'RFA', 'ANA'),
      createPlayer('ana3', 'Mason McTavish', 'C', 21, 894167, 3, 3, 'RFA', 'ANA'),
      createPlayer('ana4', 'Cam Fowler', 'D', 32, 6500000, 8, 7, 'UFA', 'ANA', 'M-NTC'),
      createPlayer('ana5', 'Radko Gudas', 'D', 33, 4000000, 3, 2, 'UFA', 'ANA', 'NTC'),
      createPlayer('ana6', 'John Gibson', 'G', 30, 6400000, 8, 6, 'UFA', 'ANA', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'bos', name: 'Boston Bruins', city: 'Boston', logoCode: 'BOS',
    capSpace: 120000, projectedCapSpace: 500000, ltirUsed: 0,
    roster: [
      createPlayer('bos1', 'David Pastrnak', 'RW', 27, 11250000, 8, 2, 'UFA', 'BOS', 'NMC'),
      createPlayer('bos2', 'Brad Marchand', 'LW', 35, 6125000, 8, 8, 'UFA', 'BOS', 'NMC'),
      createPlayer('bos3', 'Charlie McAvoy', 'D', 26, 9500000, 8, 3, 'UFA', 'BOS', 'NMC'),
      createPlayer('bos4', 'Hampus Lindholm', 'D', 30, 6500000, 8, 3, 'UFA', 'BOS', 'NTC'),
      createPlayer('bos5', 'Jeremy Swayman', 'G', 25, 8250000, 8, 1, 'UFA', 'BOS'),
      createPlayer('bos6', 'Elias Lindholm', 'C', 29, 7750000, 7, 1, 'UFA', 'BOS', 'NMC'),
    ],
    nonRoster: []
  },
  {
    id: 'buf', name: 'Buffalo Sabres', city: 'Buffalo', logoCode: 'BUF',
    capSpace: 8500000, projectedCapSpace: 9000000, ltirUsed: 0,
    roster: [
      createPlayer('buf1', 'Rasmus Dahlin', 'D', 23, 11000000, 8, 1, 'UFA', 'BUF'),
      createPlayer('buf2', 'Tage Thompson', 'C', 26, 7142857, 7, 2, 'UFA', 'BUF', 'M-NTC'),
      createPlayer('buf3', 'Dylan Cozens', 'C', 23, 7100000, 7, 2, 'UFA', 'BUF'),
      createPlayer('buf4', 'Alex Tuch', 'RW', 27, 4750000, 7, 3, 'UFA', 'BUF', 'M-NTC'),
      createPlayer('buf5', 'Owen Power', 'D', 21, 8350000, 7, 1, 'UFA', 'BUF'),
      createPlayer('buf6', 'Ukko-Pekka Luukkonen', 'G', 25, 4750000, 5, 1, 'UFA', 'BUF'),
    ],
    nonRoster: []
  },
  {
    id: 'cgy', name: 'Calgary Flames', city: 'Calgary', logoCode: 'CGY',
    capSpace: 19000000, projectedCapSpace: 20000000, ltirUsed: 0,
    roster: [
      createPlayer('cgy1', 'Jonathan Huberdeau', 'LW', 30, 10500000, 8, 2, 'UFA', 'CGY', 'NMC'),
      createPlayer('cgy2', 'Nazem Kadri', 'C', 33, 7000000, 7, 3, 'UFA', 'CGY', 'NMC'),
      createPlayer('cgy3', 'MacKenzie Weegar', 'D', 30, 6250000, 8, 2, 'UFA', 'CGY', 'NTC'),
      createPlayer('cgy4', 'Rasmus Andersson', 'D', 27, 4550000, 6, 4, 'UFA', 'CGY', 'M-NTC'),
      createPlayer('cgy5', 'Mikael Backlund', 'C', 35, 4500000, 2, 1, 'UFA', 'CGY', 'NMC'),
    ],
    nonRoster: []
  },
  {
    id: 'car', name: 'Carolina Hurricanes', city: 'Raleigh', logoCode: 'CAR',
    capSpace: 3200000, projectedCapSpace: 3500000, ltirUsed: 0,
    roster: [
      createPlayer('car1', 'Sebastian Aho', 'C', 26, 9750000, 8, 1, 'UFA', 'CAR', 'NMC'),
      createPlayer('car2', 'Andrei Svechnikov', 'RW', 24, 7750000, 8, 4, 'UFA', 'CAR'),
      createPlayer('car3', 'Seth Jarvis', 'RW', 22, 7900000, 8, 1, 'UFA', 'CAR', 'NTC'),
      createPlayer('car4', 'Jaccob Slavin', 'D', 30, 6461000, 8, 1, 'UFA', 'CAR', 'NMC'),
      createPlayer('car5', 'Brent Burns', 'D', 39, 5280000, 8, 8, 'UFA', 'CAR', 'M-NTC'),
      createPlayer('car6', 'Frederik Andersen', 'G', 34, 3400000, 2, 2, 'UFA', 'CAR', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'chi', name: 'Chicago Blackhawks', city: 'Chicago', logoCode: 'CHI',
    capSpace: 6500000, projectedCapSpace: 7000000, ltirUsed: 0,
    roster: [
      createPlayer('chi1', 'Connor Bedard', 'C', 18, 950000, 3, 2, 'RFA', 'CHI'),
      createPlayer('chi2', 'Seth Jones', 'D', 29, 9500000, 8, 3, 'UFA', 'CHI', 'NMC'),
      createPlayer('chi3', 'Taylor Hall', 'LW', 32, 6000000, 4, 4, 'UFA', 'CHI', 'M-NTC'),
      createPlayer('chi4', 'Nick Foligno', 'LW', 36, 4500000, 2, 1, 'UFA', 'CHI'),
      createPlayer('chi5', 'Tyler Bertuzzi', 'LW', 29, 5500000, 4, 1, 'UFA', 'CHI', 'NMC'),
      createPlayer('chi6', 'Teuvo Teravainen', 'RW', 29, 5400000, 3, 1, 'UFA', 'CHI', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'col', name: 'Colorado Avalanche', city: 'Denver', logoCode: 'COL',
    capSpace: -2500000, projectedCapSpace: 0, ltirUsed: 6250000,
    roster: [
      createPlayer('col1', 'Nathan MacKinnon', 'C', 28, 12600000, 8, 2, 'UFA', 'COL', 'NMC'),
      createPlayer('col2', 'Cale Makar', 'D', 25, 9000000, 6, 4, 'UFA', 'COL', 'NMC'),
      createPlayer('col3', 'Mikko Rantanen', 'RW', 27, 9250000, 6, 6, 'UFA', 'COL', 'M-NTC'),
      createPlayer('col4', 'Gabriel Landeskog', 'LW', 31, 7000000, 8, 4, 'UFA', 'COL', 'NMC'),
      createPlayer('col5', 'Valeri Nichushkin', 'RW', 29, 6125000, 8, 3, 'UFA', 'COL', 'NMC'),
      createPlayer('col6', 'Devon Toews', 'D', 30, 7250000, 7, 1, 'UFA', 'COL', 'NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'cbj', name: 'Columbus Blue Jackets', city: 'Columbus', logoCode: 'CBJ',
    capSpace: 16000000, projectedCapSpace: 16000000, ltirUsed: 0,
    roster: [
      createPlayer('cbj1', 'Johnny Gaudreau', 'LW', 30, 9750000, 7, 3, 'UFA', 'CBJ', 'NMC'),
      createPlayer('cbj2', 'Zach Werenski', 'D', 26, 9583333, 6, 3, 'UFA', 'CBJ', 'NMC'),
      createPlayer('cbj3', 'Sean Monahan', 'C', 29, 5500000, 5, 1, 'UFA', 'CBJ', 'M-NTC'),
      createPlayer('cbj4', 'Boone Jenner', 'C', 30, 3750000, 4, 3, 'UFA', 'CBJ', 'M-NTC'),
      createPlayer('cbj5', 'Elvis Merzlikins', 'G', 30, 5400000, 5, 3, 'UFA', 'CBJ', 'M-NTC'),
      createPlayer('cbj6', 'Adam Fantilli', 'C', 19, 950000, 3, 2, 'RFA', 'CBJ'),
    ],
    nonRoster: []
  },
  {
    id: 'dal', name: 'Dallas Stars', city: 'Dallas', logoCode: 'DAL',
    capSpace: 250000, projectedCapSpace: 500000, ltirUsed: 0,
    roster: [
      createPlayer('dal1', 'Roope Hintz', 'C', 27, 8450000, 8, 2, 'UFA', 'DAL', 'M-NTC'),
      createPlayer('dal2', 'Miro Heiskanen', 'D', 24, 8450000, 8, 4, 'UFA', 'DAL', 'NMC'),
      createPlayer('dal3', 'Jason Robertson', 'LW', 24, 7750000, 4, 3, 'RFA', 'DAL'),
      createPlayer('dal4', 'Tyler Seguin', 'C', 32, 9850000, 8, 8, 'UFA', 'DAL', 'NMC'),
      createPlayer('dal5', 'Jamie Benn', 'LW', 34, 9500000, 8, 8, 'UFA', 'DAL', 'NMC'),
      createPlayer('dal6', 'Jake Oettinger', 'G', 25, 4000000, 3, 3, 'RFA', 'DAL'),
    ],
    nonRoster: []
  },
  {
    id: 'det', name: 'Detroit Red Wings', city: 'Detroit', logoCode: 'DET',
    capSpace: 6000000, projectedCapSpace: 6000000, ltirUsed: 0,
    roster: [
      createPlayer('det1', 'Dylan Larkin', 'C', 27, 8700000, 8, 2, 'UFA', 'DET', 'NMC'),
      createPlayer('det2', 'Alex DeBrincat', 'RW', 26, 7875000, 4, 2, 'UFA', 'DET', 'M-NTC'),
      createPlayer('det3', 'Lucas Raymond', 'RW', 22, 8075000, 8, 1, 'UFA', 'DET', 'NTC'),
      createPlayer('det4', 'Moritz Seider', 'D', 23, 8550000, 7, 1, 'UFA', 'DET', 'NTC'),
      createPlayer('det5', 'Patrick Kane', 'RW', 35, 4000000, 1, 1, 'UFA', 'DET', 'NMC'),
      createPlayer('det6', 'Ben Chiarot', 'D', 33, 4750000, 4, 3, 'UFA', 'DET', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'edm', name: 'Edmonton Oilers', city: 'Edmonton', logoCode: 'EDM',
    capSpace: -1500000, projectedCapSpace: 0, ltirUsed: 5000000,
    roster: [
      createPlayer('edm1', 'Connor McDavid', 'C', 27, 12500000, 8, 7, 'UFA', 'EDM', 'NMC'),
      createPlayer('edm2', 'Leon Draisaitl', 'C', 28, 14000000, 8, 1, 'UFA', 'EDM', 'NMC'),
      createPlayer('edm3', 'Darnell Nurse', 'D', 29, 9250000, 8, 3, 'UFA', 'EDM', 'NMC'),
      createPlayer('edm4', 'Zach Hyman', 'LW', 31, 5500000, 7, 4, 'UFA', 'EDM', 'NMC'),
      createPlayer('edm5', 'Evan Bouchard', 'D', 24, 3900000, 2, 2, 'RFA', 'EDM'),
      createPlayer('edm6', 'Ryan Nugent-Hopkins', 'C', 31, 5125000, 8, 4, 'UFA', 'EDM', 'NMC'),
    ],
    nonRoster: []
  },
  {
    id: 'fla', name: 'Florida Panthers', city: 'Sunrise', logoCode: 'FLA',
    capSpace: 450000, projectedCapSpace: 800000, ltirUsed: 0,
    roster: [
      createPlayer('fla1', 'Aleksander Barkov', 'C', 28, 10000000, 8, 3, 'UFA', 'FLA', 'NMC'),
      createPlayer('fla2', 'Matthew Tkachuk', 'RW', 26, 9500000, 8, 3, 'UFA', 'FLA', 'NMC'),
      createPlayer('fla3', 'Sam Reinhart', 'RW', 28, 8625000, 8, 1, 'UFA', 'FLA', 'NTC'),
      createPlayer('fla4', 'Aaron Ekblad', 'D', 28, 7500000, 8, 8, 'UFA', 'FLA', 'M-NTC'),
      createPlayer('fla5', 'Sergei Bobrovsky', 'G', 35, 10000000, 7, 6, 'UFA', 'FLA', 'NMC'),
      createPlayer('fla6', 'Gustav Forsling', 'D', 27, 5750000, 8, 1, 'UFA', 'FLA', 'NMC'),
    ],
    nonRoster: []
  },
  {
    id: 'lak', name: 'Los Angeles Kings', city: 'Los Angeles', logoCode: 'LAK',
    capSpace: 1200000, projectedCapSpace: 1200000, ltirUsed: 0,
    roster: [
      createPlayer('lak1', 'Anze Kopitar', 'C', 36, 7000000, 2, 1, 'UFA', 'LAK', 'NMC'),
      createPlayer('lak2', 'Drew Doughty', 'D', 34, 11000000, 8, 6, 'UFA', 'LAK', 'NMC'),
      createPlayer('lak3', 'Kevin Fiala', 'LW', 27, 7875000, 7, 3, 'UFA', 'LAK', 'M-NTC'),
      createPlayer('lak4', 'Adrian Kempe', 'RW', 27, 5500000, 4, 3, 'UFA', 'LAK', 'M-NTC'),
      createPlayer('lak5', 'Phillip Danault', 'C', 31, 5500000, 6, 4, 'UFA', 'LAK', 'M-NTC'),
      createPlayer('lak6', 'Quinton Byfield', 'C', 21, 6250000, 5, 1, 'UFA', 'LAK'),
    ],
    nonRoster: []
  },
  {
    id: 'min', name: 'Minnesota Wild', city: 'Saint Paul', logoCode: 'MIN',
    capSpace: 850000, projectedCapSpace: 850000, ltirUsed: 0,
    roster: [
      createPlayer('min1', 'Kirill Kaprizov', 'LW', 27, 9000000, 5, 4, 'UFA', 'MIN', 'NMC'),
      createPlayer('min2', 'Joel Eriksson Ek', 'C', 27, 5250000, 8, 4, 'UFA', 'MIN', 'M-NTC'),
      createPlayer('min3', 'Matt Boldy', 'RW', 23, 7000000, 7, 2, 'UFA', 'MIN'),
      createPlayer('min4', 'Jared Spurgeon', 'D', 34, 7575000, 7, 5, 'UFA', 'MIN', 'M-NTC'),
      createPlayer('min5', 'Jonas Brodin', 'D', 30, 6000000, 7, 4, 'UFA', 'MIN', 'NMC'),
      createPlayer('min6', 'Brock Faber', 'D', 21, 8500000, 8, 1, 'UFA', 'MIN'),
    ],
    nonRoster: []
  },
  {
    id: 'mtl', name: 'Montreal Canadiens', city: 'Montreal', logoCode: 'MTL',
    capSpace: 5400000, projectedCapSpace: 9000000, ltirUsed: 10500000,
    roster: [
      createPlayer('mtl1', 'Nick Suzuki', 'C', 24, 7875000, 8, 3, 'UFA', 'MTL'),
      createPlayer('mtl2', 'Cole Caufield', 'RW', 23, 7850000, 8, 2, 'UFA', 'MTL', 'M-NTC'),
      createPlayer('mtl3', 'Juraj Slafkovsky', 'LW', 20, 7600000, 8, 1, 'UFA', 'MTL'),
      createPlayer('mtl4', 'Mike Matheson', 'D', 30, 4875000, 8, 6, 'UFA', 'MTL', 'M-NTC'),
      createPlayer('mtl5', 'Patrik Laine', 'RW', 26, 8700000, 4, 3, 'UFA', 'MTL', 'M-NTC'),
      createPlayer('mtl6', 'Brendan Gallagher', 'RW', 32, 6500000, 6, 4, 'UFA', 'MTL', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'nsh', name: 'Nashville Predators', city: 'Nashville', logoCode: 'NSH',
    capSpace: 3500000, projectedCapSpace: 3500000, ltirUsed: 0,
    roster: [
      createPlayer('nsh1', 'Roman Josi', 'D', 33, 9059000, 8, 5, 'UFA', 'NSH', 'NMC'),
      createPlayer('nsh2', 'Filip Forsberg', 'LW', 29, 8500000, 8, 3, 'UFA', 'NSH', 'NMC'),
      createPlayer('nsh3', 'Steven Stamkos', 'C', 34, 8000000, 4, 1, 'UFA', 'NSH', 'NMC'),
      createPlayer('nsh4', 'Jonathan Marchessault', 'RW', 33, 5500000, 5, 1, 'UFA', 'NSH', 'NTC'),
      createPlayer('nsh5', 'Brady Skjei', 'D', 30, 7000000, 7, 1, 'UFA', 'NSH', 'M-NTC'),
      createPlayer('nsh6', 'Juuse Saros', 'G', 29, 7740000, 8, 1, 'UFA', 'NSH'),
    ],
    nonRoster: []
  },
  {
    id: 'njd', name: 'New Jersey Devils', city: 'Newark', logoCode: 'NJD',
    capSpace: 1200000, projectedCapSpace: 1200000, ltirUsed: 0,
    roster: [
      createPlayer('njd1', 'Jack Hughes', 'C', 23, 8000000, 8, 3, 'UFA', 'NJD'),
      createPlayer('njd2', 'Nico Hischier', 'C', 25, 7250000, 7, 5, 'UFA', 'NJD'),
      createPlayer('njd3', 'Dougie Hamilton', 'D', 30, 9000000, 7, 4, 'UFA', 'NJD', 'NMC'),
      createPlayer('njd4', 'Timo Meier', 'RW', 27, 8800000, 8, 2, 'UFA', 'NJD', 'M-NTC'),
      createPlayer('njd5', 'Jesper Bratt', 'LW', 25, 7875000, 8, 2, 'UFA', 'NJD', 'NMC'),
      createPlayer('njd6', 'Jacob Markstrom', 'G', 34, 6000000, 6, 5, 'UFA', 'NJD', 'NMC'),
    ],
    nonRoster: []
  },
  {
    id: 'nyi', name: 'New York Islanders', city: 'Elmont', logoCode: 'NYI',
    capSpace: 50000, projectedCapSpace: 50000, ltirUsed: 0,
    roster: [
      createPlayer('nyi1', 'Mathew Barzal', 'C', 26, 9150000, 8, 2, 'UFA', 'NYI', 'NMC'),
      createPlayer('nyi2', 'Bo Horvat', 'C', 29, 8500000, 8, 2, 'UFA', 'NYI', 'NTC'),
      createPlayer('nyi3', 'Ilya Sorokin', 'G', 28, 8250000, 8, 1, 'UFA', 'NYI', 'NMC'),
      createPlayer('nyi4', 'Noah Dobson', 'D', 24, 4000000, 3, 3, 'RFA', 'NYI'),
      createPlayer('nyi5', 'Ryan Pulock', 'D', 29, 6150000, 8, 3, 'UFA', 'NYI', 'NTC'),
      createPlayer('nyi6', 'Anders Lee', 'LW', 33, 7000000, 7, 6, 'UFA', 'NYI', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'nyr', name: 'New York Rangers', city: 'New York', logoCode: 'NYR',
    capSpace: 600000, projectedCapSpace: 600000, ltirUsed: 0,
    roster: [
      createPlayer('nyr1', 'Artemi Panarin', 'LW', 32, 11642857, 7, 6, 'UFA', 'NYR', 'NMC'),
      createPlayer('nyr2', 'Adam Fox', 'D', 26, 9500000, 7, 3, 'UFA', 'NYR', 'NMC'),
      createPlayer('nyr3', 'Mika Zibanejad', 'C', 31, 8500000, 8, 5, 'UFA', 'NYR', 'NMC'),
      createPlayer('nyr4', 'Chris Kreider', 'LW', 33, 6500000, 7, 5, 'UFA', 'NYR', 'M-NTC'),
      createPlayer('nyr5', 'Igor Shesterkin', 'G', 28, 5666667, 4, 4, 'UFA', 'NYR'),
      createPlayer('nyr6', 'Jacob Trouba', 'D', 30, 8000000, 7, 6, 'UFA', 'NYR', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'ott', name: 'Ottawa Senators', city: 'Ottawa', logoCode: 'OTT',
    capSpace: 1100000, projectedCapSpace: 1100000, ltirUsed: 0,
    roster: [
      createPlayer('ott1', 'Tim Stutzle', 'C', 22, 8350000, 8, 2, 'UFA', 'OTT'),
      createPlayer('ott2', 'Brady Tkachuk', 'LW', 24, 8205714, 7, 4, 'UFA', 'OTT', 'NMC'),
      createPlayer('ott3', 'Thomas Chabot', 'D', 27, 8000000, 8, 5, 'UFA', 'OTT', 'M-NTC'),
      createPlayer('ott4', 'Jake Sanderson', 'D', 21, 8050000, 8, 1, 'UFA', 'OTT', 'M-NTC'),
      createPlayer('ott5', 'Claude Giroux', 'RW', 36, 6500000, 3, 3, 'UFA', 'OTT', 'NMC'),
      createPlayer('ott6', 'Linus Ullmark', 'G', 30, 5000000, 4, 4, 'UFA', 'OTT', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'phi', name: 'Philadelphia Flyers', city: 'Philadelphia', logoCode: 'PHI',
    capSpace: 800000, projectedCapSpace: 2000000, ltirUsed: 6250000,
    roster: [
      createPlayer('phi1', 'Travis Konecny', 'RW', 27, 8750000, 8, 1, 'UFA', 'PHI'),
      createPlayer('phi2', 'Sean Couturier', 'C', 31, 7750000, 8, 3, 'UFA', 'PHI', 'NMC'),
      createPlayer('phi3', 'Travis Sanheim', 'D', 28, 6250000, 8, 2, 'UFA', 'PHI', 'NTC'),
      createPlayer('phi4', 'Owen Tippett', 'RW', 25, 6200000, 8, 1, 'UFA', 'PHI'),
      createPlayer('phi5', 'Joel Farabee', 'LW', 24, 5000000, 6, 3, 'UFA', 'PHI'),
      createPlayer('phi6', 'Matvei Michkov', 'RW', 19, 950000, 3, 1, 'RFA', 'PHI'),
    ],
    nonRoster: []
  },
  {
    id: 'pit', name: 'Pittsburgh Penguins', city: 'Pittsburgh', logoCode: 'PIT',
    capSpace: 500000, projectedCapSpace: 500000, ltirUsed: 0,
    roster: [
      createPlayer('pit1', 'Sidney Crosby', 'C', 36, 8700000, 2, 1, 'UFA', 'PIT', 'NMC'),
      createPlayer('pit2', 'Erik Karlsson', 'D', 33, 11500000, 8, 6, 'UFA', 'PIT', 'NMC'),
      createPlayer('pit3', 'Evgeni Malkin', 'C', 37, 6100000, 4, 3, 'UFA', 'PIT', 'NMC'),
      createPlayer('pit4', 'Kris Letang', 'D', 37, 6100000, 6, 3, 'UFA', 'PIT', 'NMC'),
      createPlayer('pit5', 'Bryan Rust', 'RW', 32, 5125000, 6, 3, 'UFA', 'PIT', 'NMC'),
      createPlayer('pit6', 'Tristan Jarry', 'G', 29, 5375000, 5, 2, 'UFA', 'PIT', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'sjs', name: 'San Jose Sharks', city: 'San Jose', logoCode: 'SJS',
    capSpace: 15000000, projectedCapSpace: 15000000, ltirUsed: 0,
    roster: [
      createPlayer('sjs1', 'Logan Couture', 'C', 35, 8000000, 8, 6, 'UFA', 'SJS', 'M-NTC'),
      createPlayer('sjs2', 'Marc-Edouard Vlasic', 'D', 37, 7000000, 8, 8, 'UFA', 'SJS', 'M-NTC'),
      createPlayer('sjs3', 'Macklin Celebrini', 'C', 17, 975000, 3, 1, 'RFA', 'SJS'),
      createPlayer('sjs4', 'Will Smith', 'C', 19, 950000, 3, 1, 'RFA', 'SJS'),
      createPlayer('sjs5', 'Tyler Toffoli', 'RW', 32, 6000000, 4, 1, 'UFA', 'SJS'),
      createPlayer('sjs6', 'Mikael Granlund', 'C', 32, 5000000, 4, 4, 'UFA', 'SJS'),
    ],
    nonRoster: []
  },
  {
    id: 'sea', name: 'Seattle Kraken', city: 'Seattle', logoCode: 'SEA',
    capSpace: 60000, projectedCapSpace: 60000, ltirUsed: 0,
    roster: [
      createPlayer('sea1', 'Vince Dunn', 'D', 27, 7350000, 4, 2, 'UFA', 'SEA', 'M-NTC'),
      createPlayer('sea2', 'Jared McCann', 'LW', 27, 5000000, 5, 3, 'UFA', 'SEA', 'M-NTC'),
      createPlayer('sea3', 'Matty Beniers', 'C', 21, 7142857, 7, 1, 'RFA', 'SEA'),
      createPlayer('sea4', 'Chandler Stephenson', 'C', 30, 6250000, 7, 1, 'UFA', 'SEA', 'NMC'),
      createPlayer('sea5', 'Brandon Montour', 'D', 30, 7142857, 7, 1, 'UFA', 'SEA', 'NMC'),
      createPlayer('sea6', 'Andre Burakovsky', 'LW', 29, 5500000, 5, 3, 'UFA', 'SEA', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'stl', name: 'St. Louis Blues', city: 'St. Louis', logoCode: 'STL',
    capSpace: 1200000, projectedCapSpace: 1200000, ltirUsed: 0,
    roster: [
      createPlayer('stl1', 'Robert Thomas', 'C', 24, 8125000, 8, 2, 'UFA', 'STL', 'NMC'),
      createPlayer('stl2', 'Jordan Kyrou', 'RW', 26, 8125000, 8, 2, 'UFA', 'STL', 'NMC'),
      createPlayer('stl3', 'Colton Parayko', 'D', 31, 6500000, 8, 3, 'UFA', 'STL', 'NTC'),
      createPlayer('stl4', 'Brayden Schenn', 'C', 32, 6500000, 8, 5, 'UFA', 'STL', 'NTC'),
      createPlayer('stl5', 'Justin Faulk', 'D', 32, 6500000, 7, 5, 'UFA', 'STL', 'NTC'),
      createPlayer('stl6', 'Jordan Binnington', 'G', 30, 6000000, 6, 4, 'UFA', 'STL', 'NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'tbl', name: 'Tampa Bay Lightning', city: 'Tampa Bay', logoCode: 'TBL',
    capSpace: 750000, projectedCapSpace: 750000, ltirUsed: 0,
    roster: [
      createPlayer('tbl1', 'Nikita Kucherov', 'RW', 30, 9500000, 8, 6, 'UFA', 'TBL', 'NMC'),
      createPlayer('tbl2', 'Andrei Vasilevskiy', 'G', 29, 9500000, 8, 5, 'UFA', 'TBL', 'NMC'),
      createPlayer('tbl3', 'Brayden Point', 'C', 28, 9500000, 8, 3, 'UFA', 'TBL', 'NMC'),
      createPlayer('tbl4', 'Victor Hedman', 'D', 33, 8000000, 4, 1, 'UFA', 'TBL', 'NMC'),
      createPlayer('tbl5', 'Jake Guentzel', 'LW', 29, 9000000, 7, 1, 'UFA', 'TBL', 'NMC'),
      createPlayer('tbl6', 'Ryan McDonagh', 'D', 34, 6750000, 7, 6, 'UFA', 'TBL', 'NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'tor', name: 'Toronto Maple Leafs', city: 'Toronto', logoCode: 'TOR',
    capSpace: 54100, projectedCapSpace: 120000, ltirUsed: 0,
    roster: [
      createPlayer('tor1', 'Auston Matthews', 'C', 26, 13250000, 4, 1, 'UFA', 'TOR', 'NMC'),
      createPlayer('tor2', 'Mitch Marner', 'RW', 27, 10903000, 6, 6, 'UFA', 'TOR', 'NMC'),
      createPlayer('tor3', 'William Nylander', 'RW', 28, 11500000, 8, 1, 'UFA', 'TOR', 'NMC'),
      createPlayer('tor4', 'John Tavares', 'C', 33, 11000000, 7, 7, 'UFA', 'TOR', 'NMC'),
      createPlayer('tor5', 'Morgan Rielly', 'D', 30, 7500000, 8, 3, 'UFA', 'TOR', 'NMC'),
      createPlayer('tor6', 'Chris Tanev', 'D', 34, 4500000, 6, 1, 'UFA', 'TOR', 'NTC'),
      createPlayer('tor7', 'Joseph Woll', 'G', 25, 766667, 3, 3, 'RFA', 'TOR'),
    ],
    nonRoster: []
  },
  {
    id: 'uta', name: 'Utah Hockey Club', city: 'Salt Lake City', logoCode: 'UTA',
    capSpace: 9000000, projectedCapSpace: 10000000, ltirUsed: 0,
    roster: [
      createPlayer('uta1', 'Clayton Keller', 'RW', 25, 7150000, 8, 5, 'UFA', 'UTA', 'NTC'),
      createPlayer('uta2', 'Mikhail Sergachev', 'D', 25, 8500000, 8, 1, 'UFA', 'UTA', 'NMC'),
      createPlayer('uta3', 'Nick Schmaltz', 'C', 28, 5850000, 7, 6, 'UFA', 'UTA', 'M-NTC'),
      createPlayer('uta4', 'Lawson Crouse', 'LW', 26, 4300000, 5, 3, 'UFA', 'UTA', 'M-NTC'),
      createPlayer('uta5', 'Logan Cooley', 'C', 20, 950000, 3, 2, 'RFA', 'UTA'),
      createPlayer('uta6', 'Sean Durzi', 'D', 25, 6000000, 4, 1, 'UFA', 'UTA'),
    ],
    nonRoster: []
  },
  {
    id: 'van', name: 'Vancouver Canucks', city: 'Vancouver', logoCode: 'VAN',
    capSpace: 190000, projectedCapSpace: 190000, ltirUsed: 0,
    roster: [
      createPlayer('van1', 'Elias Pettersson', 'C', 25, 11600000, 8, 1, 'UFA', 'VAN', 'NMC'),
      createPlayer('van2', 'J.T. Miller', 'C', 31, 8000000, 7, 2, 'UFA', 'VAN', 'NMC'),
      createPlayer('van3', 'Quinn Hughes', 'D', 24, 7850000, 6, 4, 'UFA', 'VAN'),
      createPlayer('van4', 'Filip Hronek', 'D', 26, 7250000, 8, 1, 'UFA', 'VAN'),
      createPlayer('van5', 'Thatcher Demko', 'G', 28, 5000000, 5, 4, 'UFA', 'VAN'),
      createPlayer('van6', 'Brock Boeser', 'RW', 27, 6650000, 3, 3, 'UFA', 'VAN', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'vgk', name: 'Vegas Golden Knights', city: 'Las Vegas', logoCode: 'VGK',
    capSpace: 1500000, projectedCapSpace: 1500000, ltirUsed: 0,
    roster: [
      createPlayer('vgk1', 'Jack Eichel', 'C', 27, 10000000, 8, 7, 'UFA', 'VGK', 'NMC'),
      createPlayer('vgk2', 'Mark Stone', 'RW', 32, 9500000, 8, 6, 'UFA', 'VGK', 'NMC'),
      createPlayer('vgk3', 'Tomas Hertl', 'C', 30, 8137500, 8, 3, 'UFA', 'VGK', 'NMC'),
      createPlayer('vgk4', 'Alex Pietrangelo', 'D', 34, 8800000, 7, 5, 'UFA', 'VGK', 'NMC'),
      createPlayer('vgk5', 'Noah Hanifin', 'D', 27, 7350000, 8, 1, 'UFA', 'VGK', 'NMC'),
      createPlayer('vgk6', 'Shea Theodore', 'D', 28, 5200000, 7, 7, 'UFA', 'VGK', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'wsh', name: 'Washington Capitals', city: 'Washington', logoCode: 'WSH',
    capSpace: 725000, projectedCapSpace: 725000, ltirUsed: 9200000,
    roster: [
      createPlayer('wsh1', 'Alex Ovechkin', 'LW', 38, 9500000, 5, 4, 'UFA', 'WSH', 'M-NTC'),
      createPlayer('wsh2', 'Tom Wilson', 'RW', 30, 6500000, 7, 1, 'UFA', 'WSH', 'NTC'),
      createPlayer('wsh3', 'John Carlson', 'D', 34, 8000000, 8, 5, 'UFA', 'WSH', 'NTC'),
      createPlayer('wsh4', 'Dylan Strome', 'C', 27, 5000000, 5, 2, 'UFA', 'WSH'),
      createPlayer('wsh5', 'Pierre-Luc Dubois', 'C', 25, 8500000, 8, 2, 'UFA', 'WSH', 'NMC'),
      createPlayer('wsh6', 'Jakob Chychrun', 'D', 26, 4600000, 6, 6, 'UFA', 'WSH', 'M-NTC'),
    ],
    nonRoster: []
  },
  {
    id: 'wpg', name: 'Winnipeg Jets', city: 'Winnipeg', logoCode: 'WPG',
    capSpace: 2500000, projectedCapSpace: 2500000, ltirUsed: 0,
    roster: [
      createPlayer('wpg1', 'Connor Hellebuyck', 'G', 31, 8500000, 7, 1, 'UFA', 'WPG', 'NMC'),
      createPlayer('wpg2', 'Mark Scheifele', 'C', 31, 8500000, 7, 1, 'UFA', 'WPG', 'NMC'),
      createPlayer('wpg3', 'Kyle Connor', 'LW', 27, 7142857, 7, 6, 'UFA', 'WPG', 'M-NTC'),
      createPlayer('wpg4', 'Josh Morrissey', 'D', 29, 6250000, 8, 5, 'UFA', 'WPG', 'M-NTC'),
      createPlayer('wpg5', 'Nikolaj Ehlers', 'RW', 28, 6000000, 7, 7, 'UFA', 'WPG', 'M-NTC'),
      createPlayer('wpg6', 'Gabriel Vilardi', 'RW', 24, 3437500, 2, 2, 'RFA', 'WPG'),
    ],
    nonRoster: []
  }
];

export const findLocalPlayer = (query: string): Player | null => {
  const lowerQuery = query.toLowerCase();
  for (const team of NHL_TEAMS) {
    const player = team.roster.find(p => p.name.toLowerCase().includes(lowerQuery));
    if (player) return player;
  }
  return null;
};
