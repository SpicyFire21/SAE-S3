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
        "description": ""
    },
    {
        "id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "name": "Martin Scorsese",
        "login": "presta",
        "password": "presta",
        "email": "scorsese@cinema.com",
        "droit": "1",
        "session": "",
        "note": [0,0.5,1,1.5,2,2.5,1,5,4,4.5,5,5,5,5,5],
        "type":"Réalisateur",
        "nom_photo":"scorsese.jpg",
        "description":"Réalisateur légendaire oscarisé, maître du cinéma américain"
    },
    {
        "id": "c38acd4c-d6fc-4a19-bd24-98a7c18fa414",
        "name": "",
        "login": "client",
        "password": "client",
        "email": "client@mail.com",
        "droit": "0",
        "session": "",
        "note": [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"",
        "nom_photo":"producteur.jpg",
        "description":""
    },
    {
        "id": "d4e9116b-e3e8-4e0e-8a3b-6a93e1d6c4f4",
        "name": "",
        "login": "client2",
        "password": "client2",
        "email": "client2@mail.com",
        "droit": "0",
        "session": "",
        "note": [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"",
        "nom_photo":"",
        "description":""
    },
    {
        "id": "e55733ef-f3d2-447d-94db-9e3aaef624c1",
        "name": "Quentin Tarantino",
        "login": "prestaknaghui",
        "password": "prestaknaghui",
        "email": "tarantino@pulp.com",
        "droit": "1",
        "session": "",
        "note": [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Réalisateur",
        "nom_photo":"tarantino.jpg",
        "description":"Créateur de Pulp Fiction et Kill Bill, style unique et référencé"
    },
    {
        "id": "f68ab44a-557b-4d44-b1df-a38f894c2dca",
        "name":"Christopher Nolan",
        "login":"prestaknaghui V2",
        "password":"prestakhnaghui V2",
        "email":"nolan@inception.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Réalisateur",
        "nom_photo":"nolan.jpg",
        "description":"Génie des films à intrigue complexe et effets visuels innovants"
    },
    {
        "id": "a81699b9-94d1-4f72-9df4-1588dc1b2cc5",
        "name":"Leonardo DiCaprio",
        "login":"cityxl",
        "password":"cityxl",
        "email":"dicaprio@actor.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Acteur",
        "nom_photo":"dicaprio.jpg",
        "description":"Acteur oscarisé, star internationale"
    },
    {
        "id": "bd2adbd5-67b5-4e0e-a06a-7fab0d2e391c",
        "name":"Meryl Streep",
        "login":"mstreep",
        "password":"mstreep",
        "email":"streep@actress.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Actrice",
        "nom_photo":"streep.jpg",
        "description":"L'actrice la plus nominée aux Oscars"
    },
    {
        "id": "c92c742a-baf6-4cc0-9a50-941ddfe55f8c",
        "name":"Denis Villeneuve",
        "login":"dvilleneuve",
        "password":"dvilleneuve",
        "email":"villeneuve@sci-fi.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Réalisateur",
        "nom_photo":"villeneuve.jpg",
        "description":"Maître de la science-fiction moderne"
    },
    {
        "id": "db7a70fa-ff5e-421b-987e-7ca4ab65eb31",
        "name":"Cate Blanchett",
        "login":"cblanchett",
        "password":"cblanchett",
        "email":"blanchett@actress.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Actrice",
        "nom_photo":"blanchett.jpg",
        "description":"Actrice australienne doublement oscarisée"
    },
    {
        "id":"e1fbdadd-fd8f-4a6d-b0cb-f8c77b3e7238",
        "name":"Steven Spielberg",
        "login":"sspielberg",
        "password":"sspielberg",
        "email":"spielberg@films.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Réalisateur",
        "nom_photo":"spielberg.jpg",
        "description":"Légende du cinéma"
    },
    {
        "id":"fa1b7ea7-c35c-488d-b7e1-7fb893b97590",
        "name":"Marion Cotillard",
        "login":"mcotillard",
        "password":"mcotillard",
        "email":"cotillard@actress.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Actrice",
        "nom_photo":"cotillard.jpg",
        "description":"Actrice française oscarisée"
    },
    {
        "id":"b2533589-a4f4-476b-bdc9-1cdebbcb5e06",
        "name":"Al Pacino",
        "login":"apacino",
        "password":"apacino",
        "email":"pacino@actor.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Acteur",
        "nom_photo":"pacino.jpg",
        "description":"Icône du cinéma"
    },
    {
        "id":"c0debc4d-c621-4b4d-9404-97d59a653d4b",
        "name":"Jane Campion",
        "login":"jcampioni",
        "password":"jcampioni",
        "email":"campion@director.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Réalisatrice",
        "nom_photo":"campion.jpg",
        "description":"Réalisatrice néo-zélandaise"
    },
    {
        "id":"dcded2e8-4c67-4b2b-b369-d0c13bec2c0c",
        "name":"Joaquin Phoenix",
        "login":"jphoenix",
        "password":"jphoenix",
        "email":"phoenix@actor.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Acteur",
        "nom_photo":"phoenix.jpg",
        "description":"Acteur oscarisé"
    },
    {
        "id":"eac2c01b-937f-4b14-a48c-7d9b4ab5c236",
        "name":"Greta Gerwig",
        "login":"ggerwig",
        "password":"ggerwig",
        "email":"gerwig@director.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Réalisatrice",
        "nom_photo":"gerwig.jpg",
        "description":"Réalisatrice acclamée"
    },
    {
        "id":"f1b92326-1e85-49af-8cf7-2270e2e725e8",
        "name":"Tom Hanks",
        "login":"thanks",
        "password":"thanks",
        "email":"hanks@actor.com",
        "droit":"1",
        "session":"",
        "note":[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        "type":"Acteur",
        "nom_photo":"hanks.jpg",
        "description":"Acteur emblématique"
    }
]

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
        "idstand": "2d84bd8c-8cab-49c7-9d7b-1e5f60bb6e7e",
        "name": "stand 1"
    },
    {
        "idstand": "a7fd90b4-2115-4ae1-a3d5-6bc696635df3",
        "name": "stand 2"
    },
    {
        "idstand": "c5f0e14d-76ae-4f28-a3bc-3d8183e77897",
        "name": "stand 3"
    }
]

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


let basket = [
    {
        "id": "0f8fad5b-d9cb-469f-a165-70867728950e",
        "iduser":"3e5a7c6b-4f6d-4c8d-b1f5-1a2b3c4d5e6f",
        "date": "2025-03-18",
        "state": "0",
        "is_order": true,
        "iditems":"f47ac10b-58cc-4372-a567-0e02b2c3d479"
    }
];

let basket_items = [
    {
        "idbasket":"0f8fad5b-d9cb-469f-a165-70867728950e",
        "idgoodies":"f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "count":"5"
    }
];

let films = [
    {
        "id": "6f207e95-5400-471f-a933-d01d817b0608",
        "title": "Killers of the Flower Moon",
        "director_id": "a34ad28d-e276-4b8e-8bdf-aa162f6d4df1",
        "cast_ids": ["003f7a03-fbc7-48d3-a9a7-6fa949e88cdd", "3952f2aa-8d02-4306-b814-f5b4405ed2a3"],
        "genres": ["Drame", "Crime"],
        "release_date": "2023-10-20",
        "poster": "killers_moon.jpg",
        "description": "Une sombre histoire de meurtres dans la nation Osage dans les années 1920",
        "duration": 206
    },
    {
        "id": "b58b41e4-7f5d-452b-af72-9301dafa7896",
        "title": "Pulp Fiction",
        "director_id": "4b0a59d0-f47c-4f30-bf4f-f39985cc7f42",
        "cast_ids": ["3952f2aa-8d02-4306-b814-f5b4405ed2a3", "003f7a03-fbc7-48d3-a9a7-6fa949e88cdd"],
        "genres": ["Crime", "Thriller"],
        "release_date": "1994-10-14",
        "poster": "pulp_fiction.jpg",
        "description": "Histoires entrelacées de gangsters à Los Angeles",
        "duration": 154
    },
    {
        "id": "6cec5c18-d60b-4372-916a-482bb4facaa0",
        "title": "Oppenheimer",
        "director_id": "aa1c4585-e9c4-4e0a-8cb8-b21fe3ed9858",
        "cast_ids": ["4287f507-81a0-4c98-9b50-5df6bc60aa89", "cf64a893-fe05-44ea-bf3a-d86e6f39dc55"],
        "genres": ["Biographie", "Drame"],
        "release_date": "2023-07-21",
        "poster": "oppenheimer.jpg",
        "description": "L'histoire du père de la bombe atomique",
        "duration": 180
    },
    {
        "id": "9b4ced38-53ef-4a87-89f3-a791ce326093",
        "title": "Inception",
        "director_id": "aa1c4585-e9c4-4e0a-8cb8-b21fe3ed9858",
        "cast_ids": ["003f7a03-fbc7-48d3-a9a7-6fa949e88cdd", "83830343-26a0-400d-b491-8fd6c4d4bc80"],
        "genres": ["Science-Fiction", "Thriller"],
        "release_date": "2010-07-16",
        "poster": "inception.jpg",
        "description": "Un voleur qui s'infiltre dans les rêves",
        "duration": 148
    },
    {
        "id": "e0f3b1c2-16b9-4504-8593-872d92b6f892",
        "title": "Dune",
        "director_id": "c0f1e4f7-64d4-4d0c-82b8-99543b4fae12",
        "cast_ids": ["4287f507-81a0-4c98-9b50-5df6bc60aa89", "83830343-26a0-400d-b491-8fd6c4d4bc80"],
        "genres": ["Science-Fiction", "Aventure"],
        "release_date": "2021-09-15",
        "poster": "dune.jpg",
        "description": "L'épopée de Paul Atréides sur la planète désertique Arrakis",
        "duration": 155
    },
    {
        "id": "2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913",
        "title": "The Power of the Dog",
        "director_id": "f1c4d6e7-72f3-4c8f-a876-1f5b0e9c8c33",
        "cast_ids": ["4287f507-81a0-4c98-9b50-5df6bc60aa89", "cf64a893-fe05-44ea-bf3a-d86e6f39dc55"],
        "genres": ["Western", "Drame"],
        "release_date": "2021-11-17",
        "poster": "power_dog.jpg",
        "description": "Un rancher cruel dont la vie bascule avec l'arrivée de sa belle-soeur",
        "duration": 126
    },
    {
        "id": "f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44",
        "title": "E.T. l'extra-terrestre",
        "director_id": "d1a2f4c3-7b9e-4f1b-9c44-2e5b7a0c1d11",
        "cast_ids": ["9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66", "cf64a893-fe05-44ea-bf3a-d86e6f39dc55"],
        "genres": ["Science-Fiction", "Famille"],
        "release_date": "1982-06-11",
        "poster": "et.jpg",
        "description": "Un enfant aide un extraterrestre à rentrer chez lui",
        "duration": 115
    },
    {
        "id": "c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77",
        "title": "La Vie en Rose",
        "director_id": "a34ad28d-e276-4b8e-8bdf-aa162f6d4df1",
        "cast_ids": ["7b8c9d0e-1a2b-4c3d-8f4a-5b6c7d8e9f01", "83830343-26a0-400d-b491-8fd6c4d4bc80"],
        "genres": ["Biographie", "Musical"],
        "release_date": "2007-02-14",
        "poster": "lavieenrose.jpg",
        "description": "La vie tumultueuse d'Édith Piaf",
        "duration": 140
    },
    {
        "id": "e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22",
        "title": "The Godfather",
        "director_id": "a34ad28d-e276-4b8e-8bdf-aa162f6d4df1",
        "cast_ids": ["3952f2aa-8d02-4306-b814-f5b4405ed2a3", "003f7a03-fbc7-48d3-a9a7-6fa949e88cdd"],
        "genres": ["Crime", "Drame"],
        "release_date": "1972-03-24",
        "poster": "godfather.jpg",
        "description": "L'histoire de la famille mafieuse Corleone",
        "duration": 175
    },
    {
        "id": "f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f",
        "title": "Barbie",
        "director_id": "d5c4b3a2-1e0f-4d6a-8b7c-2a1b3c4d5e6f",
        "cast_ids": ["83830343-26a0-400d-b491-8fd6c4d4bc80", "9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66"],
        "genres": ["Comédie", "Famille"],
        "release_date": "2023-07-21",
        "poster": "barbie.jpg",
        "description": "Barbie quitte Barbie Land pour le monde réel",
        "duration": 114
    },
    {
        "id": "a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c",
        "title": "Joker",
        "director_id": "4b0a59d0-f47c-4f30-bf4f-f39985cc7f42",
        "cast_ids": ["4287f507-81a0-4c98-9b50-5df6bc60aa89", "7b8c9d0e-1a2b-4c3d-8f4a-5b6c7d8e9f01"],
        "genres": ["Thriller", "Drame"],
        "release_date": "2019-10-04",
        "poster": "joker.jpg",
        "description": "La transformation d'Arthur Fleck en célèbre vilain",
        "duration": 122
    },
    {
        "id": "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e",
        "title": "Forrest Gump",
        "director_id": "d1a2f4c3-7b9e-4f1b-9c44-2e5b7a0c1d11",
        "cast_ids": ["9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66", "cf64a893-fe05-44ea-bf3a-d86e6f39dc55"],
        "genres": ["Drame", "Romance"],
        "release_date": "1994-07-06",
        "poster": "forrestgump.jpg",
        "description": "L'histoire extraordinaire d'un homme simple au grand coeur",
        "duration": 142
    },
    {
        "id": "c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f",
        "title": "The Dark Knight",
        "director_id": "aa1c4585-e9c4-4e0a-8cb8-b21fe3ed9858",
        "cast_ids": ["003f7a03-fbc7-48d3-a9a7-6fa949e88cdd", "3952f2aa-8d02-4306-b814-f5b4405ed2a3"],
        "genres": ["Action", "Thriller"],
        "release_date": "2008-07-18",
        "poster": "darkknight.jpg",
        "description": "Batman affronte le chaos du Joker à Gotham City",
        "duration": 152
    },
    {
        "id": "d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a",
        "title": "Titanic",
        "director_id": "a34ad28d-e276-4b8e-8bdf-aa162f6d4df1",
        "cast_ids": ["003f7a03-fbc7-48d3-a9a7-6fa949e88cdd", "cf64a893-fe05-44ea-bf3a-d86e6f39dc55"],
        "genres": ["Romance", "Drame"],
        "release_date": "1997-12-19",
        "poster": "titanic.jpg",
        "description": "Histoire d'amour à bord du paquebot maudit",
        "duration": 195
    },
    {
        "id": "e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b",
        "title": "The Silence of the Lambs",
        "director_id": "4b0a59d0-f47c-4f30-bf4f-f39985cc7f42",
        "cast_ids": ["cf64a893-fe05-44ea-bf3a-d86e6f39dc55", "3952f2aa-8d02-4306-b814-f5b4405ed2a3"],
        "genres": ["Thriller", "Crime"],
        "release_date": "1991-02-14",
        "poster": "silence_lambs.jpg",
        "description": "Une jeune agent du FBI consulte un tueur en série emprisonné",
        "duration": 118
    },
    {
        "id": "f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c",
        "title": "The Shawshank Redemption",
        "director_id": "d1a2f4c3-7b9e-4f1b-9c44-2e5b7a0c1d11",
        "cast_ids": ["9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66", "3952f2aa-8d02-4306-b814-f5b4405ed2a3"],
        "genres": ["Drame", "Crime"],
        "release_date": "1994-10-14",
        "poster": "shawshank.jpg",
        "description": "L'histoire de l'amitié entre deux prisonniers",
        "duration": 142
    },
    {
        "id": "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d",
        "title": "The Lord of the Rings: The Return of the King",
        "director_id": "c0f1e4f7-64d4-4d0c-82b8-99543b4fae12",
        "cast_ids": ["4287f507-81a0-4c98-9b50-5df6bc60aa89", "83830343-26a0-400d-b491-8fd6c4d4bc80"],
        "genres": ["Fantasy", "Aventure"],
        "release_date": "2003-12-17",
        "poster": "lotr_return.jpg",
        "description": "La conclusion de l'épopée de la Terre du Milieu",
        "duration": 201
    }
];


let film_tickets = [
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "d3f2a1b0-7c5e-4d6f-8b9a-1e2c3d4f5b6a", "idticket": "e1b2c3d4-5f6a-7b8c-9d0e-1f2a3b4c5d6e", "datefrom": "2025-03-18T14:00:00", "dateto": "2025-03-18T17:26:00", "priceid": "1" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "b2e3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e", "idticket": "f7e6d5c4-3b2a-1e0f-9d8c-7b6a5c4d3e2f", "datefrom": "2025-03-19T18:00:00", "dateto": "2025-03-19T20:34:00", "priceid": "2" },
    { "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f", "idfilm": "c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f", "idticket": "d5c6b7a8-9e0f-1d2c-3b4a-5e6f7a8b9c0d", "datefrom": "2025-03-20T20:00:00", "dateto": "2025-03-20T23:00:00", "priceid": "1" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b", "idticket": "c6d7e8f9-0a1b-2c3d-4e5f-6a7b8c9d0e1f", "datefrom": "2025-03-21T16:30:00", "dateto": "2025-03-21T18:58:00", "priceid": "2" },
    { "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f", "idfilm": "f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c", "idticket": "b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e", "datefrom": "2025-03-22T14:00:00", "dateto": "2025-03-22T16:35:00", "priceid": "1" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d", "idticket": "a8b9c0d1-2e3f-4a5b-6c7d-8e9f0a1b2c3d", "datefrom": "2025-03-23T15:00:00", "dateto": "2025-03-23T17:06:00", "priceid": "3" },
    { "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f", "idfilm": "b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e", "idticket": "e9f0a1b2-3c4d-5e6f-7a8b-9c0d1e2f3a4b", "datefrom": "2025-03-24T21:00:00", "dateto": "2025-03-24T22:55:00", "priceid": "1" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f", "idticket": "f0a1b2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c", "datefrom": "2025-03-25T19:30:00", "dateto": "2025-03-25T21:50:00", "priceid": "2" },
    { "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f", "idfilm": "d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a", "idticket": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d", "datefrom": "2025-03-26T20:00:00", "dateto": "2025-03-26T22:55:00", "priceid": "1" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b", "idticket": "b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e", "datefrom": "2025-03-27T18:00:00", "dateto": "2025-03-27T19:54:00", "priceid": "3" },
    { "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f", "idfilm": "f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c", "idticket": "c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f", "datefrom": "2025-03-28T17:30:00", "dateto": "2025-03-28T19:32:00", "priceid": "1" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d", "idticket": "d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a", "datefrom": "2025-03-29T16:00:00", "dateto": "2025-03-29T18:22:00", "priceid": "2" },
    { "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f", "idfilm": "b4c5d6e7-8f9a-0b1c-2d3e-4f5a6b7c8d9e", "idticket": "e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b", "datefrom": "2025-03-30T14:30:00", "dateto": "2025-03-30T17:02:00", "priceid": "3" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f", "idticket": "f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c", "datefrom": "2025-03-31T20:30:00", "dateto": "2025-03-31T23:45:00", "priceid": "1" },
    { "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f", "idfilm": "d6e7f8a9-0b1c-2d3e-4f5a-6b7c8d9e0f1a", "idticket": "a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d", "datefrom": "2025-04-01T19:00:00", "dateto": "2025-04-01T20:58:00", "priceid": "2" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "e7f8a9b0-1c2d-3e4f-5a6b-7c8d9e0f1a2b", "idticket": "b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e", "datefrom": "2025-04-02T15:00:00", "dateto": "2025-04-02T17:22:00", "priceid": "3" },
    { "iduser": "b3e6d7c8-4f2a-1b3c-9d0e-2f1a3b4c5d6f", "idfilm": "f8a9b0c1-2d3e-4f5a-6b7c-8d9e0f1a2b3c", "idticket": "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f", "datefrom": "2025-04-03T18:30:00", "dateto": "2025-04-03T21:51:00", "priceid": "1" },
    { "iduser": "a1f5c8d0-3b1e-4f2a-9a17-2c6b5f8d3e7a", "idfilm": "a9b0c1d2-3e4f-5a6b-7c8d-9e0f1a2b3c4d", "idticket": "d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a", "datefrom": "2025-04-04T21:00:00", "dateto": "2025-04-05T00:26:00", "priceid": "2" }
];

let provider_requests = [
    {
        "id":"1",
        "name":"prestatest",
        "login":"prestatest",
        "password":"prestatest",
        "email2":"prestatest@prestatest.com",
        "email":"prestatest@prestatest.com",
        "droit":"1",
        "date":"2023-05-02T23:59:59"
    }
]


let goodies = [
    {
        "id": "1",
        "user_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "service_id": "1",
        "goodies_size_id":"1",
        "goodies_color_id":"1",
        "name": "T-shirt",
        "price": 25,
        "quantity": 3,
        "date": "2025-05-01"
    },
    {
        "id": "2",
        "user_id": "bb4b684c-0c67-4d19-ac21-b225b3e5c018",
        "service_id": "1",
        "goodies_size_id":"1",
        "goodies_color_id":"1",
        "name": "Tasse",
        "price": 25,
        "quantity": 31,
        "date": "2025-05-01"
    },

];

let goodies_size = [
    { "id":"1", "label":"XS" },
    { "id":"2", "label":"S" },
    { "id":"3", "label":"M" },
    { "id":"4", "label":"L" },
    { "id":"5", "label":"XL" }
];
let goodies_color = [
    { "id":"1", "label":"Rouge" },
    { "id":"2", "label":"Bleu" },
    { "id":"3", "label":"Vert" },
    { "id":"4", "label":"Noir" },
    { "id":"5", "label":"Blanc" }
];


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
    { "id": "1", "label": "Goodies", "categorie_id": "1" },
    { "id": "2", "label": "Dédicaces", "categorie_id": "2" },
    { "id": "3", "label": "Livre d'or", "categorie_id": "3" }
];

// États possibles
let provider_services_state = [
    { "id": "1", "state": "Activé" },
    { "id": "2", "state": "Desactivé" },
    { "id": "3", "state": "Suspendu" }
];

// Catégories de services
let provider_services_categories = [
    { "id": "1", "name": "Vente" },
    { "id": "2", "name": "Rencontre" },
    { "id": "3", "name": "Commentaires" }
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
    basket,
    basket_items,
    film_tickets,
    films,
    provider_requests,

    provider_services_state,
    provider_services_categories,
    provider_services_associations,
    provider_services

}