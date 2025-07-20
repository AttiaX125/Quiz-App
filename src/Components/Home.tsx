import axios from "axios"
import { useEffect } from "react";

export default function Home() {
    async function fetchQuestions( amount:number, difficulty?: string, type?: string) {
  try {
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount,
        difficulty,
        type,
        encode: "base64"
      },
    });
    console.log("✅ Data:", response.data.results);
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
  }
}
  

    useEffect(()=>{
        fetchQuestions(5, "easy", "multiple");
    },[])
    
  return (

        <main>
      <div className="flex flex-row justify-center items-center min-h-screen">
        <div className="bg-gray-300">
          <h2 className="text-center font-semibold">Quiz App</h2>
          
        </div>
      </div>
    </main>
  )
}
