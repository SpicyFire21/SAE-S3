let users = [
    {
        "id":"1",
        "name":"",
        "login":"admin",
        "password":"admin",
        "email":"admin@festival.com",
        "droit":"2",
        "session":"",
        "note": "",
        "type": "",
        "nom_photo": "",
        "description": ""
    },
    {
        "id":"2",
        "name":"Martin Scorsese",
        "login":"presta",
        "password":"presta",
        "email":"scorsese@cinema.com",
        "droit":"1",
        "session":"",
        "note": "4.9",
        "type": "Réalisateur",
        "nom_photo": "scorsese.jpg",
        "description": "Réalisateur légendaire oscarisé, maître du cinéma américain"
    },
    {
        "id":"3",
        "name":"",
        "login":"client",
        "password":"client",
        "email":"client@mail.com",
        "droit":"0",
        "session":"",
        "note": "",
        "type": "",
        "nom_photo": "",
        "description": ""
    },
    {
        "id":"4",
        "name":"",
        "login":"client2",
        "password":"client2",
        "email":"client2@mail.com",
        "droit":"0",
        "session":"",
        "note": "",
        "type": "",
        "nom_photo": "",
        "description": ""
    },
    {
        "id":"5",
        "name":"Quentin Tarantino",
        "login":"prestaknaghui",
        "password":"prestakhnaghui",
        "email":"tarantino@pulp.com",
        "droit":"1",
        "session":"",
        "note": "4.8",
        "type": "Réalisateur",
        "nom_photo": "tarantino.jpg",
        "description": "Créateur de Pulp Fiction et Kill Bill, style unique et référencé"
    },
    {
        "id":"6",
        "name":"Christopher Nolan",
        "login":"prestaknaghui V2",
        "password":"prestakhnaghui V2",
        "email":"nolan@inception.com",
        "droit":"1",
        "session":"",
        "note": "4.9",
        "type": "Réalisateur",
        "nom_photo": "nolan.jpg",
        "description": "Génie des films à intrigue complexe et effets visuels innovants"
    },
    {
        "id":"7",
        "name":"Leonardo DiCaprio",
        "login":"cityxl",
        "password":"cityxl",
        "email":"dicaprio@actor.com",
        "droit":"1",
        "session":"",
        "note": "4.7",
        "type": "Acteur",
        "nom_photo": "dicaprio.jpg",
        "description": "Acteur oscarisé, star internationale au talent incontesté"
    },
    {
        "id":"8",
        "name":"Meryl Streep",
        "login":"mstreep",
        "password":"mstreep",
        "email":"streep@actress.com",
        "droit":"1",
        "session":"",
        "note": "4.9",
        "type": "Actrice",
        "nom_photo": "streep.jpg",
        "description": "L'actrice la plus nominée aux Oscars, légende vivante"
    },
    {
        "id":"9",
        "name":"Denis Villeneuve",
        "login":"dvilleneuve",
        "password":"dvilleneuve",
        "email":"villeneuve@sci-fi.com",
        "droit":"1",
        "session":"",
        "note": "4.6",
        "type": "Réalisateur",
        "nom_photo": "villeneuve.jpg",
        "description": "Maître de la science-fiction moderne, réalisateur de Dune"
    },
    {
        "id":"10",
        "name":"Cate Blanchett",
        "login":"cblanchett",
        "password":"cblanchett",
        "email":"blanchett@actress.com",
        "droit":"1",
        "session":"",
        "note": "4.8",
        "type": "Actrice",
        "nom_photo": "blanchett.jpg",
        "description": "Actrice australienne doublement oscarisée, polyvalente et intense"
    },
    {
        "id":"11",
        "name":"Steven Spielberg",
        "login":"sspielberg",
        "password":"sspielberg",
        "email":"spielberg@films.com",
        "droit":"1",
        "session":"",
        "note": "4.9",
        "type": "Réalisateur",
        "nom_photo": "spielberg.jpg",
        "description": "Légende du cinéma, créateur de E.T. et Jurassic Park"
    },
    {
        "id":"12",
        "name":"Marion Cotillard",
        "login":"mcotillard",
        "password":"mcotillard",
        "email":"cotillard@actress.com",
        "droit":"1",
        "session":"",
        "note": "4.7",
        "type": "Actrice",
        "nom_photo": "cotillard.jpg",
        "description": "Actrice française oscarisée, renommée internationale"
    },
    {
        "id":"13",
        "name":"Al Pacino",
        "login":"apacino",
        "password":"apacino",
        "email":"pacino@actor.com",
        "droit":"1",
        "session":"",
        "note": "4.8",
        "type": "Acteur",
        "nom_photo": "pacino.jpg",
        "description": "Icône du cinéma, mémorable dans Le Parrain et Scarface"
    },
    {
        "id":"14",
        "name":"Jane Campion",
        "login":"jcampioni",
        "password":"jcampioni",
        "email":"campion@director.com",
        "droit":"1",
        "session":"",
        "note": "4.6",
        "type": "Réalisatrice",
        "nom_photo": "campion.jpg",
        "description": "Réalisatrice néo-zélandaise, Palme d'Or et Oscar"
    },
    {
        "id":"15",
        "name":"Joaquin Phoenix",
        "login":"jphoenix",
        "password":"jphoenix",
        "email":"phoenix@actor.com",
        "droit":"1",
        "session":"",
        "note": "4.7",
        "type": "Acteur",
        "nom_photo": "phoenix.jpg",
        "description": "Acteur oscarisé, performances puissantes et engagées"
    },
    {
        "id":"16",
        "name":"Greta Gerwig",
        "login":"ggerwig",
        "password":"ggerwig",
        "email":"gerwig@director.com",
        "droit":"1",
        "session":"",
        "note": "4.5",
        "type": "Réalisatrice",
        "nom_photo": "gerwig.jpg",
        "description": "Réalisatrice et scénariste acclamée, voix féminine du cinéma moderne"
    },
    {
        "id":"17",
        "name":"Tom Hanks",
        "login":"thanks",
        "password":"thanks",
        "email":"hanks@actor.com",
        "droit":"1",
        "session":"",
        "note": "4.8",
        "type": "Acteur",
        "nom_photo": "hanks.jpg",
        "description": "Acteur américain emblématique, deux fois oscarisé"
    }
]

