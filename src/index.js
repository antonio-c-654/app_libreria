// ---- S t a t i c ----
// Servidor con Express
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const libros = require('./libros.json') // Archivo JSON
const morgan = require('morgan')

const app = express()

const HomeRoutes = require('./routes/home')

// Settings
app.set('appName', 'App Libros')
app.set('port', 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.text())
app.use(express.json())
app.use(express.urlencoded( {extended: false} ))
app.use(morgan("dev"))

app.use('/', HomeRoutes)

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Listen Port
app.listen(app.get('port'))
console.log(`Server ${app.get('appName')} on port ${app.get('port')}`)