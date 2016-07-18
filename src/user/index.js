var page = require('page');
var empty = require('empty-element');
var title = require('title');
var header = require('../header');
var template = require('./template');

page('/:username', header, loadUser, function(ctx, next){
	title(`Platzigram - ${ctx.params.username}`);
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.user));
})

page('/:username/:id', header, loadUser, function(ctx, next){
	title(`Platzigram - ${ctx.params.username}`);
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.user));
	$(`#modal${ctx.params.id}`).openModal({
		complete: function() {
			page(`/${ctx.params.username}`)
		}
	});
})

//Con Async/Await
async function loadUser(ctx, next){
	try {
		ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
		next();
	} catch(err) {
		return console.log(err);
	}
}