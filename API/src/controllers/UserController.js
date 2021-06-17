const User = require('../models/User');
const Todo = require('../models/Todo')

module.exports = {
    async getTodos(req, res){
        const { id } = req.params;

        const requestedUser = await User.findByPk(id, {
            attributes: [],
            include: {
                association: 'todos',
                order: [{model: Todo}, 'id', 'ASC']
            },
        });

        if(!requestedUser)
            return res
                .status(404)
                .json({ error: 'Usuário não encontrado.'})

        return res
            .status(200)
            .json(requestedUser);
    },

    async store(req, res){  
        const { id } = req.body;
        
        const userExists = await User.findAll({ where: {id: id}});
        if(userExists.length > 0)
            return res
                .status(200)
                .json(userExists[0]);
             
        const newUser = await User.create({id});

        return res
            .status(201)
            .json(newUser);
    }
};