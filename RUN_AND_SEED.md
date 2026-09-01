# Guia de Execução e Povoamento do Banco de Dados

Este guia contém as instruções necessárias para rodar o backend e popular o banco de dados com dados de teste para a tabela `proposal`.

## 1. Subindo a infraestrutura (Banco de Dados)

O projeto utiliza o Docker para rodar o banco de dados PostgreSQL. Para iniciar o banco de dados, certifique-se de que o Docker está aberto e rodando, e execute o comando abaixo na pasta raiz do backend (`SettingAttendance`):

```bash
docker compose up -d
```

Isso criará e iniciará o contêiner do banco de dados em segundo plano.

## 2. Rodando o Backend

Com o banco de dados rodando, você pode iniciar o servidor Node.js. Primeiro, instale as dependências (caso ainda não tenha feito):

```bash
npm install
```

E em seguida, inicie o servidor de desenvolvimento:

```bash
npm run start
# ou npm run dev, caso exista no seu package.json
```

O backend estará rodando e a documentação do Swagger geralmente pode ser acessada em `http://localhost:3333/docs`.

## 3. Povoando o Banco de Dados (Seed)

Para testar os filtros de datas (Dia, Semana, Mês) e os gráficos de Analytics, você pode inserir dados fictícios na tabela `proposal`. 

Conecte-se ao seu banco de dados PostgreSQL (utilizando ferramentas como DBeaver, pgAdmin ou a própria extensão do VSCode) e execute o seguinte script SQL:

