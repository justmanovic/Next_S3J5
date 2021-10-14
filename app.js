const startBtn = document.querySelector("button#btn")
const select = document.querySelector("select")
const questionDisplay = document.querySelector("#questions")
var objectsQuestion = []
startBtn.addEventListener("click", () => {
  let nbQuestions = select.options[select.selectedIndex].value;
  console.log(nbQuestions)
  startQuiz(nbQuestions)
})


async function startQuiz(nbQ) {
  let response = await fetch(`https://opentdb.com/api.php?amount=${nbQ}`)
  let data = await response.json()
  let questions = data.results
  console.log(questions)
  questionDisplay.innerHTML = ``
  questions.forEach((question, index) => {
    questionDisplay.innerHTML += createCard(question, index)
    objectsQuestion.push(question)
  })
  console.log("questiooooon", objectsQuestion)
}


function createCard(questionHash, questionIndex) {
  let answersList = [...questionHash.incorrect_answers, questionHash.correct_answer]
  let answersHtml = ``

  for (let i = 0; i < answersList.length; i++) {
    answersHtml += `<div><input type = "radio" name="answer${questionIndex}" value ="${answersList[i]}" >${answersList[i]}</div>`
  }

  const html =
    // `<div class="hidden">
    `<div class="questionCard" data-questionIndex = "${questionIndex}">
      <p>${questionHash.question}</p>
      <form>
        ${answersHtml}
        <button class = "answerSubmit" type = "submit" data-question-index = "${questionIndex}">C'est mon dernier mot, JP</button>
      </form>
    <div>`
  return html
}

questionDisplay.addEventListener("click", (e) => {
  if (e.target.classList.contains("answerSubmit")) {
    e.preventDefault()
    let getSelectedValue = document.querySelector(`input[name="answer${e.target.dataset.questionIndex}"]:checked`)
    console.log(getSelectedValue)
    console.log(objectsQuestion[e.target.dataset.questionIndex], "c'est iciiiiiiiii")
    if (objectsQuestion[e.target.dataset.questionIndex].correct_answer === getSelectedValue.value) {
      alert("c'est la bonne réponse !!!")
    }
    console.log(document.forms)
    console.log(document.forms[e.target.dataset.questionIndex])
  }
})

