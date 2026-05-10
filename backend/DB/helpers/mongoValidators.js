

const DEFAULT_VALIDATION = {
    type: String,
    required: false,
    trim: true,
    maxLength: 512
};

const DEFAULT_VALIDATION_REQ = {
    type: String,
    trim: true,
    required: true,
    minLength: 2,
    maxLength: 512
};

const DEFAULT_ID = {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[a-z0-9_-]+$/
};

const DEFAULT_ORDER = {
    type: Number,
    required: true,
    min: 0
};

const DEFAULT_NUM = {
    type: Number,
    required: true,
    min: 0
};

const DEFAULT_PRICE = {
    regular: {
        type: Number,
        required: true,
        min: 0
    },
    large: {
        type: Number,
        required: false,
        min: 0
    }
};

const DEFAULT_HIDE = {
    type: Boolean,
    default: false
};

const localizedStringRequired = {
    he: {...DEFAULT_VALIDATION_REQ},
    en: {...DEFAULT_VALIDATION_REQ}
}; 

const localizedStringOptional = {
    he: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024,
    },
    en: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024,
    }
};

export { DEFAULT_VALIDATION, DEFAULT_VALIDATION_REQ, DEFAULT_NUM,
        DEFAULT_PRICE, localizedStringRequired, localizedStringOptional,
        DEFAULT_ID, DEFAULT_ORDER, DEFAULT_HIDE
    };