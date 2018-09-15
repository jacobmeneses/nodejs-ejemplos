// Proxy pattern sacado del libro 
// node.js design patterns (Marco Casiaro)
//
const objeto = {
  cadena: 'Hello from object',
  funcion: function () {
    return { 
      mensaje: this.cadena 
    };
  },
  funcion_aritmetica: function() {
    return 3 * 3;
  }
};

class Controller { 

  constructor(){
    this.cadena  = 'Hello from controller';
  }

  funcion(request) {
    return this.cadena;
  }
  
  funcion_aritmetica(){
    return 2 + 2;
  }
};

// Proxy mediante composicion
class Proxy {
  constructor(subject) {
    this.subject = subject;
  }

  funcion(request) {
    if(request && request.password === 'secreto') {
      return this.subject.funcion(request);
    }
    else {
      return {
        mensaje: 'The access is not secure'
      };
    }
  }

  // Por cada metodo nuevo en Controller debo definir el metodo en el proxy
  // ya sea asi, o modificando el proto
  // funcion_aritmetica() { return this.subject.funcion_aritmetica(); }

}

const funcion = objeto.funcion.bind(objeto) 
respuesta = funcion()
console.log(respuesta);

controller = new Controller();
console.log(controller.funcion());

proxy = new Proxy(controller);
proxy.__proto__.funcion_aritmetica = controller.funcion_aritmetica
console.log(proxy.funcion({ password: 'secreto' }))
console.log(proxy.funcion({ password: 'noexiste' }))
console.log(proxy.funcion())
console.log(proxy.funcion_aritmetica())

// Proxy mediante object augmentation
function create_proxy(subject) {
  const proxy = Object.assign({}, subject);

  proxy.funcion = function() {
    const res = subject.funcion()

    res.mensaje = 'Proxied: ' + res.mensaje
    return res;
  };

  return proxy;
}

const proxy2 = create_proxy(objeto);
respuesta_proxied = proxy2.funcion()
console.log(respuesta_proxied);
console.log(proxy2.funcion_aritmetica());

// proxy:
// sirve para validar input, alterar output entre otras cosas

