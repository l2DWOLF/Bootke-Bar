import fs from "fs";
import readline from "readline";

const menuPath = new URL("../data/menu.json", import.meta.url);

function loadMenu(){
    return JSON.parse(fs.readFileSync(menuPath));
};

function saveMenu(menu){
    fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
};

function ask(question){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.trim());
        });
    });
};

function listCategories(menu){
    console.log("\n📋 Categories:");
    menu.categories.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name.en} (${c.id})`);
    });
};

async function addItem(){
    const menu = loadMenu();

    listCategories(menu);
    const catIndex = await ask("Select category (or b to go back): ");
    if (catIndex.toLowerCase() === "b") return;

    const category = menu.categories[Number(catIndex) - 1];
    if (!category) return console.log("❌ Invalid category");

    console.log("\nSubcategories:");
    category.subCategories.forEach((s, i) => {
        console.log(`${i + 1}. ${s.name.en}`);
    });

    const subIndex = await ask("Select subcategory (or b to go back): ");
    if (subIndex.toLowerCase() === "b") return;

    const sub = category.subCategories[Number(subIndex) - 1];
    if (!sub) return console.log("❌ Invalid subcategory");

    const nameEn = await ask("Item name (EN): ");
    const nameHe = await ask("Item name (HE): ");
    const price = await ask("Price: ");

    const newItem = {
        id: nameEn.toLowerCase().replace(/\s+/g, "_"),
        order: sub.items.length + 1,
        name: { en: nameEn, he: nameHe },
        price: isNaN(price) ? price : Number(price)
    };

    sub.items.push(newItem);
    saveMenu(menu);

    console.log("✅ Item added!");
};

async function addCategory(){
    const menu = loadMenu();

    const nameEn = await ask("Category name (EN): ");
    const nameHe = await ask("Category name (HE): ");

    const newCategory = {
        id: nameEn.toLowerCase().replace(/\s+/g, "_"),
        order: menu.categories.length + 1,
        name: { en: nameEn, he: nameHe },
        showCategoryName: false,
        subCategories: []
    };

    menu.categories.push(newCategory);
    saveMenu(menu);

    console.log("✅ Category added!");
};

async function addSubCategory(){
    const menu = loadMenu();

    listCategories(menu);
    const catIndex = await ask("Select category (or b to go back): ");
    if (catIndex.toLowerCase() === "b") return;

    const category = menu.categories[Number(catIndex) - 1];
    if (!category) return console.log("❌ Invalid category");

    const nameEn = await ask("Subcategory name (EN): ");
    const nameHe = await ask("Subcategory name (HE): ");

    const newSub = {
        id: nameEn.toLowerCase().replace(/\s+/g, "_"),
        order: category.subCategories.length + 1,
        name: { en: nameEn, he: nameHe },
        items: []
    };

    category.subCategories.push(newSub);
    saveMenu(menu);
    console.log("✅ Subcategory added!");
};

async function editItem(){
    const menu = loadMenu();

    const selection = await selectItemPath(menu);
    if (!selection) return console.log("❌ Cancelled");

    const { item } = selection;
    console.log(`\nEditing: ${item.name.en}`);

    const newNameEn = await ask(`New name EN (${item.name.en}): `);
    const newNameHe = await ask(`New name HE (${item.name.he}): `);
    const newPrice = await ask(`New price (${item.price}): `);
    const inStockInput = await ask(`In stock? (y/n) (${item.inStock ? "y" : "n"}): `);

    if (newNameEn) item.name.en = newNameEn;
    if (newNameHe) item.name.he = newNameHe;
    if (newPrice) item.price = isNaN(newPrice) ? item.price : Number(newPrice);
    if (inStockInput.toLowerCase() === "y") item.inStock = true;
    if (inStockInput.toLowerCase() === "n") item.inStock = false;

    saveMenu(menu);
    console.log("✅ Item updated!");
};

async function deleteItem(){
    const menu = loadMenu();

    listCategories(menu);
    const catIndex = await ask("Select category (or b to go back): ");
    if (catIndex.toLowerCase() === "b") return;

    const category = menu.categories[Number(catIndex) - 1];
    if (!category) return console.log("❌ Invalid category");

    console.log("\nSubcategories:");
    category.subCategories.forEach((s, i) => {
        console.log(`${i + 1}. ${s.name.en}`);
    });

    const subIndex = await ask("Select subcategory (or b to go back): ");
    if (subIndex.toLowerCase() === "b") return;

    const sub = category.subCategories[Number(subIndex) - 1];
    if (!sub) return console.log("❌ Invalid subcategory");

    console.log("\nItems:");
    sub.items.forEach((item, i) => {
        console.log(`${i + 1}. ${item.name.en}`);
    });

    const itemIndex = await ask("Select item to delete (or b to go back): ");
    if (itemIndex.toLowerCase() === "b") return;

    sub.items.splice(Number(itemIndex) - 1, 1);
    saveMenu(menu);

    console.log("❌ Item deleted!");
};

async function selectItemPath(menu){
    listCategories(menu);

    const catIndex = await ask("Select category (or b to go back): ");
    if (catIndex.toLowerCase() === "b") return null;

    const category = menu.categories[Number(catIndex) - 1];
    if (!category) return null;

    console.log("\nSubcategories:");
    category.subCategories.forEach((s, i) => {
        console.log(`${i + 1}. ${s.name.en}`);
    });

    const subIndex = await ask("Select subcategory (or b to go back): ");
    if (subIndex.toLowerCase() === "b") return null;

    const sub = category.subCategories[Number(subIndex) - 1];
    if (!sub) return null;

    console.log("\nItems:");
    sub.items.forEach((item, i) => {
        console.log(`${i + 1}. ${item.name.en} - ₪${item.price}`);
    });

    const itemIndex = await ask("Select item (or b to go back): ");
    if (itemIndex.toLowerCase() === "b") return null;

    const item = sub.items[Number(itemIndex) - 1];
    if (!item) return null;

    return { category, sub, item };
};

async function reorderItem(){
    const menu = loadMenu();

    const selection = await selectItemPath(menu);
    if (!selection) return console.log("❌ Cancelled");

    const { sub, item } = selection;

    console.log("\nMove item:");
    console.log("1. Move Up");
    console.log("2. Move Down");

    const direction = await ask("Choose: ");
    const index = sub.items.indexOf(item);

    if (direction === "1" && index > 0) {
        [sub.items[index - 1], sub.items[index]] =
            [sub.items[index], sub.items[index - 1]];
    }

    if (direction === "2" && index < sub.items.length - 1) {
        [sub.items[index + 1], sub.items[index]] =
            [sub.items[index], sub.items[index + 1]];
    }

    // update order fields
    sub.items.forEach((it, i) => it.order = i + 1);

    saveMenu(menu);

    console.log("🔁 Item reordered!");
};

async function toggleCategoryTitle(){
    const menu = loadMenu();

    listCategories(menu);
    const catIndex = await ask("Select category to toggle title (or b to go back): ");
    if (catIndex.toLowerCase() === "b") return;

    const category = menu.categories[Number(catIndex) - 1];
    if (!category) return console.log("❌ Invalid category");

    category.showCategoryName = !category.showCategoryName;

    saveMenu(menu);
    console.log(
        `✅ Category title is now ${category.showCategoryName ? "VISIBLE" : "HIDDEN"}`
    );
};

async function mainMenu(){
    while(true){
        console.log("\n🍽️ Bootke Menu Manager");
        console.log("1. Add Item");
        console.log("2. Delete Item");
        console.log("3. Add Category");
        console.log("4. Add Subcategory");
        console.log("5. Edit Item");
        console.log("6. Reorder Item");
        console.log("7. Toggle Category Title");
        console.log("8. Exit");

        const choice = await ask("Choose option: ");

        if (choice === "1") await addItem();
        else if (choice === "2") await deleteItem();
        else if (choice === "3") await addCategory();
        else if (choice === "4") await addSubCategory();
        else if (choice === "5") await editItem();
        else if (choice === "6") await reorderItem();
        else if (choice === "7") await toggleCategoryTitle();
        else if (choice === "8") {
            console.log("Bye 👋");
            process.exit(0);
        } else {
            console.log("❌ Invalid option");
        };
    };
};
mainMenu();