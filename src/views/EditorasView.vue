<script>
import EditorasApi from '@/api/editoras.js';
const editorasApi = new EditorasApi();
export default {
  data() {
    return {
      editora: {},
      editoras: [],
    };
  },

  async created() {
    this.editoras = await editorasApi.buscarTodosAsEditoras();
  },
  methods: {
    async salvar() {
      if (this.novo_editora !== "") {
        const editora ={
          name: this.novo_editora,
        };
        const editora_criado = await axios.post(
          "http://localhost:4000/editoras",
          editora
        );
        this.editoras.push(editora_criado.data);
        this.novo_editora = "";
      }
    },
    async excluir(editora) {
      await axios.delete(`http://localhost:4000/editoras/${editora.id}`);
      const indice = this.editoras.indexOf(editora);
      this.editoras.splice(indice, 1);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h2>Gerenciamento de Editoras</h2>
    </div>
    <div class="form-input">
      <input
        type="text"
        placeholder="Nome"
        v-model="novo_editora"
        @keypress.enter="salvar"
      />
      <button @click="salvar">Salvar</button>
    </div>
    <div class="list-items">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="editora in editoras" :key="editora.id">
            <td>{{ editora.id }}</td>
            <td>{{ editora.name }}</td>
            <td>
              <button @click="excluir(editora)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style></style>
