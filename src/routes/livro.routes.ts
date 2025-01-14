import { Request, Response, Router } from 'express';
import Livro from '../entities/Livro';
import { AppDataSource } from '../database/data-source';



const livroRoutes = Router();
const livroRepository = AppDataSource.getRepository(Livro)

// Home page route.
livroRoutes.get("/", async (Request, Response) => {
    Response.send('Oiiiiiiii')
  });


// rota para todos os livros!
livroRoutes.get("/Livros", async (Request, Response) => {
    const livros_banco_dados = await AppDataSource .getRepository(Livro)

    const livros = await livros_banco_dados.find()
    Response.json(livros)
  });


// rota para buscar um livro
livroRoutes.get("/BuscarLivro/:livro_id", async(req,res) => {
  const id_livro = req.params.livro_id
  const livro = await AppDataSource .getRepository(Livro).findOneBy({
    id: parseInt(id_livro), // Ensure the ID is an integer
  });

  if(!livro)
    {
      return res.status(400).json({message: 'O livro especificado nao foi encontrado'})
    }
  
    return res.status(200).json(livro)

  
})

//rota para postar um livro!
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