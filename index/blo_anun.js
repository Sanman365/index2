// Función para bloquear nuevas ventanas y prevenir redirecciones indeseadas
function blockNewWindows() {
    // Sobrescribe window.open para evitar la apertura de nuevas ventanas
    const originalWindowOpen = window.open;
    window.open = function(url, windowName, windowFeatures) {
      console.log('Intento de abrir una nueva ventana bloqueado:', url);
      return null; // Bloquea la apertura de ventanas
    };
  
    // Monitorea cambios en window.location para bloquear redirecciones
    Object.defineProperty(window, 'location', {
      set: function(url) {
        console.log('Intento de redirección bloqueado:', url);
      }
    });
  
    // Capturamos el primer clic y lo bloqueamos si intenta abrir una nueva ventana
    let firstClick = true;
    document.body.addEventListener('click', function(event) {
      if (firstClick) {
        firstClick = false;
        preventUnwantedActions(event); // Bloquea cualquier acción no deseada en el primer clic
      }
    }, true);
  
    // Capturamos clics, dobles clics y otros eventos del mouse
    const eventsToBlock = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu'];
    eventsToBlock.forEach(eventType => {
      document.body.addEventListener(eventType, function(event) {
        preventUnwantedActions(event);
      }, true);
    });
  
    // Observa el DOM para prevenir scripts inyectados que puedan abrir ventanas
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.tagName === 'SCRIPT') {
            node.remove(); // Elimina cualquier script inyectado
            console.log('Script inyectado bloqueado y eliminado.');
          }
        });
      });
    });
  
    observer.observe(document, { childList: true, subtree: true });
  
    // Bloquea intentos de registrar nuevos eventos para abrir ventanas
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === 'click' || type === 'dblclick' || type === 'mousedown' || type === 'mouseup') {
        const wrappedListener = function(event) {
          try {
            listener.call(this, event);
          } catch (e) {
            console.log('Intento de abrir ventana desde evento bloqueado.');
          }
        };
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  
    // Función para prevenir acciones no deseadas en los eventos capturados
    function preventUnwantedActions(event) {
      var target = event.target;
  
      // Verifica si el clic proviene de un enlace u otro elemento que puede redirigir
      while (target && target !== document) {
        if (target.tagName === 'A' && target.href) {
          event.preventDefault(); // Bloquea la redirección de enlaces
          console.log('Intento de redirección desde enlace bloqueado:', target.href);
        } else if (target.tagName === 'FORM') {
          event.preventDefault(); // Bloquea la redirección desde formularios
          console.log('Intento de redirección desde formulario bloqueado.');
        }
        target = target.parentNode;
      }
    }
  
    // Sobrescribe setTimeout y setInterval para bloquear aperturas retrasadas
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
  
    window.setTimeout = function(func, delay) {
      if (typeof func === 'function') {
        const wrappedFunc = function() {
          try {
            func();
          } catch (e) {
            console.log('Intento de abrir ventana mediante setTimeout bloqueado.');
          }
        };
        return originalSetTimeout(wrappedFunc, delay);
      }
      return originalSetTimeout(func, delay);
    };
  
    window.setInterval = function(func, delay) {
      if (typeof func === 'function') {
        const wrappedFunc = function() {
          try {
            func();
          } catch (e) {
            console.log('Intento de abrir ventana mediante setInterval bloqueado.');
          }
        };
        return originalSetInterval(wrappedFunc, delay);
      }
      return originalSetInterval(func, delay);
    };
  }
  
  // Ejecuta la función después de cargar el DOM
  window.onload = function() {
    blockNewWindows();
  };
  