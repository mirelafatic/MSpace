const connection = require("../common/db-connection"); 

const insertUser = (req, res) => {
    res.send('Inserting the User');
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    res.send('Deleting the User with id: ${id}');
}

module.exports = {insertUser, deleteUser};
