/*visual swiper*/
let thisSlide, autoPlayBtn, autoPlayState;
function swiper() {
    let swiper = new Swiper('.visual-swiper', {
        //기본 셋팅
        //방향 셋팅 vertical 수직, horizontal 수평 설정이 없으면 수평
        direction: 'horizontal',
        //한번에 보여지는 페이지 숫자
        slidesPerView: 1,
        // //페이지와 페이지 사이의 간격
        // spaceBetween: 30,
        //반복 기능 true 사용가능 false 사용불가
        loop: true,
        //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가
        centeredSlides: true,
        // 페이지 전환효과 slidesPerView효과와 같이 사용 불가
        effect: 'fade',

        //자동 스크를링
        autoplay: {
            //시간 1000 이 1초
            delay: 2500,
            disableOnInteraction: false,
        },

        //페이징
        pagination: {
            //페이지 기능
            el: '.swiper-pagination',
            //클릭 가능여부
            clickable: true,
        },

        //방향표
        navigation: {
            //다음페이지 설정
            nextEl: '.swiper-button-next',
            //이전페이지 설정
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                thisSlide = this;
                autoPlayBtn = document.querySelector(".wrap-autoplay-control > button");
                autoPlayBtn.addEventListener("click", (e) => {
                    autoPlayState = autoPlayBtn.getAttribute("aria-pressed");
                    if (autoPlayState === "false") {
                        autoPlayBtn.setAttribute("aria-pressed", "true");
                        thisSlide.autoplay.stop();
                    } else if (autoPlayState === "true") {
                        autoPlayBtn.setAttribute("aria-pressed", "false");
                        thisSlide.autoplay.start();
                    }
                });
            }
        },
        observe: true,
        observeParents: true,
    });

}
/*ft swiper*/
function footer_init() {
    let footerSwiper = new Swiper('.banner-swiper', {
        //기본 셋팅
        //방향 셋팅 vertical 수직, horizontal 수평 설정이 없으면 수평
        direction: 'horizontal',
        //한번에 보여지는 페이지 숫자
        slidesPerView: 5,
        //페이지와 페이지 사이의 간격
        spaceBetween: 30,
        //반복 기능 true 사용가능 false 사용불가
        loop: true,
        //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가
        centeredSlides: true,
        //자동 스크를링
        autoplay: {
            //시간 1000 이 1초
            delay: 2500,
            disableOnInteraction: false,
        },

        //방향표
        navigation: {
            //다음페이지 설정
            nextEl: '.swiper-button-next',
            //이전페이지 설정
            prevEl: '.swiper-button-prev',
        },
        observe: true,
        observeParents: true,
    });
}

/*head banner button*/
function hdBanner() {
    let hdSwiper = new Swiper('.topbanr-swiper', {
        direction: 'horizontal',
        //한번에 보여지는 페이지 숫자
        slidesPerView: 1,
        //반복 기능 true 사용가능 false 사용불가
        loop: true,
        //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가
        centeredSlides: true,
        // 페이지 전환효과 slidesPerView효과와 같이 사용 불가
        effect: 'fade',

        //자동 스크를링
        autoplay: {
            //시간 1000 이 1초
            delay: 2500,
            disableOnInteraction: false,
        },

        //페이징
        pagination: {
            //페이지 기능
            el: '.swiper-pagination',
            type: "fraction",
            //클릭 가능여부
            clickable: true,
        },

        //방향표
        navigation: {
            //다음페이지 설정
            nextEl: '.swiper-button-next',
            //이전페이지 설정
            prevEl: '.swiper-button-prev',
        },
        observe: true,
        observeParents: true,

    });
}

window.onload = (function () {
    // closeBtn을 클릭하면

    $(".closeBtn").on("click", function () {

        // topBanner를 사라지게 한다.

        $(".topBanner").slideUp();

    });
});

/*toggle button*/
function toggleBtn_init() {
    $(".toggleBtn").click(function() {
        $(this).toggleClass("on");
        $(".tglMenu").slideToggle();
    });
}

