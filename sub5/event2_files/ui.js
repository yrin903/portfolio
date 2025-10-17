'use strict';

const uiCommon = {
    init: function () {
        this.header();
        this.utilQuick();
        this.dropdown();
        this.accordion();
        this.selectbox();
        this.modal();

        window.dispatchEvent(new Event('resize'));
    },
    // 
    header: function () {
        const header = document.querySelector('#headerWrap');
        header.classList.add('active');
        window.addEventListener('scroll', function(){
            const newY = this.window.scrollY;

            if (uiUtil.currentScroll.getY == newY) {
                return; 
            } else if (uiUtil.currentScroll.getY < newY) {
                header.classList.remove('active');
            } else {
                header.classList.add('active');
            }

            if (newY == 0) {
                header.classList.add('active');
            }
            uiUtil.currentScroll.setY = newY;
        });


        // gnb
        this.gnb();

        // util
        const headerUtilBtns = document.querySelectorAll('.header .utils .btn');

        headerUtilBtns.forEach((btn)=>{
            btn.addEventListener('click', function() {
                const isClose = this.classList.contains('active');
                const target = this.dataset['target'];
                const utilTarget = document.querySelector(`.js-util-${target}`);
                
                headerUtilBtns.forEach((btn)=>{
                    btn.classList.remove('active');
                    document.querySelector(`.js-util-${btn.dataset['target']}`).classList.remove('active');
                });

                if(isClose) {
                    this.classList.remove('active');
                    utilTarget.classList.remove('active');
                    header.classList.remove('open');

                } else {
                    this.classList.add('active');
                    utilTarget.classList.add('active');
                    header.classList.add('open');
                }

                const bodyOverflow = isClose || target !== 'nav' ? '' : 'hidden';
                document.body.style.overflow = bodyOverflow;

                if(uiUtil.lenis) {
                    isClose || target !== 'nav' ? uiUtil.lenis.start() : uiUtil.lenis.stop();
                }
            });
        })
    },
    // 
    gnb: function () {
        const header = document.querySelector('#headerWrap');
        const gnb = document.getElementById('gnbWrap');
        const gnbLinks = document.querySelectorAll('.gnb-wrap a');
        const headerOverlay = document.querySelector('.header .overlay');
        const gnbAccordionBtns = document.querySelectorAll('.gnb-wrap .gnb-open-accordion');
        const gnbAccordion = document.querySelectorAll('.gnb-wrap .gnb-accordion');

        function getMaxHeight() {
            const gnbItems = Array.from(document.querySelectorAll('.gnb-depth2'))
                .map((depth2) => depth2.querySelectorAll('.gnb-depth2-item').length);
            const gnbItemHeight = document.querySelector('.gnb-depth2-item').offsetHeight;
            const gnbItemMargin = parseInt(window.getComputedStyle(document.querySelector('.gnb-depth2-item')).getPropertyValue('margin-top'));

            const max = gnbItems.reduce((prev, cur) => prev > cur ? prev : cur);

            return ((gnbItemHeight * max) + ((max - 1) * (gnbItemMargin * (5 / 6))) + 72);
        }

        function openGnb() {
            header.classList.add('active');
            header.classList.add('open');
            gnb.classList.add('active');
            headerOverlay.classList.add('active');
            headerOverlay.style.maxHeight = `${getMaxHeight()}px`;
        }
        function closeGnb() {
            if(!document.querySelector('.js-util-search').classList.contains('active')) {
                header.classList.remove('open');
            }
            gnb.classList.remove('active');
            headerOverlay.classList.remove('active');
            headerOverlay.style.maxHeight = '0';
        }

        function accordionGnb(e) {
            e.stopPropagation();

            const isOpen = this.classList.contains('active');

            gnbAccordionBtns.forEach((btn)=>{
                btn.classList.remove('active');
            });
            gnbAccordion.forEach((acc)=>{
                acc.classList.remove('active');
            });

            if (isOpen) return;

            this.classList.add('active');
            this.parentElement.nextElementSibling.classList.add('active');
        }

        function resetGnb() {
            document.body.style.overflow = "";
            document.querySelector('.header .utils .btn-burger').classList.remove('active');
            uiUtil.lenis?._isStopped && uiUtil.lenis.start();
            gnb.classList.remove('active');
            gnb.removeEventListener('mouseenter', openGnb);
            gnb.removeEventListener('mouseleave', closeGnb);
            gnbLinks.forEach((link)=>{
                link.removeEventListener('focusin', openGnb);
                link.removeEventListener('focusout', closeGnb);
            });
            gnbAccordionBtns.forEach((btn)=>{
                btn.removeEventListener('click', accordionGnb)
            });
        }

        function initGnbPc() {
            gnb.addEventListener('mouseenter', openGnb);
            gnb.addEventListener('mouseleave', closeGnb);
            gnbLinks.forEach((link)=>{
                link.addEventListener('focusin', openGnb);
                link.addEventListener('focusout', closeGnb);
            });
        }

        function initGnbMo() {
            header.classList.remove('open');
            gnbAccordionBtns.forEach((btn)=>{
                btn.addEventListener('click', accordionGnb)
            });
        }

        window.addEventListener('resize', function(){
            resetGnb();
            if(window.innerWidth > 1024) {
                initGnbPc();
            } else {
                initGnbMo();
            }
        });

        const url = new URL(window.location.href);
        const [ depth1, depth2 ] = url.pathname.split('/').slice(1);

        document.querySelectorAll('.gnb-depth1-item').forEach((item)=>{
            const depth1Link = item.querySelector('.gnb-depth1-link');
            if(depth1Link.dataset.waitingPoint == depth1) {
                depth1Link.classList.add('active');
                item.querySelectorAll('.gnb-depth2-link').forEach((link)=>{
                    if(link.dataset.waitingPoint == depth2) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
    },
    // 
    dropdown: function () {
        const dropdownOpener = document.querySelectorAll('.js-dropdown-btn:not(.initialized)');

        if (dropdownOpener.length) {
            dropdownOpener.forEach((btn)=>{
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
             
                    dropdownOpener.forEach((other)=>{
                        if(other != e.target) { 
                            other.classList.remove('active'); 
                        }
                    })
                    btn.classList.toggle('active');
                });
                btn.classList.add('initialized');
            });
            document.body.addEventListener('click', function() {
                dropdownOpener.forEach((btn)=>{
                    btn.classList.remove('active');
                })
            });

            /**
             * todo: 비활성화 시 tab키로 접근 불가 처리
             */
        }
    },
    //
    utilQuick: function() {
        const btnTop = document.querySelector('.js-btn-top');

        btnTop.addEventListener('click', function() {
            if(uiUtil.lenis) {
                uiUtil.lenis.scrollTo(0);
            }
        });

        window.addEventListener('scroll', function() {
            if(uiUtil.currentScroll.getY > 1000) {
                btnTop.classList.add('active');
            } else {
                btnTop.classList.remove('active');
            }
        });
    },
    // 
    accordion: function () {
        const accordion = document.querySelectorAll('.js-accordion:not(.initialized)');
        
        if (accordion.length) {
            accordion.forEach((acc)=>{
                const accordionBtn = acc.querySelectorAll('.js-accordion-btn');

                accordionBtn.forEach((btn)=>{
                    btn.addEventListener('click', function(){
                        if(this.classList.contains('active')) {
                            this.classList.remove('active');
                            return;
                        }

                        accordionBtn.forEach((btn)=>{
                            btn.classList.remove('active');
                        });
                        this.classList.add('active');
                    });
                });
                
                acc.classList.add('initialized');
            });

            /**
             * todo: 확장여부 상태표기, 축소시 aria-hidden
             */
        }
    },
    //
    selectbox: function () {
        const selectbox = document.querySelectorAll('.js-selectbox:not(.initialized');

        if(selectbox.length) {
            selectbox.forEach((select)=>{
                const selectInput = select.querySelector('select');
                const options = select.querySelectorAll('option');
                const defaultOption = select.querySelector('option:checked');
                const innerBox = select.querySelector('.selectbox-inner');

                innerBox.insertAdjacentHTML('beforeend', `<button type="button" class="selectbox-btn ds-dropdown-btn js-dropdown-btn">${defaultOption.textContent}</button>`)
                innerBox.insertAdjacentHTML('beforeend', '<div class="selectbox-list ds-dropdown-list js-dropdown-list"><div class="ds-dropdown-inner"></div></div>')

                let outer = document.createElement('div');
                outer.classList.add('list-outer');
                let ul = document.createElement('ul');
                ul.classList.add('list-inner');
                ul.setAttribute('data-lenis-prevent-wheel', '');

                ul.append(...Array.from(options).reduce((acc, cur)=>{
                    if(!cur.value) {
                        return acc;
                    }

                    let li = document.createElement('li');
                    let btn = document.createElement('button');

                    btn.setAttribute('type', 'button');
                    btn.classList.add('list-item');
                    btn.dataset.value = cur.value;
                    btn.textContent = cur.textContent;
                    btn.addEventListener('click', function() {
                        const dropdownBtn = select.querySelector('.js-dropdown-btn');
                        dropdownBtn.textContent = cur.value;
                        dropdownBtn.classList.add('selected');
                        selectInput.value = cur.value;
                    });

                    li.append(btn);

                    return [...acc, li];
                },[]));

                outer.append(ul);
                select.querySelector('.ds-dropdown-inner').append(outer);
                
                select.classList.add('initialized');
            });
            uiCommon.dropdown();
        }
    },
    //
    modal: function () {
        const modal = document.querySelectorAll('.js-open-modal:not(.initialized');
        
        if(modal.length) {
            modal.forEach((item)=>{
                const target = item.dataset.modal;
                const targetModal = document.querySelector(`.js-modal[data-modal="${target}"]`);

                function closeTarget(e) {
                    e.stopPropagation();
                    if(e.target == targetModal) {
                        targetModal.close();
                        uiUtil.lenis?.start();
                        document.body.removeEventListener('click', closeTarget);
                    }
                }

                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    targetModal.showModal();
                    uiUtil.lenis?.stop();

                    document.body.addEventListener('click', closeTarget);
                });

                targetModal?.querySelector('.js-close-modal').addEventListener('click', function() {
                    targetModal.close();
                    uiUtil.lenis?.start();

                    document.body.removeEventListener('click', closeTarget);
                });

                item.classList.add('initialized');
            });
        }
    }
}

// 
const uiPage = {
    companyIntroduce: function() {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".company-hero",
                start: "top 40%",
                end: "+=200",
                scrub: 1
            }
        })
        .to(".company-hero-visual .visual-inner", { width: "100%", height: "100%" });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".company-hero-visual",
                endTrigger: ".company-copy",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                pin: true
            }
        })
        .to(".company-hero-visual .overlay", { opacity: 1 });
    },
    companyHistory: function() {
        const navItems = gsap.utils.toArray('.history-nav-item');

        navItems.forEach((item) => {
            const period = item.dataset.period;
            const periodSections = gsap.utils.toArray(`.history-section[data-period="${period}"]`);

            gsap.timeline({
                scrollTrigger: {
                    trigger: periodSections[0],
                    endTrigger: periodSections[periodSections.length - 1],
                    start: "top-=105 top",
                    end: "bottom-=100 top",
                    toggleClass: { targets: item, className: "active" }
                }
            })

            item.addEventListener('click', function() {
                const offset = periodSections[0].offsetTop;
                gsap.to(window, { duration: 0.8, scrollTo: offset - 100});
            });
        });

        
    },
    companyCapacity: function() {
        const sections = gsap.utils.toArray('.capacity-section');

        sections.forEach((section) => {
            const selector = gsap.utils.selector(section);
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 50%",
                    end: "+=50",
                    scrub: 1,
                    toggleActions: 'play none none reverse'
                }
            })
            .from(selector('.row .txt'), { yPercent: 120, duration: 1 })
            .from(selector('.img-wrap'), { yPercent: 100, duration: 1 })
        });
    },
    companyRelation: function() {
        const heroes = gsap.utils.toArray('.company-hero');

        heroes.forEach((hero) => {
            const selector = gsap.utils.selector(hero);

            gsap.timeline({
                scrollTrigger: {
                    trigger: hero,
                    start: "top 40%",
                    end: "+=200",
                    scrub: 1
                }
            })
            .to(selector(".company-hero-visual .visual-inner"), { width: "100%", height: "100%" });
    
            gsap.timeline({
                scrollTrigger: {
                    trigger: selector(".company-hero-visual"),
                    endTrigger: selector(".company-copy"),
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: true
                }
            })
            .to(selector(".company-hero-visual .overlay"), { opacity: 1 });

        });
    },
    companyFoodSafety: function() {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".company-hero",
                start: "top 40%",
                end: "+=200",
                scrub: 1
            }
        })
        .to(".company-hero-visual .visual-inner", { width: "100%", height: "100%" });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".company-hero-visual",
                endTrigger: ".company-copy",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                pin: true
            }
        })
        .to(".company-hero-visual .overlay", { opacity: 1 });
    },
    companyFoodSafe: function() {
        const swiper = new Swiper(".food-safe-slider", {
            spaceBetween: 16,
            slidesPerView: 1.2,
            loop: true,
            centeredSlides: true,
            pagination: {
                el: ".food-safe-pagination",
                type: "bullets",
                clickable: true,
            },
            navigation: {
                nextEl: ".food-safe-navi .next",
                prevEl: ".food-safe-navi .prev",
            },
            breakpoints: {
                641: {
                    spaceBetween: 24,
                    slidesPerView: 1.8,
                },
                1025: {
                    slidesPerView: 2,
                },
            },
        });
    },
    companyOhs: function() {
        this.companyFoodSafety();
    },
    brandView: function() {
        const sectionTvcf = document.querySelector('.brand-view-section.tvcf');
        const sectionSns = document.querySelector('.brand-view-section.sns');

        gsap.timeline({
            scrollTrigger: {
                trigger: ".brand-hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        })
        .to(".brand-hero-visual", { width: "100%", height: "100vh", top: 0, right: 0, borderRadius: 0 })
        .to(".brand-hero-visual .overlay", { opacity: 0.6 }, "-=0.8");

        gsap.timeline({
            scrollTrigger: {
                trigger: ".brand-hero",
                endTrigger: ".brand-copy",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                pin: true,
                pinSpacing: false
            }
        })
        .to(".brand-copy .copy", { opacity: 1 });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".brand-view-section.product",
                start: "center center",
                end: "bottom bottom",
                scrub: 1
            }
        })
        .to(".back-shape-big", { scale: 6, left: 0, ease: "none" });

        if (!!sectionTvcf) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".brand-view-section.tvcf",
                    start: "top 30%",
                    end: "center 70%",
                    scrub: 1
                }
            })
            .to(".back-shape-big", { backgroundColor: "#FFEAC6", ease: "none" });
            
        }

        if (!!sectionSns) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".brand-view-section.sns",
                    start: "top 30%",
                    end: "+=200",
                    scrub: 1
                }
            })
            .to(".back-color-chip", { opacity: "0.1", ease: "none" })
            .to(".back-shape-big", { opacity: 0, ease: "none" }, "-=0.3");
        }

    },
    productView: function () {
        ScrollTrigger.matchMedia || gsap.registerPlugin(ScrollTrigger);

        gsap.timeline()
        .from('.product-img-wrap .layout-inner img', { yPercent: 100, duration: 0.3 })
        .from('.product-info-wrap', { yPercent: 100, duration: 0.2 });

        ScrollTrigger.matchMedia({
            "(min-width: 1025px)": function () {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".product-view-section.info",
                        endTrigger: ".product-view-related",
                        start: "top top",
                        end: "bottom 50%",
                        pin: ".product-view-section.info",
                        pinSpacing: false,
                        scrub: 1,
                    }
                });

                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".product-view-related",
                        start: "top 50%",
                        end: "+=100",
                        scrub: true,
                    }
                })
                .to('.product-info-wrap', { opacity: 0 })
                .set('.product-info-wrap', { visibility: 'hidden' });
            }
        });
    },
    prfilm: function() {
        const prfilmNav = document.querySelectorAll('.prfilm-nav .ds-chip-nav');
        const video = document.querySelector('.prfilm-video');
        const download = document.querySelector('.prfilm-download');

        prfilmNav.forEach((btn)=>{
            btn.addEventListener('click', function() {
                const src = btn.dataset.src;
                const file_id = btn.dataset.file_id;

                prfilmNav.forEach((btn)=>{
                    btn.classList.remove('active');
                });
                btn.classList.add('active');

                video.setAttribute('src', src);
                download.setAttribute('href', '/common/filedown/' + file_id);
            })
        })
    },
    coffeeClassList: function() {
        // 
        const navBtn = document.querySelectorAll('.coffee-class-nav .nav-btn');
        const accordionBtn = document.querySelectorAll('.js-accordion-btn');

        // aside 내비게이션과 리스트 버튼 클릭 연동
        navBtn.forEach((nav)=>{
            nav.addEventListener('click', function() {
                const num = this.dataset.num;
                accordionBtn.forEach((btn)=>{
                    if(btn.dataset.num === num) {
                        btn.click();
                    }
                })
            });
        });

        // 리스트 버튼 클릭 동작
        accordionBtn.forEach((btn)=>{
            btn.addEventListener('click', function() {
                if(this.classList.contains('active')) {
                    const num = this.dataset.num;

                    navBtn.forEach((nav)=>{
                        nav.classList.remove('active');
                        if(nav.dataset.num === num) {
                            nav.classList.add('active');
                        }
                    });

                    this.parentElement.querySelector('.ds-accordion-contents').addEventListener('transitionend', function accordionCallback() {
                        gsap.to(window, { duration: 0.6, scrollTo: document.querySelector('.sticky-section').offsetTop + btn.offsetTop - 110 });
                        this.removeEventListener('transitionend', accordionCallback);
                    });
                } else {
                    navBtn.forEach((nav)=>{
                        nav.classList.remove('active');
                    });
                }
            }, false);
        })
    },
    coffeeTaste: function() {
        const viewport = document.querySelector('.coffee-taste .viewport');
        const draggable = document.querySelector('.draggable');

        let lastPointX;
        let lastPointY;
        let lastPositionX;
        let lastPositionY;
        
        function mouseDownHandler(e) {
            e.preventDefault();
            if(uiUtil.screenWidth.getWidth > 768) return;
            const style = draggable.style;

            lastPointX = e.pageX;
            lastPointY = e.pageY;
            lastPositionX = style.left ? parseFloat(style.left) : 0;
            lastPositionY = style.top ? parseFloat(style.top) : 0;

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        }
        function mouseMoveHandler(e) {
            e.preventDefault();
            draggable.classList.add('dragging');
            draggable.style.top = e.pageY - lastPointY + lastPositionY + 'px';
            draggable.style.left = e.pageX - lastPointX + lastPositionX + 'px';
        }
        function mouseUpHandler(e) {
            e.preventDefault();
            if(!draggable.classList.contains('dragging')) {
                draggable.classList.toggle('zoom');
            }
            draggable.classList.remove('dragging');
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        function touchStartHandler(e) {
            e.preventDefault();
            if(uiUtil.screenWidth.getWidth > 768) return;
            const style = draggable.style;

            lastPointX = e.changedTouches[0].pageX;
            lastPointY = e.changedTouches[0].pageY;
            lastPositionX = style.left ? parseFloat(style.left) : 0;
            lastPositionY = style.top ? parseFloat(style.top) : 0;

            document.addEventListener('touchmove', touchMoveHandler);
            document.addEventListener('touchend', touchEndHandler);
        }
        function touchMoveHandler(e) {
            draggable.classList.add('dragging');
            draggable.style.top = e.changedTouches[0].pageY - lastPointY + lastPositionY + 'px';
            draggable.style.left = e.changedTouches[0].pageX - lastPointX + lastPositionX + 'px';
        }
        function touchEndHandler(e) {
            e.preventDefault();
            if(!draggable.classList.contains('dragging')) {
                draggable.classList.toggle('zoom');
            }
            draggable.classList.remove('dragging');
            document.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);
        }

        viewport.addEventListener('mousedown', mouseDownHandler);
        viewport.addEventListener('touchstart', touchStartHandler);
    },
    csrCommon: function() {
        const sections = gsap.utils.toArray('.csr-track-section');

        sections.forEach((section) => {
            const selector = gsap.utils.selector(section);

            const imgTrack = selector('.csr-img-track');
            const contentsTrack = selector('.csr-contents-track');

            if(!selector('.csr-img-viewport .img-wrap:not(:first-of-type)').length) return;

            ScrollTrigger.matchMedia({
                "(min-width: 1025px)": function () {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: contentsTrack,
                            start: "top top",
                            end: "bottom bottom",
                            pin: imgTrack,
                            pinSpacing: false,
                            scrub: 1,
                        }
                    })
                    .to(selector('.csr-img-viewport .img-wrap:not(:first-of-type)'), { height: '100%', duration: 1, stagger: 1 });
                }
            });
        });
        // 

        const eventNavItems = document.querySelectorAll('.csr-event-nav .event-nav-item');
        const eventItems = document.querySelectorAll('.csr-event-item');
        const dropdownBtn = document.querySelector('.csr-event-nav .js-dropdown-btn');
        if(dropdownBtn) dropdownBtn.textContent = Array.from(eventNavItems).find((item) => item.classList.contains('active')).textContent;

        eventNavItems.forEach((navItem)=>{
            navItem.addEventListener('click', function(e) {
                const target = this.dataset.event;
                const text = this.textContent;

                eventNavItems.forEach((chip)=>{
                    chip.classList.remove('active');
                });
                this.classList.add('active');

                eventItems.forEach((item)=>{
                    item.classList.remove('active');
                    if(item.dataset.event === target) {
                        item.classList.add('active');
                    }
                });
                dropdownBtn.textContent = text;
            });
        });

        // 
        const imgSliders = document.querySelectorAll('.event-img-slider');

        imgSliders.forEach((slider) => {
            if(slider.querySelectorAll('.event-img-slide').length <= 1) {
                slider.querySelector('.pagination')?.remove();
                return;
            };

            new Swiper(slider, {
                loop: true,
                pagination: {
                    el: slider.querySelector('.pagination'),
                    type: "bullets",
                    clickable: true,
                },
            })
        });

      
    },
    customer: function() {
        document.querySelector('.js-btn-submit').addEventListener('click', function(e) { e.preventDefault(); });

        // 문의 유형 라디오 버튼 동작 
        const customerCate = document.querySelectorAll('.customer-cate .js-chip-nav input[type="radio"]');

        customerCate.forEach((input)=>{
            input.addEventListener('click', function() {
                customerCate.forEach((cate)=>{
                    cate.parentElement.classList.remove('active');
                });
                input.parentElement.classList.add('active');

                document.querySelector('.customer-form').classList.remove('disc', 'etc', 'maxwell');
                document.querySelector('.customer-form').classList.add(this.value);
            })
        });

        // 소비기한 셀렉트박스 옵션 세팅
        const expirationYear = document.getElementById('expirationYear');
        const expirationMonth = document.getElementById('expirationMonth');
        const expirationDay = document.getElementById('expirationDay');
        const years = Array.from( { length: 29 }, (v, i) => i + 2007 ).reverse();
        const months = Array.from( { length: 12 }, (v, i) => i + 1 );
        const days = Array.from( { length: 31 }, (v, i) => i + 1 );

        years.forEach((year) => {
            expirationYear.insertAdjacentHTML('beforeend', `<option value="${year}">${year}</option>`);
        });
        months.forEach((month) => {
            expirationMonth.insertAdjacentHTML('beforeend', `<option value="${month}">${month}</option>`);
        });
        days.forEach((day) => {
            expirationDay.insertAdjacentHTML('beforeend', `<option value="${day}">${day}</option>`);
        });
        
        uiUtil.initForm();
    }
}


