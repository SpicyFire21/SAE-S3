let users = [
    {
        "id": "a2b1c8c4-2e53-4c37-a4de-3c4fc35b18fa",
        "name": "",
        "login": "admin",
        "password": "admin",
        "email": "admin@festival.com",
        "droit": "2",
        "session": "",
        "note": [],
        "type": "",
        "nom_photo": "",
        "description": "",
    },
    {
        "id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "name": "Martin Scorsese",
        "login": "presta",
        "password": "presta",
        "email": "scorsese@cinema.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 1, 5, 4, 4.5, 5, 5, 5, 5, 5],
        "type": "Réalisateur",
        "nom_photo": "scorsese.jpg",
        "description": "Réalisateur légendaire oscarisé, maître du cinéma américain"
    },
    {
        "id": "c38acd4c-d6fc-4a19-bd24-98a7c18fa414",
        "name": "",
        "login": "client",
        "password": "client",
        "email": "client@mail.com",
        "droit": "0",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "",
        "nom_photo": "producteur.jpg",
        "description": ""
    },
    {
        "id": "d4e9116b-e3e8-4e0e-8a3b-6a93e1d6c4f4",
        "name": "",
        "login": "client2",
        "password": "client2",
        "email": "client2@mail.com",
        "droit": "0",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "",
        "nom_photo": "",
        "description": ""
    },
    {
        "id": "e55733ef-f3d2-447d-94db-9e3aaef624c1",
        "name": "Quentin Tarantino",
        "login": "presta2",
        "password": "presta2",
        "email": "tarantino@pulp.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Réalisateur",
        "nom_photo": "tarantino.jpg",
        "description": "Créateur de Pulp Fiction et Kill Bill, style unique et référencé"
    },
    {
        "id": "f68ab44a-557b-4d44-b1df-a38f894c2dca",
        "name": "Christopher Nolan",
        "login": "prestaknaghui V2",
        "password": "prestakhnaghui V2",
        "email": "nolan@inception.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Réalisateur",
        "nom_photo": "nolan.jpg",
        "description": "Génie des films à intrigue complexe et effets visuels innovants"
    },
    {
        "id": "f68ab44a-557b-4d44-b1df-a34f891c2dza",
        "name": "Johan Lançon",
        "login": "goat",
        "password": "goat",
        "email": "goat@gmail.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Réalisateur",
        "nom_photo": "null.jpg",
        "description": "L'honoré en personne"
    },
    {
        "id": "a81699b9-94d1-4f72-9df4-1588dc1b2cc5",
        "name": "Leonardo DiCaprio",
        "login": "cityxl",
        "password": "cityxl",
        "email": "dicaprio@actor.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Acteur",
        "nom_photo": "dicaprio.jpg",
        "description": "Acteur oscarisé, star internationale"
    },
    {
        "id": "bd2adbd5-67b5-4e0e-a06a-7fab0d2e391c",
        "name": "Meryl Streep",
        "login": "mstreep",
        "password": "mstreep",
        "email": "streep@actress.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Actrice",
        "nom_photo": "streep.jpg",
        "description": "L'actrice la plus nominée aux Oscars"
    },
    {
        "id": "c92c742a-baf6-4cc0-9a50-941ddfe55f8c",
        "name": "Denis Villeneuve",
        "login": "dvilleneuve",
        "password": "dvilleneuve",
        "email": "villeneuve@sci-fi.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Réalisateur",
        "nom_photo": "villeneuve.jpg",
        "description": "Maître de la science-fiction moderne"
    },
    {
        "id": "db7a70fa-ff5e-421b-987e-7ca4ab65eb31",
        "name": "Cate Blanchett",
        "login": "cblanchett",
        "password": "cblanchett",
        "email": "blanchett@actress.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Actrice",
        "nom_photo": "blanchett.jpg",
        "description": "Actrice australienne doublement oscarisée"
    },
    {
        "id": "e1fbdadd-fd8f-4a6d-b0cb-f8c77b3e7238",
        "name": "Steven Spielberg",
        "login": "sspielberg",
        "password": "sspielberg",
        "email": "spielberg@films.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Réalisateur",
        "nom_photo": "spielberg.jpg",
        "description": "Légende du cinéma"
    },
    {
        "id": "fa1b7ea7-c35c-488d-b7e1-7fb893b97590",
        "name": "Marion Cotillard",
        "login": "mcotillard",
        "password": "mcotillard",
        "email": "cotillard@actress.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Actrice",
        "nom_photo": "cotillard.jpg",
        "description": "Actrice française oscarisée"
    },
    {
        "id": "b2533589-a4f4-476b-bdc9-1cdebbcb5e06",
        "name": "Al Pacino",
        "login": "apacino",
        "password": "apacino",
        "email": "pacino@actor.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Acteur",
        "nom_photo": "pacino.jpg",
        "description": "Icône du cinéma"
    },
    {
        "id": "c0debc4d-c621-4b4d-9404-97d59a653d4b",
        "name": "Jane Campion",
        "login": "jcampioni",
        "password": "jcampioni",
        "email": "campion@director.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Réalisatrice",
        "nom_photo": "campion.jpg",
        "description": "Réalisatrice néo-zélandaise"
    },
    {
        "id": "dcded2e8-4c67-4b2b-b369-d0c13bec2c0c",
        "name": "Joaquin Phoenix",
        "login": "jphoenix",
        "password": "jphoenix",
        "email": "phoenix@actor.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Acteur",
        "nom_photo": "phoenix.jpg",
        "description": "Acteur oscarisé"
    },
    {
        "id": "eac2c01b-937f-4b14-a48c-7d9b4ab5c236",
        "name": "Greta Gerwig",
        "login": "ggerwig",
        "password": "ggerwig",
        "email": "gerwig@director.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Réalisatrice",
        "nom_photo": "gerwig.jpg",
        "description": "Réalisatrice acclamée"
    },
    {
        "id": "f1b92326-1e85-49af-8cf7-2270e2e725e8",
        "name": "Tom Hanks",
        "login": "thanks",
        "password": "thanks",
        "email": "hanks@actor.com",
        "droit": "1",
        "session": "",
        "note": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        "type": "Acteur",
        "nom_photo": "hanks.jpg",
        "description": "Acteur emblématique"
    }
]

