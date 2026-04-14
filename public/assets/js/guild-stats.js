(function () {
  const membersDataNode = document.getElementById('guild-members-json');
  const statsSection = document.querySelector('.guild-stats-section');

  if (!membersDataNode || !statsSection) {
    return;
  }

  let members = [];
  try {
    members = JSON.parse(membersDataNode.textContent || '[]');
  } catch (error) {
    console.error('Guild stats: failed to parse members JSON.', error);
    return;
  }

  const normalize = (value) => (typeof value === 'string' ? value.trim() : '');
  const normalizeKey = (value) => normalize(value).toLowerCase();
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const escapeAttribute = (value) => escapeHtml(value).replace(/\n/g, '&#10;');
  const formatPercent = (value) => {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  };
  const formatScore = (value) => new Intl.NumberFormat('uk-UA').format(Math.max(0, Math.round(Number(value) || 0)));
  const getNumericScore = (value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
  };
  const getRoleScore = (member, roleKey) => {
    const scores = member?.mythic_plus_scores || {};
    if (roleKey === 'healing') {
      return getNumericScore(scores.healer?.score);
    }
    if (roleKey === 'tank' || roleKey === 'dps') {
      return getNumericScore(scores[roleKey]?.score);
    }
    return Math.max(
      getNumericScore(scores.dps?.score),
      getNumericScore(scores.healer?.score),
      getNumericScore(scores.tank?.score),
    );
  };
  const getAllScore = (member) => {
      const scores = member?.mythic_plus_scores || {};
      return getNumericScore(scores.all?.score);
  };
  const lightenColor = (hex, amount = 0.18) => {
    const clean = String(hex || '').replace('#', '');
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
      return '#ffffff';
    }

    const parts = clean.match(/.{2}/g).map((chunk) => parseInt(chunk, 16));
    const mixed = parts.map((part) => Math.round(part + (255 - part) * amount));
    return `#${mixed.map((part) => part.toString(16).padStart(2, '0')).join('')}`;
  };

  const hexToRgba = (hex, alpha = 1) => {
    const clean = String(hex || '').replace('#', '');
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
      return `rgba(255, 255, 255, ${alpha})`;
    }

    const [r, g, b] = clean.match(/.{2}/g).map((chunk) => parseInt(chunk, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getSpecTag = (value) => {
    const normalized = normalize(value);
    if (!normalized) {
      return '—';
    }

    const overrides = {
      Affliction: 'AFF', Arcane: 'ARC', Arms: 'ARM', Assassination: 'ASS', Augmentation: 'AUG',
      Balance: 'BAL', Beastmastery: 'BM', Blood: 'BLD', Brewmaster: 'BRM', Demonology: 'DEM',
      Destruction: 'DST', Devastation: 'DVS', Devourer: 'DEV', Discipline: 'DIS', Elemental: 'ELE',
      Enhancement: 'ENH', Feral: 'FER', Fire: 'FIR', Frost: 'FRS', Fury: 'FUR', Guardian: 'GRD',
      Havoc: 'HAV', Holy: 'HLY', Marksmanship: 'MM', Mistweaver: 'MIS', Outlaw: 'OUT',
      Preservation: 'PRE', Protection: 'PRT', Restoration: 'RST', Retribution: 'RET', Shadow: 'SHD',
      Subtlety: 'SUB', Survival: 'SUR', Unholy: 'UNH', Vengeance: 'VNG', Windwalker: 'WND',
    };

    if (overrides[normalized]) {
      return overrides[normalized];
    }

    return normalized.replace(/[^A-Za-zА-Яа-яІіЇїЄє]/g, '').slice(0, 3).toUpperCase() || '—';
  };

  const classToArmor = {
    'Death Knight': 'Лати', 'Demon Hunter': 'Шкіра', Druid: 'Шкіра', Evoker: 'Кольчуга',
    Hunter: 'Кольчуга', Mage: 'Тканина', Monk: 'Шкіра', Paladin: 'Лати', Priest: 'Тканина',
    Rogue: 'Шкіра', Shaman: 'Кольчуга', Warlock: 'Тканина', Warrior: 'Лати',
  };

  const classMeta = {
    'Death Knight': { color: '#C41E3A', tag: 'DK' },
    'Demon Hunter': { color: '#A330C9', tag: 'DH' },
    Druid: { color: '#FF7D0A', tag: 'DR' },
    Evoker: { color: '#33937F', tag: 'EV' },
    Hunter: { color: '#ABD473', tag: 'HN' },
    Mage: { color: '#69CCF0', tag: 'MG' },
    Monk: { color: '#00FF96', tag: 'MK' },
    Paladin: { color: '#F58CBA', tag: 'PL' },
    Priest: { color: '#FFFFFF', tag: 'PR' },
    Rogue: { color: '#FFF569', tag: 'RG' },
    Shaman: { color: '#0070DE', tag: 'SH' },
    Warlock: { color: '#9482C9', tag: 'WL' },
    Warrior: { color: '#C79C6E', tag: 'WR' },
  };

  const classSpecMeta = {
    'Death Knight': ['Blood', 'Frost', 'Unholy'],
    'Demon Hunter': ['Havoc', 'Vengeance'],
    Druid: ['Balance', 'Feral', 'Guardian', 'Restoration'],
    Evoker: ['Devastation', 'Preservation', 'Augmentation'],
    Hunter: ['Beastmastery', 'Marksmanship', 'Survival'],
    Mage: ['Arcane', 'Fire', 'Frost'],
    Monk: ['Brewmaster', 'Mistweaver', 'Windwalker'],
    Paladin: ['Holy', 'Protection', 'Retribution'],
    Priest: ['Discipline', 'Holy', 'Shadow'],
    Rogue: ['Assassination', 'Outlaw', 'Subtlety'],
    Shaman: ['Elemental', 'Enhancement', 'Restoration'],
    Warlock: ['Affliction', 'Demonology', 'Destruction'],
    Warrior: ['Arms', 'Fury', 'Protection'],
  };

  const roleMeta = {
    tank: { label: 'Танки', short: 'T', color: '#6db4ff' },
    healing: { label: 'Хіли', short: 'H', color: '#4eff4e' },
    dps: { label: 'DPS', short: 'D', color: '#ff7d7d' },
    other: { label: 'Інше', short: '?', color: '#a6acb8' },
  };

  const armorMeta = {
    Тканина: '#8b5cf6', Шкіра: '#f59e0b', Кольчуга: '#38bdf8', Лати: '#ef4444', 'Невідомо': '#8a8d95',
  };

  const factionCounts = { alliance: 0, horde: 0 };
  const armorCounts = { Тканина: 0, Шкіра: 0, Кольчуга: 0, Лати: 0 };
  const roleCounts = { tank: 0, healing: 0, dps: 0, other: 0 };
  const roleRioTotals = { tank: 0, healing: 0, dps: 0 };
  const roleRioSamples = { tank: 0, healing: 0, dps: 0 };
  let guildRioTotal = 0;
  let guildRioSamples = 0;
  let guildItemLevelTotal = 0;
  let guildItemLevelSamples = 0;
  const classCounts = new Map();
  const activeSpecs = new Set();

  members.forEach((member) => {
    const faction = normalizeKey(member.faction);
    if (faction in factionCounts) {
      factionCounts[faction] += 1;
    }

    const className = normalize(member.class);
    const specName = normalize(member.spec);
    const armorType = classToArmor[className] || 'Невідомо';
    if (!(armorType in armorCounts)) {
      armorCounts[armorType] = 0;
    }
    armorCounts[armorType] += 1;

    const roleKey = normalizeKey(member.role);
    if (roleKey in roleCounts) {
      roleCounts[roleKey] += 1;
    } else {
      roleCounts.other += 1;
    }

    const normalizedRoleKey = roleKey in roleCounts ? roleKey : 'other';

    // role specific RIO
    const roleRio = getRoleScore(member, normalizedRoleKey);

    if (normalizedRoleKey in roleRioTotals && roleRio > 0) {
        roleRioTotals[normalizedRoleKey] += roleRio;
        roleRioSamples[normalizedRoleKey] += 1;
    }

    // REAL Raider.IO score
    const allRio = getAllScore(member);

    if (allRio > 0) {
        guildRioTotal += allRio;
        guildRioSamples += 1;
    }

    const itemLevelEquipped = Number(member?.item_level_equipped || 0);
    if (Number.isFinite(itemLevelEquipped) && itemLevelEquipped > 0) {
      guildItemLevelTotal += itemLevelEquipped;
      guildItemLevelSamples += 1;
    }

    if (!className) {
      return;
    }
    if (!classCounts.has(className)) {
      classCounts.set(className, {
        className,
        count: 0,
        color: classMeta[className]?.color || '#d4a03d',
        tag: classMeta[className]?.tag || className.slice(0, 2).toUpperCase(),
        specs: new Map(),
        roles: { tank: 0, healing: 0, dps: 0, other: 0 },
      });
    }

    const entry = classCounts.get(className);
    entry.count += 1;
    entry.roles[normalizedRoleKey] += 1;

    if (specName) {
      activeSpecs.add(`${specName}__${className}`);
      entry.specs.set(specName, (entry.specs.get(specName) || 0) + 1);
    }
  });

  const classEntries = Array.from(classCounts.values())
    .map((entry) => {
      const knownSpecs = (classSpecMeta[entry.className] || []).map((specName) => ({ specName, tag: getSpecTag(specName) }));
      const extraSpecs = Array.from(entry.specs.keys())
        .filter((specName) => !knownSpecs.some((item) => item.specName === specName))
        .sort((left, right) => left.localeCompare(right, 'uk'))
        .map((specName) => ({ specName, tag: getSpecTag(specName) }));

      const orderedSpecs = [...knownSpecs, ...extraSpecs].map((specMeta) => ({
        ...specMeta,
        count: entry.specs.get(specMeta.specName) || 0,
      }));

      return {
        ...entry,
        specEntries: orderedSpecs,
        specCount: orderedSpecs.filter((item) => item.count > 0).length,
        specSlots: orderedSpecs.length,
      };
    })
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }
      return left.className.localeCompare(right.className, 'uk');
    });

  const buildTooltipHtml = ({ header, accent, accentColor, rows }) => {
    const rowsHtml = (rows || []).map(([label, value]) => `
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    `).join('');

    return `
      <div class="tooltip-header">${escapeHtml(header)}</div>
      ${accent ? `<div class="tooltip-text stats-tooltip-accent" style="color:${accentColor || '#ffffff'}">${escapeHtml(accent)}</div>` : ''}
      ${rowsHtml ? `<div class="stats-tooltip-grid">${rowsHtml}</div>` : ''}
    `;
  };

  const renderDonut = ({ chartId, totalId, legendId, items, centerValue = null }) => {
    const chartNode = document.getElementById(chartId);
    const totalNode = document.getElementById(totalId);
    const legendNode = document.getElementById(legendId);

    if (!chartNode || !totalNode || !legendNode) {
      return;
    }

    const total = items.reduce((sum, item) => sum + item.value, 0);
    totalNode.textContent = centerValue !== null ? String(centerValue) : String(total);

    if (total <= 0) {
      chartNode.style.background = 'conic-gradient(rgba(255,255,255,0.08) 0deg 360deg)';
      legendNode.innerHTML = '<div class="legend-empty">Поки що тут порожньо.</div>';
      return;
    }

    let degreeOffset = 0;
    const slices = items
      .filter((item) => item.value > 0)
      .map((item) => {
        const sliceDegrees = (item.value / total) * 360;
        const start = degreeOffset;
        const end = degreeOffset + sliceDegrees;
        degreeOffset = end;
        return `${item.color} ${start}deg ${end}deg`;
      });

    chartNode.style.background = `conic-gradient(${slices.join(', ' )})`;

    legendNode.innerHTML = items
      .map((item) => {
        const percent = total > 0 ? formatPercent((item.value / total) * 100) : '0';
        return `
          <div class="legend-item">
            <span class="legend-swatch" style="background:${item.color}; box-shadow:0 0 12px ${hexToRgba(item.color, 0.55)}"></span>
            <div class="legend-copy">
              <div class="legend-topline">
                <span class="legend-label">${item.label}</span>
                <span class="legend-percent">${percent}%</span>
              </div>
              <div class="legend-bottomline">${item.note || `${item.value} гравців`}</div>
            </div>
          </div>
        `;
      })
      .join('');
  };

  renderDonut({
    chartId: 'faction-chart',
    totalId: 'faction-total',
    legendId: 'faction-legend',
    items: [
      { label: 'Альянс', value: factionCounts.alliance, color: '#0078ff' },
      { label: 'Орда', value: factionCounts.horde, color: '#b30000' },
    ],
  });

  const guildAverageItemLevel = guildItemLevelSamples > 0
    ? Math.round(guildItemLevelTotal / guildItemLevelSamples)
    : '—';

  renderDonut({
    chartId: 'armor-chart',
    totalId: 'armor-total',
    legendId: 'armor-legend',
    centerValue: guildAverageItemLevel,
    items: [
      { label: 'Тканина', value: armorCounts['Тканина'] || 0, color: armorMeta['Тканина'] },
      { label: 'Шкіра', value: armorCounts['Шкіра'] || 0, color: armorMeta['Шкіра'] },
      { label: 'Кольчуга', value: armorCounts['Кольчуга'] || 0, color: armorMeta['Кольчуга'] },
      { label: 'Лати', value: armorCounts['Лати'] || 0, color: armorMeta['Лати'] },
    ],
  });

  const guildAverageRio = guildRioSamples > 0 ? guildRioTotal / guildRioSamples : 0;
  const buildRoleRioNote = (roleKey) => {
    const averageRoleRio = roleRioSamples[roleKey] > 0 ? roleRioTotals[roleKey] / roleRioSamples[roleKey] : 0;
    return `${roleCounts[roleKey]} гравців • сер. RIO ${formatScore(averageRoleRio)}`;
  };

  renderDonut({
    chartId: 'rio-chart',
    totalId: 'rio-total',
    legendId: 'rio-legend',
    centerValue: formatScore(guildAverageRio),
    items: [
      { label: 'DPS', value: roleCounts.dps, color: roleMeta.dps.color, note: buildRoleRioNote('dps') },
      { label: 'Хіли', value: roleCounts.healing, color: roleMeta.healing.color, note: buildRoleRioNote('healing') },
      { label: 'Танки', value: roleCounts.tank, color: roleMeta.tank.color, note: buildRoleRioNote('tank') },
    ],
  });

  const roleSummaryNode = document.getElementById('spec-role-summary');
  if (roleSummaryNode) {
    roleSummaryNode.innerHTML = Object.entries(roleMeta)
      .filter(([key]) => roleCounts[key] > 0)
      .map(([key, meta]) => `
        <div class="role-pill" style="--role-color:${meta.color}; border-color:${hexToRgba(meta.color, 0.24)}; background:${hexToRgba(meta.color, 0.08)}">
          <span class="role-pill-dot"></span>
          <span>${meta.label}</span>
          <strong>${roleCounts[key]}</strong>
        </div>
      `)
      .join('');
  }

  const specChartNode = document.getElementById('spec-chart');
  const specFootnoteNode = document.getElementById('spec-footnote');

  if (specChartNode) {
    const totalMembers = members.length || 1;
    const maxSpecCount = classEntries.reduce((max, entry) => {
      const localMax = entry.specEntries.reduce((specMax, item) => Math.max(specMax, item.count), 0);
      return Math.max(max, localMax);
    }, 0);

    if (!classEntries.length) {
      specChartNode.innerHTML = '<div class="legend-empty">Поки що не вистачає даних для цього блоку.</div>';
    } else {
      specChartNode.innerHTML = classEntries
        .map((entry) => {
          const classPercent = (entry.count / totalMembers) * 100;
          const topColor = lightenColor(entry.color, 0.18);
          const shadowColor = hexToRgba(entry.color, 0.2);
          const panelColor = hexToRgba(entry.color, 0.08);
          const borderColor = hexToRgba(entry.color, 0.14);

          const bars = entry.specEntries
            .map((specEntry) => {
              const guildPercent = totalMembers > 0 ? (specEntry.count / totalMembers) * 100 : 0;
              const classShare = entry.count > 0 ? (specEntry.count / entry.count) * 100 : 0;
              const height = specEntry.count > 0 && maxSpecCount > 0 ? Math.max((specEntry.count / maxSpecCount) * 100, 10) : 0;
              const tooltipHtml = buildTooltipHtml({
                header: entry.className,
                accent: specEntry.specName,
                accentColor: entry.color,
                rows: specEntry.count > 0
                  ? [
                      ['Гравців', `${specEntry.count}`],
                      ['У гільдії', `${formatPercent(guildPercent)}%`],
                      ['Серед класу', `${formatPercent(classShare)}%`],
                    ]
                  : [
                      ['Гравців', '0'],
                      ['Стан', 'Наразі нікого немає'],
                    ],
              });

              return `
                <div class="spec-column${specEntry.count === 0 ? ' is-empty' : ''}" data-tooltip-html="${escapeAttribute(tooltipHtml)}" aria-label="${escapeAttribute(`${entry.className} — ${specEntry.specName}`)}">
                  <div class="spec-percent${specEntry.count === 0 ? ' is-empty' : ''}">${specEntry.count > 0 ? `${formatPercent(guildPercent)}%` : '&nbsp;'}</div>
                  <div class="spec-bar-track" style="border-color:${borderColor}; background:linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))">
                    <div class="spec-bar${specEntry.count === 0 ? ' is-empty' : ''}" style="height:${height}%; background:linear-gradient(180deg, ${topColor}, ${entry.color}); box-shadow:0 0 8px ${shadowColor}"></div>
                  </div>
                  <div class="spec-mini-tag">${escapeHtml(specEntry.tag)}</div>
                </div>
              `;
            })
            .join('');

          return `
            <article class="class-group" style="--class-color:${entry.color}; --class-panel:${panelColor}; --class-border:${borderColor}">
              <div class="class-group-head">
                <div class="class-group-tag">${escapeHtml(entry.tag)}</div>
                <div class="class-group-copy">
                  <div class="class-group-name">${escapeHtml(entry.className)}</div>
                  <div class="class-group-meta">${entry.count} гравців • ${formatPercent(classPercent)}%</div>
                </div>
              </div>
              <div class="class-spec-bars">${bars}</div>
            </article>
          `;
        })
        .join('');
    }

    if (specFootnoteNode) {
      const rioScope = guildRioSamples > 0
        ? `Середній RIO зараз ${formatScore(guildAverageRio)}.`
        : 'Середній RIO з’явиться, коли будуть Mythic+ бали.';
      specFootnoteNode.textContent = `У гільдії ${members.length} гравців, ${classEntries.length} класів і ${activeSpecs.size} представлених спеків. ${rioScope}`;
    }
  }

  const ensureTooltipNode = () => {
    let tooltipNode = document.querySelector('.floating-stats-tooltip');
    if (!tooltipNode) {
      tooltipNode = document.createElement('div');
      tooltipNode.className = 'floating-stats-tooltip';
      document.body.appendChild(tooltipNode);
    }
    return tooltipNode;
  };

  const floatingTooltip = ensureTooltipNode();

  const hideTooltip = () => {
    floatingTooltip.classList.remove('is-visible');
  };

  const positionTooltip = (event, target) => {
    const margin = 12;
    const rect = floatingTooltip.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    let left = event ? event.clientX - rect.width / 2 : targetRect.left + (targetRect.width / 2) - (rect.width / 2);
    let top = event ? event.clientY - rect.height - 18 : targetRect.top - rect.height - 14;

    if (left < margin) {
      left = margin;
    }

    if (left + rect.width > window.innerWidth - margin) {
      left = window.innerWidth - rect.width - margin;
    }

    if (top < margin) {
      top = Math.min(window.innerHeight - rect.height - margin, (event ? event.clientY : targetRect.bottom) + 18);
      floatingTooltip.dataset.side = 'bottom';
      floatingTooltip.style.setProperty('--tooltip-arrow-rotation', '180deg');
      floatingTooltip.style.setProperty('--tooltip-arrow-top', '-10px');
    } else {
      floatingTooltip.dataset.side = 'top';
      floatingTooltip.style.setProperty('--tooltip-arrow-rotation', '0deg');
      floatingTooltip.style.setProperty('--tooltip-arrow-top', '100%');
    }

    floatingTooltip.style.transform = `translate3d(${left}px, ${top}px, 0)`;
  };

  const showTooltip = (content, event, target) => {
    if (!content) {
      hideTooltip();
      return;
    }

    floatingTooltip.innerHTML = content;
    floatingTooltip.classList.add('is-visible');
    positionTooltip(event, target);
  };

  specChartNode?.querySelectorAll('[data-tooltip-html]').forEach((node) => {
    node.addEventListener('mouseenter', (event) => showTooltip(node.getAttribute('data-tooltip-html'), event, node));
    node.addEventListener('mousemove', (event) => positionTooltip(event, node));
    node.addEventListener('mouseleave', hideTooltip);
  });

  window.addEventListener('scroll', hideTooltip, true);
  window.addEventListener('resize', hideTooltip);
})();
