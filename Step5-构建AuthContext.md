# Step 5: 构建认证上下文 (AuthContext)
## Building Authentication Context

---

## 🎯 学习目标 (Learning Objectives)

完成这一步后，你将能够：
- ✅ 理解 Context API 的实际应用
- ✅ 创建 AuthContext 和 AuthProvider
- ✅ 实现登录/登出功能
- ✅ 实现权限检查功能
- ✅ 使用 localStorage 持久化用户状态

---

## 📖 第一部分：理解需求 (Understanding Requirements)

### 1.1 我们需要什么？

**权限管理系统需要：**

1. **存储用户信息** (Store User Information)
   - 当前登录的用户是谁？
   - 用户的角色是什么？
   - 用户有哪些权限？

2. **登录功能** (Login Function)
   - 用户输入用户名和密码
   - 验证成功后，保存用户信息

3. **登出功能** (Logout Function)
   - 清除用户信息
   - 返回未登录状态

4. **权限检查** (Permission Check)
   - 检查用户是否有特定权限
   - 用于控制页面访问和功能显示

5. **持久化** (Persistence)
   - 刷新页面后，用户仍然保持登录状态
   - 使用 localStorage 存储

---

## 📖 第二部分：创建 AuthContext - 逐步实现

### 2.1 步骤1：定义类型 (Define Types)

**首先，我们需要定义数据结构：**

```typescript
// src/context/AuthContext.tsx

// 1. 定义 User 接口 (User Interface)
export interface User {
    id: string;              // 用户 ID
    username: string;        // 用户名
    password: string;         // 密码（实际项目中不应该存储）
    role: string;            // 角色：admin, manager, user, guest
    permissions: string[];   // 权限列表：["view_products", "edit_product", ...]
}

// 2. 定义 AuthContextType 接口
interface AuthContextType {
    user: User | null;                              // 当前用户（null 表示未登录）
    login: (userData: User) => void;              // 登录函数
    logout: () => void;                            // 登出函数
    hasPermission: (permission: string) => boolean; // 权限检查函数
}
```

**解释：**
- `User`: 用户的数据结构
- `AuthContextType`: Context 提供的值的类型
- `user: User | null`: 可能是 User 对象，也可能是 null（未登录）

---

### 2.2 步骤2：创建 Context (Create Context)

```typescript
// src/context/AuthContext.tsx
import { createContext } from 'react';

// 创建 Context，初始值为 null
const AuthContext = createContext<AuthContextType | null>(null);
//                      ↑
//                 类型定义：AuthContextType 或 null
```

**解释：**
- `createContext`: React 提供的函数，创建 Context
- `<AuthContextType | null>`: TypeScript 类型，表示值可能是 AuthContextType 或 null
- 初始值设为 `null`，因为还没有提供值

---

### 2.3 步骤3：创建 Provider 组件 (Create Provider Component)

```typescript
// src/context/AuthContext.tsx
import { useState } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 使用 useState 管理用户状态
    const [user, setUser] = useState<User | null>(() => {
        // 初始化函数：从 localStorage 读取用户信息
        const storedUser = localStorage.getItem("user");
        
        // 如果 localStorage 中有用户信息，解析并返回
        // 否则返回 null（未登录状态）
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    // ... 其他代码
};
```

**逐行解释：**

1. **`export const AuthProvider`**: 导出 Provider 组件
2. **`({ children })`**: 接收 children prop（子组件）
3. **`useState<User | null>`**: 创建状态，类型是 User 或 null
4. **`() => { ... }`**: 初始化函数，只在首次渲染时执行一次
5. **`localStorage.getItem("user")`**: 从浏览器存储中读取用户信息
6. **`JSON.parse(storedUser)`**: 将 JSON 字符串转换为对象

**为什么使用初始化函数？**
- 避免每次渲染都执行 localStorage 读取
- 只在组件首次创建时读取一次
- 性能更好

---

### 2.4 步骤4：实现登录函数 (Implement Login Function)

