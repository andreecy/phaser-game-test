import Phaser from 'phaser'
import Gameplay from './Scenes/Gameplay'
import './style.css'

let config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.CENTER_BOTH,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 480,
  height: 720,
  pixelArt: true,
  scene: [Gameplay]
}

const game = new Phaser.Game(config)
