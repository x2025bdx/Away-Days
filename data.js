const AWAY_DAYS = [
  {
    id: "toronto-montreal",
    league: "MLS",
    team: "Toronto FC",
    opponent: "CF Montréal",
    city: "Montréal",
    date: "Sat, Nov 28",
    time: "7:30 PM",
    stadium: "Stade Saputo",
    from: "$284",
    mode: "bus",
    distance: "541 km",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85",
    supporters: 18
  },
  { id:"boston-buffalo-nhl", league:"NHL", team:"Boston Bruins", opponent:"Buffalo Sabres", city:"Buffalo", date:"Sat, Nov 28", time:"7:00 PM", stadium:"KeyBank Center", from:"$176", mode:"bus", distance:"692 km", image:"https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=900&q=85", supporters:16 },
  { id:"toronto-ottawa-nhl", league:"NHL", team:"Toronto Maple Leafs", opponent:"Ottawa Senators", city:"Ottawa", date:"Tue, Dec 1", time:"7:30 PM", stadium:"Canadian Tire Centre", from:"$142", mode:"drive", distance:"450 km", image:"https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85", supporters:24 },
  { id:"boston-newyork-nba", league:"NBA", team:"Boston Celtics", opponent:"New York Knicks", city:"New York", date:"Fri, Dec 4", time:"7:30 PM", stadium:"Madison Square Garden", from:"$294", mode:"train", distance:"350 km", image:"https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=900&q=85", supporters:31 },
  { id:"chicago-milwaukee-nba", league:"NBA", team:"Chicago Bulls", opponent:"Milwaukee Bucks", city:"Milwaukee", date:"Sun, Dec 6", time:"6:00 PM", stadium:"Fiserv Forum", from:"$168", mode:"drive", distance:"130 km", image:"https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85", supporters:19 },
  { id:"buffalo-cleveland-nfl", league:"NFL", team:"Buffalo Bills", opponent:"Cleveland Browns", city:"Cleveland", date:"Sun, Dec 6", time:"1:00 PM", stadium:"Huntington Bank Field", from:"$312", mode:"drive", distance:"474 km", image:"https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=900&q=85", supporters:12 },
  { id:"greenbay-detroit-nfl", league:"NFL", team:"Green Bay Packers", opponent:"Detroit Lions", city:"Detroit", date:"Thu, Dec 10", time:"8:15 PM", stadium:"Ford Field", from:"$238", mode:"bus", distance:"475 km", image:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85", supporters:27 },
  { id:"boston-philadelphia-mlb", league:"MLB", team:"Boston Red Sox", opponent:"Philadelphia Phillies", city:"Philadelphia", date:"Tue, Apr 14", time:"7:05 PM", stadium:"Citizens Bank Park", from:"$198", mode:"train", distance:"435 km", image:"https://images.unsplash.com/photo-1508344928928-7165b4e2a0cf?auto=format&fit=crop&w=900&q=85", supporters:22 },
  { id:"toronto-baltimore-mlb", league:"MLB", team:"Toronto Blue Jays", opponent:"Baltimore Orioles", city:"Baltimore", date:"Sat, Apr 18", time:"4:05 PM", stadium:"Oriole Park", from:"$264", mode:"train", distance:"765 km", image:"https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=900&q=85", supporters:36 },
  { id:"notredame-clemson-cfb", league:"CFB", team:"Notre Dame", opponent:"Clemson Tigers", city:"Clemson", date:"Sat, Sep 19", time:"3:30 PM", stadium:"Memorial Stadium", from:"$386", mode:"drive", distance:"1,020 km", image:"https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=900&q=85", supporters:44 },
  { id:"michigan-wisconsin-cfb", league:"CFB", team:"Michigan Wolverines", opponent:"Wisconsin Badgers", city:"Madison", date:"Sat, Oct 3", time:"12:00 PM", stadium:"Camp Randall Stadium", from:"$312", mode:"bus", distance:"520 km", image:"https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=900&q=85", supporters:29 },
  { id:"kansas-kentucky-cbb", league:"CBB", team:"Kansas Jayhawks", opponent:"Kentucky Wildcats", city:"Lexington", date:"Sat, Jan 24", time:"6:00 PM", stadium:"Rupp Arena", from:"$204", mode:"drive", distance:"1,080 km", image:"https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=85", supporters:18 },
  { id:"duke-arizona-cbb", league:"CBB", team:"Duke Blue Devils", opponent:"Arizona Wildcats", city:"Tucson", date:"Wed, Feb 3", time:"9:00 PM", stadium:"McKale Center", from:"$448", mode:"drive", distance:"3,390 km", image:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=85", supporters:33 },
  { id:"toronto-boston-nhl", league:"NHL", team:"Toronto Maple Leafs", opponent:"Boston Bruins", city:"Boston", date:"Sat, Nov 28", time:"7:00 PM", stadium:"TD Garden", from:"$226", mode:"bus", distance:"840 km", image:"https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85", supporters:28 },
  { id:"toronto-rangers-nhl", league:"NHL", team:"Toronto Maple Leafs", opponent:"New York Rangers", city:"New York", date:"Fri, Dec 4", time:"7:30 PM", stadium:"Madison Square Garden", from:"$318", mode:"train", distance:"850 km", image:"https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85", supporters:35 },
  { id:"toronto-raptors-orlando-nba", league:"NBA", team:"Toronto Raptors", opponent:"Orlando Magic", city:"Orlando", date:"Mon, Dec 7", time:"7:00 PM", stadium:"Kia Center", from:"$512", mode:"drive", distance:"2,060 km", image:"https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=900&q=85", supporters:21 },
  { id:"miami-toronto-nba", league:"NBA", team:"Miami Heat", opponent:"Toronto Raptors", city:"Toronto", date:"Wed, Dec 9", time:"7:30 PM", stadium:"Scotiabank Arena", from:"$268", mode:"train", distance:"2,200 km", image:"https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85", supporters:17 },
  { id:"minnesota-packers-nfl", league:"NFL", team:"Minnesota Vikings", opponent:"Green Bay Packers", city:"Green Bay", date:"Sun, Dec 13", time:"1:00 PM", stadium:"Lambeau Field", from:"$218", mode:"drive", distance:"720 km", image:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85", supporters:26 },
  { id:"chicago-bears-nfl", league:"NFL", team:"Chicago Bears", opponent:"Detroit Lions", city:"Detroit", date:"Sun, Dec 20", time:"1:00 PM", stadium:"Ford Field", from:"$192", mode:"drive", distance:"450 km", image:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85", supporters:19 },
  { id:"seattle-toronto-mlb", league:"MLB", team:"Seattle Mariners", opponent:"Toronto Blue Jays", city:"Toronto", date:"Fri, Jun 12", time:"7:07 PM", stadium:"Rogers Centre", from:"$344", mode:"train", distance:"3,360 km", image:"https://images.unsplash.com/photo-1508344928928-7165b4e2a0cf?auto=format&fit=crop&w=900&q=85", supporters:14 },
  { id:"ohio-michigan-cfb", league:"CFB", team:"Ohio State Buckeyes", opponent:"Michigan Wolverines", city:"Ann Arbor", date:"Sat, Nov 28", time:"12:00 PM", stadium:"Michigan Stadium", from:"$276", mode:"bus", distance:"320 km", image:"https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=900&q=85", supporters:52 },
  { id:"unc-virginia-cbb", league:"CBB", team:"North Carolina Tar Heels", opponent:"Virginia Cavaliers", city:"Charlottesville", date:"Sat, Jan 30", time:"4:00 PM", stadium:"John Paul Jones Arena", from:"$186", mode:"drive", distance:"580 km", image:"https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=85", supporters:25 },
  {
    id: "vancouver-seattle",
    team: "Vancouver Whitecaps",
    opponent: "Seattle Sounders",
    city: "Seattle",
    date: "Fri, Dec 11",
    time: "7:00 PM",
    stadium: "Lumen Field",
    from: "$226",
    mode: "bus",
    distance: "230 km",
    image: "https://images.unsplash.com/photo-1506812574058-fc75fa93fead?auto=format&fit=crop&w=900&q=85",
    supporters: 21
  },
  {
    id: "chicago-kansas",
    team: "Chicago Fire",
    opponent: "Sporting Kansas City",
    city: "Kansas City",
    date: "Sat, Dec 12",
    time: "6:30 PM",
    stadium: "Children's Mercy Park",
    from: "$356",
    mode: "drive",
    distance: "684 km",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=85",
    supporters: 7
  },
  {
    id: "nyc-atlanta",
    team: "New York City FC",
    opponent: "Atlanta United",
    city: "Atlanta",
    date: "Sun, Dec 13",
    time: "5:00 PM",
    stadium: "Mercedes-Benz Stadium",
    from: "$421",
    mode: "train",
    distance: "1,225 km",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=85",
    supporters: 14
  }
];

const SCHEDULE_IMAGES = {
  NHL: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85",
  NBA: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=900&q=85",
  NFL: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85",
  MLB: "https://images.unsplash.com/photo-1508344928928-7165b4e2a0cf?auto=format&fit=crop&w=900&q=85",
  CFB: "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=900&q=85",
  CBB: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=85"
};

function addLeagueSchedule(league, teams, startMonth, startDay, mode) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  teams.forEach(function (team, teamIndex) {
    for (let gameIndex = 0; gameIndex < 3; gameIndex += 1) {
      const opponentIndex = (teamIndex + gameIndex + 1) % teams.length;
      const opponent = teams[opponentIndex];
      const monthIndex = (startMonth + (teamIndex + gameIndex) % 4) % 12;
      const day = ((startDay + teamIndex * 2 + gameIndex * 4) % 27) + 1;
      AWAY_DAYS.push({
        id: league.toLowerCase() + "-" + team.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + gameIndex,
        league: league,
        team: team.name,
        opponent: opponent.name,
        city: opponent.city,
        date: monthNames[monthIndex] + " " + day,
        time: gameIndex === 0 ? "7:00 PM" : gameIndex === 1 ? "1:00 PM" : "8:30 PM",
        stadium: opponent.stadium,
        from: "$" + (180 + ((teamIndex * 37 + gameIndex * 53) % 260)),
        mode: mode[teamIndex % mode.length],
        distance: (240 + ((teamIndex * 83 + gameIndex * 149) % 3200)) + " km",
        image: SCHEDULE_IMAGES[league],
        supporters: 8 + ((teamIndex * 5 + gameIndex * 7) % 48)
      });
    }
  });
}

const FAN_GROUPS = [
  { id: "g1", city: "Montréal", match: "Toronto FC away supporters", seats: "2 seats open", leaving: "Leaves Toronto · 9 AM", members: ["AR", "MK", "JL"], tone: "red" },
  { id: "g2", city: "Cleveland", match: "Bills backers road trip", seats: "4 seats open", leaving: "Leaves Buffalo · 10 AM", members: ["DS", "NP", "RW"], tone: "blue" },
  { id: "g3", city: "Seattle", match: "Whitecaps supporters bus", seats: "6 seats open", leaving: "Leaves Vancouver · 1 PM", members: ["CM", "KT", "LO"], tone: "green" }
];

const CITY_GUIDES = [
  {
    city: "Montréal", country: "Québec",
    image: "https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&w=900&q=85",
    title: "Old Montréal & Mile End", label: "FOOD + CULTURE",
    activities: [
      ["Explore Old Montréal", "Walk cobblestone streets and visit Notre-Dame Basilica."],
      ["Eat your way through Mile End", "Try a Montreal bagel and a classic smoked-meat sandwich."],
      ["Ride up Mount Royal", "Catch sunset views across the city before matchday."]
    ]
  },
  {
    city: "Philadelphia", country: "Pennsylvania",
    image: "https://images.unsplash.com/photo-1569766716339-0504b8dca1e5?auto=format&fit=crop&w=900&q=85",
    title: "Stadium district to downtown", label: "HISTORY + FOOD",
    activities: [
      ["Visit Independence Hall", "See the birthplace of American independence."],
      ["Try a Philly cheesesteak", "Pick a local spot before heading to the stadium."],
      ["Walk the Museum District", "Explore the Rocky steps and Benjamin Franklin Parkway."]
    ]
  },
  {
    city: "Seattle", country: "Washington",
    image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?auto=format&fit=crop&w=900&q=85",
    title: "Pike Place before kickoff", label: "CITY GUIDE",
    activities: [
      ["Visit Pike Place Market", "Browse local food stalls and watch the fish throw."],
      ["Walk the Waterfront", "Explore piers, ferry views and Olympic Sculpture Park."],
      ["See the skyline from Kerry Park", "A short drive or bus ride brings you to the classic view."]
    ]
  }
];

const NHL_TEAMS = [
["Anaheim Ducks","Anaheim","Honda Center"],["Boston Bruins","Boston","TD Garden"],["Buffalo Sabres","Buffalo","KeyBank Center"],["Calgary Flames","Calgary","Scotiabank Saddledome"],["Carolina Hurricanes","Raleigh","Lenovo Center"],["Chicago Blackhawks","Chicago","United Center"],["Colorado Avalanche","Denver","Ball Arena"],["Columbus Blue Jackets","Columbus","Nationwide Arena"],["Dallas Stars","Dallas","American Airlines Center"],["Detroit Red Wings","Detroit","Little Caesars Arena"],["Edmonton Oilers","Edmonton","Rogers Place"],["Florida Panthers","Sunrise","Amerant Bank Arena"],["Los Angeles Kings","Los Angeles","Crypto.com Arena"],["Minnesota Wild","Saint Paul","Grand Casino Arena"],["Montréal Canadiens","Montréal","Bell Centre"],["Nashville Predators","Nashville","Bridgestone Arena"],["New Jersey Devils","Newark","Prudential Center"],["New York Islanders","Elmont","UBS Arena"],["New York Rangers","New York","Madison Square Garden"],["Ottawa Senators","Ottawa","Canadian Tire Centre"],["Philadelphia Flyers","Philadelphia","Xfinity Mobile Arena"],["Pittsburgh Penguins","Pittsburgh","PPG Paints Arena"],["San Jose Sharks","San Jose","SAP Center"],["Seattle Kraken","Seattle","Climate Pledge Arena"],["St. Louis Blues","St. Louis","Enterprise Center"],["Tampa Bay Lightning","Tampa","Amalie Arena"],["Toronto Maple Leafs","Toronto","Scotiabank Arena"],["Utah Mammoth","Salt Lake City","Delta Center"],["Vancouver Canucks","Vancouver","Rogers Arena"],["Vegas Golden Knights","Las Vegas","T-Mobile Arena"],["Washington Capitals","Washington","Capital One Arena"],["Winnipeg Jets","Winnipeg","Canada Life Centre"]
].map(function (team) { return { name: team[0], city: team[1], stadium: team[2] }; });

const NBA_TEAMS = [
["Atlanta Hawks","Atlanta","State Farm Arena"],["Boston Celtics","Boston","TD Garden"],["Brooklyn Nets","Brooklyn","Barclays Center"],["Charlotte Hornets","Charlotte","Spectrum Center"],["Chicago Bulls","Chicago","United Center"],["Cleveland Cavaliers","Cleveland","Rocket Arena"],["Dallas Mavericks","Dallas","American Airlines Center"],["Denver Nuggets","Denver","Ball Arena"],["Detroit Pistons","Detroit","Little Caesars Arena"],["Golden State Warriors","San Francisco","Chase Center"],["Houston Rockets","Houston","Toyota Center"],["Indiana Pacers","Indianapolis","Gainbridge Fieldhouse"],["Los Angeles Clippers","Inglewood","Intuit Dome"],["Los Angeles Lakers","Los Angeles","Crypto.com Arena"],["Memphis Grizzlies","Memphis","FedExForum"],["Miami Heat","Miami","Kaseya Center"],["Milwaukee Bucks","Milwaukee","Fiserv Forum"],["Minnesota Timberwolves","Minneapolis","Target Center"],["New Orleans Pelicans","New Orleans","Smoothie King Center"],["New York Knicks","New York","Madison Square Garden"],["Oklahoma City Thunder","Oklahoma City","Paycom Center"],["Orlando Magic","Orlando","Kia Center"],["Philadelphia 76ers","Philadelphia","Xfinity Mobile Arena"],["Phoenix Suns","Phoenix","Mortgage Matchup Center"],["Portland Trail Blazers","Portland","Moda Center"],["Sacramento Kings","Sacramento","Golden 1 Center"],["San Antonio Spurs","San Antonio","Frost Bank Center"],["Toronto Raptors","Toronto","Scotiabank Arena"],["Utah Jazz","Salt Lake City","Delta Center"],["Washington Wizards","Washington","Capital One Arena"]
].map(function (team) { return { name: team[0], city: team[1], stadium: team[2] }; });

const NFL_TEAMS = [
["Arizona Cardinals","Phoenix","State Farm Stadium"],["Atlanta Falcons","Atlanta","Mercedes-Benz Stadium"],["Baltimore Ravens","Baltimore","M&T Bank Stadium"],["Buffalo Bills","Buffalo","Highmark Stadium"],["Carolina Panthers","Charlotte","Bank of America Stadium"],["Chicago Bears","Chicago","Soldier Field"],["Cincinnati Bengals","Cincinnati","Paycor Stadium"],["Cleveland Browns","Cleveland","Huntington Bank Field"],["Dallas Cowboys","Arlington","AT&T Stadium"],["Denver Broncos","Denver","Empower Field"],["Detroit Lions","Detroit","Ford Field"],["Green Bay Packers","Green Bay","Lambeau Field"],["Houston Texans","Houston","NRG Stadium"],["Indianapolis Colts","Indianapolis","Lucas Oil Stadium"],["Jacksonville Jaguars","Jacksonville","EverBank Stadium"],["Kansas City Chiefs","Kansas City","GEHA Field"],["Las Vegas Raiders","Las Vegas","Allegiant Stadium"],["Los Angeles Chargers","Inglewood","SoFi Stadium"],["Los Angeles Rams","Los Angeles","SoFi Stadium"],["Miami Dolphins","Miami Gardens","Hard Rock Stadium"],["Minnesota Vikings","Minneapolis","U.S. Bank Stadium"],["New England Patriots","Foxborough","Gillette Stadium"],["New Orleans Saints","New Orleans","Caesars Superdome"],["New York Giants","East Rutherford","MetLife Stadium"],["New York Jets","East Rutherford","MetLife Stadium"],["Philadelphia Eagles","Philadelphia","Lincoln Financial Field"],["Pittsburgh Steelers","Pittsburgh","Acrisure Stadium"],["San Francisco 49ers","Santa Clara","Levi's Stadium"],["Seattle Seahawks","Seattle","Lumen Field"],["Tampa Bay Buccaneers","Tampa","Raymond James Stadium"],["Tennessee Titans","Nashville","Nissan Stadium"],["Washington Commanders","Washington","Northwest Stadium"]
].map(function (team) { return { name: team[0], city: team[1], stadium: team[2] }; });

const MLB_TEAMS = [
["Arizona Diamondbacks","Phoenix","Chase Field"],["Atlanta Braves","Atlanta","Truist Park"],["Baltimore Orioles","Baltimore","Oriole Park"],["Boston Red Sox","Boston","Fenway Park"],["Chicago Cubs","Chicago","Wrigley Field"],["Chicago White Sox","Chicago","Rate Field"],["Cincinnati Reds","Cincinnati","Great American Ball Park"],["Cleveland Guardians","Cleveland","Progressive Field"],["Colorado Rockies","Denver","Coors Field"],["Detroit Tigers","Detroit","Comerica Park"],["Houston Astros","Houston","Daikin Park"],["Kansas City Royals","Kansas City","Kauffman Stadium"],["Los Angeles Angels","Anaheim","Angel Stadium"],["Los Angeles Dodgers","Los Angeles","Dodger Stadium"],["Miami Marlins","Miami","LoanDepot Park"],["Milwaukee Brewers","Milwaukee","American Family Field"],["Minnesota Twins","Minneapolis","Target Field"],["New York Mets","Queens","Citi Field"],["New York Yankees","Bronx","Yankee Stadium"],["Oakland Athletics","West Sacramento","Sutter Health Park"],["Philadelphia Phillies","Philadelphia","Citizens Bank Park"],["Pittsburgh Pirates","Pittsburgh","PNC Park"],["San Diego Padres","San Diego","Petco Park"],["San Francisco Giants","San Francisco","Oracle Park"],["Seattle Mariners","Seattle","T-Mobile Park"],["St. Louis Cardinals","St. Louis","Busch Stadium"],["Tampa Bay Rays","Tampa","George M. Steinbrenner Field"],["Texas Rangers","Arlington","Globe Life Field"],["Toronto Blue Jays","Toronto","Rogers Centre"],["Washington Nationals","Washington","Nationals Park"]
].map(function (team) { return { name: team[0], city: team[1], stadium: team[2] }; });

const CFB_TEAMS = [
["Alabama Crimson Tide","Tuscaloosa","Saban Field"],["Arizona Wildcats","Tucson","Arizona Stadium"],["Arizona State Sun Devils","Tempe","Mountain America Stadium"],["Arkansas Razorbacks","Fayetteville","Donald W. Reynolds Stadium"],["Auburn Tigers","Auburn","Jordan-Hare Stadium"],["Baylor Bears","Waco","McLane Stadium"],["Boston College Eagles","Chestnut Hill","Alumni Stadium"],["California Golden Bears","Berkeley","California Memorial Stadium"],["Clemson Tigers","Clemson","Memorial Stadium"],["Colorado Buffaloes","Boulder","Folsom Field"],["Florida Gators","Gainesville","Ben Hill Griffin Stadium"],["Florida State Seminoles","Tallahassee","Doak Campbell Stadium"],["Georgia Bulldogs","Athens","Sanford Stadium"],["Georgia Tech Yellow Jackets","Atlanta","Bobby Dodd Stadium"],["Illinois Fighting Illini","Champaign","Memorial Stadium"],["Indiana Hoosiers","Bloomington","Memorial Stadium"],["Iowa Hawkeyes","Iowa City","Kinnick Stadium"],["Iowa State Cyclones","Ames","Jack Trice Stadium"],["Kansas Jayhawks","Lawrence","David Booth Kansas Memorial Stadium"],["Kansas State Wildcats","Manhattan","Bill Snyder Family Stadium"],["Kentucky Wildcats","Lexington","Kroger Field"],["LSU Tigers","Baton Rouge","Tiger Stadium"],["Miami Hurricanes","Miami Gardens","Hard Rock Stadium"],["Michigan Wolverines","Ann Arbor","Michigan Stadium"],["Michigan State Spartans","East Lansing","Spartan Stadium"],["Minnesota Golden Gophers","Minneapolis","Huntington Bank Stadium"],["Mississippi State Bulldogs","Starkville","Davis Wade Stadium"],["Missouri Tigers","Columbia","Faurot Field"],["Nebraska Cornhuskers","Lincoln","Memorial Stadium"],["North Carolina Tar Heels","Chapel Hill","Kenan Stadium"],["NC State Wolfpack","Raleigh","Carter-Finley Stadium"],["Notre Dame Fighting Irish","Notre Dame","Notre Dame Stadium"],["Ohio State Buckeyes","Columbus","Ohio Stadium"],["Oklahoma Sooners","Norman","Gaylord Family Stadium"],["Oklahoma State Cowboys","Stillwater","Boone Pickens Stadium"],["Ole Miss Rebels","Oxford","Vaught-Hemingway Stadium"],["Oregon Ducks","Eugene","Autzen Stadium"],["Oregon State Beavers","Corvallis","Reser Stadium"],["Penn State Nittany Lions","State College","Beaver Stadium"],["Pittsburgh Panthers","Pittsburgh","Acrisure Stadium"],["Purdue Boilermakers","West Lafayette","Ross-Ade Stadium"],["Rutgers Scarlet Knights","Piscataway","SHI Stadium"],["South Carolina Gamecocks","Columbia","Williams-Brice Stadium"],["Stanford Cardinal","Stanford","Stanford Stadium"],["Tennessee Volunteers","Knoxville","Neyland Stadium"],["Texas Longhorns","Austin","Darrell K Royal Stadium"],["Texas A&M Aggies","College Station","Kyle Field"],["Texas Tech Red Raiders","Lubbock","Jones AT&T Stadium"],["UCLA Bruins","Los Angeles","Rose Bowl"],["USC Trojans","Los Angeles","Los Angeles Memorial Coliseum"],["Utah Utes","Salt Lake City","Rice-Eccles Stadium"],["Virginia Cavaliers","Charlottesville","Scott Stadium"],["Virginia Tech Hokies","Blacksburg","Lane Stadium"],["Washington Huskies","Seattle","Husky Stadium"],["Wisconsin Badgers","Madison","Camp Randall Stadium"]
].map(function (team) { return { name: team[0], city: team[1], stadium: team[2] }; });

const CBB_TEAMS = [
["Arizona Wildcats","Tucson","McKale Center"],["Baylor Bears","Waco","Foster Pavilion"],["BYU Cougars","Provo","Marriott Center"],["Cincinnati Bearcats","Cincinnati","Fifth Third Arena"],["Colorado Buffaloes","Boulder","CU Events Center"],["Creighton Bluejays","Omaha","CHI Health Center"],["Duke Blue Devils","Durham","Cameron Indoor Stadium"],["Florida Gators","Gainesville","O'Dome"],["Gonzaga Bulldogs","Spokane","McCarthey Athletic Center"],["Houston Cougars","Houston","Fertitta Center"],["Illinois Fighting Illini","Champaign","State Farm Center"],["Indiana Hoosiers","Bloomington","Simon Skjodt Assembly Hall"],["Iowa State Cyclones","Ames","Hilton Coliseum"],["Kansas Jayhawks","Lawrence","Allen Fieldhouse"],["Kansas State Wildcats","Manhattan","Bramlage Coliseum"],["Kentucky Wildcats","Lexington","Rupp Arena"],["Louisville Cardinals","Louisville","KFC Yum! Center"],["Marquette Golden Eagles","Milwaukee","Fiserv Forum"],["Maryland Terrapins","College Park","Xfinity Center"],["Michigan Wolverines","Ann Arbor","Crisler Center"],["Michigan State Spartans","East Lansing","Breslin Center"],["North Carolina Tar Heels","Chapel Hill","Dean E. Smith Center"],["Ohio State Buckeyes","Columbus","Value City Arena"],["Purdue Boilermakers","West Lafayette","Mackey Arena"],["Saint John's Red Storm","Queens","Carnesecca Arena"],["Tennessee Volunteers","Knoxville","Thompson-Boling Arena"],["Texas Longhorns","Austin","Moody Center"],["Texas Tech Red Raiders","Lubbock","United Supermarkets Arena"],["UConn Huskies","Storrs","Gampel Pavilion"],["UCLA Bruins","Los Angeles","Pauley Pavilion"],["USC Trojans","Los Angeles","Galen Center"],["Villanova Wildcats","Villanova","Finneran Pavilion"],["Virginia Cavaliers","Charlottesville","John Paul Jones Arena"],["Wisconsin Badgers","Madison","Kohl Center"],["Xavier Musketeers","Cincinnati","Cintas Center"]
].map(function (team) { return { name: team[0], city: team[1], stadium: team[2] }; });

addLeagueSchedule("NHL", NHL_TEAMS, 10, 2, ["train", "bus", "drive"]);
addLeagueSchedule("NBA", NBA_TEAMS, 10, 4, ["flight", "train", "bus", "drive"]);
addLeagueSchedule("NFL", NFL_TEAMS, 8, 3, ["bus", "drive", "train"]);
addLeagueSchedule("MLB", MLB_TEAMS, 3, 5, ["train", "bus", "flight", "drive"]);
addLeagueSchedule("CFB", CFB_TEAMS, 7, 2, ["bus", "drive", "train"]);
addLeagueSchedule("CBB", CBB_TEAMS, 10, 6, ["bus", "drive", "train", "flight"]);
