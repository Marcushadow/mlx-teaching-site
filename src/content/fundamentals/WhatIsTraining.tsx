import { ExplainerSlide } from '../../components/ExplainerSlide'

export function WhatIsTraining() {
  return (
    <ExplainerSlide
      title="What is Training?"
      content={
        <div>
          <p>
            Training a neural network is an iterative optimization loop.
            The model makes predictions, measures how wrong they are,
            and adjusts its weights to be less wrong next time.
          </p>
          <p className="font-semibold text-purple-300">The training loop:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-300">
            <li><span className="text-blue-300">Forward pass</span> — compute a prediction from input</li>
            <li><span className="text-red-300">Loss</span> — measure how wrong the prediction is</li>
            <li><span className="text-orange-300">Backward pass</span> — compute gradients (which direction to adjust)</li>
            <li><span className="text-emerald-300">Update</span> — adjust weights using the gradients</li>
          </ol>
          <p className="mt-2">
            Repeat thousands of times. Each iteration, the model gets slightly
            better. All four steps involve heavy matrix math — perfect for GPUs.
          </p>
        </div>
      }
      visual={
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          {[
            { label: '1. Forward Pass', color: 'bg-blue-500', desc: 'Input → Prediction' },
            { label: '2. Loss Function', color: 'bg-red-500', desc: 'How wrong?' },
            { label: '3. Backward Pass', color: 'bg-orange-500', desc: 'Compute gradients' },
            { label: '4. Update Weights', color: 'bg-emerald-500', desc: 'Adjust parameters' },
          ].map((step, i) => (
            <div key={i} className="w-full flex items-center gap-3">
              <div className={`${step.color} rounded-lg px-3 py-2 text-sm font-semibold w-40 text-center`}>
                {step.label}
              </div>
              <span className="text-gray-400 text-sm">{step.desc}</span>
            </div>
          ))}
          <div className="mt-2 text-gray-500 text-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Repeat thousands of times
          </div>
        </div>
      }
    />
  )
}
