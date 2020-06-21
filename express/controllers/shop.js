const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
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
  Product.findById(prodId)
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
  Product.fetchAll()
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
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(console.log)
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  
  Product.findById(prodId)
  .then(product => {
    req.user.addToCart(product)
  })
  .then(() => res.redirect('/cart'));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => res.redirect('/cart'))
    .catch(console.log)
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(result => res.redirect('/orders'))
    .catch(console.log)
}


exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
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