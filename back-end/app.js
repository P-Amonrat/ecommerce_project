const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(fileupload());

const pool = mysql.createPool({
  // connectionLimit: 10,
  // host: "localhost",
  // user: "root", // <== ระบุให้ถูกต้อง
  // password: "root", // <== ระบุให้ถูกต้อง
  // database: "project",
  // port: 8889, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)

  connectionLimit: 10,
  host: "localhost",
  user: "root", // <== ระบุให้ถูกต้อง
  password: "root", // <== ระบุให้ถูกต้อง
  database: "project_ecommerce",
  port: 8889, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

app.get("/", async (req, res) => {
  const [rows, fields] = await pool.query(`SELECT * FROM stock`);
  console.log("getData", rows);
  if (rows.length > 0) {
    res.status(200).json(rows);
  } else {
    res.status(400).send("ข้อมูลไม่ถูกต้อง");
  }
});

app.delete("/del/:id", (req, res) => {
  console.log(req.params.id);
  const [rows, fields] = pool.query(
    `DELETE FROM stock WHERE id = "${req.params.id}"`
  );
  rows.affectedRows > 0
    ? res.status(200).json(rows)
    : res.status(400).send("ข้อมูลไม่ถูกต้อง");
});

app.post("/create", async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const newpath = __dirname + "/public/upload-files/";
  const file = req.files?.photo ? req.files.photo : null;
  // console.log(req.body.photo[0]);

  // console.log(file.originFileObj);

  try {
    if (file) {
      const dotIndex = file.name.lastIndexOf(".");
      const fileExtension = file.name.substr(dotIndex);
      const randomFilename = new Date().getTime();
      const filename = randomFilename + fileExtension;

      file.mv(`${newpath}${filename}`, async (err) => {
        if (err) {
          return res.status(500).json({ message: "File upload failed" });
        }
        // else {
        //   return res
        //     .status(200)
        //     .json({ message: "success", filename: filename });
        // }
        else {
          const [rows, fields] = await pool.query(
            `INSERT INTO stock (product_name, stock_left, category, photo) VALUES ("${req.body.product_name}", "${req.body.stock_left}", "${req.body.category}","${filename}")`
          );
          return rows.affectedRows > 0
            ? res.status(200).json(rows)
            : res.status(400).json("ข้อมูลไม่ถูกต้อง");
        }
      });
    }
    // throw new Error("file is not found.");
  } catch (e) {
    console.log(e);
    // return res.status(500).send("error data!");
  }
});

app.put("/update/:id", async (req, res) => {
  console.log("idshow", req.params.id);
  const [rows, fileds] = await pool.query(
    `UPDATE stock SET product_name = "${req.body.product_name}", stock_left =  "${req.body.stock_left}", category = "${req.body.category}" WHERE id = ${req.params.id}`
  );
  rows.affectedRows > 0
    ? res.status(200).json(rows.affectedRows)
    : res.status(400).send("ข้อมูลไม่ถูกต้อง");
});

app.post("/register", async (req, res) => {
  // console.log(req.body.username);
  try {
    const { username, password, firstname, lastname, email, phone_number } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    let [rows, fileds] = await pool.query(
      `INSERT INTO user (username, password, firstname, lastname, email, phone_number) VALUES ('${username}','${newPassword}', 
      '${firstname}', '${lastname}', '${email}', '${phone_number}')`
    );
    if (rows) {
      res.status(200).send("The registration is successful.");
    } else {
      res.status(404).send("The registration is failed!");
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", async (req, res) => {
  console.log("test");
  const { username, password } = req.body;
  try {
    const [rows, fields] = await pool.query(
      `SELECT * FROM user WHERE username = "${username}"`
    );
    if (rows.length > 0) {
      // console.log(rows);
      // res.status(200).send("Login is completed");
      const validPassword = await bcrypt.compare(password, rows[0].password);
      if (validPassword) {
        // console.log(rows);
        const privateKey = "dklfdf;d;askdpofkwepd,'acmkldjq;lx;alncpaxasm";
        const token = jwt.sign(
          {
            id: rows[0].id,
            username: rows[0].username,
          },
          privateKey,
          { expiresIn: "24h" }
        );
        res.json({ token: token });
      } else {
        res.status(404).send("Wrong password!");
      }
    } else {
      res.status(404).send("No user! Please Login again!");
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000);
