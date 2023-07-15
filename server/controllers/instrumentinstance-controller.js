const connection = require("../common/db-connection"); 

const getAllInstances = (req, res) => {
    const q = "SELECT * FROM INSTRUMENTINSTANCE";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const insertInstance = (async(req, res) => {
    //console.log(req.body);
    try 
	{	
		retVal = '';
		if (!req.body) {res.status(200).json(retVal); return;}
		try 
		{			
			var InstrumentName = req.body.InstrumentName;
            var Name = req.body.Name;
            var Description = req.body.Description;
            var Image = req.body.Image;
            var UserID = req.body.UserID;
            var Price = req.body.Price;

            if(Name==='' || Description === '' || Image === ''){
                retVal.msg = 'All input required'; res.status(200).json(retVal); return;
            }
            else{

			const q = "INSERT INTO instrumentinstance(InstrumentName, Name, Description, Image, UserID, Price)  values  (" + "'" + InstrumentName + "' , '" + Name + "','" + Description + "'" + "," + "'" + Image + "'" + "," + "'" +UserID + "'" + "," + "'" +Price + "'" +")"  ;

			connection.query(q, (err, data) => {
				if(err) return res.json(err);
				res.status(200).json(data.affectedRows);
   			})
	    }
    }
	    catch(err) {
			console.log(err);
			retVal.msg = 'Failed'; res.status(200).json(retVal); return;
			    
    }
	}
	catch(err) {
		retVal.msg = 'Failed'; res.status(200).json(retVal); return;
	}
})

const getInstrumentInstance = (req, res) => {
    const instrumentName = req.params.instrumentName;
    const q = "SELECT * FROM INSTRUMENTINSTANCE WHERE InstrumentName = '" + instrumentName + "'";
    console.log(instrumentName);
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const deleteInstrumentInstance = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM INSTRUMENTINSTANCE WHERE InstrumentinstanceID = '" + id + "'";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports = { getAllInstances, insertInstance, getInstrumentInstance, deleteInstrumentInstance};
