<div class="wrap">
<?php settings_errors( 'setting_plugin_error' );  ?>
<form method="post" action="options.php" >
<?php
    settings_fields( 'setting_plugin' );
    do_settings_sections( 'setting_plugin' );
?>
<p>If you want to try Keequotes, please use the demo information:</p>
Email: <b>demo@keequotes.com</b><br>
Key: <b>0885c656-5e1e-41c3-b357-a2e7a62056eb</b><br>
    <table class="form-table" role="presentation">
        <tbody>
        <tr>
            <th scope="row">
                <label>Email</label>
            </th>
            <td><input  name="email_keequotes" type="email" value="<?php echo get_option('email_keequotes') ?>" placeholder="demo@keequotes.com" class="regular-text"></td>
        </tr>
        <tr>
            <th scope="row">
                <label>License</label>
            </th>
            <td><input name="key_keequotes" type="text" value="<?php echo get_option('key_keequotes') ?>" placeholder="0885c656-5e1e-41c3-b357-a2e7a62056eb" class="regular-text"></td>
        </tr>
        </tbody>
    </table>
    <p class="submit">
       <?php submit_button( __( 'Save Settings', 'textdomain' ), 'primary', 'wpdocs-save-settings' ); ?>
    </p>
</form>
</div>