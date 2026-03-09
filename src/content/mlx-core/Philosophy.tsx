import { ExplainerSlide } from '../../components/ExplainerSlide'

export function Philosophy() {
  return (
    <ExplainerSlide
      title="MLX Philosophy"
      content={
        <div>
          <p>
            MLX is an array framework by Apple, designed specifically for
            Apple Silicon. It feels like NumPy but runs on the GPU.
          </p>
          <p className="font-semibold text-purple-300">Key design principles:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li><span className="text-blue-300">Familiar API</span> — NumPy-like syntax. If you know NumPy, you know MLX.</li>
            <li><span className="text-emerald-300">Lazy by default</span> — operations build a computation graph. Nothing executes until you need a value.</li>
            <li><span className="text-orange-300">Unified memory</span> — arrays live in shared memory. No <code className="text-orange-300 bg-gray-800 px-1 rounded">.to(device)</code> calls like PyTorch.</li>
            <li><span className="text-purple-300">Composable transforms</span> — grad, vmap, compile — all compose naturally.</li>
          </ul>
        </div>
      }
      visual={
        <div className="w-full max-w-sm">
          <p className="text-sm text-gray-400 mb-3 font-semibold">NumPy vs MLX — spot the difference</p>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">NumPy</p>
              <pre className="text-sm text-blue-300 font-mono">
{`import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = np.add(a, b)
d = np.matmul(c, c)`}
              </pre>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-purple-500/30">
              <p className="text-xs text-purple-400 mb-1">MLX</p>
              <pre className="text-sm text-purple-300 font-mono">
{`import mlx.core as mx

a = mx.array([1, 2, 3])
b = mx.array([4, 5, 6])
c = mx.add(a, b)
d = mx.matmul(c, c)`}
              </pre>
            </div>
          </div>
        </div>
      }
    />
  )
}
