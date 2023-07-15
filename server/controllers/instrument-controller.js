const connection = require("../common/db-connection"); 

const getAllInstruments = (req, res) => {
    const q = "SELECT * FROM INSTRUMENT";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getCategoryInstruments = (req, res) => {
    const category = req.params.category;
    const q = "SELECT * FROM INSTRUMENT WHERE CategoryName = '" + category + "'";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const insertInstrument = (req, res) => {
    res.send('Inserting the instrument');
}

const deleteInstrument = (req, res) => {
    const instrumentName = req.params.instrumentName;
    res.send('Deleting the instrument with name: ${instrumentName}');
}

const getCategories = (req, res) => {
    const q = "SELECT * FROM CATEGORY";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports = { getAllInstruments, getCategoryInstruments, insertInstrument, deleteInstrument, getCategories};
