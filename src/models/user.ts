import { Schema, model, Document } from 'mongoose';

// Definición de la interfaz para el modelo de usuario
interface UserDocument extends Document {
  name: string;
  email: string;
  role: string;
  // Puedes agregar más campos según tus necesidades
}

// Esquema Mongoose para el modelo de usuario
const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  // Puedes agregar más campos y configuraciones según lo necesites
});

// Exportar el modelo de usuario
export default model<UserDocument>('User', userSchema);
