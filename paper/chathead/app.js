// Configuration

(function() {
  var boundRadius, boundsView, draggable, position, view, view2;

  position = {
    x: 350,
    y: 770
  };

  boundRadius = 1050;

  view = new View({
    x: position.x,
    y: position.y,
    width: 80,
    height: 80
  });

  view.style = {
    borderRadius: "50%",
    border: "3px solid #fff",
    background: "url('https://pbs.twimg.com/profile_images/2562282111/7lwoa0jegf7yii69tsjg_bigger.jpeg')"
  };

  draggable = new ui.Draggable(view);

  view.on(Events.DragMove, function() {
    var distance;
    distance = {
      x: Math.abs(view.x - position.x),
      y: Math.abs(view.y - position.y)
    };
    draggable.speed.x = 1 - Math.min(distance.x, boundRadius) / boundRadius;
    return draggable.speed.y = 1 - Math.min(distance.y, boundRadius) / boundRadius;
  });

  view.on(Events.DragEnd, function() {
    return view.animate({
      properties: {
        x: position.x,
        y: position.y
      },
      curve: "spring(1000,40,1000)"
    });
  });

  boundsView = new View({
    width: 772,
    height: 1598
  });

  boundsView.midX = view.midX;

  boundsView.midY = view.midY;

  boundsView.style.background = "url('http://f.cl.ly/items/230r2D2K3h2M0F0q1o3E/paper.png') top";

  boundsView.placeBehind(view);

}).call(this);
