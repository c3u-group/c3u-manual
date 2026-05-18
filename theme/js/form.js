function resize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

(function() {
  var els = document.querySelectorAll('.fill-input, .fill-input-cell');
  for (var i = 0; i < els.length; i++) {
    els[i].addEventListener('input', function() { resize(this); });
    resize(els[i]);
  }
})();

(function() {
  var tables = document.querySelectorAll('table');
  for (var i = 0; i < tables.length; i++) {
    if (tables[i].querySelector('[data-mat-label]')) {
      updateRowspan(tables[i]);
    }
  }
})();

function updateRowspan(table) {
  var extra = parseInt(table.getAttribute('data-mat-extra')) || 1;
  var n = table.querySelectorAll('.material-row').length + extra;
  var cells = table.querySelectorAll('[data-mat-label]');
  for (var i = 0; i < cells.length; i++) {
    cells[i].rowSpan = n;
  }
}

function addRow(btn) {
  var table = btn.closest('table');
  var rows = table.querySelectorAll('.material-row');
  var last = rows[rows.length - 1];
  var clone = last.cloneNode(true);
  var inputs = clone.querySelectorAll('input, textarea');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
    inputs[i].style.height = '';
  }
  var fills = clone.querySelectorAll('.fill-input, .fill-input-cell');
  for (var j = 0; j < fills.length; j++) {
    fills[j].addEventListener('input', function() { resize(this); });
  }
  last.parentNode.insertBefore(clone, last.nextSibling);
  updateRowspan(table);
  for (var k = 0; k < fills.length; k++) {
    resize(fills[k]);
  }
}

function delRow(btn) {
  var table = btn.closest('table');
  var rows = table.querySelectorAll('.material-row');
  if (rows.length <= 1) return;
  var last = rows[rows.length - 1];
  last.parentNode.removeChild(last);
  updateRowspan(table);
}

(function() {
  var form = document.querySelector('.a4-form');
  if (!form) return;

  var title = (form.querySelector('h3') || {}).textContent || 'form';
  var ns = title.trim().replace(/\s+/g, '_');

  function save() {
    var data = { ta: [], ti: [], ch: [] };
    form.querySelectorAll('textarea').forEach(function(el) {
      data.ta.push(el.value);
    });
    form.querySelectorAll('input[type="text"]').forEach(function(el) {
      data.ti.push(el.value);
    });
    form.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(el) {
      data.ch.push(el.checked);
    });
    localStorage.setItem(ns, JSON.stringify(data));
  }

  var raw = localStorage.getItem(ns);
  if (raw) {
    try {
      var data = JSON.parse(raw);

      if (data.ta) {
        var needed = data.ta.length;
        while (form.querySelectorAll('textarea').length < needed) {
          var tbl = form.querySelector('table[data-mat-extra]');
          if (!tbl) break;
          var btn = tbl.querySelector('.row-btn');
          if (!btn) break;
          addRow(btn);
        }
      }

      if (data.ta) {
        var tas = form.querySelectorAll('textarea');
        data.ta.forEach(function(val, i) {
          if (i < tas.length) tas[i].value = val;
        });
      }
      if (data.ti) {
        var tis = form.querySelectorAll('input[type="text"]');
        data.ti.forEach(function(val, i) {
          if (i < tis.length) tis[i].value = val;
        });
      }
      if (data.ch) {
        var chs = form.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        data.ch.forEach(function(val, i) {
          if (i < chs.length) chs[i].checked = val;
        });
      }
    } catch(e) {}
  }

  var fills = form.querySelectorAll('.fill-input, .fill-input-cell');
  for (var i = 0; i < fills.length; i++) {
    resize(fills[i]);
  }

  var timer;
  form.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(save, 300);
  });
  form.addEventListener('change', function() {
    clearTimeout(timer);
    timer = setTimeout(save, 300);
  });
})();
