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
  .load(setup);
  
let backgroundSprite, guySprite;

function setup() {
  backgroundSprite = new PIXI.Sprite(PIXI.loader.resources["background"].texture);

  guySprite = new PIXI.Sprite(PIXI.loader.resources["guy"].texture);
  guySprite.anchor.set(0.5, 0.5);

  var path = new PIXI.tween.TweenPath();
  path.moveTo(110, 100);
  path.lineTo(715, 100);
  path.lineTo(715, 470);
  path.lineTo(155, 470);
  path.lineTo(155, 140);
  path.lineTo(675, 140);
  path.lineTo(675, 430);
  path.lineTo(190, 430);
  path.lineTo(190, 175);
  path.lineTo(630, 175);
  path.lineTo(630, 390);
  path.lineTo(230, 390);
  path.lineTo(230, 210);
  path.lineTo(595, 210);
  path.lineTo(595, 360);
  path.lineTo(270, 360);
  path.lineTo(270, 245);
  path.lineTo(560, 245);
  path.lineTo(560, 330);
  path.lineTo(320, 330);

  var gPath = new PIXI.Graphics();
  gPath.lineStyle(5, 0x00FF00, 1);
  gPath.drawPath(path);

  var tween = PIXI.tweenManager.createTween(guySprite);
  tween.path = path;
  tween.time = 10000;
  tween.loop = false;
  tween.start();
  
  app.stage.addChild(backgroundSprite);
  app.stage.addChild(guySprite);
  app.stage.addChild(gPath);
  
  app.ticker.add(delta => animationLoop(delta));
}

function animationLoop(delta) {
  PIXI.tweenManager.update();
}

