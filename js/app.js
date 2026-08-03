/* ============================================================
   APP.JS — Renderização, interatividade e gráficos do dashboard
   Todos os valores usados aqui vêm de js/data.js (fonte: PDF original)
   ============================================================ */

(function(){
  "use strict";

  const CHART_COLORS = {
    dark: '#0b0d12',
    accent: '#3358e0',
    accentLight: '#8fa4ff',
    positive: '#0f9d58',
    attention: '#d97706',
    critical: '#d92d20',
    grayLine: '#e6e8ec'
  };
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = '#6b7280';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.padding = 16;

  const chartRegistry = {}; // id -> {chart, config}

  /* ---------- Helpers ---------- */
  function el(tag, cls, html){
    const e = document.createElement(tag);
    if(cls) e.className = cls;
    if(html !== undefined) e.innerHTML = html;
    return e;
  }
  function icon(name){ return `<i class="fa-solid ${name}"></i>`; }

  /* ============================================================
     1. RESUMO EXECUTIVO — listas
  ============================================================ */
  function renderBulletList(containerId, items){
    const ul = document.getElementById(containerId);
    if(!ul) return;
    ul.innerHTML = items.map(t => `<li><i class="fa-solid fa-circle"></i><span>${t}</span></li>`).join('');
  }

  /* ============================================================
     2. HEADCOUNT CARDS
  ============================================================ */
  function renderHeadcountCards(){
    const wrap = document.getElementById('headcount-cards');
    if(!wrap) return;
    const icons = ['fa-users','fa-mars','fa-venus','fa-percent'];
    const types = ['neutro','neutro','neutro','positivo'];
    wrap.innerHTML = RH_DATA.headcount.cards.map((c,i)=>`
      <div class="card kpi-card hoverable" data-panel="headcount-${i}">
        <div class="kpi-top"><div class="kpi-icon ${types[i]}">${icon(icons[i])}</div></div>
        <div class="kpi-value">${c.valor}</div>
        <div class="kpi-label">${c.label}</div>
        <div class="kpi-foot">${c.desc}</div>
      </div>
    `).join('');
  }

  /* ============================================================
     3. KPI GERAIS
  ============================================================ */
  function renderKpiCards(){
    const wrap = document.getElementById('kpi-cards');
    if(!wrap) return;
    wrap.innerHTML = KPI_GERAIS.map(k => `
      <div class="card kpi-card hoverable" data-panel="kpi-${k.id}">
        <span class="kpi-click-hint">Clique para detalhes <i class="fa-solid fa-arrow-right"></i></span>
        <div class="kpi-top">
          <div class="kpi-icon ${k.tipo}">${icon(k.icon)}</div>
          <span class="status-dot ${k.tipo}"></span>
        </div>
        <div class="kpi-value">${k.valor}</div>
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-foot">${k.variacao}</div>
      </div>
    `).join('');
  }

  /* ============================================================
     4. TABELAS GENÉRICAS (sort + search)
  ============================================================ */
  function buildTable(tableId, columns, rows, opts){
    opts = opts || {};
    const table = document.getElementById(tableId);
    if(!table) return;
    let state = { sortKey: null, sortDir: 1, query: '' };

    function renderHead(){
      const thead = el('thead');
      const tr = el('tr');
      columns.forEach(col=>{
        const th = el('th', '', `${col.label} <i class="fa-solid fa-sort"></i>`);
        th.addEventListener('click', ()=>{
          if(state.sortKey === col.key){ state.sortDir *= -1; } else { state.sortKey = col.key; state.sortDir = 1; }
          renderBody();
        });
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      return thead;
    }

    function renderBody(){
      const old = table.querySelector('tbody');
      if(old) old.remove();
      let data = rows.slice();
      if(state.query){
        const q = state.query.toLowerCase();
        data = data.filter(r => columns.some(c => String(r[c.key]).toLowerCase().includes(q)));
      }
      if(state.sortKey){
        data.sort((a,b)=>{
          let va = a[state.sortKey], vb = b[state.sortKey];
          const na = parseFloat(String(va).replace(/[^0-9.,\-]/g,'').replace(/\./g,'').replace(',','.'));
          const nb = parseFloat(String(vb).replace(/[^0-9.,\-]/g,'').replace(/\./g,'').replace(',','.'));
          if(!isNaN(na) && !isNaN(nb)){ return (na - nb) * state.sortDir; }
          return String(va).localeCompare(String(vb)) * state.sortDir;
        });
      }
      const tbody = el('tbody');
      if(data.length === 0){
        const tr = el('tr'); const td = el('td', 'no-results', 'Nenhum resultado encontrado.');
        td.colSpan = columns.length; tr.appendChild(td); tbody.appendChild(tr);
      } else {
        data.forEach(r=>{
          const tr = el('tr');
          if(r.isTotal) tr.classList.add('total-row');
          columns.forEach(c=>{ tr.appendChild(el('td','',r[c.key])); });
          tbody.appendChild(tr);
        });
      }
      table.appendChild(tbody);
    }

    table.innerHTML = '';
    table.appendChild(renderHead());
    renderBody();

    if(opts.searchInputName){
      const input = document.querySelector(`[data-table-search="${tableId}"]`);
      if(input){
        input.addEventListener('input', ()=>{ state.query = input.value; renderBody(); });
      }
    } else {
      const input = document.querySelector(`[data-table-search="${tableId}"]`);
      if(input){ input.addEventListener('input', ()=>{ state.query = input.value; renderBody(); }); }
    }
  }

  function renderAllTables(){
    // Departamento (Indicadores Estratégicos)
    buildTable('tbl-departamento',
      [{key:'departamento',label:'Departamento'},{key:'admissoes',label:'Admissões'},{key:'demissoes',label:'Demissões'},{key:'giro',label:'Giro'}],
      RH_DATA.indicadoresEstrategicos.tabelaDepartamento.linhas, {searchInputName:true});

    // Estado (Indicadores Estratégicos)
    buildTable('tbl-estado-adm',
      [{key:'estado',label:'Estado / Regional'},{key:'admissoes',label:'Admissões'},{key:'demissoes',label:'Demissões'},{key:'saldo',label:'Saldo'}],
      RH_DATA.indicadoresEstrategicos.tabelaEstado.linhas, {searchInputName:true});

    // Folha x Demissões (Custos)
    buildTable('tbl-folha',
      [{key:'mes',label:'Mês'},{key:'folhaBruta',label:'Folha Bruta (R$)'},{key:'demissoes',label:'Demissões (R$)'},{key:'impacto',label:'Impacto (%)'}],
      RH_DATA.custosFolha.tabela.linhas);

    // Custo por Estado (Custos)
    buildTable('tbl-custo-estado',
      [{key:'posicao',label:'#'},{key:'estado',label:'Estado'},{key:'custoTotal',label:'Custo Total (R$)'},{key:'participacao',label:'Participação'},{key:'desligamentos',label:'Desligamentos'},{key:'custoMedio',label:'Custo Médio (R$)'}],
      RH_DATA.custoPorEstado.ranking, {searchInputName:true});
  }

  /* ============================================================
     5. GRÁFICOS (Chart.js)
  ============================================================ */
  function makeChart(canvasId, config){
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const chart = new Chart(canvas.getContext('2d'), config);
    chartRegistry[canvasId] = { chart, config };
    return chart;
  }

  function renderCharts(){
    // Tempo de preenchimento
    const tp = RH_DATA.recrutamento.tempoPreenchimento;
    makeChart('chart-tempo-preenchimento', {
      type: 'bar',
      data: {
        labels: tp.dados.map(d=>d.mes),
        datasets: [{
          label: 'Dias',
          data: tp.dados.map(d=>d.valor),
          backgroundColor: [CHART_COLORS.dark, CHART_COLORS.accent, CHART_COLORS.accentLight],
          borderRadius: 8,
          maxBarThickness: 64
        }]
      },
      options: baseBarOptions('Dias', tp.meta.valor, `Meta (≤ 30 dias): ${tp.meta.valor}`)
    });

    // Turnover por mês e estado (stacked)
    const meses = RH_DATA.turnoverPorMes.meses;
    const estados = ['PE','RJ','AL'];
    const estadoColors = { PE: CHART_COLORS.accent, RJ: CHART_COLORS.dark, AL: CHART_COLORS.critical };
    makeChart('chart-turnover-mes', {
      type: 'bar',
      data: {
        labels: meses.map(m=>m.mes),
        datasets: estados.map(est => ({
          label: est,
          data: meses.map(m => { const f = m.porEstado.find(p=>p.estado===est); return f ? f.valor : 0; }),
          backgroundColor: estadoColors[est],
          borderRadius: 6,
          maxBarThickness: 44
        }))
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ position:'top', align:'end' }, tooltip:{ callbacks:{} } },
        scales:{ x:{ grid:{display:false} }, y:{ beginAtZero:true, grid:{color:CHART_COLORS.grayLine} } }
      }
    });

    // Total por estado (doughnut)
    const totalEstado = RH_DATA.turnoverPorMes.totalDesligamentos.porEstado;
    makeChart('chart-total-estado', {
      type:'doughnut',
      data:{ labels: totalEstado.map(t=>`${t.estado} (${t.percentual})`), datasets:[{ data: totalEstado.map(t=>t.valor), backgroundColor:[CHART_COLORS.critical, CHART_COLORS.attention, CHART_COLORS.accent], borderWidth:0 }] },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'62%', plugins:{ legend:{position:'bottom'} } }
    });

    // Folha bruta vs demissões
    const folha = RH_DATA.custosFolha.tabela.linhas;
    makeChart('chart-folha', {
      type:'bar',
      data:{
        labels: folha.map(f=>f.mes),
        datasets:[
          { label:'Folha Bruta (R$)', data: folha.map(f=>parseValorBR(f.folhaBruta)), backgroundColor: CHART_COLORS.dark, borderRadius:6, yAxisID:'y' },
          { label:'Demissões (R$)', data: folha.map(f=>parseValorBR(f.demissoes)), backgroundColor: CHART_COLORS.critical, borderRadius:6, yAxisID:'y1' }
        ]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{position:'top'}, tooltip:{ callbacks:{ label:(ctx)=> `${ctx.dataset.label}: ${formatBR(ctx.raw)}` } } },
        scales:{
          y:{ position:'left', grid:{color:CHART_COLORS.grayLine}, ticks:{ callback:(v)=>'R$ '+(v/1e6).toFixed(1)+'M' } },
          y1:{ position:'right', grid:{display:false}, ticks:{ callback:(v)=>'R$ '+(v/1e3).toFixed(0)+'k' } },
          x:{ grid:{display:false} }
        }
      }
    });

    // Participação custo por estado
    const rank = RH_DATA.custoPorEstado.ranking;
    makeChart('chart-participacao-estado', {
      type:'pie',
      data:{ labels: rank.map(r=>`${r.estado} (${r.participacao})`), datasets:[{ data: rank.map(r=>parseValorBR(r.custoTotal)), backgroundColor:[CHART_COLORS.dark, CHART_COLORS.accent, CHART_COLORS.accentLight] }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{position:'bottom'} } }
    });

    renderComparativoCharts();
    renderNovosGraficos();
  }

  /* ============================================================
     5A-BIS. GRÁFICOS — GRÁFICOS NOVOS (nova aba, mesma arquitetura
     Chart.js/CHART_COLORS/makeChart já usada nas demais seções)
  ============================================================ */
  function renderNovosGraficos(){
    if(typeof NOVOS_GRAFICOS_DATA === 'undefined') return;

    // 1. Vagas Fechadas por Departamento (barra horizontal, mesmo padrão de funil/ranking)
    const vf = NOVOS_GRAFICOS_DATA.vagasFechadasDepartamento;
    makeChart('chart-vagas-fechadas-depto', {
      type:'bar',
      data:{
        labels: vf.dados.map(d=>d.departamento),
        datasets:[{
          label:'Vagas Fechadas',
          data: vf.dados.map(d=>d.valor),
          backgroundColor: CHART_COLORS.accent,
          borderRadius:6,
          maxBarThickness:26
        }]
      },
      options:{
        indexAxis:'y',
        responsive:true, maintainAspectRatio:false,
        plugins:{
          legend:{ display:false },
          tooltip:{ callbacks:{ label:(ctx)=>{
            const item = vf.dados[ctx.dataIndex];
            return `${item.departamento}: ${item.valor} (${item.percentual})`;
          } } }
        },
        scales:{ x:{ beginAtZero:true, grid:{color:CHART_COLORS.grayLine} }, y:{ grid:{display:false} } }
      }
    });

    // 2. Contratações por Estado (doughnut, mesmo padrão de "Total por Estado")
    const ce = NOVOS_GRAFICOS_DATA.contratacoesPorEstado;
    makeChart('chart-contratacoes-estado', {
      type:'doughnut',
      data:{
        labels: ce.dados.map(d=>`${d.estado} (${d.percentual})`),
        datasets:[{ data: ce.dados.map(d=>d.valor), backgroundColor:[CHART_COLORS.dark, CHART_COLORS.accent, CHART_COLORS.accentLight], borderWidth:0 }]
      },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'62%', plugins:{ legend:{position:'bottom'} } }
    });

    // 3. Motivos de Desligamento (barra horizontal, tipo funil)
    const md = NOVOS_GRAFICOS_DATA.motivosDesligamento;
    makeChart('chart-motivos-desligamento', {
      type:'bar',
      data:{
        labels: md.dados.map(d=>d.motivo),
        datasets:[{
          label:'Desligamentos',
          data: md.dados.map(d=>d.valor),
          backgroundColor: CHART_COLORS.accent,
          borderRadius:6,
          maxBarThickness:26
        }]
      },
      options:{
        indexAxis:'y',
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label:(ctx)=> `${ctx.label}: ${ctx.raw}` } } },
        scales:{ x:{ beginAtZero:true, grid:{color:CHART_COLORS.grayLine} }, y:{ grid:{display:false} } }
      }
    });

    // 4. Volume Total de Desligamentos por Departamento (barra horizontal, degradê dark→accentLight)
    const vd = NOVOS_GRAFICOS_DATA.volumeDesligamentosDepartamento;
    const vdColors = [CHART_COLORS.dark, CHART_COLORS.accent, CHART_COLORS.accent, CHART_COLORS.accent, CHART_COLORS.accentLight, CHART_COLORS.accentLight, CHART_COLORS.accentLight];
    makeChart('chart-volume-desligamentos-depto', {
      type:'bar',
      data:{
        labels: vd.dados.map(d=>d.departamento),
        datasets:[{
          label:'Desligamentos',
          data: vd.dados.map(d=>d.valor),
          backgroundColor: vd.dados.map((d,i)=>vdColors[i] || CHART_COLORS.accentLight),
          borderRadius:6,
          maxBarThickness:26
        }]
      },
      options:{
        indexAxis:'y',
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label:(ctx)=> `${ctx.label}: ${ctx.raw}` } } },
        scales:{ x:{ beginAtZero:true, grid:{color:CHART_COLORS.grayLine} }, y:{ grid:{display:false} } }
      }
    });

    // 5. Análise por Departamento — O Pareto do Custo (doughnut, mesmo padrão de "Participação por Estado")
    const cp = NOVOS_GRAFICOS_DATA.custoPorDepartamentoPareto;
    makeChart('chart-custo-depto-pareto', {
      type:'doughnut',
      data:{
        labels: cp.dados.map(d=>`${d.departamento} (${d.percentual})`),
        datasets:[{
          data: cp.dados.map(d=>d.valor),
          backgroundColor:[CHART_COLORS.dark, CHART_COLORS.accent, CHART_COLORS.accentLight, '#a9b6c9', CHART_COLORS.grayLine, '#dfe3ea'],
          borderWidth:0
        }]
      },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'58%', plugins:{ legend:{position:'bottom'} } }
    });
  }

  /* ============================================================
     5B. GRÁFICOS — COMPARATIVO 2025 ~ 2026 (mesma arquitetura Chart.js
     usada em Turnover / Recrutamento / Custos, apenas com novos dados)
  ============================================================ */
  function groupedBarOptions(tooltipSuffix, tooltipFormatter){
    return {
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ position:'top', align:'end' },
        tooltip:{ callbacks:{ label:(ctx)=> tooltipFormatter ? tooltipFormatter(ctx) : `${ctx.dataset.label}: ${ctx.raw}${tooltipSuffix||''}` } }
      },
      scales:{
        x:{ grid:{display:false} },
        y:{ beginAtZero:true, grid:{color:CHART_COLORS.grayLine} }
      }
    };
  }

  function renderComparativoCharts(){
    const labels = COMPARATIVO_DATA.labelsEstados;

    // 1. Headcount Comparativo (bar agrupado 2025 vs 2026)
    const hc = COMPARATIVO_DATA.headcount;
    makeChart('chart-comp-headcount', {
      type:'bar',
      data:{
        labels,
        datasets:[
          { label:'2025', data: hc.serie2025, backgroundColor: CHART_COLORS.dark, borderRadius:6, maxBarThickness:56 },
          { label:'2026', data: hc.serie2026, backgroundColor: CHART_COLORS.accent, borderRadius:6, maxBarThickness:56 }
        ]
      },
      options: groupedBarOptions(' colaboradores')
    });

    // 2. Taxa de Aprovação na Experiência (45d vs 90d, 2025 vs 2026)
    const ap = COMPARATIVO_DATA.aprovacaoExperiencia;
    makeChart('chart-comp-aprovacao', {
      type:'bar',
      data:{
        labels,
        datasets:[
          { label:'Aprov. 45d (2025)', data: ap.aprov45_2025, backgroundColor: CHART_COLORS.dark, borderRadius:6, maxBarThickness:34 },
          { label:'Aprov. 45d (2026)', data: ap.aprov45_2026, backgroundColor: CHART_COLORS.accent, borderRadius:6, maxBarThickness:34 },
          { label:'Aprov. 90d (2025)', data: ap.aprov90_2025, backgroundColor: CHART_COLORS.positive, borderRadius:6, maxBarThickness:34 },
          { label:'Aprov. 90d (2026)', data: ap.aprov90_2026, backgroundColor: CHART_COLORS.accentLight, borderRadius:6, maxBarThickness:34 }
        ]
      },
      options: groupedBarOptions(' aprovados')
    });

    // 3. Absenteísmo (%) — 2025 vs 2026
    const ab = COMPARATIVO_DATA.absenteismo;
    makeChart('chart-comp-absenteismo', {
      type:'bar',
      data:{
        labels,
        datasets:[
          { label:'2T 2025 (%)', data: ab.serie2025, backgroundColor: CHART_COLORS.grayLine, borderRadius:6, maxBarThickness:56 },
          { label:'2T 2026 (%)', data: ab.serie2026, backgroundColor: CHART_COLORS.critical, borderRadius:6, maxBarThickness:56 }
        ]
      },
      options: groupedBarOptions('', (ctx)=> `${ctx.dataset.label}: ${ctx.raw.toString().replace('.', ',')}%`)
    });

    // 4. Turnover (%) — 2025 vs 2026
    const tv = COMPARATIVO_DATA.turnover;
    makeChart('chart-comp-turnover', {
      type:'bar',
      data:{
        labels,
        datasets:[
          { label:'2T 2025 (%)', data: tv.serie2025, backgroundColor: CHART_COLORS.grayLine, borderRadius:6, maxBarThickness:56 },
          { label:'2T 2026 (%)', data: tv.serie2026, backgroundColor: CHART_COLORS.positive, borderRadius:6, maxBarThickness:56 }
        ]
      },
      options: groupedBarOptions('', (ctx)=> `${ctx.dataset.label}: ${ctx.raw.toString().replace('.', ',')}%`)
    });

    // 5. Tempo de Casa / Tenure (meses) — Junho/2025 vs Junho/2026
    const tc = COMPARATIVO_DATA.tempoCasa;
    makeChart('chart-comp-tempocasa', {
      type:'bar',
      data:{
        labels,
        datasets:[
          { label:'Junho/2025 (Meses)', data: tc.serie2025, backgroundColor: CHART_COLORS.dark, borderRadius:6, maxBarThickness:56 },
          { label:'Junho/2026 (Meses)', data: tc.serie2026, backgroundColor: CHART_COLORS.attention, borderRadius:6, maxBarThickness:56 }
        ]
      },
      options: groupedBarOptions('', (ctx)=> `${ctx.dataset.label}: ${ctx.raw.toString().replace('.', ',')}m`)
    });

    // 6. Custos de Desligamentos (R$ mil) — 2025 vs 2026
    const cd = COMPARATIVO_DATA.custosDesligamentos;
    makeChart('chart-comp-custos', {
      type:'bar',
      data:{
        labels,
        datasets:[
          { label:'2T 2025 (R$)', data: cd.serie2025, backgroundColor: CHART_COLORS.grayLine, borderRadius:6, maxBarThickness:56 },
          { label:'2T 2026 (R$)', data: cd.serie2026, backgroundColor: CHART_COLORS.attention, borderRadius:6, maxBarThickness:56 }
        ]
      },
      options: groupedBarOptions('', (ctx)=> `${ctx.dataset.label}: R$ ${ctx.raw}k`)
    });
  }

  function parseValorBR(str){
    return parseFloat(String(str).replace(/[^0-9,]/g,'').replace(',','.'));
  }
  function formatBR(n){
    return 'R$ ' + n.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
  }

  function baseBarOptions(axisLabel, metaVal, metaLabel){
    return {
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ display:false },
        tooltip:{ callbacks:{ label:(ctx)=> `${ctx.label}: ${ctx.raw} dias` } },
        annotationMeta:{}
      },
      scales:{
        x:{ grid:{display:false} },
        y:{ beginAtZero:true, title:{display:true,text:axisLabel}, grid:{color:CHART_COLORS.grayLine} }
      },
      onResize: null
    };
  }

  /* ============================================================
     6. FUNIL DE RECRUTAMENTO
  ============================================================ */
  function renderFunnel(){
    const wrap = document.getElementById('funnel-container');
    if(!wrap) return;
    const etapas = RH_DATA.recrutamento.funil.etapas;
    const max = etapas[0].numero;
    wrap.innerHTML = etapas.map(e => `
      <div class="funnel-step">
        <div class="funnel-label">${e.nome}</div>
        <div class="funnel-bar-track">
          <div class="funnel-bar-fill" style="width:0%" data-target="${(e.numero/max*100)}"><span>${e.valor}</span></div>
        </div>
      </div>
    `).join('');
    requestAnimationFrame(()=>{
      setTimeout(()=>{
        wrap.querySelectorAll('.funnel-bar-fill').forEach(f=>{
          f.style.width = Math.max(parseFloat(f.dataset.target), 6) + '%';
        });
      }, 150);
    });
  }

  /* ============================================================
     7. CARDS DIVERSOS (regiões RJ, projetos, insights, plano de ação)
  ============================================================ */
  function renderRegioesRJ(){
    const wrap = document.getElementById('regioes-rj-cards');
    if(!wrap) return;
    wrap.innerHTML = RH_DATA.focoRJ.regioes.map(r => `
      <div class="region-card hoverable">
        <div class="region-top">
          <div>
            <div class="region-name">${r.regiao}</div>
            <div class="gestor-name">${r.gestor}</div>
          </div>
        </div>
        <div class="lojas"><i class="fa-solid fa-shop"></i> ${r.lojas}</div>
        <div class="stat-row"><span>Demissões</span><b>${r.demissoes}</b></div>
        <div class="stat-row"><span>Custo (R$)</span><b>${r.custo}</b></div>
      </div>
    `).join('');
  }

  function renderProjetos(containerId, data){
    const wrap = document.getElementById(containerId);
    if(!wrap) return;
    wrap.innerHTML = data.itens.map(item => `
      <div class="card">
        <h4 style="font-size:13.5px;margin-bottom:8px;color:var(--dark);">${item.nome}</h4>
        <p style="font-size:12.5px;color:var(--text-muted);">${item.texto}</p>
      </div>
    `).join('');
  }

  function renderInsights(){
    const wrap = document.getElementById('insights-cards');
    if(!wrap) return;
    const icons = ['fa-people-arrows','fa-map-location-dot','fa-magnifying-glass-dollar','fa-shield-halved'];
    wrap.innerHTML = RH_DATA.insights.cards.map((c,i) => `
      <div class="insight-card hoverable">
        <div class="insight-icon">${icon(icons[i % icons.length])}</div>
        <h4>${c.titulo}</h4>
        <p>${c.texto}</p>
      </div>
    `).join('');
  }

  function renderPlanoAcao(){
    const wrap = document.getElementById('plano-acao-cols');
    if(!wrap) return;
    wrap.innerHTML = RH_DATA.planoAcao.colunas.map(col => `
      <div class="plan-col">
        <div class="plan-col-head">
          <div class="plan-num">${col.numero.replace('.','')}</div>
          <h4>${col.titulo}</h4>
        </div>
        ${col.blocos.map(b => `<div class="plan-block"><b>${b.titulo}</b><span>${b.texto}</span></div>`).join('')}
      </div>
    `).join('');
  }

  function renderTimeline(){
    const wrap = document.getElementById('timeline-container');
    if(!wrap) return;
    wrap.innerHTML = RH_DATA.proximosPassos.itens.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot">${item.numero}</div>
        <div class="timeline-content">
          <h4>${item.titulo}</h4>
          <p>${item.texto}</p>
        </div>
      </div>
    `).join('');
  }

  /* ============================================================
     8. ANEXOS
  ============================================================ */
  function renderAnexos(){
    const wrap = document.getElementById('anexos-container');
    if(!wrap) return;

    const blocks = [
      { cat:'custos', title:'Comparação Detalhada: Folha x Demissões', id:'anexo-tbl-1',
        cols:[{key:'mes',label:'Mês'},{key:'folhaBruta',label:'Folha Bruta (R$)'},{key:'demissoes',label:'Demissões (R$)'},{key:'impacto',label:'Impacto (%)'}],
        rows: RH_DATA.custosFolha.tabela.linhas, note:'Não há linha para Junho nesta tabela do PDF original.' },
      { cat:'custos', title:'Ranking de Custo por Estado', id:'anexo-tbl-2',
        cols:[{key:'posicao',label:'#'},{key:'estado',label:'Estado'},{key:'custoTotal',label:'Custo Total (R$)'},{key:'participacao',label:'Participação'},{key:'desligamentos',label:'Desligamentos'},{key:'custoMedio',label:'Custo Médio (R$)'}],
        rows: RH_DATA.custoPorEstado.ranking },
      { cat:'turnover', title:'Turnover por Departamento (Admissões x Demissões)', id:'anexo-tbl-3',
        cols:[{key:'departamento',label:'Departamento'},{key:'admissoes',label:'Admissões'},{key:'demissoes',label:'Demissões'},{key:'giro',label:'Giro'}],
        rows: RH_DATA.indicadoresEstrategicos.tabelaDepartamento.linhas },
      { cat:'turnover', title:'Turnover por Estado / Regional', id:'anexo-tbl-4',
        cols:[{key:'estado',label:'Estado / Regional'},{key:'admissoes',label:'Admissões'},{key:'demissoes',label:'Demissões'},{key:'saldo',label:'Saldo'}],
        rows: RH_DATA.indicadoresEstrategicos.tabelaEstado.linhas },
      { cat:'regional', title:'Desligamentos por Mês e Estado', id:'anexo-tbl-5',
        cols:[{key:'mes',label:'Mês'},{key:'PE',label:'PE'},{key:'RJ',label:'RJ'},{key:'AL',label:'AL'},{key:'total',label:'Total'}],
        rows: RH_DATA.turnoverPorMes.meses.map(m => {
          const row = { mes:m.mes, total:m.total };
          m.porEstado.forEach(p => row[p.estado] = p.valor);
          ['PE','RJ','AL'].forEach(e => { if(row[e]===undefined) row[e] = '—'; });
          return row;
        }) },
      { cat:'regional', title:'Foco Regional RJ — Veículos Novos por Gestor', id:'anexo-tbl-6',
        cols:[{key:'regiao',label:'Região'},{key:'gestor',label:'Gestor'},{key:'demissoes',label:'Demissões'},{key:'custo',label:'Custo (R$)'}],
        rows: RH_DATA.focoRJ.regioes }
    ];

    wrap.innerHTML = blocks.map(b => `
      <div class="card anexo-block" data-cat="${b.cat}">
        <div class="table-toolbar">
          <h4 style="font-size:13.5px;">${b.title}</h4>
          <div class="search-box"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Buscar…" data-table-search="${b.id}"></div>
        </div>
        <div class="data-table-wrap"><table class="data-table" id="${b.id}"></table></div>
        ${b.note ? `<p class="section-sub" style="margin-top:10px;">${b.note}</p>` : ''}
      </div>
    `).join('');

    blocks.forEach(b => buildTable(b.id, b.cols, b.rows, {searchInputName:true}));

    // filter chips
    document.querySelectorAll('[data-anexo-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-anexo-filter]').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.anexoFilter;
        document.querySelectorAll('.anexo-block').forEach(block => {
          block.style.display = (cat === 'all' || block.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  /* ============================================================
     8B. COMPARATIVO 2025/2026 — filtros e lightbox de imagens
  ============================================================ */
  function initComparativo(){
    const chips = document.querySelectorAll('[data-comp-filter]');
    if(!chips.length) return;
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.compFilter;
        document.querySelectorAll('.comp-block').forEach(block => {
          block.style.display = (cat === 'all' || block.dataset.cat === cat) ? '' : 'none';
        });
        // Reajusta o tamanho dos gráficos Chart.js visíveis após mudar o filtro
        // (canvases em blocos ocultados/reexibidos perdem as dimensões corretas)
        setTimeout(()=>{
          Object.values(chartRegistry).forEach(r => { try{ r.chart.resize(); }catch(e){} });
        }, 60);
      });
    });
  }

  function openImageModal(src, title){
    const overlay = document.getElementById('img-modal-overlay');
    if(!overlay) return;
    document.getElementById('img-modal-title').textContent = title || 'Gráfico ampliado';
    document.getElementById('img-modal-img').src = src;
    document.getElementById('img-modal-img').alt = title || '';
    overlay.classList.add('open');
  }
  function closeImageModal(){
    const overlay = document.getElementById('img-modal-overlay');
    if(overlay) overlay.classList.remove('open');
  }

  /* ============================================================
     9. SIDE PANEL (detalhes ao clicar em indicadores)
  ============================================================ */
  const sidePanelContent = {
    'kpi-headcount': {
      title:'Headcount Total', sub:'Fonte: página 4 do PDF',
      body:`<div class="side-stat"><span>Headcount Total</span><b>1.374</b></div>
            <div class="side-stat"><span>Headcount Masculino</span><b>879</b></div>
            <div class="side-stat"><span>Headcount Feminino</span><b>495</b></div>
            <div class="side-stat"><span>% Feminino (Geral)</span><b>36,0%</b></div>
            <div class="callout">Crescimento leve de 1.354 para 1.374 colaboradores no período, com distribuição equilibrada entre as três unidades. (pág. 3)</div>`
    },
    'kpi-turnover': {
      title:'Turnover Médio Trimestral', sub:'Fonte: página 7 do PDF',
      body:`<div class="side-stat"><span>Média trimestral</span><b>~5,4%</b></div>
            <div class="side-stat"><span>1T26 (trimestre anterior)</span><b>~5,9%</b></div>
            <div class="side-stat"><span>Teto aceitável</span><b>3,5%</b></div>
            <div class="callout critical">A queda em maio foi pontual — junho reascendeu o alerta.</div>`
    },
    'kpi-desligamentos': {
      title:'Desligamentos no Trimestre', sub:'Fonte: páginas 7, 8, 9, 11 e 13 do PDF',
      body:`<div class="side-stat"><span>Abril</span><b>89</b></div>
            <div class="side-stat"><span>Maio</span><b>58 / 59</b></div>
            <div class="side-stat"><span>Junho</span><b>78</b></div>
            <div class="side-stat"><span>Total (pág. 8, 9, 11, 13)</span><b>225</b></div>
            <div class="side-stat"><span>Total (pág. 7 e 10)</span><b>226</b></div>
            <div class="callout attention">O PDF original apresenta duas contagens distintas do total trimestral em diferentes páginas (225 e 226) e o valor de Maio varia entre 58 e 59 conforme a página. Ambos os valores foram preservados exatamente como constam no documento fonte, sem reconciliação.</div>`
    },
    'kpi-absenteismo': {
      title:'Absenteísmo (Maio)', sub:'Fonte: página 3 do PDF',
      body:`<div class="side-stat"><span>Absenteísmo em maio</span><b>12,38%</b></div>
            <div class="callout critical">Absenteísmo chegou a 12,38% em maio, indicando um ponto de atenção que segue sob controle.</div>`
    },
    'kpi-voluntario': {
      title:'Turnover Voluntário', sub:'Fonte: página 7 do PDF',
      body:`<div class="side-stat"><span>Início do período</span><b>2,93%</b></div>
            <div class="side-stat"><span>Fim do período</span><b>0,28%</b></div>
            <div class="side-stat"><span>Teto</span><b>2,0%</b></div>
            <div class="callout">Indica que os funcionários não estão querendo sair — possivelmente devido à boa percepção de estabilidade gerada no 1º trimestre.</div>`
    },
    'kpi-tth': {
      title:'Time-to-Hire (PE)', sub:'Fonte: página 6 do PDF',
      body:`<div class="side-stat"><span>Tempo médio de contratação</span><b>17 dias</b></div>
            <div class="side-stat"><span>Vagas Abertas / PE</span><b>28</b></div>
            <div class="callout">Autonomia Regional: o processo de recrutamento é descentralizado. As rotinas seletivas são conduzidas individualmente pelas equipes locais de cada estado (AL, PE, RJ).</div>`
    },
    'mirella': {
      title:'Mirella', sub:'Recrutamento, Seleção & Clima Organizacional — pág. 2',
      body:`<div class="callout">Responsável pelo Recrutamento e Seleção, conduzindo todo o processo de ponta a ponta, desde o alinhamento da vaga com o gestor até a contratação de profissionais alinhados à cultura e às necessidades da empresa.</div>
            <div class="callout">Atuará também em Clima Organizacional e Engajamento, implementando planos de ação para fortalecer o ambiente de trabalho e a experiência dos colaboradores.</div>`
    },
    'ikaro': {
      title:'Ikaro e Arianny', sub:'Subsistemas estratégicos de RH — pág. 2',
      body:`<div class="callout">Treinamento e Desenvolvimento (T&D) e Desenvolvimento Organizacional (DO); Endomarketing e Comunicação Interna; People Analytics; Employer Branding e Onboarding; Remuneração e Benefícios; Política de Cargos e Salários e Fluxos de Desligamentos.</div>`
    },
    'tempo-preenchimento': {
      title:'Tempo Médio de Preenchimento', sub:'Fonte: página 5 do PDF',
      body:`<div class="side-stat"><span>Abril</span><b>15 dias</b></div>
            <div class="side-stat"><span>Maio</span><b>16 dias</b></div>
            <div class="side-stat"><span>Junho</span><b>20 dias</b></div>
            <div class="side-stat"><span>Meta</span><b>≤ 30 dias</b></div>`
    },
    'turnover-total': {
      title:'Desligamentos no Trimestre', sub:'Fonte: página 7 do PDF',
      body:`<div class="side-stat"><span>Abril</span><b>89</b></div>
            <div class="side-stat"><span>Maio</span><b>59</b></div>
            <div class="side-stat"><span>Junho</span><b>78</b></div>
            <div class="side-stat"><span>Total (pág. 7)</span><b>226</b></div>`
    },
    'comp-headcount': {
      title:'Headcount Comparativo', sub:'Comparativo 2025 ~ 2026 · Total consolidado',
      body:`<div class="side-stat"><span>Total 2025</span><b>1.223</b></div>
            <div class="side-stat"><span>Total 2026</span><b>1.374</b></div>
            <div class="side-stat"><span>RJ</span><b>368 → 390</b></div>
            <div class="side-stat"><span>AL</span><b>468 → 529</b></div>
            <div class="side-stat"><span>PE</span><b>387 → 455</b></div>
            <div class="callout">Crescimento em todas as unidades, com Alagoas e Pernambuco puxando a expansão do quadro.</div>`
    },
    'comp-aprovacao': {
      title:'Taxa de Aprovação na Experiência', sub:'Comparativo 2025 ~ 2026 · Aprovados 45d vs 90d',
      body:`<div class="side-stat"><span>Aprov. 45d — Total 2025</span><b>211</b></div>
            <div class="side-stat"><span>Aprov. 45d — Total 2026</span><b>192</b></div>
            <div class="side-stat"><span>Aprov. 90d — Total 2025</span><b>136</b></div>
            <div class="side-stat"><span>Aprov. 90d — Total 2026</span><b>148</b></div>
            <div class="callout attention">Queda na aprovação em 45 dias, porém melhora na aprovação em 90 dias — sugere curva de adaptação mais longa em 2026.</div>`
    },
    'comp-absenteismo': {
      title:'Absenteísmo', sub:'Comparativo 2025 ~ 2026 · % por estado',
      body:`<div class="side-stat"><span>PE</span><b>9,77% → 11,13%</b></div>
            <div class="side-stat"><span>AL</span><b>6,67% → 7,63%</b></div>
            <div class="side-stat"><span>RJ</span><b>16,68% → 18,81%</b></div>
            <div class="side-stat"><span>Total Consolidado</span><b>11,75% → 13,25%</b></div>
            <div class="callout critical">Alta em todas as praças. Rio de Janeiro é o ponto crítico, com a maior variação (+2,13 p.p.).</div>`
    },
    'comp-turnover': {
      title:'Turnover', sub:'Comparativo 2025 ~ 2026 · % por estado',
      body:`<div class="side-stat"><span>PE</span><b>15,18% → 13,91%</b></div>
            <div class="side-stat"><span>AL</span><b>21,51% → 18,61%</b></div>
            <div class="side-stat"><span>RJ</span><b>15,25% → 15,20%</b></div>
            <div class="side-stat"><span>Total Consolidado</span><b>17,58% → 16,10%</b></div>
            <div class="callout">Queda consolidada de 1,48 p.p., com Alagoas apresentando a melhora mais expressiva (-2,90 p.p.). RJ estável.</div>`
    },
    'comp-tempocasa': {
      title:'Tempo de Casa / Tenure', sub:'Comparativo Junho/2025 ~ Junho/2026 (meses)',
      body:`<div class="side-stat"><span>PE</span><b>9,3m → 10,1m</b></div>
            <div class="side-stat"><span>AL</span><b>8,3m → 8,0m</b></div>
            <div class="side-stat"><span>RJ</span><b>10,4m → 15,1m</b></div>
            <div class="side-stat"><span>Total Consolidado</span><b>28,0m → 33,1m</b></div>
            <div class="callout">Tempo médio de casa consolidado cresceu, reflexo direto da queda no turnover — colaboradores permanecendo mais tempo na empresa.</div>`
    },
    'comp-custos': {
      title:'Custos de Desligamentos', sub:'Comparativo 2025 ~ 2026 · valores em R$',
      body:`<div class="side-stat"><span>PE</span><b>R$ 366k → R$ 326k</b></div>
            <div class="side-stat"><span>AL</span><b>R$ 239k → R$ 290k</b></div>
            <div class="side-stat"><span>RJ</span><b>R$ 308k → R$ 433k</b></div>
            <div class="side-stat"><span>Total Consolidado</span><b>R$ 913k → R$ 1.049k</b></div>
            <div class="callout attention">Alta consolidada de 14,9%, impulsionada pelo Rio de Janeiro (+40,6%), mesmo com queda de 11,1% em Pernambuco.</div>`
    }
  };
  // headcount cards individual panels
  RH_DATA.headcount.cards.forEach((c,i)=>{
    sidePanelContent[`headcount-${i}`] = { title:c.label, sub:'Fonte: página 4 do PDF', body:`<div class="side-stat"><span>${c.label}</span><b>${c.valor}</b></div><div class="callout">${c.desc}</div>` };
  });

  function openSidePanel(key){
    const data = sidePanelContent[key];
    if(!data) return;
    document.getElementById('side-panel-title').textContent = data.title;
    document.getElementById('side-panel-sub').textContent = data.sub;
    document.getElementById('side-panel-body').innerHTML = data.body;
    document.getElementById('side-panel').classList.add('open');
    document.getElementById('side-panel-overlay').classList.add('open');
  }
  function closeSidePanel(){
    document.getElementById('side-panel').classList.remove('open');
    document.getElementById('side-panel-overlay').classList.remove('open');
  }

  /* ============================================================
     10. MODAL — gráfico ampliado
  ============================================================ */
  let modalChart = null;
  function openModal(canvasId, title){
    const reg = chartRegistry[canvasId];
    if(!reg) return;
    document.getElementById('modal-title').textContent = title || 'Gráfico ampliado';
    const modalCanvas = document.getElementById('modal-canvas');
    if(modalChart){ modalChart.destroy(); }
    const cfg = JSON.parse(JSON.stringify(reg.config, (k,v)=> typeof v === 'function' ? undefined : v));
    modalChart = new Chart(modalCanvas.getContext('2d'), cfg);
    document.getElementById('modal-overlay').classList.add('open');
  }
  function closeModal(){
    document.getElementById('modal-overlay').classList.remove('open');
  }

  /* ============================================================
     11. NAV / SCROLLSPY / MOBILE
  ============================================================ */
  function initNav(){
    const navItems = document.querySelectorAll('.nav-item[data-nav]');
    const sections = document.querySelectorAll('.section');

    function showSection(id) {
      // 1. Remove a classe 'active' de todos os links e seções
      navItems.forEach(a => a.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // 2. Adiciona a classe 'active' na seção e no link selecionado
      const targetSection = document.querySelector(id);
      const targetNav = document.querySelector(`.nav-item[href="${id}"]`);
      
      if(targetSection) targetSection.classList.add('active');
      if(targetNav) targetNav.classList.add('active');

      // 3. Força o redimensionamento dos gráficos
      // Gráficos do Chart.js quebram quando ficam em contêineres display:none
      setTimeout(() => {
        Object.values(chartRegistry).forEach(r => { 
          try { r.chart.resize(); } catch(e){} 
        });
      }, 50);

      // 4. Volta o scroll pro topo (útil especialmente no mobile ao trocar de aba)
      window.scrollTo({top: 0, behavior: 'smooth'});
    }

    navItems.forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Pega o href do link clicado (ex: #visao-geral) e exibe a tela
        const targetId = a.getAttribute('href');
        showSection(targetId);

        // Fecha o menu lateral no mobile
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebar-overlay').classList.remove('show');
      });
    });

    // Lógica para o menu hamburguer (Mobile)
    const toggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');
    toggle.addEventListener('click', ()=>{ sidebar.classList.add('open'); overlay.classList.add('show'); });
    overlay.addEventListener('click', ()=>{ sidebar.classList.remove('open'); overlay.classList.remove('show'); });

    // Define qual tela deve aparecer primeiro ao carregar a página
    // Pode ler a URL (se tiver hash) ou forçar a '#visao-geral'
    const initialSection = window.location.hash || '#visao-geral';
    showSection(initialSection);
  }

  /* ============================================================
     12. TOPBAR ACTIONS
  ============================================================ */
  function initTopbarActions(){
    document.getElementById('btn-print').addEventListener('click', ()=> window.print());
    document.getElementById('btn-fullscreen').addEventListener('click', ()=>{
      if(!document.fullscreenElement){ document.documentElement.requestFullscreen().catch(()=>{}); }
      else { document.exitFullscreen(); }
    });
    document.getElementById('btn-export').addEventListener('click', ()=>{
      const btn = document.getElementById('btn-export');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      const opt = {
        margin: 0.3,
        filename: 'Resultados-RH-2T26-Pernambuco-Motos.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 1.5, useCORS: true, backgroundColor:'#ffffff' },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };
      html2pdf().set(opt).from(document.getElementById('content')).save().then(()=>{
        btn.innerHTML = original;
      }).catch(()=>{ btn.innerHTML = original; });
    });
  }

  /* ============================================================
     13. FADE-UP / SCROLL EFFECTS / BACK TO TOP
  ============================================================ */
  function initFadeUp(){
    const targets = document.querySelectorAll('.card, .fade-up, .alert-card, .insight-card, .plan-col, .region-card');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.05 });
    targets.forEach(t=>{
      if(!t.classList.contains('fade-up')){
        t.style.opacity = 0; t.style.transform = 'translateY(12px)';
        t.style.transition = 'opacity .5s ease, transform .5s ease';
      }
      io.observe(t);
    });
  }

  function initBackToTop(){
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', ()=>{
      btn.classList.toggle('show', window.scrollY > 500);
    });
    btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  }

  /* ============================================================
     14. GLOBAL CLICK DELEGATION (panels, expand, close)
  ============================================================ */
  function initDelegation(){
    document.addEventListener('click', (e)=>{
      const expandImgTrigger = e.target.closest('[data-expand-img]');
      if(expandImgTrigger){
        openImageModal(expandImgTrigger.dataset.expandImg, expandImgTrigger.dataset.imgTitle);
        return;
      }

      const expandTrigger = e.target.closest('[data-expand-chart]');
      if(expandTrigger){
        const id = expandTrigger.dataset.expandChart;
        const titleEl = expandTrigger.closest('.chart-card').querySelector('h4');
        openModal(id, titleEl ? titleEl.textContent : '');
        return;
      }

      const panelTrigger = e.target.closest('[data-panel]');
      if(panelTrigger){ openSidePanel(panelTrigger.dataset.panel); return; }
    });
    document.getElementById('side-panel-close').addEventListener('click', closeSidePanel);
    document.getElementById('side-panel-overlay').addEventListener('click', closeSidePanel);
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e)=>{ if(e.target.id==='modal-overlay') closeModal(); });
    document.getElementById('img-modal-close').addEventListener('click', closeImageModal);
    document.getElementById('img-modal-overlay').addEventListener('click', (e)=>{ if(e.target.id==='img-modal-overlay') closeImageModal(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ closeSidePanel(); closeModal(); closeImageModal(); } });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init(){
    renderBulletList('conquistas-list', RH_DATA.resumoExecutivo.conquistas);
    renderBulletList('riscos-list', RH_DATA.resumoExecutivo.riscosOportunidades);
    renderBulletList('impacto-negocio-list', RH_DATA.turnoverGeral.impactoNoNegocio);
    renderHeadcountCards();
    renderKpiCards();
    renderAllTables();
    renderCharts();
    renderFunnel();
    renderRegioesRJ();
    renderProjetos('projetos-andamento-cards', RH_DATA.projetosAndamento);
    renderProjetos('projetos-encaminhados-cards', RH_DATA.projetosEncaminhados);
    renderInsights();
    renderPlanoAcao();
    renderTimeline();
    renderAnexos();
    initComparativo();

    initNav();
    initTopbarActions();
    initFadeUp();
    initBackToTop();
    initDelegation();

    setTimeout(()=>{
      document.getElementById('loading-screen').classList.add('hidden');
    }, 500);

    // Garante que os gráficos recalculem o tamanho correto após fontes/ícones
    // carregarem e o layout (grid) estabilizar — evita cortes visuais em pie/donut.
    const resizeAllCharts = () => {
      Object.values(chartRegistry).forEach(r => { try{ r.chart.resize(); }catch(e){} });
    };
    window.addEventListener('load', () => setTimeout(resizeAllCharts, 300));
    setTimeout(resizeAllCharts, 800);
    setTimeout(resizeAllCharts, 1600);
    setTimeout(resizeAllCharts, 2600);
    if(document.fonts && document.fonts.ready){ document.fonts.ready.then(()=> setTimeout(resizeAllCharts, 100)); }
    window.addEventListener('resize', resizeAllCharts);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
