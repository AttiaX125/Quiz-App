
import { useEffect, useState } from "react";
import CardSelcetion from "./Components/CardSelcetion"
import Navbar from "./Components/Navbar"
import QuestionsCard from "./Components/QuestionsCard";
import { fetchQuizQuestions } from "./Components/fetchQuizQuestions";
import type  { FormattedQuestion } from "./Components/fetchQuizQuestions";
import ScoreCard from "./Components/ScoreCard";


function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestion] = useState<FormattedQuestion []>([]);
  const [score, setScore] = useState(0);
  const [isFinish, setisFinish] = useState(false)

    const handleFormSubmit = async (data: { amount: number; difficulty?: string; type?: string }) => {
    console.log("✅ Received from CardSelection:", data);
    const quizData = await fetchQuizQuestions(data.amount, data.difficulty, data.type);
    setIsStarted(true);
    setQuestion(quizData);
    
  };
  function onAnswer (correct : boolean){
    if (correct == true){
      setScore (score + 1);
    }
    else{
      console.log('the answer wrong ya 8aby')
    }
  }
  function onFinish(finished : boolean){
    if (finished == true){
      setisFinish(true);
    }
    
  }
useEffect (()=> {
  console.log("this the final array ", questions)
},[questions]);
  return (
    <main className="bg-slate-100 dark:bg-slate-800 transition-colors duration-500">

    <Navbar/>
   
    {isFinish? <ScoreCard questions= {questions} score={score}/> :  !isStarted?<CardSelcetion onSubmit={handleFormSubmit}/> :
    <QuestionsCard onFinish={onFinish} onAnswer={onAnswer}  questions= {questions}/>
    } 
    </main>
  )
}

export default App
