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

function create(this: Phaser.Scene): void {
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sky');
    
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    
    // Create game objects and logic here
}

function update(this: Phaser.Scene): void {
    // Game logic that runs every frame
    score += 1;
    scoreText.setText('Score: ' + score);
}