/*user toggle button*/
function userTgleBtn() {
    $(".useInfoBtn").click(function() {
        $(".userTgle").toggle();
    });
    $(".tgleClose").on("click", function() {
        $(".userTgle").toggle();
    });
}

/*snb dropdown*/
function snbDrdw() {
    $('.select').on('click','.placeholder',function(){
        const parent = $(this).closest('.select');

        if ( ! parent.hasClass('is-open')){
            parent.addClass('is-open');
            $('.select.is-open').not(parent).removeClass('is-open');
        }else{
            parent.removeClass('is-open');
        }
    }).on('click','ul>li',function(){
        const parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
    }).on('focusout', 'li:last-child', function(){
        const parent = $(this).closest('.select');
        parent.removeClass('is-open');
    });


    $('.notLink').focus('.placeholder', function(){
        const parent = $(this).closest('.select');
        console.log(parent);
        if ( ! parent.hasClass('is-open')){
            parent.addClass('is-open');
            $('.select.is-open').not(parent).removeClass('is-open');
        }else{
            parent.removeClass('is-open');
        }
    });

    const wrapper = document.querySelector('.container');
    const snb = document.querySelector('.snbMenu');

    const stickyNav = snb.getBoundingClientRect().top;

    // give this a negative number to make the header
    // snap to the top of the page before touching it
    const offset = 0;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= stickyNav + offset) {
            snb.classList.add('sticky');
        } else {
            snb.classList.remove('sticky');
        }
    });
}
// 모바일 헤더 gnb 스크립트
function mblGnb() {
    var html = $('html');
    var mobileGnb = $('.mobile-gnb');
    var sidebarButton = $('.mobile-gnb .sidebar-btn');
    var mobileMenu = $('.mobile-gnb .depth-1 > a, .mobile-gnb .depth-2 > .mblInrMenu');

    sidebarButton.on('click', function(){
        if (mobileGnb.hasClass('open')) {
            mobileGnbClose(mobileGnb);
        } else {
            mobileGnbOpen(mobileGnb);
        }
    });

    mobileMenu.on('click', function(){
        var $this = $(this);
        var target = $this.parent();
        var depthTarget = $this.siblings('ul');
        var otherLinks = target.siblings('li');
        var otherItems = otherLinks.find('ul');

        if (target.hasClass('current')){
            target.removeClass('current');
            depthTarget.stop().slideUp(300);
        } else {
            otherLinks.removeClass('current');
            otherItems.stop().slideUp(300);
            target.addClass('current');
            depthTarget.stop().slideDown(300);
        }
    });

    $(window).on('resize', function(){
        if (window.innerWidth > 1024) {
            mobileGnbClose(mobileGnb);
        }
    });

    function mobileGnbOpen(gnb){
        gnb.addClass('open');
        html.addClass('not-scroll');
    }

    function mobileGnbClose(gnb){
        gnb.removeClass('open');
        html.removeClass('not-scroll');
    }
}

// 관리자 헤더 스크립트
function admGnb(){
    var header = $('.header-adm');
    var gnb = $('.header-adm .header-gnb-adm');
    var gnbMenu = $('.header-gnb-adm .gnb-depth-1 .depth-1');
    var depthMenu = $('.header-gnb-adm .gnb-depth-2');
    var maxHeight = calculateMaxHeight();
    if (window.innerWidth > 1024) {
        changeMenuHeight(maxHeight);
    }

    gnb.on('mouseenter focusin', function(){
        gnbOpen(header);
    })
    gnb.on('mouseleave focusout', function(){
        gnbClose(header);
    })

    gnbMenu.on('mouseenter focusin', function(){
        $(this).addClass('current');
    })
    gnbMenu.on('mouseleave focusout', function(){
        $(this).removeClass('current');
    })

    $(window).on('resize', function(){
        if (window.innerWidth > 1024) {
            maxHeight = calculateMaxHeight();
            changeMenuHeight(maxHeight);
        }
    });

    function gnbOpen(header){
        var headerHeight = maxHeight + 110;
        header.css("height", headerHeight + "px");
        header.addClass('open');
    }

    function gnbClose(header){
        header.removeAttr("style");
        header.removeClass('open');
    }

    function calculateMaxHeight(){
        var heights = [];
        depthMenu.each(function(){
            var height = $(this).innerHeight();
            heights.push(height);
        });
        var maxHeight = Math.max.apply(null, heights);
        return maxHeight;
    }

    function changeMenuHeight(height) {
        depthMenu.css("height", height + "px");
    }
}

