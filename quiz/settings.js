//https://opentdb.com/api.php?amount=10&category=9&difficulty=medium
import Quiz from"./quiz.js"
class Settings {
    constructor(){
        this.settingsDom= document.querySelector(".settings");
        this.quizDom=document.querySelector(".quiz");
        this.categoryDom=document.querySelector("#category");
        this.nQuestionDom=document.querySelector("#nQuestions");
        this.startBtn=document.querySelector("#start");
        this.difficulty = [
            document.querySelector("#easy"),
            document.querySelector("#medium"),
            document.querySelector("#hard"),
        ];
        this.quiz={};
        this.startBtn.addEventListener("click" , this.startQuizApp)
    }
    // we used await => becouse it was not wait till the response come ,,and becouse of 
    //useing await we have to put async in the method difintion to be able to use await
    startQuizApp = async () =>{
        try{
        const amount=this.getAmount();
        const categoryID =  this.categoryDom.value;
        const difficulty = this.getDefficulty();

        const url =`https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&difficulty=${difficulty}`
        let {result} = await this.fetchData(url); // {result} to get the result from data instade of doung data.result
        this.quiz = new Quiz(this.quizDom , amount , result);   
        this.toggleElements();
        } catch(err){
            alert(err);
        }
    };

    toggleElements = () => {
        this.quizDom.style.display = "block";
        this.settingsDom.style.display = "none";
    };

    fetchData = async (url) => {
        // fetch(url).then((response) => response.json())
        // .then((data) => {
        //     return data.result;
        // });
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }

    getAmount = ()=> {
        const amount = this.nQuestionDom.value;
        if(amount > 0 && amount < 20){
            return amount;
        } else {
            alert("Enter Questions Number");
        }
    };

    getDefficulty =() =>{
      const difficulty = this.difficulty.filter((el) => el.checked);
      if(difficulty.length === 1){
        return difficulty[0].id;
      }  else{
        alert("please select difficulty");
      }
    };

}
export default Settings;