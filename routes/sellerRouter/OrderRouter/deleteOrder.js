import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from "../../../models/orderModel.js";
import { isAdmin, isAuth } from '../../../utils.js';




const deleteOrder = express.Router();

deleteOrder.delete('/:id', isAuth, isAdmin, expressAsyncHandler(
  async (req, res) => {
    const data = await Order.findById(req.params.id);
    console.log(data)
    if (data) {
      await data.remove();
      res.status(201).send({message : 'Order deleted!' })
    } else {
      res.status(404).send({ message: "order not found" });
    }
  }
));

export default deleteOrder;