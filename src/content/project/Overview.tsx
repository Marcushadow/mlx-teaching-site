import { ExplainerSlide } from '../../components/ExplainerSlide'

export function Overview() {
  return (
    <ExplainerSlide
      title="DistributedMacInference"
      content={
        <div>
          <p>
            A research project exploring distributed machine learning on
            Apple Silicon — connecting multiple Macs to pool their unified
            memory for training and inference.
          </p>
          <p className="font-semibold text-purple-300">Goal:</p>
          <p>
            Can we use a cluster of Macs connected via Thunderbolt as a
            viable distributed ML platform? What works, what doesn't?
          </p>
          <p className="mt-2">
            <a
              href="https://github.com/Marcushadow/DistributedMacInference"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 underline hover:text-purple-300"
            >
              github.com/Marcushadow/DistributedMacInference
            </a>
          </p>
        </div>
      }
      visual={
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <p className="text-sm text-gray-400 font-semibold">Architecture</p>
          <div className="w-full space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 bg-blue-600/20 border border-blue-500/40 rounded-lg p-3 text-center">
                <div className="font-semibold text-blue-300">Mac 0</div>
                <div className="text-xs text-gray-400 mt-1">MLX + MPI</div>
                <div className="text-xs text-gray-500">Metal GPU</div>
              </div>
              <div className="flex-1 bg-emerald-600/20 border border-emerald-500/40 rounded-lg p-3 text-center">
                <div className="font-semibold text-emerald-300">Mac 1</div>
                <div className="text-xs text-gray-400 mt-1">MLX + MPI</div>
                <div className="text-xs text-gray-500">Metal GPU</div>
              </div>
            </div>
            <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg p-2 text-center">
              <div className="text-sm font-semibold text-orange-300">Thunderbolt Ring</div>
              <div className="text-xs text-gray-400">High-bandwidth, low-latency</div>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-2 text-center">
              <div className="text-sm font-semibold text-purple-300">Pooled Unified Memory</div>
            </div>
          </div>
        </div>
      }
    />
  )
}
