# MyToDo | React Native 任務清單 App

一款支援主題切換、任務分類、優先順序與截止日期的美感任務管理 App。  
使用 Expo + SQLite 開發，具備簡潔互動與一致視覺體驗。

---

## ✨ 特色功能

- ✅ 任務新增 / 編輯 / 刪除 / 勾選完成
- 🔁 支援排序（依優先順序 / 截止日期）
- 🧩 任務分類：全部 / 未完成 / 已完成
- 📅 任務可選擇截止日期
- 🌙 支援深色 / 淺色主題（自動切換）
- 🖌 主題色：柔和藍灰系搭配膠囊按鈕
- 🧠 使用 SQLite 儲存，資料持久化
- ⚙️ 打勾動畫、分類視覺動態反饋

---

## 🖼 畫面預覽

| 主頁面 | 深色模式 | 新增任務 | 編輯任務 |
|--------|----------|----------|----------|
| ![main](./screenshots/main-light.png) | ![dark](./screenshots/main-dark.png) | ![add](./screenshots/add.png) | ![edit](./screenshots/edit.png) |

> 💡請將 `./screenshots` 替換為實際專案中的畫面截圖路徑。

---

## 🛠 技術棧

- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- SQLite 本地資料庫（透過 `expo-sqlite`）
- `expo-router` 作為路由系統
- `react-native-reanimated` 實作動畫
- `dayjs` 處理日期格式
- `@react-native-community/datetimepicker` 作為日期選擇器
- `react-native-swipe-list-view` 實作滑動刪除

---

## 🚀 快速開始

### 📦 安裝依賴

```bash
npm install
npx expo install expo-sqlite react-native-reanimated @react-native-community/datetimepicker react-native-swipe-list-view dayjs
```

---

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

