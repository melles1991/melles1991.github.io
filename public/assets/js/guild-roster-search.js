document.addEventListener("DOMContentLoaded", function () {
  function normalize(value) {
    return (value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .trim();
  }

  function getText(node) {
    return node ? (node.textContent || "") : "";
  }

  function initTabs() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-guild-tab-target]"));
    var panels = Array.prototype.slice.call(document.querySelectorAll("[data-guild-tab-panel]"));
    if (!buttons.length || !panels.length) return;

    function activate(target) {
      buttons.forEach(function (button) {
        var isActive = button.getAttribute("data-guild-tab-target") === target;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
        button.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      panels.forEach(function (panel) {
        var isActive = panel.getAttribute("data-guild-tab-panel") === target;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    }

    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        activate(button.getAttribute("data-guild-tab-target"));
      });

      button.addEventListener("keydown", function (event) {
        if (["ArrowRight", "ArrowLeft", "Home", "End"].indexOf(event.key) === -1) {
          return;
        }

        event.preventDefault();
        var nextIndex = index;

        if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = buttons.length - 1;

        buttons[nextIndex].focus();
        activate(buttons[nextIndex].getAttribute("data-guild-tab-target"));
      });
    });

    var initial = buttons[0];
    buttons.some(function (button) {
      if (button.classList.contains("is-active")) {
        initial = button;
        return true;
      }
      return false;
    });

    activate(initial.getAttribute("data-guild-tab-target"));
  }

  function attachSearch(config) {
    var input = document.getElementById(config.inputId);
    var clearButton = document.getElementById(config.clearId);
    var meta = document.getElementById(config.metaId);
    var emptyState = document.getElementById(config.emptyId);
    var layout = document.getElementById(config.layoutId);

    if (!input || !meta || !emptyState || !layout) return;

    var cards = Array.prototype.slice.call(layout.querySelectorAll(config.cardSelector));
    var groups = config.groupSelector ? Array.prototype.slice.call(layout.querySelectorAll(config.groupSelector)) : [];
    var total = cards.length;

    function updateMeta(visibleCount, query) {
      if (typeof config.metaFormatter === "function") {
        meta.textContent = config.metaFormatter(visibleCount, total, query);
        return;
      }
      meta.textContent = query ? "Знайдено: " + visibleCount + " з " + total : "Показано всіх: " + total;
    }

    function applyFilter() {
      var query = normalize(input.value);
      var visibleCount = 0;

      cards.forEach(function (card) {
        var haystack = normalize(config.getSearchText(card));
        var matches = !query || haystack.indexOf(query) !== -1;
        card.classList.toggle("is-hidden", !matches);
        if (matches) visibleCount += 1;
      });

      groups.forEach(function (group) {
        var hasVisible = group.querySelector(config.cardSelector + ":not(.is-hidden)");
        group.classList.toggle("is-hidden", !hasVisible);
      });

      emptyState.hidden = visibleCount > 0;
      if (clearButton) clearButton.hidden = !query;
      updateMeta(visibleCount, query);
      if (typeof config.afterFilter === "function") {
        config.afterFilter(cards);
      }
    }

    input.addEventListener("input", applyFilter);

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        input.value = "";
        input.focus();
        applyFilter();
      });
    }

    applyFilter();
  }

  function updateRankingOrder(cards) {
    var orderedCards = cards.slice().sort(function (a, b) {
      var scoreA = parseFloat(a.getAttribute("data-ranking-score") || "0");
      var scoreB = parseFloat(b.getAttribute("data-ranking-score") || "0");
      if (scoreA !== scoreB) return scoreB - scoreA;

      var nameA = normalize(a.getAttribute("data-ranking-name") || "");
      var nameB = normalize(b.getAttribute("data-ranking-name") || "");
      return nameA.localeCompare(nameB, "uk");
    });

    var list = document.getElementById("ranking-list");
    if (!list) return;

    orderedCards.forEach(function (card) {
      list.appendChild(card);
    });

    var visiblePosition = 0;
    orderedCards.forEach(function (card) {
      var hidden = card.classList.contains("is-hidden");
      var tier = "";
      var positionNode = card.querySelector(".ranking-position-value");

      if (!hidden) {
        visiblePosition += 1;
        if (positionNode) {
          positionNode.textContent = "#" + visiblePosition;
        }

        if (visiblePosition === 1) tier = "gold";
        if (visiblePosition === 2) tier = "silver";
        if (visiblePosition === 3) tier = "bronze";
      } else if (positionNode) {
        positionNode.textContent = "#–";
      }

      card.setAttribute("data-ranking-tier", tier);
    });
  }

  initTabs();

  attachSearch({
    inputId: "roster-search-input",
    clearId: "roster-search-clear",
    metaId: "roster-search-meta",
    emptyId: "roster-empty",
    layoutId: "roster-layout",
    cardSelector: ".member-card",
    groupSelector: ".role-column",
    getSearchText: function (card) {
      return [
        getText(card.querySelector(".char-name")),
        getText(card.querySelector(".char-realm")),
        card.getAttribute("data-member-class"),
        card.getAttribute("data-member-spec"),
        card.getAttribute("data-rio-best-role")
      ].join(" ");
    }
  });

  attachSearch({
    inputId: "ranking-search-input",
    clearId: "ranking-search-clear",
    metaId: "ranking-search-meta",
    emptyId: "ranking-empty",
    layoutId: "ranking-list",
    cardSelector: ".ranking-card",
    getSearchText: function (card) {
      return card.getAttribute("data-ranking-search") || card.textContent || "";
    },
    metaFormatter: function (visibleCount, total, query) {
      return query ? "Знайдено позицій: " + visibleCount + " з " + total : "Позицій: " + total;
    },
    afterFilter: updateRankingOrder
  });

  attachSearch({
    inputId: "profession-search-input",
    clearId: "profession-search-clear",
    metaId: "profession-search-meta",
    emptyId: "profession-empty",
    layoutId: "profession-grid",
    cardSelector: ".profession-card",
    getSearchText: function (card) {
      return card.getAttribute("data-profession-search") || card.textContent || "";
    }
  });
});
