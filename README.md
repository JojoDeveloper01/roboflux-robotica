# RoboFlux — Reactive AGV Path Planning

RoboFlux is an educational web project about **Robotics and Industrial Automation**.  
It simulates how an industrial AGV — Automated Guided Vehicle — can calculate a safe route through a factory floor while avoiding obstacles.

Live site: <https://roboflux-robotica.pages.dev/>  
Final report: <https://roboflux-robotica.pages.dev/relatorio.pdf>

## Project goal

The goal of this project is to connect programming fundamentals with a realistic industrial automation problem.

Instead of building a static page only for presentation, RoboFlux demonstrates an actual algorithm: the **A\*** pathfinding algorithm. The user can generate a new map, run the algorithm, and watch how the system searches for a valid route between the AGV start point and its destination.

This makes the project useful for explaining:

- variables and data structures;
- conditionals;
- loops;
- functions;
- DOM manipulation;
- algorithmic thinking;
- the relationship between programming and industrial robotics.

## Why this matters in robotics

In a real factory, the environment is not always fixed.

An AGV may need to avoid:

- machines;
- pallets;
- people;
- temporary blocked areas;
- unsafe zones;
- other vehicles.

Because of that, the robot should not simply “memorize” one path. It needs a way to calculate or recalculate a route depending on the current situation.

RoboFlux represents this idea with a grid map. Some cells are free, some cells are obstacles, and the AGV must find a path from the start cell to the destination cell.

## Main feature: A\* pathfinding

The project uses the **A\*** algorithm to find a route.

A\* works by combining two ideas:

- **g** — the real cost already travelled;
- **h** — an estimated distance to the destination.

The algorithm uses the formula:

```txt
f = g + h
```

The cell with the lowest `f` value is considered the most promising one to explore next.

In simple terms: the AGV looks at possible next steps, avoids walls, and chooses the option that seems to move it closer to the destination without ignoring the distance already travelled.

## Random map generation

The map can be generated randomly, but not blindly.

When the user clicks **Generate new map**, the system:

1. creates random obstacles;
2. checks if there is still a possible route;
3. accepts the map only if the AGV can reach the destination.

This avoids broken simulations where the start and destination are completely disconnected.

So the project is dynamic, but still controlled.

## Technologies used

- **Astro** — used to organize the page into reusable components.
- **HTML** — used for the structure of the page.
- **CSS** — used for custom styling, animations, and grid cell states.
- **Tailwind CSS** — used for layout, spacing, colors, and responsive design.
- **JavaScript / TypeScript** — used for the algorithm, DOM updates, and user interaction.
- **GitHub** — used to store the project source code.
- **Cloudflare Pages** — used to deploy the website automatically after each push.

## Code organization

The project is organized by responsibility:

```txt
src/
├── components/
│   ├── AGVPathfinder.astro
│   ├── ConceptCards.astro
│   ├── ConclusionCTA.astro
│   └── Hero.astro
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   └── pathfinding.ts
├── pages/
│   └── index.astro
└── styles/
    └── global.css
```

The most important separation is this:

- `AGVPathfinder.astro` handles the interface, buttons, grid rendering, and animation.
- `pathfinding.ts` contains the algorithm logic.

This separation makes the project easier to explain, test, and maintain.

## How the simulation works

1. The page shows a 10x10 grid.
2. The green cell represents the AGV starting point.
3. The copper-colored cell represents the destination.
4. Dark cells represent obstacles.
5. The user can generate a new valid map.
6. The user can run the A\* algorithm.
7. The interface shows analysed cells and the final route.

## How to run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The project is connected to Cloudflare Pages.

Every push to the main GitHub branch triggers a new deployment automatically.

Live URL:

<https://roboflux-robotica.pages.dev/>

## Conclusion

RoboFlux is a small but practical demonstration of how programming can solve a real problem from robotics and industrial automation.

It is not only a visual website. It shows a working algorithm, explains its purpose, and connects programming concepts with a professional context.

