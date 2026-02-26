# Nuxt Starter Template

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Use this template to get started with [Nuxt UI](https://ui.nuxt.com) quickly.

- [Live demo](https://starter-template.nuxt.dev/)
- [Documentation](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

<a href="https://starter-template.nuxt.dev/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ui.nuxt.com/assets/templates/nuxt/starter-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://ui.nuxt.com/assets/templates/nuxt/starter-light.png">
    <img alt="Nuxt Starter Template" src="https://ui.nuxt.com/assets/templates/nuxt/starter-light.png" width="830" height="466">
  </picture>
</a>

> The starter template for Vue is on https://github.com/nuxt-ui-templates/starter-vue.

## 运行时与包管理器

> **本项目使用 [Bun](https://bun.sh/) 作为运行时和包管理器**，而非 Node.js / npm / pnpm。
>
> - 所有依赖安装、脚本运行均通过 `bun` 命令执行
> - 服务端代码（`server/`）运行在 Bun 运行时下，请避免使用 Node.js 专有 API（如 `child_process`、`worker_threads` 等）
> - 密码哈希等功能优先使用 Web Crypto API 或 Bun 原生 API

## Bun 常用命令

### 包管理

```bash
bun install              # 安装所有依赖（读取 bun.lock）
bun add <pkg>            # 安装并添加到 dependencies
bun add -d <pkg>         # 安装并添加到 devDependencies
bun remove <pkg>         # 卸载包
bun update               # 更新所有依赖到最新兼容版本
bun update <pkg>         # 更新指定包
bun outdated             # 查看有更新的包
```

### 运行脚本

```bash
bun run dev              # 运行 package.json 中的 dev 脚本
bun run build            # 构建生产包
bun run preview          # 预览生产构建
bun run lint             # 代码检查
bun run typecheck        # TypeScript 类型检查
bun <file>.ts            # 直接运行 TypeScript 文件（无需编译）
```

### 内置工具

```bash
bun test                 # 运行测试（内置 Jest 兼容测试框架）
bun test --watch         # 监听模式运行测试
bun test --coverage      # 生成覆盖率报告
bun build ./index.ts     # 打包 TS/JS 文件（内置 bundler）
bun repl                 # 交互式 REPL
bun pm ls                # 查看已安装包列表
bun pm cache rm          # 清除包缓存
```

### 实用快捷方式

```bash
bun x <cli-pkg>          # 等同于 npx，临时运行 CLI 工具
bun init                 # 初始化新项目（生成 package.json）
bunx nuxi add page home  # 通过 bunx 运行 nuxi 脚手架命令
```

## Bun 特色功能

| 功能 | 说明 |
|---|---|
| **原生 TS 支持** | 无需配置，直接运行 `.ts` / `.tsx` 文件 |
| **内置 SQLite** | `import { Database } from 'bun:sqlite'` 零依赖使用 SQLite |
| **内置密码哈希** | `Bun.password.hash()` / `Bun.password.verify()`（bcrypt/argon2）|
| **内置文件 I/O** | `Bun.file()` / `Bun.write()` 高性能文件读写 |
| **内置 HTTP 服务** | `Bun.serve()` 可直接启动 HTTP 服务，无需 express |
| **内置 WebSocket** | `Bun.serve({ websocket: ... })` 开箱即用 |
| **`.env` 自动加载** | 启动时自动读取 `.env` 文件，无需 dotenv |
| **bun:test** | 内置测试框架，兼容 Jest API，速度比 Jest 快数倍 |
| **watch 模式** | `bun --watch <file>.ts` 文件变更自动重启 |
| **Shell 脚本** | `import { $ } from 'bun'` 内置跨平台 shell 执行 |

## Quick Start

```bash
bun create nuxt@latest -- -t github:nuxt-ui-templates/starter
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=starter&repository-url=https%3A%2F%2Fgithub.com%2Fnuxt-ui-templates%2Fstarter&demo-image=https%3A%2F%2Fui.nuxt.com%2Fassets%2Ftemplates%2Fnuxt%2Fstarter-dark.png&demo-url=https%3A%2F%2Fstarter-template.nuxt.dev%2F&demo-title=Nuxt%20Starter%20Template&demo-description=A%20minimal%20template%20to%20get%20started%20with%20Nuxt%20UI.)

## Setup

Make sure to install the dependencies:

```bash
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun dev
```

## Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
