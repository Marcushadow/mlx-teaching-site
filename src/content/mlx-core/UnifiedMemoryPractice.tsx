import { ExplainerSlide } from '../../components/ExplainerSlide'

export function UnifiedMemoryPractice() {
  return (
    <ExplainerSlide
      title="Unified Memory in Practice"
      content={
        <div>
          <p>
            In PyTorch, you constantly manage device placement — moving
            tensors between CPU and GPU with <code className="bg-gray-800 px-1 rounded">.to("cuda")</code> and <code className="bg-gray-800 px-1 rounded">.to("cpu")</code>.
          </p>
          <p>
            In MLX, there is no concept of device transfer. Arrays live in
            unified memory accessible by both CPU and GPU. The framework
            decides where to run operations for best performance.
          </p>
          <p className="text-purple-300 font-semibold">
            No .to(device). No memory copies. Just compute.
          </p>
        </div>
      }
      visual={
        <div className="w-full max-w-sm space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-red-400 mb-1">PyTorch — manual device management</p>
            <pre className="text-sm text-gray-300 font-mono">
{`model = Model().to("cuda")
x = torch.tensor([1,2,3])
x = x.to("cuda")     # manual copy
y = model(x)
y = y.to("cpu")       # copy back
print(y.numpy())`}
            </pre>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-purple-500/30">
            <p className="text-xs text-purple-400 mb-1">MLX — just works</p>
            <pre className="text-sm text-gray-300 font-mono">
{`model = Model()
x = mx.array([1,2,3])
y = model(x)          # just works
print(y)`}
            </pre>
          </div>
        </div>
      }
    />
  )
}
