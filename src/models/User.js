const { Model, DataTypes } = require('sequelize');

class User extends Model{
    static init(sequelize){
        super.init({
            uuid: DataTypes.UUID,
        }, {
            sequelize,
        });
    }

    /*static associate(models){
        this.belongsTo(models.Todos, {foreignKey: 'id', as: 'fkUserTodos'});
    }*/
}

module.exports = User;