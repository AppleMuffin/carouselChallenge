//give carousel buttons backwards and forwards functionality


const buttons = document.querySelectorAll("[data-button-direction]") //select all buttons

//apply on click listener to each button
buttons.forEach(button => {
  button.addEventListener("click", ()=> {
    if (button.dataset.buttonDirection === "next") { 
      //if buttons have data 'next', variable direction is 1. if buttons are 'back', variable is -1. 
      const direction = 1
      const selectedCarousel = button.closest("[data-carousel]").children[0]//store in a variable the parent carousel of the clicked button
      const activeSlide = selectedCarousel.querySelector("[data-active]")//store in a variable the active slide in the carousel
      console.log(activeSlide)
    } else if (button.dataset.buttonDirection === "back") {
      const direction = -1
      const carousel = button.closest("[data-carousel]").querySelector

      console.log(button.closest("[data-carousel]").children[0])
    }
  })
})