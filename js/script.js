/*const computedStyle = getComputedStyle(document.documentElement)
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
*/


// Object Literal Notation
const main = {
    mobileViewing: true,
    visibleSection: "home",
    navbarColor: "transparent",
    subhead: {
        current: 0,
        list: [
            'engenheiro de software em formação',
            'desenvolvedor web Java & Python',
            'seja bem vindo ao meu website'
        ]
    },

    skillsPercentages:
    {
        english: 67,
        javascript: 77,
        java: 36,
        css: 62,
        scss: 11,
        git: 36,
        github: 32,
        pyhton: 49,
    },

    interface:
    {
        mobileBtn: document.querySelector(".hamburger-button"),
        navLinks: document.querySelector(".nav-links"),
        skillsList: document.querySelector("#skills .graphs") /* replace .graphs for .skillsList */,
        allSkills: document.querySelectorAll(".skill"),
        skillsSection: document.querySelector("#skills"),
        dynamicSubhead: document.getElementById('dynamic-subhead')
    },

    toggleMobileMenu() {
        main.interface.navLinks.classList.toggle("active")
        main.interface.mobileBtn.classList.toggle("crossed")
    },

    goToSection(element) {
        const datasetValue = element.dataset.sectionId
        const section = document.getElementById(datasetValue)
        scrollTo({
            top: section.offsetTop,
            left: 0,
            behavior: "smooth"
        })
    },

    toggleSkillDescription(clickedSkill) {
        if (!main.mobileViewing) return main.removeClasses(main.interface.allSkills, "active-description")

        main.removeClasses(main.interface.allSkills, "active-description", clickedSkill)
        clickedSkill.classList.toggle("active-description")
    },

    closeMobileMenu() {
        main.interface.navLinks.classList.remove('active')
        main.interface.mobileBtn.classList.remove('crossed')
    },

    removeClasses(elements, className, notFrom = null) {
        for (let i = 0; i < elements.length; i++) {
            if (notFrom === elements[i]) continue
            elements[i].classList.remove(className)
        }
    },

    animateSubhead() {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--color-light-100')
        let type = true

        function blinkCursor() {
            setInterval(() => {
                main.interface.dynamicSubhead.style.setProperty("--cursor-clr", null)
                setTimeout(() => main.interface.dynamicSubhead.style.setProperty("--cursor-clr", `${color}`), 500)
            }, 1000)
        }

        function autoTyping() {
            let index = 0
            let type = index <= main.subhead.list[main.subhead.current].length

            function digitar() {
                // modify subhead
                main.interface.dynamicSubhead.innerText =
                main.subhead.list[main.subhead.current].slice(0, index)

                // if to type
                if (type) {
                    index++
                    if ()
                    type = index <= main.subhead.list[main.subhead.current].length
                }
                else {
                    index--
                    // if 
                    type = index == 0
                }

                // type = index === main.subhead.list[main.subhead.current].length
                
                setTimeout(digitar, 50)
            }

            digitar()

            function backspace() { }
        }

        blinkCursor()
        autoTyping()
    },



    autoTyping() {

        // Se a variável 'fill' for verdadeira, incrementa o índice do caractere, caso contrário, decrementa.
        fill ? charIdx++ : charIdx--;

        // Define 'mseconds' como o comprimento da string se o índice do caractere for igual ao comprimento da string, caso contrário, define como 50.
        let mseconds = (charIdx == main.subhead.list[which_subhead].length) ? main.subhead.list[which_subhead].length * 100 : 50;

        // Define um temporizador para chamar a função 'autoTyping' após 'mseconds'.
        setTimeout(autoTyping, mseconds);

        // Define o texto do subtítulo como uma fatia da string até o índice do caractere.
        subhead.innerText = main.subhead.list[which_subhead].slice(0, charIdx);

        // Se 'fill' for falso e o índice do caractere for 1, incrementa 'which_subhead' ou redefine para 0 se for o último subtítulo.
        if (!fill && charIdx === 1) {
            which_subhead = (which_subhead === main.subhead.list.length - 1) ? 0 : which_subhead + 1;
        }

        // Se o índice do caractere for igual ao comprimento da string, define 'fill' como falso. Se o índice do caractere for 1, define 'fill' como verdadeiro. Caso contrário, mantém o valor atual de 'fill'.
        fill = (charIdx == main.subhead.list[which_subhead].length) ? false : (charIdx === 1) ? true : fill;
    },

    handlers:
    {
        resize() {
            main.mobileViewing = innerWidth < 768
            if (!main.mobileViewing) {
                main.closeMobileMenu()
                removeClasses(main.interface.allSkills, "active-description")
            }
            // if (!main.mobileViewing) removeClasses(skills, "active-description")
        },

        click({ target }) {
            const classesArray = Array.from(target.classList)

            if (classesArray.includes("skill")) {
                main.toggleSkillDescription(target)
            }

            else if (classesArray.includes("hamburger-button")) {
                main.toggleMobileMenu()
            }

            else if (classesArray.includes("nav-link")) {
                main.closeMobileMenu()
                main.goToSection(target)
            }

            // attention
            //main.removeClasses(skillsList.children, "active-description") // not defined
        },

        pageScroll() {
            listenForGraphAnimation() // not defined
        },

        mouseMove(event) {
            //console.log(event.clientX, event.clientY, event.target);
        }
    },

    start() {
        //addEventListener("scroll", pageScroll)
        addEventListener("resize", main.handlers.resize)
        addEventListener("click", main.handlers.click)
        addEventListener("mousemove", event => main.handlers.mouseMove(event))
        main.animateSubhead()
        // main.autoTyping()
    }
}

main.start()


/*
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
    let mseconds = (charIdx == main.subhead.list[which_subhead].length) ? main.subhead.list[which_subhead].length * 100 : 50;
    setTimeout(autoTyping, mseconds);
    subhead.innerText = main.subhead.list[which_subhead].slice(0, charIdx);

    if (!fill && charIdx === 1) {
        which_subhead = (which_subhead === main.subhead.list.length - 1) ? 0 : which_subhead + 1;
    }

    fill = (charIdx == main.subhead.list[which_subhead].length) ? false : (charIdx === 1) ? true : fill;
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
*/