let goodies = [
    {id: "1", iduser: "bb4b684c-0c67-4d19-ac21-b225b3e5c018", quantity: "37", name: "T-shirt", price: "20"},
    {id: "2", iduser: "bb4b684c-0c67-4d19-ac21-b225b3e5c018", quantity: "40", name: "Tasse", price: "15"},
    {id: "3", iduser: "bb4b684c-0c67-4d19-ac21-b225b3e5c018", quantity: "12", name: "Casquette", price: "12"},
    {id: "4", iduser: "bb4b684c-0c67-4d19-ac21-b225b3e5c018", quantity: "66", name: "Sweat", price: "35"},
];


let size = [
    {id: "1", label: "XS"},
    {id: "2", label: "S"},
    {id: "3", label: "M"},
    {id: "4", label: "L"},
    {id: "5", label: "XL"},
];

let color = [
    {id: "1", label: "Rouge"},
    {id: "2", label: "Bleu"},
    {id: "3", label: "Vert"},
    {id: "4", label: "Noir"},
    {id: "5", label: "Blanc"},
];

let goodies_size = [
    {idgoodie: "1", idsize: "1"},
    {idgoodie: "1", idsize: "2"},
    {idgoodie: "1", idsize: "3"},
    {idgoodie: "1", idsize: "4"},
    {idgoodie: "2", idsize: "1"},
    {idgoodie: "3", idsize: "4"},
    {idgoodie: "4", idsize: "5"},


];

let goodies_color = [
    {idgoodie: "1", idcolor: "1"},
    {idgoodie: "1", idcolor: "2"},
    {idgoodie: "2", idcolor: "3"},
    {idgoodie: "3", idcolor: "4"},
    {idgoodie: "4", idcolor: "5"},

];

let basket = [
    {
        id: "0f8fad5b-d9cb-469f-a165-70867728950e",
        iduser: "c38acd4c-d6fc-4a19-bd24-98a7c18fa414",
        date: "2025-03-18",
        state: "wait" //wait/payed
    }
];

let basket_items = [
    {idbasket: "0f8fad5b-d9cb-469f-a165-70867728950e", idgoodie: "1", idcolor: "2", idsize: "3", count: "1"}
];


let tickets = [
    {
        "idticket": "4c3bfa40-79f0-4f27-9af0-8bc4f606e0c4",
        "iduser": "a2b1c8c4-2e53-4c37-a4de-3c4fc35b18fa",
        "datefrom": "2023-05-02T00:00:00",
        "dateto": "2023-05-02T23:59:59",
        "priceid": "93b0592a-922d-4b39-9227-b5f7d84c95ff"
    },
    {
        "idticket": "8a1fd033-04a0-4a48-b274-8b6a15caf6ad",
        "iduser": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "datefrom": "2023-05-03T00:00:00",
        "dateto": "2023-05-03T23:59:59",
        "priceid": "0936df09-1754-448f-8b09-f6c794c6b251"
    },
    {
        "idticket": "859407b1-e711-4fc7-8ef0-9b0a67661134",
        "iduser": "c38acd4c-d6fc-4a19-bd24-98a7c18fa414",
        "datefrom": "2023-05-04T00:00:00",
        "dateto": "2023-05-04T23:59:59",
        "priceid": "9e671b84-9b15-4543-bc2b-bf7892e0247d"
    },
    {
        "idticket": "a6b409ff-aa6c-48a3-bba1-2e535d562bc8",
        "iduser": "d4e9116b-e3e8-4e0e-8a3b-6a93e1d6c4f4",
        "datefrom": "2023-05-05T00:00:00",
        "dateto": "2023-05-05T23:59:59",
        "priceid": "c5885928-09e4-4238-a633-fcdf6023e030"
    }
]

