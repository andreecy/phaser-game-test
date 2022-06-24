import Phaser from 'phaser'

const { Vector2 } = Phaser.Math

let upKey: any
let downKey: any
let leftKey: any
let rightKey: any

const speedScale = 0.01

enum PlayerState {
  Idle,
  Walk
}

export default class Player extends Phaser.GameObjects.Sprite {
  speed: number = 10

  state: PlayerState = PlayerState.Idle
  movement: Phaser.Math.Vector2 = new Vector2(0, 0)
  facing: Phaser.Math.Vector2 = new Vector2(0, 0)

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string = 'player',
    frame: string | number = 0
  ) {
    super(scene, x, y, 'player', '__BASE')
    this.setOrigin(0, 0)
    this.setPosition(x, y)

    const playerAnimations = [
      {
        key: 'down-idle',
        frames: [0, 1],
        frameRate: 2,
        repeat: -1
      },
      {
        key: 'down-walk',
        frames: [2, 3],
        frameRate: 4,
        repeat: -1
      },
      {
        key: 'up-idle',
        frames: [4, 5],
        frameRate: 2,
        repeat: -1
      },
      {
        key: 'up-walk',
        frames: [6, 7],
        frameRate: 4,
        repeat: -1
      },
      {
        key: 'left-idle',
        frames: [8, 9],
        frameRate: 2,
        repeat: -1
      },
      {
        key: 'left-walk',
        frames: [10, 11],
        frameRate: 4,
        repeat: -1
      },
      {
        key: 'right-idle',
        frames: [12, 13],
        frameRate: 2,
        repeat: -1
      },
      {
        key: 'right-walk',
        frames: [14, 15],
        frameRate: 4,
        repeat: -1
      }
    ]

    playerAnimations.forEach((anim) => {
      this.anims.create({
        key: anim.key,
        frames: this.anims.generateFrameNumbers('player', { frames: anim.frames }),
        frameRate: anim.frameRate,
        repeat: anim.repeat
      })
    })

    this.play('down-idle')

    upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  update(delta: number) {
    let inputMovement = new Vector2(0, 0)
    if (upKey.isDown) {
      inputMovement.y -= 1
    }
    if (downKey.isDown) {
      inputMovement.y += 1
    }
    if (leftKey.isDown) {
      inputMovement.x -= 1
    }
    if (rightKey.isDown) {
      inputMovement.x += 1
    }
    inputMovement = inputMovement.normalize()
    this.movement.x = inputMovement.x * this.speed * delta * speedScale
    this.movement.y = inputMovement.y * this.speed * delta * speedScale

    if (this.movement.x != 0 || this.movement.y != 0) {
      this.state = PlayerState.Walk
      this.facing = inputMovement
    } else {
      this.state = PlayerState.Idle
    }

    this.setPosition(this.x + this.movement.x, this.y + this.movement.y)
    this.handleAnim()
  }

  handleAnim() {
    if (this.state == PlayerState.Idle) {
      if (this.facing.x > 0) {
        if (this.anims.currentAnim.key != 'right-idle') this.play('right-idle')
      } else if (this.facing.x < 0) {
        if (this.anims.currentAnim.key != 'left-idle') this.play('left-idle')
      } else if (this.facing.y > 0) {
        if (this.anims.currentAnim.key != 'down-idle') this.play('down-idle')
      } else if (this.facing.y < 0) {
        if (this.anims.currentAnim.key != 'up-idle') this.play('up-idle')
      }
    } else if (this.state == PlayerState.Walk) {
      if (this.facing.x > 0) {
        if (this.anims.currentAnim.key != 'right-walk') this.play('right-walk')
      } else if (this.facing.x < 0) {
        if (this.anims.currentAnim.key != 'left-walk') this.play('left-walk')
      } else if (this.facing.y > 0) {
        if (this.anims.currentAnim.key != 'down-walk') this.play('down-walk')
      } else if (this.facing.y < 0) {
        if (this.anims.currentAnim.key != 'up-walk') this.play('up-walk')
      }
    }
  }
}
