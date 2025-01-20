import { Request, Response, Router } from 'express';
import Livro from '../entities/Livro';
import { AppDataSource } from '../database/data-source';



const livroRoutes = Router();
const g_livroRepository = AppDataSource.getRepository(Livro)


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
livroRoutes.post("/AdicionarLivro", async(req: Request, res: Response) =>
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

    const livro_salvo = await g_livroRepository.save(livro)
    return res.status(200).json(livro_salvo)
  }

  catch (error) {
    console.error("Error saving book:", error);
    return res.status(500).json({ message: 'Erro ao salvar livro'});
  }
  
})

// rota para atualizar um livro

livroRoutes.put('/atualizarLivro/:livro_id', async(req, res) => 
  {
    const req_body = req.body
    const id_livro = req.params.livro_id
    

    const livro_atualizar = await g_livroRepository.findOneBy
    ({
      id: parseInt(id_livro), 
    });

    if(!livro_atualizar)
      {
        return res.status(500).json({message: 'O livro não foi encontrado!'});
      }

    livro_atualizar.titulo = req_body.titulo || livro_atualizar.titulo
    livro_atualizar.descricao = req_body.descricao || livro_atualizar.descricao 
    livro_atualizar.data_publicacao = req_body.data_publicacao || livro_atualizar.data_publicacao
    livro_atualizar.isbn = req_body.isbn || livro_atualizar.isbn
    livro_atualizar.page_count = req_body.page_count || livro_atualizar.page_count
    livro_atualizar.linguagem = req_body.linguagem || livro_atualizar.linguagem
    livro_atualizar.created_at = req_body.created_at || livro_atualizar.created_at
    livro_atualizar.updated_at = req_body.updated_at || livro_atualizar.updated_at

   const livro_atualizado = await g_livroRepository.save(livro_atualizar)
    try
    {
      return res.status(200).json(livro_atualizado)
    }
  
    catch (error) {
      console.error("Error saving book:", error);
      return res.status(500).json({ message: 'Erro ao salvar livro'});
    }
  })

// rota para deletar livro
livroRoutes.delete('/DeletarLivro/:livro_id', async (req, res) => 
  {
    const id_livro = req.params.livro_id

    const livro_to_delete = await g_livroRepository.findOneBy({id: parseInt(id_livro),})

    if(!livro_to_delete)
      {
        return res.status(500).json({message: 'O livro não foi encontrado!'});
      }
    
    await g_livroRepository.remove(livro_to_delete)
    try
    {
      return res.status(200).json({ message: 'livro removido'});
    }
    catch
    {
      return res.status(500).json({ message: 'Erro ao remover livro'});
    }

  })

export default livroRoutes;