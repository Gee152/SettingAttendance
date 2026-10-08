# 🧪 Cenários de Teste BDD / Gherkin — Análise Operacional & Gráficos

Documentação de especificação por comportamento (Behavior-Driven Development) para validação e testes funcionais dos gráficos, indicadores (KPIs) e persistência de dados do sistema **Setting Attendance**.

---

## 🎯 Funcionalidade: Métricas e Indicadores da Tela Principal (Dashboard)

### 📋 Contexto
```gherkin
Dado que o usuário está autenticado na plataforma
E acessa o dashboard principal na rota "/dashboard"
E existem propostas cadastradas no banco de dados com diferentes datas e status
```

---

### 🧪 Cenário 1.1: Cálculo e Exibição dos Cartões de KPI no Período Mensal (Padrão)
```gherkin
Cenário: Exibição correta dos 4 KPIs com filtro de 30 dias ativo
  Dado que a aba ativa de filtro é "MES"
  Quando o dashboard carrega as propostas dos últimos 30 dias
  Então o card "Contratos Ativos" deve exibir a quantidade total de contratos ativos no período
  E o card "Fluxo de Caixa" deve exibir a soma formatada em moeda (ex: "R$ 48.5k") de todos os contratos do período
  E o card "Taxa de Conversão" deve exibir a porcentagem de propostas com status "APROVADO" sobre o total do período
  E o card "Tempo de Processo" deve exibir o tempo médio decorrido entre "createdAt" e "updatedAt"
```

---

### 🧪 Cenário 1.2: Filtragem Temporal Dinâmica (DIA, SEM, MES)
```gherkin
Cenário: Alternância de filtro temporal para "DIA" e "SEM"
  Dado que o usuário visualiza o gráfico "Visão Geral de evolução de vendas"
  Quando o usuário clica no seletor "DIA"
  Então os dados do gráfico devem ser recalculados considerando apenas as últimas 24 horas
  E o eixo X deve apresentar intervalos de hora no formato "HH:00"
  Quando o usuário clica no seletor "SEM"
  Então os dados do gráfico devem ser recalculados considerando os últimos 7 dias
  E o eixo X deve apresentar os dias da semana (ex: "SEG", "TER", "QUA")
```

---

### 🧪 Cenário 1.3: Gráfico de Evolução de Vendas por Status (OverviewChart)
```gherkin
Cenário: Empilhamento de áreas por status de proposta
  Dado que o gráfico "OverviewChart" está renderizado
  Quando existirem propostas com status "PENDENTE", "EM_ANALISE", "APROVADO", "REJEITADO" e "CANCELADO"
  Então cada status deve possuir sua respectiva área colorida preenchida:
    | Status      | Cor Hexadecimal |
    | PENDENTE    | #F59E0B         |
    | EM_ANALISE  | #3B82F6         |
    | APROVADO    | #10B981         |
    | REJEITADO   | #EF4444         |
    | CANCELADO   | #6B7280         |
  E ao passar o mouse sobre o gráfico, o Tooltip deve exibir a contagem detalhada por status daquele ponto temporal
```

---

### 🧪 Cenário 1.4: Gráficos de Tipos de Contrato (SourcesChart & Breakdown)
```gherkin
Cenário: Distribuição de receita e volume por modalidade de plano
  Dado que existem contratos de "Saúde PME", "Odontológico PME", "Saúde PF" e "Odontológico PF"
  Quando o componente "SourcesChart" renderiza o gráfico de rosca
  Então o valor total no centro da rosca deve ser igual à soma de todos os contratos
  E a legenda inferior deve apresentar a porcentagem de faturamento de cada modalidade
  E o componente "TypeOfContractBreakdown" deve exibir barras de progresso proporcionais à quantidade de vidas/contratos
```

---

## 🎯 Funcionalidade: Navegação e Visualização da Página de Analytics

### 🧪 Cenário 2.1: Redirecionamento através dos Cards de KPI
```gherkin
Cenário: Redirecionamento ao clicar nos cards de métricas
  Dado que o usuário está na tela inicial "/dashboard"
  Quando o usuário clica no card "Fluxo de Caixa", "Taxa de Conversão" ou "Tempo de Processo"
  Então o navegador deve redirecionar para a rota "/dashboard/analytics"
  E a página de Analytics Operacional deve ser exibida
```

---

### 🧪 Cenário 2.2: Exibição dos 4 Gráficos Analíticos na View Analytics
```gherkin
Cenário: Validação dos gráficos na rota "/dashboard/analytics"
  Dado que o usuário está na rota "/dashboard/analytics"
  Quando os dados de propostas são carregados
  Então o gráfico "Fluxo de Caixa & Evolução de Receita" deve apresentar a curva de receita acumulada por data
  E o gráfico "Taxa de Conversão por Status" deve apresentar colunas comparativas de propostas
  E o gráfico "Tempo Médio por Etapa Operacional" deve apresentar as etapas em formato de barras horizontais
  E o gráfico "Distribuição por Categoria" deve apresentar a proporção em gráfico de pizza
```

---

## 🎯 Funcionalidade: Tratamento de Estado Vazio (Empty State)

### 🧪 Cenário 3.1: Comportamento quando o banco de dados não possui propostas
```gherkin
Cenário: Exibição de estado vazio limpo
  Dado que não existem propostas cadastradas no banco de dados
  Quando o usuário acessa o dashboard principal ou a tela de analytics
  Então o card "Contratos Ativos" deve exibir "0"
  E o card "Fluxo de Caixa" deve exibir "R$ 0.00"
  E o card "Taxa de Conversão" deve exibir "0.0%"
  E o card "Tempo de Processo" deve exibir "0m 0s"
  E os gráficos devem exibir a indicação "Nenhum cadastro encontrado_" ou "Nenhum contrato no período_"
```

---

## 🎯 Funcionalidade: Gestão de Usuários e Permissões (Root Master)

### 🧪 Cenário 4.1: Cadastro de Novo Usuário e Configuração Imediata
```gherkin
Cenário: Criação de usuário e atribuição de permissões no path "/setting"
  Dado que o usuário logado possui perfil Root Master ("1")
  E acessa a rota "/setting"
  Quando clica no botão "+ Criar Novo Usuário"
  E preenche o nome, e-mail, senha e perfil de acesso
  E submete o formulário de cadastro
  Então o usuário deve ser persistido no banco de dados
  E o novo usuário deve ser selecionado automaticamente no seletor customizado "CustomSelect"
  E o administrador pode alternar as permissões de "Leitura", "Escrita" e "Exclusão" nos 7 módulos
  E ao clicar em "Salvar Matriz de Permissões", as alterações devem ser salvas com sucesso
```
