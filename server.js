const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', require('./api'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => res.status(404).send({url: req.originalUrl + ' Not Found'}) )

app.listen(port, () => console.log(`Explorer Tendermint Blockchain listening on port ${port}`))

module.exports = app