import fs from "fs";
import { baseTemplate } from "../templates/baseTemplate.js";

const menu = JSON.parse(
    fs.readFileSync(new URL("../data/menu.json", import.meta.url))
);

export function generateMenu(lang = "he"){

    const htmlContent = menu.categories
        .sort((a, b) => a.order - b.order)
        .map(category => {

            const subCategories = category.subCategories
                .sort((a, b) => a.order - b.order)
                .map(subCategory => {
                    const items = subCategory.items
                        .sort((a, b) => a.order - b.order)
                        .map(item => `
              <li class="menu-item">
                <span class="name">${item.name[lang]}</span>
                <span class="spacer"></span>
                <span class="price">₪${Array.isArray(item.price) ? item.price.join(" / ") : item.price}</span>
              </li>
            `).join("");
                    return `
            <section class="subcategory">
              <h3>${subCategory.name[lang]}</h3>
              <ul>${items}</ul>
            </section>
          `;
                }).join("");
            return `
        <section class="category">
          ${subCategories}
        </section>
      `;
        }).join("");
        
    return baseTemplate({
        title: "Bootke Bar Menu",
        lang,
        main: `<main>${htmlContent}</main>`
    });
};