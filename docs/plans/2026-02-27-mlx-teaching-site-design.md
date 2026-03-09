# MLX Teaching Website — Design Document

## Purpose

Interactive website for teaching MLX concepts (lazy evaluation, compile, distributed training) to colleagues. Replaces traditional slides with a streamable, tab-navigable web experience featuring live computation graph visualizations.

## Audience

Mixed group of programmers (ML engineers and software engineers). Light touch on fundamentals, then deep-dive into MLX specifics and hands-on project walkthrough.

## Tech Stack

- **React 18 + TypeScript** — component framework
- **Vite** — build tool / dev server
- **Tailwind CSS** — styling (dark theme)
- **React Flow** — computation graph visualization (nodes, edges, layout, animations)
- **Monaco Editor** (`@monaco-editor/react`) — code editor component
- **Framer Motion** — page transition animations
- **dagre** — automatic graph layout (top-down DAG)

## Content Structure (6 Tabs)

### Tab 1 — Fundamentals (~4 pages)
- GPU vs CPU compute model — parallelism
- Unified Memory Architecture — Apple Silicon shared CPU/GPU memory, zero-copy
- What "training" is at hardware level (forward → loss → backward → gradient update)

### Tab 2 — MLX Core Concepts (~6 pages)
- MLX philosophy: NumPy-like API, designed for Apple Silicon
- **Lazy Evaluation** — operations build a graph, nothing runs until needed. Interactive playground
- **`mx.eval()`** — triggers execution, collapses graph. Animated step-through
- **`mx.compile()`** — graph-level optimizations (fusion, memory planning). Before/after graph
- Unified memory in practice

### Tab 3 — Distributed MLX (~5 pages)
- Why distribute? Model size vs single machine memory
- MPI and ring topology — Thunderbolt networking
- `mlx.distributed.init()`, `all_sum`, `all_gather` primitives
- `mlx.distributed_config` — setting up the Thunderbolt ring
- `mlx.launch` — orchestrating multi-node execution

### Tab 4 — LoRA Fine-Tuning (~4 pages)
- What LoRA is (low-rank adaptation)
- `mlx_lm.convert` — HuggingFace → MLX format
- `mlx_lm.lora` — single device training
- Distributed LoRA — multi-node with gotchas

### Tab 5 — The Project (~4 pages)
- DistributedMacInference repo overview
- Three approaches tested: Llama.cpp RPC, Exo, MLX native
- What worked, what didn't (3 lora.py versions, DDP docs vs reality)
- Results and lessons learned

### Tab 6 — Reference (single scrollable page)
- Quick-reference commands
- Links to repos, docs, GitHub project

## Architecture

### Project Structure
```
MLX/
├── src/
│   ├── components/
│   │   ├── TabNav.tsx            # Top-level tab navigation
│   │   ├── SlideContainer.tsx    # Arrow-key page navigation within a tab
│   │   ├── CodeEditor.tsx        # Monaco wrapper
│   │   ├── GraphView.tsx         # React Flow wrapper
│   │   └── Playground.tsx        # Editor + Graph side-by-side
│   ├── content/
│   │   ├── fundamentals/         # Slide components for Tab 1
│   │   ├── mlx-core/             # Slide components for Tab 2
│   │   ├── distributed/          # Tab 3
│   │   ├── lora/                 # Tab 4
│   │   ├── project/              # Tab 5
│   │   └── reference/            # Tab 6
│   ├── parser/
│   │   ├── tokenizer.ts          # Tokenizes pseudo-MLX code
│   │   ├── graphBuilder.ts       # Converts parsed ops into React Flow nodes/edges
│   │   └── operations.ts         # Registry of known MLX ops and their signatures
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

### Navigation Model
- Top bar: 6 tabs (always visible, current tab highlighted)
- Within a tab: left/right arrow keys or click arrows to move between pages
- Page indicator dots at bottom
- `?` key shows keyboard shortcut overlay

### Slide Templates

**Template 1 — Explainer:** Title + body text (left ~50%) + diagram/visual (right ~50%)

**Template 2 — Playground:** Thin title bar, full-width split pane (Monaco Editor + React Flow graph), pre-loaded code examples

**Template 3 — Code Walkthrough:** Read-only Monaco (left) + step-by-step annotations (right) that highlight lines on click

## Interactive Playground

### Layout
Split-pane: Monaco Editor (left ~45%) + React Flow graph (right ~55%) with draggable divider.

### Parser Pipeline
1. **Tokenize** — regex-based line-by-line parsing, pattern matching on `mx.*` calls and variable assignments
2. **Build dependency graph** — each `mx.*` op becomes a node, variable references become edges
3. **Render in React Flow** — dagre layout for automatic top-down positioning

### Custom Node Types
- **Data node** (blue) — `mx.array()` literals, inputs
- **Op node** (purple) — `mx.add`, `mx.matmul`, `mx.multiply`, etc.
- **Eval node** (green, pulsing) — `mx.eval()` execution frontier
- **Compile node** (orange, dashed border) — `mx.compile()` subgraph grouping

### Interactive Behaviors
- **Live update** — graph re-renders on keystroke (debounced ~300ms)
- **Lazy eval demo** — nodes start grayed out, `mx.eval()` triggers animation lighting up nodes in execution order
- **Compile demo** — `mx.compile()` visually merges/fuses nodes
- **Hover** — hovering node highlights corresponding editor line and vice versa
- **Error handling** — unparseable lines get subtle red underline, no crashes

### Supported Operations
`mx.array`, `mx.add`, `mx.subtract`, `mx.multiply`, `mx.matmul`, `mx.reshape`, `mx.exp`, `mx.log`, `mx.sum`, `mx.mean`, `mx.compile`, `mx.eval`

## Styling
- Dark theme throughout
- Monospace for code, clean sans-serif for prose
- Framer Motion slide transitions (left/right)
- Accent colors match node types
- `F` key for fullscreen, `+`/`-` for font size toggle

## Deployment
- Static site via Vite build to `dist/`
- GitHub Pages from `gh-pages` branch
- No backend needed

## Reference to DistributedMacInference Project
- Tab 5 links to `github.com/Marcushadow/DistributedMacInference`
- Code Walkthrough slides use real snippets from repo
- Reference tab includes quick-link card

## Out of Scope
- No backend / API server
- No user accounts or progress tracking
- No live Python execution (graph is simulated)
- No mobile-responsive layout
- No export to PDF/slides
