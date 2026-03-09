import { useState } from 'react'
import { TabNav } from './components/TabNav'
import { SlideContainer } from './components/SlideContainer'
import { ExplainerSlide } from './components/ExplainerSlide'
import { PlaygroundSlide } from './components/PlaygroundSlide'
import { WalkthroughSlide } from './components/WalkthroughSlide'
import type { TabConfig } from './types'

// Placeholder slide factory
const Placeholder = ({ label }: { label: string }) => () => (
  <div className="flex items-center justify-center h-full text-4xl text-gray-500">
    {label}
  </div>
)

// --- Demo slides for template verification ---

const FundamentalsExplainer = () => (
  <ExplainerSlide
    title="What is MLX?"
    content={
      <div>
        <p>
          MLX is an array framework for machine learning research on Apple silicon,
          brought to you by Apple machine learning research.
        </p>
        <p>
          It features a NumPy-like API, composable function transformations,
          lazy computation, and unified memory.
        </p>
      </div>
    }
    visual={
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <div className="w-32 h-32 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-3xl font-bold text-purple-300">
          MLX
        </div>
        <p className="text-sm text-gray-500">Visual placeholder</p>
      </div>
    }
  />
)

const MLXCorePlayground = () => (
  <PlaygroundSlide
    title="Try MLX Core"
    initialCode={`import mlx.core as mx

# Create arrays
a = mx.array([1, 2, 3, 4])
b = mx.array([5, 6, 7, 8])

# Element-wise operations
c = a + b
print(c)  # array([6, 8, 10, 12])

# Matrix multiplication
A = mx.random.normal((3, 4))
B = mx.random.normal((4, 2))
C = A @ B
print(C.shape)  # (3, 2)`}
  />
)

const DistributedWalkthrough = () => (
  <WalkthroughSlide
    title="Distributed Communication"
    code={`import mlx.core as mx
from mlx.core import distributed

# Initialize the distributed group
group = distributed.init()
rank = group.rank()
size = group.size()

# Create a local tensor
local = mx.ones((4,)) * rank

# All-reduce: sum across all ranks
result = distributed.all_sum(local)
print(f"Rank {rank}: {result}")

# All-gather: collect from all ranks
gathered = distributed.all_gather(local)
print(f"Rank {rank}: {gathered}")`}
    steps={[
      {
        lines: [1, 2],
        description: 'Import MLX core and the distributed module.',
      },
      {
        lines: [4, 6],
        description: 'Initialize the distributed group and get rank/size info for the current process.',
      },
      {
        lines: [8, 9],
        description: 'Create a local tensor unique to each rank (filled with the rank number).',
      },
      {
        lines: [11, 13],
        description: 'All-reduce sums the tensor across all ranks, so every process gets the total.',
      },
      {
        lines: [15, 17],
        description: 'All-gather collects each rank\'s tensor into a single combined tensor.',
      },
    ]}
  />
)

const tabs: TabConfig[] = [
  {
    id: 'fundamentals',
    label: 'Fundamentals',
    slides: [
      FundamentalsExplainer,
      Placeholder({ label: 'Fundamentals 2' }),
    ],
  },
  {
    id: 'mlx-core',
    label: 'MLX Core',
    slides: [MLXCorePlayground],
  },
  {
    id: 'distributed',
    label: 'Distributed',
    slides: [DistributedWalkthrough],
  },
  {
    id: 'lora',
    label: 'LoRA',
    slides: [Placeholder({ label: 'LoRA 1' })],
  },
  {
    id: 'project',
    label: 'The Project',
    slides: [Placeholder({ label: 'Project 1' })],
  },
  {
    id: 'reference',
    label: 'Reference',
    slides: [Placeholder({ label: 'Reference' })],
  },
]

function App() {
  const [activeTab, setActiveTab] = useState('fundamentals')
  const currentTab = tabs.find((t) => t.id === activeTab)!

  return (
    <div className="h-screen bg-gray-950 text-gray-100 flex flex-col">
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {/* pt-12 accounts for the fixed TabNav height */}
      <div className="flex-1 pt-12 relative">
        <SlideContainer slides={currentTab.slides} key={activeTab} />
      </div>
    </div>
  )
}

export default App
