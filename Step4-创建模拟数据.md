# Step 4: 创建模拟数据 (Mock Data)
## Creating Mock Data with JSON Server

---

## 🎯 学习目标 (Learning Objectives)

完成这一步后，你将能够：
- ✅ 理解什么是 JSON Server
- ✅ 理解如何设计用户数据
- ✅ 理解如何设计产品数据
- ✅ 创建 `db.json` 文件
- ✅ 启动 JSON Server

---

## 📖 第一部分：什么是 JSON Server？

### 1.1 什么是 JSON Server？(What is JSON Server?)

**JSON Server** 是一个简单的 REST API 模拟服务器。

**简单理解：**
- 不需要写后端代码
- 只需要一个 JSON 文件
- 自动提供 REST API 接口

**作用：**
- 前端开发时，模拟后端 API
- 测试数据交互
- 快速原型开发

---

### 1.2 JSON Server 的工作原理 (How JSON Server Works)

**工作流程：**

```
db.json (数据文件)
    ↓
JSON Server 读取
    ↓
自动创建 REST API
    ↓
前端通过 HTTP 请求访问
```

**自动创建的 API：**

```
GET    /users          → 获取所有用户
GET    /users/1        → 获取 ID 为 1 的用户
POST   /users          → 创建新用户
PUT    /users/1        → 更新 ID 为 1 的用户
DELETE /users/1        → 删除 ID 为 1 的用户
```

---

## 📖 第二部分：设计用户数据 (Designing User Data)

### 2.1 用户数据结构 (User Data Structure)

**根据 Step 3 的 User 接口，设计用户数据：**

```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "password": "123456",
      "role": "admin",
      "permissions": [
        "view_dashboard",
        "view_products",
        "edit_products",
        "delete_products"
      ]
    }
  ]
}
```

**字段说明：**

1. **`id`**: 用户唯一标识
   - 类型：string
   - 示例：`"1"`, `"2"`, `"3"`

2. **`username`**: 用户名
   - 类型：string
   - 示例：`"admin"`, `"manager"`, `"user"`

3. **`password`**: 密码
   - 类型：string
   - ⚠️ 注意：实际项目中不应该存储在前端

4. **`role`**: 角色
   - 类型：string
   - 值：`"admin"`, `"manager"`, `"user"`, `"guest"`

5. **`permissions`**: 权限数组
   - 类型：string[]
   - 值：权限字符串数组

---

### 2.2 创建不同角色的用户 (Creating Users with Different Roles)

**完整的用户数据：**

```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "password": "123456",
      "role": "admin",
      "permissions": [
        "view_dashboard",
        "view_products",
        "edit_products",
        "delete_products"
      ]
    },
    {
      "id": "2",
      "username": "manager",
      "password": "123456",
      "role": "manager",
      "permissions": [
        "view_dashboard",
        "view_products",
        "edit_products"
      ]
    },
    {
      "id": "3",
      "username": "user",
      "password": "123456",
      "role": "user",
      "permissions": [
        "view_dashboard",
        "view_products"
      ]
    }
  ]
}
```

**观察：**
- 不同用户有不同的 `role`
- 不同用户有不同的 `permissions`
- Admin 有所有权限
- Manager 没有删除权限
- User 只有查看权限

---

## 📖 第三部分：设计产品数据 (Designing Product Data)

### 3.1 产品数据结构 (Product Data Structure)

**产品数据应该包含：**

```json
{
  "products": [
    {
      "id": "1",
      "name": "Apple",
      "price": 2.99
    }
  ]
}
```

**字段说明：**

1. **`id`**: 产品唯一标识
   - 类型：string
   - 示例：`"1"`, `"2"`, `"3"`

2. **`name`**: 产品名称
   - 类型：string
   - 示例：`"Apple"`, `"Bread"`, `"Candy"`

3. **`price`**: 产品价格
   - 类型：number
   - 示例：`2.99`, `8.99`, `21.99`

---

### 3.2 创建产品数据 (Creating Product Data)

**完整的产品数据：**

```json
{
  "products": [
    {
      "id": "1",
      "name": "Apple",
      "price": 2.99
    },
    {
      "id": "2",
      "name": "Bread",
      "price": 8.99
    },
    {
      "id": "3",
      "name": "Candy",
      "price": 21.99
    },
    {
      "id": "4",
      "name": "Iphone 17",
      "price": 1002.99
    },
    {
      "id": "5",
      "name": "Banana",
      "price": 12.99
    }
  ]
}
```

---

## 📖 第四部分：创建 db.json 文件

### 4.1 完整的 db.json 文件 (Complete db.json File)

**在项目根目录创建 `db.json`：**

