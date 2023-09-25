const computedStyle = getComputedStyle(document.documentElement)
const projectContainers = document.querySelectorAll('.project-container')
const mobileMenuBtns = document.querySelector('.hamburger-menu-btns')
const mobileMenuLinks = document.querySelectorAll('.mobile-navbar-list li')
const mobileNavbarList = document.querySelectorAll('.mobile-navbar-list')
const hamburgerContainer = document.querySelector('.hamburger-menu-btns')
const mobileMenuList = document.querySelector('.mobile-menu-list')
const graphicBars = document.querySelectorAll('.bar .level')
const ripple = document.querySelectorAll('.ripple')
const navBtns = document.querySelectorAll('.navbar-list li')
const videoBgFrame = document.querySelector('.background-fill')
const underlay = document.querySelector('.underlay')
const navbar = document.querySelector('.navbar-section')
const heroContent = document.getElementById('hero-content')
const cursor = document.querySelector('.cursor')
const subhead = document.getElementById('description')
const allSections = document.querySelectorAll(".section")


// NEW CODE
// Object Literal Notation
const startWebsite = {
    mobileViewing: true,
	visibleSection: "home",
	navbarColor: "transparent",
	subhead: {
		current: null,
		list: [
            'engenheiro de software em formação',
            'desenvolvedor web Java & Python',
            'seja bem vindo ao meu website'
		]
	}
}
//

let which_subhead = 0
let charIdx = 1
let fill = true
let activeLinkChangable = false
let squarePercentRemoved = true
navBtns[0].classList.add('active-nav')

if (window.innerWidth > 600) {
    navbar.style.top = '10px'
}

autoTyping()

graphAnimation('toAdd')
graphAnimation('toRemove')

// CURSOR BLINK
setInterval(() => {
    description.style.setProperty("--cursor-clr", null)
    const colored_cursor = computedStyle.getPropertyValue('--main-clr-light')
    setTimeout(() => description.style.setProperty("--cursor-clr", `${colored_cursor}`), 500)
}, 1000)

// NAVBAR MOBILE BUTTONS TOGGLE
function toggleMobileMenu() {
    hamburgerContainer.classList.toggle('mobile-menu-open')
    mobileMenuList.classList.toggle('mobile-menu-open')
}

window.addEventListener('resize', () => {
    const links = document.querySelectorAll('.navbar-list li a');
    if (innerWidth > 850) {
        if (scrollY >= innerHeight) {
            setNavbarStyles('100%', computedStyle.getPropertyValue('--transparent-clr-dark'), 'unset', 'white', '0');
        } else {
            setNavbarStyles(null, null, null, 'initial', '10px');
        }
    } else if (innerWidth > 600) {
        setNavbarStyles('100%', computedStyle.getPropertyValue('--transparent-clr-dark'), 'unset', 'white', '0');
    } else {
        navbar.style = null;
    }

    function setNavbarStyles(width, backgroundColor, backgroundImage, linkColor, top) {
        navbar.style.width = width;
        navbar.style.backgroundColor = backgroundColor;
        navbar.style.backgroundImage = backgroundImage;
        links.forEach((a) => {
            a.style.color = linkColor;
        });
        navbar.style.top = top;
    }
});

// display full navbar in medium screen
if (innerWidth < 850 && innerWidth > 600) {
    navbar.style.width = '100%'
    navbar.style.backgroundColor = computedStyle.getPropertyValue('--transparent-clr-dark')
    navbar.style.backgroundImage = 'unset'
    document.querySelectorAll('.navbar-list li a').forEach((a) => {
        a.style.color = 'white'
    })
    navbar.style.top = '0'
}

const applyParalax = () => {
	const noScrollPage = scrollY < innerHeight + 10

	if (noScrollPage) {
		underlay.style.top = Math.ceil(-(scrollY / 4)) + 'px';
        underlay.style.filter = `blur(${Math.ceil((scrollY / 110))}px)`;
        heroContent.style.marginTop = Math.ceil(-(scrollY / 1)) + 'px';
		return
	}

	underlay.style.top = '0px';
	underlay.style.filter = `blur(5px)`;
}

