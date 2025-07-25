
let menubtn = document.getElementById("hamburger");
let sidebar = document.getElementById("sidebar");

menubtn.addEventListener("click",()=>{
    sidebar.classList.add("openSidebar");  
})

let menucloseBtn = document.getElementById("sidebar-close");
menucloseBtn.addEventListener("click",()=>{
    sidebar.classList.remove("openSidebar");
})

let navitem = document.querySelectorAll(".nav-item");
navitem.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        let target = document.getElementById(element.getAttribute('href').substring(1));
        target.scrollIntoView({
            behavior:'smooth',
        })
        sidebar.classList.remove("openSidebar");
    })
})

document.querySelectorAll(".downloadBrochure").forEach(element =>{
    element.addEventListener("click",(e)=>{
    e.preventDefault();
    sidebar.classList.remove("openSidebar");
})
})






// Side Form , popupform

    document.querySelector(".popupform-close").addEventListener("click",()=>{
            closepopupform();
    })
    document.querySelectorAll(".popup-trigger").forEach((element)=>{
        element.addEventListener("click",()=>{
            document.querySelector("#popupform-heading").innerHTML = element.getAttribute("data-heading");
            openpopupform();
        })
    })
    function closepopupform() {
            document.querySelector(".popupform-container").style.display = 'none';
            document.querySelector(".popup-overlay").style.display="none";
            body.classList.remove("noscroll");
    }
    function openpopupform(){
        document.querySelector(".popupform-container").style.display = 'block';
            document.querySelector(".popup-overlay").style.display="block";
            body.classList.add("noscroll")
    }
    window.addEventListener("load",()=>{
        setTimeout(() => {
            openpopupform();
        }, 4000);
    })











    setInterval(updateBannerCorousel,5000);

let bannerImage = document.querySelectorAll(".bannerImage");
let bannerContainer = document.querySelector(".banner");
let bannertransform = 0;
let bannercount = 0;
function updateBannerCorousel() {
    bannerContainer.style.transform =  `translateX(-${bannercount*100}%)`;
    bannercount+=1;
    if (bannercount>bannerImage.length-1){
        bannercount=0;
    }
}











    //overview JS
        let readMore = document.querySelectorAll(".readMoreBtn");
        let clampText = document.querySelectorAll(".clampText");
        readMore.forEach((element,index) => {
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                if (clampText[index].style.display=="block") {
                    clampText[index].style.display = "-webkit-box";
                    clampText[index].style.webkitLineClamp = "4";
                    element.innerHTML = "Read More <i class='ri-arrow-right-s-fill readmoreicon'></i>";
                    clampText[index].scrollIntoView({
                        behavior:'smooth',
                    })
                }
                else {
                    clampText[index].style.display = "block";
                    clampText[index].style.webkitLineClamp = "unset";
                    element.innerHTML = "Read Less <i class='ri-arrow-left-s-fill readmoreicon'></i>";
                }
        })
    })




    //Amenities JS
    let body = document.querySelector(".body");
    let amenitiesImg = document.querySelectorAll(".amenitiesCard img");
    let amenitiesSlide = document.querySelector(".amenitiesSlide");
    let amenitiesCount = amenitiesImg.length - 1;
    let account = 0;
    let amenitiesIndex = 0;
    let amenitiespopupopen = false;
    let amenitiesTrans = 0;
    let amenitiesCaurosel = setInterval(amenitiescauroselbegin, 5000);

    function getStep() {
        return window.innerWidth < 769 ? 105 : 35;
    }

    function maxSlide() {
        return window.innerWidth < 769 ? amenitiesCount + 1 : amenitiesCount - 1;
    }

    function updateSlide() {
        amenitiesSlide.style.transform = `translateX(-${account * getStep()}%)`;
    }

    function amenitiescauroselbegin() {
        updateSlide();
        account = (account + 1) % maxSlide();
    }

    amenitiesImg.forEach((el, idx) => {
        el.addEventListener("mouseenter", () => clearInterval(amenitiesCaurosel));
        el.addEventListener("mouseout", () => {
            if (!amenitiespopupopen) {
                amenitiesCaurosel = setInterval(amenitiescauroselbegin, 5000);
            }
        });
        el.addEventListener("click", () => {
            document.getElementById("amenities-overlay").style.display = "block";
            document.getElementById("amenities-popupimage").src = el.src;
            amenitiespopupopen = true;
            amenitiesIndex = idx;
            clearInterval(amenitiesCaurosel);
            body.classList.add("noscroll");
        });
    });

    document.querySelector(".amenities-popup-close").addEventListener("click", () => {
        document.getElementById("amenities-overlay").style.display = "none";
        document.getElementById("amenities-popupimage").src = "";
        amenitiespopupopen = false;
        amenitiesCaurosel = setInterval(amenitiescauroselbegin, 5000);
        body.classList.remove("noscroll");
    });

    document.getElementById("amenities_prevBtn").addEventListener("click", () => {
        amenitiesIndex = (amenitiesIndex - 1 + amenitiesImg.length) % amenitiesImg.length;
        document.getElementById("amenities-popupimage").src = amenitiesImg[amenitiesIndex].src;
    });

    document.getElementById("amenities_nextBtn").addEventListener("click", () => {
        amenitiesIndex = (amenitiesIndex + 1) % amenitiesImg.length;
        document.getElementById("amenities-popupimage").src = amenitiesImg[amenitiesIndex].src;
    });

    document.querySelector(".amenities_prevBtn").addEventListener("click", () => {
        account = (account - 1 + maxSlide()) % maxSlide();
        updateSlide();
        resetCarousel();
    });

    document.querySelector(".amenities_nextBtn").addEventListener("click", () => {
        account = (account + 1) % maxSlide();
        updateSlide();
        resetCarousel();
    });

    function resetCarousel() {
        clearInterval(amenitiesCaurosel);
        amenitiesCaurosel = setInterval(amenitiescauroselbegin, 3000);
    }
    window.addEventListener("resize",()=>{
        updateSlide();
    })








