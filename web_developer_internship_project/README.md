# Devendra Web Lab — Web Developer Internship Project

**Student:** Kolusu Devendra  
**Roll Number:** 23102A040459  
**Program:** Web Developer Intern  
**Internship domain:** Web Development with HTML, CSS and JavaScript  
**Company referenced in report:** ApexPlanet Software Pvt. Ltd.

This project is based on the skills and mini-projects described in the uploaded Web Developer Intern report. It brings the learning outcomes together into one responsive front-end website.

## Features

1. **Home page** — project overview and technology stack.
2. **Responsive portfolio** — profile, skills, project cards, and contact form validation.
3. **Product catalog** — live search, category filtering, and sorting by price/name.
4. **Weather app** — fetches current conditions using the Open-Meteo geocoding and forecast APIs; no API key is required.
5. **Notes & tasks** — add, complete, filter, and delete tasks with browser LocalStorage persistence.
6. **Responsive layout** — CSS Grid, Flexbox, and media queries for mobile, tablet, and desktop.
7. **Accessibility basics** — labels, status messages, and semantic HTML.

## Technology stack

- HTML5
- CSS3
- JavaScript (ES6+)
- DOM manipulation and event handling
- Fetch API / REST API
- LocalStorage
- Git and GitHub for version control

## Run the project

No build tools or package installation are required.

1. Extract the ZIP.
2. Open the `web_developer_internship_project` folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code **Live Server** extension.
4. For the Weather App, allow internet access because it calls the Open-Meteo public API.

## Folder structure

```text
web_developer_internship_project/
├── index.html
├── portfolio.html
├── products.html
├── weather.html
├── tasks.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
└── js/
    └── main.js
```

## GitHub upload

1. Create a new repository on GitHub, for example `web-developer-internship-project`.
2. Extract this ZIP.
3. In the repository, choose **Add file → Upload files**.
4. Upload the contents of the extracted project folder (including `css` and `js` folders), not the ZIP alone.
5. Commit the changes.

## Notes

- The contact form demonstrates client-side validation only; it does not send email or store submissions.
- Product details are sample data for demonstration.
- Weather data requires an internet connection.
- This is a front-end learning project. Do not add private information, passwords, or API secrets to a public repository.
