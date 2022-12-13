<?php

/*
Plugin Name: Friendly Login
Description: Smile to access
Author: Nico Martin - mail@nico.dev
Author URI: https://nico.dev
Version: 1.0.0
Text Domain: shfi
Domain Path: /languages
Requires PHP: 7.4
Tested up to: 6.1.1
License: MIT
*/

defined('ABSPATH') or die();

add_action('init', function () {
    load_plugin_textdomain('shfi', false, basename(dirname(__FILE__)) . '/languages');
});

require_once 'src/Helpers.php';
require_once 'src/Plugin.php';
require_once 'src/Assets.php';

function sayhelloFriendlyLogin(): \SayHello\FriendlyLogin\Plugin
{
    return SayHello\FriendlyLogin\Plugin::getInstance(__FILE__);
}

sayhelloFriendlyLogin()->Assets = new SayHello\FriendlyLogin\Assets();
sayhelloFriendlyLogin()->Assets->run();