let tickets_price = [
    {
        "id": "93b0592a-922d-4b39-9227-b5f7d84c95ff",
        "name": "adult",
        "price": "11"
    },
    {
        "id": "0936df09-1754-448f-8b09-f6c794c6b251",
        "name": "student",
        "price": "9"
    },
    {
        "id": "9e671b84-9b15-4543-bc2b-bf7892e0247d",
        "name": "child",
        "price": "5"
    }
]

let stands = [
    {
        "idstand": "1",
        "name": "cinema 1",
        "x": 25,
        "y": 32,
        "width": 481,
        "height": 620,
        "type": "1",
        "owner": "f68ab44a-557b-4d44-b1df-a34f891c2dza"
    },
    {"idstand": "2", "name": "cinema 2", "x": 25, "y": 670, "width": 481, "height": 620, "type": "1", "owner": null},
    {"idstand": "3", "name": "cinema 3", "x": 25, "y": 1303, "width": 481, "height": 620, "type": "1", "owner": null},

    {
        "idstand": "4",
        "name": "adamdedicace1",
        "x": 886,
        "y": 348,
        "width": 65,
        "height": 164,
        "type": "2",
        "owner": null
    },
    {
        "idstand": "5",
        "name": "adamdedicace2",
        "x": 781,
        "y": 348,
        "width": 65,
        "height": 164,
        "type": "2",
        "owner": null
    },
    // {"idstand": "6", "name": "adamdedicace3", "x": 886, "y": 1002, "width": 65, "height": 164, "type": "2", "owner": null},
    // {"idstand": "7", "name": "adamdedicace4", "x": 781, "y": 1002, "width": 65, "height": 164, "type": "2", "owner": null},
    // {"idstand": "8", "name": "adamdedicace5", "x": 1892, "y": 1230, "width": 65, "height": 164, "type": "2", "owner": null},
    // {"idstand": "9", "name": "adamdedicace6", "x": 1892, "y": 1427, "width": 65, "height": 164, "type": "2", "owner": null},

    // {"idstand": "10", "name": "stand-1", "x": 781, "y": 202, "width": 65, "height": 92, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "11", "name": "stand-2", "x": 886, "y": 202, "width": 65, "height": 92, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "12", "name": "stand-3", "x": 781, "y": 563, "width": 65, "height": 92, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "13", "name": "stand-4", "x": 886, "y": 563, "width": 65, "height": 92, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "14", "name": "stand-10", "x": 781, "y": 860, "width": 65, "height": 92, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "15", "name": "stand-11", "x": 886, "y": 860, "width": 65, "height": 92, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "16", "name": "stand-17", "x": 787, "y": 1220, "width": 65, "height": 92, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "17", "name": "stand-18", "x": 893, "y": 1221, "width": 65, "height": 92, "type": "stand", "owner": null, "reservedBy": []},
    //
    // {"idstand": "18", "name": "stand-5", "x": 1729, "y": 842, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "19", "name": "stand-6", "x": 1595, "y": 842, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "20", "name": "stand-7", "x": 1860, "y": 842, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "21", "name": "stand-8", "x": 1458, "y": 842, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "22", "name": "stand-9", "x": 1311, "y": 842, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    //
    // {"idstand": "23", "name": "stand-12", "x": 1720, "y": 1038, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "24", "name": "stand-13", "x": 1586, "y": 1038, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "25", "name": "stand-14", "x": 1851, "y": 1038, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "26", "name": "stand-15", "x": 1449, "y": 1038, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "27", "name": "stand-16", "x": 1302, "y": 1038, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    //
    // {"idstand": "28", "name": "stand-19", "x": 1724, "y": 1784, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "29", "name": "stand-20", "x": 1591, "y": 1784, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "30", "name": "stand-21", "x": 1855, "y": 1784, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "31", "name": "stand-22", "x": 1453, "y": 1784, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
    // {"idstand": "32", "name": "stand-23", "x": 1306, "y": 1784, "width": 92, "height": 65, "type": "stand", "owner": null, "reservedBy": []},
];

