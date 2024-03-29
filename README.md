<div align="center">
  <img src="https://github.com/hxxtae/task-list/assets/79623316/424d2b88-743f-490c-832d-9630b8af81dd" />
</div>

<br>

<div align="center">
  <h1>Task List</h1>
</div>

<div align="center">
  <a href="https://github.com/hxxtae/task-list/commits/main/">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/hxxtae/task-list?style=for-the-badge&labelColor=%23111&color=%23fff" />
  </a>
  <a href="https://github.com/hxxtae/task-list">
    <img alt="Static Badge" src="https://img.shields.io/badge/TASK%20LIST-%20?style=for-the-badge&logo=github&labelColor=%23000&color=%23fff">
  </a>
</div>

<br>

오늘 할 일을 기록하고, 완료한 작업은 완료 되었음을 표시하여 현재 작업 진행 목록을 확인할 수 있습니다.

- Task 리스트 목록을 작성하고 관리할 수 있는 심플한 모바일 앱 입니다.

- React Native(`v0.72`)와 Expo(`v49`), React Navigation(`6.x`) 라이브러리가 사용되었습니다.

## Installation

```
npx create-expo-app --template
```

- Choose a template: `Blank`

- Use expo version: `v49`

## Dev Run

### My Device

```
npm run start
```

> ⚠️ Google Play Store 및 App Store에서 Expo go 앱을 다운로드 받아야 실행할 수 있습니다.

### Android

```
npm run android
```

### IOS
```
npm run ios
```

> ⚠️ Android-Studio 및 Xcode가 다운로드된 환경에서, 앱 실행이 Emulator로 실행되어야 합니다.

## UI Design

Figma를 사용하여 앱 컴포넌트의 구조에 따른 User Interface를 설계 및 디자인 하였습니다.

`Splash`, `BottomSheet`, `Button` 등 컴포넌트 단위로 쉽게 나눌 수 있도록 UI를 설계하였습니다.

![taskList_img_2](https://github.com/hxxtae/task-list/assets/79623316/5a2c4a80-bffc-4e90-a876-e26221bf70fd)

## Files

전체 파일 구조를 Components 와 Js 파일로 나누었습니다.

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

## App Image

|   |   |   |
| - | - | - |
| ![1]  | ![2]  | ![3]  |
| ![4]  | ![5]  | ![6]  |

[1]: https://github.com/hxxtae/task-list/assets/79623316/8443614b-5677-453c-ad69-6ff599f97398
[2]: https://github.com/hxxtae/task-list/assets/79623316/5808d3da-a9a5-44bf-b847-8dbcf77e5395
[3]: https://github.com/hxxtae/task-list/assets/79623316/001e55ab-b7a3-4347-a78c-0f8e4d649241
[4]: https://github.com/hxxtae/task-list/assets/79623316/0e0109b7-1d72-40df-a997-7ec0697f743a
[5]: https://github.com/hxxtae/task-list/assets/79623316/1b16b8ed-9d6c-41ba-afd6-ebfbe2041778
[6]: https://github.com/hxxtae/task-list/assets/79623316/a42d9e86-685c-498f-868b-6734e675f038