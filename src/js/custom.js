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
function WindowUpdater(opts){ 
  var self = this, timer;
  // var opt = [
  //   {
  //     event: 'scroll',
  //     actions: [] 
  //   },
  //   {
  //     event: 'resize',
  //     actions: []
  //   }s
  // ];
  self.add = function(event, func){
    for(var i = 0; i < opts.length; i++){
      if(opts[i].event === event){
        opts[i].actions.push(func);
        break;
      }
    }
  };

  self.update = function(event){
    clearTimeout(timer);
    timer = setTimeout(function(){
      // console.log(event);
      if(event.data !== null){
        for(var i = 0; i < opts[event.data].actions.length; i++){
          opts[event.data].actions[i]();
        }
      }
      //do smthng
    },50);
  };

  self.onEvents = function(){
    for(var i = 0; i < opts.length; i++){
      $(window).on(opts[i].event, i, self.update);
    }
  };

  // self.initScroll = function(){
  // };

  // self.initResize = function(){
  // };

  // self.initAll = function(){
  // };
  self.onEvents();
}

function SameHeight(selector, items){
  var parents = $(selector);
  var childs = [], max_height = 0, h = 0;

  function init(){
    parents.each(function(){
      childs.push($(this).children(items));
    });
    update();
  }
  
  function update(){
    console.log('in update');
    for(var i = 0; i < childs.length; i++){
      max_height = 0;
      childs[i].each(function(){
        h = $(this).height();
        max_height = max_height < h? h : max_height;
      });
      childs[i].height(max_height);
    }
  }

  this.update = update;

  init();
}

$(document).ready(function() {

    /* Custom */

 /*    //= ./common/material-init.js */
 /*    //= ./common/google-analytics.js */
 
  $(".slider, #comments-slider").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    navText: ['<div class="svg-sprite--arrow-left"></div>','<div class="svg-sprite--arrow-right"></div>']
  });

  var product_info = new ProductInfo();
  var same_height = new SameHeight('.same-height', '.target');
  var window_updater = new WindowUpdater([
    {
      event: "resize",
      actions: [
        // anim_on_scroll.updateItems,
        same_height.update
      ]
    }
  ]);

  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target
      || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body')
        .animate({scrollTop: targetOffset}, 1000);
       return false;
      }
    }
  });
});