let standTypes = [
    {"id": "1", "type": "cinema"},
    {"id": "2", "type": "autograph"},
];

let reservations = [
    {
        "id": "1",
        "userId": "c38acd4c-d6fc-4a19-bd24-98a7c18fa414",
        "type": "1",
        "date": "2025-12-23T14:00:00",
        "standId": "1"
    },
    {
        "id": "2",
        "userId": "c38acd4c-d6fc-4a19-bd24-98a7c18fa414",
        "type": "2",
        "date": "2025-12-23T14:00:00",
        "standId": "4"
    },
];

let films_reservations = [
    {
        reservationId: "1",
        projectionId: "1"
    }
];

let autographs_reservations = [
    {
        reservationId: "2",
        autographId: "1"
    }
];

let projections = [
    {"id": "1", "standId": "1", "filmId": "6f207e95-5400-471f-a933-d01d817b0608", "date": "2025-12-23T14:00:00"},
    {"id": "2", "standId": "1", "filmId": "6f207e95-5400-471f-a933-d01d817b0608", "date": "2025-12-24T17:00:00"},
    {"id": "3", "standId": "1", "filmId": "6cec5c18-d60b-4372-916a-482bb4facaa0", "date": "2025-01-05T20:00:00"},
    {"id": "4", "standId": "1", "filmId": "6cec5c18-d60b-4372-916a-482bb4facaa0", "date": "2025-12-24T17:00:00"},
    {"id": "7", "standId": "2", "filmId": "6f207e95-5400-471f-a933-d01d817b0608", "date": "2025-12-23T16:00:00"}
];

let autographs = [
    {
        "id": "1",
        "standId": "4",
        "userId": "a81699b9-94d1-4f72-9df4-1588dc1b2cc5",
        "beginDate": "2025-12-23T18:00:00",
        "duration": "120"
    },
    {
        "id": "2",
        "standId": "4",
        "userId": "a81699b9-94d1-4f72-9df4-1588dc1b2cc5",
        "beginDate": "2025-12-23T21:00:00",
        "duration": "60"
    },
    {
        "id": "3",
        "standId": "5",
        "userId": "a81699b9-94d1-4f72-9df4-1588dc1b2cc5",
        "beginDate": "2025-12-27T21:00:00",
        "duration": "120"
    }
];


let comments_golden_book = [
    {
        "id": "1a8d8f63-3ef8-4c5f-a482-97afaa1c3d93",
        "iduser": "c38acd4c-d6fc-4a19-bd24-98a7c18fa414",
        "commentaire": "Super festival, j’ai adoré les projections.",
        "date": "2023-05-05T14:32:00"
    },
    {
        "id": "c4b708ef-47b2-47c0-a548-4bb9dcbe8b92",
        "iduser": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "commentaire": "Organisation impeccable et invités prestigieux.",
        "date": "2023-05-06T10:12:00"
    },
    {
        "id": "f15c8bfa-2e11-4d44-86cf-dbc665bf0d59",
        "iduser": "fa1b7ea7-c35c-488d-b7e1-7fb893b97590",
        "commentaire": "Ambiance incroyable, j’ai passé un super moment.",
        "date": "2023-05-07T18:44:00"
    }
]

let genres = [
    {"id": 1, "name": "Drame"},
    {"id": 2, "name": "Crime"},
    {"id": 3, "name": "Thriller"},
    {"id": 4, "name": "Biographie"},
    {"id": 5, "name": "Science-Fiction"},
    {"id": 6, "name": "Aventure"},
    {"id": 7, "name": "Western"},
    {"id": 8, "name": "Musical"},
    {"id": 9, "name": "Famille"},
    {"id": 10, "name": "Romance"},
    {"id": 11, "name": "Action"},
    {"id": 12, "name": "Fantasy"},
    {"id": 13, "name": "Comédie"}
]

