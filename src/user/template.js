var yo = require('yo-yo');
var layout = require('../layout');
var picture = require('../user-picture-card');
var translate = require('../translate');

module.exports = function(user) {
	var el = yo`<div class="container usertimeline">
		<div class="row">
			<div class="col s12 m6 l4 center-align">
				<img src="${user.avatar}" class="avatar" />
			</div>
			<div class="col s12 m6 l8">
				<span class="username">${user.username}</span>
			</div>
		</div>
		<div class="row">
			${user.pictures.map(function(pic) {
				return picture(pic);
			})}
		</div>
	</div>`;

	return layout(el);
}