let tickets = [
    {
        "iduser":"3",
        "idticket":"1",
        "datefrom":"2025-03-18T00:00:00",
        "dateto":"2025-03-18T23:59:59",
        "priceid":""
    },
    {
        "iduser":"3",
        "idticket":"2",
        "datefrom":"2025-03-19T00:00:00",
        "dateto":"2025-03-19T23:59:59",
        "priceid":""
    },
    {
        "iduser":"4",
        "idticket":"3",
        "datefrom":"2025-03-20T00:00:00",
        "dateto":"2025-03-20T23:59:59",
        "priceid":""
    },
    {
        "iduser":"4",
        "idticket":"4",
        "datefrom":"2025-03-21T00:00:00",
        "dateto":"2025-03-21T23:59:59",
        "priceid":""
    },
    {
        "iduser":"3",
        "idticket":"5",
        "datefrom":"2025-03-22T00:00:00",
        "dateto":"2025-03-22T23:59:59",
        "priceid":""
    },
    {
        "iduser":"4",
        "idticket":"6",
        "datefrom":"2025-03-23T00:00:00",
        "dateto":"2025-03-23T23:59:59",
        "priceid":""
    },
    {
        "iduser":"3",
        "idticket":"7",
        "datefrom":"2025-03-24T00:00:00",
        "dateto":"2025-03-24T23:59:59",
        "priceid":""
    },
    {
        "iduser":"4",
        "idticket":"8",
        "datefrom":"2025-03-25T00:00:00",
        "dateto":"2025-03-25T23:59:59",
        "priceid":""
    },
    {
        "iduser":"3",
        "idticket":"9",
        "datefrom":"2025-03-26T00:00:00",
        "dateto":"2025-03-26T23:59:59",
        "priceid":""
    },
    {
        "iduser":"4",
        "idticket":"10",
        "datefrom":"2025-03-27T00:00:00",
        "dateto":"2025-03-27T23:59:59",
        "priceid":""
    },
    {
        "iduser":"3",
        "idticket":"11",
        "datefrom":"2025-03-28T00:00:00",
        "dateto":"2025-03-28T23:59:59",
        "priceid":""
    },
    {
        "iduser":"4",
        "idticket":"12",
        "datefrom":"2025-03-29T00:00:00",
        "dateto":"2025-03-29T23:59:59",
        "priceid":""
    },
    {
        "iduser":"3",
        "idticket":"13",
        "datefrom":"2025-03-30T00:00:00",
        "dateto":"2025-03-30T23:59:59",
        "priceid":""
    },
    {
        "iduser":"4",
        "idticket":"14",
        "datefrom":"2025-03-31T00:00:00",
        "dateto":"2025-03-31T23:59:59",
        "priceid":""
    },
    {
        "iduser":"3",
        "idticket":"15",
        "datefrom":"2025-04-01T00:00:00",
        "dateto":"2025-04-01T23:59:59",
        "priceid":""
    }
]

