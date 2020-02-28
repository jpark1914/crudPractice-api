const express = require('express')

require('dotenv').config

const helmet = require('helmet')
const bodyParser = require('body-parser');
const cors = require('cors') 
const morgan = require('morgan')

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

//db Connection w/ localhost

var db = require('knex') ({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'crud-practice-1'
    }
})

const main = require('./controllers/main')
 
//App 
const app = express()

//App middleware

app.use(bodyParser.json())
app.use(cors());
app.use(helmet())
app.use(morgan('combined'))

//App Routes - Auth

app.get('/', (req,res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

//App Server Connection
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`)
})