<?php
    $examples = array();
    
    $examples[] = array(
                        'description'   => 'This image includes the full set of data attributes',
                        'html'          => '<img src="img/thumb1.jpg" width="80" height="114" 
                            data-full-src="img/image1.jpg" data-full-width="280" data-full-height="400"
                            alt="first test image"/>'
                    );

    $examples[] = array(
                        'description'   => 'This image omits the default (thumb) width and height attributes',
                        'html'          => '<img src="img/thumb2.jpg"
                            data-full-src="img/image2.jpg" data-full-width="400" data-full-height="278"
                            alt="second test image"/>'
                    );

    $examples[] = array(
                        'description'   => 'This image omits the full image size data attributes',
                        'html'          => '<img src="img/thumb3.jpg" width="80" height="96"
                            data-full-src="img/image3.jpg"
                            alt="third test image"/>'
                    );
                    
    $examples[] = array(
                        'description'   => 'This image misses out all width/height data attributes',
                        'html'          => '<img src="img/thumb4.jpg"  
                            data-full-src="img/image4.jpg" 
                            alt="fifth test image"/>'
                    );
                    
    $examples[] = array(
                        'description'   => 'This image has no data attributes (full size image only)',
                        'html'          => '<img src="img/image5.jpg" width="624" height="351"
                            alt="fifth test image"/>'
                    );
                                        
    $example_html = '';
    foreach($examples as $example) {
        $example_html .= '
        <div class="responsive-image">
            <p class="description">'.$example['description'].'</p>
            <p class="html">'.htmlentities($example['html']).'</p>
            <p class="test"></p>      
            <p class="image">'.$example['html'].'</p>
        </div>';
    }
?>
<!doctype html>
<html>
<head>
	<title>Responsive image test</title>
	<meta charset="utf-8"/>
	<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <style>
    body {
        font-family: arial, sans-serif;
    }
    div.responsive-image {
        border-top: dotted 1px #ccc;
    }
    p.description {}
    p.html {
        font-size: 0.75em;
        color: #666;
    }
    p.image {}
    </style>  
</head>
<body>

	<p>
        <span id="window"></span>
        <span id="breakpoint"></span>
		<span id="screen"></span>
    </p>
    
    <?php echo $example_html; ?>

	<script src="js/responsive-image.js"></script>
	
</body>
</html>