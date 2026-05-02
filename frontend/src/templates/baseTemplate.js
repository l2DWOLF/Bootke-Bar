export function baseTemplate({ title, main, lang = "en" }) {
  return `
<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>

  <link rel="stylesheet" href="./main.css">
</head>

<body class="body-${lang}">
  <header>
    <nav class="navbar">
      <a href="./index.html">
        <img class="logo logo-${lang}" src="./logo-${lang}.png" alt="Bootke Bar Logo">
      </a>
      <div class="nav-lang-container">
        <a href="./menu-he.html" class="nav-lang ${lang === "he" ? "active" : ""}">תפריט</a>
        |
        <a href="./menu-en.html" class="nav-lang ${lang === "en" ? "active" : ""}">Menu</a>
      </div>
    </nav>
  </header>
  
  <div class="menu-wrapper">
    ${main}
  </div>

  <div class="btn-up">
      <a href="#" aria-label="חזרה למעלה"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
              fill="currentColor" viewBox="0 0 24 24">
              <path d="m6.29 11.29 1.42 1.42L12 8.41l4.29 4.3 1.42-1.42L12 5.59z"></path>
              <path d="m6.29 16.29 1.42 1.42 4.29-4.3 4.29 4.3 1.42-1.42-5.71-5.7z"></path>
      </svg></a>
  </div>

  <script src="./main.js" defer></script>
  <script src="./speech.js" defer></script>
</body>
</html>
  `;
}