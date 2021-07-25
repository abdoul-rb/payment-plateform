import mongoose from 'mongoose';
const { Schema } = mongoose;

const CartsSchema = new Schema({
    client_id: Number,
    products: [{
        product_id: Number,
        quantity: String
    }]
});

const Carts = mongoose.model('Carts', CartsSchema);

export default Carts;