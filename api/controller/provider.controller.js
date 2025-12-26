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

export const getProviderRequests = async (req,res) => {
    try {
        let data = await providerService.getProviderRequests();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des  demandes de prestataires");
    }
}
export const addProviderRequests = async (req,res) => {
    try {
        let data = await providerService.addProviderRequests(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des prestataires");
    }
}
export const deleteProviderRequests = async (req,res) => {
    try {
        let data = await providerService.deleteProviderRequests(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des prestataires");
    }
}