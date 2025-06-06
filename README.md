# FullStackShoppingSite
📌 项目概述
该项目包含以下主要部分：

前端（Frontend）：使用 React.js 构建的响应式网站，用户可以浏览菜单、添加商品至购物车、填写地址并下单。

后端（Backend）：基于 Node.js 和 Express.js 搭建的服务器，处理用户认证、订单管理、支付接口等。

数据库（Database）：使用 MongoDB 存储用户信息、订单记录和菜单数据。

支付集成（Payment Integration）：集成 Stripe 支付网关，支持安全的在线支付。

🚀 功能亮点
用户认证系统：支持用户注册、登录、身份验证。

菜单浏览：用户可以查看、筛选和搜索菜单项。

购物车功能：添加、删除、修改商品数量，实时计算总价。

下单流程：填写送餐地址、选择支付方式、提交订单。

管理员面板：管理员可以查看订单、更新订单状态。

支付系统：集成 Stripe，实现安全的支付流程。

🛠️ 技术栈
前端：React.js、Vite-Lite、HTML、CSS、JavaScript

后端：Node.js、Express.js

数据库：MongoDB

支付网关：Stripe

开发工具：VSCode、Postman（用于 API 测试）

> 📂 项目结构
bash  
复制  
编辑  
/Complete-Food-Delivery  
│
├── /frontend          # React.js 前端应用  
├── /backend           # Node.js 和 Express 后端服务器  
├── /admin             # 管理员面板界面  
├── /models            # MongoDB 模型（用户、订单等）  
└── /controllers       # 后端逻辑处理（用户、订单等）  

🧪 环境搭建  
前提条件  
安装 Node.js 和 npm  

注册 MongoDB Atlas 账户，获取数据库连接字符串  

注册 Stripe 账户，获取 API 密钥  