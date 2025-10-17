let users = [
    {
        "id":"1",
        "login":"admin",
        "password":"admin",
        "email":"email@gmail.cm",
        "droit":"2"
    },
    {
        "id":"2",
        "login":"presta",
        "password":"presta",
        "email":"email@gmail.cm",
        "droit":"1"
    },
    {
        "id":"3",
        "login":"client",
        "password":"client",
        "email":"email@gmail.cm",
        "droit":"0"
    },
    {
        "id":"4",
        "login":"client2",
        "password":"client2",
        "email":"email@gmail.cm",
        "droit":"0"
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