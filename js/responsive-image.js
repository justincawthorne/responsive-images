//  set the breakpoint (pixel width of screen) and container identifier

    var breakpoint = 768;
    
    var container = '.responsive-image';

    
// call the functions

	$(document).ready(function() {

    	selectImage(); // initial image selection

    	detectResize(); // detects resize of window - probably not needed for production

    });


// supporting functions
    
 	/*
        selectImage sets the image attributes 
        depending on the width of the screen
    */
	
	function selectImage() {
		/*
            detect the screen width
        */
        var screenwidth = $(window).width(); // use screen.width for production
        /*
            run for each image fitting the selected container
            to use this with a specific classname (e.g. class="responsive-image")attached to an image just go with:
            $('img.responsive-image').each(function(){
        */
        $(container + ' img').each(function(){
            /*
                get thumbnail attributes
            */
            var thumbSrc = (!$(this).attr('data-thumb-src')) ? $(this).attr('src') : $(this).attr('data-thumb-src');
            var thumbWidth = (!$(this).attr('data-thumb-width')) ? $(this).attr('width') : $(this).attr('data-thumb-width');
            var thumbHeight = (!$(this).attr('data-thumb-height')) ? $(this).attr('height') : $(this).attr('data-thumb-height');
            /*
            	just in case we don't have the width or height for the thumbnail
            	this ensures that images still display at their correct size
           	*/
			thumbWidth = (!thumbWidth) ? 'auto' : thumbWidth ;
            thumbHeight = (!thumbHeight) ? 'auto' : thumbHeight ;
            /*
                set thumbnail data attributes
            */
            $(this).attr('data-thumb-src',thumbSrc);
            $(this).attr('data-thumb-width',thumbWidth);
            $(this).attr('data-thumb-height',thumbHeight);
            /*
                set full size image attributes
            */
            var fullSrc = (!$(this).attr('data-full-src')) ? '' : $(this).attr('data-full-src');
            var fullWidth = (!$(this).attr('data-full-width')) ? '' : $(this).attr('data-full-width');
            var fullHeight = (!$(this).attr('data-full-height')) ? '' : $(this).attr('data-full-height');            
    		/*
                mobile first: resize if the screen is equal to or wider than the breakpoint
                BUT don't resize if there's no data-full-src attribute
            */
            if( (screenwidth >= breakpoint) && (fullSrc) ) {
                /*
                    change the attributes of the html tag to use the full size image
                */
                $(this).updateAttribute('src',fullSrc);
                $(this).updateAttribute('width',fullWidth);
                $(this).updateAttribute('height',fullHeight);     
                /*
					remove link to full size image
				*/
                var img = $(this).parent().html();
                $(this).parent('a.full-image-link').replaceWith(img);
    		}
            /*
                now, if the screen is narrower than the breakpoint we show the thumbnail (default)
            */                    
            if(screenwidth < breakpoint) {          
                /*
                    change the attributes of the html tag to use the thumb image
                */
                $(this).updateAttribute('src',thumbSrc);
                $(this).updateAttribute('width',thumbWidth);
                $(this).updateAttribute('height',thumbHeight);
                /*
                    add a link to the full size image (if we have the src)
                */
                if(fullSrc) {
                    $(this).wrap('<a class="full-image-link" href="'+$(this).attr('data-full-src')+'">'); 
                }          
    		}
        });
	}

 	/*
        updateAttribute - mini jQuery plugin to avoid the need to repeating code in selectImage
        this updates an attribute if there is a value, 
        or removes the attribute entirely if there is no value
    */
	
	$.fn.updateAttribute = function(attributeName, attributeValue) {
		var attributeName = attributeName.toString();
		if(attributeValue) {
			return $(this).attr(attributeName,attributeValue);
        } else {
			return $(this).removeAttr(attributeName);
        }
	}

	/*
        detect resize with 100ms timeout
        and run the selectImage function
        updateBrowserVal() can be omitted for production
    */
	
	function detectResize() {
		var resizeTimeout;
		
		$(window).bind('resize', function() {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function() {
				// swap image if a resize is detected
				updateBrowserVal(),selectImage()
			}, 100);
		});		
	}

// not needed for production
    	
	/*
        these lines purely for displaying eference info on the demo page - not needed for production
    */
    
	$('#window').html('<strong>window (browser) width</strong>: ' + $(window).width());
	$('#screen').html('<strong>screen (device) width</strong>: ' + screen.width);
    $('#breakpoint').html('<strong>breakpoint at</strong>: ' + breakpoint);	
	
	// update browser width display on resize 
	
	function updateBrowserVal() {
		$('#window').html('<strong>browser width</strong>: ' + $(window).width());
	}