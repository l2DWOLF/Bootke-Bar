import { baseTemplate } from "../templates/baseTemplate.js";

export function generateHome(){
    return baseTemplate({
        pageType: "homepage",
        title: "Bootke Bar",
        lang: "en",
        main: `
      <main class="home-main">
        <h1>Homepage coming soon</h1>
        <h3> Visit our menu: </h3>
        <div class="nav-lang-container nav-lang-container-home">
          <a class="nav-lang home" href="./menu-en.html">English Menu</a>
          |
          <a class="nav-lang home" href="./menu-he.html">תפריט בעברית</a>
        </div>
      </main>
    `
    });
};