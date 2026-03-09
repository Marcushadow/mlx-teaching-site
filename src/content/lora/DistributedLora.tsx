import { WalkthroughSlide } from '../../components/WalkthroughSlide'

export function DistributedLora() {
  return (
    <WalkthroughSlide
      title="Distributed LoRA — The Gotchas"
      code={`# Distributed LoRA fine-tuning
mlx.launch --verbose \\
  --hostfile hostfile.json \\
  -n 2 \\
  mlx_lm.lora \\
  --model ./mlx_model \\
  --train \\
  --data ./data \\
  --iters 20

# GOTCHA 1: Paths must be identical
# Both Macs need the EXACT same absolute paths
# for conda, model, data, everything.
# Use rsync to mirror directories:
# rsync -r MLXTrng 192.168.1.125:~/Desktop/

# GOTCHA 2: Three lora.py versions exist!
# 1) mlx_lm.lora (pip package)
# 2) lora.py in mlx main repo
# 3) lora.py in mlx_lm repo
# They are NOT interchangeable.

# GOTCHA 3: DDP docs vs reality
# The documentation suggests DDP works seamlessly.
# In practice, the fix they suggest doesn't apply
# to the lora.py file itself.`}
      steps={[
        {
          lines: [1, 9] as [number, number],
          description: 'Wrap the LoRA command with mlx.launch to distribute across Macs. Same command as single-device, just launched via MPI.',
        },
        {
          lines: [11, 15] as [number, number],
          description: 'CRITICAL: Every Mac must have identical absolute paths — conda install location, model directory, data directory. Use rsync to mirror.',
        },
        {
          lines: [17, 21] as [number, number],
          description: 'There are THREE different lora.py files across the MLX ecosystem. The pip-installed mlx_lm.lora is the one you want. The repo versions are different.',
        },
        {
          lines: [23, 26] as [number, number],
          description: 'The MLX docs claim distributed data parallel works, but the suggested code fix doesn\'t apply to the actual lora.py. This is a known pain point.',
        },
      ]}
    />
  )
}
