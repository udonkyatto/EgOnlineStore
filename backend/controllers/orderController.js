import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // 确保正确初始化 Stripe

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // 创建订单
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // 清空购物车
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // 准备 line_items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",  // 货币
        product_data: {
          name: item.name,  // 商品名称
        },
        unit_amount: item.price * 100 * 80,  // 价格，确保是最小货币单位（例如 paise）
      },
      quantity: item.quantity,
    }));

    // 添加配送费用
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",  // 配送费用
        },
        unit_amount: 2 * 100 * 80,  // 配送费用，确保是最小货币单位
      },
      quantity: 1,
    });

    console.log("==>> STRIPE_SECRET_KEY :", process.env.STRIPE_SECRET_KEY); // 打印密钥

    // 创建 Stripe 会话
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],  // 支付方式
      line_items: line_items,  // 商品项
      mode: 'payment',  // 支付模式
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // 返回 session_url 给前端
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error details:", error.message);
    res.json({ success: false, message: "PlaceOrder Error", error: error.message });
  }
};

const verifyOrder = async (req,res) => {
  const {orderId,success} = req.body
  try {
    if(success =="true") {
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      res.json({success:true,message:"Paid"})
    }
    else {
      await orderModel.findOneAndDelete(orderId)
      res.json({success:false,message:"Not Paid"})
    }
  } catch (error) {
    console.log(error)
    res.json({success: false,message:"VerifyOrder Error"})
  }
}

//use orders for frontend
const userOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({userId:req.userId})
    res.json({success: true,data: orders})
  } catch (error) {
    console.log(error)
    res.json({success: false,message: "UserOrders Error"})
  }
}

// Listing orders for admin panel
const listOrders = async(req,res) => {
    try {
      const orders = await orderModel.find({})
      res.json({success: true,data:orders})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"ListOrders Error"})
    }
}

// api for updating order status
const updateStatus = async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status: req.body.status})
    res.json({success: true,message: "Status Updated"})
  } catch (error) {
    console.log(error)
    res.json({success: false,message:"UpdateStatus Error"})
  }
}

export { placeOrder , verifyOrder , userOrders , listOrders , updateStatus};
