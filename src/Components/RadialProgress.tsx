interface Props{
    percentage : number;
}
export default function RadialProgress({percentage} : Props) {
    const strokeDasharray  = 283;
    const strokeDashoffset  = strokeDasharray - (strokeDasharray * percentage) / 100;

    // color Logic
    const  getColor = ()=>{
        if(percentage <= 50) return "#ef4444";// red-500
        if(percentage <= 75) return "#f97316";// orange-500
        return "#22c55e"; // green-500
    }
    const color = getColor();
  return (
    <div className=" relative w-32 h-32">
        <svg className="w-full h-full transform rotate-90">
            {/* Background ring */}
            <circle cx="50%"
          cy="50%"
          r="45"
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="transparent"/>
          
        {/* Glowing progress ring */}
        <circle
          cx="50%"
          cy="50%"
          r="45"
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 6px ${color})`,
            transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease"
          }}
        />
        </svg>
        {/* Percentage label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-xl font-bold"
          style={{ color }}
        >
          {percentage}%
        </span>
      </div>
    </div>
  )
}
