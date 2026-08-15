# Remix: GoGirl PHP Community Portal 💖

Welcome to your offline-first social safety platform for women, converted entirely to production-ready PHP and modern client-side scripting!

This directory features a full standalone translation of the original React/Vite/Express workspace. It lets you run, deploy, and host the beautiful GoGirl user experiences on any standard PHP hosting setup.

---

## 📂 File Structures

1.  **`api.php`**
    *   **The Backend Controller**: Replicates the Node.js `server.ts` Express endpoint.
    *   Decodes inputs, tracks local memory lists (conversation files), structures prompts following our precise sisterly system guidelines for **Millu**, initiates standard robust PHP `cURL` operations to Google Gemini API keys, and formats returns cleanly.
2.  **`index.php`**
    *   **The Unified Dashboard Template**: Integrates all React tabs (Explore partners, Meetups and persistent circles, Safety Hub timers, Photo Booth, and active AI drawers) into an elegant, high-perf web interface.
    *   Uses high-contrast colors, Google Fonts (Space Grotesk & Inter), Lucide SVG vectors, and responsive custom state machines.
    *   Pre-loaded with verified cafes and matching coordinates mapped directly via PHP arrays.

---

## ⚡ How to Deploy and Play

To host this PHP-tailored application locally:

### 1. Configure your Google Gemini API Key

We have lazy-initialized the model connections in PHP. `api.php` automatically parses variables directly from either:
- Your system configuration (`getenv('GEMINI_API_KEY')`).
- Or a standard `.env` configuration file located in your root workspace.

Create a `.env` file in the main folder (or within the `php/` folder) and add:
```env
GEMINI_API_KEY=your_actual_unrestricted_google_gemini_key_here
```

### 2. Stand Up a Local Dev Server

Alternatively, you don't even need bulky setups! If you have PHP installed, just execute this in your terminal:
```bash
# Shift into your php export folder
cd php

# Standup standard quick PHP development server
php -S localhost:8000
```

Open check out **`http://localhost:8000`** in any web browser!

### 3. Deploy onto Production (Apache / Nginx / XAMPP)

- Copy `index.php`, `api.php`, and your `.env` configuration into your active target folder (e.g., `htdocs/gogirl/` or `/var/www/html/`).
- Verify that PHP's standard **`cURL` extensions** are enabled on your server configuration (it is active on 99% of modern hosts by default!).

---

## 💎 Crafted Highlights

-   **Interactive Compatibility Ratings**: The profile editor checks interests and personality styles to update alignment match percentages inside the companions browser natively!
-   **True Camera stream integration**: Captures secure preview feeds using modern `getUserMedia` parameters and vintage analog filters.
-   **Active Safety Timers & SOS Indicators**: The mock emergency, live countdown tracking triggers, and alarm sounds run perfectly with real-time feedback loops.
