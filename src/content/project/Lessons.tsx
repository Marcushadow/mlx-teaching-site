import { ExplainerSlide } from '../../components/ExplainerSlide'

export function Lessons() {
  return (
    <ExplainerSlide
      title="Key Takeaways"
      content={
        <div>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <span className="text-purple-300 font-semibold">Apple Silicon is viable for ML</span>
              <p className="text-gray-400 text-sm ml-5">Unified memory + Metal GPU is a real advantage. MLX makes it accessible.</p>
            </li>
            <li>
              <span className="text-purple-300 font-semibold">Distributed inference works today</span>
              <p className="text-gray-400 text-sm ml-5">Both Llama.cpp RPC and Exo deliver working distributed inference.</p>
            </li>
            <li>
              <span className="text-purple-300 font-semibold">Distributed training is early-stage</span>
              <p className="text-gray-400 text-sm ml-5">MLX distributed primitives work, but the training ecosystem (LoRA, DDP) needs maturity.</p>
            </li>
            <li>
              <span className="text-purple-300 font-semibold">Setup friction is the main barrier</span>
              <p className="text-gray-400 text-sm ml-5">SSH, identical paths, conda envs, Thunderbolt config — the ML code is the easy part.</p>
            </li>
          </ol>
          <p className="mt-4">
            <a
              href="https://github.com/Marcushadow/DistributedMacInference"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 underline hover:text-purple-300"
            >
              Full project on GitHub
            </a>
          </p>
        </div>
      }
      visual={
        <div className="flex items-center justify-center">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 text-center max-w-xs">
            <p className="text-lg font-semibold text-purple-300 mb-2">The Bottom Line</p>
            <p className="text-gray-400">
              Mac clusters are a promising ML platform.
              Inference is ready. Training is getting there.
              The ecosystem is young but moving fast.
            </p>
          </div>
        </div>
      }
    />
  )
}
