import Phaser from 'phaser'
import Player from '../Prefabs/Player'

let player: Player

export default class Gameplay extends Phaser.Scene {
  animatedTiles: any

  preload() {
    this.load.scenePlugin({
      key: 'AnimatedTiles',
      url: 'plugins/AnimatedTiles.js',
      sceneKey: 'animatedTiles'
    })

    this.load.spritesheet('player', 'assets/images/characters/character_spritesheet.png', {
      frameWidth: 48,
      frameHeight: 48
    })

    this.load.image('grass', 'assets/images/Tilesets/Grass.png')
    this.load.image('water', 'assets/images/Tilesets/Water.png')
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json')
  }

  create() {
    this.cameras.main.zoom = 3

    var map = this.make.tilemap({ key: 'map' })
    var waterTiles = map.addTilesetImage('Water', 'water')
    map.createLayer('Water', waterTiles, 0, 0)
    var grassTiles = map.addTilesetImage('Grass', 'grass')
    map.createLayer('Grass', grassTiles, 0, 0)

    this.animatedTiles.init(map)

    player = this.add.existing(new Player(this, 100, 100))
    // player.setScale(2)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(player)
  }

  update(time: number, delta: number) {
    player.update(delta)
  }
}
