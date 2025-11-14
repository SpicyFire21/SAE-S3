let users = [
    {
        "id":"1",
        "name":"",
        "login":"admin",
        "password":"admin",
        "email":"email@gmail.cm",
        "droit":"2",
        "session":"",
        "note": "",
        "type": "",
        "nom_photo": "",
        "description": ""
    },
    {
        "id":"2",
        "name":"leprestaoriginel",
        "login":"presta",
        "password":"presta",
        "email":"email@gmail.cm",
        "droit":"1",
        "session":"",
        "note": "5",
        "type": "Producteur",
        "nom_photo": "producteur.jpg",
        "description": "Le prestateur originel il est fort et a une aura incroyable"
    },
    {
        "id":"3",
        "name":"",
        "login":"client",
        "password":"client",
        "email":"email@gmail.cm",
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
        "email":"email@gmail.cm",
        "droit":"0",
        "session":"",
        "note": "",
        "type": "",
        "nom_photo": "",
        "description": ""
    },
    {
        "id":"5",
        "name":"laknackultime",
        "login":"prestaknaghui",
        "password":"prestakhnaghui",
        "email":"email@gmail.cm",
        "droit":"1",
        "session":"",
        "note": "5",
        "type": "Réalisateur",
        "nom_photo": "realisateur.jpg",
        "description": "Il a trop de flow en vrai de vrai"
    },
    {
        "id":"6",
        "name":"laknackultime V2",
        "login":"prestaknaghui V2",
        "password":"prestakhnaghui V2",
        "email":"email@gmail.cm",
        "droit":"1",
        "session":"",
        "note": "1.5",
        "type": "Réalisateur",
        "nom_photo": "realisateur.jpg",
        "description": "encore mieux que la v1"
    },
    {
        "id":"7",
        "name":"The honored one",
        "login":"cityxl",
        "password":"cityxl",
        "email":"email@gmail.cm",
        "droit":"1",
        "session":"",
        "note": "4.5",
        "type": "Acteur",
        "nom_photo": "acteur.png",
        "description": "The strongest, il est inspiré de johan lançon (il n'a jamais atteint son aura)"
    },
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

export {
    users, tickets, tickets_price, stands, comments_golden_book, goodies, goodies_size, basket, basket_items
}