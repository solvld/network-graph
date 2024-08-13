# Визуализация графа связей блокчейн-адресов

Данный проект реализует визуализацию графа связей блокчейн-адресов. Пользователь может ввести адрес кошелька в специальное поле ввода, и система отобразит граф связей данного кошелька с другими. В качестве блокчейн-адресов используются строки формата `0xXXXX`, где X — это шестнадцатеричная цифра (0-9, A-F).

## Функционал

- **Ввод адреса кошелька**: В строке ввода пользователь вводит адрес кошелька, по которому будет построен граф связей.
- **Отображение графа**: После ввода адреса, граф визуализирует связи данного кошелька с другими адресами.
- **Интерактивные ноды**: При клике на любую ноду (кошелек) отображаются ее связи с другими кошельками.
- **Различие по цветам**: Ноды на графе различаются по цвету в зависимости от типа кошелька.
- **Информативность нод**: Каждая нода содержит подпись с названием кошелька, его адресом и балансом.
- **Расположение нод**: Ноды, являющиеся получателями от исследуемого кошелька, располагаются справа, а ноды, которые являются отправителями средств на данный кошелек, — слева.

## Запуск проекта
1. Склонируйте репозиторий на ваш локальный компьютер.
2. Установите зависимости, выполнив команду `npm install`.
3. Запустите сервер разработки с помощью команды `npm run dev`.
4. Откройте браузер и перейдите по адресу `http://localhost:5173/`, чтобы просмотреть проект.
