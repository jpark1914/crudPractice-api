const {GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLSchema} = require('graphql');
const Db = require('../db')

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a  Person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person){
                    return person.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(person) {
                    return person.firstName
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(person) {
                    return person.lasttName
                }
            },
            email: {
                type: GraphQLString,
                resolve(person) {
                    return person.email
                }
            }
        }
    }
})

const Post = new GraphQLObjectType({
    name: 'Post',
    description: "This represents each person's posts",
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person) {
                return person.id
                }
            },
            title: {
                type: GraphQLString,
                resolve(post) {
                    return post.title
                }
            },
            content: {
                type: GraphQLString,
                resolve(post) {
                    return post.content
                }
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: "Query",
    description: "this is the root query",
    fields: () => {
        return {
            people: {
                type: new GraphQLList(Person),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.person.findAll({where: args});
                }
            }
        }
    }
})
const Schema = new GraphQLSchema({
    query: Query
});

export default Schema;
