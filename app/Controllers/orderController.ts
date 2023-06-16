// import { Request, Response } from "express";
import { isLoggedin } from "../Middleware/userAuth";

const dbOrder = require("../Models");

const Order = dbOrder.order;
const OrderItem = dbOrder.orderItem;
const Product = dbOrder.product;

// function to place an order and save it to the database
//the user can only create an order if they are logged in
// the user can place several orders
// an order can contain one or several items, each of them represents a single product
export const placeOrder = async (req: any, res: any) => {
    try {
        await isLoggedin(req, res, async () => {
            const { orderDate, totalPrice } = req.body;

            const orderData = {
                orderDate,
                totalPrice, 
            };
            const userId = req.params.id;

            // Create the order and associate it with the user
            const order = await Order.create(orderData, { userId });
            const items = req.body.items;
            // create order_items and associate them with the order
            for (const item of items) {
                const { productId, orderItemPrice, orderItemQuantity } = item;

                const orderItemData = {
                    productId,
                    orderItemPrice,
                    orderItemQuantity,
                    orderId: order.id,
                };

                const orderItem = await OrderItem.create(orderItemData);
                const product = await Product.findByPk(productId);
                await orderItem.setProduct(product);
            }
            return res.status(201).json(order);
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Failed to create order" });
    }
};

// function to get all orders from a user

export const getUsersOrders = async (req: any, res: any) => {
    try {
        const userId = req.params.id;

        const orders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    include: [Product],
                }
            ],
        });
        return res.status(200).json(orders);
    } catch (error) {
        console.log("Error getting orders:", error);
        return res.status(500).json({ message: "Failed to get orders" });
    }
};