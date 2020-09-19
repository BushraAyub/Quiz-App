import React from 'react';
// import logo from './logo.svg';
//import './App.css';
import {QuizData} from "./QuizData";
import "./Quiz.css";

class Quiz extends React.Component{
  state = {
    userAnswer : null,
    currentQuestion: 0,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false
  }

  loadQuiz= () => {
    const {currentQuestion} = this.state;
    // this.setState =(() => {
    //   return {
    //   questions: QuizData[currentQuestion].question,
    //   options: QuizData[currentQuestion].options,
    //   answers: QuizData[currentQuestion].answer
    
    //       }
    this.setState({
      questions: QuizData[currentQuestion].question,
      options: QuizData[currentQuestion].options,
      answers: QuizData[currentQuestion].answer
    });
    };
    componentDidMount(){
      this.loadQuiz();
    }
    nextQuestionHandler = () => {
          // console.log('test')
          const { myAnswer, answer, score } = this.state;
      
          if (myAnswer === answer) {
            this.setState({
              score: score + 1
            });
          }
      
          this.setState({
            currentQuestion: this.state.currentQuestion + 1
          });
          console.log(this.state.currentQuestion);
        };
      
        componentDidUpdate(prevProps, prevState) {
          if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
              return {
                disabled: true,
                questions: QuizData[this.state.currentQuestion].question,
                options: QuizData[this.state.currentQuestion].options,
                answer: QuizData[this.state.currentQuestion].answer
              };
            });
          }
        }
         //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
        if (this.state.currentQuestion === QuizData.length - 1) {
          this.setState({
            isEnd: true
          });
        }
        if (this.state.myAnswer === this.state.answer) {
                this.setState({
                  score: this.state.score + 1
                });
              }
            };
  render () {
    const {currentQuestion, options, myAnswer, isEnd} = this.state;
    if (isEnd) {
            return (
              <div className="result">
                <h3>Game Over your Final score is {this.state.score} points </h3>
                <div>
                  The correct answer's for the questions was
                  <ul>
                    {QuizData.map((item, index) => (
                      <ul className="ui floating message options" key={index}>
                        {item.answer}
                      </ul>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }
    return( 
    <div className="App">
   {this.state.questions}
   <span>{`Questions ${currentQuestion}  out of ${QuizData.length -
            1} remaining `}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
           {currentQuestion < QuizData.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentQuestion === QuizData.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              Finish
            </button>
       )}
    </div>
    ) 
  }
}
export default Quiz;

// import React from "react";
// import { QuizData } from "./QuizData";

// class Quiz extends React.Component {
//   state = {
//     currentQuestion: 0,
//     myAnswer: null,
//     options: [],
//     score: 0,
//     disabled: true,
//     isEnd: false
//   };

//   loadQuizData = () => {
//     // console.log(quizData[0].question)
//     this.setState(() => {
//       return {
//         questions: QuizData[this.state.currentQuestion].question,
//         answer: QuizData[this.state.currentQuestion].answer,
//         options: QuizData[this.state.currentQuestion].options
//       };
//     });
//   };

//   componentDidMount() {
//     this.loadQuizData();
//   }
//   nextQuestionHandler = () => {
//     // console.log('test')
//     const { myAnswer, answer, score } = this.state;

//     if (myAnswer === answer) {
//       this.setState({
//         score: score + 1
//       });
//     }

//     this.setState({
//       currentQuestion: this.state.currentQuestion + 1
//     });
//     console.log(this.state.currentQuestion);
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.currentQuestion !== prevState.currentQuestion) {
//       this.setState(() => {
//         return {
//           disabled: true,
//           questions: QuizData[this.state.currentQuestion].question,
//           options: QuizData[this.state.currentQuestion].options,
//           answer: QuizData[this.state.currentQuestion].answer
//         };
//       });
//     }
//   }
//   //check answer
//   checkAnswer = answer => {
//     this.setState({ myAnswer: answer, disabled: false });
//   };
//   finishHandler = () => {
//     if (this.state.currentQuestion === QuizData.length - 1) {
//       this.setState({
//         isEnd: true
//       });
//     }
//     if (this.state.myAnswer === this.state.answer) {
//       this.setState({
//         score: this.state.score + 1
//       });
//     }
//   };
//   render() {
//     const { options, myAnswer, currentQuestion, isEnd } = this.state;

//     if (isEnd) {
//       return (
//         <div className="result">
//           <h3>Game Over your Final score is {this.state.score} points </h3>
//           <div>
//             The correct answer's for the questions was
//             <ul>
//               {QuizData.map((item, index) => (
//                 <li className="ui floating message options" key={index}>
//                   {item.answer}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="App">
//           <h1>{this.state.questions} </h1>
//           <span>{`Questions ${currentQuestion}  out of ${QuizData.length -
//             1} remaining `}</span>
//           {options.map(option => (
//             <p
//               key={option.id}
//               className={`ui floating message options
//          ${myAnswer === option ? "selected" : null}
//          `}
//               onClick={() => this.checkAnswer(option)}
//             >
//               {option}
//             </p>
//           ))}
//           {currentQuestion < QuizData.length - 1 && (
//             <button
//               className="ui inverted button"
//               disabled={this.state.disabled}
//               onClick={this.nextQuestionHandler}
//             >
//               Next
//             </button>
//           )}
//           {/* //adding a finish button */}
//           {currentQuestion === QuizData.length - 1 && (
//             <button className="ui inverted button" onClick={this.finishHandler}>
//               Finish
//             </button>
//           )}
//         </div>
//       );
//     }
//   }
// }

// export default Quiz;
