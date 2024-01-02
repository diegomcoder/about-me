const interface={computedStyle:getComputedStyle(document.documentElement),mobileBtn:document.querySelector(".hamburger-button"),navbar:document.querySelector("nav"),navLinks:document.querySelector(".nav-links"),heroContent:document.querySelector("#home .container"),dynamicSubhead:document.getElementById("dynamic-subhead"),sections:document.getElementsByClassName("section"),skillsSection:document.querySelector("#skills"),skillsList:document.querySelector(".skillsList"),graphicBars:document.querySelectorAll(".bar-level")},state={language:"Pt-Br",mobileViewing:!1,sections:{},visibleSection:"home",navbarColor:"transparent",currentSubhead:0,graphBarsLoaded:!1},subheads=["engenheiro de software em formação","desenvolvedor web Java & Python","seja bem vindo ao meu website"],handlers={resize(){state.mobileViewing=innerWidth<768,state.mobileViewing||(subroutines.mobileMenu.close(),subroutines.navbar.setColor(),subroutines.removeClasses(interface.skillsList.children,"active-description"))},click({target:e}){const t=Array.from(e.classList);t.includes("skill")?subroutines.skillDescription.toggle(e):t.includes("hamburger-button")?subroutines.mobileMenu.toggle():t.includes("nav-link")&&(subroutines.mobileMenu.close(),subroutines.goToSection(e))},pageScroll(){subroutines.changeCurrentSection(),subroutines.navbar.changeActiveLink(),subroutines.navbar.setColor()}},subroutines={loadSections(){state.sections=Array.from(interface.sections)},mobileMenu:{toggle(){interface.navLinks.classList.toggle("active"),interface.mobileBtn.classList.toggle("crossed")},close(){interface.navLinks.classList.remove("active"),interface.mobileBtn.classList.remove("crossed")}},navbar:{setColor(){if("home"!=state.visibleSection){const e=interface.computedStyle.getPropertyValue("--color-dark-100");interface.navbar.style.setProperty("--navbar-color",e)}else interface.navbar.style.setProperty("--navbar-color",void 0)},changeNavIndicator(){if(!activeLinkChangable){const e=Math.floor(innerHeight/3);allSections.forEach(((t,s)=>{const{top:n,bottom:i}=t.getBoundingClientRect();n<=e&&i>=-e&&(removeNavIndicators(),addNavIndicators(navBtns[s]),graphAnimation("skills"===t.id?"toAdd":"toRemove"))}))}},changeActiveLink(){subroutines.removeClasses(interface.navLinks.querySelectorAll(".nav-link"),"active"),document.querySelector(`[data-section-id="${state.visibleSection}"]`).setAttribute("class","nav-link active")}},subhead:{blinkCursor(){const e=interface.computedStyle.getPropertyValue("--color-light-100");setInterval((()=>{interface.dynamicSubhead.style.setProperty("--cursor-color",null),setTimeout((()=>interface.dynamicSubhead.style.setProperty("--cursor-color",`${e}`)),500)}),1e3)},autotype(){let e,t=0,s=!1;!function n(){e&&clearInterval(e),e=setInterval((()=>{if(state.currentSubhead===subheads.length&&(state.currentSubhead=0),interface.dynamicSubhead.innerText=subheads[state.currentSubhead].slice(0,t),0==t&&s)s=!1,state.currentSubhead++,clearInterval(e),n();else if(t>=subheads[state.currentSubhead].length){s=!0,clearInterval(e);const t=30*subheads[state.currentSubhead].length+1300;setTimeout(n,t)}s?t--:t++}),50)}()}},changeCurrentSection(){scrollY<state.sections[1].offsetTop-innerHeight/2?state.visibleSection="home":scrollY<state.sections[2].offsetTop-innerHeight/2?state.visibleSection="about":scrollY<state.sections[3].offsetTop-innerHeight/2?(state.visibleSection="skills",subroutines.graphAnimation.fillGraphs()):scrollY<state.sections[4].offsetTop-innerHeight/2?state.visibleSection="projects":state.visibleSection="contact"},skillDescription:{toggle(e){subroutines.removeClasses(interface.skillsList.children,"active-description",e),state.mobileViewing&&e.classList.toggle("active-description")}},graphAnimation:{fillGraphs(){state.graphBarsLoaded||(Array.from(interface.graphicBars).forEach((e=>{const t=e.dataset.percentage;e.style.setProperty("--percentage",t+"%")})),state.graphBarsLoaded=!0)}},removeClasses(e,t,s=null){for(let n=0;n<e.length;n++)s!==e[n]&&e[n].classList.remove(t)},goToSection(e){const t=e.dataset.sectionId,s=document.getElementById(t);scrollTo({top:s.offsetTop,left:0,behavior:"smooth"})}},loadWebsite=()=>{addEventListener("resize",handlers.resize),addEventListener("click",handlers.click),addEventListener("scroll",handlers.pageScroll),subroutines.loadSections(),state.mobileViewing=innerWidth<768,subroutines.subhead.blinkCursor(),subroutines.subhead.autotype()};addEventListener("resize",handlers.resize),addEventListener("click",handlers.click),addEventListener("scroll",handlers.pageScroll),subroutines.loadSections(),state.mobileViewing=innerWidth<768,subroutines.subhead.blinkCursor(),subroutines.subhead.autotype();