let tickets_price = [
    {
        "id":"1",
        "name":"adulte",
        "price":"11"
    },
    {
        "id":"2",
        "name":"etudiant",
        "price":"9"
    }, {
        "id":"3",
        "name":"enfant",
        "price":"6"
    }
]

let stands = [
    {
        "idstand":"1",
        "name":"stand 1"
    }
]

let comments_golden_book = [
    {
        "id":"1",
        "iduser":"2",
        "message":"ouais pas mal :D",
        "date":""
    }
]

let goodies = [
    {
        "id":"1",
        "price":"13",
        "stock":"29",
        "name":"T shirt"
    }
]

let goodies_size = [
    {
        "id":"1",
        "size":"XS"
    },
    {
        "id":"2",
        "size":"S"
    },
    {
        "id":"3",
        "size":"M"
    },
    {
        "id":"4",
        "size":"L"
    },
    {
        "id":"5",
        "size":"XL"
    },

]

let basket = [
    {
        "id": "0",
        "iduser":"3",
        "date": "2025-03-18",
        "state": "0",
        "is_order": true,
        "iditems":"1"
    },
]

let basket_items = [
    {
        "idbasket":"1",
        "idgoodies":"1",
        "count":"5"
    }
]

let films = [
    {
        "id": "1",
        "title": "Killers of the Flower Moon",
        "director_id": "2",
        "cast_ids": ["7", "13"],
        "genre": "Drame",
        "release_date": "2023-10-20",
        "poster": "killers_moon.jpg",
        "description": "Une sombre histoire de meurtres dans la nation Osage dans les années 1920",
        "duration": 206
    },
    {
        "id": "2",
        "title": "Pulp Fiction",
        "director_id": "5",
        "cast_ids": ["13", "7"],
        "genre": "Crime",
        "release_date": "1994-10-14",
        "poster": "pulp_fiction.jpg",
        "description": "Histoires entrelacées de gangsters à Los Angeles",
        "duration": 154
    },
    {
        "id": "3",
        "title": "Oppenheimer",
        "director_id": "6",
        "cast_ids": ["15", "8"],
        "genre": "Biographie",
        "release_date": "2023-07-21",
        "poster": "oppenheimer.jpg",
        "description": "L'histoire du père de la bombe atomique",
        "duration": 180
    },
    {
        "id": "4",
        "title": "Inception",
        "director_id": "6",
        "cast_ids": ["7", "10"],
        "genre": "Science-Fiction",
        "release_date": "2010-07-16",
        "poster": "inception.jpg",
        "description": "Un voleur qui s'infiltre dans les rêves",
        "duration": 148
    },
    {
        "id": "5",
        "title": "Dune",
        "director_id": "9",
        "cast_ids": ["15", "10"],
        "genre": "Science-Fiction",
        "release_date": "2021-09-15",
        "poster": "dune.jpg",
        "description": "L'épopée de Paul Atréides sur la planète désertique Arrakis",
        "duration": 155
    },
    {
        "id": "6",
        "title": "The Power of the Dog",
        "director_id": "14",
        "cast_ids": ["15", "8"],
        "genre": "Western",
        "release_date": "2021-11-17",
        "poster": "power_dog.jpg",
        "description": "Un rancher cruel dont la vie bascule avec l'arrivée de sa belle-soeur",
        "duration": 126
    },
    {
        "id": "7",
        "title": "E.T. l'extra-terrestre",
        "director_id": "11",
        "cast_ids": ["17", "8"],
        "genre": "Science-Fiction",
        "release_date": "1982-06-11",
        "poster": "et.jpg",
        "description": "Un enfant aide un extraterrestre à rentrer chez lui",
        "duration": 115
    },
    {
        "id": "8",
        "title": "La Vie en Rose",
        "director_id": "2",
        "cast_ids": ["12", "10"],
        "genre": "Biographie",
        "release_date": "2007-02-14",
        "poster": "lavieenrose.jpg",
        "description": "La vie tumultueuse d'Édith Piaf",
        "duration": 140
    },
    {
        "id": "9",
        "title": "The Godfather",
        "director_id": "2",
        "cast_ids": ["13", "7"],
        "genre": "Crime",
        "release_date": "1972-03-24",
        "poster": "godfather.jpg",
        "description": "L'histoire de la famille mafieuse Corleone",
        "duration": 175
    },
    {
        "id": "10",
        "title": "Barbie",
        "director_id": "16",
        "cast_ids": ["10", "17"],
        "genre": "Comédie",
        "release_date": "2023-07-21",
        "poster": "barbie.jpg",
        "description": "Barbie quitte Barbie Land pour le monde réel",
        "duration": 114
    },
    {
        "id": "11",
        "title": "Joker",
        "director_id": "5",
        "cast_ids": ["15", "12"],
        "genre": "Thriller",
        "release_date": "2019-10-04",
        "poster": "joker.jpg",
        "description": "La transformation d'Arthur Fleck en célèbre vilain",
        "duration": 122
    },
    {
        "id": "12",
        "title": "Forrest Gump",
        "director_id": "11",
        "cast_ids": ["17", "8"],
        "genre": "Drame",
        "release_date": "1994-07-06",
        "poster": "forrestgump.jpg",
        "description": "L'histoire extraordinaire d'un homme simple au grand coeur",
        "duration": 142
    },
    {
        "id": "13",
        "title": "The Dark Knight",
        "director_id": "6",
        "cast_ids": ["7", "13"],
        "genre": "Action",
        "release_date": "2008-07-18",
        "poster": "darkknight.jpg",
        "description": "Batman affronte le chaos du Joker à Gotham City",
        "duration": 152
    },
    {
        "id": "14",
        "title": "Titanic",
        "director_id": "2",
        "cast_ids": ["7", "8"],
        "genre": "Romance",
        "release_date": "1997-12-19",
        "poster": "titanic.jpg",
        "description": "Histoire d'amour à bord du paquebot maudit",
        "duration": 195
    },
    {
        "id": "15",
        "title": "The Silence of the Lambs",
        "director_id": "5",
        "cast_ids": ["8", "13"],
        "genre": "Thriller",
        "release_date": "1991-02-14",
        "poster": "silence_lambs.jpg",
        "description": "Une jeune agent du FBI consulte un tueur en série emprisonné",
        "duration": 118
    },
    {
        "id": "16",
        "title": "The Shawshank Redemption",
        "director_id": "11",
        "cast_ids": ["17", "13"],
        "genre": "Drame",
        "release_date": "1994-10-14",
        "poster": "shawshank.jpg",
        "description": "L'histoire de l'amitié entre deux prisonniers",
        "duration": 142
    },
    {
        "id": "17",
        "title": "The Lord of the Rings: The Return of the King",
        "director_id": "9",
        "cast_ids": ["15", "10"],
        "genre": "Fantasy",
        "release_date": "2003-12-17",
        "poster": "lotr_return.jpg",
        "description": "La conclusion de l'épopée de la Terre du Milieu",
        "duration": 201
    }
]

