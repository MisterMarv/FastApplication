<template>
    <div class="atas-form-container">
        <form class="form-esqueleto" @submit.prevent="cadastrarAta">
            <div class="titulo">Cadastre uma ata</div>
            <div class="primeiro-campo">
                <label for="idAta" class="tipo-campo">ID da Ata</label>
                <input type="number" id="idAta" v-model="idAta" placeholder="Digite o ID da ata!" required class="campo-preencher input-field" />
            </div>
            <div class="segundo-campo">
                <label for="workshopId" class="tipo-campo">ID do Workshop relacionado</label>
                <input type="number" id="workshopId" v-model="workshopId" placeholder="Digite o ID do Workshop da ata!" required class="campo-preencher input-field" />
            </div>
            <div  class="segundo-campo">
                <label for="colaboradoresIds" class="tipo-campo">IDs dos Colaboradores (separados por vírgula)</label>
                <input type="text" id="colaboradoresIds" v-model="colaboradoresIds" placeholder="Digite o ID dos colaboradores!" required class="campo-preencher input-field" />
            </div>
            <button type="submit" class="button submit-button">Confirmar Cadastro</button>
      </form>
    </div>
    <div v-if="atas.length > 0">
        <h2>Atas Cadastradas</h2>
        <ul>
            <li v-for="ata in atas" :key="ata.id">
            <p>Data: {{ formatarData(ata.workshop.dataRealizacao) }}</p>
            <p>Workshop: {{ ata.workshop.nome }}</p>
            <p>Descrição: {{ ata.workshop.descricao }}</p>
            <p>Colaborador: {{ ata.colaborador ? ata.colaborador.nome : 'N/A' }}</p>
            </li>
        </ul>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        idAta: '',
        workshopId: '',
        colaboradoresIds: '',
        atas: [],
      };
    },
    methods: {
      cadastrarAta() {
        if (this.colaboradoresIds > 1) {
            console.log(this.colaboradoresIds);
            const colaboradoresIdsArray = this.colaboradoresIds.split(',').map(id => parseInt(id.trim()));
            console.log(colaboradoresIdsArray);
        }
  
        const novaAta = {
          IdAta: parseInt(this.idAta),  
          workshopId: parseInt(this.workshopId),
          colaboradoresIds: this.colaboradoresIds,
        };
  
        axios.post('http://localhost:3000/api/atas', novaAta)
          .then(() => {
            this.$notify({ type: "success", text: "Ata cadastrada com sucesso"});
            this.atualizarListaAtas();
          })
          .catch(error => {
            this.$notify({ type: "error", text: "Erro ao cadastrar ata:" + error.response.data});
          });
      },
      atualizarListaAtas() {
        axios.get('http://localhost:3000/api/atas')
          .then(response => {
            this.atas = response.data;
          })
          .catch(error => {
            this.$notify({ type: "error", text: "Erro ao buscar atas: " + error.response.data.error});
          });
      },
      formatarData(data) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(data).toLocaleDateString('pt-BR', options);
      },
    },
    mounted() {
      this.atualizarListaAtas();
    },
  };
</script>
  
<style scoped lang="scss">
.atas-form-container {
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
    max-width: 300px;
    flex-direction: column;
    font-weight: 400;
    padding: 45px 20px;
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
  margin-top: 40px;
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
  margin-top: 24px;
  flex-direction: column;
  white-space: nowrap;
  padding: 8px 16px;
}
.button {
  justify-content: center;
  border-radius: 12px;
  background-color: var(--Primary, #5570f1);
  margin-top: 65px;
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

  