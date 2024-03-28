export default class BaseTower extends Phaser.GameObjects.Container {
  randomChanceSequence = [90, 75, 60];
  randomQuoteSequence = [1.1, 1.33, 1.67];

  constructor(scene, x, y, texture) {
    super(scene, x, y);

    this.planet = new Phaser.GameObjects.Sprite(scene, 0, 0, texture);
    this.add(this.planet);

    this.scene = scene;

    this.getRandomChance();

    this.planet.setInteractive();

    this.planet.on("pointerup", () => {
      if(!scene.canExplore) return;
      let randomNumber = Phaser.Math.Between(0, 100);

      if (randomNumber > this.randomChance) {
        this.explorationFailed();
      } else {
        this.explorationSuccesfull();
      }
    });

    this.text = new Phaser.GameObjects.Text(
      scene,
      0,
      0 - 200,
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
  }

  explorationSuccesfull() {
    this.planet.setTexture("greenPlanet");

    this.scene.multyplier = this.scene.multyplier * this.randomQuote
    this.scene.multyplierText.text = `Multyplier: ${this.scene.multyplier}`

    this.scene.time.delayedCall(500, () => {
      this.scene.movePlanets(this.x, this.y);
    });
  }

  explorationFailed() {
    this.planet.setTexture("redPlanet");
    this.scene.resetScene();
  }
}
