document.addEventListener("DOMContentLoaded", function () {
  var tabRoots = document.querySelectorAll('[data-tabs]');
  if (!tabRoots.length) return;

  tabRoots.forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length || !panels.length) return;

    function activateTab(nextTab) {
      var targetId = nextTab.getAttribute('data-tab-target');

      tabs.forEach(function (tab) {
        var isActive = tab === nextTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach(function (panel) {
        var isActive = panel.id === targetId;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        activateTab(tab);
      });

      tab.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') {
          return;
        }

        event.preventDefault();
        var nextIndex = index;

        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;

        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      });
    });

    var initial = root.querySelector('[role="tab"].is-active') || tabs[0];
    activateTab(initial);
  });
});
