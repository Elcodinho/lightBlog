# lightBlog

## Описание

lightBlog — это блог-приложение, позволяющее добавлять, редактировать и удалять посты, оставлять комментарии, а также выполнять авторизацию через Firebase.

## Установка

1. Клонируйте репозиторий на ваш локальный компьютер:  
   `git clone https://github.com/username/light-blog.git`
2. Перейдите в директорию проекта:  
   `cd light-blog`
3. Установите зависимости:  
   `npm install`

## Настройка Firebase

Для корректной работы проекта необходимо настроить Firebase:

1. Перейдите на [Firebase](https://firebase.google.com/), создайте новый проект и добавьте веб-приложение.
2. Скопируйте предоставленные ключи Firebase, такие как `apiKey`, `authDomain`, `projectId` и т.д.
3. Скопируйте файл `.env.example` в `.env.local`:

   - Для Unix-подобных систем:  
     `cp .env.example .env.local`
   - Для Windows:  
     `copy .env.example .env.local`

4. Откройте файл `.env.local` и вставьте туда свои ключи:
   VITE_FIREBASE_API_KEY=ваш_apiKey
   VITE_FIREBASE_AUTH_DOMAIN=ваш_authDomain
   VITE_FIREBASE_PROJECT_ID=ваш_projectId
   VITE_FIREBASE_STORAGE_BUCKET=ваш_storageBucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=ваш_messagingSenderId
   VITE_FIREBASE_APP_ID=ваш_appId

## Запуск проекта

Для запуска проекта в режиме разработки выполните команду:  
`npm run dev`  
Приложение будет доступно по адресу: `http://localhost:5173`.
Для запуска проекта и json-server выполните комманду:
`npm run dev:full`
Сервер с постами будет доступен по адресу : `http://localhost:3500/posts`
Сервер с комментариями будет доступен по адресу : `http://localhost:3600/comments`

## Сборка проекта для продакшена

Чтобы собрать проект для продакшена, выполните команду:  
`npm run build`  
Собранный проект будет находиться в папке `dist`.
