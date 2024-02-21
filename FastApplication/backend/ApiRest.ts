// Importando as dependências
import express from 'express';
import { Request, Response } from 'express';

// Definindo as classes
class Colaborador {
  constructor(public id: number, public nome: string) {}
}

class Workshop {
  constructor(public id: number, public nome: string, public dataRealizacao: Date, public descricao: string) {}
}

class Ata {
  constructor(public id: number, public workshop: Workshop, public colaboradores: Colaborador[]) {}
}

const db = {
  colaboradores: [] as Colaborador[],
  workshops: [] as Workshop[],
  atas: [] as Ata[],
};

// Criando instâncias iniciais
const colaboradores: Colaborador[] = [];
const workshops: Workshop[] = [];
const atas: Ata[] = [];

// Configurando o servidor Express
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Configurar CORS
app.use(cors());

// Configurar o middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para cadastrar um Workshop
app.post('/api/workshops', (req: Request, res: Response) => {
  console.log(req);
  const { id, nome, dataRealizacao, descricao } = req.body;
  const workshopExistente = db.workshops.find((eventWork) => eventWork.id === id);
  if (workshopExistente) {
    return res.status(400).json({ error: 'Já existe um colaborador com o mesmo ID.' });
  }
  const workshop = new Workshop(id, nome, new Date(dataRealizacao), descricao);
  db.workshops.push(workshop);
  workshops.push(workshop);
  res.status(201).json(workshop);
});

// Endpoint para cadastrar um Colaborador
app.post('/api/colaboradores', (req: Request, res: Response) => {
  const { id, nome } = req.body;
  const colaboradorExistente = db.colaboradores.find((colab) => colab.id === id);

  if (colaboradorExistente) {
    return res.status(400).json({ error: 'Já existe um colaborador com o mesmo ID.' });
  }
  const colaborador = new Colaborador(id, nome);
  db.colaboradores.push(colaborador);
  colaboradores.push(colaborador);
  res.status(201).json(colaborador);
});

// Endpoint para adicionar um Colaborador em uma Ata
app.put('/api/atas/:ataId/colaboradores/:colaboradorId', (req: Request, res: Response) => {
  const ataId = parseInt(req.params.ataId);
  const colaboradorId = parseInt(req.params.colaboradorId);

  const ata = atas.find(a => a.id === ataId);
  const colaborador = colaboradores.find(c => c.id === colaboradorId);

  if (ata && colaborador) {
    ata.colaboradores.push(colaborador);
    res.status(200).json(ata);
  } else {
    res.status(404).send('Ata ou Colaborador não encontrado.');
  }
});

// Endpoint para remover um Colaborador de uma Ata
app.delete('/api/atas/:ataId/colaboradores/:colaboradorId', (req: Request, res: Response) => {
  const ataId = parseInt(req.params.ataId);
  const colaboradorId = parseInt(req.params.colaboradorId);

  const ata = atas.find(a => a.id === ataId);

  if (ata) {
    ata.colaboradores = ata.colaboradores.filter(c => c.id !== colaboradorId);
    res.status(200).json(ata);
  } else {
    res.status(404).send('Ata não encontrada.');
  }
});

// Endpoint para criar uma ata de presença de um Workshop
app.post('/api/atas', (req: Request, res: Response) => {
  const { id, workshopId, colaboradoresIds } = req.body;

  const workshop = workshops.find(w => w.id === workshopId);

  if (workshop) {
    const colaboradorExistente = db.atas.some(ata => {
      return ata.workshop.id === workshopId && ata.colaboradores.some(c => colaboradoresIds.includes(c.id));
    });

    if (!colaboradorExistente) {
      const ataExistente = db.atas.find(ata => ata.id === id && ata.workshop.id === workshopId);

      if (ataExistente) {
        // Se uma Ata com o id especificado já existe, adicione novos colaboradores a ela
        // if (ataExistente.workshop.id === workshopId) {
          const novosColaboradores = colaboradores.filter(c => colaboradoresIds.includes(c.id));
          ataExistente.colaboradores.push(...novosColaboradores);
          res.status(200).json(ataExistente);
        // } else {
        //   res.status(400).send('ID da Ata já existe para outro Workshop.');
        // }
      } else {
        // Se uma Ata com o id especificado não existe, crie uma nova Ata
        const colaboradoresSelecionados = colaboradores.filter(c => colaboradoresIds.includes(c.id));
        const ata = new Ata(id, workshop, colaboradoresSelecionados);
        db.atas.push(ata);
        atas.push(ata);
        res.status(201).json(ata);
      }
    } else {
      res.status(400).send('Colaborador já associado a este Workshop.');
    }
  } else {
    res.status(404).send('Workshop não encontrado.');
  }
});

