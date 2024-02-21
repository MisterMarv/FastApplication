<template>
    <div class="cadastros-container">
      <div class="grid-container">
          <CadastroAta />
          <CadastroWorkshop />
          <CadastroColaborador />
      </div>
    </div>
</template>
  
<script>
  import CadastroAta from '../components/CadastroAta.vue';
  import CadastroWorkshop from '../components/CadastroWorkshop.vue';
  import CadastroColaborador from '../components/CadastroColaborador.vue';
  
  export default {
    name: 'CadastrosTela',
    components: {
      CadastroAta,
      CadastroWorkshop,
      CadastroColaborador,
    },
  };
</script>
  
<style lang="scss" scoped>
  .cadastros-container {
    background-position: center;
    margin-top: 55px;
    padding-top: 55px;
  
    .grid-container {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
    }
    @media (min-width: 768px) {
        .grid-container {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .grid-container {
            grid-template-columns: repeat(3, 1fr);
        }
    }
  }
</style>
  