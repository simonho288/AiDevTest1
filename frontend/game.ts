import Phaser from 'phaser';
import skyImage from './static/sky.jpg';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload(this: Phaser.Scene): void {
    this.load.image('sky', skyImage);
    // Add more assets here (e.g., player, enemies)
}

function create(this: Phaser.Scene): void {
    this.add.image(400, 300, 'sky');
    // Create game objects and logic here
}

function update(this: Phaser.Scene): void {
    // Game logic that runs every frame
}