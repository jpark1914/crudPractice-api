// const express = require('express')
// const graphqlHTTP = require('express-graphql')
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const createError = require('http-errors');
// const {Pool, Client} = require('pg');
const {Sequelize} = require('sequelize')
const _ = require('lodash')
const Faker = require('faker')


// const app = express()

// //Middleware
// app.use(bodyParser.json())
// app.use(cors())
// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schema: schema,
//         graphiql: true,
//     }),
// );


// const port = process.env.PORT || 5000
// app.listen(port, () => console.log(`Server is listening on port ${port}`))

// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.json({ error: err });
// });



//DATABASE SETUP

const Conn = new Sequelize(
    'api-practice',
    'jordan',
    'Park7937!',
    {
        dialect: 'postgres',
        host: 'localhost'
    }
);

const Person = Conn.define('person', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }

    }
})

const Post = Conn.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({force: true})
.then(() =>{
    _.times(10, ()=>{
        return Person.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        })
    })
})