```typescript
// src/context/AuthContext.tsx

const login = (userData: User) => {
    // 1. 更新状态
    setUser(userData);
    
    // 2. 保存到 localStorage（持久化）
    localStorage.setItem("user", JSON.stringify(userData));
};
```

**逐行解释：**

1. **`setUser(userData)`**: 更新 React 状态
   - 触发组件重新渲染
   - 所有使用 `useAuth()` 的组件都会更新

2. **`localStorage.setItem("user", ...)`**: 保存到浏览器存储
   - `"user"`: 存储的键名
   - `JSON.stringify(userData)`: 将对象转换为 JSON 字符串
   - 刷新页面后，可以从这里读取

**工作流程：**
```
用户登录
  ↓
调用 login(userData)
  ↓
setUser(userData) → 更新 React 状态
  ↓
localStorage.setItem(...) → 保存到浏览器
  ↓
所有组件都能访问到新的 user
```

---

### 2.5 步骤5：实现登出函数 (Implement Logout Function)

```typescript
// src/context/AuthContext.tsx

const logout = () => {
    // 1. 清除状态
    setUser(null);
    
    // 2. 清除 localStorage
    localStorage.removeItem("user");
};
```

**逐行解释：**

1. **`setUser(null)`**: 将用户状态设为 null（未登录）
2. **`localStorage.removeItem("user")`**: 删除浏览器存储中的用户信息

**工作流程：**
```
用户点击登出
  ↓
调用 logout()
  ↓
setUser(null) → 清除 React 状态
  ↓
localStorage.removeItem(...) → 清除浏览器存储
  ↓
所有组件都会更新，显示未登录状态
```

---

### 2.6 步骤6：实现权限检查函数 (Implement Permission Check)

```typescript
// src/context/AuthContext.tsx

const hasPermission = (permission: string) => {
    // 检查用户是否有指定权限
    return user?.permissions?.includes(permission) || false;
    //     ↑              ↑                    ↑
    //   可选链        可选链              如果没有权限，返回 false
};
```

**逐行解释：**

1. **`user?.permissions`**: 可选链操作符
   - 如果 `user` 是 null，返回 undefined（不会报错）
   - 如果 `user` 存在，访问 `permissions` 属性

2. **`?.includes(permission)`**: 检查权限数组中是否包含指定权限
   - 如果 `permissions` 是 undefined，返回 undefined
   - 如果 `permissions` 存在，检查是否包含 `permission`

3. **`|| false`**: 如果前面是 undefined 或 false，返回 false

**使用示例：**
```typescript
// 在组件中使用
const { hasPermission } = useAuth();

// 检查用户是否有 "view_products" 权限
if (hasPermission("view_products")) {
    // 显示产品列表
}

// 检查用户是否有 "delete_product" 权限
if (hasPermission("delete_product")) {
    // 显示删除按钮
}
```

---

### 2.7 步骤7：返回 Provider (Return Provider)

```typescript
// src/context/AuthContext.tsx

return (
    <AuthContext.Provider 
        value={{ user, login, logout, hasPermission }}
    >
        {children}
    </AuthContext.Provider>
);
```

**解释：**
- `AuthContext.Provider`: Context 的提供者组件
- `value`: 提供给子组件的值（包含 user, login, logout, hasPermission）
- `{children}`: 渲染子组件

**数据流：**
```
AuthProvider
  ↓
提供 value={{ user, login, logout, hasPermission }}
  ↓
所有子组件都可以通过 useAuth() 访问这些值
```

---

### 2.8 步骤8：创建自定义 Hook (Create Custom Hook)

```typescript
// src/context/AuthContext.tsx
import { useContext } from 'react';

export const useAuth = () => {
    // 从 Context 中获取值
    const context = useContext(AuthContext);
    
    // 错误处理：如果不在 Provider 内部使用，会报错
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    
    // 返回 Context 的值
    return context;
    // 返回：{ user, login, logout, hasPermission }
};
```

**为什么需要自定义 Hook？**

