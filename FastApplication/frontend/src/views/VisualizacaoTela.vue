<template>
    <div>
      <h1 class="box">Atas de Presença</h1>
      <FiltrosAta
        :colaboradores="colaboradores"
        :workshops="workshops"
        :atas="atas"
        @filter-atas="filterAtas"
        @show-workshop-details="showWorkshopDetails"
      />
    </div>
</template>
  
<script>
  import FiltrosAta from '@/components/FiltrosAta.vue';
  import axios from 'axios';
  
  export default {
    components: {
    FiltrosAta
},
    data() {
      return {
        colaboradores: [],
        workshops: [],
        atas: [],
      };
    },
    created() {
        axios.get('http://localhost:3000/api/colaboradores').then(response => {
            this.colaboradores = response.data;
            console.log(this.colaboradores);
        });

        axios.get('http://localhost:3000/api/workshops').then(response => {
            this.workshops = response.data;
            console.log(this.workshops);
        });

        axios.get('http://localhost:3000/api/atas').then(response => {
            this.atas = response.data;
        });
    },
    methods: {
        filterAtas({ colaboradorId, workshopId, data }) {
            const url = `http://localhost:3000/api/atas/filtrar?colaboradorId=${colaboradorId}&workshopId=${workshopId}&data=${data}`;
            axios.get(url).then(response => {
                this.atas = response.data;
            });
        },
        showWorkshopDetails(workshopId) {
            console.log('Workshop ID recebido:', workshopId);
            axios.get(`http://localhost:3000/api/workshops/${workshopId}`).then(response => {
                const workshop = response.data;
                console.log(workshop);
                const atas = this.atas.filter(ata => ata.workshop.id === workshopId);
                const colaboradores = atas.flatMap(ata => ata.colaboradores);

                this.selectedWorkshop = workshop;
                this.selectedColaboradores = colaboradores;
                this.showWorkshop = true;
            });
        }
   }
}
</script>
<style lang="scss" scoped>
.box {
    max-width: 1000px;
    margin-top: 90px !important;
    margin: 0 auto;
    padding: 20px;
    background-color: aliceblue;
}
</style>
  