//!potential improvements: I've programmed it so a currently playing video in a carousel will stop (and reset to the beginning) when I navigate to a new video in the same carousel. Could force all videos in other carousels to stop as well when I navigate (or play) a video, so only one video can play at any time.
//!maybe add some more video functions? like a volume button. Guess this depends on what the desired product is.
//! Looked into randomizing TikTok videos. Their API documentation doesn't seem to support it though. Tried making my own algorithm by just randomly generating characters like so: https://tiktok.com/[RANDOMIZED_CHARACTERS], but it redirects - seems like this used to work in the past based on searching other people's github repos, but TikTok must have plugged this :'(

// give all video elements pause and play functionality on click.
const videos = document.querySelectorAll("video")

videos.forEach(video => {
  video.addEventListener('click', () => {
    if (video.paused && video.closest('[data-active=true]')) {
      video.play()
    } else {
      video.pause()
    }
  })
})


let indexChange //storage for navigating through carousel slides

const buttons = document.querySelectorAll("[data-button-direction]") 
buttons.forEach(button => {
  button.addEventListener("click", ()=> {

    //function test case: reset a running video to the beginning when you navigate to a new video
    const slidesList= button.closest('[data-carousel]').children[0].children
    console.log(slidesList)
    for (slide of slidesList) {
      const video = slide.children[0]
      video.currentTime = 0
      video.pause()
    }

    //give 'next/forward' buttons an index of +1, give 'back/previous' buttons an index of -1.
    if (button.dataset.buttonDirection === "next") { 
      indexChange = 1
    } else {
      indexChange = -1
    }

    const selectedCarousel = button.closest("[data-carousel]").children[0]
    const activeSlide = selectedCarousel.querySelector("[data-active=true]")

    //get navigation coordinates of the next/previous video
    let offsetIndex = ([...selectedCarousel.children].indexOf(activeSlide) + indexChange)

    //make carousel circular (connects the first and last video)
    if (offsetIndex < 0) {
      offsetIndex = selectedCarousel.children.length - 1
    } 
    if (offsetIndex > selectedCarousel.children.length - 1) {
      offsetIndex = 0
    }
  
    //deactivate (hide) the present video, activate (show and play) the video you navigated to
    activeSlide.setAttribute('data-active', 'false')
    const nextVid = selectedCarousel.children[offsetIndex]
    nextVid.setAttribute('data-active', 'true')
    nextVid.children[0].play()

  })
})