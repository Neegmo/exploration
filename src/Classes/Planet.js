import { Tweens } from "phaser";

export default class Planet extends Phaser.GameObjects.Container {
  randomChanceSequence = [90, 75, 60];
  randomQuoteSequence = [1.1, 1.33, 1.67];
  randomTextureSequence = ["Planet1", "Planet2", "Planet3"];

  constructor(scene, x, y, texture) {
    super(scene, x, y);

    this.planet = new Phaser.GameObjects.Sprite(scene, 0, 0, texture)
      .setScale(0.5, 0.5)
      .setDepth(-1);
    this.add(this.planet);

    this.scene = scene;

    this.getRandomChance();

    this.planet.setInteractive();

    this.planet.on("pointerup", () => {
      if (!scene.canExplore) return;
      scene.canExplore = false;
      let randomNumber = Phaser.Math.Between(0, 100);

      if (randomNumber > this.randomChance) {
        this.startFailedExploration();
      } else {
        this.startSuccessfulExploration();
      }
    });

    this.text = new Phaser.GameObjects.Text(
      scene,
      0,
      -180,
      `MULTIPLYER:\nX${this.randomQuote}`,
      {
        fontSize: "40px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      }
    ).setOrigin(0.5, 0.5);
    this.add(this.text);

    this.chanceText = new Phaser.GameObjects.Text(
      scene,
      0,
      +180,
      `CHANCE:\n${this.randomChance}%`,
      {
        fontSize: "40px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      }
    ).setOrigin(0.5, 0.5);
    this.add(this.chanceText);
  }

  getRandomChance() {
    let randomIndex = Phaser.Math.Between(0, 2);
    this.randomChance = this.randomChanceSequence[randomIndex];
    this.randomQuote = this.randomQuoteSequence[randomIndex];
    this.planet.setTexture(this.randomTextureSequence[randomIndex]);
    // this.planet.setTint(0x0000ff)
  }

  startSuccessfulExploration() {
    this.scene.flyingSound.play();
    this.scene.tweens.add({
      targets: this.scene.rocket,
      x: this.x,
      y: this.y,
      yoyo: false,
      repeat: 0,
      ease: "Expo.easeOut",
      duration: 1000,
      onComplete: () => {
        this.explorationSuccesfull();
      },
    });
  }

  startFailedExploration() {
    this.scene.winSound.play();
    this.scene.tweens.add({
      targets: this.scene.rocket,
      x: this.x,
      y: this.y,
      yoyo: false,
      repeat: 0,
      ease: "Expo.easeOut",
      duration: 1000,
      onComplete: () => {
        this.explorationFailed();
      },
    });
  }

  explorationSuccesfull() {
    this.scene.winSound.play();
    this.scene.multyplier = this.scene.multyplier * this.randomQuote;
    this.scene.multyplierText.text = `MULTYPLIER: X${this.scene.multyplier.toFixed(
      2
    )}`;

    this.check = this.scene.add.image(this.x, this.y, "Check");
    this.check.setScale(0.5, 0.5);
    this.scene.container.add(this.check);

    this.scene.tweens.add({
      targets: this.check,
      scaleX: 1,
      scaleY: 1,
      yoyo: false,
      repeat: 0,
      ease: "Expo.easeOut",
      duration: 400,
      onComplete: () => {
        this.scene.time.delayedCall(100, () => {
          this.check.destroy();
          this.scene.movePlanets(this.x, this.y);
        });
      },
    });
  }

  explorationFailed() {
    this.scene.loseSound.play();
    let explosion = this.scene.add.image(this.x, this.y, "Explosion");
    explosion.setScale(0.7, 0.7);
    this.scene.container.add(explosion);

    this.scene.tweens.add({
      targets: explosion,
      scaleX: 1.4,
      scaleY: 1.4,
      yoyo: false,
      repeat: 0,
      ease: "Bounce.easeOut",
      duration: 500,
      onComplete: () => {
        this.scene.resetScene();
        this.scene.canExplore = false;
      },
    });
  }
}
