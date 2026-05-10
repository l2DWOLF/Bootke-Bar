import mongoose from 'mongoose';
import { DEFAULT_VALIDATION, DEFAULT_VALIDATION_REQ, DEFAULT_PRICE, localizedStringRequired, localizedStringOptional, DEFAULT_ID, DEFAULT_ORDER, DEFAULT_HIDE } from '../../DB/helpers/mongoValidators.js';

const itemSchema = new mongoose.Schema({
    id: DEFAULT_ID,
    order: DEFAULT_ORDER,
    price: DEFAULT_PRICE,
    name: localizedStringRequired,
    description: localizedStringOptional,
    image: {...DEFAULT_VALIDATION, default: null},
    hide: DEFAULT_HIDE,

    inStock: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    _id: true,
    versionKey: false
});

const subCategorySchema = new mongoose.Schema({
    id: DEFAULT_ID,
    order: DEFAULT_ORDER, 
    name: localizedStringRequired,
    description: localizedStringOptional,
    image: { ...DEFAULT_VALIDATION, default: null },
    hide: DEFAULT_HIDE,

    items: {
        type: [itemSchema],
        default: []
    }
}, {
    timestamps: true,
    _id: false,
    versionKey: false
});

const categorySchema = new mongoose.Schema({
    id: DEFAULT_ID,
    order: DEFAULT_ORDER,
    name: localizedStringRequired,
    description: localizedStringOptional,
    image: { ...DEFAULT_VALIDATION, default: null },
    hide: DEFAULT_HIDE,

    showCategoryName: {
        type: Boolean,
        default: false
    },
    subCategories: {
        type: [subCategorySchema],
        default: []
    }
},{
    timestamps: true,
    _id: false, 
    versionKey: false
}
);

const menuSchema = new mongoose.Schema({
    restaurantName: localizedStringRequired || {
        he: 'בוטקה בר',
        en: 'Bootke Bar'
    },

    isPublished: {
        type: Boolean,
        default: true
    },
    categories: {
        type: [categorySchema],
        default: []
    }
}, { timestamps: true });

export const Menu = mongoose.model("Menu", menuSchema);