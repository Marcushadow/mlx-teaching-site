import { PlaygroundSlide } from '../../components/PlaygroundSlide'

export function MxCompile() {
  return (
    <PlaygroundSlide
      title="mx.compile() — Graph Optimization"
      initialCode={`import mlx.core as mx

a = mx.array([1.0, 2.0, 3.0])
b = mx.array([4.0, 5.0, 6.0])
c = mx.add(a, b)
d = mx.exp(c)
e = mx.sum(d)
mx.compile(e)
mx.eval(e)`}
    />
  )
}
