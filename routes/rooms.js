const express = require('express');
const router = express.Router();

// Create
router.post('/new', function (req, res) {
  let sql = `INSERT INTO salas (number, capacity, type) VALUES (?)`;
  let values = [
    req.body.number,
    req.body.capacity,
    req.body.type,
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        status: true,
        title: 'Salas',
        message: 'Sala Agregada Correctamente',
      })
    }
  })
});

// All
router.get('/all', function(req, res) {
  let sql = `SELECT * FROM salas`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});

// Update
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE salas SET ? WHERE id = ?', [req.body, id], (err, data) => {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        status: true,
        title: 'Salas',
        message: 'Sala Modificada Correctamente',
      })
    }
  });
});

// Delete
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM rooms WHERE id = ?', id, (err, data) => {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        status: true,
        title: 'Salas',
        message: 'Sala Agregada Correctamente',
      })
    }
  });
});

module.exports = router;