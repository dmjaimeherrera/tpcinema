const express = require('express');
const router = express.Router();

// Create
router.post('/new', function (req, res) {
  let sql = `INSERT INTO usuarios (document, mobile, email, password) VALUES (?)`;
  let values = [
    req.body.document,
    req.body.mobile,
    req.body.email,
    req.body.password
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        status: true
      })
    }
  })
});

// Login
router.post('/login', function (req, res) {
  var document = req.body.document;
  var password = req.body.password;
  let sql = `SELECT * FROM usuarios WHERE document = ? AND password = ?`;
  db.query(sql, [document, password], function (err, data, fields) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      if (data.length > 0) {
        delete data[0].password;
        req.session.logged = true;
        req.session.document = document;
        res.send(data[0]);
      } else {
        res.send(false);
      }
    }
  })
});

// Logged
router.get('/logged', function (req, res) {
  if (req.session.logged) {
    res.json({
      status: true,
      session: req.session
    });
  } else {
    res.json({
      status: false,
      session: req.session
    });
  }
});

// Logout
router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.send(true);
  });
});

// All
router.get('/all', function (req, res) {
  let sql = `SELECT * FROM usuarios`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data)
  })
});

module.exports = router;