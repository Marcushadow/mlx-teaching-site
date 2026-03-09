import { WalkthroughSlide } from '../../components/WalkthroughSlide'

export function SingleDevice() {
  return (
    <WalkthroughSlide
      title="Single Device LoRA Training"
      code={`# Run LoRA fine-tuning on a single Mac
mlx_lm.lora \\
  --model ./mlx_model \\
  --train \\
  --data ./data \\
  --iters 100

# Data format (JSONL):
# {"prompt": "Q: What is MLX?",
#  "completion": "A: An array framework..."}

# Directory structure:
# ./mlx_model/    - converted MLX model
# ./data/
#   train.jsonl   - training examples
#   valid.jsonl   - validation examples
# ./adapters/     - output LoRA weights`}
      steps={[
        {
          lines: [1, 6] as [number, number],
          description: 'The mlx_lm.lora command runs LoRA fine-tuning. --model points to the converted MLX model, --data to your training data, --iters controls training steps.',
        },
        {
          lines: [8, 10] as [number, number],
          description: 'Training data must be in JSONL format with "prompt" and "completion" fields. Each line is one training example.',
        },
        {
          lines: [12, 17] as [number, number],
          description: 'Expected directory layout. The model directory has MLX weights, data has JSONL files, and adapters are where trained LoRA weights are saved.',
        },
      ]}
    />
  )
}
