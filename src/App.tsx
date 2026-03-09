import { useState } from 'react'
import { TabNav } from './components/TabNav'
import { SlideContainer } from './components/SlideContainer'
import type { TabConfig } from './types'

// Placeholder slide factory
const Placeholder = ({ label }: { label: string }) => () => (
  <div className="flex items-center justify-center h-full text-4xl text-gray-500">
    {label}
  </div>
)

const tabs: TabConfig[] = [
  {
    id: 'fundamentals',
    label: 'Fundamentals',
    slides: [
      Placeholder({ label: 'Fundamentals 1' }),
      Placeholder({ label: 'Fundamentals 2' }),
    ],
  },
  {
    id: 'mlx-core',
    label: 'MLX Core',
    slides: [Placeholder({ label: 'MLX Core 1' })],
  },
  {
    id: 'distributed',
    label: 'Distributed',
    slides: [Placeholder({ label: 'Distributed 1' })],
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
