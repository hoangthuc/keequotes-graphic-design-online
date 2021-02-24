<?php
add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );
//upload dir
function KGDO_upload_dir_filter($uploads){
    $day = date('d');
    $uploads['path'] .= '/' . $day;
    $uploads['url']  .= '/' . $day;
    return $uploads;
}
add_filter('upload_dir', 'KGDO_upload_dir_filter');
add_theme_support( 'post-thumbnails' );
    add_action('wp_ajax_upload_img_wp', 'f_upload_img_wp');
    function f_upload_img_wp()
    {
        if(isset($_FILES['upload_image']) && is_uploaded_file($_FILES['upload_image']['tmp_name'])){
            $file = $_FILES['upload_image'];
            require_once(ABSPATH . 'wp-admin/includes/admin.php');
            $file_return = wp_handle_upload($file, array('test_form' => false));
            if (isset($file_return['error']) || isset($file_return['upload_error_handler'])) {
                return false;
            } else {
                $filename = $file_return['file'];
                $attachment = array(
                    'post_mime_type' => $file_return['type'],
                    'post_title' => preg_replace('/\.[^.]+$/', '', basename($filename)),
                    'post_content' => '',
                    'post_status' => 'inherit',
                    'guid' => $file_return['url']
                );
                $attachment_id = wp_insert_attachment($attachment, $file_return['url']);
                require_once(ABSPATH . 'wp-admin/includes/image.php');
                $attachment_data = wp_generate_attachment_metadata($attachment_id, $filename);
                wp_update_attachment_metadata($attachment_id, $attachment_data);
                if (0 < intval($attachment_id)) {
                    echo wp_get_attachment_url($attachment_id, 'full');
                }

            }
        }

        die();
    }

    function get_data_api($slug)
    {
        $response = wp_remote_get( KGDO_URL_API.$slug );
        $response     = wp_remote_retrieve_body( $response );
        $response = json_decode($response);
        return $response;
    }

/// get info license
    function check_license_plugin($key)
    {
        $response = wp_remote_get( KGDO_URL_API . '/user/license-info?license_key='.$key );
        $response     = wp_remote_retrieve_body( $response );
        $response = json_decode($response);
        if ($response->name) {
            $response->success = 'License is active.';
            define('KGDO_K_API',$key,true);
            return $response;
        }
        $response->error = 'License key invalid.';
        return $response;
    }

/// check info license
    function check_license($value)
    {
        $check = check_license_plugin($value);

        if ($check->error) {
            add_settings_error('setting_plugin_error', esc_attr('settings_updated'), __($check->error), 'error');
        }
        if ($check->success) {
            add_settings_error('setting_plugin_error', esc_attr('settings_updated'), __($check->success), 'success');
        }
        return $value;
    }

    function check_email($value)
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            add_settings_error('setting_plugin_error', esc_attr('settings_updated'), __($value . ' is not a valid email address'), 'error');
        }
        return $value;
    }
