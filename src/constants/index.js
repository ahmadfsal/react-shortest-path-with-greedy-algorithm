export const MY_LOCATION = 'Lokasi Saya'
export const START_FROM = 'START_FROM'
export const TO_DESTINATION = 'TO_DESTINATION'
export const LABEL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export const mapDataList = [
    {
        name: 'Sanggar Seni Pringgawati',
        verteks: 'A',
        lat: '-6.748.195',
        lng: '108.563.093',
        kec: 'Harjamukti',
        address:
            'Jl. Gn. Pangrango No.49, Larangan, Kec. Harjamukti, Kota Cirebon, Jawa Barat 45141',
        distance: 5
    },
    {
        name: 'Sanggar Kartoen Bitjara',
        verteks: 'B',
        lat: '-6.745.570',
        lng: '108.556.008',
        kec: 'Harjamukti',
        address:
            'Jl. Kecapi No.2, RW.1, Kecapi, Kec. Harjamukti, Kota Cirebon, Jawa Barat 45142',
        distance: 3.8
    },
    {
        name: 'Sanggar Brassco',
        verteks: 'C',
        lat: '-6.732.509',
        lng: '108.576.801',
        kec: 'Lemahwungkuk',
        address: 'Jlan Karang Dawa no 143 Rt 07 Rw 03',
        distance: 7
    },
    {
        name: 'Sanggar Seni Pakungwati',
        verteks: 'D',
        lat: '-6.726.296',
        lng: '108.571006',
        kec: 'Lemahwungkuk',
        address: 'Kesepuhan Kec. Lemahwungkuk Kota Cirebon Jawa Barat 45114',
        distance: 2
    },
    {
        name: 'Sanggar Seni Tari Mergu Wijayakusuma',
        verteks: 'E',
        lat: '-6.735.440',
        lng: '108.547392',
        kec: 'Kesambi',
        address:
            'RW 9, Karang Malang, Sunyaragi, Kec. Kesambi, Kota Cirebon, Jawa Barat 45132',
        distance: 6
    },
    {
        name: 'Sanggar sekar pandan',
        verteks: 'F',
        lat: '-6.725.917',
        lng: '108.565404',
        kec: 'Pekalipan',
        address:
            'Jl. Jagasatru, Pulasaren, Kec. Pekalipan, Kota Cirebon, Jawa Barat 45116',
        distance: 14
    },
    {
        name: 'Sanggar Watu Gunung',
        verteks: 'G',
        lat: '-6.724.594',
        lng: '108.559741',
        kec: 'Kesambi',
        address:
            'Jl. Warna Sari No.9 Kesambi Kec. Kesambi Kota Cirebon Jawa Barat 45134',
        distance: 9.4
    },
    {
        name: 'Sanggar Chiisai',
        verteks: 'H',
        lat: '-6.725.209',
        lng: '108.561985',
        kec: 'Pekalipan',
        address:
            'Kampung Pulobaru Utara Gang 2, Pulasaren, Kota Cirebon, Jawa Barat',
        distance: 7
    },
    {
        name: 'Sanggar GEMA PAWARCITRA',
        verteks: 'I',
        lat: '-6.708.446',
        lng: '108.555484',
        kec: 'Kejaksan',
        address:
            'Jl. Olah Raga Sukapura Kec. Kejaksan Kota Cirebon Jawa Barat 45122',
        distance: 9
    },
    {
        name: 'Sanggar Wakuclak Mesem Bae',
        verteks: 'J',
        lat: '-6.703.882',
        lng: '108.562245',
        kec: 'Kejaksan',
        address: 'Jl. Kapt. Samadikun Gg. Samadikun. Kebon Baru. Kejaksan',
        distance: 12
    }
]

export const sanggarList = [
    { text: 'Sanggar Seni Pringgawati', value: 0 },
    { text: 'Sanggar Kartoen Bitjara', value: 1 },
    { text: 'Sanggar Brassco', value: 2 },
    { text: 'Sanggar Seni Pakungwati', value: 3 },
    { text: 'Sanggar Seni Tari Mergu Wijayakusuna', value: 4 },
    { text: 'Sanggar Sekar Pandan', value: 5 },
    { text: 'Sanggar Watu Gunung', value: 6 },
    { text: 'Sanggar Chiisai', value: 7 },
    { text: 'Sanggar GEMA PAWACITRA', value: 8 },
    { text: 'Sanggar Wakuclak Mesem Bae', value: 9 },
]

export const ADJACENCY_MATRIX = [
    [0, 8, 30, 7, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 41, 0, 0, 24, 0, 0],
    [30, 0, 0, 5, 0, 0, 0, 17, 0, 0],
    [0, 0, 5, 0, 0, 0, 0, 14, 0, 32],
    [0, 41, 0, 0, 0, 0, 0, 44, 48, 0],
    [0, 0, 0, 0, 0, 0, 13, 7, 16, 0],
    [0, 0, 0, 0, 0, 13, 0, 5, 15, 0],
    [0, 0, 17, 14, 44, 7, 5, 0, 0, 0],
    [0, 0, 0, 0, 48, 16, 15, 0, 0, 10],
    [0, 0, 0, 32, 0, 0, 0, 0, 10, 0],
]
