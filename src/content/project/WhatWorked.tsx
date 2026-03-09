import { ExplainerSlide } from '../../components/ExplainerSlide'

export function WhatWorked() {
  return (
    <ExplainerSlide
      title="What Worked & What Didn't"
      content={
        <div>
          <p className="font-semibold text-emerald-300 mb-2">Successes:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
            <li>Llama.cpp RPC inference across 2+ Macs</li>
            <li>MLX distributed primitives (all_sum, all_gather)</li>
            <li>Single-device LoRA fine-tuning with mlx_lm</li>
            <li>Thunderbolt ring auto-configuration</li>
            <li>Exo peer discovery and inference</li>
          </ul>
          <p className="font-semibold text-red-300 mb-2">Pain Points:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>3 different lora.py versions caused confusion</li>
            <li>DDP documentation didn't match reality</li>
            <li>Identical paths required across all Macs</li>
            <li>Distributed LoRA had unresolved issues</li>
            <li>HuggingFace model access requires approval for some models</li>
          </ul>
        </div>
      }
      visual={
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <p className="text-sm text-gray-400 font-semibold text-center">Scorecard</p>
          {[
            { task: 'Distributed Inference (RPC)', pass: true },
            { task: 'Distributed Inference (Exo)', pass: true },
            { task: 'MLX Distributed Init', pass: true },
            { task: 'Single-Device LoRA', pass: true },
            { task: 'Distributed LoRA', pass: false },
            { task: 'Full DDP Training', pass: false },
          ].map((item) => (
            <div key={item.task} className="flex items-center gap-3">
              <span className={`text-lg ${item.pass ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.pass ? '\u2713' : '\u2717'}
              </span>
              <span className="text-sm text-gray-300">{item.task}</span>
            </div>
          ))}
        </div>
      }
    />
  )
}
