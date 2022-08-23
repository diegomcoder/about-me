const computed_style = getComputedStyle(document.documentElement)
const project_containers = document.querySelectorAll('.project-container')
const mobile_menu_btns = document.querySelector('.hamburger-menu-btns')
const mobile_menu_links = document.querySelectorAll('.mobile-navbar-list li')
const mobile_navbar_list = document.querySelectorAll('.mobile-navbar-list')
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
const allSections = document.querySelectorAll(".section")

const subheads = ['desenvolvedor web front-end', 'amante da tecnologia', 'encantado por design e animação', 'prazer', 'sou o Diego', 'bem vindo ao meu site']

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

window.addEventListener('resize', () => {
    // display full navbar in medium screen

    if (scrollY >= innerHeight && innerWidth > 850 && innerWidth > 600) {
        navbar.style.width = '100%'
        navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
        navbar.style.backgroundImage = 'unset'
        document.querySelectorAll('.navbar-list li a').forEach((a) => {
            a.style.color = 'white'
        })
        navbar.style.top = '0'
    } else if (innerWidth > 850 && innerWidth > 600) {
        navbar.style.backgroundColor = null
        navbar.style.width = null
        navbar.style.backgroundImage = null
        document.querySelectorAll('.navbar-list li a:not(.active-nav)').forEach((a) => {
            a.style.color = 'initial'
        })
        navbar.style.top = '10px'
    } else if (innerWidth < 850 && innerWidth > 600) {
        navbar.style.width = '100%'
        navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
        navbar.style.backgroundImage = 'unset'
        document.querySelectorAll('.navbar-list li a').forEach((a) => {
            a.style.color = 'white'
        })
        navbar.style.top = '0'
    } else if (innerWidth <= 600) {
        navbar.style = null
    }
})

// display full navbar in medium screen
if (innerWidth < 850 && innerWidth > 600) {
    navbar.style.width = '100%'
    navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
    navbar.style.backgroundImage = 'unset'
    document.querySelectorAll('.navbar-list li a').forEach((a) => {
        a.style.color = 'white'
    })
    navbar.style.top = '0'
}

const applyParalaxEffect = () => {
	const pageWithNoScroll = scrollY < innerHeight + 10

	if (pageWithNoScroll) {
		underlay.style.top = Math.ceil(-(scrollY / 4)) + 'px';
        underlay.style.filter = `blur(${Math.ceil((scrollY / 110))}px)`;
        hero_content.style.marginTop = Math.ceil(-(scrollY / 1)) + 'px';
		return
	}

	underlay.style.top = '0px';
	underlay.style.filter = `blur(5px)`;
}

const  changeNavBarSize = () => {
	const aboutSectionOrSectionsBellowAreVisible = scrollY >= innerHeight
	const isSmallScreen = innerWidth > 600
	const isMediumScreen = innerWidth > 850

    if (aboutSectionOrSectionsBellowAreVisible && isSmallScreen) {
        navbar.style.width = '100%'
        navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
        navbar.style.backgroundImage = 'unset'

        document.querySelectorAll('.navbar-list li').forEach((a) => {
            a.style.color = computed_style.getPropertyValue('--main-clr-light')
        })

        navbar.style.top = '0'

    } else if (isMediumScreen) {
        navbar.style = null

        document.querySelectorAll('.navbar-list li:not(.active-nav)').forEach((a) => {
            a.style.color = '#fff'
        })

        navbar.style.top = '10px'
    }
}

const removeActiveNavbarIndicators = () => {
	nav_buttons.forEach((a) => a.classList.remove('active-nav'))
}

const addActiveNavbarIndicator = (to) => {
	to.classList.add('active-nav')
}

const changeActiveNavbarIndicator = () => {
    if (change_active_nav_link_by_click === false) {
		const marginTopLimmit = Math.floor(innerHeight / 3)
		const marginBottomLimmit = marginTopLimmit * -1

		allSections.forEach((section, index) => {
			if (section.getBoundingClientRect().top <= marginTopLimmit && section.getBoundingClientRect().bottom >= marginBottomLimmit) {
				removeActiveNavbarIndicators()
            	addActiveNavbarIndicator(nav_buttons[index])

				if (section.id === "skills") {
					return graphAnimation('toAdd')
				}
	
				graphAnimation('toRemove')
			}
		})
    }
}




// AUTO TYPING SUBHEAD
function autoTyping() {

    fill ? char_index++ : char_index--
    

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
        if (innerWidth > 600) {
            change_active_nav_link_by_click = true
            setTimeout(() => {
                change_active_nav_link_by_click = false
                graphAnimation('toAdd')
            }, 1000)
            nav_buttons.forEach((a) => a.classList.remove('active-nav'))
            this.classList.add('active-nav')

            let section_position = document.getElementById(`${this.dataset.navlink}`).offsetTop
            scrollTo(0, section_position)
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
        scrollTo(0, section_position)
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

// EVENT LISTENERS
mobile_menu_btns.addEventListener('click', ({ target }) => {
	const elementClicked = target.tagName

	if (elementClicked === "svg" || elementClicked === "path")
    	toggleMobileMenuOpenClass()
})

mobile_menu_list.addEventListener("click", ({ target }) => {
	const elementClicked = target.tagName

	if (elementClicked === "LI")
		toggleMobileMenuOpenClass()
})

window.addEventListener('scroll', () => {
	applyParalaxEffect()
    changeNavBarSize()
	changeActiveNavbarIndicator()
})