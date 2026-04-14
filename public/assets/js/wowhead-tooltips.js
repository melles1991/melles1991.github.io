(function () {
  function refreshWowheadTooltips() {
    if (window.$WowheadPower && typeof window.$WowheadPower.refreshLinks === 'function') {
      window.$WowheadPower.refreshLinks();
    }
  }

  window.refreshWowheadTooltips = refreshWowheadTooltips;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshWowheadTooltips, { once: true });
  } else {
    refreshWowheadTooltips();
  }
})();
