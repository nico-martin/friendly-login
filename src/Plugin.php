<?php

namespace SayHello\FriendlyLogin;

class Plugin
{
    private static ?Plugin $instance = null;
    public string $name = '';
    public string $version = '';
    public string $prefix = '';
    public string $api_namespace = '';
    public bool $debug = false;
    public string $file = '';
    public string $url = '';

    public string $upload_dir = '';

    public string $option_key = 'shfi_data';

    public Assets $Assets;

    public static function getInstance($file): Plugin
    {
        if (!isset(self::$instance)) {
            self::$instance = new Plugin();

            if (get_option(sayhelloFriendlyLogin()->option_key)) {
                $data = get_option(sayhelloFriendlyLogin()->option_key);
            } elseif (function_exists('get_plugin_data')) {
                $data = get_plugin_data($file);
            } else {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
                $data = get_plugin_data($file);
            }

            self::$instance->name = $data['Name'];
            self::$instance->version = $data['Version'];

            self::$instance->prefix = 'shfi';
            self::$instance->api_namespace = 'friendly-login/v1';
            self::$instance->debug = true;
            self::$instance->file = $file;
            self::$instance->url = plugin_dir_url($file);

            self::$instance->run();
        }

        return self::$instance;
    }

    public function run()
    {
        add_action('plugins_loaded', [$this, 'loadPluginTextdomain']);
        add_action('admin_init', [$this, 'updatePluginData']);
        register_deactivation_hook(sayhelloFriendlyLogin()->file, [$this, 'deactivate']);
        register_activation_hook(sayhelloFriendlyLogin()->file, [$this, 'activate']);

        add_filter('shfi/PluginStrings', [$this, 'pluginStrings']);
    }

    /**
     * Load translation files from the indicated directory.
     */
    public function loadPluginTextdomain()
    {
        load_plugin_textdomain(
            'progressive-wp',
            false,
            dirname(plugin_basename(sayhelloFriendlyLogin()->file)) . '/languages'
        );
    }

    /**
     * Update Assets Data
     */
    public function updatePluginData()
    {

        $db_data = get_option(sayhelloFriendlyLogin()->option_key);
        $file_data = get_plugin_data(sayhelloFriendlyLogin()->file);

        if (!$db_data || version_compare($file_data['Version'], $db_data['Version'], '>')) {

            sayhelloFriendlyLogin()->name = $file_data['Name'];
            sayhelloFriendlyLogin()->version = $file_data['Version'];

            update_option(sayhelloFriendlyLogin()->option_key, $file_data);
            if (!$db_data) {
                do_action('shfi_on_first_activate');
            } else {
                do_action('shfi_on_update', $db_data['Version'], $file_data['Version']);
            }
        }
    }

    public function activate()
    {
        do_action('shfi_on_activate');
    }

    public function deactivate()
    {
        do_action('shfi_on_deactivate');
        delete_option(sayhelloFriendlyLogin()->option_key);
    }

    public function pluginStrings($strings)
    {
        $strings['plugin.name'] = sayhelloFriendlyLogin()->name;

        return $strings;
    }
}
