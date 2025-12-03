# Step 3: 设计用户和权限数据模型
## Designing User and Permission Data Models

---

## 🎯 学习目标 (Learning Objectives)

完成这一步后，你将能够：
- ✅ 理解 User (用户) 数据结构
- ✅ 理解 Role (角色) 和 Permission (权限) 的定义
- ✅ 理解角色与权限的映射关系
- ✅ 创建 `src/utils/roles.ts` 文件

---

## 📖 第一部分：理解数据模型 (Understanding Data Models)

### 1.1 什么是数据模型？(What is a Data Model?)

**数据模型 (Data Model)** 定义了数据的结构和关系。

**简单理解：**
- 就像"表格设计"，定义每列是什么
- 定义数据之间的关系
- 确保数据的一致性

**在我们的项目中：**
- User (用户) 模型：用户有哪些属性
- Role (角色) 模型：有哪些角色
- Permission (权限) 模型：有哪些权限
- 角色与权限的映射：每个角色有哪些权限

---

## 📖 第二部分：User (用户) 数据结构

### 2.1 User 接口定义 (User Interface Definition)

**在我们的项目中，User 包含以下信息：**

```typescript
// src/context/AuthContext.tsx
export interface User {
    id: string;              // 用户 ID
    username: string;        // 用户名
    password: string;        // 密码（实际项目中不应该存储在前端）
    role: string;           // 角色：admin, manager, user, guest
    permissions: string[];  // 权限列表：["view_products", "edit_product", ...]
}
```

**逐字段解释：**

1. **`id: string`**
   - 用户的唯一标识符
   - 例如：`"1"`, `"2"`, `"3"`

2. **`username: string`**
   - 用户名，用于登录
   - 例如：`"admin"`, `"manager"`, `"user"`

3. **`password: string`**
   - 密码（注意：实际项目中不应该存储在前端）
   - 这里只是为了演示

4. **`role: string`**
   - 用户的角色
   - 例如：`"admin"`, `"manager"`, `"user"`, `"guest"`

5. **`permissions: string[]`**
   - 权限数组
   - 例如：`["view_dashboard", "view_products", "edit_product"]`

---

### 2.2 实际数据示例 (Real Data Example)

**从 `db.json` 中可以看到实际的用户数据：**

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
- `permissions` 是一个数组

---

## 📖 第三部分：Role (角色) 定义

### 3.1 为什么需要角色？(Why Do We Need Roles?)

**角色 (Role)** 是用户的身份标识。

**简单理解：**
- 就像公司里的职位：CEO、经理、员工
- 不同职位有不同的权限
- 角色是权限的集合

**在我们的项目中，有4种角色：**

```typescript
// src/utils/roles.ts
export const ROLES = {
    ADMIN: "admin",        // 管理员
    MANAGER: "manager",    // 经理
    USER: "user",          // 普通用户
    GUEST: "guest",        // 访客
};
```

**角色说明：**

1. **ADMIN (管理员)**
   - 最高权限
   - 可以执行所有操作

2. **MANAGER (经理)**
   - 可以管理产品
   - 但不能删除

3. **USER (普通用户)**
   - 只能查看
   - 不能修改

4. **GUEST (访客)**
   - 权限最少
   - 只能看首页

---

### 3.2 为什么使用常量？(Why Use Constants?)

**使用常量的好处：**

```typescript
// ❌ 不好的做法：直接使用字符串
if (user.role === "admin") { ... }
if (user.role === "Admin") { ... }  // 大小写错误！
if (user.role === "ADMIN") { ... }  // 全大写错误！

// ✅ 好的做法：使用常量
import { ROLES } from './utils/roles';
if (user.role === ROLES.ADMIN) { ... }  // 不会出错！
```

**优势：**
- ✅ 避免拼写错误
- ✅ 代码提示（IDE 自动补全）
- ✅ 易于维护（修改一处，全局生效）

---

## 📖 第四部分：Permission (权限) 定义

### 4.1 什么是权限？(What is Permission?)

**权限 (Permission)** 是具体的操作权限。

**简单理解：**
- 权限是"能做什么"
- 例如：能查看产品、能编辑产品、能删除产品

**在我们的项目中，有4种权限：**

```typescript
// src/utils/roles.ts
export const PERMISSIONS = {
    VIEW_DASHBOARD: "view_dashboard",    // 查看仪表板
    VIEW_PRODUCTS: "view_products",      // 查看产品
    EDIT_PRODUCT: "edit_product",      // 编辑产品
    DELETE_PRODUCT: "delete_product",    // 删除产品
};
```

**权限说明：**

1. **VIEW_DASHBOARD**
   - 可以访问首页（Dashboard）
   - 所有用户都应该有这个权限

2. **VIEW_PRODUCTS**
   - 可以查看产品列表
   - 普通用户和管理员都有

3. **EDIT_PRODUCT**
   - 可以编辑产品信息
   - 只有经理和管理员有

4. **DELETE_PRODUCT**
   - 可以删除产品
   - 只有管理员有

---

### 4.2 权限命名规范 (Permission Naming Convention)

**常见的命名模式：**

```
操作_资源
例如：
- VIEW_PRODUCTS    (查看_产品)
- EDIT_PRODUCT     (编辑_产品)
- DELETE_PRODUCT    (删除_产品)
```

**好处：**
- ✅ 清晰明了
- ✅ 易于理解
- ✅ 易于扩展

---

## 📖 第五部分：角色与权限的映射 (Role-Permission Mapping)

