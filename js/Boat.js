class Boat {
  // Construtor da classe Boat
  constructor(x, y, width, height, boatPos) {
    // Cria um corpo retangular utilizando Matter.js
    this.body = Bodies.rectangle(x, y, width, height);
    // Armazena as dimensões da embarcação como propriedades
    this.width = width;
    this.height = height;
    // Carrega a imagem da embarcação
    this.image = loadImage("./assets/boat.png");
    // Armazena a posição vertical relativa da imagem em relação ao corpo físico
    this.boatPosition = boatPos;
    // Adiciona o corpo ao mundo físico
    World.add(world, this.body);
  }

  // Método para exibir a embarcação
  display() {
    // Obtém o ângulo de rotação do corpo físico
    var angle = this.body.angle;
    // Obtém a posição do corpo físico
    var pos = this.body.position;

    // Salva o estado atual da transformação
    push();
    // Translada o sistema de coordenadas para a posição do corpo físico
    translate(pos.x, pos.y);
    // Rotaciona o sistema de coordenadas pelo ângulo do corpo físico
    rotate(angle);
    // Define o modo de exibição da imagem no centro
    imageMode(CENTER);
    // Desenha a imagem da embarcação na posição relativa this.boatPosition
    image(this.image, 0, this.boatPosition, this.width, this.height);
    // Restaura o estado original da transformação
    pop();
  }
}