// 반응형 테이블 Swipe
function table_mobile() {
    $(".table-responsive").each(function () {
        var $this = $(this);
        if ($this.hasClass("no-mobile")) return;
    });
}

/*popup*/
function modal() {
    var modals = document.getElementsByClassName("modal");
    var btns = document.getElementsByClassName("modalBtn");
    var spanes = document.getElementsByClassName("close");
    var funcs = [];

    function Modal(num) {
        return function() {
            // 해당 클래스의 내용을 클릭하면 Modal을 띄웁니다.
            btns[num].onclick =  function() {
                modals[0].style.display = "block";
                console.log(num);
            };

            // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
            spanes[num].onclick = function() {
                modals[0].style.display = "none";
            };
        };
    }

    for(var i = 0; i < btns.length; i++) {
        funcs[i] = Modal(i);
    }

    for(var j = 0; j < btns.length; j++) {
        funcs[j]();
    }

    window.onclick = function(event) {
        if (event.target.className == "modal") {
            event.target.style.display = "none";
        }
    };
}

function modelAction(object) {
    var modals = document.getElementsByClassName("modal");

    modals[0].style.display = "block";

    // kins 팀에서 object 작업 추가해주세요
}

/*tab*/
function tab() {
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget)
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('active')
            })
            tabs.forEach(tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')
            target.classList.add('active')
        })
    })
}

function adminGnb() {
    $(function(){
        var header = $('.header');
        var gnb = $('.header .adminGnb');
        var gnbMenu = $('.adminGnb .gnb-box');
        var depthMenu = $('.adminGnb .subList');
        var maxHeight = calculateMaxHeight();
        if (window.innerWidth > 1024) {
            changeMenuHeight(maxHeight);
        }

        gnb.on('mouseenter focusin', function(){
            gnbOpen(header);
        })
        gnb.on('mouseleave focusout', function(){
            gnbClose(header);
        })

        gnbMenu.on('mouseenter focusin', function(){
            $(this).addClass('current');
        })
        gnbMenu.on('mouseleave focusout', function(){
            $(this).removeClass('current');
        })

        $(window).on('resize', function(){
            if (window.innerWidth > 1024) {
                maxHeight = calculateMaxHeight();
                changeMenuHeight(maxHeight);
            }
        });

        function gnbOpen(header){
            var headerHeight = maxHeight + 90;
            header.css("height", headerHeight + "px");
            header.addClass('open');
        }

        function gnbClose(header){
            header.removeAttr("style");
            header.removeClass('open');
        }

        function calculateMaxHeight(){
            var heights = [];
            depthMenu.each(function(){
                var height = $(this).innerHeight();
                heights.push(height);
            });
            var maxHeight = Math.max.apply(null, heights);
            return maxHeight;
        }

        function changeMenuHeight(height) {
            depthMenu.css("height", height + "px");
        }
    });
}

function nowPage() {
    // 현재 링크 패스를 받아와서
    var link =  document.location.pathname;
    link = link.replace("/kins_clean_publishing", "");
    link = link.replace("/app/", "");
    // 메뉴 박스 안에서 같은 링크를 찾은 후
    // console.log(link);
    $(".gnb-box").find('a').each(function () {
        // css스타일 활성화
        var href = $(this).attr('href');
        href = href.replaceAll("../", "");
        // console.log(href);
        $(this).toggleClass('selectedMenu', href == link);
    });
}
