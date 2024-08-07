import Phaser from "phaser";

import HelloWorldScene from "./HelloWorldScene";
import TutorialScene from "./TutorialScene";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1080,
    height: 2160,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scene: [TutorialScene, HelloWorldScene],
};

export default new Phaser.Game(config);
