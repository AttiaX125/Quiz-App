import axios from "axios";


export interface FormattedQuestion {
    type : string,
    difficulty: string,
    question : string,
    correct_answer : string,
    options : string[]
}
interface RawAPIQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
export async function fetchQuizQuestions (amount:number , difficulty?: string , type?: string) : Promise<FormattedQuestion[]> {
     console.log("🔍 Fetching with:", { amount, difficulty, type });

try{
        const response = await axios.get("https://opentdb.com/api.php",{
        params :{
            amount,
            difficulty,
            type
        }
    })
    const formatted : FormattedQuestion[] =response.data.results.map((q : RawAPIQuestion)=> (
        {
            question : decodeHTML(q.question) ,
            correct_answer : decodeHTML(q.correct_answer),
            options : shuffleArray([
                decodeHTML(q.correct_answer),...q.incorrect_answers.map((ans)=> decodeHTML(ans))
            ])
        }
    ));
    return formatted;
} catch (error){
    console.error("❌ Error fetching questions:", error);
    return[];
}
function shuffleArray(array : string[]):string []{
    return [...array].sort(()=> Math.random()-0.5);
}

}
function decodeHTML(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}