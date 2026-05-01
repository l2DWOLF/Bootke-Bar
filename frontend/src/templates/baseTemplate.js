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

  <script src="./speech.js" defer></script>
</body>
</html>
  `;
}