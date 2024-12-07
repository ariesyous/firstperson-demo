# 3D Room Explorer

A first-person 3D environment built with Three.js and React, allowing users to explore a virtual house with realistic lighting and physics.

## Features

- First-person camera controls (WASD movement)
- Mouse-look functionality
- Realistic lighting with shadows and bloom effects
- Collision detection
- Sprint functionality
- Responsive design
- Modern interior with living room and dining room areas

## Prerequisites

Before you begin, ensure you have the following installed on your Linux system:
- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 3d-room-explorer
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be available in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## Controls

- W - Move forward
- A - Move left
- S - Move backward
- D - Move right
- Mouse - Look around
- Shift - Sprint
- Click to start and capture mouse pointer

## Project Structure

```
src/
├── components/     # React components
├── controls/       # First-person controls implementation
├── effects/        # Post-processing effects
└── world/         # 3D world elements
    ├── furniture/ # Furniture models
    ├── materials/ # Material definitions
    └── structure/ # Room structure components
```

## Technical Details

- Built with Three.js for 3D rendering
- React for UI components
- TypeScript for type safety
- Vite for fast development and building
- Post-processing effects for enhanced visuals
- Tailwind CSS for styling

## Performance Considerations

- Optimized shadow maps
- Efficient bloom post-processing
- Collision detection boundaries
- Fixed time step for consistent physics
- Texture and material optimization

## License

MIT