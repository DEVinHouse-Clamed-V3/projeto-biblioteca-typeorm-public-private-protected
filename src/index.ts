import "reflect-metadata";
import express from "express";
import cors from "cors";
import axios from 'axios'
import { AppDataSource } from "./database/data-source";

import livroRoutes from "./routes/livro.routes";
import auditorioRoutes from "./routes/auditorio.routes";
import autorRoutes from "./routes/autor.routes";
import leitorRoutes from "./routes/leitor.routes";

const app = express();


app.use(cors());

app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log("Sua conexão com banco de dados está ok");
  })
  .catch(() => console.log("Erro ao conectar com o banco de dados"));

  
app.use("/livros", livroRoutes);
app.use("/auditorios", auditorioRoutes);
app.use("/autores", autorRoutes);
app.use("/leitores", leitorRoutes);

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});

const requestData = {
  titulo: 'Test Product',
  descricao: 'This is a test product description',
  price: 19.99,
  data_publicacao:'11/11/1990',
  isbn: 'teste',
  page_count: 333,
  linguagem: 'portugues',
  
};

axios.post('http://localhost:3333/livros/AdicionarLivros',requestData)
.then((response) => console.log("sucess"))
.catch((error) => console.log("error"))

