<template>
    <div class="atas-list-container">
       <div class="filters">
            <div class="filter-section">
                <label for="colaborador">Colaborador:</label>
                <select v-model="colaboradorFilter" @change="filterAtas" id="colaborador">
                    <option value="">Todos</option>
                    <option v-for="colaborador in colaboradores" :value="colaborador.colaborador.id" :key="colaborador.colaborador.id">{{ colaborador.colaborador.nome }}</option>
                </select>
            </div>
            <div class="filter-section">
                <label for="workshop">Workshop:</label>
                <select v-model="workshopFilter" @change="filterAtas" id="workshop">
                <option value="">Todos</option>
                <option v-for="workshop in workshops" :value="workshop.id" :key="workshop.id">{{ workshop.nome }}</option>
                </select>
            </div>   
            <div class="filter-section">
                <label for="data">Data de realização:</label>
                <input type="date" v-model="dataFilter" @change="filterAtas" id="data">
            </div>
      </div>
      <table v-if="atas.length > 0" class="atas-table">
      <thead>
        <tr>
          <th>Workshop</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ata in atas" :key="ata.workshop.id">
          <td>{{ ata.workshop.nome }}</td>
          <td>
            <button @click="showWorkshopDetails(ata)">Ver detalhes</button>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-else>
        <td style="display: flex; justify-content: center; padding: 90px; font-size: 40px;">Não há nenhuma ata cadastrada! Faça um cadastro e volte para visualizar.</td>
    </table>

    <!-- Detalhes do Workshop -->
    <div v-if="selectedWorkshop" class="modal-background">
        <div class="modal-container">
            <h2>Detalhes do Workshop: {{ selectedWorkshop.workshop.nome }}</h2>
            <p>Colaboradores: {{ formatColaboradores(selectedWorkshop.colaboradoresParticipantes) }}</p>
            <p>Data: {{ formatData(selectedWorkshop.workshop.dataRealizacao) }}</p>
            <p>Descrição: {{ selectedWorkshop.workshop.descricao }}</p>
            <button @click="hideWorkshopDetails">Voltar</button>
        </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    props: ['colaboradores', 'workshops', 'atas'],
    data() {
      return {
        colaboradorFilter: '',
        workshopFilter: '',
        dataFilter: '',
        selectedWorkshop: null
      };
    },
    mounted() {
        this.filterAtas();
    },
    methods: {
      filterAtas() {
        console.log(this.atas);
        this.$emit('filter-atas', {
          colaboradorId: this.colaboradorFilter,
          workshopId: this.workshopFilter,
          data: this.dataFilter,
        });
      },
      showWorkshopDetails(ata) {
        this.selectedWorkshop = ata;
        this.$emit('show-workshop-details', ata.workshop.id);
      },
      hideWorkshopDetails() {
        this.selectedWorkshop = null;
      },
      formatColaboradores(colaboradores) {
        if (colaboradores && colaboradores.length) {
          return colaboradores.map(c => c.nome).join(', ');
        } else {
          return [];
        }
      },
      formatData(data) {
            const date = new Date(data);
            return date.toLocaleDateString();
        }
    },
  };
</script>
  
<style scoped>
.atas-list-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: aliceblue;
}

.filters {
    display: flex;
    justify-content: space-between;
}

.filter-section {
  margin-bottom: 10px;
  font-size: 20px;
}

select, input {
    height: 2rem;
    margin-left: 10px;
}

.atas-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.atas-table th,
.atas-table td {
    background-color: azure;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.atas-table th {
  background-color: #f2f2f2;
}

.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: left;
  }
</style>
  