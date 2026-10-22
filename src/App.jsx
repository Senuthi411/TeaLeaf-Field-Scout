import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mb-2">
          <span className="text-3xl">🍃</span>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            TeaLeaf Field Scout
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            React + Tailwind CSS is ready to go!
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium transition duration-150 shadow-sm cursor-pointer"
          >
            Count is: {count}
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Edit <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-600">src/App.jsx</code> to begin building your project.
        </p>
      </div>
    </div>
  )
}
