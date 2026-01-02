import categoriesService from "../services/categories.service.js";


export const getCategories = async (req,res) => {
    try {
        let data = await categoriesService.getCategories();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des categories");
    }
}
