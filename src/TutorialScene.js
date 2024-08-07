import Phaser from "phaser";

export default class TutorialScene extends Phaser.Scene {
  constructor() {
    super("tutorial");
  }

  globalScale = 0.5;

  preload() {
    this.loadFont("troika", "Assets/Fonts/troika.otf");

    // this.load.baseURL = "Assets/";

    this.load.image("BG", "pictures/BG.png");
    this.load.image("brownPlanet", "pictures/brownPlanet.png");
    this.load.image("greenPlanet", "pictures/greenPlanet.png");
    this.load.image("redPlanet", "pictures/redPlanet.png");
    this.load.image("Planet1", "pictures/Planet1.png");
    this.load.image("Planet2", "pictures/Planet2.png");
    this.load.image("Planet3", "pictures/Planet3.png");
    this.load.image("Planet4", "pictures/Planet4.png");
    this.load.image("Rocket", "pictures/RocketV2.png");
    this.load.image("Explosion", "pictures/Explosion.png");
    this.load.image("Check", "pictures/Check.png");
    this.load.image("StartButton", "pictures/StartButton.png");
    this.load.image("ClaimButton", "pictures/ClaimButton.png");
    this.load.image("IncreaseBet", "pictures/Plus.png");
    this.load.image("DecreaseBet", "pictures/Minus.png");
    this.load.image("shadow", "pictures/shadow.png");
  }

  create() {
    this.add.image(0, 0, "BG").setOrigin(0, 0).setScale(1.2, 1.45);

    this.createFirstSlide();
  }