```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "password": "123456",
      "role": "admin",
      "permissions": [
        "view_dashboard",
        "view_products",
        "edit_products",
        "delete_products"
      ]
    },
    {
      "id": "2",
      "username": "manager",
      "password": "123456",
      "role": "manager",
      "permissions": [
        "view_dashboard",
        "view_products",
        "edit_products"
      ]
    },
    {
      "id": "3",
      "username": "user",
      "password": "123456",
      "role": "user",
      "permissions": [
        "view_dashboard",
        "view_products"
      ]
    }
  ],
  "products": [
    {
      "id": "1",
      "name": "Apple",
      "price": 2.99
    },
    {
      "id": "2",
      "name": "Bread",
      "price": 8.99
    },
    {
      "id": "3",
      "name": "Candy",
      "price": 21.99
    },
    {
      "id": "4",
      "name": "Iphone 17",
      "price": 1002.99
    },
    {
      "id": "5",
      "name": "Banana",
      "price": 12.99
    }
  ]
}
```

**文件结构：**
```
Rainbow_Retailer/
├── db.json          ← 在这里创建
├── package.json
├── src/
└── ...
```

---

### 4.2 JSON 文件格式要求 (JSON Format Requirements)

**重要规则：**

1. **必须是有效的 JSON**
   - 使用双引号 `"`，不是单引号 `'`
   - 最后一个属性后不能有逗号

2. **数组和对象**
   - `users` 和 `products` 是数组 `[]`
   - 每个用户和产品是对象 `{}`

3. **数据类型**
   - `id` 和 `username` 是字符串 `"1"`
   - `price` 是数字 `2.99`
   - `permissions` 是数组 `[]`

---

## 📖 第五部分：安装和启动 JSON Server

### 5.1 安装 JSON Server (Install JSON Server)

**全局安装（推荐）：**

```bash
npm install -g json-server
```

**或者本地安装：**

```bash
npm install --save-dev json-server
```

---

### 5.2 启动 JSON Server (Start JSON Server)

**启动命令：**

```bash
json-server --watch db.json --port 3001
```

**参数说明：**
- `--watch db.json`: 监听 `db.json` 文件的变化
- `--port 3001`: 使用端口 3001（避免与 Vite 的 5173 冲突）

**成功启动后，你会看到：**

```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:3001/users
http://localhost:3001/products

Home
http://localhost:3001
```

---

### 5.3 测试 API (Test API)

**在浏览器中访问：**

1. **获取所有用户**
   ```
   http://localhost:3001/users
   ```

2. **获取特定用户**
   ```
   http://localhost:3001/users/1
   ```

3. **获取所有产品**
   ```
   http://localhost:3001/products
   ```

4. **获取特定产品**
   ```
   http://localhost:3001/products/1
   ```

---

### 5.4 在 package.json 中添加脚本 (Add Script to package.json)

**为了方便，可以在 `package.json` 中添加脚本：**

```json
{
  "scripts": {
    "dev": "vite",
    "start": "vite",
    "build": "tsc -b && vite build",
    "api": "json-server --watch db.json --port 3001"
  }
}
```

**然后使用：**

```bash
npm run api
```

---

## 📖 第六部分：在项目中使用 API

### 6.1 API 基础 URL (API Base URL)

**在我们的项目中，API 基础 URL 是：**

```typescript
// src/api/index.ts
const API_URL = "http://localhost:3001";
```

---

### 6.2 登录 API (Login API)

**登录时，查询用户：**

```typescript
// src/api/index.ts
export const login = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`, {
      params: { username, password },
    });
    return response.data[0] || null;
  } catch (error) {
    console.log("Login failed: ", error);
    return null;
  }
};
```

**工作原理：**
1. 发送 GET 请求到 `/users`
2. 传递 `username` 和 `password` 作为查询参数
3. JSON Server 返回匹配的用户
4. 返回第一个匹配的用户，或 null

---

### 6.3 获取产品 API (Get Products API)

**获取产品列表：**

```typescript
// src/api/index.ts
export const getProducts = async (): Promise<Product[] | null> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch products ", error);
    return null;
  }
};
```

---

## 🎯 总结 (Summary)

### 核心概念：

1. **JSON Server**: 简单的 REST API 模拟服务器
2. **db.json**: 数据文件，包含 users 和 products
3. **REST API**: 自动创建的 HTTP 接口

### 数据结构：

```
db.json
├── users: User[]
│   ├── id, username, password, role, permissions
└── products: Product[]
    └── id, name, price
```

### 关键点：

- ✅ JSON Server 不需要后端代码
- ✅ 只需要一个 JSON 文件
- ✅ 自动提供 REST API
- ✅ 适合前端开发和测试

---

## ✅ 检查点 (Checkpoint)

回答以下问题，确保你理解了：

1. **JSON Server 的作用是什么？**
   - 模拟后端 API，不需要写后端代码

2. **db.json 文件包含什么？**
   - users 数组和 products 数组

3. **如何启动 JSON Server？**
   - `json-server --watch db.json --port 3001`

4. **如何访问用户数据？**
   - `http://localhost:3001/users`

---

## 🚀 下一步

完成了模拟数据创建后，我们进入 **Step 5: 构建认证上下文 (AuthContext)**！

在 Step 5 中，我们将学习：
- 如何创建 AuthContext
- 如何实现登录/登出功能
- 如何实现权限检查功能

---

**准备好了吗？让我们继续 Step 5！** 🎉

