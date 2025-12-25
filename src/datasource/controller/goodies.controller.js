import {basket, basket_items, color, goodies, goodies_color, goodies_size, size, users} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'

async function getGoodiesByProviderId(id){

    if (!id) {
        return { error: 1, status: 404, data: 'id manquant' };
    }
    let g = goodies.filter(g => g.iduser=== id)
    return { error: 0, status: 200, data: g };


}
async function addGoodie(data){
    if (!data.user_id) {
        return { error: 1, status: 404, data: 'user_id manquant' };
    }

    if (!data.name) {
        return { error: 1, status: 404, data: 'name manquant' };
    }
    if (!data.price) {
        return { error: 1, status: 404, data: 'price manquant' };
    }
    if (!data.quantity) {
        return { error: 1, status: 404, data: 'quantity manquant' };
    }




    const g = {
        id: uuidv4(),
        iduser: data.user_id,
        name: data.name,
        price: data.price,
        quantity: data.quantity
    }

    goodies.push(g)
    return { error: 0, status: 201, data: g };


}
async function updateGoodie(item, userid) {
    // Cherche l'index du goodie
    const index = goodies.findIndex(g => g.id === item.id && g.iduser === userid)

    if (index !== -1) {
        // Supprime l'ancien
        goodies.splice(index, 1)
        // Ajoute le nouveau
        goodies.push(item)
        return { error: 0, status: 200, data: item };

    } else {
        return { error: 1, status: 404, data: "goodie inexistant" };
    }
}

async function getGoodies(){
    return { error: 0, status: 200, data: goodies };
}
async function getGoodiesSizes(){
    return { error: 0, status: 200, data: goodies_size };

}

async function getGoodiesColors(){
    return { error: 0, status: 200, data: goodies_color };

}
async function addGoodieColor(data){
    goodies_color.push(data)
    return { error: 0, status: 201, data: data };

}
async function addGoodieSize(data){
    goodies_size.push(data)
    return { error: 0, status: 201, data: data };

}
async function deleteAllColors(id){
    const gc = goodies_color.filter(gc => gc.idgoodie !== id)
    // goodies_color = gc
    return { error: 0, status: 204, data: gc };
}

async function deleteAllSizes(id){

    const gs = goodies_size.filter(gs => gs.idgoodie !== id)


    return { error: 0, status: 204, data: gs };
}


async function getColors(){
    return { error: 0, status: 200, data: color };
}

async function getSizes(){
    return { error: 0, status: 200, data: size };
}

async function addColor(c){
    const nameExist = color.find(co => co.label === c.label)
    if (nameExist){
        return { error: 1, status: 400, data: "couleur deja existante" };
    }
    const newColor = {
        id:uuidv4(),
        ...c

    }

    // color.push(newColor)

    return { error: 0, status: 201, data: newColor };
}

async function addSize(s){
    const nameExist = size.find(si => si.label === s.label)
    if (nameExist){
        return { error: 1, status: 400, data: "taille deja existante" };
    }
    const newSize = {
        id:uuidv4(),
        ...s

    }
    // size.push(newSize)
    return { error: 0, status: 201, data: newSize };
}
async function getBasketByUserId(userid){
    const userExist = users.find(u => u.id === userid);
    if (!userExist) {
        return { error: 1, status: 404, data: "Impossible de trouver l'utilisateur" };
    }

    const currentBasket = basket.find(b => b.iduser === userid && b.state === "wait");
    if (!currentBasket) {
        const newBasket = {
            "id": uuidv4(),
            "iduser":userid,
            "date": new Date().toISOString(),
            "state": "wait",
        }


        basket.push(newBasket);
        return { error: 0, status: 201, data: newBasket };
    }

    return { error: 0, status: 200, data: currentBasket };
}

async function getBasketItems(idbasket){
    const basketExist = basket.find(b => b.id === idbasket);
    if (!basketExist) {
        return { error: 1, status: 404, data: "Impossible de trouver le panier" };
    }
    const items = basket_items.filter(i => i.idbasket === idbasket)
    return { error: 0, status: 200, data: items };
}

function payOrder(idorder) {
    const index = basket.findIndex(b => b.id === idorder);

    if (index === -1) {
        return { error: 1, status: 404, data: "Basket not found" };
    }

    const b = basket[index]; //permet d'avoir les données du panier a modifier

    if (b.state === "payed") {
        return { error: 1, status: 409, data: "Basket already paid" };
    }

    b.state = "payed";

    // Move basket to the end
    basket.splice(index, 1);
    basket.push(b);

    return { error: 0, status: 202, data: b };
}

async function addBasketItems(item) {
    // Cherche si l'item existe déjà dans le même panier
    const index = basket_items.findIndex(b =>
        b.idbasket === item.idbasket &&
        b.idgoodie === item.idgoodie &&
        b.idcolor === item.idcolor &&
        b.idsize === item.idsize
    );

    let updatedItem;

    if (index !== -1) {
        // Si existe, incrémente le count
        basket_items[index].count = String(Number(basket_items[index].count) + Number(item.count));
        updatedItem = basket_items[index];
    } else {
        // Sinon ajoute un nouvel item
        updatedItem = { ...item };
        basket_items.push(updatedItem);
    }

    return { error: 0, status: 201, data: updatedItem };
}


async function getAllBasketByUserId(id){
    const b = basket.filter(b => b.iduser === id)
    return { error: 0, status: 201, data: b };

}

async function getAllBasketItems(id){
    return { error: 0, status: 201, data: basket_items };
}

export default {
    getGoodiesByProviderId,
    addGoodie,
    updateGoodie,
    getGoodies ,
    getGoodiesSizes,
    getGoodiesColors,
    addGoodieColor,
    addGoodieSize,
    deleteAllColors,
    deleteAllSizes,
    addSize,
    addColor,
    getColors,
    getSizes,
    getBasketByUserId,
    getBasketItems,
    payOrder,
    addBasketItems,
    getAllBasketByUserId,
    getAllBasketItems

}