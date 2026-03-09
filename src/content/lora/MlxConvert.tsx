import { WalkthroughSlide } from '../../components/WalkthroughSlide'

export function MlxConvert() {
  return (
    <WalkthroughSlide
      title="Converting Models to MLX Format"
      code={`# Download model from HuggingFace
export HF_HUB_ENABLE_HF_TRANSFER=1
huggingface-cli download google/gemma-3-1b-it

# Convert HuggingFace model to MLX format
mlx_lm.convert \\
  --hf-path google/gemma-3-1b-it \\
  --mlx-path ./mlx_model

# Convert with 4-bit quantization (saves memory)
mlx_lm.convert \\
  --hf-path google/gemma-3-1b-it \\
  --mlx-path ./mlx_model \\
  -q`}
      steps={[
        {
          lines: [1, 3] as [number, number],
          description: 'Download the model from HuggingFace. HF_HUB_ENABLE_HF_TRANSFER speeds up large downloads.',
        },
        {
          lines: [5, 8] as [number, number],
          description: 'Convert the HuggingFace model to MLX format. This restructures weights for Apple Silicon optimization.',
        },
        {
          lines: [10, 14] as [number, number],
          description: 'The -q flag enables 4-bit quantization (default). This dramatically reduces model size — a 27B model goes from ~54GB to ~14GB.',
        },
      ]}
    />
  )
}