  createFirstSlide() {
    this.planet1 = this.add.image(240, 750, "Planet1").setScale(0.5, 0.5);
    this.planet2 = this.add.image(540, 750, "Planet2").setScale(0.5, 0.5);
    this.planet3 = this.add.image(840, 750, "Planet3").setScale(0.5, 0.5);

    this.rocket = this.add.image(540, 1500, "Rocket");

    this.shadow = this.add.image(0, 0, "shadow").setOrigin(0, 0);

    this.startExplorationButton = this.add
      .image(540, 1900, "StartButton")
      .setInteractive();

    this.startExplorationButton.once("pointerdown", () => {
      this.createSecondSlide();
    });

    this.startExplorationButtonAnimation = this.tweens.add({
      targets: this.startExplorationButton,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.firstTutorialScreenText = this.add
      .text(540, 400, "Click the button\nto start the mission.", {
        fontSize: "80px",
        fontFamily: "troika",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }

  createSecondSlide() {
    this.firstTutorialScreenText.destroy();

    this.startExplorationButtonAnimation.stop();

    this.startExplorationButton.setScale(1, 1);

    this.planet1.destroy();
    this.planet2.destroy();
    this.planet3.destroy();

    this.shadow.destroy();

    this.shadow = this.add.image(0, 0, "shadow").setOrigin(0, 0);

    this.planet1 = this.add
      .image(240, 750, "Planet1")
      .setScale(0.5, 0.5)
      .setInteractive()
      .once("pointerdown", () => {
        this.createThirdSlide();
      });
    this.planet2 = this.add
      .image(540, 750, "Planet2")
      .setScale(0.5, 0.5)
      .setInteractive()
      .once("pointerdown", () => {
        this.createThirdSlide();
      });
    this.planet3 = this.add
      .image(840, 750, "Planet3")
      .setScale(0.5, 0.5)
      .setInteractive()
      .once("pointerdown", () => {
        this.createThirdSlide();
      });

    this.planet1Animation = this.tweens.add({
      targets: this.planet1,
      scaleX: 0.55,
      scaleY: 0.55,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.planet2Animation = this.tweens.add({
      targets: this.planet2,
      scaleX: 0.55,
      scaleY: 0.55,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.planet3Animation = this.tweens.add({
      targets: this.planet3,
      scaleX: 0.55,
      scaleY: 0.55,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.secondTutorialScreenText = this.add
      .text(540, 400, "Choose the planet\nyou want to explore.", {
        fontSize: "80px",
        fontFamily: "troika",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }

  createThirdSlide() {
    this.secondTutorialScreenText.destroy();

    this.planet1Animation.stop();
    this.planet1.setScale(0.5, 0.5);
    this.planet2Animation.stop();
    this.planet2.setScale(0.5, 0.5);
    this.planet3Animation.stop();
    this.planet3.setScale(0.5, 0.5);

    this.shadow.destroy();
    this.shadow = this.add
      .image(0, 0, "shadow")
      .setOrigin(0, 0)
      .setInteractive()
      .once("pointerdown", () => {
        this.createFourthSlide();
      });

    this.planet1Text = this.add
      .text(240, 570, "MULTIPLYER:\nX1.1", {
        fontSize: "40px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.planet1TextAnimation = this.tweens.add({
      targets: this.planet1Text,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.planet1ChanceText = this.add
      .text(240, 930, "CHANCE:\n60%", {
        fontSize: "40px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.planet1ChanceTextAnimation = this.tweens.add({
      targets: this.planet1ChanceText,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.planet2Text = this.add
      .text(540, 570, "MULTIPLYER:\nX1.33", {
        fontSize: "40px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.planet2TextAnimation = this.tweens.add({
      targets: this.planet2Text,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.planet2ChanceText = this.add
      .text(540, 930, "CHANCE:\n75%", {
        fontSize: "40px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.planet2ChanceTextAnimation = this.tweens.add({
      targets: this.planet2ChanceText,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.planet3Text = this.add
      .text(840, 570, "MULTIPLYER:\nX1.67", {
        fontSize: "40px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.planet3TextAnimation = this.tweens.add({
      targets: this.planet3Text,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.planet3ChanceText = this.add
      .text(840, 930, "CHANCE:\n60%", {
        fontSize: "40px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.planet3ChanceTextAnimation = this.tweens.add({
      targets: this.planet3ChanceText,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.thirdTutorialScreenText = this.add
      .text(
        540,
        300,
        "See your chances\n of successfully exploring\n the planet and the multiplier\n you'll receive upon success.",
        {
          fontSize: "80px",
          fontFamily: "troika",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
  }

  createFourthSlide() {
    this.thirdTutorialScreenText.destroy();

    this.planet1Text.destroy();
    this.planet1ChanceText.destroy();
    this.planet2Text.destroy();
    this.planet2ChanceText.destroy();
    this.planet3Text.destroy();
    this.planet3ChanceText.destroy();

    this.collectText = this.add
      .text(540, 1750, `COLLECT: 17`, {
        fontSize: "65px",
        strokeThickness: 1,
        stroke: "#ffffff",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.collectTextAnimation = this.tweens.add({
      targets: this.collectText,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.shadow.once("pointerdown", () => {
      this.createFifthSlide();
    });

    this.fourthTutorialScreenText = this.add
      .text(540, 400, "The more planets you explore,\nthe bigger the reward.", {
        fontSize: "80px",
        fontFamily: "troika",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }

  createFifthSlide() {
    this.fourthTutorialScreenText.destroy();
    this.collectText.destroy();

    this.collectButton = this.add
      .image(540, 1900, "ClaimButton")
      .setInteractive();

    this.collectButtonAnimation = this.tweens.add({
      targets: this.collectButton,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 400,
    });

    this.collectButton.once("pointerdown", () => {
      this.createSixthSlide();
    });

    this.fifthTutorialScreenText = this.add
      .text(540, 400, "Press Claim button\nto claim your reward.", {
        fontSize: "80px",
        fontFamily: "troika",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }

  createSixthSlide() {
    this.fifthTutorialScreenText.destroy();
    this.collectButton.destroy();

    this.shadow.once("pointerdown", () => {
      this.scene.start("hello-world");
    });

    this.sixthTutorialScreenText = this.add
      .text(540, 400, "Good luck!", {
        fontSize: "80px",
        fontFamily: "troika",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }

  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loaded) {
        document.fonts.add(loaded);
      })
      .catch(function (error) {
        return error;
      });
  }
}
