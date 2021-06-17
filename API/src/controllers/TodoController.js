const Todo = require('../models/Todo');

module.exports = {
    async store(req, res){
        const newTodo  = await Todo.create(req.body);

        return res
            .status(201)
            .json(newTodo);
    },

    async update(req, res){
        const { id } = req.params;

        const requestedTodo = await Todo.findByPk(id);
        if(!requestedTodo)
            return res
                .status(404)
                .json({error: 'Todo não encontrado.'});

        const updatedTodo = await requestedTodo.update(req.body);

        return res
            .status(200)
            .json(updatedTodo);
    },

    async delete(req, res){
        const { id } = req.params;

        const requestedTodo = await Todo.findByPk(id);
        if(!requestedTodo)
            return res
                .status(404)
                .json({error: 'Todo não encontrado.'});

        await requestedTodo.destroy();
        return res
            .status(200)
            .json({message: 'Todo deletado com sucesso!'});
    },

    async checkAll(req, res){
        const {is_completed, id_user} = req.body;
        console.log(is_completed)

        await Todo.update({is_completed: is_completed},{
            where: {id_user: id_user},
        })
        return res.status(200)
    },

    async deleteCompleted(req, res){
        const todos = req.body.todos;

        todos.forEach(async (id) => await Todo.destroy({where:{id: id}}))

        return res
            .status(200)
    }
};