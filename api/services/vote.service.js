import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getVotes() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM votes');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des votes' };
    } finally {
        db.release();
    }
}

async function deleteVote(iduser,idcategory){
    const db = await pool.connect();
    if (!iduser) return { error: 1, status: 400, data: 'iduser manquant' };
    if (!idcategory) {
        return { error: 1, status: 400, data: "idcategory manquant" };
    }
    try {
        const check = await db.query('SELECT * FROM votes where user_id=$1 and category_id = $2',[iduser,idcategory])
        if (check.rowCount === 0) {
            return { error: 1, status: 404, data: 'vote inexistant' };
        }

        const res = await db.query('DELETE FROM votes where user_id=$1 and category_id = $2 RETURNING *',[iduser,idcategory]);
        return { error: 0, status: 200, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression du vote' };
    } finally {
        db.release();
    }
}



async function getVotesById(id){
    const db = await pool.connect();
    if (!id) return { error: 1, status: 400, data: 'id manquant' };

    try {
        const res = await db.query('SELECT * FROM votes where id=$1',[id]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération du vote par id' };
    } finally {
        db.release();
    }
}

async function editVote(data) {
    const db = await pool.connect();

    if (!data.idcategory) {
        return { error: 1, status: 400, data: "category_id manquant" };
    }
    if (!data.idfilm) {
        return { error: 1, status: 400, data: "film_id manquant" };
    }
    if (!data.value) {
        return { error: 1, status: 400, data: "value manquant" };
    }

    try {
        // Vérifie si la ligne existe déjà dans votes_score
        let res = await db.query(
            'SELECT * FROM votes_score WHERE film_id = $1 AND category_id = $2',
            [data.idfilm, data.idcategory]
        );

        if (res.rowCount === 0) {
            // Création si n'existe pas
            await db.query(
                'INSERT INTO votes_score (film_id, category_id, total_score) VALUES ($1, $2, $3)',
                [data.idfilm, data.idcategory, Math.max(0, data.value)]
            );

            // Retourne la nouvelle ligne
            res = await db.query(
                'SELECT * FROM votes_score WHERE film_id = $1 AND category_id = $2',
                [data.idfilm, data.idcategory]
            );
        } else {
            // Ligne existante → update
            const currentScore = res.rows[0].total_score;
            const newScore = Math.max(0, currentScore + data.value);

            await db.query(
                'UPDATE votes_score SET total_score = $1 WHERE film_id = $2 AND category_id = $3',
                [newScore, data.idfilm, data.idcategory]
            );

            res = await db.query(
                'SELECT * FROM votes_score WHERE film_id = $1 AND category_id = $2',
                [data.idfilm, data.idcategory]
            );
        }

        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la modification du vote' };
    } finally {
        db.release();
    }
}
async function addVote(data){
    const db = await pool.connect();
    if (!data.iduser) {
        return { error: 1, status: 400, data: "iduser manquant" };
    }
    if (!data.idfilm) {
        return { error: 1, status: 400, data: "idfilm manquant" };
    }
    if (!data.idcategory) {
        return { error: 1, status: 400, data: "idcategory manquant" };
    }

    try {
        const check = await db.query('SELECT * FROM votes where user_id=$1 and category_id = $2',[data.iduser,data.idcategory])
        if (check.rowCount > 0) {
            return { error: 1, status: 409, data: 'Vous avez déjà voté dans cette catégorie' };
        }

        const result = await db.query('INSERT INTO votes (id,user_id,film_id,category_id) VALUES ($1,$2,$3,$4) RETURNING *',
            [uuidv4(),data.iduser,data.idfilm,data.idcategory])

        return { error: 0, status: 201, data: result.rows[0] };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: "erreur lors de la création d'une note" };
    } finally {
        db.release();
    }
}

export default {
    getVotes,
    addVote,
    deleteVote,
    getVotesById,
    editVote

}