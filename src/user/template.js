var yo = require('yo-yo');
var layout = require('../layout');
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
				return yo`<div class="col s12 m4">
			      <a href="/${user.username}/${pic.id}" class="modal-trigger">
			        <div class="card">
				        <div class="card-image user-card">
				          <img src="${pic.url}">
				          <div>
				            <i class="fa fa-heart" aria-hidden="true"></i> ${pic.likes} 
				          </div>
				        </div>
				    </div>
			      </a>
			      <div id="modal${pic.id}" class="modal modal-fixed-footer">
			        <div class="modal-content">
			          <img src="${pic.url}">
			        </div>
			        <div class="modal-footer">
			          <div class="btn btn-flat likes">
			            <i class="fa fa-heart" aria-hidden="true"></i> ${translate.message('likes', {likes: pic.likes})}
			          </div>  
			        </div>
			      </div>
			    </div>`
			})}
		</div>
	</div>`;

	return layout(el);
}