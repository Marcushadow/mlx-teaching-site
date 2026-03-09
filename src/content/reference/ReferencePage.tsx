export function ReferencePage() {
  return (
    <div className="h-full overflow-y-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-100">Quick Reference</h1>

      {/* Setup Commands */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-purple-300 mb-4">Setup Commands</h2>
        <div className="space-y-3 font-mono text-sm">
          <div>
            <p className="text-gray-400 mb-1"># Create conda environment</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-emerald-300">
{`conda create -n MLX python=3.12
conda activate MLX
conda install -c conda-forge openmpi`}
            </pre>
          </div>
          <div>
            <p className="text-gray-400 mb-1"># Install MLX packages</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-emerald-300">
{`pip install mlx mlx-lm mlx-vlm hf_transfer`}
            </pre>
          </div>
          <div>
            <p className="text-gray-400 mb-1"># Install Open MPI (macOS)</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-emerald-300">
{`brew install open-mpi`}
            </pre>
          </div>
        </div>
      </section>

      {/* MLX Operations */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-purple-300 mb-4">MLX Core Operations</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ['mx.array([...])', 'Create an array'],
            ['mx.add(a, b)', 'Element-wise addition'],
            ['mx.subtract(a, b)', 'Element-wise subtraction'],
            ['mx.multiply(a, b)', 'Element-wise multiplication'],
            ['mx.matmul(a, b)', 'Matrix multiplication'],
            ['mx.reshape(a, shape)', 'Reshape array'],
            ['mx.exp(a)', 'Element-wise exponential'],
            ['mx.log(a)', 'Element-wise logarithm'],
            ['mx.sum(a)', 'Sum all elements'],
            ['mx.mean(a)', 'Mean of all elements'],
            ['mx.eval(a)', 'Force evaluation (trigger lazy graph)'],
            ['mx.compile(fn)', 'Compile function for optimization'],
          ].map(([op, desc]) => (
            <div key={op} className="flex items-start gap-2">
              <code className="bg-gray-800 px-2 py-1 rounded text-purple-300 whitespace-nowrap">{op}</code>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Distributed Commands */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-purple-300 mb-4">Distributed Commands</h2>
        <div className="space-y-3 font-mono text-sm">
          <div>
            <p className="text-gray-400 mb-1"># Configure Thunderbolt ring</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-emerald-300">
{`mlx.distributed_config --verbose \\
  --hosts <ip1>,<ip2>`}
            </pre>
          </div>
          <div>
            <p className="text-gray-400 mb-1"># Launch distributed job</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-emerald-300">
{`mlx.launch --verbose \\
  --hostfile hostfile.json \\
  -n 2 \\
  script.py`}
            </pre>
          </div>
          <div>
            <p className="text-gray-400 mb-1"># Hostfile format (JSON)</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-blue-300">
{`[
  { "ssh": "192.168.1.100",
    "ips": ["192.168.0.2"] },
  { "ssh": "192.168.1.101",
    "ips": ["192.168.0.6"] }
]`}
            </pre>
          </div>
        </div>
      </section>

      {/* LoRA Commands */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-purple-300 mb-4">LoRA Commands</h2>
        <div className="space-y-3 font-mono text-sm">
          <div>
            <p className="text-gray-400 mb-1"># Convert model</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-emerald-300">
{`mlx_lm.convert --hf-path <model> --mlx-path ./mlx_model -q`}
            </pre>
          </div>
          <div>
            <p className="text-gray-400 mb-1"># Single-device training</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-emerald-300">
{`mlx_lm.lora --model ./mlx_model --train --data ./data --iters 100`}
            </pre>
          </div>
          <div>
            <p className="text-gray-400 mb-1"># Distributed training</p>
            <pre className="bg-gray-800 rounded-lg p-3 text-emerald-300">
{`mlx.launch --verbose --hostfile hostfile.json -n 2 \\
  mlx_lm.lora --model ./mlx_model --train --data ./data --iters 20`}
            </pre>
          </div>
        </div>
      </section>

      {/* Useful Links */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-purple-300 mb-4">Useful Links</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            ['MLX Documentation', 'https://ml-explore.github.io/mlx/'],
            ['mlx-lm (LLM tools)', 'https://github.com/ml-explore/mlx-lm'],
            ['mlx-vlm (Vision models)', 'https://github.com/ml-explore/mlx-vlm'],
            ['HuggingFace', 'https://huggingface.co'],
            ['DistributedMacInference', 'https://github.com/Marcushadow/DistributedMacInference'],
            ['Llama.cpp', 'https://github.com/ggml-org/llama.cpp'],
          ].map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
            >
              <div className="text-purple-300 font-semibold">{name}</div>
              <div className="text-xs text-gray-500 truncate">{url}</div>
            </a>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}
