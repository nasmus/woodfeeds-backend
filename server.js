import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import adminLogInRouter from './routes/AdminRouter/AdimnLogin/adminLogInRouter.js';
import adminDashboardApi from './routes/AdminRouter/AdminApi/adminDashboardApi.js';
import orderList from './routes/AdminRouter/AdminApi/orderList.js';
import productListApi from './routes/AdminRouter/AdminApi/productListApi.js';
import categoryApi from './routes/AdminRouter/Category/categoryApi.js';
import orderRouter from './routes/orderRouter.js';
import productRouter from './routes/productRouter.js';
import seedRouter from './routes/seedRoutes.js';
import categorySellerApi from './routes/sellerRouter/Category/categorySellerApi.js';
import deleteOrder from './routes/sellerRouter/OrderRouter/deleteOrder.js';
import sellerOrderRouter from './routes/sellerRouter/OrderRouter/sellerOrderRouter.js';
import sellerProductRouter from './routes/sellerRouter/ProductRouter/sellerProductRouter.js';
import deleteProduct from './routes/sellerRouter/deleteProduct.js';
import productCreateRouter from './routes/sellerRouter/productCreateRouter.js';
import sellerRouter from './routes/sellerRouter/sellerRouter.js';
import userRouter from './routes/userRouter.js';
import getCategoryRouter from './routes/userRouter/Category/category.js';
import productDelevaryStatus from './routes/userRouter/ProductReview/productDelevaryStatus.js';
import review from './routes/userRouter/ProductReview/review.js';
import TopProductRouter from './routes/userRouter/ProductView/TopProductRouter.js';
import countInStock from './routes/userRouter/ProductView/countInStock.js';
import productRating from './routes/userRouter/productRating.js';
import randomProductApi from './routes/userRouter/randomProductApi.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(cors())


//mongoose.set("strictQuery", false);
// seed Api calling
app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/random', randomProductApi);
app.use('/api/rating', productRating);
app.use('/api/category', getCategoryRouter)
app.use('/api/top_product', TopProductRouter) // 
app.use('/api/user_review', review) // product review api
app.use('/api/delevary_status', productDelevaryStatus); //product delevary status
app.use('/api/count_in_stock', countInStock)

//seller api
app.use('/api/seller', sellerRouter);
app.use('/api/product', productCreateRouter);
app.use('/api/allproduct', productCreateRouter);
app.use('/api/delete', deleteProduct);
app.use('/api/edit', productCreateRouter);
app.use('/app', productCreateRouter);
// seller order api
app.use('/api/order', sellerOrderRouter);
app.use('/api/productdetails', sellerProductRouter);
app.use('/api/orderdelete', deleteOrder);

app.use('/api/summary',sellerOrderRouter);// seller order summery
app.use('/api/order/status',sellerOrderRouter);//seller order status update
app.use('/api/count',sellerProductRouter); //seller product count
app.use('/api/seller/category', categorySellerApi) //send all category

app.use('/images',express.static(path.join(__dirname, 'uploads/images'))); //image access from server
// image show from clint
//app.use('/images', express.static('uploads/images'));

// Admin Router


app.use('/api/admin', adminLogInRouter) //login router
app.use('/api/admin/storelist', adminDashboardApi) // seller count from dashboard
app.use('/api/admin/productlist', productListApi) // seller all product 
app.use('/api/admin/orderlist', orderList) // seller all order list and information
app.use('/api/admin/alluser',adminDashboardApi) // all customer list who is sign up in this website
app.use('/api/admin/order',adminDashboardApi) // admin order count in dashboard
app.use('/api/admin/product',adminDashboardApi) // admin all seller product count 
app.use('/api/admin/selles', adminDashboardApi); // admin all seller list

// admin category

app.use('/api/admin', categoryApi) // admin category create
app.use('/api/admin/category', categoryApi) // admin category view

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URL).then(()=> {
    console.log('connect to db')
}).catch((err)=> {
    console.log(err.message);
})



const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server at http://localhost:${port}`);
})
