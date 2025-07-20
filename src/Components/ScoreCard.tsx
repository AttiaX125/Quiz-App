import type { FormattedQuestion } from "./fetchQuizQuestions";
import RadialProgress from "./RadialProgress";

interface Props{
    questions: FormattedQuestion[];
    score: number;
}
export default function ScoreCard({score, questions}: Props) {
  return (
    <>
    <main className=" flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-800 transition-colors duration-500">
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 text-center shadow-2xl rounded">
            <h1 className="text-2xl text-slate-800 dark:text-slate-300 font-semibold">You Final Score is:</h1>
            <span className="text-slate-800 dark:text-slate-300">{score } / {questions.length }</span>
            <div className="flex justify-center mt-4">
                <RadialProgress percentage={Math.round((score/questions.length) * 100)}/>
            </div>
        </div>
    </main>
      
    </>
  )
}
