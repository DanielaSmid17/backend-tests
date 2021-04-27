const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = graphql
const UserType = require('./TypeDefs/UserType')
const userData = require("../MOCK_DATA.json")


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: null,
            resolve(parent, args) {
                return userData
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                userData.push({id: userData.length + 1, name: args.name, last_name: args.last_name, email: args.email, gender: args.email, age: args.age})
                return args
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation })