import Phaser from "phaser";
import Planet from "./Classes/Planet";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  canExplore = false;
  balance = 1000;
  bet = 10;

  preload() {
    this.load.image("brownPlanet", "brownPlanet.png");
    this.load.image("greenPlanet", "greenPlanet.png");
    this.load.image("redPlanet", "redPlanet.png");
    this.load.image("Planet1", "Planet1.png");
    this.load.image("Planet2", "Planet2.png");
    this.load.image("Planet3", "Planet3.png");
    this.load.image("Planet4", "Planet4.png");
    this.load.image("Rocket", "Rocket.png");
    this.load.image("Explosion", "Explosion.png");
    this.load.image("Check", "Check.png");


  }

  create() {
    this.multyplier = 1;

    this.container = this.add.container(540, 1700);
    this.lastPlanetPositionX = 0;
    this.lastPlanetPositionY = 0;

    this.addPlanet(-300, -750);
    this.addPlanet(0, -750);
    this.addPlanet(300, -750);

    this.addStartExplorationButton();
    this.addEndExplorationButton();
    this.addHUD();
  }
  update() {}


  addHUD() {
    this.balanceText = this.add.text(100, 100, `Balance: ${this.balance}`, {
      fontSize: "50px",
      strokeThickness: 2,
      stroke: "#ffffff",
      align: "center",
    });

    this.multyplierText = this.add.text(
      100,
      200,
      `Multyplier: ${this.multyplier}`,
      {
        fontSize: "50px",
        strokeThickness: 2,
        stroke: "#ffffff",
        align: "center",
      }
    );

    this.betText = this.add.text(800, 100, `Bet: ${this.bet}`, {
      fontSize: "50px",
      strokeThickness: 2,
      stroke: "#ffffff",
      align: "center",
    });
  }

  addPlanet(x, y) {
    this.planet = new Planet(this, x, y, "brownPlanet");
    this.add.existing(this.planet);
    this.container.add(this.planet);
  }

  addStartExplorationButton() {
    this.startExploration = this.add
      .text(540, 2000, "START\nEXPLORATION", {
        fontSize: "70px",
        strokeThickness: 5,
        stroke: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive();

    this.startExploration.once("pointerup", () => {
      this.startExploration.setAlpha(0);
      this.canExplore = true;
      this.balance -= this.bet;
      this.balanceText.text = `Balance: ${this.balance}`;
      this.endExploration.setAlpha(1);

      this.createRocket()
    });
  }

  createRocket() {
    this.rocket = this.add.image(0, 0, "Rocket").setScale(0.8, 0.8)
    this.container.add(this.rocket)
  }

  addEndExplorationButton() {
    this.endExploration = this.add
      .text(540, 2000, "END\nEXPLORATION", {
        fontSize: "70px",
        strokeThickness: 5,
        stroke: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setAlpha(0);

    this.endExploration.once("pointerup", () => {
      this.endExploration.setAlpha(0);
      this.canExplore = false;
      this.balance += this.bet * this.multyplier;
      this.balanceText.text = `Balance: ${this.balance}`;
      this.resetScene();
    });
  }

  movePlanets(x, y) {
    var currentX = this.container.x;
    var currentY = this.container.y;

    this.tweens.add({
      targets: this.container,
      x: currentX - (x - this.lastPlanetPositionX),
      y: currentY - (y - this.lastPlanetPositionY),
      yoyo: false,
      repeat: 0,
      ease: "Sine.easeIn",
      duration: 200,
      onComplete: () => {
        this.lastPlanetPositionX = x;
        this.lastPlanetPositionY = y;

        console.log(this.container.x);
        console.log(this.container.y);

        this.addPlanet(x - 300, y - 750);
        this.addPlanet(x, y - 750);
        this.addPlanet(x + 300, y - 750);
      },
    });
  }

  resetScene() {
    this.time.delayedCall(1000, () => {
      this.scene.restart();
    });
  }

}
