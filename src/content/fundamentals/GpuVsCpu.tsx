import { ExplainerSlide } from '../../components/ExplainerSlide'

export function GpuVsCpu() {
  return (
    <ExplainerSlide
      title="GPU vs CPU"
      content={
        <div>
          <p>
            CPUs have a few powerful cores optimized for sequential tasks.
            GPUs have thousands of smaller cores designed for parallel work.
          </p>
          <p>
            Matrix multiplication — the core operation in ML — is embarrassingly
            parallel. Each output element can be computed independently,
            making GPUs ideal for training and inference.
          </p>
          <p className="text-purple-300 font-semibold">
            A single matrix multiply can utilize all GPU cores simultaneously.
          </p>
        </div>
      }
      visual={
        <div className="flex flex-col gap-8 w-full max-w-xs">
          <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">CPU — 4-16 powerful cores</p>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center text-xs font-bold">
                  Core {i}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">GPU — thousands of small cores</p>
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-6 h-6 bg-emerald-500 rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}
