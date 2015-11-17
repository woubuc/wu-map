var deeds;

deeds = [
  {
    name: 'New Town',
    tag: 'new-town',
    mayor: 'Dominikk',
    type: 'large',
    x: 906,
    y: 760,
    features: ['trader', 'market', 'harbour', 'resources', 'recruiting']
  }, {
    name: 'Little Patch of Heaven',
    tag: 'little-patch-of-heaven',
    mayor: 'Jaede',
    type: 'solo',
    x: 1115,
    y: 770
  }, {
    name: 'Port Hope',
    tag: 'port-hope',
    type: 'solo',
    mayor: 'Squint',
    x: 807,
    y: 706
  }, {
    name: 'Alexondrea',
    tag: 'alexondrea',
    type: 'large',
    mayor: 'Traveler',
    x: 1076,
    y: 786,
    features: ['resources', 'recruiting']
  }, {
    name: 'Longview',
    tag: 'longview',
    x: 556,
    y: 1318
  }, {
    name: 'Tholen Farmstead',
    tag: 'tholen-farmstead',
    mayor: 'Cunemous',
    x: 1025,
    y: 770,
    features: ['resources', 'recruiting']
  }, {
    name: 'Zigsburg',
    tag: 'zigsburg',
    x: 1550,
    y: 336
  }, {
    name: 'Demacia',
    tag: 'demecia',
    x: 828,
    y: 1664
  }, {
    name: 'Cedar Grove',
    tag: 'cedar-grove',
    x: 1586,
    y: 1027
  }, {
    name: 'Castrum Felis',
    tag: 'castrum-felis',
    type: 'solo',
    mayor: 'Meow',
    x: 738,
    y: 1200,
    features: ['recruiting']
  }, {
    name: 'The Oakshire Grove',
    tag: 'oakshire-grove',
    type: 'solo',
    mayor: 'DruidNature',
    x: 1872,
    y: 3712,
    features: ['recruiting']
  }, {
    name: 'Symphonies End',
    tag: 'symphonies-end',
    type: 'small',
    mayor: 'Melketh',
    x: 1046,
    y: 790,
    features: ['recruiting']
  }, {
    name: 'Chris\' Home',
    tag: 'chris-home',
    type: 'solo',
    mayor: 'Chris',
    x: 730,
    y: 2348
  }, {
    name: 'Goatsmugglers Place',
    tag: 'goatsmugglers-place',
    type: 'solo',
    mayor: 'Goatsmuggler',
    x: 822,
    y: 1226,
    features: ['harbour']
  }, {
    name: 'Highwater',
    tag: 'highwater',
    type: 'small',
    mayor: 'Kezei',
    x: 2650,
    y: 3495,
    features: ['harbour', 'resources', 'recruiting']
  }, {
    name: 'Deathlands',
    tag: 'deathlands',
    type: 'solo',
    mayor: 'Death',
    x: 1059,
    y: 704
  }, {
    name: 'Castleton',
    tag: 'castleton',
    mayor: 'Rikko',
    x: 1220,
    y: 1006
  }, {
    name: 'Izmir',
    tag: 'izmir',
    type: 'small',
    mayor: 'jackoritos',
    x: 526,
    y: 1378,
    features: ['harbour', 'recruiting']
  }, {
    name: 'Phules Paradise',
    tag: 'phules-paradise',
    type: 'solo',
    mayor: 'Andistyr',
    x: 1448,
    y: 350,
    features: ['resources']
  }, {
    name: 'Hokrasut',
    tag: 'hokrasut',
    type: 'small',
    mayor: 'Zardoka',
    x: 3155,
    y: 3533,
    features: ['harbour', 'resources']
  }, {
    name: 'Lake View',
    tag: 'lake-view',
    type: 'solo',
    mayor: 'Lisa',
    x: 3177,
    y: 1872,
    features: ['harbour', 'resources']
  }, {
    name: 'Lake Side',
    tag: 'lake-side',
    type: 'solo',
    mayor: 'Damine',
    x: 868,
    y: 772,
    features: ['harbour']
  }, {
    name: 'New Town Docks',
    tag: 'new-town-docks',
    mayor: 'Engineer',
    x: 940,
    y: 838
  }, {
    name: 'Dunkelwald',
    tag: 'dunkelwald',
    type: 'small',
    mayor: 'Biervampyr',
    x: 2976,
    y: 480,
    features: ['recruiting']
  }, {
    name: 'Castle Glittertown',
    tag: 'castle-glittertown',
    mayor: 'Capi',
    x: 345,
    y: 310
  }, {
    name: 'Coastal Watch',
    tag: 'coastal-watch',
    type: 'solo',
    mayor: 'Exor',
    x: 414,
    y: 430
  }, {
    name: 'Fonswood',
    tag: 'fonswood',
    type: 'small',
    mayor: 'Tunk',
    x: 862,
    y: 801,
    features: ['recruiting']
  }, {
    name: 'Dragon\'s Breath Castle',
    tag: 'dragons-breath-castle',
    type: 'solo',
    mayor: 'Devily',
    x: 3226,
    y: 3260,
    features: ['harbour']
  }, {
    name: 'The Odd Place',
    tag: 'odd-place',
    type: 'solo',
    mayor: 'Kanashio',
    x: 2615,
    y: 345,
    features: ['recruiting']
  }, {
    name: 'Oak Shores',
    tag: 'oak-shores',
    type: 'small',
    mayor: 'Macros',
    x: 1070,
    y: 1164
  }, {
    name: 'ZxSuperGeniusxZ\'s Deed',
    tag: 'zxSuperGeniusxzs-deed',
    type: 'solo',
    mayor: 'ZxSuperGeniusxZ',
    x: 1060,
    y: 892,
    features: ['market', 'harbour']
  }, {
    name: 'Maniac Mansion',
    tag: 'maniac-mansion',
    type: 'small',
    mayor: 'Quixa',
    x: 922,
    y: 660
  }, {
    name: 'Rock Face',
    tag: 'rock-face',
    type: 'solo',
    mayor: 'Zentil',
    x: 935,
    y: 1280
  }, {
    name: 'Silver Lake',
    tag: 'silver-lake',
    type: 'solo',
    mayor: 'Alayena',
    x: 1548,
    y: 2972
  }, {
    name: 'Mikes Point',
    tag: 'mikes-point',
    type: 'solo',
    mayor: 'Mike',
    x: 3602,
    y: 786
  }, {
    name: 'Midway Landing',
    tag: 'midway-landing',
    type: 'small',
    mayor: 'Linx',
    x: 662,
    y: 2170
  }, {
    name: 'Gades',
    tag: 'gades',
    type: 'solo',
    mayor: 'Encode',
    x: 1128,
    y: 1112
  }, {
    name: 'Quip\'s Demise',
    tag: 'quips-demise',
    mayor: 'Quip',
    x: 1100,
    y: 374
  }, {
    name: 'Angus',
    tag: 'angus',
    mayor: 'Grangus',
    type: 'small',
    x: 3260,
    y: 1404
  }, {
    name: 'Bear Mountain',
    tag: 'bear-mountain',
    mayor: 'Inara',
    type: 'solo',
    x: 1312,
    y: 1154,
    features: ['recruiting']
  }, {
    name: 'Lunaman\'s Shack',
    tag: 'lunamans-shack',
    mayor: 'Lunaman',
    type: 'solo',
    x: 875,
    y: 2636
  }, {
    name: 'Bay-town',
    tag: 'bay-town',
    mayor: 'Hampe',
    type: 'solo',
    x: 1196,
    y: 925
  }, {
    name: 'Astur',
    tag: 'astur',
    mayor: 'Charlypodo',
    type: 'solo',
    x: 1088,
    y: 1120,
    features: ['harbour']
  }, {
    name: 'Riverside',
    tag: 'riverside',
    mayor: 'Sklo',
    type: 'large',
    x: 2923,
    y: 3303,
    features: ['harbour']
  }, {
    name: 'Noskull\'s Harbour Grounds',
    tag: 'noskulls-harbour-grounds',
    mayor: 'Noskull',
    type: 'solo',
    x: 622,
    y: 792,
    features: ['harbour']
  }, {
    name: 'Griffin\'s Nest Harbour',
    tag: 'griffins-nest-harbour',
    mayor: 'Phoenix',
    type: 'small',
    x: 3228,
    y: 2798,
    features: ['harbour', 'recruiting']
  }, {
    name: 'Reagville',
    tag: 'reagville',
    mayor: 'Reagor',
    type: 'solo',
    x: 484,
    y: 541
  }, {
    name: 'Santuary',
    tag: 'santuary',
    mayor: 'Toriad',
    type: 'solo',
    x: 2689,
    y: 2974
  }, {
    name: 'Ashenfort',
    tag: 'ashenfort',
    mayor: 'Meado',
    type: 'solo',
    x: 1072,
    y: 1820,
    features: ['recruiting']
  }
];
