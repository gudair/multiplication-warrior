# Multiplication Warrior - Maze Adventure

## 🎮 Descripción
Juego educativo donde el jugador navega por laberintos generados proceduralmente y enfrenta enemigos resolviendo problemas de multiplicación. Desarrollado con Phaser.js.

## ✨ Características

### 🏃 Jugador
- **Animación de caminar**: 3 frames con movimiento natural de brazos y piernas
- **Sprite guerrero**: Con armadura, espada y animaciones fluidas
- **Controles**: Teclado (flechas) y controles táctiles móviles

### 🏰 Laberintos
- **Generación procedural**: Algoritmo de backtracking recursivo
- **Infinitos niveles**: Cada laberinto es único
- **Navegación fluida**: Sistema de colisiones optimizado

### 👹 Enemigos
- **4 tipos diferentes**: Bestia, Orco, Dragón, Esqueleto
- **Selección aleatoria**: Cada batalla presenta un enemigo aleatorio
- **Animaciones**: Respiración idle y ataques dinámicos

### ⚔️ Sistema de Batalla
- **Transiciones cinematográficas**: Efectos estilo Pokemon Red/Blue
- **Problemas matemáticos**: Multiplicaciones de 2-12
- **Animaciones de combate**: Ataques del jugador y enemigos
- **Sistema de vida**: Regeneración por victorias

### 📱 Compatibilidad Móvil
- **Controles táctiles**: Flechas direccionales y teclado numérico
- **Diseño responsive**: Escala automáticamente
- **Interfaz optimizada**: Para pantallas pequeñas

## 🏗️ Arquitectura del Código

### Estructura Principal
```
index.html          # Archivo principal con todas las clases
js/
├── MazeGenerator.js # Generador de laberintos
assets/
├── enemies/        # Sprites de enemigos (beast1-4.png)
└── warrior_spritesheet.png # Sprite sheet del guerrero
```

### Clases Principales
- **PreloadScene**: Carga de assets y creación de sprite sheets
- **IntroScene**: Pantalla de bienvenida
- **WorldScene**: Navegación por laberintos
- **BattleScene**: Sistema de combate matemático

### Configuración
```javascript
GAME_CONFIG = {
    PLAYER_MAX_HEALTH: 100,
    TILE_SIZE: 32,
    MAZE_WIDTH: 20,
    MAZE_HEIGHT: 13,
    MENU_HEIGHT: 60,
    ENCOUNTER_CHANCE: 3,
    ENCOUNTER_COOLDOWN: 2000
}
```

## 🎯 Características Técnicas

### Animaciones
- **Sprite sheets**: 3 frames por guerrero (idle, walk1, walk2)
- **Tweens**: Para movimientos suaves de enemigos
- **Transiciones**: Efectos visuales entre escenas

### Optimizaciones
- **Código refactorizado**: Eliminación de duplicaciones
- **Constantes centralizadas**: Fácil configuración
- **Funciones reutilizables**: Menos código redundante

### Compatibilidad
- **Móvil**: Controles táctiles y responsive design
- **Desktop**: Controles de teclado
- **Navegadores**: Chrome, Firefox, Safari, Edge

## 🚀 Uso

1. Abrir `index.html` en un navegador
2. Usar flechas del teclado o controles táctiles para moverse
3. Resolver multiplicaciones en las batallas
4. Completar laberintos para avanzar de nivel

## 📁 Archivos del Proyecto

### Archivos Principales
- `index.html` - Juego completo
- `js/MazeGenerator.js` - Generador de laberintos

### Assets
- `assets/enemies/beast1-4.png` - Sprites de enemigos
- `assets/warrior_spritesheet.png` - Sprite sheet del guerrero

### Herramientas de Desarrollo
- `create_warrior_spritesheet.html` - Generador de sprite sheets
- `create_enemy_assets.html` - Generador de enemigos

## 🔧 Personalización

### Modificar Dificultad
Editar `GAME_CONFIG` en `index.html`:
```javascript
ENCOUNTER_CHANCE: 5,        // Más encuentros
PLAYER_MAX_HEALTH: 150,     // Más vida
```

### Añadir Enemigos
1. Crear sprite en `assets/enemies/`
2. Añadir en `preload()` de PreloadScene
3. Actualizar array `enemyTypes` en BattleScene

### Cambiar Tamaño de Laberinto
```javascript
MAZE_WIDTH: 25,    // Más ancho
MAZE_HEIGHT: 15,   // Más alto
```

## 📈 Mejoras Futuras Posibles
- Más tipos de problemas matemáticos (suma, resta, división)
- Sistema de inventario y mejoras
- Múltiples mundos/temas
- Modo multijugador
- Sistema de puntuaciones

---
*Desarrollado con Phaser.js 3.55.2*