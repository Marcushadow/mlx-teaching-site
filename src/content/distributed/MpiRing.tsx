import { ExplainerSlide } from '../../components/ExplainerSlide'

export function MpiRing() {
  return (
    <ExplainerSlide
      title="MPI & Ring Topology"
      content={
        <div>
          <p>
            MLX uses <span className="text-purple-300 font-semibold">MPI</span> (Message
            Passing Interface) for distributed communication. Each Mac is a
            "rank" — a process in the distributed group.
          </p>
          <p>
            Macs are connected in a <span className="text-purple-300 font-semibold">ring
            topology</span> via Thunderbolt cables. Data flows around the
            ring during all-reduce operations (gradient aggregation).
          </p>
          <p>
            The <code className="bg-gray-800 px-1 rounded">mlx.distributed_config</code> tool
            automatically discovers the Thunderbolt connections and sets up the
            ring for you — configuring bridge interfaces and routing.
          </p>
        </div>
      }
      visual={
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-64 h-64">
            {/* Ring visualization */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-semibold">
              Mac 0 (Rank 0)
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-16 bg-emerald-600 rounded-lg flex items-center justify-center text-sm font-semibold">
              Mac 1 (Rank 1)
            </div>
            {/* Arrows */}
            <div className="absolute top-16 right-12 text-orange-400 text-2xl">↓</div>
            <div className="absolute bottom-16 left-12 text-orange-400 text-2xl">↑</div>
            <div className="absolute top-1/2 right-6 -translate-y-1/2 text-xs text-orange-300">Thunderbolt</div>
            <div className="absolute top-1/2 left-6 -translate-y-1/2 text-xs text-orange-300">Thunderbolt</div>
          </div>
          <p className="text-xs text-gray-500">Data flows in a ring during all-reduce</p>
        </div>
      }
    />
  )
}
