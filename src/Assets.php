<?php

namespace SayHello\FriendlyLogin;

class Assets
{
    public function run()
    {
        add_action('login_enqueue_scripts', [$this, 'addLoginAssets']);
    }

    public function addLoginAssets()
    {
        if ($GLOBALS['pagenow'] === 'wp-login.php') {
            $script_version = sayhelloFriendlyLogin()->version;
            $dir_uri = trailingslashit(plugin_dir_url(sayhelloFriendlyLogin()->file));

            wp_enqueue_style(
                sayhelloFriendlyLogin()->prefix . '-login',
                $dir_uri . 'assets/dist/login.css',
                [],
                $script_version
            );

            wp_enqueue_script(
                sayhelloFriendlyLogin()->prefix . '-login',
                $dir_uri . 'assets/dist/login.js',
                [],
                $script_version,
                true
            );
        }

    }
}
