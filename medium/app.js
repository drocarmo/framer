// Configuration

var app = {};
app.post = {};
app.meta_information = {};

app.retina_display = 1;
app.post.open = false;
app.post.cutpointOpen = (1 * app.retina_display);

app.meta_information.art = 'assets/top.png';

// iphone view
iphone = new View ({
  x: 0,
  y: 0,
  width: 640,
  height: 1136
});

iphone.style = {
  background: '#fff',
  overflow: 'hidden'
};

// top view
cover = new View ({
  x: iphone.minX,
  y: iphone.minY,
  width: iphone.width,
  height: iphone.height,
  superView: iphone
});
cover.style.background = '#fff';

// cover_art, album_art, gradient_mask
cover_art = new View ({
  x: 0,
  y: 0,
  width: iphone.width,
  height: iphone.height,
  superView: cover
});

post_art = new ImageView ({
  image: app.meta_information.art,
  x: 0,
  y: 0,
  width: iphone.width,
  height: iphone.height,
  superView: cover_art
});

// load article graphic first
article = new ImageView ({
  x: 0,
  y: iphone.maxY,
  image: 'assets/post.png',
  width: iphone.width,
  height: 5699
})

// post list view
// height is content added together
post = new ScrollView ({
  x: 0,
  y: 0,
  width: iphone.width,
  height: (article.height + cover_art.height),
  superView: cover
});

article.superView = post;

post.style = {
  padding: '0',
  overflow: 'hidden'
}

gradient_cover = new View ({
  x: 0,
  y: 0,
  width: cover_art.width,
  height: cover_art.height,
  superView: post
});

gradient_cover.style = {
  boxShadow: 'inset 0 -1136px 0 rgba(0,0,0,.175)'
};

// Scrolling behavior
// Code is by Ryan Sims -> http://codepen.io/simsie/pen/feksg
post.draggable = new ui.Draggable(post);

post.on(Events.DragMove, function() {
  post.x = 0;
  if (post.y > 0) {
    post.y = 0;
  }
});

post.on(Events.DragEnd, function() {
  var article_cutpoint_maxY = (
    cover_art.height + (
      article.height - cover.height
      )
    );
  if (app.post.open == false) {
    if (post.y < -(app.post.cutpointOpen)) {
      post.animate({
        properties: {y: -(cover_art.maxY)},
        time: 200
      });
      app.post.open = true;
    }
    else {
       post.animate({
        properties: {y: 0},
        time: 200
      });
    }
    return true;
  }
  else if (app.post.open == true) {
    if (post.y > -(cover_art.height-app.post.cutpointOpen)) {
      post.animate({
        properties: {y: 0},
        time: 300
      });
      app.post.open = false;
    }
    else if ((post.y < -(cover_art.height))&&(post.y > -article_cutpoint_maxY)) {
      return true
    }
    else if (post.y < -article_cutpoint_maxY) {
      post.animate({
        properties: {y: -article_cutpoint_maxY},
        time: 300
      });
    }
    else {
      post.animate({
        properties: {y: -(cover_art.height)},
        time: 300
      });
    }
    return true;
  }
});
