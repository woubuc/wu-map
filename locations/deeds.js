var deeds;

deeds = [
  {
    name: 'New Town',
    tag: 'new-town',
    mayor: 'Dominikk',
    type: 'large',
    x: 906,
    y: 760,
    features: ['trader', 'merchant', 'market', 'harbour', 'resources', 'recruiting']
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
    y: 1318,
    mayor: 'Borgal',
    type: 'solo'
  }, {
    name: 'Zigsburg',
    tag: 'zigsburg',
    mayor: 'Zigackly',
    x: 1550,
    y: 336,
    mayor: 'Zigackly',
    type: 'solo'
  }, {
    name: 'Cedar Grove',
    tag: 'cedar-grove',
    mayor: 'Dallanar',
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
    name: 'Awarthriel\'s Grove',
    tag: 'awarthriels-grove',
    type: 'solo',
    mayor: 'DruidNature',
    x: 2458,
    y: 3322
  }, {
    name: 'Symphonies End',
    tag: 'symphonies-end',
    type: 'small',
    mayor: 'Melketh',
    x: 1046,
    y: 790,
    features: ['recruiting', 'mailbox']
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
    type: 'large',
    mayor: 'Kezei',
    x: 2641,
    y: 3500,
    features: ['trader', 'merchant', 'market', 'inn', 'harbour', 'mailbox', 'recruiting']
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
    mayor: 'Andistyr',
    x: 1448,
    y: 350,
    features: ['inn', 'mailbox'],
    type: 'small'
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
    name: 'Coastal Watch',
    tag: 'coastal-watch',
    type: 'solo',
    mayor: 'Exor',
    x: 414,
    y: 430
  }, {
    name: 'Dragon\'s Breath Castle',
    tag: 'dragons-breath-castle',
    type: 'solo',
    mayor: 'Devily',
    x: 3226,
    y: 3260,
    features: ['harbour']
  }, {
    name: 'Oak Shores',
    tag: 'oak-shores',
    type: 'small',
    mayor: 'Macros',
    x: 1070,
    y: 1164
  }, {
    name: 'ZxSuperGeniusxZ\'s Deed',
    tag: 'zxsupergeniusxzs-deed',
    type: 'solo',
    mayor: 'ZxSuperGeniusxZ',
    x: 1060,
    y: 892,
    features: ['market', 'harbour', 'merchant']
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
    y: 2974
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
    y: 1112,
    features: ['harbour', 'mailbox']
  }, {
    name: 'Quip\'s Demise',
    tag: 'quips-demise',
    mayor: 'Quip',
    x: 1100,
    y: 374
  }, {
    name: 'Bear Mountain',
    tag: 'bear-mountain',
    mayor: 'Inara',
    type: 'small',
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
    name: 'Ashenfort',
    tag: 'ashenfort',
    mayor: 'Meado',
    type: 'solo',
    x: 1072,
    y: 1820,
    features: ['recruiting']
  }, {
    name: 'Valhalla',
    tag: 'valhalla',
    mayor: 'Thor',
    type: 'solo',
    x: 711,
    y: 762
  }, {
    name: 'Zhentil keep',
    tag: 'zhentil-keep',
    mayor: 'validate',
    type: 'solo',
    x: 2839,
    y: 508
  }, {
    name: 'The Pitstop',
    tag: 'pitstop',
    mayor: 'Azalia',
    type: 'solo',
    x: 1398,
    y: 885
  }, {
    name: 'Cedarview',
    tag: 'cedarview',
    mayor: 'Squint',
    type: 'solo',
    x: 2077,
    y: 1063,
    features: ['recruiting']
  }, {
    name: 'Bg Town',
    tag: 'bg-town',
    mayor: 'Gugibg',
    type: 'solo',
    x: 1206,
    y: 1070
  }, {
    name: 'Fallmead',
    tag: 'fallmead',
    x: 2933,
    y: 390,
    mayor: 'Yesirn',
    type: 'small'
  }, {
    name: 'Productivity',
    tag: 'productivity',
    x: 846,
    y: 642,
    mayor: 'Gatwick',
    type: 'solo'
  }, {
    name: 'Lonelywood',
    tag: 'lonelywood',
    mayor: 'Leiph',
    type: 'solo',
    x: 2260,
    y: 815,
    features: ['recruiting']
  }, {
    name: 'Grendellvar',
    tag: 'grendellvar',
    x: 1764,
    y: 2025,
    mayor: 'Manbear',
    type: 'solo'
  }, {
    name: 'Regional Customs',
    tag: 'regional-customs',
    x: 970,
    y: 734,
    mayor: 'Arion',
    type: 'small'
  }, {
    name: 'Arn\'s place',
    tag: 'arns-place',
    mayor: 'ArnDeGot',
    type: 'solo',
    x: 790,
    y: 1365
  }, {
    name: 'Seaside Settlement',
    tag: 'seaside-settlement',
    mayor: 'Atrias',
    x: 617,
    y: 944,
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Liberty',
    tag: 'liberty',
    x: 540,
    y: 767,
    mayor: 'Metrix',
    type: 'small',
    features: ['recruiting']
  }, {
    name: 'The Water Tribe',
    tag: 'water-tribe',
    x: 662,
    y: 774,
    mayor: 'Apex',
    type: 'solo',
    features: ['recruiting']
  }, {
    name: 'Unknown Xenon Sector',
    tag: 'unknown-xenon-sector',
    x: 3061,
    y: 1447,
    mayor: 'Xenon',
    type: 'solo'
  }, {
    name: 'Seaview Manor',
    tag: 'seaview-manor',
    x: 829,
    y: 1671,
    mayor: 'Bennetto',
    type: 'solo'
  }, {
    name: 'Grand Lake',
    tag: 'grand-lake',
    x: 770,
    y: 730,
    mayor: 'Tipsy',
    type: 'solo',
    features: ['harbour']
  }, {
    name: 'Birchton',
    tag: 'birchton',
    mayor: 'Plasson',
    type: 'solo',
    x: 3754,
    y: 2612
  }, {
    name: 'Alexondrea Port',
    tag: 'alexondrea-port',
    x: 1105,
    y: 871,
    mayor: 'Traveler',
    features: ['merchant', 'market', 'harbour']
  }, {
    name: 'Silversky',
    tag: 'silversky',
    x: 3045,
    y: 1782,
    mayor: 'Katitude',
    type: 'solo'
  }, {
    name: 'Kentosani',
    tag: 'kentosani',
    x: 440,
    y: 3080,
    mayor: 'Liam',
    type: 'solo'
  }, {
    name: 'Blackmere Basin',
    tag: 'blackmere-basin',
    x: 796,
    y: 1581,
    owner: 'Ratzo & Yelruh',
    type: 'small'
  }, {
    name: 'Homewood',
    tag: 'homewood',
    x: 525,
    y: 633,
    mayor: 'Cadeef',
    type: 'solo'
  }, {
    name: 'Dwemeria',
    tag: 'dwemeria',
    x: 916,
    y: 2522,
    mayor: 'DwemerManiac',
    type: 'small',
    features: ['harbour', 'recruiting']
  }, {
    name: 'Zephyr',
    tag: 'zephyr',
    x: 2719,
    y: 3674,
    mayor: 'Reese',
    type: 'solo'
  }, {
    name: 'Dragon\'s Lair',
    tag: 'dragons-lair',
    x: 2088,
    y: 3134,
    mayor: 'IQtheDragon',
    type: 'small',
    features: ['recruiting']
  }, {
    name: 'Rise Of The Pink Ponys',
    tag: 'rise-of-the-pink-ponys',
    x: 721,
    y: 1047,
    mayor: 'Yogibearjew',
    type: 'small'
  }, {
    name: 'Compton Beachamp',
    tag: 'compton-beachamp',
    x: 1061,
    y: 348,
    mayor: 'Akali',
    type: 'small'
  }, {
    name: 'Essential Bay',
    tag: 'essential-bay',
    x: 607,
    y: 2001,
    mayor: 'Essense',
    type: 'small'
  }, {
    name: 'Safe Haven',
    tag: 'safe-haven',
    x: 1104,
    y: 834,
    mayor: 'PrincessZena',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Dark Leaf',
    tag: 'dark-leaf',
    x: 1152,
    y: 784,
    mayor: 'Kinnarts',
    type: 'solo'
  }, {
    name: 'Machinatrium',
    tag: 'machinatrium',
    x: 3180,
    y: 392,
    mayor: 'DeuxExMachina',
    type: 'solo'
  }, {
    name: 'Dragon\'s Pool',
    tag: 'dragons-pool',
    x: 2088,
    y: 3294,
    mayor: 'Dragoniq',
    type: 'small'
  }, {
    name: 'Sylvan',
    tag: 'sylvan',
    x: 988,
    y: 825,
    mayor: 'Ziemo',
    type: 'solo'
  }, {
    name: 'Bloodbath and Beyond',
    tag: 'bloodbath-and-beyond',
    x: 1934,
    y: 1304,
    mayor: 'Kadore',
    type: 'solo'
  }, {
    name: 'Loyal Ace',
    tag: 'loyal-ace',
    x: 1970,
    y: 3356,
    mayor: 'Yela',
    type: 'small'
  }, {
    name: 'Azure',
    tag: 'azure',
    x: 1356,
    y: 446,
    mayor: 'Isdur',
    type: 'solo'
  }, {
    name: 'Griffin Mountain',
    tag: 'griffin-mountain',
    x: 3095,
    y: 2737,
    mayor: 'Guffil',
    type: 'solo'
  }, {
    name: 'Dlowville',
    tag: 'dlowville',
    x: 1023,
    y: 1223,
    mayor: 'Dlow',
    type: 'solo'
  }, {
    name: 'Indalo Farm',
    tag: 'indalo-farm',
    x: 1175,
    y: 873,
    mayor: 'Indalo',
    type: 'solo'
  }, {
    name: 'Florida',
    tag: 'florida',
    x: 850,
    y: 292,
    mayor: 'Tedrick',
    features: ['harbour', 'recruiting'],
    type: 'solo'
  }, {
    name: 'Barrowland',
    tag: 'barrowland',
    x: 2316,
    y: 2998,
    mayor: 'Kroaker',
    type: 'solo'
  }, {
    name: 'Port North',
    tag: 'port-north',
    x: 2278,
    y: 592,
    mayor: 'Bluegreen',
    features: ['harbour'],
    type: 'small'
  }, {
    name: 'Catnip Cove',
    tag: 'catnip-cove',
    x: 3508,
    y: 1421,
    mayor: 'Mizova',
    features: ['harbour', 'mailbox', 'market', 'inn'],
    type: 'large'
  }, {
    name: 'Easthaven Trade Harbour',
    tag: 'easthaven-trade-harbour',
    x: 3540,
    y: 3362,
    mayor: 'Noskull',
    features: ['market', 'harbour', 'inn'],
    type: 'solo'
  }, {
    name: 'Magnolia Mines',
    tag: 'magnolia-mines',
    x: 808,
    y: 3018,
    mayor: 'Deltagirl',
    type: 'solo'
  }, {
    name: 'A Small Settlement',
    tag: 'small-settlement',
    x: 478,
    y: 2450,
    mayor: 'Thorgar',
    type: 'small'
  }, {
    name: 'Hell\'s Pass',
    tag: 'fos-forest-trade-post',
    x: 1118,
    y: 808,
    mayor: 'StarCrocTheGreat',
    features: ['trader', 'market', 'mailbox', 'recruiting'],
    type: 'solo'
  }, {
    name: 'Poseidons Anchorage',
    tag: 'poseidons-anchorage',
    x: 1692,
    y: 383,
    mayor: 'Weatherwax',
    features: ['harbour'],
    type: 'solo'
  }, {
    name: 'Serpent Bay Port',
    tag: 'serpent-bay-port',
    x: 816,
    y: 2684,
    mayor: 'Freelance',
    type: 'small'
  }, {
    name: 'Seal Cove',
    tag: 'seal-cove',
    x: 1474,
    y: 1603,
    mayor: 'Wulfsige',
    type: 'solo'
  }, {
    name: 'Monotropa',
    tag: 'monotropa',
    x: 880,
    y: 701,
    mayor: 'Kilem',
    type: 'small'
  }, {
    name: 'Lost Woods',
    tag: 'lost-woods',
    x: 892,
    y: 1332,
    mayor: 'Yeva, Emili',
    type: 'solo'
  }, {
    name: 'Pine Lake',
    tag: 'pine-lake',
    x: 2556,
    y: 2280,
    mayor: 'Harzim',
    type: 'solo'
  }, {
    name: 'Littlehub',
    tag: 'littlehub',
    x: 805,
    y: 1308,
    mayor: 'Thalos',
    features: ['harbour', 'recruiting'],
    type: 'solo'
  }, {
    name: 'Archimedes Hall',
    tag: 'archimedes-hall',
    x: 2496,
    y: 810,
    mayor: 'Archimedes',
    type: 'solo'
  }, {
    name: 'Enigma',
    tag: 'enigma',
    x: 742,
    y: 276,
    mayor: 'Zortanis',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'West Point',
    tag: 'west-point',
    x: 540,
    y: 1100,
    mayor: 'Sarren',
    features: ['harbour', 'inn'],
    type: 'solo'
  }, {
    name: 'Novus Castellum',
    tag: 'novus-castellum',
    x: 578,
    y: 1990,
    mayor: 'Kassanrda',
    features: ['harbour', 'recruiting'],
    type: 'solo'
  }, {
    name: 'The Anvil of Ice',
    tag: 'anvil-of-ice',
    x: 1472,
    y: 2293,
    mayor: 'ElofValantor',
    type: 'solo'
  }, {
    name: 'Well of Souls',
    tag: 'well-of-souls',
    x: 2715,
    y: 682,
    mayor: 'Zealord',
    features: ['harbour', 'recruiting'],
    type: 'small'
  }, {
    name: 'Pirate Bay',
    tag: 'pirate-bay',
    x: 2548,
    y: 778,
    mayor: 'CookieMuncher & Cryke',
    features: ['trader', 'market', 'harbour', 'inn', 'recruiting'],
    type: 'large'
  }, {
    name: 'Celosia',
    tag: 'celosia',
    x: 1991,
    y: 639,
    mayor: 'Nuinethir',
    features: ['mailbox'],
    type: 'small'
  }, {
    name: 'SkyRift',
    tag: 'skyrift',
    x: 3620,
    y: 1649,
    mayor: 'Ptahil',
    type: 'solo'
  }, {
    name: 'Northshore Docks',
    tag: 'northshore-docks',
    x: 1410,
    y: 355,
    mayor: 'Borieck',
    features: ['harbour'],
    type: 'solo'
  }, {
    name: 'Knocktopher',
    tag: 'knocktopher',
    x: 1948,
    y: 730,
    mayor: 'Ravenquoth',
    type: 'solo'
  }, {
    name: 'Rice Paddy',
    tag: 'rice-paddy',
    x: 979,
    y: 712,
    mayor: 'ChinTuFat',
    type: 'solo'
  }, {
    name: 'Inextremx',
    tag: 'inextremx',
    x: 1206,
    y: 846,
    mayor: 'Inextremx',
    type: 'solo'
  }, {
    name: 'Farms of Dwemeria',
    tag: 'farms-of-dwemeria',
    x: 995,
    y: 2509,
    mayor: 'JustBob',
    type: 'solo'
  }, {
    name: 'Samia Bay',
    tag: 'samia-bay',
    x: 528,
    y: 609,
    mayor: 'Tranderas',
    type: 'solo'
  }, {
    name: 'Port Hudson',
    tag: 'port-hudson',
    x: 442,
    y: 3190,
    mayor: 'Tyrannus',
    features: ['harbour', 'recruiting'],
    type: 'solo'
  }, {
    name: 'Highgarden',
    tag: 'highgarden',
    x: 1075,
    y: 1658,
    mayor: 'Moxie',
    type: 'small'
  }, {
    name: 'Wardruna Cove',
    tag: 'wardruna-cove',
    x: 778,
    y: 2738,
    mayor: 'Cyrus',
    features: ['trader'],
    type: 'small'
  }, {
    name: 'Silgus',
    tag: 'silgus',
    x: 849,
    y: 598,
    mayor: 'Syleth',
    type: 'solo'
  }, {
    name: 'LoveFear-Docks',
    tag: 'lovefear-docks',
    x: 524,
    y: 2331,
    mayor: 'Lovelace',
    features: ['harbour', 'market', 'mailbox'],
    type: 'solo'
  }, {
    name: 'Dark Leaf Harbor',
    tag: 'dark-leaf-harbor',
    x: 1203,
    y: 952,
    mayor: 'Innik',
    type: 'solo'
  }, {
    name: 'Aevum',
    tag: 'aevum',
    x: 1362,
    y: 1100,
    mayor: 'Mutz',
    features: ['recruiting'],
    type: 'small'
  }, {
    name: 'Arvika',
    tag: 'arvika',
    x: 582,
    y: 514,
    mayor: 'Zeafaw',
    features: ['recruiting'],
    type: 'small'
  }, {
    name: 'Moon Tree',
    tag: 'moon-tree',
    x: 3665,
    y: 2393,
    mayor: 'Sazaraki',
    type: 'solo'
  }, {
    name: 'Link\'s Spot',
    tag: 'links-spot',
    x: 1865,
    y: 3852,
    mayor: 'Link',
    type: 'small'
  }, {
    name: 'Amdarilla',
    tag: 'amdarilla',
    x: 1586,
    y: 2740,
    mayor: 'Stormhander',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Aquashire',
    tag: 'aquashire',
    x: 376,
    y: 2454,
    mayor: 'LordOfRus',
    features: ['harbour', 'recruiting'],
    type: 'solo'
  }, {
    name: 'Point of No Return',
    tag: 'point-of-no-return',
    x: 540,
    y: 1913,
    mayor: 'Rigger',
    type: 'solo'
  }, {
    name: 'Loch Niss',
    tag: 'loch-niss',
    x: 3056,
    y: 3694,
    mayor: 'Nissy',
    type: 'solo'
  }, {
    name: 'Jolly Roger Bay',
    tag: 'jolly-roger-bay',
    x: 818,
    y: 1188,
    mayor: 'Tranderas',
    type: 'solo'
  }, {
    name: 'Blaine',
    tag: 'blaine',
    x: 529,
    y: 647,
    mayor: 'ChrisDolmeth',
    features: ['recruiting'],
    type: 'small'
  }, {
    name: 'Firefly',
    tag: 'firefly',
    x: 1094,
    y: 616,
    mayor: 'Tiega',
    type: 'solo'
  }, {
    name: 'Castle Glittercrown',
    tag: 'castle-glittercrown',
    x: 348,
    y: 312,
    mayor: 'Capi',
    features: ['harbour', 'recruiting'],
    type: 'small'
  }, {
    name: 'Nameless',
    tag: 'nameless',
    x: 1009,
    y: 2260,
    mayor: 'Digradi',
    type: 'solo'
  }, {
    name: 'Toxtopia',
    tag: 'toxtopia',
    x: 2169,
    y: 995,
    mayor: 'ToXiCTBaG',
    type: 'solo'
  }, {
    name: 'Tulum',
    tag: 'tulum',
    x: 330,
    y: 1840,
    mayor: 'Diablos',
    features: ['harbour', 'mailbox'],
    type: 'solo'
  }, {
    name: 'Pine Grove',
    tag: 'pine-grove',
    x: 1045,
    y: 676,
    mayor: 'Pyelitis',
    type: 'small'
  }, {
    name: 'Ransville',
    tag: 'ransville',
    x: 2098,
    y: 962,
    mayor: 'Randall \& WaterMonster',
    type: 'small'
  }, {
    name: 'Tholen Farmstead',
    tag: 'tholen-farmstead',
    x: 1026,
    y: 750,
    mayor: 'Cunemous',
    features: ['merchant', 'inn', 'recruiting'],
    type: 'small'
  }, {
    name: 'Hillside',
    tag: 'hillside',
    x: 1930,
    y: 2905,
    mayor: 'Orvig',
    type: 'solo'
  }, {
    name: 'Minowick',
    tag: 'minowick',
    x: 3461,
    y: 1226,
    mayor: 'Turelis',
    type: 'solo'
  }, {
    name: 'Memphis\' Mountain Home',
    tag: 'memphis-mountain-home',
    x: 1079,
    y: 2113,
    mayor: 'Memphis',
    type: 'solo'
  }, {
    name: 'End of The Line Trading Partners',
    tag: 'end-of-the-line-trading-partners',
    x: 2480,
    y: 3478,
    mayor: 'Maratdesade',
    features: ['recruiting'],
    type: 'small'
  }, {
    name: 'Verdent Hill',
    tag: 'verdent-hill',
    x: 1316,
    y: 807,
    mayor: 'Emass',
    type: 'solo'
  }, {
    name: 'Littlehub',
    tag: 'littlehub',
    x: 805,
    y: 1308,
    mayor: 'Thalos',
    features: ['harbour', 'inn', 'mailbox', 'recruiting'],
    type: 'small'
  }, {
    name: 'Southern Acres',
    tag: 'southern-acres',
    x: 846,
    y: 693,
    mayor: 'Airconman',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Cameltoe',
    tag: 'cameltoe',
    x: 2061,
    y: 1361,
    mayor: 'Xloey',
    features: [''],
    type: 'small'
  }, {
    name: 'Goiania',
    tag: 'goiania',
    x: 470,
    y: 2017,
    mayor: 'Trustvainer',
    type: 'solo'
  }, {
    name: 'New Banana Land',
    tag: 'new-banana-land',
    x: 1625,
    y: 3737,
    mayor: 'Nana',
    type: 'solo'
  }, {
    name: 'Moonwood',
    tag: 'moonwood',
    x: 1590,
    y: 3708,
    mayor: 'Draedo',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Raven Watch',
    tag: 'raven-watch',
    x: 3152,
    y: 1546,
    mayor: 'Velan',
    features: ['mailbox'],
    type: 'solo'
  }, {
    name: 'Belgica',
    tag: 'belgica',
    x: 1164,
    y: 385,
    mayor: 'Djjorno54',
    features: ['trader', 'recruiting'],
    type: 'small'
  }, {
    name: 'Brunnr Burrow',
    tag: 'brunnr-burrow',
    x: 795,
    y: 623,
    mayor: 'Brunnr',
    type: 'solo'
  }, {
    name: 'Heimdal\'s Hut',
    tag: 'heimdals-hut',
    x: 857,
    y: 1361,
    mayor: 'Heimdal',
    type: 'solo'
  }, {
    name: 'Narnia',
    tag: 'narnia',
    x: 1099,
    y: 897,
    mayor: 'Artenn',
    features: [''],
    type: 'solo'
  }, {
    name: 'Lakeridge',
    tag: 'lakeridge',
    x: 630,
    y: 1680,
    mayor: 'Kamaka',
    type: 'solo'
  }, {
    name: 'To Mato Plant',
    tag: 'to-mato-plant',
    x: 901,
    y: 584,
    mayor: 'Mato',
    features: ['recruiting'],
    type: 'small'
  }, {
    name: 'Spring\'s Reserve',
    tag: 'springs-reserve',
    x: 1071,
    y: 677,
    mayor: 'ShangXIq',
    type: 'solo'
  }, {
    name: 'Temmie Village',
    tag: 'temmie-village',
    x: 1222,
    y: 606,
    mayor: 'Temmie',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'New Moon Harbour',
    tag: 'new-moon-harbour',
    x: 1010,
    y: 1777,
    mayor: 'Lasin',
    type: 'small'
  }, {
    name: 'Viking Haven',
    tag: 'viking-haven',
    x: 1157,
    y: 910,
    mayor: 'Tjalfe',
    type: 'small'
  }, {
    name: 'Cargonia',
    tag: 'cargonia',
    x: 641,
    y: 2279,
    mayor: 'Noll',
    type: 'solo'
  }, {
    name: 'Fyresong Rest',
    tag: 'fyresong-rest',
    x: 1984,
    y: 474,
    mayor: 'Airica (aka Nuinethir)',
    features: ['harbour', 'inn', 'mailbox'],
    type: 'small'
  }, {
    name: 'Shadow Den',
    tag: 'shadow-den',
    x: 847,
    y: 2385,
    mayor: 'Rogasmo',
    type: 'solo'
  }, {
    name: 'Tiny Toon',
    tag: 'tiny-toon',
    x: 3234,
    y: 2069,
    mayor: 'Jalexber',
    type: 'solo'
  }, {
    name: 'Luxious Cloitus',
    tag: 'luxious-cloitus',
    x: 2283,
    y: 1403,
    mayor: 'Farmer',
    type: 'solo'
  }, {
    name: 'Tribbleation (wrong data, please resubmit)',
    tag: 'tribbleation',
    x: 232,
    y: 1260,
    mayor: 'Tribblemaker',
    features: ['mailbox'],
    type: 'small'
  }, {
    name: 'Paradise',
    tag: 'paradise',
    x: 1052,
    y: 3843,
    mayor: 'Sassy',
    type: 'solo'
  }, {
    name: 'Moriathun',
    tag: 'moriathun',
    x: 3158,
    y: 2068,
    mayor: 'Easy',
    type: 'solo'
  }, {
    name: 'Williams Mountainside Retreat',
    tag: 'williams-mountainside-retreat',
    x: 2152,
    y: 1091,
    mayor: 'Williamsmith',
    features: ['recruiting', 'mailbox'],
    type: 'small'
  }, {
    name: 'Tevinter',
    tag: 'tevinter',
    x: 2841,
    y: 1754,
    mayor: 'Lokce',
    type: 'solo'
  }, {
    name: 'Shadows Rest',
    tag: 'shadows-rest',
    x: 866,
    y: 3772,
    mayor: 'Oriss',
    type: 'solo'
  }, {
    name: 'Ranger\'s Cottage',
    tag: 'rangers-cottage',
    x: 1278,
    y: 986,
    mayor: 'Lyandar',
    features: [''],
    type: 'solo'
  }, {
    name: 'Citadel of the Order of Khaos',
    tag: 'citadel-of-the-order-of-khaos',
    x: 2242,
    y: 1311,
    mayor: 'Korvalia',
    features: [''],
    type: 'small'
  }, {
    name: 'Port Phobic',
    tag: 'port-phobic',
    x: 449,
    y: 2373,
    mayor: 'Phobicice',
    features: [''],
    type: 'small'
  }, {
    name: 'Frostfire',
    tag: 'frostfire',
    x: 2838,
    y: 1666,
    mayor: 'Rhianna',
    features: [''],
    type: 'solo'
  }, {
    name: 'Port Dirt Poor',
    tag: 'port-dirt-poor',
    x: 365,
    y: 3386,
    mayor: 'Sorensen',
    features: ['harbour'],
    type: 'solo'
  }, {
    name: 'Karthwasten',
    tag: 'karthwasten',
    x: 787,
    y: 517,
    mayor: 'Karthannar',
    features: ['mailbox'],
    type: 'solo'
  }, {
    name: 'CzapleNowe',
    tag: 'czaplenowe',
    x: 735,
    y: 1251,
    mayor: 'Czemiel',
    features: [''],
    type: 'solo'
  }, {
    name: 'Valaria',
    tag: 'valaria',
    x: 1655,
    y: 856,
    mayor: 'Edson',
    features: ['recruiting'],
    type: 'small'
  }, {
    name: 'Little Norway',
    tag: 'little-norway',
    x: 468,
    y: 1169,
    mayor: 'Kaasa',
    features: [''],
    type: 'small'
  }, {
    name: 'Crystalzcastel',
    tag: 'crystalzcastel',
    x: 3051,
    y: 1843,
    mayor: 'Solee',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Phrog On The Lake',
    tag: 'phrog-on-the-lake',
    x: 2009,
    y: 1376,
    mayor: 'Phrog',
    features: [''],
    type: 'solo'
  }, {
    name: 'Lost Pines',
    tag: 'lost-pines',
    x: 1006,
    y: 659,
    mayor: 'BrokSonic',
    features: [''],
    type: 'solo'
  }, {
    name: 'The Clay Port',
    tag: 'the-clay-port',
    x: 3476,
    y: 1746,
    mayor: 'Feii',
    type: 'small'
  }, {
    name: 'Port Williams',
    tag: 'port-williams',
    x: 1388,
    y: 399,
    mayor: 'Williamsmithsh',
    features: ['harbour', 'inn', 'mailbox'],
    type: 'solo'
  }, {
    name: 'Providence',
    tag: 'providence',
    x: 2744,
    y: 758,
    mayor: 'Ridgeback',
    features: [''],
    type: 'solo'
  }, {
    name: 'Silverlake',
    tag: 'silverlake',
    x: 433,
    y: 2469,
    mayor: 'Opene',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Wolfmere',
    tag: 'wolfmere',
    x: 2555,
    y: 859,
    mayor: 'Nxtreme',
    features: [''],
    type: 'solo'
  }, {
    name: 'Whymsyshire',
    tag: 'whymsyshire',
    x: 1904,
    y: 1348,
    mayor: 'Pinkamena',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Valhalla Station',
    tag: 'valhalla-station',
    x: 995,
    y: 2509,
    mayor: 'Darbie',
    features: [''],
    type: 'small'
  }, {
    name: 'Raven Rock',
    tag: 'raven-rock',
    x: 3347,
    y: 3825,
    mayor: 'ShadowWarrior',
    features: [''],
    type: 'small'
  }, {
    name: 'Bilgemoor',
    tag: 'bilgemoor',
    x: 1638,
    y: 912,
    mayor: 'Fumbleduck',
    features: ['harbour', 'inn', 'mailbox'],
    type: 'small'
  }, {
    name: 'Mencheres',
    tag: 'mencheres',
    x: 1312,
    y: 963,
    mayor: 'Stygianfury',
    features: [''],
    type: 'solo'
  }, {
    name: 'Pirate Bay\'s Faubourg',
    tag: 'pirate-bays-faubourg',
    x: 2535,
    y: 751,
    mayor: 'Myot',
    features: ['harbour'],
    type: 'solo'
  }, {
    name: 'Blackwatch Lake',
    tag: 'blackwatch-lake',
    x: 1814,
    y: 1004,
    mayor: 'Cadderly',
    features: [''],
    type: 'solo'
  }, {
    name: 'Smurfland',
    tag: 'smurfland',
    x: 1766,
    y: 932,
    mayor: 'Tigar',
    features: [''],
    type: 'small'
  }, {
    name: 'DeValois Shipyard',
    tag: 'devalois-shipyard',
    x: 1730,
    y: 422,
    mayor: 'DeValois',
    features: [''],
    type: 'solo'
  }, {
    name: 'Merwede',
    tag: 'merwede',
    x: 3622,
    y: 1400,
    mayor: 'Falco',
    features: ['harbour'],
    type: 'solo'
  }, {
    name: 'Port Azeur',
    tag: 'port-azeur',
    x: 3424,
    y: 1814,
    mayor: 'Azeuras',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Wolfmere',
    tag: 'wolfmere',
    x: 2555,
    y: 859,
    mayor: 'Nxtreme',
    features: [''],
    type: 'solo'
  }, {
    name: 'Hillside Hideout',
    tag: 'hillside-hideout',
    x: 3100,
    y: 3031,
    mayor: 'Nightcore',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Severo Vostochnaya Metalworks',
    tag: 'severo-vostochnaya-metalworks',
    x: 3252,
    y: 824,
    mayor: 'Dzhra',
    features: [''],
    type: 'small'
  }, {
    name: 'Severo Vostochnaya',
    tag: 'severo-vostochnaya',
    x: 3587,
    y: 354,
    mayor: 'Hannibal',
    features: [''],
    type: 'solo'
  }, {
    name: 'Ravenedge',
    tag: 'Ravenedge',
    x: 1751,
    y: 394,
    mayor: 'Jekmar',
    features: ['harbour'],
    type: 'solo'
  }, {
    name: 'Lakebridge',
    tag: 'lakebridge',
    x: 1682,
    y: 969,
    mayor: 'StraightSIX',
    features: ['recruting'],
    type: 'solo'
  }, {
    name: 'Steelwall',
    tag: 'steelwall',
    x: 1749,
    y: 493,
    mayor: 'Duncann',
    features: [''],
    type: 'solo'
  }, {
    name: 'Clay Coast Harbor',
    tag: 'clay-coast-harbor',
    x: 629,
    y: 2306,
    mayor: 'Madjester',
    features: ['harbour', 'mailbox'],
    type: 'solo'
  }, {
    name: 'The Mist',
    tag: 'the-mist',
    x: 440,
    y: 483,
    mayor: 'Rydia',
    features: ['mailbox'],
    type: 'solo'
  }, {
    name: 'Vale of the Silent',
    tag: 'vale-of-the-silent',
    x: 2795,
    y: 553,
    mayor: 'Axinex',
    features: [''],
    type: 'solo'
  }, {
    name: 'Mount Everlong',
    tag: 'mount-everlong',
    x: 2908,
    y: 1914,
    mayor: 'Azeuras',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Springton',
    tag: 'springton',
    x: 3674,
    y: 1323,
    mayor: 'GamerGuyJoe',
    features: [''],
    type: 'solo'
  }, {
    name: 'Piotroszkowo',
    tag: 'piotroszkowo',
    x: 3856,
    y: 2018,
    mayor: 'Petronus',
    features: ['recruiting'],
    type: 'solo'
  }, {
    name: 'Pomorze',
    tag: 'pomorze',
    x: 3679,
    y: 1681,
    mayor: 'Czemiel',
    features: [''],
    type: 'solo'
  }, {
    name: 'Fort Tiffany',
    tag: 'fort-tiffany',
    x: 1230,
    y: 2986,
    mayor: 'Sprong',
    features: [''],
    type: 'solo'
  }, {
    name: 'Myrdal',
    tag: 'myrdal',
    x: 1736,
    y: 1068,
    mayor: 'Thormyrdal',
    features: [''],
    type: 'solo'
  }, {
    name: 'Falkreath Farm',
    tag: 'falkreath-farm',
    x: 1686,
    y: 784,
    mayor: 'Ekatski',
    features: [''],
    type: 'solo'
  }, {
    name: 'Kelsey\'s Retreat',
    tag: 'kelseys-retreat',
    x: 1055,
    y: 3795,
    mayor: 'Kelsey',
    features: [''],
    type: 'solo'
  }, {
    name: 'Majula',
    tag: 'majula',
    x: 724,
    y: 566,
    mayor: 'Bungatron',
    features: ['trader'],
    type: 'solo'
  }, {
    name: 'Lindenwood Manor',
    tag: 'lindenwood-manor',
    x: 2979,
    y: 3048,
    mayor: 'Turgvaali',
    features: [''],
    type: 'solo'
  }, {
    name: 'La Croixan Isle',
    tag: 'la-croixan-isle',
    x: 3687,
    y: 477,
    mayor: 'Poragon',
    features: ['harbour'],
    type: 'solo'
  }, {
    name: 'Emon',
    tag: 'emon',
    x: 1706,
    y: 855,
    mayor: 'Zamster',
    features: [''],
    type: 'small'
  }, {
    name: 'Maple Enclave',
    tag: 'maple-enclave',
    x: 2391,
    y: 2008,
    mayor: 'Yunga',
    features: [''],
    type: 'solo'
  }, {
    name: 'Pleasant Valley',
    tag: 'pleasant-valley',
    x: 960,
    y: 630,
    mayor: 'Raxxar',
    features: [''],
    type: 'solo'
  }, {
    name: 'Ravenhome',
    tag: 'Ravenhome',
    x: 381,
    y: 1902,
    mayor: 'Ravenloft',
    features: [''],
    type: 'solo'
  }, {
    name: 'The Quagmire',
    tag: 'the-quagmire',
    x: 507,
    y: 674,
    mayor: 'Giggity',
    features: [''],
    type: 'solo'
  }
];
