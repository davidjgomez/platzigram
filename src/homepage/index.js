var yo = require('yo-yo');
var page = require('page');
var empty = require('empty-element');
var title = require('title');
//var request = require('superagent');
//var request = require('axios');
var header = require('../header');
var template = require('./template');

page('/', header, load, loadPictures, function(ctx, next){
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.pictures));
})

function load(ctx, next){
	title('Platzigram');
	var main = document.getElementById('main-container');
	empty(main).appendChild(yo`<div class="loader"/>`);
	next();
}

//Con Superagent
/*function loadPictures(ctx, next){
	request
		.get('/api/pictures')
		.end(function(err, res){
			if(err) return console.log(err);
			ctx.pictures = res.body;
			next();
		})
}*/

//Con Axios
/*function loadPictures(ctx, next){
	request
		.get('/api/pictures')
		.then(function(res){
			ctx.pictures = res.data;
			next();
		})
		.catch(function(err){
			console.log(err);
		})
}*/

//Con Fetch
/*function loadPictures(ctx, next){
	fetch('/api/pictures')
		.then(function(res){
			return res.json();
		})
		.then(function(pictures){
			ctx.pictures = pictures;
			next();
		})
		.catch(function(err){
			console.log(err);
		})
}*/

//Con Async/Await
async function loadPictures(ctx, next){
	try {
		ctx.pictures = await fetch('/api/pictures').then(res => res.json());
		next();
	} catch(err) {
		return console.log(err);
	}
}