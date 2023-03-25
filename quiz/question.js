class Question {
    constructor(question){
        this.questionElement = document.querySelector("#question");
        this.answerElements = [
            document.querySelector("#a1"),
            document.querySelector("#a2"),
            document.querySelector("#a3"),
            document.querySelector("#a4"),
        ];

        this.correctAnswer = question.correct_answer;
        this.question = question.question;
        this.isCorrect = false;

        this.answer = [question.correct_answer , ...question.incorrect_answers];
    }

    answer (checkElement){
        // why checkElement[0] => becouse the input is an array of [label , length] so we need the label only
        this.isCorrect = checkElement[0].textContent === this.correctAnswer ? true : false ; 
    }

    render (){
        this.questionElement.innerHTML= this.question;
        this.answerElements.forEach((el,index) => {
            el.innerHTML = '<input type ="radio" name="radio"> ' + this.answer[index];
        });
    }
}

export default Question ;