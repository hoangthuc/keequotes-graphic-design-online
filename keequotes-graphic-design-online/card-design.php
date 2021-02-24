<?php
/*
Plugin Name: Keequotes – Graphic Design Online.
Description: Create beautiful designs with 10000+ templates and stock elements. Download or insert your designs into Wordpress Editor.
Version: 1.1.0
Author: keequotes
Author URI: https://keequotes.com/
License: GPLv2 or later
Text Domain: kgdo
*/

define('KGDO_CD_PATH',plugin_dir_path(__FILE__));
define('KGDO_CD_URL',plugins_url('keequotes-graphic-design-online'));
define('KGDO_ajax_url',admin_url( 'admin-ajax.php' ));
define('KGDO_K_API',get_option('key_keequotes'));
define('KGDO_K_REGISTER','https://keequotes.com/#pricing');
include_once ('functions.php');
include_once ('api.php');
include_once ('tinymce-custom/tinymce-custom-link-class.php');
add_shortcode('cardonline','f_kgdo_cardonline');
function f_kgdo_cardonline($alt,$content){
    include_once ('shortcode.php');
}


// create custom plugin settings menu
add_action('admin_menu', 'kgdo_plugin_create_menu');

function kgdo_plugin_create_menu() {

    //create new top-level menu
    add_menu_page('Keequotes', 'Keequotes', 'publish_posts', 'template_keequotes', 'kgdo_plugin_settings_page' , 'dashicons-tickets-alt',10 );
    add_submenu_page( 'template_keequotes', 'Templates', 'Templates', 'manage_options', 'template_keequotes','kgdo_plugin_settings_page');
    add_submenu_page( 'template_keequotes', 'Setting', 'Setting', 'manage_options', 'setting_plugin','kgdo_license_plugin_menu');

}

function kgdo_plugin_settings_page() {
   ?>
    <div class="wrap">
<?php echo do_shortcode('[cardonline]');  ?>
    </div>
<?php }

function kgdo_license_plugin_menu($option){
    global $option;
   include_once ('setting.php');
}
function r_set(){
    register_setting( 'setting_plugin', 'email_keequotes','check_email' );
    register_setting( 'setting_plugin', 'key_keequotes', 'check_license' );
    if(!KGDO_K_API)add_settings_error('setting_plugin_error',
        esc_attr('settings_updated'),
        sprintf(  __('<div>Welcome back!<br/> <a>Log in</a> with your account on Setting and use the Editor to edit Templates here.<br/> Or you can <a href="%s" target="_blank">Register</a> a new account. It’s Free. </div>'),KGDO_K_REGISTER ),
        'warning');
}
add_action('admin_init','r_set');


