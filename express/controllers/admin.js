const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const product = new Product(title, price, description, imageUrl);

  product
    .save()
    .then(result => res.redirect('/admin/products'))
    .catch(console.log)
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(console.log)
};

exports.postEditProduct = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedImageUrl = req.body.imageUrl;
  const prodId = req.body.productId;

  const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);

  product
  .save()
  .then(result => res.redirect('/admin/products'))
  .catch(console.log)
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(console.log)
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  
  Product.deleteById(prodId)
    .then(() => res.redirect('/admin/products'))
    .catch(console.log);
};