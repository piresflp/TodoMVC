const User = require('../models/User');

module.exports = {
    async getTodos(req, res){
        const { id } = req.params;

        const requestedUser = await User.findByPk(id)
    },

    async store(req, res){  
        const { id } = req.body;
        
        const userExists = await User.findAll({ where: {id: id}});
        if(userExists.length > 0  || userExists == null){
            return res
                .status(401)
                .json({ error: 'Já existe um usuário com esse ID!' });
        }     
        const newUser  = await User.create({id});

        return res
            .status(201)
            .json(newUser);
    }
};