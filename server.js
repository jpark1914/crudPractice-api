const express = require('express')
const GraphHTTP = require('express-graphql')
const Schema = require('./schema/schema')
import Schema from ('./schema/schema');

const port = process.env.PORT || 3000
const app = express()
app.use('/graphql', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})