let film_tickets = [
    {
        "iduser": "3",
        "idfilm": "1",
        "idticket": "1",
        "datefrom": "2025-03-18T14:00:00",
        "dateto": "2025-03-18T17:26:00",
        "priceid": "1"
    },
    {
        "iduser": "3",
        "idfilm": "2",
        "idticket": "2",
        "datefrom": "2025-03-19T18:00:00",
        "dateto": "2025-03-19T20:34:00",
        "priceid": "2"
    },
    {
        "iduser": "4",
        "idfilm": "3",
        "idticket": "3",
        "datefrom": "2025-03-20T20:00:00",
        "dateto": "2025-03-20T23:00:00",
        "priceid": "1"
    },
    {
        "iduser": "3",
        "idfilm": "4",
        "idticket": "4",
        "datefrom": "2025-03-21T16:30:00",
        "dateto": "2025-03-21T18:58:00",
        "priceid": "2"
    },
    {
        "iduser": "4",
        "idfilm": "5",
        "idticket": "5",
        "datefrom": "2025-03-22T14:00:00",
        "dateto": "2025-03-22T16:35:00",
        "priceid": "1"
    },
    {
        "iduser": "3",
        "idfilm": "6",
        "idticket": "6",
        "datefrom": "2025-03-23T15:00:00",
        "dateto": "2025-03-23T17:06:00",
        "priceid": "3"
    },
    {
        "iduser": "4",
        "idfilm": "7",
        "idticket": "7",
        "datefrom": "2025-03-24T21:00:00",
        "dateto": "2025-03-24T22:55:00",
        "priceid": "1"
    },
    {
        "iduser": "3",
        "idfilm": "8",
        "idticket": "8",
        "datefrom": "2025-03-25T19:30:00",
        "dateto": "2025-03-25T21:50:00",
        "priceid": "2"
    },
    {
        "iduser": "4",
        "idfilm": "9",
        "idticket": "9",
        "datefrom": "2025-03-26T20:00:00",
        "dateto": "2025-03-26T22:55:00",
        "priceid": "1"
    },
    {
        "iduser": "3",
        "idfilm": "10",
        "idticket": "10",
        "datefrom": "2025-03-27T18:00:00",
        "dateto": "2025-03-27T19:54:00",
        "priceid": "3"
    },
    {
        "iduser": "4",
        "idfilm": "11",
        "idticket": "11",
        "datefrom": "2025-03-28T17:30:00",
        "dateto": "2025-03-28T19:32:00",
        "priceid": "1"
    },
    {
        "iduser": "3",
        "idfilm": "12",
        "idticket": "12",
        "datefrom": "2025-03-29T16:00:00",
        "dateto": "2025-03-29T18:22:00",
        "priceid": "2"
    },
    {
        "iduser": "4",
        "idfilm": "13",
        "idticket": "13",
        "datefrom": "2025-03-30T14:30:00",
        "dateto": "2025-03-30T17:02:00",
        "priceid": "3"
    },
    {
        "iduser": "3",
        "idfilm": "14",
        "idticket": "14",
        "datefrom": "2025-03-31T20:30:00",
        "dateto": "2025-03-31T23:45:00",
        "priceid": "1"
    },
    {
        "iduser": "4",
        "idfilm": "15",
        "idticket": "15",
        "datefrom": "2025-04-01T19:00:00",
        "dateto": "2025-04-01T20:58:00",
        "priceid": "2"
    },
    {
        "iduser": "3",
        "idfilm": "16",
        "idticket": "16",
        "datefrom": "2025-04-02T15:00:00",
        "dateto": "2025-04-02T17:22:00",
        "priceid": "3"
    },
    {
        "iduser": "4",
        "idfilm": "17",
        "idticket": "17",
        "datefrom": "2025-04-03T18:30:00",
        "dateto": "2025-04-03T21:51:00",
        "priceid": "1"
    },
    {
        "iduser": "3",
        "idfilm": "1",
        "idticket": "18",
        "datefrom": "2025-04-04T21:00:00",
        "dateto": "2025-04-05T00:26:00",
        "priceid": "2"
    }
]

export {
    users, tickets, tickets_price, stands, comments_golden_book, goodies, goodies_size, basket, basket_items, film_tickets, films
}