let film_genres = [
    {"filmId": "6f207e95-5400-471f-a933-d01d817b0608", "genreId": 1},
    {"filmId": "6f207e95-5400-471f-a933-d01d817b0608", "genreId": 2},
    {"filmId": "b58b41e4-7f5d-452b-af72-9301dafa7896", "genreId": 2},
    {"filmId": "b58b41e4-7f5d-452b-af72-9301dafa7896", "genreId": 3},
    {"filmId": "6cec5c18-d60b-4372-916a-482bb4facaa0", "genreId": 4},
    {"filmId": "6cec5c18-d60b-4372-916a-482bb4facaa0", "genreId": 1},
    {"filmId": "9b4ced38-53ef-4a87-89f3-a791ce326093", "genreId": 5},
    {"filmId": "9b4ced38-53ef-4a87-89f3-a791ce326093", "genreId": 3},
    {"filmId": "e0f3b1c2-16b9-4504-8593-872d92b6f892", "genreId": 5},
    {"filmId": "e0f3b1c2-16b9-4504-8593-872d92b6f892", "genreId": 6},
    {"filmId": "2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913", "genreId": 7},
    {"filmId": "2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913", "genreId": 1},
    {"filmId": "f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44", "genreId": 5},
    {"filmId": "f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44", "genreId": 9},
    {"filmId": "c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77", "genreId": 4},
    {"filmId": "c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77", "genreId": 8},
    {"filmId": "e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22", "genreId": 2},
    {"filmId": "e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22", "genreId": 1},
    {"filmId": "f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f", "genreId": 13},
    {"filmId": "f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f", "genreId": 9},
    {"filmId": "a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c", "genreId": 3},
    {"filmId": "a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c", "genreId": 1},
    {"filmId": "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e", "genreId": 1},
    {"filmId": "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e", "genreId": 10},
    {"filmId": "c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f", "genreId": 11},
    {"filmId": "c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f", "genreId": 3},
    {"filmId": "d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a", "genreId": 10},
    {"filmId": "d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a", "genreId": 1},
    {"filmId": "e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b", "genreId": 3},
    {"filmId": "e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b", "genreId": 2},
    {"filmId": "f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c", "genreId": 1},
    {"filmId": "f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c", "genreId": 2},
    {"filmId": "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d", "genreId": 12},
    {"filmId": "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d", "genreId": 6}
];

let film_cast = [
    { "film_id": "6f207e95-5400-471f-a933-d01d817b0608", "user_id": "003f7a03-fbc7-48d3-a9a7-6fa949e88cdd" },
    { "film_id": "6f207e95-5400-471f-a933-d01d817b0608", "user_id": "3952f2aa-8d02-4306-b814-f5b4405ed2a3" },
    { "film_id": "b58b41e4-7f5d-452b-af72-9301dafa7896", "user_id": "3952f2aa-8d02-4306-b814-f5b4405ed2a3" },
    { "film_id": "b58b41e4-7f5d-452b-af72-9301dafa7896", "user_id": "003f7a03-fbc7-48d3-a9a7-6fa949e88cdd" },
    { "film_id": "6cec5c18-d60b-4372-916a-482bb4facaa0", "user_id": "4287f507-81a0-4c98-9b50-5df6bc60aa89" },
    { "film_id": "6cec5c18-d60b-4372-916a-482bb4facaa0", "user_id": "cf64a893-fe05-44ea-bf3a-d86e6f39dc55" },
    { "film_id": "9b4ced38-53ef-4a87-89f3-a791ce326093", "user_id": "003f7a03-fbc7-48d3-a9a7-6fa949e88cdd" },
    { "film_id": "9b4ced38-53ef-4a87-89f3-a791ce326093", "user_id": "83830343-26a0-400d-b491-8fd6c4d4bc80" },
    { "film_id": "e0f3b1c2-16b9-4504-8593-872d92b6f892", "user_id": "4287f507-81a0-4c98-9b50-5df6bc60aa89" },
    { "film_id": "e0f3b1c2-16b9-4504-8593-872d92b6f892", "user_id": "83830343-26a0-400d-b491-8fd6c4d4bc80" },
    { "film_id": "2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913", "user_id": "4287f507-81a0-4c98-9b50-5df6bc60aa89" },
    { "film_id": "2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913", "user_id": "cf64a893-fe05-44ea-bf3a-d86e6f39dc55" },
    { "film_id": "f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44", "user_id": "9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66" },
    { "film_id": "f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44", "user_id": "cf64a893-fe05-44ea-bf3a-d86e6f39dc55" },
    { "film_id": "c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77", "user_id": "7b8c9d0e-1a2b-4c3d-8f4a-5b6c7d8e9f01" },
    { "film_id": "c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77", "user_id": "83830343-26a0-400d-b491-8fd6c4d4bc80" },
    { "film_id": "e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22", "user_id": "3952f2aa-8d02-4306-b814-f5b4405ed2a3" },
    { "film_id": "e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22", "user_id": "003f7a03-fbc7-48d3-a9a7-6fa949e88cdd" },
    { "film_id": "f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f", "user_id": "83830343-26a0-400d-b491-8fd6c4d4bc80" },
    { "film_id": "f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f", "user_id": "9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66" },
    { "film_id": "a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c", "user_id": "4287f507-81a0-4c98-9b50-5df6bc60aa89" },
    { "film_id": "a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c", "user_id": "7b8c9d0e-1a2b-4c3d-8f4a-5b6c7d8e9f01" },
    { "film_id": "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e", "user_id": "9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66" },
    { "film_id": "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e", "user_id": "cf64a893-fe05-44ea-bf3a-d86e6f39dc55" },
    { "film_id": "c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f", "user_id": "003f7a03-fbc7-48d3-a9a7-6fa949e88cdd" },
    { "film_id": "c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f", "user_id": "3952f2aa-8d02-4306-b814-f5b4405ed2a3" },
    { "film_id": "d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a", "user_id": "003f7a03-fbc7-48d3-a9a7-6fa949e88cdd" },
    { "film_id": "d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a", "user_id": "cf64a893-fe05-44ea-bf3a-d86e6f39dc55" },
    { "film_id": "e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b", "user_id": "cf64a893-fe05-44ea-bf3a-d86e6f39dc55" },
    { "film_id": "e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b", "user_id": "3952f2aa-8d02-4306-b814-f5b4405ed2a3" },
    { "film_id": "f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c", "user_id": "9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66" },
    { "film_id": "f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c", "user_id": "3952f2aa-8d02-4306-b814-f5b4405ed2a3" },
    { "film_id": "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d", "user_id": "4287f507-81a0-4c98-9b50-5df6bc60aa89" },
    { "film_id": "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d", "user_id": "83830343-26a0-400d-b491-8fd6c4d4bc80" }
];


