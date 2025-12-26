import goodieService from "../services/goodie.service.js";


export const getGoodies = async (req,res) => {
    try {
        let data = await goodieService.getGoodies();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des goodies");
    }
}
 export const getGoodiesByProviderId = async (req,res) =>{
     try {
         let data = await goodieService.getGoodiesByProviderId(req.params.idprovider);

         return res.status(data.status).json(data);
     } catch (error) {
         console.error(error);
         return res.status(500).send("Erreur lors de la récupération des goodies par l'id du prestataire");
     }
 }

 export const getGoodiesColors = async (req,res) => {
     try {
         let data = await goodieService.getGoodiesColors();

         return res.status(data.status).json(data);
     } catch (error) {
         console.error(error);
         return res.status(500).send("Erreur lors de la récupération des couleurs des goodies");
     }
 }

export const getGoodiesSizes = async (req,res) => {
    try {
        let data = await goodieService.getGoodiesSizes();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des tailles des goodies");
    }
}

export const addGoodies = async (req,res) =>{
    try {
        let data = await goodieService.addGoodies(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout d'un goodie");
    }
}

export const editGoodies = async (req,res) =>{
    try {
        let data = await goodieService.editGoodies(req.body,req.params.iduser);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification d'un goodie");
    }
}

export const removeGoodiesColors = async (req,res) =>{
    try {
        let data = await goodieService.removeGoodiesColors(req.params.idgoodie);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression des couleurs du goodies");
    }
}

export const removeGoodiesSizes = async (req,res) =>{
    try {
        let data = await goodieService.removeGoodiesSizes(req.params.idgoodie);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression des tailles du goodies");
    }
}

export const addGoodiesColors = async (req,res) =>{
    try {
        let data = await goodieService.addGoodiesColors(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la couleur du goodies");
    }
}

export const addGoodiesSizes = async (req,res) =>{
    try {
        let data = await goodieService.addGoodiesSizes(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la taille du goodies");
    }
}





