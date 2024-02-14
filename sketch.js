const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
// Criando matrizes balls (balas) e boats (navios) vazias.
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
 
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

 
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();



  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}

function showBoats() {
  // Verifica se há barcos existentes no array 'boats'
  if (boats.length > 0) {
    // Verifica se o último barco é indefinido ou se está à esquerda da largura da tela menos 300 pixels
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      // Define posições possíveis para os novos barcos
      var positions = [-40, -60, -70, -20];
      // Escolhe aleatoriamente uma posição do array 'positions'
      var position = random(positions);
      // Cria um novo barco na parte direita da tela com base na posição escolhida aleatoriamente
      var boat = new Boat(width, height - 100, 170, 170, position);

      // Adiciona o novo barco ao array 'boats'
      boats.push(boat);
    }

    // Loop para iterar sobre todos os barcos existentes
    for (var i = 0; i < boats.length; i++) {
      // Verifica se o barco atual existe (não é undefined)
      if (boats[i]) {
        // Define a velocidade do barco para movê-lo para a esquerda
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        // Exibe o barco na tela
        boats[i].display();
      } 
    }
  } else {
    // Se não houver barcos, cria um novo barco na parte direita da tela
    var boat = new Boat(width, height - 60, 170, 170, -60);
    // Adiciona o novo barco ao array 'boats'
    boats.push(boat);
  }
}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
