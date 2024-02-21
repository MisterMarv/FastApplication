# FastApplication
O projeto consiste no desenvolvimento de uma API REST em Node.js, utilizando Typescript, para gerenciar workshops trimestrais e a presença de colaboradores. A estrutura das entidades envolvidas é composta por Colaborador, Workshop e Ata. O projeto envolve uma aplicação Vue.js para analisar a participação dos colaboradores nos workshops.

# Como rodar o backend

- Basta executar:
- npm install --legacy-peer-deps na pasta FastApplication
- cd backend
- node ApiRest.js

- Vale ressaltar que o install citado no readme do frontend, deve ser rodado na pasta do frontend. 

# TELAS

# Visualização de Atas:

Interface que mostra as atas de presença com data, nome, descrição e colaboradores de cada workshop.
Lista inicialmente todas as atas, incluindo informações completas sobre workshops e colaboradores.
Filtragem de Workshops:

Campo de busca "Colaborador" para filtrar workshops pelo nome do colaborador.
Campo de busca "Workshop" para filtrar workshops pelo nome.
Campo de busca "Data workshop" para filtrar workshops pela data.
Detalhes do Workshop:

Ao clicar no nome de um workshop, exibe detalhes, incluindo a lista de colaboradores presentes.

# Cadastros

Três formulários responsáveis por cadastrar, respectivamente, atas, workshops e colaboradores.
