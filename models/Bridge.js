const mongoose = require("mongoose");

const BridgeSchema = new mongoose.Schema( {
	domainname:
	{
		type: String,
		required: [ true, "Please enter your FQDN." ],
		unique: true,
		trim: true,
		maxlength: [ 26, "The FQDN cannot exceed 26 characters." ],
	},
	namer:
	{
		type: String,
		required: [ true, "Please enter your handshakename or an alias, it\'s up to you ;)" ],
		trim: true,
		maxlength: [ 32, "Your name cannot exceed 32 characters for now, sorry :(" ],
	},
	github:
	{
		type: String,
		trim: true,
		required: [ true, "We need to load your avatar."]
	},
	twitter:
	{
		type: String,
		trim: true,
	},
	wallet:
	{
		type: String,
		trim: true,
		required: [ true, "please provide your wallet address. You'll need it to receive tips and other funds!"]
	},
	namelist:
	{
		type: String,
		trim: true,
	},
	secret:
	{
		type: String,
		trim: true,
		required: true,
		minlength: [ 32, "secret has to be at least 32 characters"]
	},
	
} )

module.exports = mongoose.models.Bridge || mongoose.model( "Bridge", BridgeSchema );