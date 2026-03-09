import { WalkthroughSlide } from '../../components/WalkthroughSlide'

export function DistributedConfig() {
  return (
    <WalkthroughSlide
      title="Setting Up the Ring"
      code={`# Step 1: Discover and configure Thunderbolt ring
mlx.distributed_config --verbose \\
  --hosts 192.168.1.100,192.168.1.101

# Output: Setup for each Mac
# sudo ifconfig bridge0 down
# sudo ifconfig en2 inet 192.168.0.2 ...
# sudo ifconfig en3 inet 192.168.0.5 ...

# Step 2: Generates hostfile.json
# [
#   { "ssh": "192.168.1.100",
#     "ips": ["192.168.0.2"] },
#   { "ssh": "192.168.1.101",
#     "ips": ["192.168.0.6"] }
# ]

# Step 3: SSH must be pre-configured
# Each Mac needs passwordless SSH access
# via ed25519 keys in ~/.ssh/authorized_keys`}
      steps={[
        {
          lines: [1, 3] as [number, number],
          description: 'Run mlx.distributed_config with the IP addresses of your Macs (from ifconfig en1). It discovers Thunderbolt connections automatically.',
        },
        {
          lines: [5, 8] as [number, number],
          description: 'The tool outputs network interface commands to run on each Mac. It tears down bridge0 and assigns direct IP addresses to Thunderbolt interfaces.',
        },
        {
          lines: [10, 16] as [number, number],
          description: 'A hostfile.json is generated mapping SSH addresses to ring IPs. This file is used by mlx.launch to orchestrate the distributed job.',
        },
        {
          lines: [18, 20] as [number, number],
          description: 'Prerequisites: SSH must be enabled on each Mac (System Settings > Sharing > Remote Login) with ed25519 keys for passwordless access.',
        },
      ]}
    />
  )
}
