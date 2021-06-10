const { Model, DataTypes } = require('sequelize');

class User extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey:true,
            }
        }, {
            sequelize,
        });
    }

    static associate(models){
        this.hasMany(models.Todos, {foreignKey: 'id_user', as: 'fkUserTodos'});
    }
}

module.exports = User;