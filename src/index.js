const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.urlencoded({ extended: true }))

/* modelo do json:
{
    id,
    titulo: string,
    editora: string,
    foto: string,
    autores: array[]
}
*/

let obrasCadastradas = 
[
    {
        id: 1,
        titulo: 'Harry Potter',
        editora: 'Rocco',
        foto: 'https://i.imgur.com/UH3IPXw.jpg',
        autores: ["JK Rowling", "..."]
    }
]

app.listen(3000, () => {
    console.log('listening on port 3000')
})

app.route("/")
	.get((req, res) => {
		res.status(200).send("Everything's alright!")
	})

app.route("/obras/")
    .get((req, res) => {
        res.send(obrasCadastradas)
    })
    .post((req, res) => {
        let id = uuidv4();
        let { titulo, editora, foto, autores } = req.body

        obrasCadastradas.push({
            id,
            titulo,
            editora,
            foto,
            autores
        })
    })

app.route("/obras/:id")
    .put((req, res) => {
        const id = req.params.id
        let { titulo, editora, foto, autores } = req.body

        const indexObra = obrasCadastradas.findIndex(element => element.id === id)

        if (indexObra === -1) {
            res.status(404).json({
                message: 'Obra não encontrada',
                success: true
            })
        } else {
            const sameID = obrasCadastradas[indexObra].id
            const obraEditada = {
                sameID,
                titulo,
                editora,
                foto,
                autores
            }

            obrasCadastradas.splice(indexObra, 1, obraEditada)
            
            res.status(200).json({
                message: "Obra editada",
                success: true
            })
        }
    })

app.route("/obras/:id")
    .delete((req, res) => {
        const id = req.params.id

        const indexObra = obrasCadastradas.findIndex(element => element.id === id)

        if (indexObra === -1) {
            res.status(404).json({
                message: 'Obra não encontrada',
                success: true
            })
        } else {
            obrasCadastradas.splice(indexObra, 1)
            res.status(200).json({
                message: "Obra Deletada",
                success: true
            })
        }
    })
