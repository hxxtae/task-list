# Task List

<div align="center">
  <img src="https://github.com/hxxtae/task-list/assets/79623316/424d2b88-743f-490c-832d-9630b8af81dd" />
</div>

오늘 할 일을 기록하고, 완료한 작업은 완료 되었음을 표시하여 현재 작업 진행 목록을 확인할 수 있습니다.

Todo 리스트 목록을 작성할 수 있는 앱 입니다.

## Template

```
npx create-expo-app --template
```

- expo version: v49


## App Start

### Device

```
npm run start
```

> ⚠️ Google Play Store 및 App Store에서 Expo go 앱을 다운로드 받아야 실행할 수 있습니다.

### Android (Module)

```
npm run android
```

### IOS (Module)
```
npm run ios
```

> ⚠️ Android-Studio 및 Xcode가 다운로드된 환경에서, 앱 실행이 Emulator로 실행되어야 합니다.

## UI Design

![taskList_img_2](https://github.com/hxxtae/task-list/assets/79623316/5a2c4a80-bffc-4e90-a876-e26221bf70fd)

## Files

### Js

```
📦apis
 ┣ 📜initData.js
 ┗ 📜model.js

📦global
 ┣ 📜atom.js
 ┗ 📜theme.js

📦hooks
 ┣ 📜useMutateCategory.js
 ┗ 📜useMutateTask.js
```

### Components

```
📦components
 ┣ 📂BottomSheet
 ┃ ┗ 📜index.jsx
 ┗ 📂CardShift
 ┃ ┗ 📜index.jsx

📦navigation
 ┣ 📂MainNavigator
 ┃ ┗ 📜index.jsx
 ┣ 📂TabNavigator
 ┃ ┗ 📜index.jsx
 ┣ 📂TaskAddNavigator
 ┃ ┗ 📜index.jsx
 ┗ 📂TaskNavigator
 ┃ ┗ 📜index.jsx

📦pages
 ┣ 📂CategoryForm
 ┃ ┗ 📜index.jsx
 ┣ 📂Task
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂CategoryList
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┗ 📂CategorySetting
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂TaskBar
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂TaskItem
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂TaskList
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂TaskTitle
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┗ 📜index.jsx
 ┗ 📂TaskForm
 ┃ ┗ 📜index.jsx
```



