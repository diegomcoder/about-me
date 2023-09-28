const interface = {
    computedStyle: getComputedStyle(document.documentElement),
    mobileBtn: document.querySelector(".hamburger-button"),
    navbar: document.querySelector("nav"),
    navLinks: document.querySelector(".nav-links"),
    heroContent: document.querySelector("#home .container"),
    dynamicSubhead: document.getElementById('dynamic-subhead'),
    sections: document.getElementsByClassName('section'),
    skillsSection: document.querySelector("#skills"),
    skillsList: document.querySelector(".skillsList"),
    graphicBars: document.querySelectorAll(".bar-level")
}

const state = {
    language: "Pt-Br", // not used
    mobileViewing: false,
    sections: {},
    visibleSection: "home", // not used
    navbarColor: "transparent",
    currentSubhead: 0,
    graphBarsLoaded: false
}

const subheads = [
    'engenheiro de software em formação',
    'desenvolvedor web Java & Python',
    'seja bem vindo ao meu website'
]

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
        subroutines.navbar.changeActiveLink()
        subroutines.navbar.setColor()
        // subroutines.applyParalax()
    }
}

const subroutines = {

    loadSections() {
        state.sections = Array.from(interface.sections)
    },

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
            if (state.visibleSection != 'home') {
                const color = interface.computedStyle.getPropertyValue('--color-dark-100')
                interface.navbar.style.setProperty("--navbar-color", color)
            } else interface.navbar.style.setProperty('--navbar-color', undefined)
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
        },

        changeActiveLink() {
            subroutines.removeClasses(interface.navLinks.querySelectorAll('.nav-link'), 'active')
            document.querySelector(`[data-section-id="${state.visibleSection}"]`).setAttribute('class', 'nav-link active')
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
        }
    },

    changeCurrentSection() {
        if (scrollY < state.sections[1].offsetTop - (innerHeight / 2))
            state.visibleSection = 'home'

        else if (scrollY < state.sections[2].offsetTop - (innerHeight / 2))
            state.visibleSection = 'about'

        else if (scrollY < state.sections[3].offsetTop - (innerHeight / 2)) {
            state.visibleSection = 'skills'
            subroutines.graphAnimation.fillGraphs()
        }

        else if (scrollY < state.sections[4].offsetTop - (innerHeight / 2))
            state.visibleSection = 'projects'

        else
            state.visibleSection = 'contact'
    },

    skillDescription: {
        toggle(clickedSkill) {
            subroutines.removeClasses(interface.skillsList.children, "active-description", clickedSkill)

            if (state.mobileViewing)
                clickedSkill.classList.toggle("active-description")
        },
    },

    graphAnimation: {
        fillGraphs() {
            if (!state.graphBarsLoaded) {
                Array.from(interface.graphicBars).forEach(graphicBar => {
                    const percentage = graphicBar.dataset.percentage
                    graphicBar.style.setProperty("--percentage", percentage + '%')
                })
                state.graphBarsLoaded = true
            }
        },
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
    subroutines.loadSections()
    state.mobileViewing = innerWidth < 768
    subroutines.subhead.blinkCursor()
    subroutines.subhead.autotype()
}

loadWebsite()