window.addEventListener("resize",updatefloorCarousel);
    window.addEventListener("load",updatefloorCarousel);
    let floorInterval = null;
    let findex = 0;
    let floorcount = document.querySelectorAll(".floorCard").length;
    let floorWrapper = document.querySelector(".floorSlide");

    function updatefloorCarousel(){
        if (window.innerWidth<=768) {
            clearInterval(floorInterval);
            findex=0;
            floorCarousel();
            floorInterval = setInterval(floorCarousel, 5000);
            console.log("1");
        }
        else {
            clearInterval(floorInterval);
            floorWrapper.style.transform = `translateX(0%)`;
            console.log("2");
        }
    }

    function floorCarousel() {
        findex++;
        if(findex >=floorcount) {
            findex = 0;
            console.log("8");
        }
        floorWrapper.style.transform = `translateX(-${findex*105}%)`;
        console.log("3");
    }

    document.querySelector(".floor_prevBtn").addEventListener("click",()=>{
        clearInterval(floorInterval);
        if(findex == 0 ) {
            findex = floorcount-1;
            console.log("4");
        }
        else {findex-=1;}
        floorWrapper.style.transform = `translateX(-${findex*105}%)`;
        floorInterval = setInterval(floorCarousel, 5000);
        console.log("5");
    })

    document.querySelector(".floor_nextBtn").addEventListener("click",()=>{
        clearInterval(floorInterval);
        if(findex == floorcount-1 ) {
            findex = 0;
            console.log("6");
        }
        else {findex+=1;}
        floorWrapper.style.transform = `translateX(-${findex*105}%)`;
        floorInterval = setInterval(floorCarousel, 5000);
        console.log("7");
    })










    let galleryImg = document.querySelectorAll(".galleryCard img");
    let gallerySlide = document.querySelector(".gallerySlide");
    let galleryCount = galleryImg.length - 1;
    let gccount = 0;
    let galleryIndex = 0;
    let gallerypopupopen = false;
    let galleryTrans = 0;
    let galleryCaurosel = setInterval(gallerycauroselbegin, 5000);

    function getgallerystep() {
        return window.innerWidth < 769 ? 105 : 35;
    }

    function maxGallertSlide() {
        return window.innerWidth < 769 ? galleryCount + 1 : galleryCount - 1;
    }

    function updategallerySlide() {
        gallerySlide.style.transform = `translateX(-${gccount * getgallerystep()}%)`;
    }

    function gallerycauroselbegin() {
        updategallerySlide();
        gccount = (gccount + 1) % maxGallertSlide();
    }

    galleryImg.forEach((el, idx) => {
        el.addEventListener("mouseenter", () => clearInterval(galleryCaurosel));
        el.addEventListener("mouseout", () => {
            if (!gallerypopupopen) {
                galleryCaurosel = setInterval(gallerycauroselbegin, 5000);
            }
        });
        el.addEventListener("click", () => {
            document.getElementById("gallery-overlay").style.display = "block";
            document.getElementById("gallery-popupimage").src = el.src;
            gallerypopupopen = true;
            galleryIndex = idx;
            clearInterval(galleryCaurosel);
            body.classList.add("noscroll");
        });
    });

    document.querySelector(".gallery-popup-close").addEventListener("click", () => {
        document.getElementById("gallery-overlay").style.display = "none";
        document.getElementById("gallery-popupimage").src = "";
        gallerypopupopen = false;
        galleryCaurosel = setInterval(gallerycauroselbegin, 5000);
        body.classList.remove("noscroll");
    });

    document.getElementById("gallery_prevBtn").addEventListener("click", () => {
        galleryIndex = (galleryIndex - 1 + galleryImg.length) % galleryImg.length;
        document.getElementById("gallery-popupimage").src = galleryImg[galleryIndex].src;
    });

    document.getElementById("gallery_nextBtn").addEventListener("click", () => {
        galleryIndex = (galleryIndex + 1) % galleryImg.length;
        document.getElementById("gallery-popupimage").src = galleryImg[galleryIndex].src;
    });

    document.querySelector(".gallery_prevBtn").addEventListener("click", () => {
        gccount = (gccount - 1 + maxGallertSlide()) % maxGallertSlide();
        updategallerySlide();
        resetGalleryCarousel();
    });

    document.querySelector(".gallery_nextBtn").addEventListener("click", () => {
        gccount = (gccount + 1) % maxGallertSlide();
        updategallerySlide();
        resetGalleryCarousel();
    });

    function resetGalleryCarousel() {
        clearInterval(galleryCaurosel);
        galleryCaurosel = setInterval(gallerycauroselbegin, 3000);
    }
    window.addEventListener("resize",()=>{
        updategallerySlide();
    })













        let accordionContent = document.querySelectorAll(".accordion-content");
        let accordionBtn = document.querySelectorAll(".mobile-accordionBtn");
        let spanArrow = document.querySelectorAll(".accordion-arrow");

        accordionBtn.forEach((element,index)=>{
            element.addEventListener("click",()=>{toogleAccordion(index)});
        })

        function toogleAccordion(index) {
            if (accordionBtn[index].classList.contains("accordion-active")) {
                accordionBtn[index].classList.remove("accordion-active");
            accordionContent[index].classList.remove("contentactive");
            
            spanArrow[index].classList.remove("accordion-arrow-active");
            return;
            }
            for (let i=0;i<accordionBtn.length;i++) {
                accordionBtn[i].classList.remove("accordion-active");
                accordionContent[i].classList.remove("contentactive");
                
                spanArrow[i].classList.remove("accordion-arrow-active");
            }
            if (!accordionBtn[index].classList.contains("accordion-active")) {
            accordionBtn[index].classList.add("accordion-active");
            accordionContent[index].classList.add("contentactive");
            spanArrow[index].classList.add("accordion-arrow-active");
            }
        }
