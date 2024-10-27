# Multi-Tenant React Frontend Setup

This guide shows how to make a React app serve each tenant its own settings. It pulls the right data based on the URL path, keeping it simple and clear. Each client sees only what they need. The setup is clean, flexible, and ready for many users.

## Key Configuration Steps

1. **Use Relative Paths**: Use relative paths throughout the codebase to maintain flexibility across different deployment contexts.
2. **Set `homepage` in `package.json`**: Set `"homepage": "."` in `package.json`. This configures the app to reference assets and public files relative to the current path, enabling seamless access to resources for each tenant.
3. **Create Tenant Configurations in `config.json`**: Place a `config.json` file containing tenant-specific data in the `public` folder. This configuration should include all client-specific settings.
4. **Load Client Data Dynamically**: Fetch `config.json` in the app, and use `window.location.pathname` to determine the client-specific configuration dynamically. This approach allows the app to serve customized content based on the current URL path.

## Supporting Configurations

### Apache Configuration

Configure Apache with `Alias` directives to map multiple tenant paths to the same application build folder, allowing each tenant to have a unique URL path:

```apache
<VirtualHost *:80>
    ServerName dev.placeholder-domain.com
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/placeholder_path

    # Tenant Aliases
    Alias /tenant1/path /var/www/html/placeholder_path/build
    Alias /tenant2/path /var/www/html/placeholder_path/build
    Alias /tenant3/path /var/www/html/placeholder_path/build

    <Directory /var/www/html/placeholder_path/build>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/placeholder-error.log
    CustomLog ${APACHE_LOG_DIR}/placeholder-access.log combined
</VirtualHost>
```

**Explanation**:
- Each `Alias` directive maps a unique URL path to the React app’s build directory.
- `AllowOverride All` and `Require all granted` ensure that the configuration is applied and accessible to all requests.

### Setting Directory Permissions

Ensure the Apache server has the necessary permissions to read and serve files from the build directory:

```bash
sudo chown -R www-data:www-data /var/www/html/placeholder_path/build
sudo chmod -R 755 /var/www/html/placeholder_path/build
```

This setup enables the server to access the build directory, while appropriate permissions ensure a secure environment for serving static content.

---