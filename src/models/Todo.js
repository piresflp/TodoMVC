const { Model, DataTypes } = require('sequelize');

class Todo extends Model{
    static init(sequelize){
        super.init({
            text: DataTypes.STRING,
            is_completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            sequelize,
        });
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'id_user', as: 'user'});
    }
}

module.exports = Todo;