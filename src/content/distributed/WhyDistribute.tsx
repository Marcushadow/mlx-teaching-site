import { ExplainerSlide } from '../../components/ExplainerSlide'

export function WhyDistribute() {
  return (
    <ExplainerSlide
      title="Why Distribute?"
      content={
        <div>
          <p>
            Models are getting bigger. LLaMA 3.3 70B has 70 billion parameters.
            At 4-bit quantization that's ~35GB — already pushing the limits
            of a single Mac's memory.
          </p>
          <p>
            When a model exceeds a single machine's memory, you need to
            split it across multiple machines. With Apple Silicon Macs
            connected via Thunderbolt, you can pool their unified memory.
          </p>
          <p className="text-purple-300 font-semibold">
            2 Mac Studios with 192GB each = 384GB of unified memory for ML.
          </p>
        </div>
      }
      visual={
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {[
            { name: 'Gemma 3 1B', size: 1, gb: '~0.5 GB', fits: true },
            { name: 'Gemma 3 12B', size: 12, gb: '~6 GB', fits: true },
            { name: 'Gemma 3 27B', size: 27, gb: '~14 GB', fits: true },
            { name: 'LLaMA 3.3 70B', size: 70, gb: '~35 GB', fits: false },
          ].map((model) => (
            <div key={model.name} className="flex items-center gap-3">
              <div className="w-28 text-sm text-gray-300 text-right">{model.name}</div>
              <div className="flex-1 bg-gray-800 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full rounded-full ${model.fits ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, (model.size / 70) * 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 w-16">{model.gb}</div>
            </div>
          ))}
          <p className="text-xs text-gray-500 text-center mt-2">
            Bar shows relative model size (Q4). Red = exceeds 32GB Mac.
          </p>
        </div>
      }
    />
  )
}
