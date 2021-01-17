const express = require('express');
const router = express.Router();

// Create
router.post('/new', function (req, res) {
  let sql = `INSERT INTO reservas (document, title, room, time) VALUES (?)`;
  let values = [
    req.body.document,
    req.body.title,
    req.body.room,
    req.body.time
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

// All
router.get('/all', function (req, res) {
  let sql = `SELECT * FROM reservas`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});

module.exports = router;