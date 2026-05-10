import fs from 'fs';
import { connectToDB } from '../dbService.js';
import { Menu } from '../../menu/models/menu.js';

const rawMenu = JSON.parse(
    fs.readFileSync(
        new URL('./menu.json', import.meta.url),
        'utf-8'
    )
);

function normalizeId(id){
    return String(id)
        .toLowerCase()
        .trim()
        .replace(/['"]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

function normalizePrice(price){
    if (typeof price === 'number'){
        return { regular: price };
    };

    if (typeof price === 'string'){
        const split = price.split('/').map(v => Number(v.trim()));

        if (split.some(n => Number.isNaN(n))){
            throw new Error(`Invalid price string: "${price}"`);
        };

        return {
            regular: split[0],
            ...(split[1] !== undefined && { large: split[1] })
        };
    };

    if (Array.isArray(price)){
        return {
            regular: Number(price[0]),
            ...(price[1] !== undefined && { large: Number(price[1]) })
        };
    };

    if (typeof price === 'object' && price !== null){
        return {
            regular: Number(price.regular),
            ...(price.large !== undefined && {
                large: Number(price.large)
            })
        };
    };
    throw new Error(`Invalid price format: ${price}`);
};

function ensureUniqueIds(menu){
    const categoryIds = new Set();

    for (const category of menu.categories){
        const categoryId = normalizeId(category.id);

        if (categoryIds.has(categoryId)){
            throw new Error(`Duplicate category id: "${categoryId}"`);
        };
        categoryIds.add(categoryId);

        const subCategoryIds = new Set();

        for (const subCategory of category.subCategories || []) {
            const subId = normalizeId(subCategory.id);

            if (subCategoryIds.has(subId)) {
                throw new Error(
                    `Duplicate subCategory id: "${subId}" in category "${categoryId}"`
                );
            };
            subCategoryIds.add(subId);

            const itemIds = new Set();
            for (const item of subCategory.items || []) {
                const itemId = normalizeId(item.id);

                if (itemIds.has(itemId)) {
                    throw new Error(
                        `Duplicate item id: "${itemId}" in "${categoryId} > ${subId}"`
                    );
                };
                itemIds.add(itemId);
            };
        };
    };
};

function normalizeMenu(menu){
    return {
        restaurantName: menu.restaurantName || {
            he: 'בוטקה בר',
            en: 'Bootke Bar'
        },

        isPublished: menu.isPublished ?? true,

        categories: (menu.categories || [])
            .sort((a, b) => a.order - b.order)
            .map(category => ({
                id: normalizeId(category.id),
                order: category.order,
                name: category.name,
                description: category.description || {},
                image: category.image || null,
                hide: category.hide ?? false,
                showCategoryName: category.showCategoryName ?? false,

                subCategories: (category.subCategories || [])
                    .sort((a, b) => a.order - b.order)
                    .map(sub => ({
                        id: normalizeId(sub.id),
                        order: sub.order,
                        name: sub.name,
                        description: sub.description || {},
                        image: sub.image || null,
                        hide: sub.hide ?? false,

                        items: (sub.items || [])
                            .sort((a, b) => a.order - b.order)
                            .map(item => ({
                                id: normalizeId(item.id),
                                order: item.order,
                                name: item.name,
                                description: item.description || {},
                                image: item.image || null,
                                hide: item.hide ?? false,
                                inStock: item.inStock ?? true,
                                price: normalizePrice(item.price)
                            }))
                    }))
            }))
    };
};

async function seedMenu(){
    try {
        console.log('\nStarting menu seed...\n');

        await connectToDB();
        console.log('Connected to DB');

        ensureUniqueIds(rawMenu);
        console.log('ID validation passed');

        const normalizedMenu = normalizeMenu(rawMenu);
        await Menu.deleteMany({});
        console.log('Old menu removed');

        await Menu.create(normalizedMenu);
        console.log('\nMenu seeded successfully\n');
        process.exit(0);
    } catch (err) {
        console.error('\nMenu seed failed:\n');
        console.error(err);
        process.exit(1);
    };
};
seedMenu();