let films = [
    {
        "id": "6f207e95-5400-471f-a933-d01d817b0608",
        "title": "Killers of the Flower Moon",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "2023-10-20",
        "poster": "killers_moon.jpg",
        "description": "Une sombre histoire de meurtres dans la nation Osage dans les années 1920",
        "duration": 206,
    },
    {
        "id": "b58b41e4-7f5d-452b-af72-9301dafa7896",
        "title": "Pulp Fiction",
        "director_id": "e55733ef-f3d2-447d-94db-9e3aaef624c1",
        "release_date": "1994-10-14",
        "poster": "pulp_fiction.jpg",
        "description": "Histoires entrelacées de gangsters à Los Angeles",
        "duration": 154,
    },
    {
        "id": "6cec5c18-d60b-4372-916a-482bb4facaa0",
        "title": "Oppenheimer",
        "director_id": "f68ab44a-557b-4d44-b1df-a38f894c2dca",
        "release_date": "2023-07-21",
        "poster": "oppenheimer.jpg",
        "description": "L'histoire du père de la bombe atomique",
        "duration": 180,
    },
    {
        "id": "9b4ced38-53ef-4a87-89f3-a791ce326093",
        "title": "Inception",
        "director_id": "f68ab44a-557b-4d44-b1df-a38f894c2dca",
        "release_date": "2010-07-16",
        "poster": "inception.jpg",
        "description": "Un voleur qui s'infiltre dans les rêves",
        "duration": 148,
    },
    {
        "id": "e0f3b1c2-16b9-4504-8593-872d92b6f892",
        "title": "Dune",
        "director_id": "c92c742a-baf6-4cc0-9a50-941ddfe55f8c",
        "release_date": "2021-09-15",
        "poster": "dune.jpg",
        "description": "L'épopée de Paul Atréides sur la planète désertique Arrakis",
        "duration": 155,
    },
    {
        "id": "2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913",
        "title": "The Power of the Dog",
        "director_id": "f68ab44a-557b-4d44-b1df-a38f894c2dca",
        "release_date": "2021-11-17",
        "poster": "power_dog.jpg",
        "description": "Un rancher cruel dont la vie bascule avec l'arrivée de sa belle-soeur",
        "duration": 126,
    },
    {
        "id": "f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44",
        "title": "E.T. l'extra-terrestre",
        "director_id": "e1fbdadd-fd8f-4a6d-b0cb-f8c77b3e7238",
        "release_date": "1982-06-11",
        "poster": "et.jpg",
        "description": "Un enfant aide un extraterrestre à rentrer chez lui",
        "duration": 115,
    },
    {
        "id": "c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77",
        "title": "La Vie en Rose",
        "director_id": "a34ad28d-e276-4b8e-8bdf-aa162f6d4df1",
        "release_date": "2007-02-14",
        "poster": "lavieenrose.jpg",
        "description": "La vie tumultueuse d'Édith Piaf",
        "duration": 140,
    },
    {
        "id": "e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22",
        "title": "The Godfather",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "1972-03-24",
        "poster": "godfather.jpg",
        "description": "L'histoire de la famille mafieuse Corleone",
        "duration": 175,
    },
    {
        "id": "f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f",
        "title": "Barbie",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "2023-07-21",
        "poster": "barbie.jpg",
        "description": "Barbie quitte Barbie Land pour le monde réel",
        "duration": 114,
    },
    {
        "id": "a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c",
        "title": "Joker",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "2019-10-04",
        "poster": "joker.jpg",
        "description": "La transformation d'Arthur Fleck en célèbre vilain",
        "duration": 122,
    },
    {
        "id": "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e",
        "title": "Forrest Gump",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "1994-07-06",
        "poster": "forrestgump.jpg",
        "description": "L'histoire extraordinaire d'un homme simple au grand coeur",
        "duration": 142,
    },
    {
        "id": "c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f",
        "title": "The Dark Knight",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "2008-07-18",
        "poster": "darkknight.jpg",
        "description": "Batman affronte le chaos du Joker à Gotham City",
        "duration": 152,
    },
    {
        "id": "d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a",
        "title": "Titanic",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "1997-12-19",
        "poster": "titanic.jpg",
        "description": "Histoire d'amour à bord du paquebot maudit",
        "duration": 195,
    },
    {
        "id": "e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b",
        "title": "The Silence of the Lambs",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "1991-02-14",
        "poster": "silence_lambs.jpg",
        "description": "Une jeune agent du FBI consulte un tueur en série emprisonné",
        "duration": 118,
    },
    {
        "id": "f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c",
        "title": "The Shawshank Redemption",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "1994-10-14",
        "poster": "shawshank.jpg",
        "description": "L'histoire de l'amitié entre deux prisonniers",
        "duration": 142,
    },
    {
        "id": "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d",
        "title": "The Lord of the Rings: The Return of the King",
        "director_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "release_date": "2003-12-17",
        "poster": "lotr_return.jpg",
        "description": "La conclusion de l'épopée de la Terre du Milieu",
        "duration": 201,
    }
];

