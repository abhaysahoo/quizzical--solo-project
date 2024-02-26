import React from "react"

import Button from "./Button"

export default function Welcome({ startQuiz }) {  
    return (
        <div className="welcome-component">
            <h1 className="quiz-name">Quizzical</h1>
            <p className="quiz-description">How about a QuizzWizz!!</p>
            <Button className="start-button"
                    onClick={startQuiz}>
                start quiz
            </Button>
        </div>
    )
}
