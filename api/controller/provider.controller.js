import providerService from "../services/provider.service.js";


export const getProviders = async (req,res) => {
    try {
        let data = await providerService.getProviders();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des prestataires");
    }
}