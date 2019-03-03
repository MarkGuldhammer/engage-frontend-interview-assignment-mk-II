let app = new PIXI.Application({
  width: 800,
  height: 550,
  antialias: true,
  transparent: true,
  resolution: 1
});

document.body.appendChild(app.view);

PIXI.loader
  .add("background", "images/background.png")
  .add("guy", "images/guy.png")
  .add("button", "images/button.png")
  .load(setup);

let backgroundSprite, guySprite, buttonSprite, tween, i,
  path = new PIXI.tween.TweenPath(),
  gPath = new PIXI.Graphics(),
  mazeContainer = new PIXI.Container(),
  buttonContainer = new PIXI.Container(),
  isReversed = false,
  tweenTime = 5000,
  tweenLoop = false,
  buttonScale = 0.2,
  waypoints = [
    {x: 110, y: 100},
    {x: 715, y: 100},
    {x: 715, y: 470},
    {x: 155, y: 470},
    {x: 155, y: 140},
    {x: 675, y: 140},
    {x: 675, y: 430},
    {x: 190, y: 430},
    {x: 190, y: 175},
    {x: 630, y: 175},
    {x: 630, y: 390},
    {x: 230, y: 390},
    {x: 230, y: 210},
    {x: 595, y: 210},
    {x: 595, y: 360},
    {x: 270, y: 360},
    {x: 270, y: 245},
    {x: 560, y: 245},
    {x: 560, y: 330},
    {x: 320, y: 330}
  ];

for (i = 0; i < waypoints.length; i++) {
  let waypoint = waypoints[i];
  if (i === 0) {
    path.moveTo(waypoint.x, waypoint.y);
  } else {
    path.lineTo(waypoint.x, waypoint.y);
  }
}

function setup() {
  let appWidth = app.renderer.width,
    appHeight = app.renderer.height;

  backgroundSprite = new PIXI.Sprite(PIXI.loader.resources["background"].texture);

  buttonSprite = new PIXI.Sprite(PIXI.loader.resources["button"].texture);
  buttonSprite.anchor.set(0.5, 1);
  buttonSprite.scale.set(buttonScale, buttonScale);
  buttonSprite.x = appWidth / 2;
  buttonSprite.y = appHeight;
  buttonSprite.interactive = true;
  buttonSprite.buttonMode = true;
  buttonSprite.click = function() {
    startButtonClicked();
  };

  guySprite = new PIXI.Sprite(PIXI.loader.resources["guy"].texture);
  guySprite.anchor.set(0.5, 0.5);
  guySprite.x = waypoints[0].x;
  guySprite.y = waypoints[0].y;

  tween = PIXI.tweenManager.createTween(guySprite);
  tween.path = path;
  tween.time = tweenTime;
  tween.loop = tweenLoop;

  mazeContainer.pivot.set(appWidth / 2, appHeight / 2);
  mazeContainer.x = appWidth / 2;
  mazeContainer.y = appHeight / 2;
  mazeContainer.addChild(backgroundSprite);
  mazeContainer.addChild(guySprite);

  buttonContainer.addChild(buttonSprite);

  app.stage.addChild(mazeContainer);
  app.stage.addChild(buttonContainer);

  //Path debug
  /*gPath.lineStyle(5, 0x00FF00, 1);
  //gPath.drawPath(path);
  mazeContainer.addChild(gPath);*/
  
  app.ticker.add(delta => animationLoop());
}

function animationLoop() {
  PIXI.tweenManager.update();

  //rotate maze
  mazeContainer.rotation += 0.005;
  //counter rotate guy
  guySprite.rotation -= 0.005;
}

function setGuySpriteOrientation(isReversed) {
  if (isReversed) {
    guySprite.scale.x = -1;
  } else {
    guySprite.scale.x = 1;
  }
}

function startButtonClicked() {
  if (tween.active || tween.isEnded) {
    isReversed = !isReversed;
    setGuySpriteOrientation(isReversed);

    tween.reset();
    tween.pathReverse = isReversed;
    tween.start();
  } else {
    tween.start();
  }
}