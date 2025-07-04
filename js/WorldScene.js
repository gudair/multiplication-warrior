class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        // Initialize game state
        this.playerMaxHealth = 100;
        this.playerHealth = this.playerMaxHealth;
        this.monstersKilled = 0;
        this.mazesCompleted = 0;
        this.encounterCooldown = 0;

        // Maze properties
        this.tileSize = 32;
        this.mazeWidth = 20;
        this.mazeHeight = 15;

        // Generate first maze
        this.generateNewMaze();
        this.createUI();
        this.setupControls();
    }

    generateNewMaze() {
        const generator = new MazeGenerator(this.mazeWidth, this.mazeHeight);
        this.maze = generator.generate();
        this.createDungeonBackground();
        this.createPlayer();
    }

    createDungeonBackground() {
        const { width, height } = this.scale;

        // Clear previous background
        this.children.removeAll();

        // Very dark dungeon background
        this.add.rectangle(width / 2, height / 2, width, height, 0x1A1A1A);

        // Create walls group for collision
        if (this.walls) {
            this.walls.destroy();
        }
        this.walls = this.physics.add.staticGroup();

        // Draw maze (offset by menu height)
        const menuOffset = 60;
        for (let y = 0; y < this.mazeHeight; y++) {
            for (let x = 0; x < this.mazeWidth; x++) {
                const pixelX = x * this.tileSize;
                const pixelY = y * this.tileSize + menuOffset;

                if (this.maze[y][x] === 1) {
                    // Wall tile
                    const wall = this.add.rectangle(
                        pixelX + this.tileSize/2, 
                        pixelY + this.tileSize/2, 
                        this.tileSize, 
                        this.tileSize, 
                        0x654321
                    );
                    wall.setStrokeStyle(2, 0x8B4513);
                    this.walls.add(wall);
                } else {
                    // Floor tile
                    this.add.rectangle(
                        pixelX + this.tileSize/2, 
                        pixelY + this.tileSize/2, 
                        this.tileSize, 
                        this.tileSize, 
                        0x8B7355
                    );
                }
            }
        }

        // Add entrance marker (green)
        this.add.rectangle(this.tileSize/2, this.tileSize + this.tileSize/2 + menuOffset, this.tileSize, this.tileSize, 0x00FF00);

        // Add exit marker (red)
        const exitX = (this.mazeWidth - 1) * this.tileSize + this.tileSize/2;
        const exitY = (this.mazeHeight - 2) * this.tileSize + this.tileSize/2 + menuOffset;
        this.exitZone = this.add.rectangle(exitX, exitY, this.tileSize, this.tileSize, 0xFF0000);

    }

    createPlayer() {
        // Remove existing player if any
        if (this.player) {
            this.player.destroy();
        }

        // Place player at entrance (offset by menu height)
        const menuOffset = 60;
        this.player = this.physics.add.sprite(this.tileSize/2, this.tileSize + this.tileSize/2 + menuOffset, 'player');
        this.player.setCollideWorldBounds(true);

        // Add collision between player and walls
        this.physics.add.collider(this.player, this.walls);
    }

    createUI() {
        this.createTopMenu();
        this.updateUI();
    }

    createTopMenu() {
        const { width } = this.scale;
        const menuHeight = 60;
        
        // Retro brick-style background
        this.add.rectangle(width / 2, menuHeight / 2, width, menuHeight, 0x8B4513);
        
        // Brick pattern for retro look
        const brickWidth = 32;
        const brickHeight = 16;
        
        for (let y = 0; y < Math.ceil(menuHeight / brickHeight); y++) {
            for (let x = 0; x < Math.ceil(width / brickWidth); x++) {
                const offsetX = (y % 2) * (brickWidth / 2);
                const brickX = x * brickWidth + offsetX;
                const brickY = y * brickHeight;
                
                if (brickX < width && brickY < menuHeight) {
                    // Brick with subtle variation
                    const brickColor = Phaser.Utils.Array.GetRandom([0xA0522D, 0x8B4513, 0x654321]);
                    this.add.rectangle(brickX + brickWidth/2, brickY + brickHeight/2, brickWidth - 2, brickHeight - 1, brickColor);
                    
                    // Mortar lines
                    this.add.rectangle(brickX + brickWidth/2, brickY + brickHeight/2, brickWidth - 2, 1, 0x2F2F2F);
                    this.add.rectangle(brickX + brickWidth/2, brickY + brickHeight/2, 1, brickHeight - 1, 0x2F2F2F);
                }
            }
        }
        
        // Bottom border
        this.add.rectangle(width / 2, menuHeight - 2, width, 4, 0x2F2F2F);
        
        // Create panels for each stat
        this.createStatPanel(80, menuHeight / 2, 140, 40, 'HP');
        this.createStatPanel(260, menuHeight / 2, 140, 40, 'MONSTRUOS');
        this.createStatPanel(440, menuHeight / 2, 140, 40, 'LABERINTOS');
        
        // Health bar in first panel
        this.healthBarBg = this.add.rectangle(80, menuHeight / 2 + 8, 102, 8, 0x000000);
        this.healthBar = this.add.rectangle(80, menuHeight / 2 + 8, 100, 6, 0x00FF00);
        
        // Text elements
        this.healthText = this.add.text(80, menuHeight / 2 - 10, `${this.playerHealth}/${this.playerMaxHealth}`, {
            fontSize: '14px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        this.killCountText = this.add.text(260, menuHeight / 2, `${this.monstersKilled}`, {
            fontSize: '18px',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        this.mazeCountText = this.add.text(440, menuHeight / 2, `${this.mazesCompleted}`, {
            fontSize: '18px',
            color: '#00ffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
    }
    
    createStatPanel(x, y, width, height, label) {
        // Panel background
        this.add.rectangle(x, y, width, height, 0x654321, 0.8);
        this.add.rectangle(x, y, width - 4, height - 4, 0x2F2F2F, 0.6);
        
        // Panel border (retro 3D effect)
        this.add.rectangle(x, y - height/2 + 1, width, 2, 0xD2B48C); // Top highlight
        this.add.rectangle(x - width/2 + 1, y, 2, height, 0xD2B48C); // Left highlight
        this.add.rectangle(x, y + height/2 - 1, width, 2, 0x1F1F1F); // Bottom shadow
        this.add.rectangle(x + width/2 - 1, y, 2, height, 0x1F1F1F); // Right shadow
        
        // Label
        this.add.text(x, y - 15, label, {
            fontSize: '10px',
            color: '#D2B48C',
            stroke: '#000000',
            strokeThickness: 1
        }).setOrigin(0.5);
    }

    setupControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    updateUI() {
        const healthPercent = this.playerHealth / this.playerMaxHealth;
        this.healthBar.width = 100 * healthPercent;
        this.healthBar.fillColor = healthPercent > 0.5 ? 0x00FF00 : (healthPercent > 0.25 ? 0xFFFF00 : 0xFF0000);
        this.healthText.setText(`${this.playerHealth}/${this.playerMaxHealth}`);
        this.killCountText.setText(`${this.monstersKilled}`);
        this.mazeCountText.setText(`${this.mazesCompleted}`);
    }

    update(time, delta) {
        const speed = 100;
        let isMoving = false;

        this.player.setVelocity(0);
        
        // Movement with boundary checks (accounting for menu offset)
        const menuOffset = 60;
        if (this.cursors.left.isDown && this.player.x > 16) {
            this.player.setVelocityX(-speed);
            isMoving = true;
        } else if (this.cursors.right.isDown && this.player.x < 624) {
            this.player.setVelocityX(speed);
            isMoving = true;
        }
        if (this.cursors.up.isDown && this.player.y > 16 + menuOffset) {
            this.player.setVelocityY(-speed);
            isMoving = true;
        } else if (this.cursors.down.isDown && this.player.y < 464) {
            this.player.setVelocityY(speed);
            isMoving = true;
        }

        // Check if player reached exit
        const exitX = (this.mazeWidth - 1) * this.tileSize;
        const exitY = (this.mazeHeight - 2) * this.tileSize + menuOffset;

        if (Phaser.Geom.Rectangle.Contains(
            new Phaser.Geom.Rectangle(exitX, exitY, this.tileSize, this.tileSize),
            this.player.x, this.player.y
        )) {
            this.mazesCompleted++;
            this.generateNewMaze();
            this.createUI(); // Recreate UI after clearing children
        }

        // Random encounters when moving
        if (isMoving && this.encounterCooldown <= 0 && Phaser.Math.Between(0, 1000) < 3) {
            this.encounterCooldown = 2000;
            this.scene.pause();
            this.scene.launch('BattleScene');
        }
        this.encounterCooldown -= delta;
    }
}