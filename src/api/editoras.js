import axios from 'axios';
export default class EditorasApi {
    async buscarTodosAsEditoras(){
        const response = await axios.get(`http://localhost:4000/editoras`);
        return response.data;
    }
    async buscarEditora(id){
        const response = await axios.get(`http://localhost:4000/editoras/${id}`);
        return response.data;
    }
    async adicionarEditora(editora){
        const response = await axios.get(`http://localhost:4000/editoras`, editora);
        return response.data;
    }
    async excluirEditora(id){
        const response = await axios.get(`http://localhost:4000/editoras/${id}`);
        return response.data;
    }
    async atualizarEditora(editora){
        const response = await axios.get(`http://localhost:4000/editoras/${editora.id}`,editora,);
        return response.data;
    }
}