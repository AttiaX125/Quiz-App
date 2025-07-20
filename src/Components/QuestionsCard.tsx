import { useState } from "react";
import type { FormattedQuestion } from "./fetchQuizQuestions";

interface Props {
  questions: FormattedQuestion[];
  onAnswer: (correct: boolean) => void;
  onFinish : (finished : boolean) => void;
}

export default function QuestionsCard({ questions, onAnswer, onFinish }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQuestion = questions[currentIndex];

  function handleNext() {
    if (currentIndex == questions.length - 1){
        setIsFlipped(true);
        onAnswer(selectedAnswer === currentQuestion.correct_answer);
        onFinish(true);
    }else{
     setIsFlipped(true);
    onAnswer(selectedAnswer === currentQuestion.correct_answer);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }, 500);
    }
 
  }

  if (!questions || questions.length === 0) {
    return <div className="bg-slate-800 dark:text-slate-300">No Question Loaded</div>;
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-800 transition-colors duration-500">
      <div className="w-full max-w-xl perspective">
        <div
          className={`relative w-full min-h-[400px] transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute w-full h-full backface-hidden bg- dark:bg-slate-900 shadow-xl rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="questionScore border border-sky-500 dark:border-purple-700 w-fit px-3 py-1 rounded-full text-sm text-sky-600 dark:text-purple-700 font-semibold mb-4">
                {currentIndex + 1} / {questions.length}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-300 mb-2">Question</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{currentQuestion.question}</p>

              <div>
                {currentQuestion.options.map((opt, index) => (
                  <label
                    key={index}
                    className="block mb-2 cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="radio"
                      name="option"
                      value={opt}
                      className="mr-2 appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:bg-sky-500 dark:checked:bg-purple-700"
                      onChange={() => setSelectedAnswer(opt)}
                      checked={selectedAnswer === opt}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleNext}
                className="bg-sky-500 dark:bg-purple-700 font-medium text-white dark:text-black px-6 py-2 rounded-xl hover:bg-sky-600 dark:hover:bg-purple-900 disabled:bg-gray-300 dark:disabled:bg-gray-600"
                disabled={selectedAnswer === null}
              >
                {currentIndex === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white shadow-xl rounded-2xl p-6 flex items-center justify-center">
            <p className="text-xl font-semibold text-slate-500">Flipping...</p>
          </div>
        </div>
      </div>
    </main>
  );
}
