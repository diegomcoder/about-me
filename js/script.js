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


const state = {
    language: "Pt-Br", // not used
    mobileViewing: false,
    visibleSection: "home", // not used
    navbarColor: "transparent",
    currentSubhead: 0
}

const subheads = [
    'engenheiro de software em formação',
    'desenvolvedor web Java & Python',
    'seja bem vindo ao meu website'
]

const interface = {
    computedStyle: getComputedStyle(document.documentElement),
    mobileBtn: document.querySelector(".hamburger-button"),
    navbar:document.querySelector("nav"),
    navLinks: document.querySelector(".nav-links"),
    dynamicSubhead: document.getElementById('dynamic-subhead'),
    sections: document.getElementsByClassName('section'),
    skillsSection: document.querySelector("#skills"),
    skillsList: document.querySelector(".skillsList")
}

const handlers = {

    resize() {
        state.mobileViewing = innerWidth < 768
        if (!state.mobileViewing) {
            subroutines.mobileMenu.close()
            subroutines.navbar.setColor()
            subroutines.removeClasses(interface.skillsList.children, "active-description")
        }
    },

    click({ target }) {
        const classesArray = Array.from(target.classList)

        if (classesArray.includes("skill")) {
            subroutines.skillDescription.toggle(target)
        }

        else if (classesArray.includes("hamburger-button")) {
            subroutines.mobileMenu.toggle()
        }

        else if (classesArray.includes("nav-link")) {
            subroutines.mobileMenu.close()
            subroutines.goToSection(target)
        }
    },

    pageScroll() {
        subroutines.changeCurrentSection()
        //subroutines.graphAnimation.start()// not defined
    },

    mouseMove(event) {
        //console.log(event.clientX, event.clientY, event.target);
    }
}

const subroutines = {

    mobileMenu: {
        toggle() {
            interface.navLinks.classList.toggle("active")
            interface.mobileBtn.classList.toggle("crossed")
        },

        close() {
            interface.navLinks.classList.remove('active')
            interface.mobileBtn.classList.remove('crossed')
        },
    },

    navbar: {
        setColor() {
            const color = interface.computedStyle.getPropertyValue('--color-dark-100')
            interface.navbar.style.setProperty("--navbar-color", color)
        },

        changeNavIndicator() {
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
        }
    },

    subhead: {

        blinkCursor() {
            const color = interface.computedStyle.getPropertyValue('--color-light-100')
            setInterval(() => {
                interface.dynamicSubhead.style.setProperty("--cursor-color", null)
                setTimeout(() => interface.dynamicSubhead.style.setProperty("--cursor-color", `${color}`), 500)
            }, 1000)
        },

        autotype() {
            let index = 0;
            let directionReverse = false;
            let interval;
        
            function writeAndDelete() {
                if (interval) clearInterval(interval);
                
                interval = setInterval(() => {
                    // if we exceed the size of the subhead list
                    if (state.currentSubhead === subheads.length) state.currentSubhead = 0

                    interface.dynamicSubhead.innerText = subheads[state.currentSubhead].slice(0, index);

                    // if we're at the beginning of the subhead
                    if (index == 0 && directionReverse) {
                        directionReverse = false;
                        state.currentSubhead++;
                        clearInterval(interval);
                        writeAndDelete();
                    }
        
                    // if we reach the end of the subhead
                    else if (index >= subheads[state.currentSubhead].length) {
                        directionReverse = true;
                        clearInterval(interval);
                        const delay = subheads[state.currentSubhead].length * 30 + 1300
                        setTimeout(writeAndDelete, delay);
                    }
        
                    directionReverse ? index-- : index++;

                }, 50);
            }
        
            writeAndDelete();
        },

        animate() {
            subroutines.subhead.blinkCursor()
            subroutines.subhead.autotype()
        },
    },

    changeCurrentSection() {
        if (!state.mobileViewing) {
            const heightLimit = Math.round(innerHeight / 4);

            Array.from(interface.sections).forEach((section, index) => {

                const { top, bottom } = section.getBoundingClientRect();

                if (top == 0)
                console.log('Yep', top, bottom)

                /*if (top <= heightLimit && bottom >= -heightLimit) {
                    console.log(index)
                    // removeNavIndicators();
                    // addNavIndicators(navBtns[index]);
                    // graphAnimation(section.id === "skills" ? 'toAdd' : 'toRemove');
                }*/
            });
        }
    },

    skillDescription: {
        toggle(clickedSkill) {
            subroutines.removeClasses(interface.skillsList.children, "active-description", clickedSkill)

            if (state.mobileViewing)
                clickedSkill.classList.toggle("active-description")
        },
    },

    graphAnimation: {
        start() { }
    },

    removeClasses(elements, className, notFrom = null) {
        for (let i = 0; i < elements.length; i++) {
            if (notFrom === elements[i]) continue
            elements[i].classList.remove(className)
        }
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

}

const loadWebsite = () => {
    addEventListener("resize", handlers.resize)
    addEventListener("click", handlers.click)
    addEventListener("scroll", handlers.pageScroll)
    subroutines.subhead.animate()
    state.mobileViewing = innerWidth < 768
    //addEventListener("mousemove", event => main.handlers.mouseMove(event))
}

loadWebsite()

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