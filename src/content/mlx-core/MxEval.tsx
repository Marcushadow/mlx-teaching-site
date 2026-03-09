import { PlaygroundSlide } from '../../components/PlaygroundSlide'

export function MxEval() {
  return (
    <PlaygroundSlide
      title="mx.eval() — Triggering Execution"
      initialCode={`import mlx.core as mx

a = mx.array([1.0, 2.0, 3.0])
b = mx.array([4.0, 5.0, 6.0])
c = mx.add(a, b)
d = mx.multiply(c, b)
e = mx.sum(d)
mx.eval(e)`}
    />
  )
}
