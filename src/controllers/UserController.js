const User = require('../models/User');

module.exports = {
    async store(req, res){
        const uuid = req.body.uuid;
        
        /*const userExists = await User.findAll({ where: {id: uuid}});
        if(userExists.length > 0  || userExists == null){
            return res
                .status(401)
                .json({ error: 'Já existe um usuário com esse nome de usuário!' });
        }     */

        const newUser = await User.create({uuid: uuid});

        return res
            .status(200)
            .json(newUser);
    }
};