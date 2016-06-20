var yo = require('yo-yo');

module.exports = function pictureCard(pic) {
 
  function render(pic) {
    return yo`<div class="col s12 m4">
      <div class="card">
        <div class="card-image user-card">
          <img src="${pic.url}">
          <div><i class="fa fa-heart" aria-hidden="true"></i> ${pic.likes}</div>
        </div>
      </div>
    </div>`;
  }

  return render(pic);
}