<script>
import axios from "axios";
export default {
  data() {
    return {
      novo_livro: "",
      novo_preco: "",
      novo_editora: "",
      novo_categoria: "",
      novo_autor: "",
      livros: [],
    };
  },
   async created() {
    const livros = await axios.get("http://localhost:4000/livros");
    this.livros = livros.data;
  },
  methods: {
    async salvar() {
      if (this.novo_livro !== ""){
      const livro ={
        name: this.novo_livro,
        precoid: this.novo_preco,
        editoracod: this.novo_editora,
        categoria: this.novo_categoria,
        autor: this.novo_autor,
      }
      const livro_criado = await axios.post(
          "http://localhost:4000/livros",
          livro
        );
        this.livros.push(livro_criado.data);
        this.novo_livro = "";
        this.novo_preco = "";
        this.novo_editora = "";
        this.novo_categoria = "";
        this.novo_autor = "";
      }
    },
    async excluir(livro){
      await axios.delete(`http://localhost:4000/livros/${livro.id}`);
      const indice = this.livros.indexOf(livro);
      this.livros.splice(indice, 1);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h2>Gerenciamento de livros</h2>
    </div>
    <div class="form-input">
      <input type="text" placeholder="Nome" v-model="novo_livro" @keypress.enter="salvar" />
      <input type="text" placeholder="Preço" v-model="novo_preco" @keypress.enter="salvar" />
      <input type="text" placeholder="Código Editora" v-model="novo_editora" @keypress.enter="salvar" />
      <input type="text" placeholder="Gênero" v-model="novo_categoria" @keypress.enter="salvar" />
      <input type="text" placeholder="Nome Autor" v-model="novo_autor" @keypress.enter="salvar" />
      <button @click="salvar">Salvar</button>
    </div>
    <div class="list-items">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>R$</th>
            <th>Código Editora</th>
            <th>Categoria do Livro</th>
            <th>Autor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="livro in livros" :key="livro.id">
            <td>{{livro.id}}</td>
            <td>{{livro.name}}</td>
            <td>{{livro.precoid}}</td>
            <td>{{livro.editoracod}}</td>
            <td>{{livro.categoria}}</td>
            <td>{{livro.autor}}</td>
            <td>
              <button @click="excluir(livro)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style></style>
