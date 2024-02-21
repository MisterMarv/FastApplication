<template>
  <header>
    <div class="logo">
      <img src="../assets/Logo_prioritaria@2x.png" alt="Logo">
    </div>
    <div class="navigation">
      <router-link to="/visualizacao-tela" class="nav-button">Visualização</router-link>
      <router-link to="/cadastros-tela" class="nav-button">Cadastros</router-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'HeaderComponent',
  };
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: aliceblue;
  }

  .logo img {
    max-width: 15%;
    height: 30%;
    margin-right: 1100px;
  }

  .navigation {
    display: flex;
    gap: 20px;
    margin-right: 30px;
  }
  .nav-button {
  padding: 10px 15px;
  background-color:cornflowerblue;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color:cadetblue;
}
</style>
