# Dashboard Executivo de RH — Resultados 2º Trimestre 2026 | Pernambuco Motos

Dashboard estático (HTML/CSS/JS) que apresenta os resultados de RH do 2º trimestre de 2026 da Pernambuco Motos, com navegação por abas, gráficos interativos (Chart.js), tabelas pesquisáveis/ordenáveis, painéis de detalhe e exportação para PDF/impressão.

## 🎯 Objetivo do projeto
Consolidar em um único painel executivo os principais indicadores de RH (headcount, turnover, absenteísmo, recrutamento, custos de desligamento, etc.), permitindo leitura rápida por qualquer stakeholder, com dados extraídos do relatório original em PDF.

## ✅ Funcionalidades implementadas

- **Navegação lateral (SPA por hash)**: Visão Geral, Composição RH, Indicadores, Recrutamento, Turnover, Custos, Desenvolvimento, Insights, Recomendações, Comparativo 2025/2026, **Gráficos novos**, Anexos.
- **Gráficos Chart.js** em todas as abas (barras, barras agrupadas/empilhadas, doughnut, pie), com paleta, tipografia, tooltips, legendas e grids padronizados.
- **Tabelas dinâmicas** com busca e ordenação por coluna (client-side).
- **Painel lateral de detalhes** (side panel) ao clicar em KPIs e cards.
- **Modal de gráfico ampliado** reutilizável para qualquer canvas registrado.
- **Exportação para PDF** (html2pdf.js) e impressão.
- **Design responsivo** (sidebar colapsável em mobile).

### 🆕 Aba "Comparativo 2025 ~ 2026" (atualizada nesta entrega)
A aba foi reconstruída para **não usar mais imagens estáticas** dos gráficos. Agora todos os 6 gráficos comparativos são renderizados com **Chart.js**, seguindo exatamente a mesma arquitetura, paleta de cores, tipografia, estrutura de `card.chart-card`, cabeçalho com botão de expandir (`data-expand-chart`) e modal de ampliação já usados nas abas Turnover, Recrutamento e Custos.

Gráficos implementados (todos em barras agrupadas 2025 vs 2026, por Pernambuco/Alagoas/Rio de Janeiro/Total Consolidado):
1. **Headcount Comparativo** — `#chart-comp-headcount`
2. **Taxa de Aprovação na Experiência** (Aprov. 45d vs 90d) — `#chart-comp-aprovacao`
3. **Absenteísmo (%)** — `#chart-comp-absenteismo`
4. **Turnover (%)** — `#chart-comp-turnover`
5. **Tempo de Casa / Tenure (meses)** — `#chart-comp-tempocasa`
6. **Custos de Desligamentos (R$ mil)** — `#chart-comp-custos`

Recursos mantidos/reaproveitados nesta aba:
- Filtros por categoria (`Todos`, `Pessoas & Retenção`, `Movimentação`, `Custos`) via `data-comp-filter`, com `resize()` automático dos gráficos ao trocar de filtro.
- Cards `chart-card hoverable` com painel lateral de detalhe (`data-panel`).
- Botão "expandir" (`data-expand-chart`) que abre o gráfico em modal, usando o `chartRegistry` global já existente no `app.js`.
- Grid responsivo: 2 colunas em desktop, 1 coluna em mobile (herdado de `.grid.grid-2`).

### 🆕 Aba "Gráficos novos" (nesta entrega)
Nova aba adicionada com **5 gráficos Chart.js** extraídos das imagens fornecidas em anexo, reaproveitando 100% da arquitetura existente (`makeChart()`, `CHART_COLORS`, `chartRegistry`, `.card.chart-card`, `.chart-card-head`, `.chart-wrap`, `data-expand-chart` + modal de ampliação, grid `.grid.grid-2` com 2 colunas em desktop / 1 em mobile). Nenhum padrão visual novo foi criado.

Gráficos implementados:
1. **Vagas Fechadas por Departamento** (histórico acumulado: 255) — barra horizontal — `#chart-vagas-fechadas-depto`
2. **Contratações por Estado** (total: 255) — doughnut — `#chart-contratacoes-estado`
3. **Motivos de Desligamento** — barra horizontal — `#chart-motivos-desligamento`
4. **Volume Total de Desligamentos por Departamento** — barra horizontal — `#chart-volume-desligamentos-depto`
5. **Análise por Departamento (O Pareto do Custo)** — doughnut — `#chart-custo-depto-pareto`

Recursos reaproveitados nesta aba:
- Cards `chart-card hoverable` com cabeçalho padrão e botão de expandir (`data-expand-chart`) abrindo modal via `chartRegistry`.
- Mesma paleta (`CHART_COLORS.dark/accent/accentLight/grayLine`), mesmos tooltips, legendas, grids de eixo e animações padrão do Chart.js já configurados globalmente no topo do `app.js`.
- Grid responsivo `.grid.grid-2` (2 gráficos por linha em desktop, 1 por linha em mobile).
- `resize()` automático ao trocar de aba, já tratado pela lógica genérica de `showSection()`/`chartRegistry`.

## 📂 Arquivos alterados/relevantes

