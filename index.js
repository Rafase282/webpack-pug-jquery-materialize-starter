'use strict'

const express = require('express')
const pug = require('pug')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { title: 'hey' })
})

app.listen(PORT, error => {
  if (error) {
    console.error(error)
  }

  else {
    console.log('Listening on port ' + PORT)
  }
})
