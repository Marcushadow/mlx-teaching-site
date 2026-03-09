import { ExplainerSlide } from '../../components/ExplainerSlide'

export function ThreeApproaches() {
  return (
    <ExplainerSlide
      title="Three Approaches Tested"
      content={
        <div>
          <p>
            We evaluated three different frameworks for distributed ML on
            Mac clusters. Each has different trade-offs between ease of use,
            performance, and flexibility.
          </p>
          <ol className="list-decimal list-inside space-y-3 mt-4">
            <li>
              <span className="text-blue-300 font-semibold">Llama.cpp RPC</span>
              <p className="text-gray-400 text-sm ml-5">Distributed inference via RPC servers. Each Mac runs an RPC server exposing its GPU to a coordinator.</p>
            </li>
            <li>
              <span className="text-emerald-300 font-semibold">Exo</span>
              <p className="text-gray-400 text-sm ml-5">Distributed inference framework with automatic peer discovery and model partitioning.</p>
            </li>
            <li>
              <span className="text-purple-300 font-semibold">MLX Native</span>
              <p className="text-gray-400 text-sm ml-5">Native distributed training via MPI + Thunderbolt ring. The most flexible but most setup-intensive.</p>
            </li>
          </ol>
        </div>
      }
      visual={
        <div className="w-full max-w-sm space-y-3">
          {[
            { name: 'Llama.cpp RPC', use: 'Inference', setup: 'Medium', status: 'Working', color: 'blue' },
            { name: 'Exo', use: 'Inference', setup: 'Easy', status: 'Working', color: 'emerald' },
            { name: 'MLX Native', use: 'Training', setup: 'Hard', status: 'Partial', color: 'purple' },
          ].map((approach) => (
            <div key={approach.name} className={`bg-${approach.color}-500/10 border border-${approach.color}-500/30 rounded-lg p-3`}>
              <div className={`font-semibold text-${approach.color}-300`}>{approach.name}</div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                <div><span className="text-gray-500">Use:</span> <span className="text-gray-300">{approach.use}</span></div>
                <div><span className="text-gray-500">Setup:</span> <span className="text-gray-300">{approach.setup}</span></div>
                <div><span className="text-gray-500">Status:</span> <span className={approach.status === 'Working' ? 'text-emerald-400' : 'text-orange-400'}>{approach.status}</span></div>
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}
