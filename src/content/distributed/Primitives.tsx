import { WalkthroughSlide } from '../../components/WalkthroughSlide'

export function Primitives() {
  return (
    <WalkthroughSlide
      title="Distributed Primitives"
      code={`import mlx.core as mx

x = mx.array([1.0, 2.0, 3.0])

world = mx.distributed.init()

print("Distributed world size:", world.size())
print("Current rank:", world.rank())

if world.size() > 1:
    x = mx.distributed.all_sum(x)

print("Result after all_sum:", x)`}
      steps={[
        {
          lines: [1, 1] as [number, number],
          description: 'Import MLX core — the foundation for all array operations.',
        },
        {
          lines: [3, 3] as [number, number],
          description: 'Create a local array. Each rank starts with the same data.',
        },
        {
          lines: [5, 5] as [number, number],
          description: 'Initialize the distributed group. This connects all Macs in the ring via MPI.',
        },
        {
          lines: [7, 8] as [number, number],
          description: 'world.size() returns total number of Macs. world.rank() returns this Mac\'s index (0, 1, 2...).',
        },
        {
          lines: [10, 11] as [number, number],
          description: 'all_sum reduces x across all ranks — each rank gets the sum of all ranks\' arrays.',
        },
      ]}
    />
  )
}
