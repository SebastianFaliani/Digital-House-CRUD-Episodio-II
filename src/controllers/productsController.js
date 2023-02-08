const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const writeJson = (products) => {
      fs.writeFileSync(productsFilePath, JSON.stringify(products), { encoding: "utf-8" });
};
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
      // Root - Show all products
      index: (req, res) => {
            res.render("products", { products, toThousand });
      },

      // Detail - Detail from one product
      detail: (req, res) => {
            let product = products.find((product) => product.id == req.params.id);
            res.render("detail", { product, toThousand });
      },

      // Create - Form to create
      create: (req, res) => {
            res.render("product-create-form", { products, toThousand });
      },

      // Create -  Method to store
      store: (req, res) => {
            let lastId = products[products.length - 1].id;
            let newProduct = {
                  id: lastId + 1,
                  name: req.body.name,
                  price: req.body.price,
                  discount: req.body.discount,
                  catergory: req.body.catergory,
                  description: req.body.description,
                  image: "default-image.png",
            };
            products.push(newProduct);
            writeJson(products);
            res.redirect("/products/");
      },

      // Update - Form to edit
      edit: (req, res) => {
            let productId = Number(req.params.id);
            let productToEdit = products.find((product) => {
                  return product.id === productId;
            });
            res.render("product-edit-form", { productToEdit });
      },
      // Update - Method to update
      update: (req, res) => {
            let productId = Number(req.params.id);

            products.forEach((product) => {
                  if (product.id === productId) {
                        product.name = req.body.name;
                        product.price = req.body.price;
                        product.discount = req.body.discount;
                        product.catergory = req.body.catergory;
                        product.description = req.body.description;
                  }
            });
            writeJson(products);
            res.redirect("/products/");
      },

      // Delete - Delete one product from DB
      destroy: (req, res) => {
            // obtengo el id del req.params
            let productId = Number(req.params.id);

            // busco el producto a eliminar y lo borro del array
            products.forEach((product) => {
                  if (product.id === productId) {
                        let productToDestroy = products.indexOf(product);
                        products.splice(productToDestroy, 1);
                  }
            });

            writeJson(products);

            //let newProductsArray = products.filter(product => product.id !== productId)

            // sobreescribo el json con el array de productos modificado
            //writeJson(newProductsArray)

            // retorno un mensaje de exito
            res.send("El producto fue destruido");
      },
};

module.exports = controller;
