/** Shopify CDN: Minification failed

Line 20:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 21:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 22:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 213:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 244:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 245:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 268:87 Transforming destructuring to the configured target environment ("es5") is not supported yet
Line 330:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 331:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 339:2 Transforming const to the configured target environment ("es5") is not supported yet
... and 10 more hidden warnings

**/
$(document).ready(function () {
  /**
   * Nutrition popup
   */
  let nutritionPopupOpenButtons = document.querySelectorAll('[data-nutrition-popup-open]');
  let nutritionPopupCloseButtons = document.querySelectorAll('[data-nutrition-popup-close]');
  let nutritionPopup = document.querySelector('.nutrition-popup-wrapper');

  if(nutritionPopupOpenButtons.length > 0) {
    nutritionPopupOpenButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        nutritionPopup.classList.add('is-visible');
      })
    })

    nutritionPopupCloseButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        nutritionPopup.classList.remove('is-visible');
      })
    })
  }

  /**
   * custom qty buttons
   */
  // https://community.shopify.com/c/Shopify-Design/Add-Quantity-Buttons-to-Debut-Theme/m-p/593103/highlight/true#M149154
  $(".qtybox .btnqty").on("click", function () {
    var qty = parseInt(
      $(this).parent(".qtybox").find(".product-form__input--quantity").val()
    );
    if ($(this).hasClass("qtyplus")) {
      qty++;
    } else {
      if (qty > 1) {
        qty--;
      }
    }
    qty = isNaN(qty) ? 1 : qty;
    $(this).parent(".qtybox").find(".product-form__input--quantity").val(qty);
  });

  /**
   * open/close
   */
  $(".toggle").click(function (e) {
    e.preventDefault();
    $(this).removeClass("active");

    var $this = $(this),
      content = $this.next();

    if (content.hasClass("show-content")) {
      $this.removeClass("active");
      content.removeClass("show-content");
      content.slideUp(350);
    } else {
      $(".toggle").removeClass("active");
      $this.parent().parent().find("li .inner").removeClass("show-content");
      $this.parent().parent().find("li .inner").slideUp(350);
      $this.addClass("active");
      content.toggleClass("show-content");
      content.slideToggle(350);
    }
  });

  /**
   * Mobile menu
   */
  var mobileMenu = $(".store-header__menu"),
    page = $("body");
  var mobileMenuToggleBtn = $(".store-header__btn, .store-header__close-btn");

  mobileMenuToggleBtn.on("click", function () {
    mobileMenuToggleBtn.toggleClass("active");
    $('.store-header__icon.store-header__cart').toggleClass('active');
    mobileMenu.toggleClass("menu-opened");
    page.toggleClass("scroll-disabled");
  });

  var announcementBar = $(".announcement-bar"),
    isAnnouncementBar = announcementBar.length;

  if (isAnnouncementBar) {
    var extraHeight = announcementBar.innerHeight() + 1;
  }

  /**
   * PDP gero image
   */
  var productHero = $('.product-hero');
  var productHeroMedia = $('.product-hero .product-media');
  var productAboutSection = $('.template-product .product-about');
  var productHeaderHeight = $('.header-wrapper').innerHeight();
  var viewportWidth = $(window)[0].innerWidth;
  var viewportHeight = $(window).innerHeight();

  if(viewportWidth > 992) {
    productHeroMedia.css({
      top: 'calc('+productHeaderHeight+'px - 2px)',
      height: 'calc(100vh - '+productHeaderHeight+'px + 3px)'
    })
  }

  $(window).on('scroll', function () {
    if(productAboutSection.length > 0) {
      var productAboutSectionOffset = productAboutSection[0].getBoundingClientRect().top - viewportHeight - 77;

      if(productAboutSectionOffset <= 0) {
        productHeroMedia.css({
          transform: 'translateY('+productAboutSectionOffset+'px)'
        })
      } else {
        productHeroMedia.css({
          transform: 'translateY(0)'
        })
      }
    }
  })

  $(window).on('resize', function () {
    var viewportWidth = $(window)[0].innerWidth;
    var productHeaderHeight = $('.header-wrapper').innerHeight();

    if(viewportWidth > 992) {
      productHeroMedia.css({
        top: 'calc('+productHeaderHeight+'px - 2px)',
        height: 'calc(100vh - '+productHeaderHeight+'px + 3px)'
      })
    } else {
      productHeroMedia.css({
        top: 'auto',
        height: 'auto',
        transform: 'translateY(0)'
      })
    }
  })

  /**
   * Home banner slider
   */
  $(".home-banner-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    speed: 1500,
    cssEase: "ease-in",
  });

  /**
   * Footer instagram slider
   */
  var instafeedSection = $('#insta-feed');

  if(instafeedSection.length > 0) {
    var checkInstafeedSlides = setInterval(function () {
      var instafeedSlides = instafeedSection.find('a');

      if(instafeedSlides.length > 0) {
        instafeedSection.slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 10000000000,
          swipeToSlide: true,
          speed: 1000,
          pauseOnHover: false,
          cssEase: 'linear',
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 2,
              }
            }
          ]
        });

        clearInterval(checkInstafeedSlides);
      }
    },100)
  }

  /**
   * Home flavors slider
   */
  let homeCollectionsCarousel = $(".collection-grid.carousel .collection__list");

  homeCollectionsCarousel
    .slick({
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      cssEase: 'linear',
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1000,
      swipeToSlide: true,
      speed: 1000,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    })

  homeCollectionsCarousel.on('wheel', (function(e) {
    const deltaX = e.originalEvent.deltaX
    const deltaY = e.originalEvent.deltaY

    //Mouse event
    // if(deltaY > 0 && deltaX === -0) {
    //   homeCollectionsCarousel.slick('slickNext')
    // }
    // else if(deltaY <= 0 && deltaX === -0) {
    //   homeCollectionsCarousel.slick('slickPrev')
    // }

    //Touch event
    if(deltaY === -0) {
      e.preventDefault();
    }

    if(deltaX > 0 && deltaY === -0) {
      homeCollectionsCarousel.slick('slickNext')
    }
    else if(deltaX <= 0 && deltaY === -0) {
      homeCollectionsCarousel.slick('slickPrev')
    }
  }));

  $('.collection-grid.carousel .collection__list').on('beforeChange', function (event, {slideCount: count}, currentSlide, nextSlide) {
    $('.empty-slide').addClass('moved');
  });

  /**
   * Accordion
   */
  $(".accordion__header").on("click", function () {
    var body = $(this).closest(".accordion__item").find(".accordion__body");

    $(".accordion__body")
      .not(body)
      .slideUp(300)
      .closest(".accordion__item")
      .removeClass("accordion__item--active");
    body
      .slideToggle(300)
      .closest(".accordion__item")
      .toggleClass("accordion__item--active");
  });

  /**
   * Video at the About page
   */
  //https://github.com/jrue/Vimeo-jQuery-API
  var videoFrame = $("#about-video"),
    videoPoster = $(".about-video-poster"),
    videoVolumeOnBtn = $(".about-hero-btn.sound-on"),
    videoVolumeOffBtn = $(".about-hero-btn.sound-off");

  videoFrame.on("play", function () {
    videoPoster.fadeOut(500);
  });

  videoFrame.vimeo("setLoop", true).vimeo("setVolume", 0);

  videoPoster.on("click", function () {
    videoFrame.vimeo("play");
  });

  videoVolumeOnBtn.on("click", function () {
    videoFrame.vimeo("setVolume", 1);
    videoFrame.vimeo("play");
    $(this).hide();
    videoVolumeOffBtn.show();
  });

  videoVolumeOffBtn.on("click", function () {
    videoFrame.vimeo("setVolume", 0);
    videoFrame.vimeo("play");
    $(this).hide();
    videoVolumeOnBtn.show();
  });

  $(".products-flavor--toggle").on("click", function () {
    $(this).parent().toggleClass("is-open");
  });

  /**
   * Reviews start
   */

  let newReviewsStars = $('.reviews-stars').html();
  let oldReviewsStars = $('.okeReviews.okeReviews--theme .okeReviews-starRating-indicator-layer--foreground');

  oldReviewsStars.html(newReviewsStars);


  /**
   * Mega menu (submenu)
   */
  const canHover = window.matchMedia('(hover: hover)').matches;

  var megaMenuLink = $('.mega-menu__main-link');
  var megaMenuCloseButton = $('.btn-close-submenu');

  megaMenuLink.on('click', function(e){
    if(!canHover && e.target.classList.contains('site-nav__icon-wrapper')) {
      e.preventDefault();

      var currentSubMenu = $(this).next();

      $('.mega-sub-menu').not(currentSubMenu).removeClass('is-opened');

      currentSubMenu.toggleClass('is-opened');
    }
  });

  megaMenuCloseButton.on('click', function(e){
    $('.mega-sub-menu').removeClass('is-opened');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let recoverPasswordButton = document.querySelector('#RecoverPassword');
  let recoverForm = document.querySelector('#RecoverPasswordForm');
  let loginForm = document.querySelector('#CustomerLoginForm');
  let hideRecoverButton = document.querySelector('#HideRecoverPasswordLink');
  let scrollTo = document.querySelector('.scroll-to');
  if (recoverPasswordButton) {
    recoverPasswordButton.addEventListener('click', function (e) {
      e.preventDefault();
      recoverForm.classList.remove('hide');
      loginForm.classList.add('hide');
      scrollTo.scrollIntoView(true);
    });
  }

  if (hideRecoverButton) {
    hideRecoverButton.addEventListener('click', function (e) {
      e.preventDefault();
      recoverForm.classList.add('hide');
      loginForm.classList.remove('hide');
      scrollTo.scrollIntoView(true);
    });
  }
});

