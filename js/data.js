/*
 * DATA.JS — Fonte única de verdade
 * Todos os valores abaixo foram extraídos literalmente do arquivo:
 * "RH - RESULTADOS DE RH 2º TRIMESTRE 26.pdf" (20 páginas).
 * Nenhum número, percentual ou texto foi alterado, arredondado ou estimado.
 * Cada bloco referencia a página de origem no PDF (campo `page`) para rastreabilidade.
 * Onde um valor exato não está disponível como texto no PDF (ex.: barras de gráfico
 * sem rótulo numérico), o campo é marcado como NAO_LEGIVEL.
 */

const NAO_LEGIVEL = "Informação não legível no PDF.";

const RH_DATA = {
  meta: {
    empresa: "Pernambuco Motos",
    relatorio: "Resultados do RH — 2º Trimestre de 2026",
    competencia: "ABRIL — JUNHO / 2026",
    visaoGeralTexto: "Apresentação dos principais indicadores, performance organizacional e estratégias da gestão de pessoas.",
    dataEmissao: "Não especificada no documento original.",
    fonte: "RH - RESULTADOS DE RH 2º TRIMESTRE 26.pdf",
    paginas: 20
  },

  // PÁGINA 2 — Composição do RH
  composicao: {
    page: 2,
    titulo: "RH Estratégico e Subdividido",
    pessoas: [
      {
        nome: "Mirella",
        responsabilidades: [
          "Responsável pelo Recrutamento e Seleção, conduzindo todo o processo de ponta a ponta, desde o alinhamento da vaga com o gestor até a contratação de profissionais alinhados à cultura e às necessidades da empresa.",
          "Atuará também em Clima Organizacional e Engajamento, implementando planos de ação para fortalecer o ambiente de trabalho e a experiência dos colaboradores."
        ]
      },
      {
        nome: "Ikaro e Arianny",
        intro: "Responsáveis pelos demais subsistemas estratégicos de RH, incluindo:",
        responsabilidades: [
          "Treinamento e Desenvolvimento (T&D) e Desenvolvimento Organizacional (DO);",
          "Endomarketing e Comunicação Interna;",
          "People Analytics, com acompanhamento de indicadores, dashboards e apoio à tomada de decisão;",
          "Employer Branding, Onboarding e gestão da experiência do colaborador desde sua integração;",
          "Remuneração e Benefícios, apoiando a gestão de políticas de valorização e retenção de talentos.",
          "Política de Cargos e Salários e Fluxos de Desligamentos."
        ]
      }
    ]
  },

  // PÁGINA 3 — Sumário Executivo
  resumoExecutivo: {
    page: 3,
    visaoGeral: "O 2º trimestre apresentou um cenário de alerta operacional crítico, com vitórias isoladas na atração de talentos. A incapacidade de manter a força de trabalho ativa e produtiva se refletiu em indicadores preocupantes, especialmente no absenteísmo, que atingiu níveis insustentáveis em maio.",
    cards: [
      {
        tipo: "alerta",
        titulo: "Alerta",
        texto: "Absenteísmo chegou a 12,38% em maio, indicando um ponto de atenção que segue sob controle."
      },
      {
        tipo: "positivo",
        titulo: "Vitória em R&S",
        texto: "Maturidade na eficiência do Recrutamento & Seleção, com contratações rápidas e de alta qualidade técnica e cultural."
      }
    ],
    conquistas: [
      "As ações implementadas no T126 — incluindo a implantação do fluxo de Recrutamento e Seleção (R&S), o controle do período de experiência e a criação do Canal de Comunicação Interna — já estão em pleno funcionamento e vêm apresentando resultados positivos.",
      "Realizamos duas ações de endomarketing, em comemoração ao Dia das Mães e ao São João. Ambas foram muito bem recebidas pelos colaboradores, gerando comentários positivos e fortalecendo o engajamento, o sentimento de valorização e a integração entre as equipes.",
      "Também realizamos dois módulos do Programa de Desenvolvimento de Líderes (PDL), promovendo a capacitação contínua das nossas lideranças. Os encontros têm fortalecido o engajamento dos líderes e ampliado a compreensão sobre a importância estratégica do RH."
    ],
    riscosOportunidades: [
      "Oportunidade estratégica de acompanhamento das lideranças para atuar na gestão de pessoas e processos.",
      "Necessidade de automação de processos para escalar a eficiência do RH."
    ],
    headcountEstavel: {
      titulo: "Headcount Estável",
      texto: "Crescimento leve de 1.354 para 1.374 colaboradores no período, com distribuição equilibrada entre as três unidades.",
      de: 1354,
      para: 1374
    }
  },

  // PÁGINA 4 — Resumo Geral de Headcount
  headcount: {
    page: 4,
    subtitulo: "Visão consolidada e distribuição demográfica por região",
    cards: [
      { label: "Headcount Total", valor: 1374, desc: "Nº de funcionários ativos no último dia do mês" },
      { label: "Headcount Masculino", valor: 879, desc: "Nº de homens ativos na organização" },
      { label: "Headcount Feminino", valor: 495, desc: "Nº de mulheres ativas na organização" },
      { label: "% Feminino (Geral)", valor: "36,0%", desc: "= feminino / total" }
    ]
  },

  // PÁGINAS 5 e 6 — Recrutamento & Seleção
  recrutamento: {
    page: "5-6",
    categoria: "AQUISIÇÃO DE TALENTOS",
    titulo: "Recrutamento & Seleção — O Destaque do Trimestre",
    introducao: "Enquanto os indicadores de retenção preocupam, o R&S entregou resultados excepcionais. O amadurecimento do processo seletivo com o ATS Pandapé (iniciado no 1T26) provou sua eficácia com números históricos.",
    tempoPreenchimento: {
      page: 5,
      titulo: "Tempo Médio de Preenchimento (dias)",
      unidadeEixoY: "Dias",
      meta: { texto: "Meta (≤ 30 dias): 30", valor: 30 },
      dados: [
        { mes: "Abril", valor: 15 },
        { mes: "Maio", valor: 16 },
        { mes: "Junho", valor: 20 }
      ]
    },
    taxaAprovacaoExperiencia: {
      page: 5,
      titulo: "Taxa de Aprovação na Experiência (%)",
      unidadeEixoY: "Aprovação (%)",
      meta: { texto: "Meta (≥ 80%): 80", valor: 80 },
      dados: [
        { mes: "Abril", valor: null, legivel: false },
        { mes: "Maio", valor: null, legivel: false },
        { mes: "Junho", valor: null, legivel: false }
      ],
      obs: "O PDF apresenta este gráfico apenas na forma visual (barras), sem rótulos numéricos de texto sobre cada barra. " + NAO_LEGIVEL
    },
    funil: {
      page: 6,
      titulo: "Funil de Candidatos (Mês Atual)",
      vagasAbertas: { valor: 28, regional: "PE" },
      timeToHire: { valor: "17 dias", regional: "PE" },
      etapas: [
        { nome: "Candidaturas", valor: "~2000", numero: 2000, desc: "Oportunidades em aberto" },
        { nome: "Triados", valor: "~800", numero: 800 },
        { nome: "Entrevistas", valor: "160", numero: 160, desc: "Tempo médio de contratação" },
        { nome: "Vagas Fechadas", valor: "16", numero: 16, desc: "das vagas concluídas" }
      ],
      percentualConcluido: "57%"
    },
    notas: [
      {
        titulo: "Atenção ao fluxo de Consórcio:",
        texto: "A etapa de entrevista para as vagas deste departamento não é realizada pelo RH. A atuação da equipe restringe-se exclusivamente à triagem e ao envio de candidatos qualificados para os gestores."
      },
      {
        titulo: "Autonomia Regional:",
        texto: "O processo de recrutamento é descentralizado. As rotinas seletivas são conduzidas individualmente pelas equipes locais de cada estado (AL, PE, RJ)."
      }
    ]
  },

  // PÁGINA 7 — Análise de Retenção / Turnover Geral
  turnoverGeral: {
    page: 7,
    titulo: "Turnover Geral — Rotatividade Total",
    desligamentosTrimestre: {
      total: 226,
      meses: [
        { mes: "Abril", valor: 89 },
        { mes: "Maio", valor: 59 },
        { mes: "Junho", valor: 78 }
      ]
    },
    leituraIndicador: "A média trimestral ficou em ~5,4%, levemente abaixo dos ~5,9% do 1T26, mas ainda muito acima do teto aceitável (3,5%). A queda em maio foi pontual — junho reascendeu o alerta.",
    turnoverVoluntario: {
      titulo: "Turnover Voluntário — Positivo",
      texto: "Queda vertiginosa de 2,93% para 0,28%, operando muito abaixo do teto de 2,0%. Indica que os funcionários não estão querendo sair — possivelmente devido à boa percepção de estabilidade gerada no 1º trimestre.",
      de: "2,93%",
      para: "0,28%",
      teto: "2,0%"
    },
    impactoNoNegocio: [
      "A avaliação do período de experiência teve um reflexo positivo em relação ao turnover do trimestre passado;",
      "Alto custo de rescisão e multas de FGTS;",
      "Perda crônica de produtividade operacional;",
      "Sobrecarga nas equipes remanescentes;",
      "Qualidade do serviço ao cliente comprometida."
    ]
  },

  // PÁGINA 8 — Análise de Turnover por mês/estado
  turnoverPorMes: {
    page: 8,
    subtitulo: "Evolução dos desligamentos ao longo do trimestre e quebra por estado",
    meses: [
      {
        mes: "Abril",
        total: 89,
        porEstado: [ { estado: "PE", valor: 38 }, { estado: "RJ", valor: 26 }, { estado: "AL", valor: 25 } ],
        analiseTitulo: "Alerta PE:",
        analiseTexto: "Maior volume do mês, tracionado por Consórcio e Veículos Novos (22 saídas conjuntas)."
      },
      {
        mes: "Maio",
        total: 58,
        porEstado: [ { estado: "AL", valor: 27 }, { estado: "RJ", valor: 21 }, { estado: "PE", valor: 10 } ],
        analiseTitulo: "Melhoria em PE:",
        analiseTexto: "Queda drástica nas saídas (-73% vs Abr). AL assume a liderança de saídas devido ao Consórcio."
      },
      {
        mes: "Junho",
        total: 78,
        porEstado: [ { estado: "AL", valor: 48 }, { estado: "PE", valor: 16 }, { estado: "RJ", valor: 14 } ],
        analiseTitulo: "Pico Crítico (AL):",
        analiseTexto: "Disparo nas demissões, sendo 39 exclusivas do Consórcio. RJ e PE mantêm volumes controlados."
      }
    ],
    totalDesligamentos: {
      total: 225,
      periodo: "Acumulado (Abr, Mai, Jun)",
      porEstado: [
        { estado: "AL", valor: 100, percentual: "44%" },
        { estado: "PE", valor: 64, percentual: "29%" },
        { estado: "RJ", valor: 61, percentual: "27%" }
      ]
    }
  },

  // PÁGINA 9 — Desligamentos por Departamento
  desligamentosDepartamento: {
    page: 9,
    subtitulo: "Identificação de áreas críticas e zonas de retenção (Acumulado Abr-Jun)",
    areasCriticas: {
      titulo: "Áreas Críticas (Alto Turnover)",
      itens: [
        { titulo: "1. Consórcio (AL):", texto: "Representa sozinho 36% de todos os desligamentos da empresa no trimestre (82 de 225). O giro neste estado é extremamente agressivo." },
        { titulo: "2. Veículos Novos (RJ):", texto: "Com 23 saídas (metade das baixas do departamento), a regional carioca apresenta dificuldade de retenção na força de vendas." }
      ]
    },
    melhorRetencao: {
      titulo: "Melhor Retenção (Estabilidade)",
      itens: [
        { titulo: "1. Pós-Vendas (Oficina/Peças):", texto: "Somados, representam apenas 6% dos desligamentos globais, demonstrando forte retenção nos 3 estados." },
        { titulo: "2. Administrativo (AL e PE):", texto: "Quase não registraram saídas no trimestre (2 em AL, 6 em PE), mostrando grande estabilidade no backoffice nordestino." }
      ]
    }
  },

  // PÁGINA 10 — Comparação Detalhada: Folha x Demissões
  custosFolha: {
    page: 10,
    titulo: "Comparação Detalhada: Folha x Demissões",
    tabela: {
      colunas: ["Mês", "Folha Bruta (R$)", "Demissões (R$)", "Impacto (%)"],
      linhas: [
        { mes: "Abril", folhaBruta: "R$ 5.513.549,41", demissoes: "R$ 453.998,54", impacto: "8,23%" },
        { mes: "Maio", folhaBruta: "R$ 5.664.352,20", demissoes: "R$ 215.399,08", impacto: "3,80%" }
      ],
      obsJunho: "Não há linha para o mês de Junho nesta tabela do PDF original (dado não constante)."
    },
    analiseCustos: {
      titulo: "Análise de Custos com Demissões (Tri)",
      custoMedioPorDesligamento: "R$ 4.639,87",
      valorTotalGasto: "R$1.04M",
      desligamentosRealizados: 226,
      meses: [
        { mes: "Abril (Mês mais crítico):", valor: "R$ 453.998,54 (89 demissões)", obs: "Pico de cortes em PE e RJ." },
        { mes: "Maio:", valor: "R$ 215.399,08 (59 demissões)", obs: "Queda abrupta artificial, mascarada pelo aumento de demissões em AL." },
        { mes: "Junho:", valor: "R$ 379.212,96 (78 demissões)", obs: "Retomada de alta geral." }
      ]
    }
  },

  // PÁGINA 11 — Análise de Custo por Estado
  custoPorEstado: {
    page: 11,
    titulo: "Análise de Custo por Estado",
    ranking: [
      { posicao: "1º", estado: "Rio de Janeiro", custoTotal: "R$ 432.910,62", participacao: "41,3%", desligamentos: 61, custoMedio: "R$ 7.096,89" },
      { posicao: "2º", estado: "Pernambuco", custoTotal: "R$ 325.556,56", participacao: "31,0%", desligamentos: 64, custoMedio: "R$ 5.086,82" },
      { posicao: "3º", estado: "Alagoas", custoTotal: "R$ 290.143,40", participacao: "27,7%", desligamentos: 101, custoMedio: "R$ 2.872,71" }
    ],
    paretoTitulo: "Análise por Departamento (O Pareto do Custo)",
    pareto: [
      {
        estado: "Alagoas (Risco Estrutural)",
        texto: "Possui o menor custo financeiro total, mas concentra quase metade de todo o volume de demissões (101). O baixíssimo custo médio indica que a operação contrata e demite em altíssima velocidade. É uma verdadeira \"máquina de moer gente\"."
      },
      {
        estado: "Rio de Janeiro",
        texto: "Frequência menor, mas o custo individual da demissão é extremamente alto. Focado em líderes de vendas, comissionamentos elevados ou profissionais com tempo de casa."
      }
    ]
  },

  // PÁGINA 12 — Foco Regional: Rio de Janeiro (Veículos Novos)
  focoRJ: {
    page: 12,
    titulo: "Foco Regional: Rio de Janeiro (Veículos Novos)",
    subtitulo: "Análise detalhada de turnover, custos rescisórios e motivos de saída por gestor comercial",
    totalDesligamentos: 23,
    custoRescisorioTotal: "R$ 273.726,79",
    tag: "ALTO VOLUME",
    regioes: [
      { regiao: "Região 1", gestor: "Roberto Júnior", lojas: "Bonsucesso 2, Catete, Irajá, Recreio", demissoes: 9, custo: "129.200,80" },
      { regiao: "Região 2", gestor: "Vinícius Correia", lojas: "Bonsucesso 1, Duque de Caxias, Ilha do Governador, Majé", demissoes: 4, custo: "91.288,84" },
      { regiao: "Região 3", gestor: "Fábio Anselmo", lojas: "Itaboraí, Maricá, Niterói, São Gonçalo", demissoes: 6, custo: "22.671,27" },
      { regiao: "Região 4", gestor: "Rodrigo Edde", lojas: "Santa Cruz", demissoes: 4, custo: "30.565,88" }
    ],
    conclusoes: [
      {
        titulo: "1. Custo vs. Volume na Região 2:",
        texto: "A Região 2 teve apenas 4 demissões, mas gerou R$ 91k em custos (média de R$ 22,8k/demissão — 60% maior que a média da Região 1). Isso indica desligamento de profissionais com muito tempo de casa ou salários maiores."
      },
      {
        titulo: "2. Gestão de Baixa Performance:",
        texto: "Mais da metade das saídas (56%) foram Demissões Sem Justa Causa iniciadas pela empresa. Isso evidencia que o turnover no RJ-VN não é fuga de talentos, mas sim uma necessidade da empresa de expurgar colaboradores de baixa performance ou erros de contratação prévia."
      }
    ]
  },

  // PÁGINA 13 — Visão Geral do Turnover / Conclusões Estratégicas (Indicadores Estratégicos)
  indicadoresEstrategicos: {
    page: 13,
    titulo: "Visão Geral do Turnover",
    diagnosticoMacro: {
      titulo: "Diagnóstico Macro",
      paragrafos: [
        "O trimestre encerra com 225 desligamentos globais frente a um Headcount de 1.374 colaboradores, gerando um turnover trimestral aproximado de 16,3% a 17,5% (considerando a média das entradas).",
        "A rotatividade não é homogênea. Metade dos desligamentos da empresa advém de um único departamento (Consórcio: 112 saídas), indicando que o problema é pontual de modelo de negócio/operação, e não estrutural de cultura ou RH."
      ]
    },
    conclusoesEstrategicas: {
      titulo: "Conclusões Estratégicas",
      itens: [
        { titulo: "O \"Fator Consórcio\":", texto: "Excluindo as operações de consórcio, o turnover da companhia cairia pela metade (apenas 113 saídas no 2T26." },
        { titulo: "Estabilidade do Backoffice:", texto: "Áreas Administrativas, Web e Pós-Vendas seguram o headcount, com times maduros e baixa evasão." },
        { titulo: "Alerta Regional RJ:", texto: "Fora do consórcio, o RJ é a praça com maior giro proporcional em Vendas (Veículos Novos) e Administrativo." }
      ]
    },
    tabelaDepartamento: {
      titulo: "Departamento",
      colunas: ["Departamento", "Admissões", "Demissões", "Giro"],
      linhas: [
        { departamento: "Consórcio", admissoes: 130, demissoes: 112, giro: "Altíssimo" },
        { departamento: "Veículos Novos", admissoes: 42, demissoes: 48, giro: "Alto" },
        { departamento: "Administrativo", admissoes: 41, demissoes: 22, giro: "Crescimento" },
        { departamento: "Web", admissoes: 21, demissoes: 18, giro: "Equilibrado" },
        { departamento: "Pós-Vendas", admissoes: 12, demissoes: 15, giro: "Estável" }
      ],
      analise: "Consórcio e Veículos Novos representam uma \"porta giratória\", consumindo 67% de todo o esforço de Recrutamento apenas para repor as vagas abertas por demissões."
    },
    tabelaEstado: {
      titulo: "Estado / Regional",
      colunas: ["Estado / Regional", "Admissões", "Demissões", "Saldo"],
      linhas: [
        { estado: "Alagoas (AL)", admissoes: 116, demissoes: 100, saldo: "+16" },
        { estado: "Pernambuco (PE)", admissoes: 88, demissoes: 64, saldo: "+24" },
        { estado: "Rio de Janeiro (RJ)", admissoes: 51, demissoes: 61, saldo: "-10" },
        { estado: "TOTAL GERAL", admissoes: 255, demissoes: 225, saldo: "+30", isTotal: true }
      ],
      analise: "A operação como um todo cresceu (saldo positivo de +30 vagas). No entanto, o RJ reduziu seu quadro (perdeu mais pessoas do que contratou no período)."
    }
  },

  // PÁGINA 14 — Endomarketing
  endomarketing: {
    page: 14,
    titulo: "Ações de Clima do Trimestre 2T26",
    acoes: [
      {
        nome: "Dia das Mães",
        texto: "A ação proporcionou momentos de emoção e satisfação, reforçando o sentimento de valorização das colaboradoras por meio da homenagem realizada. Além de celebrar a data, trouxe reflexões sobre a saúde da mulher para além da maternidade e abordou os desafios vivenciados nesse período, agregando conscientização e cuidado à iniciativa."
      },
      {
        nome: "São João",
        texto: "A ação de clima teve uma receptividade muito positiva desde o convite, demonstrando o engajamento dos colaboradores. A iniciativa promoveu interação entre diferentes setores, fortaleceu o sentimento de inclusão e valorizou a data comemorativa, refletido na adesão às roupas temáticas e na participação das equipes. Além disso, a ação gerou expectativa para as próximas iniciativas, reforçando o impacto positivo das ações de clima na empresa."
      }
    ]
  },

  // PÁGINA 15 — Treinamento e Desenvolvimento
  treinamentoDesenvolvimento: {
    page: 15,
    titulo: "Programa de Desenvolvimento de Líderes",
    modulos: [
      {
        nome: "Módulo II — Comunicação e Feedback",
        texto: "O segundo módulo fortaleceu competências essenciais para a liderança, com foco em comunicação assertiva, comunicação não violenta e gestão de pessoas. Além de preparar os gestores para conduzir feedbacks mais estruturados e efetivos, o treinamento representou um passo importante para a implantação do ciclo de feedback da empresa, promovendo uma cultura de desenvolvimento contínuo e alinhamento entre líderes e equipes."
      },
      {
        nome: "Módulo III — Gestão de Equipes, Conflitos e Conversas Difíceis",
        texto: "O terceiro módulo preparou os gestores para lidar com situações desafiadoras da rotina de liderança, desenvolvendo habilidades para conduzir conversas difíceis, gerenciar conflitos e manter uma comunicação clara e respeitosa. O conteúdo também reforçou a importância do autoconhecimento como ferramenta para tomadas de decisão mais equilibradas e para uma gestão de equipes mais madura e eficaz."
      }
    ]
  },

  // PÁGINA 18 — Projetos Estratégicos em andamento
  projetosAndamento: {
    page: 18,
    titulo: "Projetos Estratégicos – Em andamento",
    subtitulo: "Principais iniciativas estruturantes de Recursos Humanos focadas em dados, cultura e experiência",
    itens: [
      { nome: "Programa NR-1 (Segurança)", texto: "Planejamento e execução do calendário anual de ações coletivas, garantindo o cumprimento da NR-1 por meio de campanhas, palestras e iniciativas voltadas à saúde, segurança e bem-estar." },
      { nome: "Plataforma de Indicadores (People Analytics)", texto: "Desenvolvimento de uma plataforma para centralizar os indicadores de RH, permitindo o monitoramento de métricas, armazenamento de dados históricos e apoio à tomada de decisões baseada em dados." },
      { nome: "Kit de Onboarding", texto: "Desenvolvimento de um kit de boas-vindas para tornar a integração dos novos colaboradores mais acolhedora, fortalecendo a experiência de entrada e o senso de pertencimento." },
      { nome: "Parcerias e Benefícios", texto: "Expansão da rede de convênios com parceiros (universidades, idiomas, farmácias, óticas, academias, lazer, órgãos públicos), ampliando os benefícios oferecidos aos colaboradores." }
    ]
  },

  // PÁGINA 19 — Projetos Estratégicos Encaminhados
  projetosEncaminhados: {
    page: 19,
    titulo: "Projetos Estratégicos - Encaminhados",
    subtitulo: "Principais iniciativas estruturantes de Recursos Humanos focadas em dados, cultura e experiência",
    itens: [
      { nome: "Estruturação de Cargos e Salários", texto: "Mapeamento de todos os cargos, elaboração das descrições e responsabilidades, realização de benchmark salarial e padronização da estrutura de remuneração conforme o mercado." },
      { nome: "Pesquisa de Clima Organizacional", texto: "Acompanhamento da consultoria responsável pela pesquisa, gestão da comunicação interna e elaboração de planos de ação para tratar os principais pontos de melhoria identificados." },
      { nome: "Fortalecimento da Marca (Employer Branding)", texto: "Otimização de perfis institucionais (Glassdoor, InfoJobs) para fortalecer a marca empregadora, aumentar a atratividade para talentos e melhorar a experiência de candidatos." },
      { nome: "Fluxo de Desligamento", texto: "Estruturação de processo humanizado e padronizado (entrevistas, checklist, KPIs), garantindo uma experiência respeitosa para o colaborador e maior segurança para a empresa." }
    ]
  },

  // PÁGINA 17 — Leitura Gerencial (Insights)
  insights: {
    page: 17,
    titulo: "Leitura Gerencial — O Que Esses Números Dizem Sobre a Empresa?",
    introducao: "Estamos contratando muito bem, mas perdendo pessoas de formas que podemos controlar. O RH acertou na seleção — o desafio agora é garantir que a liderança retenha e desenvolva esses talentos.",
    cards: [
      {
        titulo: "A Liderança Precisa Atuar na Retenção",
        texto: "O aumento do turnover involuntário evidencia a necessidade de feedbacks corretivos antes da decisão pelo desligamento. A Avaliação do Período de Experiência já contribuiu para a redução desse indicador, porém é essencial ampliar o engajamento dos gestores na aplicação da ferramenta, promovendo feedbacks, acompanhamento e desenvolvimento dos colaboradores."
      },
      {
        titulo: "Alertas Regionais Distintos",
        texto: "O estado de Alagoas é o epicentro da rotatividade do Consórcio (82 desligamentos apenas nesta regional). Por outro lado, o Rio de Janeiro acende um alerta diferente: foi a única regional a encolher seu quadro no trimestre, impulsionada por grave dificuldade de retenção na equipe de Veículos Novos."
      },
      {
        titulo: "O Custo Oculto do R&S",
        texto: "O setor de RH apresenta excelentes métricas operacionais (Time-to-Hire de 17 dias). Contudo, 67% de todo o esforço produtivo de Contratação está sendo drenado apenas para repor vagas de Consórcio (AL e PE) e Veículos Novos (RJ). Principalmente porque o RH não se envolve no recrutamento de Consórcio ponta-a-ponta, o que dificulta o controle e qualidade das admissões deste departamento."
      },
      {
        titulo: "O Pilar de Estabilidade",
        texto: "As áreas de Backoffice (Administrativo, Web) e Pós-Vendas (Oficina, Peças) funcionam como a verdadeira fortaleza da companhia. Apresentam maturidade corporativa, extrema estabilidade e baixíssima evasão."
      }
    ]
  },

  // PÁGINA 16 — Plano de Ação & Soluções
  planoAcao: {
    page: 16,
    titulo: "Plano de Ação & Soluções (Executive View)",
    subtitulo: "Iniciativas diretas focadas em redução de custos rescisórios, produtividade e retenção comercial.",
    colunas: [
      {
        numero: "1.",
        titulo: "Estancar Sangria no Consórcio",
        blocos: [
          { titulo: "Choque de Realidade:", texto: "Alinhar agressividade e expectativas reais de vendas logo no primeiro dia (D0) para afastar aventureiros." },
          { titulo: "Revisão de Metas Iniciais:", texto: "Ajustar a curva de cobrança nos primeiros 90 dias para evitar frustração precoce e abandono." }
        ]
      },
      {
        numero: "2.",
        titulo: "Trava de Custos Rescisórios (RJ)",
        blocos: [
          { titulo: "Filtro Rigoroso na Entrada:", texto: "Tornar obrigatórios os testes comportamentais do sistema para aprovar contratações." },
          { titulo: "Checkpoints (45/75 dias):", texto: "Avaliação mandatória do gestor antes do fim do contrato de experiência para evitar demissões tardias e caras." }
        ]
      },
      {
        numero: "3.",
        titulo: "Recrutamento Consórcio",
        blocos: [
          { titulo: "Auditoria Operacional em Alagoas:", texto: "Conduzir reuniões com a liderança local para entender por que 101 pessoas rodaram em 3 meses." },
          { titulo: "Revisão de Onboarding Comercial:", texto: "AL sinaliza falhas nos primeiros 90 dias. Treinamentos devem focar na sustentação da performance inicial." }
        ]
      },
      {
        numero: "4.",
        titulo: "Coparticipação da Liderança",
        blocos: [
          { titulo: "Turnover dói no Bolso:", texto: "Atrelar uma parcela da remuneração variável/bônus dos Gerentes à taxa de retenção de suas equipes." },
          { titulo: "Benchmark Interno:", texto: "Replicar o modelo de gestão e liderança adotado nas áreas estáveis (Pós-Vendas) para o resto da rede." }
        ]
      }
    ]
  },

  // PÁGINA 20 — Próximos Passos - Plano de Ação 3T26
  proximosPassos: {
    page: 20,
    titulo: "Próximos Passos — Plano de Ação 3T26",
    subtitulo: "Frentes prioritárias de atuação para o 3º trimestre de 2026.",
    itens: [
      {
        numero: "1",
        titulo: "Julho — Parcerias, Ações de Clima e Estrátegia",
        texto: "Foco na prospecção e formalização de parcerias que ampliem os benefícios oferecidos aos colaboradores. Também serão realizadas ações de clima voltadas ao Dia do Homem, além da estruturação dos fluxos e do planejamento estratégico da atuação do RH para o segundo semestre."
      },
      {
        numero: "2",
        titulo: "Julho/Agosto — Ciclo de Feedback",
        texto: "Realização do ciclo de feedbacks, no período de 27/07 a 14/08, com o objetivo de acompanhar o desenvolvimento dos colaboradores, alinhar expectativas, identificar oportunidades de melhoria e apoiar a construção dos Planos de Desenvolvimento Individual (PDIs)."
      },
      {
        numero: "3",
        titulo: "Agosto — Ações de Clima e T&D",
        texto: "Execução das ações de engajamento em comemoração ao Dia dos Pais e encerramento do último módulo do Programa de Desenvolvimento de Líderes (PDL). Nesse período, também serão coletados feedbacks dos participantes para avaliar os resultados do programa e identificar oportunidades de evolução para as próximas edições."
      },
      {
        numero: "4",
        titulo: "Setembro — Pesquisa de Clima e Fluxo de Desligamento",
        texto: "Condução da Pesquisa de Clima Organizacional, desde a comunicação até a análise dos resultados e elaboração do plano de ação. Paralelamente, será implantado o fluxo de desligamento humanizado, buscando compreender os principais motivos das saídas, fortalecer a experiência do colaborador e contribuir para a redução do turnover da empresa."
      }
    ],
    metaPrioritaria: "Implementar e acompanhar o Ciclo de Feedback em toda a empresa, fortalecendo a cultura de desenvolvimento contínuo e o alinhamento entre líderes e colaboradores. Paralelamente, realizar o acompanhamento dos resultados da Pesquisa de Clima Organizacional, elaborando e monitorando planos de ação contínuos que promovam melhorias no ambiente de trabalho, fortaleçam a experiência dos colaboradores e contribuam para o desenvolvimento da empresa e da marca empregadora."
  }
};

