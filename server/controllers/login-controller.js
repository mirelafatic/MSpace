const connection = require("../common/db-connection"); 
var jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


const genAPIKey = () => {
	//create a base-36 string that contains 30 chars in a-z,0-9
	return [...Array(30)]
	  .map((e) => ((Math.random() * 36) | 0).toString(36))
	  .join('');
  };

const login = (async (req, res) => {	
	try 
	{
		var retVal = {idToken : null, isAdmin:null, msg : ''};
		retVal.msg = '';
		if (!req.body) {res.status(200).json(retVal); return;}
		try 
		{			
			var uname = req.body.username;
			var pword = req.body.password;
			var email = req.body.email;
			const q = "SELECT * FROM user WHERE username = '" + uname + "' AND password = '" + pword + "' AND email = '" + email + "'" ;
			let rows;
			connection.query(q, (err, data) => {
				if(err) return res.json(err)
				rows = data
				if (!rows || rows.length == 0){
					console.log(rows);
					retVal.msg = 'Input not valid';
					res.status(200).json(retVal); 
					return;
				}
				console.log(rows[0]);
				let user_db = rows[0];
				console.log(user_db);
				token = jwt.sign({ id: user_db.id, username : req.body.username}, genAPIKey(), { expiresIn: '1h' });
				retVal.idToken = token;
				retVal.isAdmin = user_db.isAdmin;
				console.log(retVal);
				res.status(200).json(retVal);
   			})
	    }
	    catch(err) {
			console.log(err);
			retVal.msg = 'Failed to login'; res.status(200).json(retVal); return;
		}	    
		
	}
	catch(err) {
		retVal.msg = 'Failed to login'; res.status(200).json(retVal); return;
	}
});

const singup = (async (req, res) => {	
	try 
	{	
		retVal = '';
		if (!req.body) {res.status(200).json(retVal); return;}
		try 
		{			
			var uname = req.body.username;
			var pword = req.body.password;
			var email = req.body.email;
			var isAdmin = req.body.isAdmin;
			const q1 = "SELECT * FROM user WHERE email = '" + email + "'";
			const q2 = "SELECT * FROM user WHERE username = '" + uname + "'";
			const q3 = "INSERT INTO user(Username, Email, Password, isAdmin)  values  (" + "'" + uname + "' , '" + email + "','" + pword + "'" + "," + "'" + isAdmin + "')"  ;

			connection.query(q1, (err, data) => {
				if(err) return res.json(err)
				rows = data
				if (rows.length != 0){
					console.log(rows);
					retVal = 'User with this email already exists!'; 
					res.status(200).json(retVal); 
					return;
				}
				else{
					connection.query(q2, (err1, data1) =>{
						if(err1) return res.json(err1)
						rows2 = data1
						if (rows2.length != 0){
							console.log(rows);
							retVal = 'User with this username already exists! Chose another one.';
							res.status(200).json(retVal); 
							return;
						}
						else{
							console.log(q3);
							connection.query(q3, (err3, data3) => {
								if(err3) return res.json(err3);
									res.status(200).json(data3.affectedRows);
							})
						}
					})
				}
   			})
	    }
	    catch(err) {
			console.log(err);
			retVal.msg = 'Singup failed'; res.status(200).json(retVal); return;
		}	    
		
	}
	catch(err) {
		retVal.msg = 'Singup failed'; res.status(200).json(retVal); return;
	}
});

module.exports = {login, singup};
