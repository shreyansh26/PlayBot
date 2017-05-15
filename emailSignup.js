'use strict';

const Mongo = require('mongodb').MongoClient;
const uri = "mongodb://shreyansh:1234@ds143241.mlab.com:43241/ssplaybot";

module.exports = function(ctx, cb){
	let mailID = ctx.data.replyData;
	console.log(ctx.data);
	let won = ctx.data.won ? true : false;
	if(mailID){
		Mongo.connect(uri, function(error, db){
			db.collection('players')
					.update({
						email: mailID
					}, {
						email: mailID,
						contestWon: won
					}, {
						upsert: true
					}, (error, result) => {
						if(!error){
							db.close();
							cb(null,{});
						}
					});
		});
	} else{
		cb(null,{});
	}
}