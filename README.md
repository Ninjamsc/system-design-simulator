# System Design Simulator
React + TypeScript + Vite + React Flow (@xyflow/react).

    npm install
    npm run dev       # http://localhost:5173
    npm run build
    npm run typecheck

## Structure (`src/`)
| Package | Purpose |
|---|---|
| `assets/` | Palette (load colours), node icons and per-type visual identity, favicon |
| `client/` | React Flow adapter: canvas props, link creation, placement of new nodes |
| `components/` | UI: `sidebar/`, `canvas/`, `nodes/`, `edges/`, `panel/` (config forms + field widgets), `Header` |
| `hooks/` | `useAppStore` (composition), `useGraphActions`, `useHistory`, `useSimulation`, `useSelection`, `useConnectMode`, `useKeyboardShortcuts` |
| `models/` | Types (`NData`, `EdgeData`, `Graph`, `Sim`) and node defaults |
| `services/` | Pure logic: `traffic`, `latency`, `simulation`, `presentation`, `history`, `clipboard`, `nodeFactory`, `initialGraph` |
| `store/` | `AppStoreProvider` / `useStore` — React context exposing the app store |
| `styles/` | CSS split by area, aggregated in `index.css` |
| `utils/` | Small helpers: ids, formatting, math, load colours, graph accessors, DOM |

`@/` is an alias for `src/`.

## Projects
`Save Project` (or Ctrl+S) writes the diagram to a `.json` file (a save-as dialog where the browser supports it, otherwise a normal download). `Import Project` loads such a file; it is validated and the import can be undone with Ctrl+Z.
