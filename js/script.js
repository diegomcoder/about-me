const computed_style = getComputedStyle(document.documentElement)
const project_containers = document.querySelectorAll('.project-container')
const mobile_menu_btns = document.querySelectorAll('.hamburger-menu-btns .nav-btn')
const mobile_menu_links = document.querySelectorAll('.mobile-navbar-list li')
const hamburger_container = document.querySelector('.hamburger-menu-btns')
const mobile_menu_list = document.querySelector('.mobile-menu-list')
const graphic_bars = document.querySelectorAll('.bar .level')
const ripple = document.querySelectorAll('.ripple')
const nav_buttons = document.querySelectorAll('.navbar-list li')
const video_background_frame = document.querySelector('.background-fill')
const underlay = document.querySelector('.underlay')
const navbar = document.querySelector('.navbar-section')
const hero_content = document.getElementById('hero-content')
const cursor = document.querySelector('.cursor')
const subhead = document.getElementById('description')
const hero = document.querySelector('.hero-section')
const about_me = document.querySelector('.aboutMe-section')
const skills = document.querySelector('.skills-section')
const projects = document.querySelector('.projects-section')
const goal = document.querySelector('.goal-section')
const contact = document.querySelector('.contact-section')
const subheads = ['desenvolvedor web front-end', 'amante da tecnologia', 'encantado por design e animação', 'prazer', 'sou o Diego', 'bem vindo ao meu site']
let viewport = window.innerHeight
let which_subhead = 0
let char_index = 1
let fill = true
let change_active_nav_link_by_click = false
let span_with_class_square_percent_already_removed = true
nav_buttons[0].classList.add('active-nav')

if (window.innerWidth > 600) {
    navbar.style.top = '10px'
}

autoTyping()

graphAnimation('toAdd')
graphAnimation('toRemove')

// CURSOR BLINK
setInterval(() => {
    description.style.setProperty("--cursor-clr", null)
    const colored_cursor = computed_style.getPropertyValue('--main-clr-light')
    setTimeout(() => description.style.setProperty("--cursor-clr", `${colored_cursor}`), 500)
}, 1000)

// NAVBAR MOBILE BUTTONS TOGGLE
function toggleMobileMenuOpenClass() {
    hamburger_container.classList.toggle('mobile-menu-open')
    mobile_menu_list.classList.toggle('mobile-menu-open')
}
mobile_menu_btns.forEach((btn) => btn.addEventListener('click', () => {
    toggleMobileMenuOpenClass()
}))
mobile_menu_links.forEach((mb_link) => mb_link.addEventListener('click', () => {
    toggleMobileMenuOpenClass()
}))

window.addEventListener('resize', () => {
    // display full navbar in medium screen

    if (window.scrollY >= viewport && window.innerWidth > 850 && window.innerWidth > 600) {
        navbar.style.width = '100%'
        navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
        navbar.style.backgroundImage = 'unset'
        document.querySelectorAll('.navbar-list li a').forEach((a) => {
            a.style.color = 'white'
        })
        navbar.style.top = '0'
    } else if (window.innerWidth > 850 && window.innerWidth > 600) {
        navbar.style.backgroundColor = null
        navbar.style.width = null
        navbar.style.backgroundImage = null
        document.querySelectorAll('.navbar-list li a:not(.active-nav)').forEach((a) => {
            a.style.color = 'initial'
        })
        navbar.style.top = '10px'
    } else if (window.innerWidth < 850 && window.innerWidth > 600) {
        navbar.style.width = '100%'
        navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
        navbar.style.backgroundImage = 'unset'
        document.querySelectorAll('.navbar-list li a').forEach((a) => {
            a.style.color = 'white'
        })
        navbar.style.top = '0'
    } else if (window.innerWidth <= 600) {
        navbar.style = null
    }
})

// display full navbar in medium screen
if (window.innerWidth < 850 && window.innerWidth > 600) {
    navbar.style.width = '100%'
    navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
    navbar.style.backgroundImage = 'unset'
    document.querySelectorAll('.navbar-list li a').forEach((a) => {
        a.style.color = 'white'
    })
    navbar.style.top = '0'
}

