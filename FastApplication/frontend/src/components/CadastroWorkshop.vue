<template>
<div class="registration-form-container">
    <form class="form-esqueleto" @submit.prevent="cadastrarWorkshop">
        <div class="titulo">Cadastre um Workshop</div>
        <div class="primeiro-campo">
            <label for="nome" class="tipo-campo">Nome do Workshop:</label>
            <input type="text" id="nome" v-model="nome" placeholder="Digite o nome do workshop!" required class="campo-preencher input-field" />
        </div>
        <div class="segundo-campo">
            <label for="id" class="tipo-campo">ID do Workshop:</label>
            <input type="number" v-model="id" placeholder="Digite o ID do workshop!" required class="input-field" />
        </div>
        <div class="segundo-campo">
            <label for="dataRealizacao" class="tipo-campo">Data de Realização:</label>
            <input type="date" v-model="dataRealizacao" required class="input-field" />
        </div>
        <div  class="segundo-campo">
            <label for="descricao" class="tipo-campo">Descrição:</label>
            <textarea v-model="descricao" placeholder="Escreva uma bela descrição do workshop!" required class="textarea-field input-field"></textarea>
        </div>
        <button type="submit" class="button submit-button">Confirmar Cadastro</button>
    </form>
</div>
</template>
  
<script>
import axios from 'axios';

export default {
data() {
    return {
        id: '',
        nome: '',
        dataRealizacao: '',
        descricao: '',
    };
},
methods: {
    cadastrarWorkshop() {
        const novoWorkshop = {
            id: this.id,  
            nome: this.nome,
            dataRealizacao: this.dataRealizacao,
            descricao: this.descricao
        };

        axios.post('http://localhost:3000/api/workshops', novoWorkshop)
            .then(response => {
                this.$notify({ type: "success", text: "Workshop cadastrado com sucesso, " + response.data.nome});
                })
            .catch(error => {
                this.$notify({ type: "error", text: "Erro no cadastro do workshop: " + error.response.data.error});
            });
        },
    },
};
</script>
<style scoped lang="scss">
.registration-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
}

.form-esqueleto {
    border-radius: 20px;
    border: 1px solid var(--Grey, #dde2e5);
    background-color: #fff;
    display: flex;
    max-width: 461px;
    height: 475px;
    flex-direction: column;
    font-weight: 400;
    padding: 44px 43px;
}

.textarea-field {
    width: 100%;
    padding: 7px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
}

.input-field {
    width: 100%;
    padding: 7px;
    margin: 8px 0 10px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.titulo {
    color: var(--Black-5, #2b2f32);
    font: 24px Inter, sans-serif;
}

.primeiro-campo {
    border-radius: 8px;
    border: 1px solid var(--Black-1, #cfd3d4);
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    white-space: nowrap;
    padding: 8px 16px;
}

.tipo-campo {
    color: var(--Black-4, #5e6366);
    font: 12px Inter, sans-serif;
}

.campo-preencher {
    color: darkblue;
    margin-top: 8px;
    font: 16px Inter, sans-serif;
}

.segundo-campo {
    border-radius: 8px;
    border: 1px solid var(--Black-1, #cfd3d4);
    display: flex;
    margin-top: 8px;
    flex-direction: column;
    white-space: nowrap;
    padding: 8px 16px;
}
.button {
    justify-content: center;
    border-radius: 12px;
    background-color: var(--Primary, #5570f1);
    margin-top: 10px;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    padding: 17px 16px;
    font: 20px Inter, sans-serif;
}

.submit-button:hover {
    cursor: pointer;
    background-color: #4457db;
}
</style>
  