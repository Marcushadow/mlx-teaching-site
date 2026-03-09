import { ExplainerSlide } from '../../components/ExplainerSlide'

export function UnifiedMemory() {
  return (
    <ExplainerSlide
      title="Unified Memory Architecture"
      content={
        <div>
          <p>
            Traditional systems have separate CPU and GPU memory connected by
            PCIe. Copying data between them is slow and creates a bottleneck.
          </p>
          <p>
            Apple Silicon uses <span className="text-purple-300 font-semibold">unified memory</span> —
            CPU and GPU share the same physical RAM. No copying needed.
            Both processors read and write the same bytes at full bandwidth.
          </p>
          <p>
            This means zero-copy data sharing between CPU and GPU, which
            eliminates one of the biggest performance bottlenecks in traditional
            GPU computing.
          </p>
        </div>
      }
      visual={
        <div className="flex flex-col gap-8 w-full max-w-sm">
          <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">Traditional (Discrete GPU)</p>
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 bg-blue-600 rounded-lg text-sm font-semibold">CPU + RAM</div>
              <div className="flex-1 border-t-2 border-dashed border-red-400 relative">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-red-400">PCIe (slow)</span>
              </div>
              <div className="px-4 py-3 bg-emerald-600 rounded-lg text-sm font-semibold">GPU + VRAM</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">Apple Silicon (Unified)</p>
            <div className="border-2 border-purple-500 rounded-xl p-4">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold">CPU</div>
                <div className="px-4 py-2 bg-emerald-600 rounded-lg text-sm font-semibold">GPU</div>
                <div className="px-4 py-2 bg-orange-600 rounded-lg text-sm font-semibold">Neural Engine</div>
              </div>
              <div className="bg-purple-500/20 rounded-lg px-4 py-2 text-center text-sm text-purple-300 font-semibold">
                Shared Unified Memory (zero-copy)
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
