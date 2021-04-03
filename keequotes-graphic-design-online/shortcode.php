<?php
do_action('CD_enqueue_scripts');
$check = kgdo_check_license_plugin(KGDO_K_API);
$date = date('Y-m-d');
$check_time = strtotime($check->license->ended_at);
?>
<div class="display-products content" style="min-height: 100vh; position: relative; z-index: 9; background-color: #fff">
    <div class="blogcontent">
        <div class="control_main">
            <a data-product="demo" onclick="click_get_products(this)" data-slug="/products" data-insert=".display-products .blogcontent .masonry">Templates</a>
            <a data-product="user" onclick="click_get_products(this)" data-slug="/user/products" data-insert=".display-products .blogcontent .masonry">My Designs</a>
            <a onclick="back_step('.display-products','#card-design-online')" class="continue_template" style="display: none">Continue edit</a>
        </div>
        <div class="filter_categories">
            <label>Filter templates: </label>
            <div class="list_categories">
                <div class="item_cat active" data-type="0"><a class="item_link_cat" data-type="" onclick="filters_templates_cat(0)">All</a></div>
            </div>
        </div>
        <div class="masonry"></div><!-- .masonry -->
    </div>
</div>
<div id="card-design-online" class="d-none" style="min-height: 100vh; position: relative; z-index: 9; background-color: #fff">
    <div class="menu_main">
        <a href="javascript:back_step('#card-design-online','.display-products');">Template gallery</a>
        <?php if( isset($check->success) ): ?>
        <a onclick="<?php echo ($check_time > time() )?'add_canvas();':'show_upgrade()';  ?>">Create template</a>
        <a onclick="<?php echo ($check_time > time() )?'open_form_save();':'show_upgrade()';  ?>" class="save_product_c">Save template</a>
        <a onclick="<?php echo ($check_time > time() )?'download_canvas();':'show_upgrade()';  ?>" class="download_images">Download Image <i class="fa fa-spinner fa-spin" style="font-size:20px;display: none"></i></a>
        <?php endif; ?>
        <a onclick="insert_canvas(this);" class="insert_media_product" >Insert media <i class="fa fa-spinner fa-spin" style="font-size:20px;display: none"></i></a>
    </div>
    <div class="left">
        <?php  include( KGDO_CD_PATH . '/sidebar/sidebar.php' ); ?>
    </div>
    <div class="right-canvas">
        <div class="canvascontent" id="downloadbase64">
            <div>
            <center>
                <canvas id="canvas1"></canvas>
                <canvas id="canvas2" ></canvas>
            </center>
            </div>
            <div class="text-center">
                <a href="javascript:{}" onclick="changeView(1);" style="color:#333; font-size:18px;" class="button-changeview"><span id="viewText">(Front)</span></a>
            </div>
            <canvas id="canvas_image" ></canvas>
        </div>

    </div>
    <div class="tools" style="display:none;">
        <?php include( KGDO_CD_PATH . '/tool/tools.php' ); ?>
    </div>
    <div class="tools-details" style="display:none;">
        <?php include( KGDO_CD_PATH . '/tool/tools-details.php' ); ?>
    </div>
    <div class="tools-fonts" style="display:none;">
        <?php include( KGDO_CD_PATH . '/tool/tools-fonts.php' ); ?>
    </div>
    <div class="tools-colors" style="display:none;">
        <?php include( KGDO_CD_PATH . '/tool/tools-colors.php' ); ?>
    </div>
    <div class="tools-fonts-details" style="display:none;">
        <?php include( KGDO_CD_PATH . '/tool/tools-fonts-details.php' ); ?>
    </div>
    <div class="tools-fonts-style" style="display:none;">
        <?php include( KGDO_CD_PATH . '/tool/tools-fonts-align.php' ); ?>
    </div>
    <div class="tools-fonts-effects" style="display:none;">
        <?php include( KGDO_CD_PATH . '/tool/tools-fonts-effects.php' ); ?>
    </div>
</div>
<div class="overlayresize popup_canvas">
    <center>
        <a href="javascript: back_step('.overlayresize','#card-design-online');" id="closeresize"><i class="far fa-times-circle" style="font-size: 32px;"></i></a>
    </center>
    <div class="login">
        <p class="canvas-width">
            <label for="canvas-width">Width:</label>
            <input type="text" name="canvas-width" id="canvaswidth" class="input" value="" size="20">
        </p>
        <p class="canvas-height">
            <label for="canvas-height">Height:</label>
            <input type="text" name="canvas-height" id="canvasheight" class="input" value="" size="20">
        </p>
        <a onclick="edit_resize()" id="approveresize" class="button button-primary">OK</a>
    </div>
</div>
<div class="overUpdateProduct popup_canvas">
    <center>
        <a href="javascript: back_step('.overUpdateProduct','#card-design-online');" ><i class="far fa-times-circle" style="font-size: 32px;"></i></a>
        <a href="javascript: refresh_img();" class="ml-3" ><i class="fas fa-sync-alt" style="font-size: 32px;"></i></a>
    </center>
    <div class="form_add_new_product login">
        <img>
        <p class="canvas-width">
            <label>Name:</label>
            <input type="text" placeholder="Title" name="product_name" >
        </p>
        <button type="button" class="button button-primary" onclick="create_product(this)">Save</button>
    </div>
</div>

<div class="overUpgradeAccount popup_canvas">
    <center>
        <a href="javascript: back_step('.overUpgradeAccount','#card-design-online');" ><i class="far fa-times-circle" style="font-size: 32px;"></i></a>
    </center>
    <div class="form_upgrade_account login">
        <a href="<?php _e(KGDO_K_REGISTER) ?>" target="_blank" class="button button-primary form-control" >Upgrade your account</a>
    </div>
</div>

        <style>
    .update-nag{
        display: none;
    }
    #wpbody-content .wrap{
        margin: 0;
    }
</style>
<script>
    var ajax_url = '<?php echo KGDO_ajax_url ?>';
    var setting = {
        'URL_API': '<?php echo KGDO_URL_API ?>',
        'K_API': '<?php echo KGDO_K_API ?>',
        'json_active': {},
        'json_download': {},
       'img_src': '<?php echo KGDO_CD_URL.'/images/8.jpg' ?>',
    };
</script>

