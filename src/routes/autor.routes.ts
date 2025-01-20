import { request, response, Router } from "express";
import { AppDataSource } from "../database/data-source";
import Autor from "../entities/Autor";

const autorRoutes = Router();

/* Implemente aqui os métodos que irão atender as requisições HTTP para a entidade Autor. */

const autoresRepository = AppDataSource.getRepository(Autor);

// Get todos os autores

autorRoutes.get("/autores", async (request, response) => {
    try {
        const autoresNoBancoDados = await autoresRepository.find();

        response.json(autoresNoBancoDados);
    } catch {
        response.status(500).json({ error: "Erro ao buscar Autores!" });
    }
});

// Get autor pelo id
autorRoutes.get("/autores/:id", async (request, response) => {
    try {
        const id = Number(request.params.id);
        const autorInDatabase = await autoresRepository.findOne({
            where: {
                id: id,
            },
        });

        if (!autorInDatabase) {
            response.status(404).json({ error: "Autor não encontrado" });
        } else {
            response.json(autorInDatabase);
        }
    } catch {
        response.status(500).json({ error: "Erro ao buscar autor" });
    }
});

//Post autor

autorRoutes.post("/autores", async (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ message: "O nome é obrigatorio!" });
    }
    if (!body.nationality) {
        return response
            .status(400)
            .json({ message: "A nacionalidade é obrigatoria!" });
    }
    const autor = new Autor();

    autor.name = body.name;
    autor.birthdate = body.birthdate;
    autor.biography = body.biography;
    autor.nationality = body.nationality;
    autor.active = body.active;
    autor.created_at = body.created_at;
    autor.updated_at = body.updated_at;

    try {
        const autorCreated = await autoresRepository.save(autor);
        response.status(201).json(autorCreated);
    } catch {
        response.status(500).json({ message: "Erro ao salvar autor" });
    }
});

//Put autor

autorRoutes.put('/autores/:id', async (request, response) => {
    const body = request.body
    const id = Number(request.params.id)


    const autorInDatabase = await autoresRepository.findOne({
        where: { id },
    });

    if (!autorInDatabase) {
        return response.status(500).json({ message: 'O autor não foi encontrado!' });
    }

    autorInDatabase.name = body.name
    autorInDatabase.birthdate = body.birthdate
    autorInDatabase.biography = body.biography
    autorInDatabase.nationality = body.nationality
    autorInDatabase.active = body.active
    autorInDatabase.updated_at = body.updated_at

    const autorAtualizado = await autoresRepository.save(autorInDatabase)
    try {
        return response.status(201).json(autorAtualizado)
    }

    catch {
        return response.status(500).json({ message: 'Erro ao atualizar autor' });
    }
})

// Delete Autor
autorRoutes.delete('/autores/:id', async (request, response) => {
    try {
        const id = Number(request.params.id);
        const autorDelete = await autoresRepository.delete(id);

        if (autorDelete.affected === 0) {
            response.status(404).json({
                error: 'Autor não foi encontrado e portanto não foi deletado',
            });
        } else {
            response.status(204).json();
        }
    } catch {
        response.status(500).json({ message: 'O autor não foi encontrado!' });
    }
});

export default autorRoutes;
