const connection = require("../common/db-connection"); 

const getAllEvents = (req, res) => {
    const q = "SELECT * FROM MUSICALEVENT";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getCategoryEvents = (req, res) => {
    const category = req.params.category;
    const q = "SELECT * FROM MUSICALEVENT WHERE CategoryName = '" + category + "'";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getInstrumentEvents = (req, res) => {
    const instrument = req.params.instrumentName;
    const q = "SELECT * FROM MUSICALEVENT WHERE InstrumentName = '" + instrument + "'";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getStatusEvents = (req, res) => {
    const status = req.params.status;
    const q = "SELECT * FROM MUSICALEVENT WHERE StatusName = '" + status + "'";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const insertEvent = (req, res) => {
        //console.log(req.body);
        try 
        {	
            retVal = '';
            if (!req.body) {res.status(200).json(retVal); return;}
            try 
            {			
                var Description = req.body.Description;
                var Location = req.body.Location;
                var Date = req.body.Date;
                var StatusName = req.body.StatusName;
    
                if(Location ==='' || Description === '' || Date === '' || StatusName === '' ){
                    retVal.msg = 'All input required'; res.status(200).json(retVal); return;
                }
                else{
    
                const q = "INSERT INTO musicalevent(Location, Description, Date, StatusName)  values  (" + "'" + Location + "' , '" +  Description + "'" + "," + "'" + Date + "'" + "," + "'" + StatusName + "'" +")"  ;
                console.log(q);
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
}

const deleteEvent = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM musicalevent WHERE MusicalEventID = '" + id + "'";
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}



module.exports = { getAllEvents, getCategoryEvents, insertEvent, deleteEvent, getInstrumentEvents, getStatusEvents};
