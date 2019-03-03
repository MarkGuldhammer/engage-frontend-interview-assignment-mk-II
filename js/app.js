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
  
let backgroundSprite, guySprite, buttonSprite, isReversed = false;

function setup() {
  backgroundSprite = new PIXI.Sprite(PIXI.loader.resources["background"].texture);
  
  buttonSprite = new PIXI.Sprite(PIXI.loader.resources["button"].texture);
  buttonSprite.anchor.set(0.5, 1);
  buttonSprite.scale.set(0.2, 0.2);
  buttonSprite.x = app.renderer.width / 2;
  buttonSprite.y = app.renderer.height;
  buttonSprite.interactive = true;
  buttonSprite.cursor = "pointer";
  buttonSprite.click = function() {
    if (tween.active) {
      isReversed = !isReversed;
      setGuySpriteOrientation(isReversed);
      
      tween.reset();
      tween.pathReverse = isReversed;
      tween.start();
    } else if (tween.isEnded) {
      isReversed = !isReversed;
      setGuySpriteOrientation(isReversed);

      tween.reset();
      tween.pathReverse = isReversed;
      tween.start();
    } else {
      tween.start();
    }
  };

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
  tween.time = 5000;
  tween.loop = false;
  //tween.pathReverse = true;
  //tween.start();
  
  app.stage.addChild(backgroundSprite);
  app.stage.addChild(guySprite);
  app.stage.addChild(gPath);
  app.stage.addChild(buttonSprite);
  
  app.ticker.add(delta => animationLoop());
}

function animationLoop() {
  PIXI.tweenManager.update();
}

function setGuySpriteOrientation(isReversed) {
  if (isReversed) {
    guySprite.scale.x = -1;
  } else {
    guySprite.scale.x = 1;
  }
}