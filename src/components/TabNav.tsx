import type { TabConfig } from '../types'

interface TabNavProps {
  tabs: TabConfig[]
  activeTab: string
  onTabChange: (id: string) => void
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-1 px-4 h-12 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-4 py-2 text-sm font-medium whitespace-nowrap
                transition-colors duration-200 rounded-t-md
                ${isActive
                  ? 'text-purple-300'
                  : 'text-gray-400 hover:text-gray-200'
                }
              `}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-purple-500 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
