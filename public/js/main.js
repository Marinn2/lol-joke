$(function() {

  var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

});

function init() { 
	const catWrapper = document.querySelector('.cat_wrapper')
	const wrapper = document.querySelector('.wrapper')
	const cat = document.querySelector('.cat')
	const head = document.querySelector('.cat_head')
	const legs = document.querySelectorAll('.leg')
	const pos = {
	  x: null,
	  y: null
	}
  
	const walk = () =>{
	  cat.classList.remove('first_pose')
	  legs.forEach(leg=>leg.classList.add('walk'))
	}
  
	const handleMouseMotion = e =>{
	  pos.x = e.clientX
	  pos.y = e.clientY
	  walk()
	}
  
	const handleTouchMotion = e =>{
	  if (e.targetTouches) return
	  
	  pos.x = e.targetTouches[0].offsetX
	  pos.y = e.targetTouches[0].offsetY
	  walk()
	}
  
	const turnRight = () =>{
	  cat.style.left = `${pos.x - 90}px`
	  cat.classList.remove('face_left')
	  cat.classList.add('face_right')
	}
  
	const turnLeft = () =>{
	  cat.style.left = `${pos.x + 10}px`
	  cat.classList.remove('face_right')
	  cat.classList.add('face_left')
	}
  
	const decideTurnDirection = () =>{
	  cat.getBoundingClientRect().x < pos.x ?
		turnRight()
		:
		turnLeft()
	}
  
	const headMotion = () =>{
	  pos.y > (wrapper.clientHeight - 100) ?
		head.style.top = '-15px'
		:
		head.style.top = '-30px'
	}
  
	const jump = () =>{
	  catWrapper.classList.remove('jump')
	  if (pos.y < (wrapper.clientHeight - 250)) {
		setTimeout(()=>{
		  catWrapper.classList.add('jump')
		},100)
	  } 
	}
  
	const decideStop = ()=>{
	  if (cat.classList.contains('face_right') && pos.x - 90 === cat.offsetLeft ||
		  cat.classList.contains('face_left') && pos.x + 10 === cat.offsetLeft) {
		legs.forEach(leg=>leg.classList.remove('walk'))    
	  }
	}
	
	setInterval(()=>{
	  if (!pos.x || !pos.y) return
	  decideTurnDirection()
	  headMotion()
	  decideStop()
	},100)
  
	setInterval(()=>{
	  if (!pos.x || !pos.y) return
	  jump()
	},1000)
  
	document.addEventListener('mousemove', handleMouseMotion)
	document.addEventListener('mousemove', handleTouchMotion)
  }
  
  window.addEventListener('DOMContentLoaded', init)