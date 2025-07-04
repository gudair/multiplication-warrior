class MazeGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.maze = [];
    }

    generate() {
        // Initialize maze with walls
        this.maze = [];
        for (let y = 0; y < this.height; y++) {
            this.maze[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.maze[y][x] = 1; // 1 = wall, 0 = path
            }
        }

        // Simple maze generation using recursive backtracking
        const stack = [];
        const startX = 1;
        const startY = 1;

        this.maze[startY][startX] = 0;
        stack.push({ x: startX, y: startY });

        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            const neighbors = this.getUnvisitedNeighbors(current.x, current.y);

            if (neighbors.length > 0) {
                const next = Phaser.Utils.Array.GetRandom(neighbors);

                // Remove wall between current and next
                const wallX = current.x + (next.x - current.x) / 2;
                const wallY = current.y + (next.y - current.y) / 2;

                this.maze[next.y][next.x] = 0;
                this.maze[wallY][wallX] = 0;

                stack.push(next);
            } else {
                stack.pop();
            }
        }

        // Ensure entrance and exit
        this.maze[1][0] = 0; // Entrance on left
        this.maze[this.height - 2][this.width - 1] = 0; // Exit on right

        // Create path to entrance and exit
        this.maze[1][1] = 0;
        this.maze[this.height - 2][this.width - 2] = 0;

        return this.maze;
    }

    getUnvisitedNeighbors(x, y) {
        const neighbors = [];
        const directions = [
            { x: 0, y: -2 }, // Up
            { x: 2, y: 0 },  // Right
            { x: 0, y: 2 },  // Down
            { x: -2, y: 0 }  // Left
        ];

        for (const dir of directions) {
            const newX = x + dir.x;
            const newY = y + dir.y;

            if (newX >= 1 && newX < this.width - 1 && 
                newY >= 1 && newY < this.height - 1 && 
                this.maze[newY][newX] === 1) {
                neighbors.push({ x: newX, y: newY });
            }
        }

        return neighbors;
    }
}