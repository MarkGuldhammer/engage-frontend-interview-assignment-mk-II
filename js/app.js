PIXI.utils.sayHello();

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
  
let backgroundSprite, guySpirte;

function setup() {
  backgroundSprite = new PIXI.Sprite(PIXI.loader.resources["background"].texture);
  guySprite = new PIXI.Sprite(PIXI.loader.resources["guy"].texture);
  
  app.stage.addChild(backgroundSprite);
  app.stage.addChild(guySprite);
}