import React from "react"
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"

export default function App() {
    const [start, setStart] = React.useState(false)
    
    function startQuiz() {
        setStart(true)
    }
    
    return start ? <Quiz /> : <Welcome startQuiz={startQuiz} />
}
