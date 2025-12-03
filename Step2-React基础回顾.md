# Step 2: React 基础回顾

## React Fundamentals Review

---

## 🎯 学习目标 (Learning Objectives)

完成这一步后，你将理解：

- ✅ React Hooks: useState, useContext
- ✅ Context API 的工作原理
- ✅ 组件通信方式
- ✅ 为什么我们需要 Context API

---

## 📖 第一部分：React Hooks 基础

### 1.1 什么是 Hooks？

**Hooks** 是 React 16.8 引入的特性，让我们可以在函数组件中使用状态和生命周期。

**简单理解：**

- 以前只能在类组件中使用状态
- 现在函数组件也可以使用状态了
- Hooks 让代码更简洁

---

### 1.2 useState Hook - 管理组件状态

**useState** 用于在函数组件中添加状态。

#### 基础语法：

```typescript
import { useState } from 'react';

function MyComponent() {
    // useState 返回一个数组：[状态值, 更新函数]
    const [count, setCount] = useState(0);
    //      ↑      ↑           ↑
    //    状态值  更新函数   初始值

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

#### 在我们的项目中的应用：

```typescript
// src/context/AuthContext.tsx
export const AuthProvider = ({ children }) => {
  // 使用 useState 存储用户信息
  const [user, setUser] = useState<User | null>(() => {
    // 初始化函数：从 localStorage 读取
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // user: 当前用户信息（可能是 null）
  // setUser: 更新用户信息的函数
};
```

#### 关键点：

1. **useState 返回数组**：`[值, 更新函数]`
2. **初始值可以是函数**：`useState(() => {...})` - 只在首次渲染时执行
3. **更新状态**：使用 `setUser(newValue)` 或 `setUser(prev => prev + 1)`

---

### 1.3 useContext Hook - 访问 Context

**useContext** 用于在组件中访问 Context 的值。

#### 基础语法：

```typescript
import { useContext } from 'react';
import { MyContext } from './MyContext';

function MyComponent() {
    // 从 Context 中获取值
    const value = useContext(MyContext);

    return <div>{value}</div>;
}
```

#### 在我们的项目中的应用：

```typescript
// src/context/AuthContext.tsx
export const useAuth = () => {
    // 从 AuthContext 中获取认证相关的值
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
    // 返回：{ user, login, logout, hasPermission }
};

// 在其他组件中使用
function Navbar() {
    const { user, logout } = useAuth();
    //     ↑    ↑
    //   从 Context 中解构出 user 和 logout

    return (
        <nav>
            {user ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
}
```

#### 关键点：

1. **useContext 接收 Context 对象**：必须是 `createContext` 创建的对象
2. **必须在 Provider 内部使用**：否则会报错
3. **返回 Context 的值**：通常是对象，包含多个属性和方法

---

## 📖 第二部分：Context API 详解

### 2.1 什么是 Context API？

**Context API** 是 React 提供的全局状态管理机制。

**简单理解：**

- 就像"全局变量"，所有组件都能访问
- 避免"prop drilling"（一层层传递 props）
- 适合存储全局状态（如：用户信息、主题设置）

---

### 2.2 Context API 的三个步骤

#### 步骤1：创建 Context

```typescript
// src/context/AuthContext.tsx
import { createContext } from "react";

// 创建 Context，初始值为 null
const AuthContext = createContext<AuthContextType | null>(null);
//                      ↑
//                 类型定义，可以是 null
```

**关键点：**

- `createContext` 创建一个 Context 对象
- 需要提供类型定义（TypeScript）
- 初始值通常是 `null` 或默认值

---

#### 步骤2：创建 Provider 组件

```typescript
// src/context/AuthContext.tsx
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 1. 使用 useState 管理状态
    const [user, setUser] = useState<User | null>(null);

    // 2. 定义方法
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const hasPermission = (permission: string) => {
        return user?.permissions?.includes(permission) || false;
    };

    // 3. 返回 Provider，提供值给子组件
    return (
        <AuthContext.Provider
            value={{ user, login, logout, hasPermission }}
        >
            {children}
        </AuthContext.Provider>
    );
};
```

**关键点：**

- Provider 包裹需要访问 Context 的组件
- `value` 属性提供 Context 的值
- `children` 是子组件

---

#### 步骤3：在应用中使用 Provider

```typescript
// src/App.tsx
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            {/* 所有子组件都可以访问 AuthContext */}
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
```

**关键点：**

- 在应用的根部使用 Provider
- 所有子组件都可以访问 Context

---

### 2.3 Context 的数据流 (Data Flow)

```
┌─────────────────────────────────────┐
│   AuthProvider (提供数据)            │
│   value={{ user, login, logout }}   │
└─────────────────────────────────────┘
            │
            ├─→ Navbar 组件
            │   └─→ useAuth() → 获取 { user, logout }
            │
            ├─→ Login 组件
            │   └─→ useAuth() → 获取 { login }
            │
            └─→ Products 组件
                └─→ useAuth() → 获取 { user, hasPermission }
```

**可视化理解：**

```
App
└─ AuthProvider (提供数据)
   ├─ Navbar (使用 useAuth)
   ├─ Login (使用 useAuth)
   └─ Products (使用 useAuth)
```

---

## 📖 第三部分：为什么需要 Context API？

### 3.1 问题：Prop Drilling

**没有 Context 时的问题：**

```typescript
// App.tsx
function App() {
    const [user, setUser] = useState(null);

    return (
        <Layout user={user} setUser={setUser}>
            {/* 需要一层层传递 */}
        </Layout>
    );
}

// Layout.tsx
function Layout({ user, setUser }) {
    return (
        <Navbar user={user} setUser={setUser}>
            {/* 继续传递 */}
        </Navbar>
    );
}

// Navbar.tsx
function Navbar({ user, setUser }) {
    return (
        <UserMenu user={user} setUser={setUser}>
            {/* 还要传递 */}
        </UserMenu>
    );
}

// UserMenu.tsx
function UserMenu({ user, setUser }) {
    // 终于用到了！
    return <div>{user?.username}</div>;
}
```

**问题：**

- ❌ 中间组件不需要 user，但必须传递
- ❌ 代码冗长，难以维护
- ❌ 添加新属性需要修改很多组件

---

### 3.2 解决方案：Context API

**使用 Context 后：**

```typescript
// App.tsx
function App() {
    return (
        <AuthProvider>
            {/* 不需要传递 props */}
            <Layout />
        </AuthProvider>
    );
}

// Layout.tsx
function Layout() {
    return <Navbar />; // 不需要 props
}

// Navbar.tsx
function Navbar() {
    return <UserMenu />; // 不需要 props
}

// UserMenu.tsx
function UserMenu() {
    const { user } = useAuth(); // 直接获取！
    return <div>{user?.username}</div>;
}
```

**优势：**

- ✅ 任何组件都可以直接访问
- ✅ 代码简洁
- ✅ 易于维护

---

## 📖 第四部分：实际应用示例

### 4.1 完整的 Context 使用流程

#### 步骤1：创建 Context 和 Provider

```typescript
// src/context/AuthContext.tsx

// 1. 定义类型
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
}

// 2. 创建 Context
const AuthContext = createContext<AuthContextType | null>(null);

// 3. 创建 Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) || false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. 创建自定义 Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
```

---

#### 步骤2：在应用中使用 Provider

```typescript
// src/App.tsx
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
```

---

#### 步骤3：在组件中使用 Context

```typescript
// src/components/Navbar.tsx
import { useAuth } from '../context/AuthContext';

function Navbar() {
    // 使用自定义 Hook 获取 Context 值
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

### 4.2 常见模式 (Common Patterns)

#### 模式1：自定义 Hook

```typescript
// 创建自定义 Hook，而不是直接使用 useContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 好处：
// 1. 错误处理更友好
// 2. 类型安全
// 3. 使用更简洁
```

#### 模式2：初始化函数

```typescript
// 使用函数初始化状态
const [user, setUser] = useState(() => {
  // 这个函数只在首次渲染时执行一次
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

// 好处：
// 1. 避免每次渲染都执行
// 2. 性能更好
```

---

## 🎯 总结 (Summary)

### 核心概念：

1. **useState**: 管理组件状态
   - `const [value, setValue] = useState(initialValue)`

2. **useContext**: 访问 Context 值
   - `const value = useContext(MyContext)`

3. **Context API**: 全局状态管理
   - `createContext` → `Provider` → `useContext`

### 工作流程：

```
创建 Context → 创建 Provider → 包裹应用 → 使用 useAuth
```

### 关键点：

- ✅ Context API 避免 prop drilling
- ✅ 适合存储全局状态
- ✅ 使用自定义 Hook 更优雅

---

## ✅ 检查点 (Checkpoint)

回答以下问题，确保你理解了：

1. **useState 的作用是什么？**
   - 在函数组件中管理状态

2. **useContext 的作用是什么？**
   - 在组件中访问 Context 的值

3. **为什么需要 Context API？**
   - 避免 prop drilling，方便全局状态管理

4. **Context 的三个步骤是什么？**
   - 创建 Context → 创建 Provider → 使用 useContext

---

## 🚀 下一步

理解了 React 基础后，我们进入 **Step 3: 设计用户和权限数据模型**！

在 Step 3 中，我们将学习：

- User 数据结构
- Role 和 Permission 的定义
- 角色与权限的映射关系

---

**准备好了吗？让我们继续 Step 3！** 🎉
