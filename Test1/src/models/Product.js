const { default: mongoose, Schema } = require('mongoose');

const productSchema = mongoose.Schema({
    images: {
        type: Array,
        default: [],
    },
});

productSchema.index(
    {
        title: 'text',
        description: 'text',
    },
    {
        weights: {
            title: 5,
            description: 1,
        },
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
