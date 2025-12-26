import basketService from "../services/basket.service.js";


export const getAllBasketItems = async (req,res) => {
    try {
        let data = await basketService.getAllBasketItems();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des items");
    }
}

export const getAllBasketByUserId = async (req,res) =>{
    try {
        let data = await basketService.getAllBasketByUserId(req.params.iduser);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des items des paniers de l'utilisateur");
    }
}

export const getBasketItems = async (req,res) => {
    try {
        let data = await basketService.getBasketItems(req.params.idbasket);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des items du panier ");
    }
}
export const getBasketByUserId = async (req,res) => {
    try {
        let data = await basketService.getBasketByUserId(req.params.iduser);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du panier de l'utilisateur ");
    }
}

export const addBasketItems = async (req,res) =>{
    try {
        let data = await basketService.addBasketItems(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error)
        return res.status(500).send("Erreur lors de l'ajout d'un item dans le panier")
    }
}


export const payOrder = async (req,res)=>{
    try {
        let data = await basketService.payOrder(req.params.idbasket);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error)
        return res.status(500).send("Erreur lors du payement du panier")
    }
}