const changeNavSize = () => {
    const aboutSectionVisible = scrollY >= innerHeight;
    const smallScreen = innerWidth > 600;
    const mediumScreen = innerWidth > 850;

    if (aboutSectionVisible && smallScreen) {
        setNavbarStyles('100%', computedStyle.getPropertyValue('--transparent-clr-dark'), 'unset', computedStyle.getPropertyValue('--main-clr-light'), '0');
    } else if (mediumScreen) {
        setNavbarStyles(null, null, null, '#fff', '10px');
    }

    function setNavbarStyles(width, backgroundColor, backgroundImage, linkColor, top) {
        navbar.style.width = width;
        navbar.style.backgroundColor = backgroundColor;
        navbar.style.backgroundImage = backgroundImage;
        document.querySelectorAll('.navbar-list li').forEach((a) => {
            a.style.color = linkColor;
        });
        navbar.style.top = top;
    }
};

const removeNavIndicators = () => {
	navBtns.forEach((a) => a.classList.remove('active-nav'))
}

const addNavIndicators = (to) => {
	to.classList.add('active-nav')
}

const changeNavIndicator = () => {
    if (!activeLinkChangable) {
        const limit = Math.floor(innerHeight / 3);
        allSections.forEach((section, index) => {
            const { top, bottom } = section.getBoundingClientRect();
            if (top <= limit && bottom >= -limit) {
                removeNavIndicators();
                addNavIndicators(navBtns[index]);
                graphAnimation(section.id === "skills" ? 'toAdd' : 'toRemove');
            }
        });
    }
};

// AUTO TYPING SUBHEAD
function autoTyping() {
    fill ? charIdx++ : charIdx--;
    let mseconds = (charIdx == startWebsite.subhead.list[which_subhead].length) ? startWebsite.subhead.list[which_subhead].length * 100 : 50;
    setTimeout(autoTyping, mseconds);
    subhead.innerText = startWebsite.subhead.list[which_subhead].slice(0, charIdx);

    if (!fill && charIdx === 1) {
        which_subhead = (which_subhead === startWebsite.subhead.list.length - 1) ? 0 : which_subhead + 1;
    }

    fill = (charIdx == startWebsite.subhead.list[which_subhead].length) ? false : (charIdx === 1) ? true : fill;
}

// NAVBAR LINKS ACTIVE EFFECT
navBtns.forEach((a) => {
    a.addEventListener('click', function () {
        if (innerWidth > 600) {
            activeLinkChangable = true
            setTimeout(() => {
                activeLinkChangable = false
                graphAnimation('toAdd')
            }, 1000)
            navBtns.forEach((a) => a.classList.remove('active-nav'))
            this.classList.add('active-nav')

            let sectionPosition = document.getElementById(`${this.dataset.navlink}`).offsetTop
            scrollTo(0, sectionPosition)
        }
    })
})

mobileMenuLinks.forEach((a) => {
    a.addEventListener('click', function () {
        activeLinkChangable = true
        setTimeout(() => {
            activeLinkChangable = false
            graphAnimation('toAdd')
        }, 1000)
        navBtns.forEach((a) => a.classList.remove('active-nav'))
        this.classList.add('active-nav')

        let sectionPosition = document.getElementById(`${this.dataset.navlink}`).offsetTop
        scrollTo(0, sectionPosition)
    })
})

// RIPPLE EFFECT
ripple.forEach(section => {
    section.addEventListener('click', function (a) {
        toRipple(a, this)
    })
})

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
function graphAnimation(cmd) {
    graphicBars.forEach((bar) => {
        if (cmd === 'toRemove' && !squarePercentRemoved) {
            bar.innerHTML = "<span class='square-percent'>0%</span>";
            bar.style.width = '13%';
        } else if (cmd === 'toAdd' && squarePercentRemoved) {
            const squarePercent = document.createElement('span');
            squarePercent.className = 'square-percent';
            squarePercent.textContent = bar.dataset.percent;
            bar.innerHTML = "";
            bar.appendChild(squarePercent);
            bar.style.width = bar.dataset.percent;
        }
    });
    squarePercentRemoved = !squarePercentRemoved;
}

// EVENT LISTENERS
mobileMenuBtns.addEventListener('click', ({ target }) => {
	const clickedElement = target.tagName

	if (clickedElement === "svg" || clickedElement === "path")
    	toggleMobileMenu()
})

mobileMenuList.addEventListener("click", ({ target }) => {
	const clickedElement = target.tagName

	if (clickedElement === "LI")
		toggleMobileMenu()
})

window.addEventListener('scroll', () => {
	applyParalax()
    changeNavSize()
	changeNavIndicator()
})