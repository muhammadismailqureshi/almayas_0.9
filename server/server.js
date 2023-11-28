
// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const authRoutes = require('./routes/auth');
                                //const {MongoClient, ServerApiVersion} = require('mongodb');
                                //const uri = "mongodb+srv://almayasDB:5Qdg9ucwYhAK5qBG@cluster0.yuybgfn.mongodb.net/?retryWrites=true&w=majority";

                                /*const client = new MongoClient(uri, { 
                                    serverApi: {
                                        version: ServerApiVersion.v1,
                                        strict: true,
                                        deprecationErrors: true,
                                    }
                                });

                                async function run() {
                                    try {
                                        // Connect the client to the server
                                        await client.connect();
                                        // send a ping to confirm the connection
                                        await client.db("admin").command({ ping: 1 });
                                        console.log("pinged your deployment. you successfully connected to MongoDB Atlas");
                                    } finally {
                                        // Ensures that the client will close when you finish/error
                                        await client.close();
                                    }
                                }
                                run().catch(console.dir);*/



const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());


// API endpoints to get all products, get a single product, create a product, update a product, and delete a product

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error getting products', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

// API endpoints to create a new order/ checkout
app.post('/api/orders', async (req, res) => {
    const { userId, products, totalAmount, paymentMethod } = req.body;

    try {
        const order = new Order({
            user: userId,
            products: products.map((product) => ({
                product: product.productId,
                quantity: product.quantity,
            })),
            totalAmount,
            status: 'pending',
            paymentMethod, // COD, JazzCash, Easypaisa etc. payment method
        });
        await order.save();
        res.json(order);
    } catch (error) {
        console.error('Error creating order', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

// API endpoints to get featured products
app.get('/api/products/featured', async (req, res) => {
    try {
        // Adjust the query to match your definition of featured products
        const featuredProducts = await Product.find({ featured: true });
        res.json(featuredProducts);
    } catch (error) {
      console.error('Error fetching featured products', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    }
);

// API endpoints to get items in a user's cart
app.get('/api/cart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        //Fetch the user's cart from the database and calculate the total amount


        const userCart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!userCart) {
            return res.json({ items: [], totalAmount: 0 });
        }

        const cartItems = userCart.items.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity,
        }));

        const totalAmount = cartItems.reduce((total, item) => total + item.subtotal, 0);

        res.json({ items: cartItems, totalAmount });
    } catch (error) {
        console.error('Error fetching cart items', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

// API endpoints to get details about a specific product

app.get('/api/products/:productId', async (req, res) => {

    const { productId } = req.params;

    try {

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product details', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);        

// API endpoints to create a new user
app.post('/api/users', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if a user with the same email already exists

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'A user with the same email already exists' });
        }

        // Create a new user

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.json(newUser);
    } catch (error) {
        console.error('Error creating new user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

    
        

            


// Connect to MongoDB
mongoose.connect('mongodb+srv://almayasDB:5Qdg9ucwYhAK5qBG@cluster0.yuybgfn.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongoose', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
    });
});

//Use the auth routes
app.use('/api/auth', authRoutes);

// Add your API routes here
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
