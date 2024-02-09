
const fs = require('fs') // para modificar archivos
const { Router } = require('express')
const { error } = require('console')
const router = Router()

// lee el archivo y lo pasa a objeto de js
const json_libros = fs.readFileSync('./src/libros.json', 'utf-8')
let libros = JSON.parse(json_libros)
// console.log(libros)
// console.log(libros[0].titulo)


router.get('/', (req, res)=>{
    res.render('index', {datos: libros})
})
router.post('/', (req, res)=>{ // esto es para borrar pero te hace post de lo que quieres borrar
    const id_borrar = req.body.borrar //name del button
    console.log(id_borrar)
    libros = libros.filter((e) => e.id != id_borrar) // con el !== estricto no va porque es int y string
    const new_json_libros = JSON.stringify(libros)
    fs.writeFileSync('./src/libros.json', new_json_libros, "utf-8")
    res.redirect('/') // vuelve a cargar la pagina
})
router.get('/register', (req, res)=>{
    res.render('register')
})
router.post('/register', (req, res)=>{ // esto para añadir new libro
    const newDatos = req.body
    console.log('nuevos datos: ', newDatos)
    
    // importante que los inputs tengan NAME para poder coger los datos
    let newObj = {id: libros.length + 1, ...req.body} // desestructuracion de datos con ... con id autoincrement
    libros.push(newObj)

    try {
        fs.writeFileSync('./src/libros.json', JSON.stringify(libros), 'utf-8')
        // fs.writeFileSync es un método síncrono, bloquea la ejecución del código hasta que la operación de escritura del archivo haya sido completada.
    } catch (error) {
        console.log('ha habido un error: ', error)
    }
    // res.render('index')
    res.redirect('register')
})


module.exports = router