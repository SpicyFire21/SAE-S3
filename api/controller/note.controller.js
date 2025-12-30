import noteService from "../services/note.service.js";


export const getNotes = async (req,res) => {
    try {
        let data = await noteService.getNotes();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des notes");
    }
}

export const addNote = async (req,res) => {
    try {
        let data = await noteService.addNote(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la note");
    }
}

export const getNoteById = async (req,res) => {
    try {
        let data = await noteService.getNoteById(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de la note par id");
    }
}

export const deleteNote = async (req,res) => {
    try {
        let data = await noteService.deleteNote(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression de la note par id");
    }
}







