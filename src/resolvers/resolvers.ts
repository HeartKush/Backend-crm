import User from "../models/user.js";

const resolvers = {
    Query: {
        async User(_: any, { ID }: any) {
            return await User.findById(ID);
        },
        async getUsers(_: any, { amount }: any) {
            return await User.find().sort({ createdAt: -1 }).limit(amount);
        }
    },
    Mutation: {
        createUser: async (_: any, { userInput }: any) => {
            try {
                const createdUser = new User(userInput);
                await createdUser.save();
                return createdUser;
            } catch (error) {
                throw new Error("Error al crear la persona");
            }
        },
        deleteUser: async (_: any, { ID }: any) => {
            try {
                await User.deleteOne({ _id: ID });
                return true;
            } catch (error) {
                throw new Error("Error al eliminar la persona");
            }
        },
        editUser: async (_: any, { ID, userInput }: any) => {
            try {
                const existingUser = await User.findById(ID);
                if (!existingUser) {
                    throw new Error("Usuario no encontrado");
                }
                await User.updateOne({ _id: ID }, { $set: userInput });
                return true;
            } catch (error) {
                throw new Error("Error al editar la persona");
            }
        }
    }
};

export default resolvers;
