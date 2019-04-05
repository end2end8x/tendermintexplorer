const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var routes = require('./api/routes/routes')
routes(app)

app.use((req, res) => res.status(404).send({url: req.originalUrl + ' not found'}) )

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Explorer Tendermint Blockchain listening on port ${port}!`))