// ============================================================
// COMPARATIVO 2025 ~ 2026 — dados mock preparados para comparação direta
// entre o 2º Trimestre de 2025 e o 2º Trimestre de 2026, por estado
// (Pernambuco, Alagoas, Rio de Janeiro) e Total Consolidado.
// Estrutura pronta para receber atualizações futuras (basta editar os arrays).
// ============================================================
const COMPARATIVO_DATA = {
  labelsEstados: ["Pernambuco (PE)", "Alagoas (AL)", "Rio de Janeiro (RJ)", "Total Consolidado"],

  headcount: {
    titulo: "Headcount Total",
    unidade: "colaboradores",
    serie2025: [387, 468, 368, 1223],
    serie2026: [455, 529, 390, 1374]
  },

  aprovacaoExperiencia: {
    titulo: "Retenção no Período de Experiência (Aprovados 45d vs 90d)",
    unidade: "aprovados",
    aprov45_2025: [63, 82, 66, 211],
    aprov45_2026: [54, 94, 44, 192],
    aprov90_2025: [47, 46, 43, 136],
    aprov90_2026: [42, 70, 36, 148]
  },

  absenteismo: {
    titulo: "Absenteísmo",
    unidade: "%",
    serie2025: [9.77, 6.67, 16.68, 11.75],
    serie2026: [11.13, 7.63, 18.81, 13.25]
  },

  turnover: {
    titulo: "Turnover",
    unidade: "%",
    serie2025: [15.18, 21.51, 15.25, 17.58],
    serie2026: [13.91, 18.61, 15.20, 16.10]
  },

  tempoCasa: {
    titulo: "Tempo Médio de Casa / Tenure (Fechamento Junho)",
    unidade: "meses",
    serie2025: [9.3, 8.3, 10.4, 28.0],
    serie2026: [10.1, 8.0, 15.1, 33.1]
  },

  custosDesligamentos: {
    titulo: "Custos de Desligamentos",
    unidade: "R$ mil",
    serie2025: [366, 239, 308, 913],
    serie2026: [326, 290, 433, 1049]
  }
};

