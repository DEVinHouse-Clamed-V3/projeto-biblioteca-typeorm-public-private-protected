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
  console.log("entrei aqui")
  const body = req.body
  if(!req.body.titulo)
    {
        return res.status(400).json({message: 'O titulo é obrigatorio'})
    }

  const livro = new Livro()
  livro.titulo = body.titulo;
  livro.descricao = body.descricao;
  livro.data_publicacao = body.data_publicacao;
  livro.isbn = body.isbn;
  livro.page_count = body.page_count;
  livro.linguagem = body.linguagem;
  livro.created_at = body.created_at;
  livro.updated_at = body.updated_at;

  console.log(livro)

  try
  {

    const livro_salvo = await livroRepository.save(livro)
    return res.status(200).json(livro_salvo)
  }

  catch (error) {
    console.error("Error saving book:", error);
    return res.status(500).json({ message: 'Erro ao salvar livro'});
  }
  
}

)

export default livroRoutes;