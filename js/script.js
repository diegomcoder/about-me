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
const all_sections = document.querySelectorAll(".section")

const subheads = ['engenheiro de software em formação', 'desenvolvedor web Java & Python', 'futuro youtuber e gestor de mídias sociais', 'e mais um pouco rsrs', 'seja bem vindo ao meu website']

let which_subhead = 0
let char_index = 1
let fill = true
let change_active_link_by_click = false
let square_percent_removed = true
nav_buttons[0].classList.add('active-nav')

if (window.innerWidth > 600) {
    navbar.style.top = '10px'
}

auto_typing()

graph_animation('toAdd')
graph_animation('toRemove')

// CURSOR BLINK
setInterval(() => {
    description.style.setProperty("--cursor-clr", null)
    const colored_cursor = computed_style.getPropertyValue('--main-clr-light')
    setTimeout(() => description.style.setProperty("--cursor-clr", `${colored_cursor}`), 500)
}, 1000)

// NAVBAR MOBILE BUTTONS TOGGLE
function toggle_mobile_menu_open() {
    hamburger_container.classList.toggle('mobile-menu-open')
    mobile_menu_list.classList.toggle('mobile-menu-open')
}

window.addEventListener('resize', () => {
    // display full navbar in medium screen

    if (scrollY >= innerHeight && innerWidth > 850) {
        navbar.style.width = '100%'
        navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
        navbar.style.backgroundImage = 'unset'
        document.querySelectorAll('.navbar-list li a').forEach((a) => {
            a.style.color = 'white'
        })
        navbar.style.top = '0'
    } else if (innerWidth > 850) {
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

const apply_paralax_effect = () => {
	const page_with_no_scroll = scrollY < innerHeight + 10

	if (page_with_no_scroll) {
		underlay.style.top = Math.ceil(-(scrollY / 4)) + 'px';
        underlay.style.filter = `blur(${Math.ceil((scrollY / 110))}px)`;
        hero_content.style.marginTop = Math.ceil(-(scrollY / 1)) + 'px';
		return
	}

	underlay.style.top = '0px';
	underlay.style.filter = `blur(5px)`;
}

const change_navbar_size = () => {
	const about_section_or_bellow_visible = scrollY >= innerHeight
	const small_screen = innerWidth > 600
	const medium_screen = innerWidth > 850

    if (about_section_or_bellow_visible && small_screen) {
        navbar.style.width = '100%'
        navbar.style.backgroundColor = computed_style.getPropertyValue('--transparent-clr-dark')
        navbar.style.backgroundImage = 'unset'

        document.querySelectorAll('.navbar-list li').forEach((a) => {
            a.style.color = computed_style.getPropertyValue('--main-clr-light')
        })

        navbar.style.top = '0'

    } else if (medium_screen) {
        navbar.style = null

        document.querySelectorAll('.navbar-list li:not(.active-nav)').forEach((a) => {
            a.style.color = '#fff'
        })

        navbar.style.top = '10px'
    }
}

const remove_active_nav_indicators = () => {
	nav_buttons.forEach((a) => a.classList.remove('active-nav'))
}

const add_active_nav_indicator = (to) => {
	to.classList.add('active-nav')
}

const change_active_nav_indicator = () => {
    if (change_active_link_by_click === false) {
		const margin_top_limit = Math.floor(innerHeight / 3)
		const margin_bottom_limmit = margin_top_limit * -1

		all_sections.forEach((section, index) => {
			if (section.getBoundingClientRect().top <= margin_top_limit && section.getBoundingClientRect().bottom >= margin_bottom_limmit) {
				remove_active_nav_indicators()
            	add_active_nav_indicator(nav_buttons[index])

				if (section.id === "skills") {
					return graph_animation('toAdd')
				}
	
				graph_animation('toRemove')
			}
		})
    }
}




// AUTO TYPING SUBHEAD
function auto_typing() {

    fill ? char_index++ : char_index--

    // delay calling the function at the end of the string
    if (char_index == subheads[which_subhead].length) {
        let mseconds = subheads[which_subhead].length * 100
        setTimeout(auto_typing, mseconds)
    } else {
        setTimeout(auto_typing, 50)
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
            change_active_link_by_click = true
            setTimeout(() => {
                change_active_link_by_click = false
                graph_animation('toAdd')
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
        change_active_link_by_click = true
        setTimeout(() => {
            change_active_link_by_click = false
            graph_animation('toAdd')
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
        to_ripple(a, this)
    })
})

// function
function to_ripple(e, thisSection) {
    const x_inside = e.clientX
    const y_inside = e.clientY - e.target.getBoundingClientRect().top
    const circle = document.createElement('span')

    const color = thisSection.dataset.ripple

    circle.classList.add(`${color}`)
    circle.style.top = y_inside + 'px'
    circle.style.left = x_inside + 'px'

    thisSection.appendChild(circle)
    setTimeout(() => circle.remove(), 500)
}

// GRAPH ANIMATION
// fill percentage
function graph_animation(add_or_remove) {
    if (add_or_remove === 'toRemove' && !square_percent_removed) {
        graphic_bars.forEach((bar) => {
            bar.innerHTML = "<span class='square-percent'>0%</span>"
            bar.style.width = '13%'
            square_percent_removed = true
        })

    } else if (add_or_remove === 'toAdd' && square_percent_removed) {
        graphic_bars.forEach((bar) => {
            const square_percent = document.createElement('span')
            const percent = bar.dataset.percent

            bar.innerHTML = ""
            square_percent.classList.remove('square-percent')
            square_percent.classList.add('square-percent')
            square_percent.textContent = percent
            bar.appendChild(square_percent)
            bar.style.width = percent
            square_percent_removed = false
        })
    }
}

// EVENT LISTENERS
mobile_menu_btns.addEventListener('click', ({ target }) => {
	const clicked_element = target.tagName

	if (clicked_element === "svg" || clicked_element === "path")
    	toggle_mobile_menu_open()
})

mobile_menu_list.addEventListener("click", ({ target }) => {
	const clicked_element = target.tagName

	if (clicked_element === "LI")
		toggle_mobile_menu_open()
})

window.addEventListener('scroll', () => {
	apply_paralax_effect()
    change_navbar_size()
	change_active_nav_indicator()
})