### 5.1 映射关系 (Mapping Relationship)

**不同角色拥有不同的权限：**

```typescript
// src/utils/roles.ts
export const ROLES_PERMISSIONS: Record<string, string[]> = {
    // Admin: 拥有所有权限
    [ROLES.ADMIN]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_PRODUCTS,
        PERMISSIONS.EDIT_PRODUCT,
        PERMISSIONS.DELETE_PRODUCT
    ],
    
    // Manager: 可以查看和编辑，但不能删除
    [ROLES.MANAGER]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_PRODUCTS,
        PERMISSIONS.EDIT_PRODUCT
    ],
    
    // User: 只能查看
    [ROLES.USER]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_PRODUCTS
    ],
    
    // Guest: 只能看首页
    [ROLES.GUEST]: [
        PERMISSIONS.VIEW_DASHBOARD
    ],
};
```

**可视化理解：**

```
┌─────────┬──────────┬──────────┬──────────┬──────────┐
│ Role    │ Dashboard│ Products │ Edit     │ Delete   │
├─────────┼──────────┼──────────┼──────────┼──────────┤
│ Admin   │    ✅    │    ✅    │    ✅    │    ✅    │
│ Manager │    ✅    │    ✅    │    ✅    │    ❌    │
│ User    │    ✅    │    ✅    │    ❌    │    ❌    │
│ Guest   │    ✅    │    ❌    │    ❌    │    ❌    │
└─────────┴──────────┴──────────┴──────────┴──────────┘
```

---

### 5.2 为什么需要映射？(Why Do We Need Mapping?)

**映射的作用：**

1. **集中管理**
   - 所有角色和权限的关系在一个地方
   - 易于维护和修改

2. **动态分配**
   - 可以根据角色自动分配权限
   - 不需要在每个用户数据中重复定义

3. **易于扩展**
   - 添加新角色或权限很容易
   - 只需修改映射表

---

## 📖 第六部分：创建 roles.ts 文件

### 6.1 完整代码 (Complete Code)

```typescript
// src/utils/roles.ts

// 1. 定义角色常量
export const ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    USER: "user",
    GUEST: "guest",
};

// 2. 定义权限常量
export const PERMISSIONS = {
    VIEW_DASHBOARD: "view_dashboard",
    VIEW_PRODUCTS: "view_products",
    EDIT_PRODUCT: "edit_product",
    DELETE_PRODUCT: "delete_product",
};

// 3. 定义角色与权限的映射
export const ROLES_PERMISSIONS: Record<string, string[]> = {
    [ROLES.ADMIN]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_PRODUCTS,
        PERMISSIONS.EDIT_PRODUCT,
        PERMISSIONS.DELETE_PRODUCT
    ],
    [ROLES.MANAGER]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_PRODUCTS,
        PERMISSIONS.EDIT_PRODUCT
    ],
    [ROLES.USER]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_PRODUCTS
    ],
    [ROLES.GUEST]: [
        PERMISSIONS.VIEW_DASHBOARD
    ],
};
```

---

### 6.2 如何使用 (How to Use)

**在其他文件中导入和使用：**

```typescript
// src/routes/_protected/products.tsx
import { PERMISSIONS } from "../../utils/roles";

// 检查权限
if (hasPermission(PERMISSIONS.VIEW_PRODUCTS)) {
    // 显示产品列表
}

if (hasPermission(PERMISSIONS.DELETE_PRODUCT)) {
    // 显示删除按钮
}
```

```typescript
// src/components/ProtectedRoutes.tsx
import { PERMISSIONS } from "../utils/roles";

<ProtectedRoutes permission={[PERMISSIONS.VIEW_PRODUCTS]}>
    <ProductsPage />
</ProtectedRoutes>
```

---

## 🎯 总结 (Summary)

### 核心概念：

1. **User (用户)**: 包含 id, username, role, permissions
2. **Role (角色)**: 用户的身份（admin, manager, user, guest）
3. **Permission (权限)**: 具体的操作权限（view, edit, delete）
4. **映射关系**: 每个角色对应一组权限

### 数据结构：

```
User
├─ id: string
├─ username: string
├─ role: string (引用 ROLES)
└─ permissions: string[] (引用 PERMISSIONS)

ROLES_PERMISSIONS
├─ [ROLES.ADMIN]: [所有权限]
├─ [ROLES.MANAGER]: [查看 + 编辑]
├─ [ROLES.USER]: [查看]
└─ [ROLES.GUEST]: [仅首页]
```

### 关键点：

- ✅ 使用常量避免拼写错误
- ✅ 集中管理角色和权限
- ✅ 易于维护和扩展

---

## ✅ 检查点 (Checkpoint)

回答以下问题，确保你理解了：

1. **User 接口包含哪些字段？**
   - id, username, password, role, permissions

2. **为什么使用 ROLES 常量而不是直接使用字符串？**
   - 避免拼写错误，代码提示，易于维护

3. **ROLES_PERMISSIONS 的作用是什么？**
   - 定义每个角色拥有哪些权限

4. **Admin 角色有哪些权限？**
   - VIEW_DASHBOARD, VIEW_PRODUCTS, EDIT_PRODUCT, DELETE_PRODUCT

---

## 🚀 下一步

完成了数据模型设计后，我们进入 **Step 4: 创建模拟数据**！

在 Step 4 中，我们将学习：
- JSON Server 的设置
- 用户数据的设计
- 产品数据的设计

---

**准备好了吗？让我们继续 Step 4！** 🎉

