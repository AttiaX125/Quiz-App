import { useState } from "react"
   interface Props{
        onSubmit: (data: {amount: number, difficulty ?: string , type ?: string}) => void;
    }

export default function CardSelcetion({onSubmit}: Props) {
    const [difficulty, setDifficulty] = useState('easy');
    const [type, setType] = useState('multiple');
    const [amount, setAmount] = useState("10");
   
    function handleSubmit (e: React.FormEvent){
        e.preventDefault();
        onSubmit({ amount : Number(amount),
            difficulty,
             type });
             
             
    }
  return (
    <main className="flex flex-row justify-center items-center min-h-screen transition-colors duration-500">
        <div className="card bg-white dark:bg-slate-900 shadow-2xl rounded-2xl mx-auto w-full max-w-xl  px-6 py-4">
            <h1 className="text-slate-800 dark:text-slate-300 font-semibold text-3xl text-center py-2 px-2 mb-3">Quiz Selection</h1>
            <form onSubmit={handleSubmit}>
                <div>
                 <label className="font-bold text-xl py-2 px-4 text-slate-800 dark:text-slate-300  mb-0.5 inline-block" htmlFor="questionNumber">Number Of Questions</label>
                 <input className="w-full rounded outline-1 outline-slate-600 py-1 px-3  dark:text-slate-200   mb-1" type="number" id="questionNumber" name="questionNumber" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div>
                      <label className="w-full font-bold text-xl py-2 px-4 text-slate-800 dark:text-slate-300  mb-4 inline-block" htmlFor="difficulty">Difficulty </label>
                     <select className="w-full rounded outline-1 outline-slate-600 py-2 mx-auto px-3 mb-4 dark:text-slate-300 " name="difficulty" id="difficulty" value={difficulty}
                      onChange={(e)=> setDifficulty(e.target.value)}
                     >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                     </select>
                </div>
                <div>
                    <label className="w-full font-bold text-xl py-2 px-4 text-slate-800 dark:text-slate-300  mb-4 inline-block" htmlFor="type"> Type: </label>
                    <select className="w-full rounded outline-1 outline-slate-600 py-2 px-3 mx-auto mb-4 dark:text-slate-300 " name="type" id="type" value={type} onChange={(e)=> setType(e.target.value)}>
                         <option value="multiple">Multiple Questions</option>
                         <option value="boolean">True / False</option>
                    </select>
                </div>
                <div className="flex flex-row justify-center mt-6">
                    <button  className="text-center font-medium text-white dark:text-black mt-7 w-80 mb-10 py-3 px-6 bg-sky-600 dark:bg-purple-600 rounded-xl cursor-pointer hover:bg-sky-700 dark:hover:bg-purple-900" type="submit"> start Quiz</button>
                </div>
            </form>
            </div> 
    </main>
  )
}
