import express, { NextFunction, Response, Router } from 'express';

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
import { Request } from 'express-serve-static-core'; // Ensure consistent Request type
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { create, Whatsapp } from 'venom-bot';
import multer from 'multer';
import path from 'path';
import { MulterFileType, ContactType, UserType, qrCodeType, VenomClient  } from './types';  // Importando interfaces
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { UserEntity } from './entity/user.entity';

AppDataSource.initialize()
  .then(() => {
    console.log('Banco conectado e tabelas criadas!');
  })
  .catch((err) => console.error('Erro ao conectar ao banco:', err));


// Configurações básicas
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_muitodificil';

// Configuração do multer para upload de arquivos
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

// Sessão WhatsApp
let client: Whatsapp | null = null;

function initVenom() {
  create({ session: 'waplus-clone-session' })
    .then((whats) => {
      client = whats;
      console.log('Venom-bot pronto!');
    })
    .catch((err) => {
      console.error('Erro ao iniciar Venom-bot', err);
    });
}
initVenom()

// Middleware JWT
function auth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Não autenticado.' })
    return
  }
    try {
      req.user = jwt.verify(token, JWT_SECRET) as UserEntity;
      next();
    } catch {
      res.status(401).json({ error: 'Token inválido.' });
    }
}

// Rota verificar status da sessão
app.get('/api/session', (_req, res) => {
    try {
      res.json({ status: client ? 'active' : 'inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar status da sessão.', details: error });
    }
  });

/* app.post('/start-whatsapp-session', async (req, res) => {
    try {
      const { userId } = req.body; // Você pode receber o ID do usuário para identificar a sessão
  
      if (client) {
        res.status(400).json({ message: 'Sessão já iniciada.' });
        return
      }
  
      client = await create({
        session: `session-${userId}`, // Nome da sessão baseado no usuário
        headless: true, // Browser oculto
        useChrome: true, // Usa Chrome instalado
        puppeteerOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
        qrTimeout: 0, // Espera indefinidamente pelo QR Code
      });
  
      client.onStateChange((state) => {
        console.log('Estado do cliente: ', state);
        if (state === 'CONFLICT') client.useHere();
      });
  
      client.onStreamChange((stream) => {
        console.log('Stream alterado: ', stream);
      });
  
      client.on('qr', (qrCode:qrCodeType ) => {
        // Quando gerar o QR Code, envia para o frontend
        res.status(200).json({ qrCode });
      });
  
      client.on('ready', () => {
        console.log('Cliente está pronto!');
      });
  
    } catch (error) {
      console.error('Erro ao iniciar sessão VenomBot:', error);
      res.status(500).json({ message: 'Erro ao iniciar VenomBot', error: error.message });
    }
}); */

// Resposta automática simples (mock)
let autoReply: { message: string } = { message: '' };

app.post('/api/auto-reply', (req, res) => {
  try {
    /* autoReply = req.body;
    return res.json({ success: true }); */
    autoReply = req.body;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao configurar resposta automática.', details: error });
  }
});


app.get('/api/contacts', auth, async (_req, res) => {
    try {
      const repository = AppDataSource.getRepository('Contact')
      const list = await repository.find()
      res.json(list)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar contatos.', details: error });
    }
  });

app.post('/api/contacts', auth, async (req, res) => {
  try {
    const contactRepository = AppDataSource.getRepository('Contact')
    const contact = contactRepository.create(req.body);
    const saved = await contactRepository.save(contact)
  res.json(saved);
  }catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar contato.', details: error });
  }
});

app.put('/api/contacts/:id', auth, async (req, res) => {
  try {
    const contactRepo = AppDataSource.getRepository('Contact');
    const contact = contactRepo.create(req.body);
    const saved = await contactRepo.save(contact);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar contato.', details: error });
  }
});

app.delete('/api/contacts/:id', auth, async (req, res) => {
  const contactRepository = AppDataSource.getRepository('Contact')
  await contactRepository.delete(req.params.id )
  res.json({ success: true })
})

// Histórico de mensagens enviadas (mock RAM)
let sentHistory: any[] = [];
app.get('/api/history', (_req, res): void => {
  try {
    res.json(sentHistory);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar histórico.', details: error });
  }
});

// Agendamento de mensagens (mock, não persistente)
let scheduled: any[] = [];
app.post('/api/schedule', (req, res): void => {
  try {
    scheduled.push({ ...req.body, id: Date.now().toString() });
    res.json({ success: true });
  }catch(error) {
    res.status(500).json({ error: 'Erro ao agendar mensagem.', details: error });
  }
});

app.get('/api/schedule', (_req, res): void => {
  try {
    res.json(scheduled);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar agendamentos.', details: error });
  }
})

// Enviar mensagem para múltiplos contatos (envio em massa) com suporte a anexos
app.post('/api/send-bulk', upload.array('files', 3), async (req, res): Promise<any> => {
  let contactNumbers = req.body['contacts[]'] || req.body.contacts;
  const message = req.body.message || '';
  const files = req.files || [];

  // Converter para array se necessário
  if (!Array.isArray(contactNumbers)) {
    contactNumbers = [contactNumbers];
  }

  if (!client) {
    res.status(400).json({ error: 'Bot não está ativo.' });
    return Promise.resolve();
  }
  try {
    const results = [];
    for (const number of contactNumbers) {
      if (Array.isArray(files) && files.length > 0) {
        for (const file of files as MulterFileType[]) {
          await client.sendFile(
            number,
            file.path,
            file.originalname,
            message
          );
        }
        results.push({ number, sent: true, withFiles: true });
      } else {
        results.push(await client.sendText(number, message));
      }
    }
    
    sentHistory.unshift({
      date: new Date().toISOString(),
      message,
      contacts: contactNumbers,
      attachments: (files as MulterFileType[]).map(f => f.originalname),
      results,
    });
    
    res.json({ success: true, results });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Erro ao enviar mensagens.', 
      details: error instanceof Error ? error.message : String(error)
    });
  }
})

app.listen(3333, () => console.log('Backend rodando na porta 3333!'));