const uiUtil = {
    lenis: undefined,
    screenWidth: {
        width: window.innerWidth,
        get getWidth() {
            return this.width;
        },
        set setWidth(value) {
            this.width = value;
        }
    },
    currentScroll: {
        y: window.scrollY,
        get getY() {
            return this.y
        },
        set setY(value) {
            this.y = value
        }
    },
    initForm: function() {
        const onlyNums = document.querySelectorAll('.js-only-num');
        const onlyEngs = document.querySelectorAll('.js-only-eng');
        const onlyKors = document.querySelectorAll('.js-only-kor');

        onlyNums?.forEach((item)=>{
            uiUtil.inputValidation(item, 'onlyNum');
        });
        onlyEngs?.forEach((item)=>{
            uiUtil.inputValidation(item, 'onlyEng');
        });
        onlyKors?.forEach((item)=>{
            uiUtil.inputValidation(item, 'onlyKor');
        });

        // 
        const email = document.querySelector('.ds-form-item.email');
        if (email) {
            const emailDomain = email.querySelector('#emailDomain');
            const emailDomainBtn = email.querySelector('.selectbox-btn');
            const emailDomainItem = email.querySelectorAll('.selectbox-list .list-item');

            emailDomainItem.forEach((item)=>{
                item.addEventListener('click', function() {
                    const value = this.dataset.value;

                    emailDomain.value = value;
                    emailDomain.readOnly = !!value;
                    emailDomainBtn.textContent = value || "직접입력";
                });
            });
        }

        //
        /*
        const address = document.querySelector('.ds-form-item.address');
        if (address) {
            const addressZip = address.querySelector('#addressZip');
            addressZip.addEventListener('click', function(e){
                e.preventDefault();
                alert('post zip');
            })
        }
        */

        // 
        const fileInputItems = document.querySelectorAll('.ds-input.file');
        const allowFileExtensions = ["jpg", "jpeg", "gif", "png"];
        if (fileInputItems) {
            fileInputItems.forEach((item)=>{
                const fileName = item.querySelector('.js-file-name');
                const fileSelect = item.querySelector('.js-file-select');
                const fileInput = item.querySelector('.js-file-input');

                fileName.addEventListener('click', function(){
                    fileInput.click();
                });

                fileSelect.addEventListener('keydown', function(e) {
                    if(e.key == 'Enter') {
                        this.click();
                    }
                });

                fileInput.addEventListener('change', function(e) {
                    if(this.files.length === 0) return;
                    const file = this.files[0];

                    const name = file.name;
                    const size = file.size;
                    
                    // 확장자 체크
                    if (!allowFileExtensions.includes(name.split('.').pop().toLowerCase())) {
                        alert('첨부파일은 jpg, gif, png만 가능합니다.');
                        this.value = '';
                        return;
                    }
                    
                    // 사이즈 체크
                    if (size > 5242880) {
                        alert('첨부파일은 최대 5MB까지 가능합니다.');
                        this.value = '';
                        return;
                    }

                    fileName.textContent = name;
                });
            })
        }

    },
    inputValidation: function(t, type) {
        let regexp;
        switch (type) {
            case "onlyNum":
                regexp = /[^0-9]/gi;
                break;
            case "onlyEng":
                regexp = /[^a-z]/gi;
                break;
            case "onlyKor":
                regexp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
                break;
            case "onlyNumEng":
                regexp = /[^a-z0-9]/gi;
                break;
        }

        t.addEventListener('input', function() {
            const v = this.value;
            this.value = v.replace(regexp, '');
        });
    }
}

// 
window.addEventListener('load', function() {
    // 
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    
    // 
    const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time)=>{
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0);
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ScrollTrigger.scrollerProxy(document.body, {
    //     scrollTop(value) {
    //         return value !== undefined ? lenis.scrollTo(value) : lenis.scroll;
    //     },
    //     getBoundingClientRect() {
    //         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    //     },
    //     pinType: document.body.style.transform ? "transform" : "fixed",
    // });

    ScrollTrigger.addEventListener("refresh", () => lenis.raf(performance.now()));
    ScrollTrigger.refresh();


    // 
    uiCommon.init();
    uiUtil.lenis = lenis;

    
    // 
    this.addEventListener('resize', function() {
        uiUtil.screenWidth.setWidth = this.innerWidth;
    });
    
    // 
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setViewportHeight();
    this.addEventListener('resize', setViewportHeight);
});
