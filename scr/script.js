let inputNumb = document.querySelector("#number"),
         numbers = /[0-9]/,
         regExp = /[0-9]{4}/,
         letters = /^[A-Za-z\s]+$/
let nameInput = document.querySelector('#name')
const monthInput = document.querySelector('#month')
const yearInput = document.querySelector('#year')
const cvcInput = document.querySelector('#cvc')
let date = new Date()

const checkCondition = (errorValue, input, checkValue) => {
      document.querySelectorAll('.card__error')[errorValue].style.display =
      input.value.length < checkValue || input.value.length === 0 ? "block" : "none"
      input.style.borderColor =
      input.value.length < checkValue || input.value.length === 0 ? "red" : "#8e8593"
}

const checkMonthCondition = () => {
   document.querySelectorAll('.card__error')[2].style.display =
   monthInput.value > 12 || monthInput.value.length === 0 ? "block" : "none"
   monthInput.style.borderColor =
   monthInput.value > 12 || monthInput.value.length === 0 ? "red" : "#8e8593"
}

inputNumb.oninput = (e) => {
   if( e.inputType === "insertText" && !numbers.test(e.data) || inputNumb.value.length > 19){
      inputNumb.value = inputNumb.value.slice(0, inputNumb.value.length - 1)
      return
  }

  if(inputNumb.value.length === 19) monthInput.focus()

  document.querySelector('.card__main-numb').textContent = inputNumb.value

  if( e.inputType === "deleteContentBackward" && regExp.test(inputNumb.value.slice(-4)) ){
   inputNumb.value = inputNumb.value.slice(0, inputNumb.value.length - 1)
   document.querySelector('.card__main-numb').textContent = inputNumb.value
   return
}
   if( regExp.test(inputNumb.value.slice(-4)) && inputNumb.value.length < 19) inputNumb.value += " "
}

nameInput.oninput = (e) => {
   if( e.inputType === "insertText" && !letters.test(e.data)){
      nameInput.value = nameInput.value.slice(0, nameInput.value.length - 1)
      return
  }
   document.querySelector('.card__main-name').textContent = nameInput.value.trim()
}

monthInput.oninput = (e) => {
   checkMonthCondition()

   if(monthInput.value.length == 2) yearInput.focus()
   if( e.inputType === "insertText" && !numbers.test(e.data) || monthInput.value.length > 2){
      monthInput.value = monthInput.value.slice(0, monthInput.value.length - 1)
      return
  } 
  document.querySelector(".card__main-mm").textContent = monthInput.value
   
}

yearInput.oninput = (e) => {
   if(yearInput.value.length == 2) cvcInput.focus()
   if( e.inputType === "insertText" && !numbers.test(e.data) || yearInput.value.length > 2){
      yearInput.value = yearInput.value.slice(0, yearInput.value.length - 1)
      return
  } 
   document.querySelector(".card__main-yy").textContent = yearInput.value
}

cvcInput.oninput = (e) => {
   if( e.inputType === "insertText" && !numbers.test(e.data) || cvcInput.value.length > 3){
      cvcInput.value = cvcInput.value.slice(0, cvcInput.value.length - 1)
      return
  } 
  document.querySelector('.card__back-cvc').textContent = cvcInput.value
}

document.querySelector('#confirm').onclick = () => {
   document.querySelectorAll('input[type="text"]').forEach(elem => {
      if(elem.value == '') {
         elem.parentNode.querySelectorAll('p')[1].style.display = "block"
         elem.style.borderColor = "red"
      } else{
         elem.parentNode.querySelectorAll('p')[1].style.display = "none"
         elem.style.borderColor = "#8e8593"
      }
   })
      checkMonthCondition()
      checkCondition(3, cvcInput, 3)
      checkCondition(1, inputNumb, 19)

      document.querySelectorAll('.card__error')[0].style.display =
      nameInput.value.trim().split(' ').length < 2 || nameInput.value.split(' ').length > 2 ? "block" : "none"
      document.querySelectorAll('.card__error')[0].style.borderColor =
      nameInput.value.trim().split(' ').length < 2 || nameInput.value.split(' ').length > 2 ? "red" : "#8e8593"

      document.querySelectorAll('.card__error')[2].style.display =
      Number.parseInt(20 + yearInput.value) < date.getFullYear() || yearInput.value.length === 0 ? "block" : "none"
      yearInput.style.borderColor =
      Number.parseInt(20 + yearInput.value) < date.getFullYear() || yearInput.value.length === 0 ? "red" : "#8e8593"

      if(nameInput.value.split(' ').length === 2 && inputNumb.value.length === 19 && (monthInput.value.length > 1 && monthInput.value <= 12) && (yearInput.value.length === 2 && Number.parseInt(20 + yearInput.value) > date.getFullYear()) && cvcInput.value.length === 3) {
         document.querySelector('.card').style.display = "none"
         document.querySelector('.thank').style.display = "flex"
      }
      else return
}