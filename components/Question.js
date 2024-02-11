import React from "react"
import { v4 as uuidv4 } from "uuid"

export default function Question(
    { 
        questionId,
        prompt, 
        correctAnswer, 
        incorrectAnswers, 
        updateQuestionsAnswered,
        updateAnswersArray,
        showResults
    }) {
    const [selectedAnswerId, setSelectedAnswerId] = React.useState(null)
    
    const options = React.useMemo(() => {
        //with only incorrect answers
        const choices = [...incorrectAnswers]
        //with both incorrect and correct answers
        choices.splice(Math.floor( Math.random() * 4 ), 0, correctAnswer)
        
        return choices
    }, [])
    
    function updateSelectedAnswerId(id) {
        setSelectedAnswerId(id)
    }
    
    function updateMultipleStates(e) {
        if(!selectedAnswerId) {
            updateQuestionsAnswered()
        }
        updateSelectedAnswerId(e.target.id)
        e.target.innerText === correctAnswer ? 
        updateAnswersArray(true, questionId) : updateAnswersArray(false, questionId)
    }
    
    const uniqueId = React.useMemo(() => uuidv4(), [])
    
    return (
        <div className="question-component">
            <div className="prompt">{prompt}</div>
            <div className="options">
                {
                    
                    options.map((option, index) => {
                        
                        return <div key={`${uniqueId}-${index}`} 
                                className=
                                {
                                    `option ${selectedAnswerId && selectedAnswerId === `${uniqueId}-${index}` ? 
                                        "selected-option" : ""} ${showResults ? "option-disabled" : ""}
                                        ${showResults && option === correctAnswer ? "correct-option" : ""} 
                                        ${showResults && selectedAnswerId === `${uniqueId}-${index}` && option != correctAnswer ? "incorrect-option" : ""}`
                                }
                                id={`${uniqueId}-${index}`}
                                onClick={(e) => { updateMultipleStates(e) }}
                                >
                                {option}
                        </div>  
                    })
                }
            </div>
            <hr />
        </div>
    )
}
