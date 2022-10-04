const databaseConnection = require("../helpers/databaseConnection");
const bcrypt = require("bcrypt");
const fs = require("fs");
const nodemailer = require("nodemailer");
const config = require("../helpers/configMail");

class DatabaseController {
  async getAllProducts(req, res) {
    databaseConnection.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;

      res.send({ products: result });
    });
  }

  async addNewUser(req, res) {
    const login = req.body.login,
      password = req.body.password,
      password2 = req.body.password2;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (password === password2) {
      databaseConnection.query(
        "INSERT INTO `users` (`login`, `password`) VALUES (?, ?)",
        [login, hash],
        (err, result) => {
          if (err) throw err;

          res.send({ message: "Dodano użytkownika" });
        }
      );
    } else {
      res.send({ error: "Podane hasła nie są takie same" });
    }
  }

  async login(req, res) {
    const login = req.body.login,
      password = req.body.password;

    databaseConnection.query(
      "SELECT * FROM users WHERE login = ?",
      [login],
      (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, response) => {
            if (response) {
              res.send({ auth: true, username: login });
            } else {
              res.send({ auth: false, error: "Zły login lub hasło" });
            }
          });
        } else {
          res.send({ auth: false, error: "Zły login lub hasło" });
        }
      }
    );
  }

  async editProfile(req, res) {
    const login = req.body.login,
      password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    databaseConnection.query(
      "UPDATE `users` SET `login`=?, `password`=? WHERE login=?",
      [login, hash, login],
      (err, result) => {
        if (err) throw err;

        res.send({ message: "Zmieniono dane użytkownika" });
      }
    );
  }

  async addProduct(req, res) {
    const name = req.body.name,
      description = req.body.description,
      price = req.body.price,
      alt = req.body.alt,
      owner = req.body.owner,
      img = req.file.filename,
      quentity = req.body.quentity;

    // console.log(img);
    // console.log(`____________________`);
    // console.log(req.file);
    // console.log(`____________________`);
    // console.log(req.body);
    // console.log(`____________________`);
    // console.log(
    //   `Name: ${name} ---- description: ${description} ---- price: ${price} ---- alt: ${alt} ---- owner: ${owner}`
    // );
    const searchWord = name.toLowerCase().trim();

    databaseConnection.query(
      "INSERT INTO `products` (`owner`, `name`, `description`, `price`, `quentity`, `img`, `alt`, `searchword`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [owner, name, description, price, quentity, img, alt, searchWord],
      (err, result) => {
        if (err) throw err;

        res.send({ message: "Dodano przedmiot" });
      }
    );
  }

  async showAllProductsUser(req, res) {
    const owner = req.params.owner;

    databaseConnection.query(
      "SELECT * FROM `products` WHERE owner=?",
      [owner],
      (err, result) => {
        if (err) throw err;

        res.send({ products: result });
      }
    );
  }

  async deleteUserProduct(req, res) {
    const id = req.params.id;

    databaseConnection.query(
      "SELECT img FROM `products` WHERE id=?",
      [id],
      (err, result) => {
        if (err) throw err;

        fs.unlinkSync(`../shop/public/img/${result[0].img}`);

        databaseConnection.query(
          "DELETE FROM `products` WHERE id= ?",
          [id],
          (err, result) => {
            if (err) throw err;

            res.send({ result });
          }
        );
      }
    );
  }

  async showEditFormProduct(req, res) {
    const id = req.params.id;

    databaseConnection.query(
      "SELECT * FROM `products` WHERE id=?",
      [id],
      (err, result) => {
        if (err) throw err;

        res.send({ dataForm: result });
      }
    );
  }

  async editProduct(req, res) {
    const name = req.body.name,
      description = req.body.description,
      price = req.body.price,
      alt = req.body.alt,
      owner = req.body.owner,
      quentity = req.body.quentity,
      id = req.body.id;

    const searchWord = name.toLowerCase().trim();

    if (typeof req.file !== "undefined") {
      const img = req.file.filename;
      databaseConnection.query(
        "SELECT img FROM `products` WHERE id=?",
        [id],
        (err, result) => {
          fs.unlinkSync(`../shop/public/img/${result[0].img}`);

          databaseConnection.query(
            "UPDATE `products` SET `owner`=? ,`name`=? ,`description`=? ,`price`=? , `quentity`=?, `img`=? ,`alt`=?, `searchword`=? WHERE id=?",
            [
              owner,
              name,
              description,
              price,
              quentity,
              img,
              alt,
              searchWord,
              id,
            ],
            (err, result) => {
              if (err) throw err;

              res.send({ message: "Edytowano przedmiot" });
            }
          );
        }
      );
    } else {
      databaseConnection.query(
        "SELECT img FROM `products` WHERE id=?",
        [id],
        (err, result) => {
          databaseConnection.query(
            "UPDATE `products` SET `owner`=? ,`name`=? ,`description`=? ,`price`=? , `quentity`=? ,`alt`=?, `searchword`=? WHERE id=?",
            [owner, name, description, price, quentity, alt, searchWord, id],
            (err, result) => {
              if (err) throw err;

              res.send({ message: "Edytowano przedmiot" });
            }
          );
        }
      );
    }
  }

  async summary(req, res) {
    const deliveryAdres = req.body[0],
      products = req.body[1],
      orderNumber = Math.floor(Math.random() * 100000000 + 1);

    let listProducts = [];

    for (let i = 0; i < products.length; i++) {
      const id = products[i].id;
      let howMuchProducts = 0;

      listProducts.push(products[i].name);

      databaseConnection.query(
        "SELECT * FROM `products` WHERE id=?",
        [id],
        (err, result) => {
          if (err) throw err;

          howMuchProducts = result[0].quentity;

          if (howMuchProducts == products[i].quentity) {
            fs.unlinkSync(`../shop/public/img/${result[0].img}`);
            databaseConnection.query(
              "DELETE FROM `products` WHERE id=?",
              [id],
              (err, result) => {
                if (err) throw err;
              }
            );
          } else if (howMuchProducts > products[i].quentity) {
            const diff = howMuchProducts - +products[i].quentity;
            databaseConnection.query(
              "UPDATE `products` SET `quentity`=? WHERE id=?",
              [diff, id],
              (err, result) => {
                if (err) throw err;
              }
            );
          }
        }
      );
      if (i == products.length - 1) {
        const transporter = nodemailer.createTransport({
          host: config.host,
          port: config.port,
          secure: config.port === 465,
          auth: {
            user: config.email,
            pass: config.password,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const info = transporter.sendMail({
          from: "Sklep <kacper4312@op.pl>",
          to: deliveryAdres.email,
          subject: "Dziękujemy za złożone zamówienie",
          text: `Cześć: ${deliveryAdres.name}, Twój numer zamówienia to: ${orderNumber}, natomiast adres dostawy to: ${deliveryAdres.adres} - ${deliveryAdres.zipcode}, typ dostawy to: ${deliveryAdres.typeDelivery}, a twoje zamówienie to: ${listProducts}`,
          html: `Cześć: ${deliveryAdres.name}, <br> Twój numer zamówienia to: ${orderNumber},<br> natomiast adres dostawy to: ${deliveryAdres.adres} - ${deliveryAdres.zipcode},<br> typ dostawy to: ${deliveryAdres.typeDelivery},<br> a twoje zamówienie to: ${listProducts}`,
        });

        res.send({ message: "Zamówiono" });
      }
    }
  }

  async searchResult(req, res) {
    const searchWords = req.params.words;

    const wordAfterEdit = searchWords.trim().toLowerCase();

    databaseConnection.query(
      `SELECT * FROM products WHERE searchword LIKE '%${wordAfterEdit}%'`,
      (err, result) => {
        if (err) throw err;

        res.send({ data: result });
      }
    );
  }
}

module.exports = new DatabaseController();
