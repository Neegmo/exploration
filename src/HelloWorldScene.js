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
    this.load.image("Rocket", "RocketV2.png");
    this.load.image("Explosion", "Explosion.png");
    this.load.image("Check", "Check.png");
    this.load.image("StartButton", "StartButton.png");
    this.load.image("ClaimButton", "ClaimButton.png");
  }

  create() {
    this.multyplier = 1;

    this.container = this.add.container(540, 1500);
    this.lastPlanetPositionX = 0;
    this.lastPlanetPositionY = 0;

    this.planet1 = this.addPlanet(-300, -750);
    this.planet2 = this.addPlanet(0, -750);
    this.planet3 = this.addPlanet(300, -750);

    this.addStartExplorationButton();
    this.addEndExplorationButton();
    this.addHUD();
  }
  update() {}

  addHUD() {
    this.balanceText = this.add.text(
      10,
      2100,
      `Balance: ${this.balance.toFixed(2)}`,
      {
        fontSize: "50px",
        strokeThickness: 2,
        stroke: "#ffffff",
        align: "center",
      }
    );

    this.multyplierText = this.add
      .text(540, 150, `MULTYPLIER: X${this.multyplier}`, {
        fontSize: "60px",
        strokeThickness: 2,
        stroke: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
    this.tweens.add({
      targets: this.multyplierText,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 700,
    });

    this.betText = this.add.text(800, 2100, `Bet:${this.bet}`, {
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

    return this.planet;
  }

  addStartExplorationButton() {
    this.startExploration = this.add
      .image(540, 1900, "StartButton")
      .setInteractive();

    this.startExploration.once("pointerup", () => {
      this.startExploration.setAlpha(0);
      this.canExplore = true;
      this.balance -= this.bet;
      this.balanceText.text = `Balance: ${this.balance.toFixed(2)}`;
      this.endExploration.setAlpha(1);

      this.createRocket();
    });
  }
  addEndExplorationButton() {
    this.endExploration = this.add
      .image(540, 1900, "ClaimButton")
      .setInteractive()
      .setAlpha(0);

    this.endExploration.once("pointerup", () => {
      this.endExploration.setAlpha(0);
      this.canExplore = false;
      this.balance += this.bet * this.multyplier;
      this.balanceText.text = `Balance: ${this.balance.toFixed(2)}`;
      this.resetScene();
    });
  }

  createRocket() {
    this.rocket = this.add.image(0, 0, "Rocket").setDepth(10);
    this.container.add(this.rocket);
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

        this.time.delayedCall(200, () => {
          this.planet1.destroy();
          this.planet1 = this.addPlanet(x - 300, y - 850);
          this.planet2.destroy();
          this.planet2 = this.addPlanet(x, y - 850);
          this.planet3.destroy();
          this.planet3 = this.addPlanet(x + 300, y - 850);
        });
      },
    });
  }

  resetScene() {
    this.time.delayedCall(1000, () => {
      this.scene.restart();
    });
  }
}