/// style  && script
function CD_styles_scripts() {
    //fonts
    wp_enqueue_style( 'fonts-Roboto', 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap', array(), null );
    wp_enqueue_style( 'fonts-Kufam', 'https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', array(), null );
    wp_enqueue_style( 'fonts-OpenSans', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap', array(), null );
    wp_enqueue_style( 'fonts-OpenSans', 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', array(), null );
    wp_enqueue_style( 'fonts-Oswald', 'https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap', array(), null );
    wp_enqueue_style( 'fonts-Raleway', 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,531;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,531;1,600;1,700;1,800;1,900&display=swap', array(), null );

    wp_enqueue_style('fonts-OpenSansCondensed','https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@0,300;0,700;1,300&display=swap', array(), null );
    wp_enqueue_style('fonts-Playfair','https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', array(), null );
    wp_enqueue_style('fonts-Noto','https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null);
    wp_enqueue_style('fonts-Anton','https://fonts.googleapis.com/css2?family=Anton&display=swap', array(), null);
    wp_enqueue_style('fonts-Arimo','https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null);
    wp_enqueue_style('fonts-Yanone','https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@200;300;400;500;600;700&display=swap', array(), null);
    wp_enqueue_style('fonts-Lobster','https://fonts.googleapis.com/css2?family=Lobster&display=swap', array(), null);
    wp_enqueue_style('fonts-Dancing','https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap', array(), null);
    wp_enqueue_style('fonts-Pacifico','https://fonts.googleapis.com/css2?family=Pacifico&display=swap', array(), null);
wp_enqueue_style('fonts-Play','https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap', array(), null);
wp_enqueue_style('fonts-Maven','https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700;800;900&display=swap', array(), null);
wp_enqueue_style('fonts-Alfa','https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap', array(), null);
wp_enqueue_style('fonts-Playfair','https://fonts.googleapis.com/css2?family=Playfair+Display+SC:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap', array(), null);
wp_enqueue_style('fonts-Bangers','https://fonts.googleapis.com/css2?family=Bangers&display=swap', array(), null);
wp_enqueue_style('fonts-Sigmar','https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap', array(), null);
wp_enqueue_style('fonts-Lalezar','https://fonts.googleapis.com/css2?family=Lalezar&display=swap', array(), null);
wp_enqueue_style('fonts-Baloo','https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@400;500;600;700;800&display=swap', array(), null);
wp_enqueue_style('fonts-Trirong','https://fonts.googleapis.com/css2?family=Trirong:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', array(), null);
wp_enqueue_style('fonts-Jura','https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap', array(), null);
wp_enqueue_style('fonts-Alegreya','https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap', array(), null);
wp_enqueue_style('fonts-Saira','https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap', array(), null);
wp_enqueue_style('fonts-Bevan','https://fonts.googleapis.com/css2?family=Bevan&display=swap', array(), null);
wp_enqueue_style('fonts-Bungee','https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap', array(), null);
wp_enqueue_style('fonts-Bungee+Shade','https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap', array(), null);
wp_enqueue_style('fonts-Bungee+Outline','https://fonts.googleapis.com/css2?family=Bungee+Outline&display=swap', array(), null);
wp_enqueue_style('fonts-Bungee+Hairline','https://fonts.googleapis.com/css2?family=Bungee+Hairline&display=swap', array(), null);
wp_enqueue_style('fonts-Alegreya','https://fonts.googleapis.com/css2?family=Alegreya+SC:ital,wght@0,400;0,500;0,700;0,800;0,900;1,400;1,500;1,700;1,800;1,900&display=swap', array(), null);
wp_enqueue_style('fonts-Maitree','https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap', array(), null);
wp_enqueue_style('fonts-Srisakdi','https://fonts.googleapis.com/css2?family=Srisakdi:wght@400;700&display=swap', array(), null);
wp_enqueue_style('fonts-Thasadith','https://fonts.googleapis.com/css2?family=Thasadith:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null);
wp_enqueue_style('fonts-Manuale','https://fonts.googleapis.com/css2?family=Manuale:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap', array(), null);
wp_enqueue_style('fonts-Farsan','https://fonts.googleapis.com/css2?family=Farsan&display=swap', array(), null);
wp_enqueue_style('fonts-Amatic','https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap', array(), null);
wp_enqueue_style('fonts-Charmonman','https://fonts.googleapis.com/css2?family=Charmonman:wght@400;700&display=swap', array(), null);
wp_enqueue_style('fonts-Charm','https://fonts.googleapis.com/css2?family=Charm:wght@400;700&display=swap', array(), null);


    // Add custom fonts, used in the main stylesheet.
    wp_enqueue_style( 'sweetalert2.min.css', KGDO_CD_URL.'/sweetalert2/dist/sweetalert2.min.css', array(), null );
    wp_enqueue_style( 'CD-masonry', KGDO_CD_URL.'/css/css-masonry/files/css/masonry.css', array(), null );
    wp_enqueue_style( 'CD-fonts', KGDO_CD_URL.'/css/fonts.css', array(), null );
    wp_enqueue_style( 'CD-fonts-font', KGDO_CD_URL.'/css/fonts/fonts.css', array(), null );
    wp_enqueue_style( 'CD-fontawesome', KGDO_CD_URL.'/css/fonts/fontawesome-5.15.1/css/all.css', array(), null );
    wp_enqueue_style( 'CD-style', KGDO_CD_URL.'/css/style.css', array(), null );

  wp_enqueue_script( 'sweetalert2.all.min.js', KGDO_CD_URL.'/sweetalert2/dist/sweetalert2.all.min.js' , array(), '20141028', true );
 wp_enqueue_script( 'html2canvas.js', 'https://html2canvas.hertzen.com/dist/html2canvas.min.js' , array(), '20141028', true );
    wp_enqueue_script( 'cd-fabric', KGDO_CD_URL.'/js/fabric.min.js' , array(), '20141028' );
    wp_enqueue_script( 'cd-main', KGDO_CD_URL.'/js/main.js' , array(), '20141028' );
    wp_enqueue_script( 'cd-menu', KGDO_CD_URL.'/js/menu.js' , array(), '20141028' );
    wp_enqueue_script( 'cd-font', KGDO_CD_URL.'/js/font.js' , array(), '20141028' );
    wp_enqueue_script( 'cd-library', KGDO_CD_URL.'/js/library.js' , array(), '20141028');
}
add_action( 'CD_enqueue_scripts', 'CD_styles_scripts' );
add_action( 'media_buttons', function($editor_id){
    ob_start();
    add_thickbox();
    ?>
    <a href="#TB_inline?width=800&height=550&inlineId=modal-window-card" class="button thickbox" id="add-design-editor" data-number="0"><span class="dashicons dashicons-format-image" style="vertical-align: middle;"></span> Add Design</a>
    <div id="modal-window-card" style="display:none;">
       <?php include_once('shortcode.php') ?>
    </div>
    <style>
        #TB_ajaxContent{
            padding: 0;
        }
        #TB_title {
            background: #0e4477;
            border-bottom: 1px solid transparent;
            height: 57px;
        }
        #TB_closeWindowButton:focus .tb-close-icon{
            box-shadow: none;
        }
        .tb-close-icon:before{
            font-size: 30px;
        }
        #card-design-online{
            top: -52px;
        }
        .tb-close-icon{
            z-index: 10;
            color: #fff;
            top: 10px;
            width: 56px;
            height: 56px;
            font-size: 38px;
        }
        .wo-text-highlight{
            background-color: #fbedb8;
            -webkit-box-shadow: inset 0px -2px 0px 0px rgba(241,196,15,1);
            -moz-box-shadow: inset 0px -2px 0px 0px rgba(241,196,15,1);
            box-shadow: inset 0px -2px 0px 0px rgba(241,196,15,1);
            padding: 0 2px;
        }
        .mce-ico.mce-i-none{
            display: none;
        }
    </style>
<?php
    $resulf = ob_get_contents();
    return $resulf;
    ob_end_clean();
} );

add_action('enqueue_block_editor_assets', 'block_editor_text_highlight_button');
function block_editor_text_highlight_button() {
    ob_start();
    add_thickbox();
    ?>
    <a href="#TB_inline?width=800&height=550&inlineId=modal-window-card" class="button thickbox" id="add-design-editor"  style="display:none;"><span class="dashicons dashicons-format-image" style="vertical-align: middle;"></span> Add Design</a>
    <div id="modal-window-card" style="display:none;">
        <?php include_once('shortcode.php') ?>
    </div>
    <?php
    $resulf = ob_get_contents();
    return $resulf;
    ob_end_clean();
}
