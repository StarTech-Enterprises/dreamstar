/**
* Apply JS to mainHeaderShrink
**/

"use strict";
(function mainHeaderShrink() {

    let didScroll;
    let didResize;
    let lastScrollTop = 0;

    let docScroll = 0;
    let pageWidth = 0;
    let pagePrimary = document.getElementById('page-primary').textContent;
    let pageLayout = document.getElementById('page-layout').textContent;
    let pageCategory = document.getElementById('page-category').textContent;

    let mainHeader = document.getElementsByClassName('main-header');
    let navbarButtons = document.getElementsByClassName('primary-nav__item');
    let navbarButtonCurrent = document.getElementsByClassName("primary-nav__item--current")[0].firstElementChild;
    let primaryNavLinks = document.getElementsByClassName('primary-nav__link');
    let primaryNavHovers = document.getElementsByClassName('primary-nav__link');
    let sideBarNavButton = document.getElementsByClassName('header-sidebar-nav');
    let siteHeader = document.getElementsByClassName('site-header');
    let siteHeaderLogo = document.getElementsByClassName('site-header__logo');
    let siteAltLogo = document.getElementsByClassName('overlay');
    let secondaryHeader = document.getElementsByClassName('secondary-header');
    let verticalHeight;


    // Set height at which to hide navbar - this will depend on the document type
    if(pageLayout == "home") {
        verticalHeight = 110;

        // When the user scrolls the page, execute navbarEffect
        window.addEventListener("scroll", function () {
            didScroll = true;
        }, false);

        // When window is resized, execute navbarEffect
        window.addEventListener("resize", function () {
            didResize = true;
        }, false);

        // Set Page Width
        pageWidth = document.documentElement.clientWidth;

        // Run function every 250 ms - should improve browser performance
        setInterval(function() {
            if (didScroll || didResize || pageWidth <= 1250) {
                navbarEffect ();
                didScroll = false;
                didResize = false;
            }
        }, 250);

        let navbarEffect = function () {
            // When the user scrolls
            docScroll =  document.documentElement.scrollTop;
            pageWidth = document.documentElement.clientWidth;

            for (let i = 0; i < primaryNavHovers.length; i++){
                primaryNavHovers[i].classList.remove('primary-nav__hover1','primary-nav__hover2');
            }
            
            if(docScroll > lastScrollTop && docScroll > verticalHeight || pageWidth <= 1250){

                for (let i = 0; i < navbarButtons.length; i++){
                    navbarButtons[i].style.fontSize = "1.4rem";
                }

                for (let i = 0; i < primaryNavLinks.length; i++){
                    primaryNavLinks[i].style.color = "black";
                }

                navbarButtonCurrent.style.borderBottom = "0.2rem solid black";
                for (let i = 0; i < primaryNavHovers.length; i++){
                    primaryNavHovers[i].classList.add('primary-nav__hover2');
                }

                mainHeader[0].style.height = "5.0rem";
                mainHeader[0].style.background = "white";

                siteHeaderLogo[0].style.filter = "invert(1)"
                siteAltLogo[0].style.display = "none";
                sideBarNavButton[0].style.color = "black";

                secondaryHeader[0].style.height = "0.0rem";
                secondaryHeader[0].style.opacity = "0";
                secondaryHeader[0].style.borderBottom = "0px";

            } else if(pageWidth > 1250 && docScroll + screen.height < document.body.clientHeight && docScroll <= verticalHeight - 30 )  {

                for (let i = 0; i < navbarButtons.length; i++){
                    navbarButtons[i].style.fontSize = "1.6rem";
                }

                for (let i = 0; i < primaryNavLinks.length; i++){
                    primaryNavLinks[i].style.color = "white";
                }

                navbarButtonCurrent.style.borderBottom = "0.2rem solid white";
                for (let i = 0; i < primaryNavHovers.length; i++){
                    primaryNavHovers[i].classList.add('primary-nav__hover1');
                }

                mainHeader[0].style.height = "7.6rem";
                if (pagePrimary == "Industry" && pageCategory =="Film & TV Drama"){
                    mainHeader[0].style.background = "rgb(0, 201, 0)";
                } else if(pagePrimary == "Industry"){
                    mainHeader[0].style.background = "#ba01ff";
                }
                else if(pagePrimary == "Insight"){
                    mainHeader[0].style.background = "#fab300";
                }
                else {
                    mainHeader[0].style.background = "#ff004c";
                }

                siteHeaderLogo[0].style.filter = "invert(0)"
                siteAltLogo[0].style.display = "block";
                sideBarNavButton[0].style.color = "white";

                secondaryHeader[0].style.height = "4.5rem";
                secondaryHeader[0].style.opacity = "1";
                secondaryHeader[0].style.borderBottom = "1px solid #eee";
            }
            else if(pageWidth > 1250 && docScroll + screen.height - 30 < document.body.clientHeight)  {
                secondaryHeader[0].style.height = "4.5rem";
                secondaryHeader[0].style.opacity = "1";
                secondaryHeader[0].style.borderBottom = "1px solid #d6d6d6";
            }

            lastScrollTop = docScroll;
        };

    } else if (pageLayout == "docs") {
        siteHeader[0].style.position = 'relative';

        // When window is resized, execute navbarEffect
          window.addEventListener("resize", function () {
            didResize = true;
        }, false);

        // Run function every 250 ms - should improve browser performance
        setInterval(function() {
            if (didResize) {
                navbarEffect ();
                didResize = false;
            }
        }, 250);

        let navbarEffect = function () {
            pageWidth = document.documentElement.clientWidth;
            
            if(pageWidth <= 1250){
                siteAltLogo[0].style.display = "none";
            } else if(pageWidth > 1250){
                siteAltLogo[0].style.display = "block";
            }
        };
    }

})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let mainHeaderShrink;
document.addEventListener('DOMContentLoaded', mainHeaderShrink);    