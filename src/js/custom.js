/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/

function ProductInfo(){
  var products = $(".products-block .item");

  function init(){
    products.each(function(){
      var btn_open = $(this).find('.popup-open'),
          btn_close = $(this).find('.popup-close'),
          popup = $(this).find('.popup');
      btn_open.on('click', function(){
        popup.toggleClass('active');
        $(this).attr('disabled','disabled');
      });
      btn_close.on('click', function(){
        popup.removeClass('active');
        btn_open.removeAttr('disabled');
      });
    });
  }

  init();
}

$(document).ready(function() {

    /* Custom */

 /*    //= ./common/material-init.js */
 /*    //= ./common/google-analytics.js */
 
  $(".slider, #comments-slider").owlCarousel({
    items: 1,
    loop: true
  });

  var product_info = new ProductInfo();
});
