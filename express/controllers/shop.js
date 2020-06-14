const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(console.log)
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({
  //     id: prodId
  //   })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(console.log)
  Product.findByPk(prodId)
    .then(prod => {
      res.render('shop/product-detail', {
        product: prod,
        pageTitle: prod.title,
        path: '/products'
      });
    })
    .catch(console.log)
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(console.log)
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
    })
    .catch(console.log)
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchCart;
  let newQuantity = 1;

  req.user.getCart()
    .then(cart => {
      fetchCart = cart;
      return cart.getProducts({
        where: {
          id: prodId
        }
      })
    })
    .then(products => {
      let product;

      if (products.length > 0) {
        product = products[0]
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;

        return product;
      }

      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchCart.addProduct(product, {
        through: {
          quantity: newQuantity
        }
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(console.log)
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({
        where: {
          id: prodId
        }
      });
    })
    .then(products => {
      const product = products[0];

      return product.cartItem.destroy();
    })
    .then(result => res.redirect('/cart'))
    .catch(console.log)
};

exports.postOrder = (req, res, next) => {
  let fetchCart;

  req.user.getCart()
    .then(cart => {
      fetchCart = cart;

      return cart.getProducts();
    })
    .then(products => {
      return req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = {
              quantity: product.cartItem.quantity
            }

            return product;
          }))
        })
        .catch(console.log)
    })
    .then(result => {
      return fetchCart.setProducts(null)
    })
    .then(result => res.redirect('/orders'))
    .catch(console.log)
}


exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({
      include: ['products']
    })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(console.log)
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};