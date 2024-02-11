import React from "react"
import he from "he"
import ReactLoading from "react-loading"

import Question from "./Question"
import Button from "./Button"

export default function Quiz() {
    const [questions, setQuestions] = React.useState([])
    const [numberOfQuestionAnswered, setNumberOfQuestionAnswered] = React.useState(0)
    const [answersArray, setAnswersArray] = React.useState([false, false, false, false, false])
    const [showResults, setShowResults] = React.useState(false)
    const [restartQuiz, setRestartQuiz] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [err, setErr] = React.useState(false)
    
    function evaluate() {
        setShowResults(true)
    }
    
    function playAgain() {
        setRestartQuiz(prevState => !prevState)    
    }
    
    function updateQuestionsAnswered() {
        setNumberOfQuestionAnswered(prevNumber => prevNumber + 1)
    } 
    
    function updateAnswersArray(isCorrect, id) {
        setAnswersArray(prevAnswersArray => {
            const newAnswersArray = [...prevAnswersArray]
            newAnswersArray[id] = isCorrect
            return newAnswersArray
        })     
    }
    
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setErr(false)
                setNumberOfQuestionAnswered(0)
                setAnswersArray([false, false, false, false, false])
                setShowResults(false)
                
                const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
                const jsonResponse = await response.json()
                
                setQuestions(jsonResponse.results)
            } catch (err) {  
                setErr(true)    
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [restartQuiz])
    
    const questionsEl = questions.map((question, index) => {
        return <Question  key={index}
            questionId={index}
            prompt={he.decode(question.question)}
            correctAnswer={he.decode(question.correct_answer)}
            incorrectAnswers={question.incorrect_answers.map( question => he.decode(question) )}
            updateQuestionsAnswered={updateQuestionsAnswered}
            updateAnswersArray={updateAnswersArray}
            showResults={showResults}       
        />
    })
    
    if(err) {
        return (
            <div className="error-component">
                <div className="error-text">
                    🙈 Oops! The server is currently unavailable. Please try again later. 🛠️
                </div>
                <Button
                    className="quiz-btn"
                    onClick={playAgain}
                >
                    try again
                </Button>
            </div>
        )
    }
    
    if(loading) {
        return (
            <div className="quiz-loader">
                <ReactLoading 
                    type={"cylon"}
                    color={"#293264"} 
                    height={"20%"}
                    width={"20%"}
                />
            </div>
        )
    }

    return (
        <div className="quiz-component">
            {questionsEl}       
            {
                numberOfQuestionAnswered === 5 && !showResults && (
                    <div className="check-result">
                        <Button 
                            className="quiz-btn"
                            onClick={evaluate}
                        >
                            check answers
                        </Button>
                    </div>
                )
            }   
            {
                showResults && (
                    <div className="check-result">
                        <div className="quiz-scoreline"> 
                            You scored {answersArray.filter(item => item === true).length} / {answersArray.length} correct answers 
                        </div>
                        <Button
                            className="quiz-btn"
                            onClick={playAgain}
                        >
                            play again
                        </Button>
                    </div>
                )
            }
        </div>
    )
}