// Endpoint para retornar uma lista de colaboradores em ordem alfabética e informações sobre os workshops que eles participaram
app.get('/api/colaboradores', (req: Request, res: Response) => {
  const colaboradoresOrdenados = colaboradores.sort((a, b) => a.nome.localeCompare(b.nome));
  const result = colaboradoresOrdenados.map(colaborador => {
    const workshopsParticipados = db.atas.filter(ata => ata.colaboradores.some(c => c.id === colaborador.id));
    return { colaborador, workshopsParticipados };
  });
  res.status(200).json(result);
});

// Endpoint para obter Workshops
app.get('/api/workshops', (req: Request, res: Response) => {
  res.status(200).json(db.workshops);
});

// Endpoint para obter detalhes de um Workshop pelo ID
app.get('/api/workshops/:id', (req: Request, res: Response) => {
  const workshopId = parseInt(req.params.id);

  const workshop = db.workshops.find(w => w.id === workshopId);

  if (workshop) {
    res.status(200).json(workshop);
  } else {
    res.status(404).send('Workshop não encontrado.');
  }
});

// Endpoint para filtrar atas com base em colaboradorId, workshopId e data
app.get('/api/atas/filtrar', (req: Request, res: Response) => {
  const colaboradorId = parseInt(req.query.colaboradorId as string);
  const workshopId = parseInt(req.query.workshopId as string);
  const data = req.query.data as string;

  // Filtrar atas com base nos parâmetros fornecidos
  const filteredAtas = atas.filter(ata => {
    const meetsColaboradorCondition = colaboradorId ? ata.colaboradores.some(c => c.id === colaboradorId) : true;
    const meetsWorkshopCondition = workshopId ? ata.workshop.id === workshopId : true;
    const meetsDataCondition = data ? ata.workshop.dataRealizacao.toISOString().startsWith(data) : true;

    return meetsColaboradorCondition && meetsWorkshopCondition && meetsDataCondition;
  });

  const result = filteredAtas.map(ata => {
    const colaboradoresParticipantes = ata.colaboradores;
    return { workshop: ata.workshop, colaboradoresParticipantes };
  });

  res.status(200).json(result);
});

// Endpoint para filtrar todos os Workshops pelo nome e retornar as informações dos colaboradores que participaram
app.get('/api/atas', (req: Request, res: Response) => {
  const workshopNome = req.query.workshopNome as string;
  const filteredWorkshops = db.workshops.filter(workshop => workshop.nome.includes(workshopNome));
  const result = filteredWorkshops.map(workshop => {
    const colaboradoresParticipantes = db.atas
      .filter(ata => ata.workshop.id === workshop.id)
      .flatMap(ata => ata.colaboradores);
    return { workshop, colaboradoresParticipantes };
  });
  res.status(200).json(result);
});

// Endpoint para filtrar a lista de workshops pela data e retornar as informações dos colaboradores que participaram
app.get('/api/atas', (req: Request, res: Response) => {
  const data = req.query.data as string;
  const filteredAtas = atas.filter(ata => ata.workshop.dataRealizacao.toISOString().startsWith(data));
  const result = filteredAtas.map(ata => {
    const colaboradoresParticipantes = ata.colaboradores;
    return { workshop: ata.workshop, colaboradoresParticipantes };
  });
  res.status(200).json(result);
});

// Inicializando o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
