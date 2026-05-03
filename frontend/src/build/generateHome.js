import { baseTemplate } from "../templates/baseTemplate.js";

export function generateHome(){
    return baseTemplate({
        pageType: "homepage",
        title: "Bootke Bar",
        lang: "en",
        main: `
      <main class="home-main">
        <h1>Homepage Coming Soon</h1>
        <h3> our menu is ready - choose your Language: </h3>
        <div class="nav-lang-container">
          <a class="nav-lang home" href="./menu-en.html">English Menu</a>
          |
          <a class="nav-lang home" href="./menu-he.html">תפריט בעברית</a>
        </div>
      </main>
    `
    });
};