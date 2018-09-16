// Strategy pattern sacado del libro 
// node.js design patterns (Marco Casiaro)
//
// Requiere levantar la base de datos de ejemplo con docker-compose

const { Client } = require('pg')

const strategyDb = {
  name: 'Db strategy',
  read: () => {

    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'example',
      port: 5444,
    });

    client.connect();

    return new Promise( (resolve, reject) => {
      client.query('SELECT * from items', (err, res) => {
        if(err) {
          reject(err);
        }

        client.end()
        resolve(res.rows);
      });
    });
  }
}

const strategyMock = {
  name: 'Mock strategy',
  read: () => {
    const mockedData = [
      { id: 1, description: 'item1' },
      { id: 2, description: 'item2' },
      { id: 3, description: 'item3' }
    ];
    
    return Promise.resolve(mockedData);
  }
}

class ReadContext {

  constructor(strategy) {
    this.strategy = strategy;
  }

  read() {
    this.strategy.read().then( data => {
      console.log("Strategy used: " + this.strategy.name); 
      console.log(data);
    });
  }
  
}

const readContext = new ReadContext(strategyDb);
const mockReadContext = new ReadContext(strategyMock);

readContext.read();
mockReadContext.read();

// strategy:
// Sirve para mezclar en tiempo de ejecucion diferentes algoritmos
// de la misma familia o cuando se tiene una logica compleja que 
// implican muchos if else switch case
