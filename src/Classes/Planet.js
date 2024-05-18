import { Tweens } from "phaser";

export default class Planet extends Phaser.GameObjects.Container {
  randomChanceSequence = [90, 75, 60];
  randomQuoteSequence = [1.1, 1.33, 1.67];
  randomTextureSequence = ["Planet1", "Planet2", "Planet3"]

  constructor(scene, x, y, texture) {
    super(scene, x, y);

    this.planet = new Phaser.GameObjects.Sprite(scene, 0, 0, texture).setScale(0.5, 0.5);
    this.add(this.planet);

    this.scene = scene;

    this.getRandomChance();

    this.planet.setInteractive();

    this.planet.on("pointerup", () => {
      if(!scene.canExplore) return;
      let randomNumber = Phaser.Math.Between(0, 100);

      if (randomNumber > this.randomChance) {
        this.startFailedExploration()
      } else {
        this.startSuccessfulExploration()
      }
    });

    this.text = new Phaser.GameObjects.Text(
      scene,
      0,
      200,
      `${this.randomChance}%\n\nX${this.randomQuote}`,
      {
        fontSize: "40px",
        strokeThickness: 2,
        stroke: "#ffffff",
        align: "center",
      }
    ).setOrigin(0.5, 0.5);
    this.add(this.text);
  }

  getRandomChance() {
    let randomIndex = Phaser.Math.Between(0, 2);
    this.randomChance = this.randomChanceSequence[randomIndex];
    this.randomQuote = this.randomQuoteSequence[randomIndex];
    this.planet.setTexture(this.randomTextureSequence[randomIndex]);
    // this.planet.setTint(0x0000ff)
  }

  startSuccessfulExploration() {
    this.scene.tweens.add({
      targets: this.scene.rocket,
      x: this.x,
      y: this.y - 250,
      yoyo: false,
      repeat: 0,
      ease: "Sine.easeOut",
      duration: 1000,
      onComplete: () => {
        this.explorationSuccesfull()
      },
    });
  }

  startFailedExploration() {
    this.scene.tweens.add({
      targets: this.scene.rocket,
      x: this.x,
      y: this.y - 250,
      yoyo: false,
      repeat: 0,
      ease: "Sine.easeOut",
      duration: 1000,
      onComplete: () => {
        this.explorationFailed()
      },
    });
  }

  explorationSuccesfull() {

    this.scene.multyplier = this.scene.multyplier * this.randomQuote
    this.scene.multyplierText.text = `Multyplier: ${this.scene.multyplier}`

    this.check = this.scene.add.image(this.x, this.y, "Check")
    this.check.setScale(0.5, 0.5)
    this.scene.container.add(this.check)

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

          this.check.destroy()
          this.scene.movePlanets(this.x, this.y);
        })
      },
    });

  }

  explorationFailed() {

    
    let explosion = this.scene.add.image(this.x, this.y, "Explosion")
    explosion.setScale(0.7, 0.7)
    this.scene.container.add(explosion)

    this.scene.tweens.add({
      targets: explosion,
      scaleX: 1.2,
      scaleY: 1.2,
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