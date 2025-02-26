<?php
/*
Plugin Name: Mi Plugin Captcha sobre un captcha
Plugin URI:  
Description: Un plugin para mostrar un captcha personalizado.
Version:     1.0
Author:      Miguel Bermejo Fierro
Author URI:  https://bermejomiguel.com
*/

// Registrar el shortcode
function mostrar_captcha_form() {
    ob_start();
    ?>
    <div id="captcha">
        <div id="loading" style="display:none;">
            <img src="<?php echo plugin_dir_url(__FILE__); ?>images/carga.gif" alt="Carga">
        </div>
    </div>
    <button onclick="checkCaptcha()">Verificar</button>
    <script src="<?php echo plugin_dir_url(__FILE__); ?>js/captcha.js"></script>
    <?php
    return ob_get_clean();
}
add_shortcode('mostrar_captcha', 'mostrar_captcha_form');

// Incluir CSS
function agregar_estilos_plugin() {
    wp_enqueue_style('mi-plugin-captcha-style', plugin_dir_url(__FILE__) . 'style.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilos_plugin');
