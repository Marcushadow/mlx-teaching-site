import { useState } from 'react'
import { TabNav } from './components/TabNav'
import { SlideContainer } from './components/SlideContainer'
import type { TabConfig } from './types'

// Tab 1 — Fundamentals
import { GpuVsCpu, UnifiedMemory, WhatIsTraining } from './content/fundamentals'

// Tab 2 — MLX Core Concepts
import { Philosophy, LazyEval, MxEval, MxCompile, UnifiedMemoryPractice } from './content/mlx-core'

// Tab 3 — Distributed MLX
import { WhyDistribute, MpiRing, Primitives, DistributedConfig, MlxLaunch } from './content/distributed'

// Tab 4 — LoRA Fine-Tuning
import { WhatIsLora, MlxConvert, SingleDevice, DistributedLora } from './content/lora'

// Tab 5 — The Project
import { Overview, ThreeApproaches, WhatWorked, Lessons } from './content/project'

// Tab 6 — Reference
import { ReferencePage } from './content/reference'

const tabs: TabConfig[] = [
  {
    id: 'fundamentals',
    label: 'Fundamentals',
    slides: [GpuVsCpu, UnifiedMemory, WhatIsTraining],
  },
  {
    id: 'mlx-core',
    label: 'MLX Core',
    slides: [Philosophy, LazyEval, MxEval, MxCompile, UnifiedMemoryPractice],
  },
  {
    id: 'distributed',
    label: 'Distributed',
    slides: [WhyDistribute, MpiRing, Primitives, DistributedConfig, MlxLaunch],
  },
  {
    id: 'lora',
    label: 'LoRA',
    slides: [WhatIsLora, MlxConvert, SingleDevice, DistributedLora],
  },
  {
    id: 'project',
    label: 'The Project',
    slides: [Overview, ThreeApproaches, WhatWorked, Lessons],
  },
  {
    id: 'reference',
    label: 'Reference',
    slides: [ReferencePage],
  },
]

function App() {
  const [activeTab, setActiveTab] = useState('fundamentals')
  const currentTab = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  return (
    <div className="h-screen bg-gray-950 text-gray-100 flex flex-col">
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 pt-12 relative">
        <SlideContainer slides={currentTab.slides} key={activeTab} />
      </div>
    </div>
  )
}

export default App
