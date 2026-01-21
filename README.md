# Live Weather Dashboard

A lightweight, real-time weather application built with **Vanilla JavaScript**. This dashboard allows users to search for any city globally and view current weather conditions instantly.

It features a **smart auto-complete search** system optimized for performance using **Debouncing**.

## 🚀 Features

-   **Real-Time Data:** Fetches live temperature and wind speed using the [Open-Meteo API](https://open-meteo.com/).
-   **Smart Search (Type-ahead):** Suggests cities as you type, helping users find the correct location easily.
-   **Performance Optimized:** Implements a **Debounce** function (300ms delay) to minimize API calls and reduce server load while typing.
-   **No API Key Required:** Uses Open-Meteo, allowing for easy cloning and testing without configuration.
-   **Responsive Design:** Fully responsive UI built with **CSS Flexbox**, ensuring it looks good on mobile and desktop.

## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
-   **API:** Open-Meteo (Geocoding & Weather Forecast)
-   **Concepts:** DOM Manipulation, Async/Await, Fetch API, Event Handling.
