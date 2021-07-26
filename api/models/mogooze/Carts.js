const { Schema } = mongoose;
const conn = require('../../lib/mongo');

const CartsSchema = new Schema({
    client_id: Number,
    products: [{
        product_id: Number,
        quantity: String
    }]
});

const Carts = conn.model('Carts', CartsSchema);

export default Carts;