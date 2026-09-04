# Local setup

This project is a PHP site. The app lives in `csgo/`. There is no Node or Composer build step.

## 1. Install PHP 8.1

The live site at [postmatchteam.uk](https://www.postmatchteam.uk/) sits behind Cloudflare on **nginx/1.18.0 (Ubuntu)**. That stack is PHP 7.4 (Ubuntu 20.04) or **PHP 8.1** (Ubuntu 22.04). PHP 8.1 is the one to use locally: it matches current Ubuntu LTS and does not emit the PHP 8.4 `fgetcsv()` warnings that break team loading.

On Windows (PowerShell):

```powershell
winget install --id PHP.PHP.8.1 --accept-package-agreements --accept-source-agreements
```

Close and reopen the terminal so `php` is on your PATH, then check:

```powershell
php -v
```

On macOS: `brew install php`. On Linux, install `php` from your package manager.

### Windows: enable OpenSSL

Team and event data is fetched over HTTPS. On Windows, copy the development ini next to `php.exe` and uncomment these lines:

```ini
extension_dir = "ext"
extension=curl
extension=openssl
```

`allow_url_fopen` should already be `On`. Confirm with:

```powershell
php -m
php -r "echo ini_get('allow_url_fopen');"
```

`openssl` should appear in the module list.

If `php` is not found after install, look under `%LOCALAPPDATA%\Microsoft\WinGet\Packages\` for a `PHP.PHP.*` folder and use that `php.exe` (or add the folder to PATH).

## 2. Start the server

The PHP built-in server is enough for local work. Run it from `csgo/` so `index.php` is the site root:

```powershell
cd csgo
php -S localhost:8080
```

Open [http://localhost:8080](http://localhost:8080).

The first load should show the thread creator (login is currently skipped in `index.php`). After a moment, the "Loading teams" overlay should disappear and team/event name fields should autocomplete from the Google Sheets databases.

You need internet for those sheets. To use the bundled CSVs instead, in `csgo/js/pmtc.js` switch the `getJSON.php` feeds to `csv/Full_Teams.csv` and `csv/Events.csv`.

Stop the server with `Ctrl+C`.

## Apache / XAMPP (optional)

Point the document root at `csgo/`. Comment out the HTTPS redirect in `csgo/.htaccess` or local HTTP will loop:

```apache
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

The PHP built-in server ignores `.htaccess`, so this does not apply to `php -S`.

## Quick check that it works

1. The page title is **CS Post Match Thread Creator**.
2. Browser devtools Network tab: `getJSON.php` returns JSON (not a PHP warning).
3. Typing a known team (for example `FaZe`) turns the team field green on blur.
4. Paste an HLTV match page into **HLTV Page Copy and Paste**, then open **Output**. A Reddit title and markdown body should appear.
