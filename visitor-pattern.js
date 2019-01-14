// visitor pattern for computing subtotal for a cart list of products

class Product {
  constructor(params) {
    this.type = params.type;
    this.price = params.price;
  }

  accept(visitor) {
    visitor.visit(this);
  }
};

const prices = {
  PANTS: 20.0,
  HAT: 12.0,
  TSHIRT: 45.5
};
const product1 = new Product({
  type: 'PANTS',
  price: prices.PANTS
});
const product2 = new Product({
  type: 'TSHIRT',
  price: prices.TSHIRT
});
const product3 = new Product({
  type: 'TSHIRT',
  price: prices.TSHIRT
});
const product4 = new Product({
  type: 'TSHIRT',
  price: prices.TSHIRT
});
const product5 = new Product({
  type: 'HAT',
  price: prices.HAT
});

// subtotal visitor applies percentage discount
class SubtotalProductVisitor {
  constructor() {
    this.total = 0;
  }

  visit(product) {
    let subtotal = product.price;

    if ( product.type === 'PANTS') {
      // business rule
      // 50% off on PANTS
      subtotal = product.price * 0.5;

      this.total += subtotal;
    }
  }
}

// cart visitor computes the total 
var CartVisitor = {
  total: 0,
  count: {},

  visit(cart) {
    /* This object (the product visitor saves the total of cart) */
    const subtotalVisitor = new SubtotalProductVisitor();

    cart.products.forEach(product => {
      product.accept(subtotalVisitor);

      const type = product.type;

      this.count[type] = this.count[type] ? this.count[type] + 1 : 1;
    });

    let _total = subtotalVisitor.total;
    let _subtotal;

    console.log('**** computing total of cart ****');

    console.log('subtotal of ', `type: PANTS count: ${this.count.PANTS} price: ${prices.PANTS} subtotal: ${subtotalVisitor.total}`);
    delete this.count.PANTS;

    Object.keys(this.count).forEach(key => {
      const _count = this.count[key];
      const price = prices[key];

      if (key === 'TSHIRT' && _count >= 2) {
        // business rule: TSHIRT for 2 units half the price
        _subtotal = (Math.floor(_count / 2) * price) + (_count % 2) * price;
      } else {
        _subtotal = price * _count;
      }

      _total += _subtotal;

      console.log('subtotal of', `type: ${key} count: ${_count} price: ${price} subtotal: ${_subtotal}`);
    });

    this.total = _total;
  }
};

var cart = {
  products: [ product1, product2, product3, product4, product5 ],

  accept(visitor){
    visitor.visit(cart);
  }
};

cart.accept(CartVisitor);
console.log('Total of cart =', CartVisitor.total);
