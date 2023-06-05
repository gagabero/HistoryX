/**
 * Template Name: PhotoFolio
 * Updated: May 30 2023 with Bootstrap v5.3.0
 * Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader')
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded')
      }, 1000)
      setTimeout(() => {
        preloader.remove()
      }, 2000)
    })
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show')
  const mobileNavHide = document.querySelector('.mobile-nav-hide')

  document.querySelectorAll('.mobile-nav-toggle').forEach((el) => {
    el.addEventListener('click', function (event) {
      event.preventDefault()
      mobileNavToogle()
    })
  })

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active')
    mobileNavShow.classList.toggle('d-none')
    mobileNavHide.classList.toggle('d-none')
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach((navbarlink) => {
    if (!navbarlink.hash) return

    let section = document.querySelector(navbarlink.hash)
    if (!section) return

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle()
      }
    })
  })

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a')

  navDropdowns.forEach((el) => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault()
        this.classList.toggle('active')
        this.nextElementSibling.classList.toggle('dropdown-active')

        let dropDownIndicator = this.querySelector('.dropdown-indicator')
        dropDownIndicator.classList.toggle('bi-chevron-up')
        dropDownIndicator.classList.toggle('bi-chevron-down')
      }
    })
  })

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top')
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active')
    }
    window.addEventListener('load', togglescrollTop)
    document.addEventListener('scroll', togglescrollTop)
    scrollTop.addEventListener(
      'click',
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    )
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  })

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 3,
      },
    },
  })

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    })
  }
  window.addEventListener('load', () => {
    aos_init()
  })
})

// Function to fetch Wikipedia content
async function fetchWikipediaContent() {
  const searchTerms = document.getElementById('search-input').value.split(',') // Split the search input by comma
  const contentContainer = document.getElementById('content-container')

  // Clear previous content
  contentContainer.innerHTML = ''

  try {
    for (const searchTerm of searchTerms) {
      const apiUrl = `https://ka.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        searchTerm
      )}`
      const response = await fetch(apiUrl)
      const data = await response.json()

      // Display Wikipedia content
      displayWikipediaContent(data)
    }
  } catch (error) {
    console.log('Error fetching Wikipedia content', error)
  }
}

// Function to display Wikipedia content
function displayWikipediaContent(data) {
  const contentContainer = document.getElementById('content-container')

  if (data.title && data.extract) {
    // Display content with typing animation
    const title = document.createElement('h2')
    title.classList.add('typing-animation')
    title.classList.add('wiki-title')
    contentContainer.appendChild(title)

    const extract = document.createElement('p')
    extract.classList.add('wiki-info')
    extract.classList.add('typing-animation-two')
    contentContainer.appendChild(extract)

    // Start typing animation for title
    animateTyping(data.title, title)

    // Start typing animation for extract
    animateTyping(data.extract, extract)
  } else {
    // Display custom message when content is not found
    const notFoundMessage = document.createElement('h6')
    notFoundMessage.classList.add('opacity-animation')
    contentContainer.appendChild(notFoundMessage)
    notFoundMessage.textContent =
      'სამწუხაროდ თქვენი მოთხოვნა ვერ დამუშავდა. შეამოწმეთ რამდენად სწორად დაწერეთ სიტყვა, ან იქნებ სხვა შესატყვისი გამოიყენოთ?'

    // Start typing animation for title
    // animateTyping(notFoundMessage.textContent, notFoundMessage)
  }
}

// Function to animate typing effect
function animateTyping(text, element) {
  let counter = 0
  const typingInterval = setInterval(() => {
    element.textContent += text[counter]
    counter++
    if (counter === text.length) {
      clearInterval(typingInterval)
    }
  }, 25)
}

const searchTerm = document.getElementById('search-input')

// Search keydown
searchTerm.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    fetchWikipediaContent()
  }
})
