import { PlaygroundSlide } from '../../components/PlaygroundSlide'

export function LazyEval() {
  return (
    <PlaygroundSlide
      title="Lazy Evaluation — Building the Graph"
      initialCode={`import mlx.core as mx

a = mx.array([1.0, 2.0, 3.0])
b = mx.array([4.0, 5.0, 6.0])
c = mx.add(a, b)
d = mx.multiply(c, b)
# Nothing has executed yet!
# The graph is just a plan.
# Try adding: mx.eval(d)`}
    />
  )
}
