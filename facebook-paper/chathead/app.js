// Configuration

(function() {
  var boundRadius, boundsView, draggable, position, view;

  position = {
    x: 590,
    y: 350
  };

  boundRadius = 500;

  view = new View({
    x: position.x,
    y: position.y,
    width: 100,
    height: 100,
  });

  view.screenFrame = {
    width: 1136,
    height: 640
  }

  view.style = {
    borderRadius: "50%",
    border: "4px solid #fff",
    boxShadow: "0 1px 10px rgba(0, 0, 0, 0.7)",
    background: "url('http://learn.shayhowe.com/assets/layout/home/shay.jpg') no-repeat",
    backgroundSize: "cover"
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
      curve: "spring(500,30,1000)"
    });
  });

  boundsView = new View({
    width: 772,
    height: 1598
  });

  boundsView.style.background = "url('http://f.cl.ly/items/230r2D2K3h2M0F0q1o3E/paper.png') top";

  boundsView.placeBehind(view);

}).call(this);
