import { ExplainerSlide } from '../../components/ExplainerSlide'

export function WhatIsLora() {
  return (
    <ExplainerSlide
      title="What is LoRA?"
      content={
        <div>
          <p>
            <span className="text-purple-300 font-semibold">LoRA</span> (Low-Rank Adaptation)
            is a technique to fine-tune large models cheaply. Instead of
            updating all billions of parameters, you freeze the base model
            and train small adapter matrices.
          </p>
          <p>
            For a weight matrix W of shape (d x d), LoRA adds two small
            matrices A (d x r) and B (r x d) where r is much smaller than d.
            The effective weight becomes W + A*B.
          </p>
          <p className="text-purple-300 font-semibold">
            Result: 100x fewer trainable parameters, fraction of the memory,
            nearly the same quality.
          </p>
        </div>
      }
      visual={
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">Full Fine-Tuning</p>
            <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-300">W</div>
              <div className="text-xs text-red-400">d x d = millions of params</div>
              <div className="text-xs text-red-400">All updated during training</div>
            </div>
          </div>
          <div className="text-gray-500">vs</div>
          <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">LoRA</p>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-300">W</div>
                <div className="text-xs text-blue-400">Frozen</div>
              </div>
              <div className="text-gray-500 text-xl">+</div>
              <div className="flex items-center gap-1">
                <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-emerald-300">A</div>
                  <div className="text-xs text-emerald-400">d x r</div>
                </div>
                <div className="text-gray-500">*</div>
                <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-emerald-300">B</div>
                  <div className="text-xs text-emerald-400">r x d</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-400 mt-2 text-center">Only A & B are trained (tiny!)</p>
          </div>
        </div>
      }
    />
  )
}
