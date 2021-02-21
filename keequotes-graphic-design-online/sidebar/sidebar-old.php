<div class="tool-icon-left">
    <div class="scrollmenu-left">
        <div class="general-function-left">
<a class="tablink" onclick="openPage('template')" id="defaultOpen"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/template.svg" width="18px"></a>
<a class="tablink" onclick="openPage('background')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/background.svg" width="19px"></a>
<a class="tablink" onclick="openPage('photo')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/photo.svg" width="19px"></a>
<a class="tablink" onclick="openPage('element')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/element.svg" width="19px"></a>
<a class="tablink" onclick="openPage('text')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/text.svg" width="19px"></a>
<a class="tablink" onclick="openPage('brand')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/brand.svg" width="19px"></a>
        </div>
    </div>
<div class="ajax-loader" style="display: none; width:60px;">
<img src="<?php echo KGDO_CD_URL; ?>/images/loading-gif.svg" />
</div>
<div class="contentajax">

</div>

<div id="template" class="sidebarpost">
  <p>The same set</p>
  <?php
    $related_post = get_post_meta( $post->ID, 'related_post', true );
    $rand_posts = get_posts( array(
        'posts_per_page' => 5,
        'post_type'      => 'post',
        'meta_query' => array(
        array(
            'key'   => 'related_post',
            'value' => $related_post,
            )
        )
    ) );

    if ( $rand_posts ) {
    foreach ( $rand_posts as $post ) :
        setup_postdata( $post );
        ?>
        <p style="width:95%;">
        <a href="<?php the_permalink(); ?>"><?php
	the_post_thumbnail( 'medium' ); ?></a><br>
<?php the_category(', '); ?></p>
        <?php
    endforeach;
    wp_reset_postdata();
    }
    ?>
</div>

<div id="background" class="sidebarpost">
  <p>Background</p>
</div>

<div id="photo" class="sidebarpost">
  <p>Photo</p>
</div>

<div id="element" class="sidebarpost">
  <p>Element</p>
  <div class="masonry">
<?php
$the_query = new WP_Query( array(
    'post_type' => 'library',
    'posts_per_page' => -1,
    'tax_query' => array(
        array (
            'taxonomy' => 'element',
            'field' => 'slug',
            'terms' => 'hinh-ve-tach-nen',
        )
    ),
) );
?>
<?php while($the_query->have_posts()) : $the_query->the_post(); ?>
  <div class="brick">
  <a href="javascript:{}" library_id="<?php $post_id = get_the_ID(); echo $post_id; ?>" class="call-ajax-transparentelements"><img src="<?php the_post_thumbnail_url('medium'); ?>"><p></p><?php the_title();?></a>
  </div>
<?php endwhile; ?>
</div>
<?php wp_reset_postdata(); ?>
<div style="clear:both"></div>
</div>

<div id="text" class="sidebarpost">
  <p>Text</p>
</div>

<div id="brand" class="sidebarpost">
  <p>Brand</p>
</div>
</div>

<script>
function openPage(pageName,elmnt,color) {
  var i, sidebarpost, tablinks;
  sidebarpost = document.getElementsByClassName("sidebarpost");
  for (i = 0; i < sidebarpost.length; i++) {
    sidebarpost[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";

}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
</script>