// KPIs consolidados para a seção "Indicadores Gerais" (Visão Geral rápida).
// Todos os valores abaixo já constam individualmente em outras páginas do PDF (referenciadas em `page`);
// esta seção apenas os reúne visualmente, sem alterar nenhum número.
const KPI_GERAIS = [
  { id: "headcount", label: "Headcount Total", valor: "1.374", variacao: "de 1.354 no trimestre anterior", tipo: "neutro", page: 4, icon: "fa-users" },
  { id: "turnover", label: "Turnover Médio Trimestral", valor: "~5,4%", variacao: "Teto aceitável: 3,5%", tipo: "critico", page: 7, icon: "fa-right-from-bracket" },
  { id: "desligamentos", label: "Desligamentos no Trimestre", valor: "225", variacao: "Acumulado Abr–Jun (pág. 8/9/11/13)", tipo: "atencao", page: 8, icon: "fa-user-slash" },
  { id: "absenteismo", label: "Absenteísmo (Maio)", valor: "12,38%", variacao: "Pico do trimestre", tipo: "critico", page: 3, icon: "fa-triangle-exclamation" },
  { id: "voluntario", label: "Turnover Voluntário", valor: "0,28%", variacao: "Queda de 2,93% → 0,28%", tipo: "positivo", page: 7, icon: "fa-arrow-trend-down" },
  { id: "tth", label: "Time-to-Hire (PE)", valor: "17 dias", variacao: "Média do funil de recrutamento", tipo: "positivo", page: 6, icon: "fa-stopwatch" },
];

