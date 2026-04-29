import { baseTemplate } from "../templates/baseTemplate.js";

export function generateHome(){
    return baseTemplate({
        title: "Bootke Bar",
        lang: "en",
        body: `
      <main style="text-align:center; padding:50px;">
        <h1>Coming Soon</h1>
        <a href="/menu-en.html">English Menu</a>
        <br/>
        <a href="/menu-he.html">תפריט בעברית</a>
      </main>
    `
    });
};