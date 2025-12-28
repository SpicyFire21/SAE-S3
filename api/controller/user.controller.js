import userService from "../services/user.service.js";


export const getUsers = async (req,res) => {
    try {
        let data = await userService.getUsers();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des utilisateurs");
    }
}
export const getUsersById = async (req,res) => {
    try {
        let data = await userService.getUsersById(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de l\'utilisateur");
    }
}

export const addUser = async (req,res) => {
    const { droit } = req.body;
    try {
        let data;
        if (droit === 0 || droit === 1) {
            data = await userService.addUser(req.body);
        } else {
            return res.status(400).send("Veuillez rentrer un droit valide (0 ou 1)");
        }
        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la création d'un nouveau compte");
    }
}

export const login = async (req,res) =>{
    try {
        let data = await userService.login(req.body);
        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la connexion");
    }
}