// ============================================================
// GRÁFICOS NOVOS — conjunto adicional de gráficos fornecido em anexo
// (histórico acumulado de vagas fechadas, contratações por estado,
// motivos de desligamento, volume de desligamentos por departamento
// e pareto de custo por departamento). Mesma estrutura de dados
// (objetos simples com arrays) usada no restante do dashboard, para
// reaproveitar 100% das funções de renderização de gráficos já existentes.
// ============================================================
const NOVOS_GRAFICOS_DATA = {
  vagasFechadasDepartamento: {
    titulo: "Vagas Fechadas por Departamento (Histórico Acumulado)",
    totalAcumulado: 255,
    dados: [
      { departamento: "Consórcio", valor: 130, percentual: "51%" },
      { departamento: "Veículos Novos", valor: 42, percentual: "16%" },
      { departamento: "Administrativo", valor: 41, percentual: "16%" },
      { departamento: "Web", valor: 21, percentual: "8%" },
      { departamento: "Seminovos", valor: 9, percentual: "4%" },
      { departamento: "Oficina (Admin+Prod)", valor: 8, percentual: "3%" },
      { departamento: "Peças", valor: 4, percentual: "2%" }
    ]
  },

  contratacoesPorEstado: {
    titulo: "Contratações por Estado",
    total: 255,
    dados: [
      { estado: "AL", valor: 116, percentual: "45%" },
      { estado: "PE", valor: 88, percentual: "35%" },
      { estado: "RJ", valor: 51, percentual: "20%" }
    ]
  },

  motivosDesligamento: {
    titulo: "Motivos de Desligamento",
    dados: [
      { motivo: "Em período de Exp. (empresa)", valor: 69 },
      { motivo: "Demissão sem justa causa", valor: 58 },
      { motivo: "Demissionário", valor: 50 },
      { motivo: "Em período de Exp. (pedido)", valor: 39 },
      { motivo: "Demissão com justa causa", valor: 5 },
      { motivo: "Demissão em comum acordo", valor: 3 },
      { motivo: "Morte", valor: 2 }
    ]
  },

  volumeDesligamentosDepartamento: {
    titulo: "Volume Total de Desligamentos por Departamento",
    dados: [
      { departamento: "Consórcio", valor: 112 },
      { departamento: "Veículos Novos", valor: 48 },
      { departamento: "Administrativo", valor: 22 },
      { departamento: "Web", valor: 18 },
      { departamento: "Oficina (Admin+Prod)", valor: 8 },
      { departamento: "Peças", valor: 7 },
      { departamento: "Seminovos", valor: 5 }
    ],
    composicaoConsorcio: "Alagoas (82), Pernambuco (27), Rio de Janeiro (3)."
  },

  custoPorDepartamentoPareto: {
    titulo: "Análise por Departamento (O Pareto do Custo)",
    unidade: "R$ mil",
    dados: [
      { departamento: "Veículos Novos (R$510K)", valor: 510, percentual: "48,6%" },
      { departamento: "Consórcio (R$313K)", valor: 313, percentual: "29,9%" },
      { departamento: "Web (R$101K)", valor: 101, percentual: "9,6%" },
      { departamento: "Administrativo (R$53K)", valor: 53, percentual: "5,1%" },
      { departamento: "Peças (R$31K)", valor: 31, percentual: "2,9%" },
      { departamento: "Outros (R$39K)", valor: 39, percentual: "3,9%" }
    ]
  }
};
