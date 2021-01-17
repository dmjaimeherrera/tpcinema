const express = require('express');
const router = express.Router();
const fs = require('fs');

// Create
router.post('/new', function (req, res) {
  let sql = `INSERT INTO peliculas (title, description, duration, genre, time) VALUES (?)`;
  let values = [
    req.body.title,
    req.body.description,
    req.body.duration,
    req.body.genre,
    req.body.time
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        status: true,
        title: 'Peliculas',
        message: 'Pelicula Agregada Correctamente',
      })
    }
  })
});

// All
router.get('/all', function (req, res) {
  let sql = `SELECT * FROM peliculas`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});

// Update
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE peliculas SET ? WHERE id = ?', [req.body, id], (err, data) => {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        status: true,
        title: 'Peliculas',
        message: 'Pelicula Modificada Correctamente',
      })
    }
  });
});

// Delete
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM peliculas WHERE id = ?', id, (err, data) => {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        status: true,
        title: 'Peliculas',
        message: 'Pelicula Eliminada Correctamente',
      })
    }
  });
});

// Upload
router.post('/upload', function (req, res) {
  let cover;
  let uploadPath;
  let fileName;
  let fileArr;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  cover = req.files.file;
  uploadPath = './client/public/img/';
  fileArr = (cover.name).split('.');
  fileName = Date.now() + '.' + fileArr[1];
  cover.mv(uploadPath + fileName, function (err) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      db.query('UPDATE peliculas SET image = ? WHERE id = ?', [fileName, req.body.id], (err, data) => {
        if (err) {
          res.json({
            error: err
          })
        } else {
          res.json({
            status: true,
            image: fileName,
            current: req.body.current
          })
        }
      });
    }
  });
});

// Remove
router.post('/remove', function (req, res) {
  let image = req.body.remove;
  let uploadPath;
  uploadPath = './client/public/img/';
  fs.unlink(uploadPath + image, function () {
    res.json({
      success: 'removed',
    });
  });
});

module.exports = router;