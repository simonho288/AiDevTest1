import Phaser from 'phaser';
import skyImage from './static/sky.jpg';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

function preload(this: Phaser.Scene): void {
    this.load.image('sky', skyImage);
    // Add more assets here (e.g., player, enemies)
}

let score = 0;
let scoreText: Phaser.GameObjects.Text;
let helloText: Phaser.GameObjects.Text;
let background: Phaser.GameObjects.Image;

function create(this: Phaser.Scene): void {
    background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sky');
    
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#000' });
    
    // Add 'Hello, world' text to the center of the screen
    helloText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Hello, world', {
        fontSize: '48px',
        color: '#fff',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    // Create game objects and logic here

    // Listen for resize events and reposition objects
    this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
        const width = gameSize.width;
        const height = gameSize.height;
        background.setPosition(width / 2, height / 2);
        helloText.setPosition(width / 2, height / 2);
    });
}

function update(this: Phaser.Scene): void {
    // Game logic that runs every frame
    score += 1;
    scoreText.setText('Score: ' + score);
}