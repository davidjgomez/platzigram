var yo = require('yo-yo');
var translate = require('../translate');

module.exports = function pictureCard(pic) {
  var el;

  function render(pic) {
    return yo`<div class="card ${pic.liked ? 'liked' : ''}">
      <div class="card-image">
        <img class="activator" src="${pic.src}" ondblclick=${like.bind(null, null, true)} />
        <i class="fa fa-heart like-heart ${pic.likedHeart ? 'liked' : ''}" aria-hidden="true"></i>
      </div>
      <div class="card-content">
        <a href='/${pic.user.name}' class="card-title">
          <img src="${pic.user.avatar}" class="avatar">
          <span class="username">${pic.user.username}</span>
        </a>
        <small class="right time">${translate.date.format(new Date(pic.createdAt).getTime()}</small>
        <p>
          <a class="left" href="#" onclick=${like.bind(null, true)}><i class="fa fa-heart-o" aria-hidden="true"></i></a>
          <a class="left" href="#" onclick=${like.bind(null, false)}><i class="fa fa-heart" aria-hidden="true"></i></a>
          <span class="left likes">${translate.message('likes', {likes: pic.likes || 0})}</span>
        </p> 
      </div>
    </div>`;
  }

  function like(liked, dblclick) {
    if(dblclick) {
      pic.likedHeart = pic.liked = !pic.liked;
      liked = pic.liked;  
    }
    else {
      pic.liked = liked;  
    }

    pic.likes += liked ? 1 : -1;

    function doRender() {
      var newEl = render(pic);
      yo.update(el, newEl);
    }

    doRender();

    setTimeout(function() {
      pic.likedHeart = false;
      doRender();
    }, 1500);

    return false;
  }

  el = render(pic);
  return el;
}