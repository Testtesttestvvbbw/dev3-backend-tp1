import { Model, DataTypes } from "sequelize" ;
import sequelize from "../config/database" ;
class User extends Model {
public nom!: string ;
public prenom!: string ;
}
User.init(
{nom :DataTypes.STRING,
prenom :DataTypes.STRING,
},
{
sequelize,
modelName : "User",
} ) ;
export default User ;