//Votes des utilisateurs : 1 vote max par catégorie
let votes = [
    { id: "vote-1", userId: "922ea3e9-2921-46b0-a4e9-73eb06baa45d", filmId: "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d", category: "Meilleur scénario" },
    { id: "vote-2", userId: "922ea3e9-2921-46b0-a4e9-73eb06baa45d", filmId: "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d", category: "Meilleurs effets visuels" },
    { id: "vote-3", userId: "e41f5d21-1c7d-4f3b-8a9c-3b12a44cd001", filmId: "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d", category: "Prix du public" }
];// Format : { id, userId, filmId, category }


//Scores des films par catégorie
let votes_score = {
    "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d": {
        "Meilleur scenario": 1,
        "Meilleurs effets visuels": 1,
        "Prix du public": 1
    },

    // On initialise aussi les autres films existants avec 0 point
    // ⚠ Mets bien leurs vrais IDs ici (copie-colle depuis TON data.js)
    "f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c": {
        "Meilleur scenario": 0,
        "Meilleurs effets visuels": 0,
        "Prix du public": 0
    },
    "e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b": {
        "Meilleur scenario": 0,
        "Meilleurs effets visuels": 0,
        "Prix du public": 0
    }
}// Format : { filmId: { "Meilleur scénario": 0, "Meilleurs effets visuels": 0, "Prix du public": 1 } }



