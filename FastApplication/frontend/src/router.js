import { createRouter, createWebHistory } from 'vue-router';
import VisualizacaoTela from './views/VisualizacaoTela.vue';
import CadastrosTela from './views/CadastrosTela.vue';

const routes = [
  { path: '/', redirect: '/cadastros-tela' },
  { path: '/visualizacao-tela', component: VisualizacaoTela },
  { path: '/cadastros-tela', component: CadastrosTela },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
