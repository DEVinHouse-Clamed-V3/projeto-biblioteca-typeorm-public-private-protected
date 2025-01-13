import { Request, Response, Router } from 'express';
import Livro from '../entities/Livro';
import { AppDataSource } from '../database/data-source';



const livroRoutes = Router();
const livroRepository = AppDataSource.getRepository(Livro)

// Home page route.
livroRoutes.get("/", async (Request, Response) => {
    Response.send('Oiiiiiiii')
  });

livroRoutes.get("/BuscarLivros", async (Request, Response) => {
    const livros_banco_dados = await AppDataSource .getRepository(Livro)

    const livros = await livros_banco_dados.find()
    Response.json(livros)
  });

livroRoutes.post("/AdicionarLivros", async(req: Request, res: Response) =>
{
  if(!req.body.title)
    {
        return res.status(400).json({message: 'O titulo é obrigatorio'})
    }

  const livro = new Livro()
  livro.titulo = req.body.title

  try
  {
    const livro_salvo = await livroRepository.save(livro)
    return res.status(200).json(livro_salvo)
  }
  catch
  {
    return res.status(500).json({message: 'Erro'})
  }
  

  
}

)

export default livroRoutes;