let film_tickets = [
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "d3f2a1b0-7c5e-4d6f-8b9a-1e2c3d4f5b6a",
        "idticket": "e1b2c3d4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        "datefrom": "2025-03-18T14:00:00",
        "dateto": "2025-03-18T17:26:00",
        "priceid": "1"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "b2e3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        "idticket": "f7e6d5c4-3b2a-1e0f-9d8c-7b6a5c4d3e2f",
        "datefrom": "2025-03-19T18:00:00",
        "dateto": "2025-03-19T20:34:00",
        "priceid": "2"
    },
    {
        "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f",
        "idfilm": "c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f",
        "idticket": "d5c6b7a8-9e0f-1d2c-3b4a-5e6f7a8b9c0d",
        "datefrom": "2025-03-20T20:00:00",
        "dateto": "2025-03-20T23:00:00",
        "priceid": "1"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        "idticket": "c6d7e8f9-0a1b-2c3d-4e5f-6a7b8c9d0e1f",
        "datefrom": "2025-03-21T16:30:00",
        "dateto": "2025-03-21T18:58:00",
        "priceid": "2"
    },
    {
        "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f",
        "idfilm": "f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
        "idticket": "b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
        "datefrom": "2025-03-22T14:00:00",
        "dateto": "2025-03-22T16:35:00",
        "priceid": "1"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        "idticket": "a8b9c0d1-2e3f-4a5b-6c7d-8e9f0a1b2c3d",
        "datefrom": "2025-03-23T15:00:00",
        "dateto": "2025-03-23T17:06:00",
        "priceid": "3"
    },
    {
        "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f",
        "idfilm": "b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
        "idticket": "e9f0a1b2-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
        "datefrom": "2025-03-24T21:00:00",
        "dateto": "2025-03-24T22:55:00",
        "priceid": "1"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
        "idticket": "f0a1b2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
        "datefrom": "2025-03-25T19:30:00",
        "dateto": "2025-03-25T21:50:00",
        "priceid": "2"
    },
    {
        "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f",
        "idfilm": "d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a",
        "idticket": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        "datefrom": "2025-03-26T20:00:00",
        "dateto": "2025-03-26T22:55:00",
        "priceid": "1"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
        "idticket": "b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        "datefrom": "2025-03-27T18:00:00",
        "dateto": "2025-03-27T19:54:00",
        "priceid": "3"
    },
    {
        "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f",
        "idfilm": "f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c",
        "idticket": "c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
        "datefrom": "2025-03-28T17:30:00",
        "dateto": "2025-03-28T19:32:00",
        "priceid": "1"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
        "idticket": "d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
        "datefrom": "2025-03-29T16:00:00",
        "dateto": "2025-03-29T18:22:00",
        "priceid": "2"
    },
    {
        "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f",
        "idfilm": "b4c5d6e7-8f9a-0b1c-2d3e-4f5a6b7c8d9e",
        "idticket": "e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        "datefrom": "2025-03-30T14:30:00",
        "dateto": "2025-03-30T17:02:00",
        "priceid": "3"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
        "idticket": "f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
        "datefrom": "2025-03-31T20:30:00",
        "dateto": "2025-03-31T23:45:00",
        "priceid": "1"
    },
    {
        "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f",
        "idfilm": "d6e7f8a9-0b1c-2d3e-4f5a-6b7c8d9e0f1a",
        "idticket": "a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        "datefrom": "2025-04-01T19:00:00",
        "dateto": "2025-04-01T20:58:00",
        "priceid": "2"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "e7f8a9b0-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
        "idticket": "b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
        "datefrom": "2025-04-02T15:00:00",
        "dateto": "2025-04-02T17:22:00",
        "priceid": "3"
    },
    {
        "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f",
        "idfilm": "f8a9b0c1-2d3e-4f5a-6b7c-8d9e0f1a2b3c",
        "idticket": "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
        "datefrom": "2025-04-03T18:30:00",
        "dateto": "2025-04-03T21:51:00",
        "priceid": "1"
    },
    {
        "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a",
        "idfilm": "a9b0c1d2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",
        "idticket": "d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a",
        "datefrom": "2025-04-04T21:00:00",
        "dateto": "2025-04-05T00:26:00",
        "priceid": "2"
    }
];

let provider_requests = [
    {
        "id": "1",
        "name": "prestatest",
        "login": "prestatest",
        "password": "prestatest",
        "email2": "prestatest@prestatest.com",
        "email": "prestatest@prestatest.com",
        "droit": "1",
        "date": "2023-05-02T23:59:59"
    }
]

// Association entre prestataires et services avec état spécifique
let provider_services_associations = [
    {
        "user_id": "1",            // ID du prestataire
        "service_id": "1",         // ID du service
        "service_state_id": "1"    // État choisi par ce prestataire
    },
    {
        "user_id": "1",
        "service_id": "2",
        "service_state_id": "2"
    },
    {
        "user_id": "2",
        "service_id": "1",
        "service_state_id": "2"
    }
];

// Services disponibles
let provider_services = [
    {"id": "1", "label": "Goodies", "categorie_id": "1"},
    {"id": "2", "label": "Dédicaces", "categorie_id": "2"},
    {"id": "3", "label": "Livre d'or", "categorie_id": "3"}
];

// États possibles
let provider_services_state = [
    {"id": "1", "state": "Activé"},
    {"id": "2", "state": "Desactivé"},
    {"id": "3", "state": "Suspendu"}
];

// Catégories de services
let provider_services_categories = [
    {"id": "1", "name": "Vente"},
    {"id": "2", "name": "Rencontre"},
    {"id": "3", "name": "Commentaires"}
];


export {
    users,
    tickets,
    tickets_price,
    stands,
    comments_golden_book,
    goodies,
    goodies_size,
    goodies_color,
    color, size,
    basket,
    basket_items,
    film_tickets,
    films,
    votes,
    votes_score,
    provider_requests,

    provider_services_state,
    provider_services_categories,
    provider_services_associations,
    provider_services,
    standTypes,
    reservations,
    projections,
    films_reservations,
    autographs_reservations,
    autographs, genres, film_genres, film_cast

}