import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolversTest from "./resolvers/resolvers.js";
import persons from "./data/persons.js";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import mongoose from "mongoose";

const DBURL = "mongodb+srv://andresparra05:andresparra12@atlascluster.pvp3gta.mongodb.net/test_Crm?retryWrites=true&w=majority"

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()]
})

const server = new ApolloServer({
    typeDefs,
    resolvers: resolversTest,
});

(async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("Conectado a MongoDB Atlas");

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀  Servidor listo en: ${url}`);
    console.log(persons);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

