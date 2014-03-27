// Configuration

// global object namespace
view = {}

// menu deafult style
menuStyle = {
  background: "#e43125 url(assets/icons/plus.png) no-repeat center",
  backgroundSize: "70%",
  borderWidth: "4px",
  borderColor: "#fff",
  borderStyle: "solid",
  borderRadius: "50%",
  boxShadow: "0 1px 5px rgba(0, 0, 0, .5)",
  cursor: "pointer"
}

// menu item default style
menuItemStyle = {
  backgroundSize: "100%",
  borderRadius: "50%",
  cursor: "pointer"
}

// menu item default positioning
menuItemOrigin = 25;
menuItemSize = 70;

// animation default spring
animateSpring = "spring(350, 20, 350)";

// menu view
view.menu = new View({width: 80, height: 80});

// menu properties
view.menu.style = menuStyle;
view.menu.clip = false;
view.menu.x = 21;
view.menu.y = 1014;

// menu item views
view.menuItem1 = new View({
  width: menuItemSize,
  height: menuItemSize
});
view.menuItem2 = new View({
  width: menuItemSize,
  height: menuItemSize
});
view.menuItem3 = new View({
  width: menuItemSize,
  height: menuItemSize
});
view.menuItem4 = new View({
  width: menuItemSize,
  height: menuItemSize
});
view.menuItem5 = new View({
  width: menuItemSize,
  height: menuItemSize
});

// menu item properties
view.menuItem1.style = $.extend(menuItemStyle, {
  background: "#000 url(assets/icons/camera.png) no-repeat center center"
});
view.menuItem2.style = $.extend(menuItemStyle, {
  background: "#000 url(assets/icons/location.png) no-repeat center center"
});
view.menuItem3.style = $.extend(menuItemStyle, {
  background: "#000 url(assets/icons/music.png) no-repeat center center"
});
view.menuItem4.style = $.extend(menuItemStyle, {
  background: "#000 url(assets/icons/quote.png) no-repeat center center"
});
view.menuItem5.style = $.extend(menuItemStyle, {
  background: "#000 url(assets/icons/sleep.png) no-repeat center center"
});

view.menuItem1.x = menuItemOrigin;
view.menuItem2.x = menuItemOrigin;
view.menuItem3.x = menuItemOrigin;
view.menuItem4.x = menuItemOrigin;
view.menuItem5.x = menuItemOrigin;

view.menuItem1.y = menuItemOrigin;
view.menuItem2.y = menuItemOrigin;
view.menuItem3.y = menuItemOrigin;
view.menuItem4.y = menuItemOrigin;
view.menuItem5.y = menuItemOrigin;

view.menuItem1.superView = view.menu;
view.menuItem2.superView = view.menu;
view.menuItem3.superView = view.menu;
view.menuItem4.superView = view.menu;
view.menuItem5.superView = view.menu;

view.menuItem1.opacity = 0;
view.menuItem2.opacity = 0;
view.menuItem3.opacity = 0;
view.menuItem4.opacity = 0;
view.menuItem5.opacity = 0;

// reveal menu items
revealMenuItems = function(item1, item2, item3, item4, item5) {

  // reveal animation
  revealAnimation = function(view, prop) {
    view.animate({
      properties: prop,
      curve: animateSpring,
      time: 200
    });
  }

  revealAnimation(
    item1,
    { opacity: 1, x: 10, y: -240, scale: 1, rotation: 1440 }
  );

  utils.delay(25, function() {
    revealAnimation(
      item2,
      { opacity: 1, x: 95, y: -210, scale: 1, rotation: 1440 }
    );
  });

  utils.delay(50, function() {
    revealAnimation(
      item3,
      { opacity: 1, x: 170, y: -160, scale: 1, rotation: 1440 }
    );
  });

  utils.delay(75, function() {
    revealAnimation(
      item4,
      { opacity: 1, x: 220, y: -85, scale: 1, rotation: 1440 }
    );
  });

  utils.delay(100, function() {
    revealAnimation(
      item5,
      { opacity: 1, x: 250, y: 0, scale: 1, rotation: 1440 }
    );
  });

}

// hide menu items
hideMenuItems = function(item1, item2, item3, item4, item5) {

  // hide animation
  hideAnimation = function(item) {

    item.animate({
      properties: {
        scale: 0.1,
        opacity: 0,
        x: menuItemOrigin,
        y: menuItemOrigin
      },
      curve: animateSpring,
      time: 200
    });

  };

  hideAnimation(item5);

  utils.delay(25, function() {
    hideAnimation(item4);
  });

  utils.delay(50, function() {
    hideAnimation(item3);
  });

  utils.delay(75, function() {
    hideAnimation(item2);
  });

  utils.delay(100, function() {
    hideAnimation(item1);
  });

}

// set up toggler
toggleMenuItems = utils.toggle(revealMenuItems, hideMenuItems);

// menu toggle event
view.menu.on("click", function() {
  toggleMenuItems()(
    view.menuItem1,
    view.menuItem2,
    view.menuItem3,
    view.menuItem4,
    view.menuItem5
  );
});