1. **错误处理**: 如果忘记用 Provider 包裹，会给出清晰的错误提示
2. **类型安全**: TypeScript 可以正确推断类型
3. **使用简洁**: 不需要每次都写 `useContext(AuthContext)`

**使用方式：**
```typescript
// 在组件中使用
function MyComponent() {
    const { user, login, logout, hasPermission } = useAuth();
    //     ↑    ↑     ↑        ↑
    //   从 Context 中解构出所有需要的值
    
    // 现在可以使用这些值了
    if (user) {
        return <div>Welcome, {user.username}</div>;
    }
}
```

---

## 📖 第三部分：完整代码 (Complete Code)

### 3.1 完整的 AuthContext.tsx

```typescript
// src/context/AuthContext.tsx
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

// 1. 定义 User 接口
export interface User {
    id: string;
    username: string;
    password: string;
    role: string;
    permissions: string[];
}

// 2. 定义 AuthContextType 接口
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
}

// 3. 创建 Context
const AuthContext = createContext<AuthContextType | null>(null);

// 4. 创建 Provider 组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 4.1 使用 useState 管理用户状态
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // 4.2 实现登录函数
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // 4.3 实现登出函数
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // 4.4 实现权限检查函数
    const hasPermission = (permission: string) => {
        return user?.permissions?.includes(permission) || false;
    };

    // 4.5 返回 Provider
    return (
        <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. 创建自定义 Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
```

---

## 📖 第四部分：在应用中使用 (Using in App)

### 4.1 在 App.tsx 中使用 Provider

```typescript
// src/App.tsx
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "@tanstack/react-router";
import router from "./utils/router";

function App() {
    return (
        <AuthProvider>
            {/* 所有子组件都可以访问 AuthContext */}
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
```

**关键点：**
- `AuthProvider` 必须包裹所有需要访问认证信息的组件
- 通常放在应用的根部（App.tsx）

---

### 4.2 在组件中使用 useAuth

```typescript
// src/components/Navbar.tsx
import { useAuth } from "../context/AuthContext";

function Navbar() {
    // 使用 useAuth 获取认证相关的值
    const { user, logout } = useAuth();
    
    return (
        <nav>
            {user ? (
                <>
                    <span>Welcome, {user.username}</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
}
```

---

## 🎯 总结 (Summary)

### 核心概念：

1. **Context API**: 全局状态管理机制
2. **Provider**: 提供值给子组件
3. **useContext**: 在组件中访问 Context 值
4. **自定义 Hook**: 封装 useContext，提供更好的错误处理和类型安全

### 实现步骤：

1. 定义类型（User, AuthContextType）
2. 创建 Context
3. 创建 Provider 组件
4. 实现 login/logout/hasPermission 函数
5. 创建自定义 Hook (useAuth)
6. 在 App.tsx 中使用 Provider
7. 在组件中使用 useAuth

### 关键点：

- ✅ 使用 useState 管理用户状态
- ✅ 使用 localStorage 持久化
- ✅ 使用可选链操作符 (`?.`) 安全访问属性
- ✅ 创建自定义 Hook 提供更好的开发体验

---

## ✅ 检查点 (Checkpoint)

回答以下问题，确保你理解了：

1. **为什么需要 AuthContext？**
   - 全局管理用户状态，避免 prop drilling

2. **login 函数做了什么？**
   - 更新 React 状态 + 保存到 localStorage

3. **为什么使用初始化函数 `useState(() => {...})`？**
   - 只在首次渲染时执行，性能更好

4. **hasPermission 函数如何工作？**
   - 检查 user?.permissions?.includes(permission)

5. **为什么需要自定义 Hook (useAuth)？**
   - 错误处理 + 类型安全 + 使用简洁

---

## 🚀 下一步

完成了 AuthContext 后，我们进入 **Step 6: 设置路由系统**！

在 Step 6 中，我们将学习：
- TanStack Router 基础
- 文件式路由
- 创建路由结构

---

**准备好了吗？让我们继续 Step 6！** 🎉