// SCROLL EVENT LISTENER
window.addEventListener('scroll', () => {

    // Background Paralax
    if (window.scrollY < viewport + 10) {
        underlay.style.top = Math.ceil(-(window.scrollY / 4)) + 'px';
        underlay.style.filter = `blur(${Math.ceil((window.scrollY / 110))}px)`;
        hero_content.style.marginTop = Math.ceil(-(window.scrollY / 1)) + 'px';
    } else {
        underlay.style.top = '0px';
        underlay.style.filter = `blur(5px)`;
    }

    // Navbar Section
    if (window.scrollY >= viewport && window.innerWidth > 850 && window.innerWidth > 600) {
        navbar.style.width = '100%'
        navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
        navbar.style.backgroundImage = 'unset'
        document.querySelectorAll('.navbar-list li').forEach((a) => {
            a.style.color = computed_style.getPropertyValue('--main-clr-light')
        })
        navbar.style.top = '0'
    } else if (window.innerWidth > 850 && window.innerWidth > 600) {
        navbar.style = null
        document.querySelectorAll('.navbar-list li:not(.active-nav)').forEach((a) => {
            a.style.color = 'initial'
        })
        navbar.style.top = '10px'
    }


    // Change active when scrolling
    if (change_active_nav_link_by_click === false) {
        if (hero.getBoundingClientRect().top >= 450 * -1) {
            nav_buttons.forEach((a) => a.classList.remove('active-nav'))
            nav_buttons[0].classList.add('active-nav')
            nav_buttons[0].style.color = '#fff'
        }
        if (about_me.getBoundingClientRect().top <= 250 && about_me.getBoundingClientRect().top >= 350 * -1) {
            nav_buttons.forEach((a) => a.classList.remove('active-nav'))
            nav_buttons[1].classList.add('active-nav')
            nav_buttons[1].style.color = '#fff'
            graphAnimation('toRemove')
        }
        if (skills.getBoundingClientRect().top <= 250 && skills.getBoundingClientRect().top >= 350 * -1) {
            nav_buttons.forEach((a) => a.classList.remove('active-nav'))
            nav_buttons[2].classList.add('active-nav')
            nav_buttons[2].style.color = '#fff'
            graphAnimation('toAdd')
        }
        if (projects.getBoundingClientRect().top <= 250 && projects.getBoundingClientRect().top >= 350 * -1) {
            nav_buttons.forEach((a) => a.classList.remove('active-nav'))
            nav_buttons[3].classList.add('active-nav')
            nav_buttons[3].style.color = '#fff'
            graphAnimation('toRemove')
        }
        if (goal.getBoundingClientRect().top <= 250 && goal.getBoundingClientRect().top >= 350 * -1) {
            nav_buttons.forEach((a) => a.classList.remove('active-nav'))
            nav_buttons[4].classList.add('active-nav')
            nav_buttons[4].style.color = '#fff'
        }
        if (contact.getBoundingClientRect().top <= 250 && contact.getBoundingClientRect().top >= 50 * -1) {
            nav_buttons.forEach((a) => a.classList.remove('active-nav'))
            nav_buttons[5].classList.add('active-nav')
            nav_buttons[5].style.color = '#fff'
        }
    }
})


// AUTO TYPING SUBHEAD
function autoTyping() {
    if (fill === true) {
        char_index++
    } else {
        char_index--
    }

    // delay calling the function at the end of the string
    if (char_index == subheads[which_subhead].length) {
        let mseconds = subheads[which_subhead].length * 100
        setTimeout(autoTyping, mseconds)
    } else {
        setTimeout(autoTyping, 100)
    }

    // slice subhead by the char_index number
    subhead.innerText = subheads[which_subhead].slice(0, char_index)

    // change to the next subhead in subheads array
    if (fill === false && char_index === 1) {
        which_subhead++
    }

    // change to the first subhead in the subheads array
    if (fill === false && which_subhead === subheads.length) {
        which_subhead = 0
    }

    // decide to fill or delete automatically
    if (char_index == subheads[which_subhead].length) {
        fill = false
    } else if (char_index === 1) {
        fill = true
    }
}

// NAVBAR LINKS ACTIVE EFFECT
nav_buttons.forEach((a) => {
    a.addEventListener('click', function () {
        if (window.innerWidth > 600) {
            change_active_nav_link_by_click = true
            setTimeout(() => {
                change_active_nav_link_by_click = false
                graphAnimation('toAdd')
            }, 1000)
            nav_buttons.forEach((a) => a.classList.remove('active-nav'))
            this.classList.add('active-nav')

            let section_position = document.getElementById(`${this.dataset.navlink}`).offsetTop
            window.scrollTo(0, section_position)
        }
    })
})

mobile_menu_links.forEach((a) => {
    a.addEventListener('click', function () {
        change_active_nav_link_by_click = true
        setTimeout(() => {
            change_active_nav_link_by_click = false
            graphAnimation('toAdd')
        }, 1000)
        nav_buttons.forEach((a) => a.classList.remove('active-nav'))
        this.classList.add('active-nav')

        let section_position = document.getElementById(`${this.dataset.navlink}`).offsetTop
        window.scrollTo(0, section_position)
    })
})




// RIPPLE EFFECT
// event listener
ripple.forEach(section => {
    section.addEventListener('click', function (a) {
        toRipple(a, this)
    })
})

// function
function toRipple(e, thisSection) {
    const xInside = e.clientX
    const yInside = e.clientY - e.target.getBoundingClientRect().top
    const circle = document.createElement('span')

    const color = thisSection.dataset.ripple

    circle.classList.add(`${color}`)
    circle.style.top = yInside + 'px'
    circle.style.left = xInside + 'px'

    thisSection.appendChild(circle)
    setTimeout(() => circle.remove(), 500)
}

// GRAPH ANIMATION
// fill percentage
function graphAnimation(toAddOrToRemove) {
    if (toAddOrToRemove === 'toRemove' && !span_with_class_square_percent_already_removed) {
        graphic_bars.forEach((bar) => {
            bar.innerHTML = "<span class='square-percent'>0%</span>"
            bar.style.width = '13%'
            span_with_class_square_percent_already_removed = true
        })

    } else if (toAddOrToRemove === 'toAdd' && span_with_class_square_percent_already_removed) {
        graphic_bars.forEach((bar) => {
            const square_percent = document.createElement('span')
            const percent = bar.dataset.percent

            bar.innerHTML = ""
            square_percent.classList.remove('square-percent')
            square_percent.classList.add('square-percent')
            square_percent.textContent = percent
            bar.appendChild(square_percent)
            bar.style.width = percent
            span_with_class_square_percent_already_removed = false
        })
    }
}