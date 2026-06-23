# Uchicode Presentation

Сайт-презентация проекта [uchicode.ru](https://uchicode.ru/) — учебной платформы, которая помогает новичку войти в программирование через C++.

## Локальный запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Сборка создаётся в `dist/`. Проект подготовлен для GitHub Pages с базовым путём `/presentationcpp/`.

Ожидаемый адрес после публикации:

```text
https://sandroz1.github.io/presentationcpp/
```

## Публикация

Публикацию нужно делать отдельным подтверждённым шагом. Перед push/deploy проверить:

```bash
npm run build
git status --short --branch
```