```sql
INSERT INTO public.proposal (
  proposal_id, address, cod_operator, holder, dependents, date_of_birth, cpf, 
  identity, proposal_number, whatsapp, zip_code, number_resident, uf, contact, 
  email, contract_readjustment, contract_implementation, bill_expiration, 
  contract_price, lead, plan, type_of_contract, office, broker, adm_fee, 
  supervisor, status, is_active, created_at, updated_at
) VALUES
-- === DADOS PARA AS ÚLTIMAS 24 HORAS (TESTE DO FILTRO "DIA") ===
(
  'd1a00001-0000-0000-0000-000000000001', 'Av. Paulista, 1000', 'OP-01', 'Tech Solutions Brasil', true, '1985-04-12', '12345678901', 
  'RG-102030', 'PROP-2026-101', '11999998888', '01310100', '1000', 'SP', 'Carlos Eduardo', 
  'carlos@techsolutions.com.br', '2027-01-01', '2026-03-01', '2026-03-10', 
  16500.00, 'Indicação', 'Saúde Master PME', 'Saúde PME', 'Matriz SP', 'Corretora Central', 500.00, 
  'Roberto Dias', 'APROVADO', true, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '30 minutes'
),
(
  'd1a00002-0000-0000-0000-000000000002', 'Rua Augusta, 450', 'OP-02', 'Juliana Fernandes Costa', false, '1995-09-18', '23456789012', 
  'RG-203040', 'PROP-2026-102', '11988881111', '01305000', '450', 'SP', 'Juliana Costa', 
  'juliana.costa@email.com', '2027-01-01', '2026-03-01', '2026-03-05', 
  2100.00, 'Instagram Ads', 'Saúde Flex PF', 'Saúde PF', 'Filial SP', 'Corretora Ana', 150.00, 
  'Roberto Dias', 'EM_ANALISE', true, NOW() - INTERVAL '6 hours', NOW() - INTERVAL '5 hours'
),
(
  'd1a00003-0000-0000-0000-000000000003', 'Alameda Santos, 300', 'OP-01', 'Studio Criativo Design', true, '1990-01-22', '34567890123', 
  'RG-304050', 'PROP-2026-103', '11977772222', '01419000', '300', 'SP', 'Marcos Vinicius', 
  'marcos@studiocriativo.com', '2027-01-01', '2026-03-01', '2026-03-15', 
  4800.00, 'Google Ads', 'Odontológico PME Plus', 'Odontológico PME', 'Matriz SP', 'Corretora Central', 200.00, 
  'Fernanda Lima', 'PENDENTE', true, NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours'
),
-- === DADOS PARA OS ÚLTIMOS 7 DIAS (TESTE DO FILTRO "SEM") ===
(
  '5e300001-0000-0000-0000-000000000001', 'Rua Haddock Lobo, 700', 'OP-01', 'Inovação & Sistemas S/A', true, '1982-12-05', '45678901234', 
  'RG-405060', 'PROP-2026-201', '11966663333', '01414000', '700', 'SP', 'Patricia Souza', 
  'patricia@inovasistemas.com', '2027-01-01', '2026-03-01', '2026-03-20', 
  24000.00, 'Prospecção Ativa', 'Saúde Premium PME', 'Saúde PME', 'Matriz SP', 'Corretora Central', 800.00, 
  'Roberto Dias', 'APROVADO', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'
),
(
  '5e300002-0000-0000-0000-000000000002', 'Rua Pamplona, 120', 'OP-03', 'Rodrigo Alcantara Martins', false, '1987-03-14', '56789012345', 
  'RG-506070', 'PROP-2026-202', '11955554444', '01405000', '120', 'SP', 'Rodrigo Martins', 
  'rodrigo.martins@email.com', '2027-01-01', '2026-03-01', '2026-03-10', 
  1250.00, 'Leads Orgânicos', 'Odontológico Individual', 'Odontológico PF', 'Filial Campinas', 'Corretor João', 100.00, 
  'Fernanda Lima', 'APROVADO', true, NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days'
),
(
  '5e300003-0000-0000-0000-000000000003', 'Av. Rebouças, 1500', 'OP-02', 'Distribuidora Global LTDA', true, '1979-07-29', '67890123456', 
  'RG-607080', 'PROP-2026-203', '11944445555', '05401200', '1500', 'SP', 'Luciano Nogueira', 
  'luciano@distribuidoraglobal.com', '2027-01-01', '2026-03-01', '2026-03-01', 
  18200.00, 'Indicação', 'Saúde Executivo PME', 'Saúde PME', 'Matriz SP', 'Corretora Central', 600.00, 
  'Roberto Dias', 'REJEITADO', true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days'
),
(
  '5e300004-0000-0000-0000-000000000004', 'Rua Bela Cintra, 890', 'OP-01', 'Camila Rodrigues Alves', false, '1993-11-10', '78901234567', 
  'RG-708090', 'PROP-2026-204', '11933336666', '01415000', '890', 'SP', 'Camila Alves', 
  'camila.alves@email.com', '2027-01-01', '2026-03-01', '2026-03-15', 
  2800.00, 'Campanha Facebook', 'Saúde Especial PF', 'Saúde PF', 'Filial Santos', 'Corretora Ana', 150.00, 
  'Fernanda Lima', 'CANCELADO', false, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'
),
-- === DADOS PARA OS ÚLTIMOS 30 DIAS (TESTE DO FILTRO "MES" E ANALYTICS) ===
(
  '3e500001-0000-0000-0000-000000000001', 'Av. Faria Lima, 2500', 'OP-01', 'Consultoria Financeira Prime', true, '1980-05-15', '89012345678', 
  'RG-809010', 'PROP-2026-301', '11922227777', '01452000', '2500', 'SP', 'Felipe Barreto', 
  'felipe@primefinancas.com', '2027-01-01', '2026-03-01', '2026-03-10', 
  31500.00, 'Prospecção Ativa', 'Saúde Gold PME', 'Saúde PME', 'Matriz SP', 'Corretora Central', 1000.00, 
  'Roberto Dias', 'APROVADO', true, NOW() - INTERVAL '14 days', NOW() - INTERVAL '13 days'
),
(
  '3e500002-0000-0000-0000-000000000002', 'Rua dos Pinheiros, 600', 'OP-02', 'Beatriz Menezes Castro', true, '1986-08-20', '90123456789', 
  'RG-901020', 'PROP-2026-302', '11911118888', '05422000', '600', 'SP', 'Beatriz Castro', 
  'beatriz.castro@email.com', '2027-01-01', '2026-03-01', '2026-03-05', 
  5400.00, 'Google Ads', 'Odontológico PME Plus', 'Odontológico PME', 'Matriz SP', 'Corretor João', 250.00, 
  'Fernanda Lima', 'APROVADO', true, NOW() - INTERVAL '21 days', NOW() - INTERVAL '20 days'
),
(
  '3e500003-0000-0000-0000-000000000003', 'Av. Brigadeiro Luis Antonio, 2100', 'OP-03', 'Arthur Silveira Ramos', false, '1998-02-03', '01234567890', 
  'RG-012030', 'PROP-2026-303', '11900009999', '01402000', '2100', 'SP', 'Arthur Ramos', 
  'arthur.ramos@email.com', '2027-01-01', '2026-03-01', '2026-03-25', 
  1450.00, 'Instagram Ads', 'Odontológico Individual', 'Odontológico PF', 'Filial Campinas', 'Corretora Ana', 100.00, 
  'Fernanda Lima', 'EM_ANALISE', true, NOW() - INTERVAL '26 days', NOW() - INTERVAL '25 days'
);
```