$('.blog-form form.klaviyo-form').submit(function () {
  $('.article-form-success').addClass('active');
  $('.article__text').addClass('inactive');
  $('.article-custom.to-hide').addClass('inactive');
  $('.blog-form').addClass('inactive');
  return false;
});

$('.blog-form__content #cid_11').on('click', function () {
  $('.blog-form__content input[type=file]').click();
  return false;
});
$('.blog-form__content input[type=file]').change(function () {
  $('.blog-form__content .form-subHeader').text($('.blog-form__content input[type=file]')[0].files[0].name);
});

$("#input_4").attr("placeholder", "Message");

let siteNavOpen = document.querySelector(".site-nav--has-dropdown button.site-nav__link");
let siteNavClose = document.querySelector(".site-nav__close-btn");
let siteNavDropdown = document.querySelector(".site-nav__dropdown");
let siteNavOverlay = document.querySelector(".page-overlay");
let storeHeaderMenu = document.querySelector('.store-header__menu');

siteNavOpen.addEventListener("click", menuAddClass);

siteNavClose.addEventListener("click", menuRemoveClass);

siteNavOverlay.addEventListener("click", menuRemoveClass);

function menuAddClass() {
  siteNavDropdown.classList.add('active');
  siteNavOverlay.classList.add('active');
}

function menuRemoveClass() {
  siteNavDropdown.classList.remove('active');
  siteNavOverlay.classList.remove('active');
  document.querySelector("body").classList.remove("scroll-disabled");
}