- `index.html` — Seção `#comparativo-25-26`: os 6 blocos `<img>` foram substituídos por `<canvas>` dentro de `.chart-wrap`, com os mesmos cabeçalhos e botões de expandir das demais abas. Nova seção `#graficos-novos` adicionada (após Comparativo 2025/2026, antes de Anexos), com 5 `<canvas>` dentro de `.card.chart-card` seguindo exatamente a mesma marcação das demais abas. Novo item de navegação `Gráficos novos` no `#sidebar-nav`.
- `js/data.js` — Objeto `COMPARATIVO_DATA` com dados 2025 vs 2026 por estado e total consolidado. Novo objeto `NOVOS_GRAFICOS_DATA` com os dados dos 5 gráficos novos (vagas fechadas por departamento, contratações por estado, motivos de desligamento, volume de desligamentos por departamento, pareto de custo por departamento), extraídos das imagens anexadas.
- `js/app.js` — Função `renderComparativoCharts()` cria os 6 gráficos comparativos via `makeChart()`. Nova função `renderNovosGraficos()` (chamada dentro de `renderCharts()`) cria os 5 gráficos novos, reaproveitando `makeChart()` e `CHART_COLORS` sem nenhuma configuração nova de estilo/legenda/tooltip/grid além do já existente no arquivo.
- `css/style.css` — Nenhuma alteração necessária: a nova aba reaproveita 100% das classes já existentes (`.card`, `.chart-card`, `.chart-card-head`, `.chart-wrap`, `.expand-btn`, `.grid.grid-2`, `.bullet-list`, `.pill`).

## 🔗 Entradas / rotas funcionais (hash-based, single page)

| Rota (hash) | Conteúdo |
|---|---|
| `#visao-geral` | Resumo executivo |
| `#pessoas` | Composição do RH |
| `#indicadores` | Indicadores gerais e estratégicos |
| `#recrutamento` | Recrutamento & Seleção |
| `#turnover` | Turnover geral |
| `#custos` | Impacto financeiro dos desligamentos |
| `#desenvolvimento` | Endomarketing, T&D e projetos |
| `#insights` | Leitura gerencial |
| `#recomendacoes` | Plano de ação |
| `#comparativo-25-26` | Comparativo 2025 ~ 2026 (gráficos Chart.js) |
| `#graficos-novos` | **Gráficos novos** (5 gráficos Chart.js adicionais) |
| `#anexos` | Tabelas de referência completas |

Não há parâmetros de querystring; a navegação é controlada apenas pelo hash da URL e pelos cliques no menu lateral (`data-nav`).

## 🗄️ Dados e armazenamento

Não há backend nem tabelas via API — todos os dados são estáticos, carregados de:
- `js/data.js` → `RH_DATA`, `KPI_GERAIS`, `COMPARATIVO_DATA`, `NOVOS_GRAFICOS_DATA` (constantes JavaScript, fonte: PDF original "RH - RESULTADOS DE RH 2º TRIMESTRE 26.pdf" + dados mock 2025 do comparativo + dados das imagens anexadas para a aba "Gráficos novos").

`NOVOS_GRAFICOS_DATA` (estrutura):
```js
NOVOS_GRAFICOS_DATA = {
  vagasFechadasDepartamento: { totalAcumulado, dados: [{ departamento, valor, percentual }] },
  contratacoesPorEstado: { total, dados: [{ estado, valor, percentual }] },
  motivosDesligamento: { dados: [{ motivo, valor }] },
  volumeDesligamentosDepartamento: { dados: [{ departamento, valor }], composicaoConsorcio },
  custoPorDepartamentoPareto: { unidade, dados: [{ departamento, valor, percentual }] }
}
```

`COMPARATIVO_DATA` (estrutura):
```js
COMPARATIVO_DATA = {
  labelsEstados: ["Pernambuco (PE)", "Alagoas (AL)", "Rio de Janeiro (RJ)", "Total Consolidado"],
  headcount: { serie2025: [...], serie2026: [...] },
  aprovacaoExperiencia: { aprov45_2025, aprov45_2026, aprov90_2025, aprov90_2026 },
  absenteismo: { serie2025, serie2026 },
  turnover: { serie2025, serie2026 },
  tempoCasa: { serie2025, serie2026 },
  custosDesligamentos: { serie2025, serie2026 }
}
```

## 🚧 Não implementado / limitações conhecidas
- Os valores de 2025 no comparativo são dados de referência (mock/placeholder) usados para popular a estrutura, conforme solicitado — devem ser substituídos por dados reais quando disponíveis (basta editar `COMPARATIVO_DATA` em `js/data.js`).
- Não há granularidade mensal (Jan–Dez) no comparativo atual; a estrutura já está pronta para receber isso caso necessário.
- Não há persistência via API/Table (projeto 100% estático/client-side).

## 🔜 Próximos passos sugeridos
1. Substituir os valores mock de 2025 no comparativo por dados reais quando disponibilizados.
2. Caso se queira granularidade mensal, expandir `COMPARATIVO_DATA` com arrays por mês e trocar o tipo de gráfico para `line` (o mesmo helper `groupedBarOptions` pode ser adaptado).
3. Revisar/validar com o time de RH os números finais antes da publicação.

## 🌐 Publicação
Para publicar o site, use a aba **Publish** do editor — ela cuida de todo o processo de deploy e fornece a URL pública.
