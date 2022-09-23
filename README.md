![diagram](https://github.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-mykolastepanenko/blob/hw5/diagram.jpg)

# Genesis Test App

Для запуску програми необхідно, щоб порт 3000 був вільний

Усі API Endpoints починаються вiдносно шляху http://localhost:3000/api/

Повні шляхи API Endpoints:

1. (GET) http://localhost:3000/api/rate
2. (POST) http://localhost:3000/api/subscribe
3. (POST) http://localhost:3000/api/sendEmails

## Запуск програми

Ввести в термiнал команду docker-compose up --build -d
Або скористатися утилiтою make та ввести команду make up

P.S. Пошти, на якi листи не надiслалися виводяться в консоль програми
P.S. Розробка виконувалася за допомогою Docker на Windows 10. При перевiрцi завдання на платформi Linux Ubuntu у випадку помилки при побудовi контейнеру, варто змiнити у Dockerfile строку COPY package*.json /genesis-test на COPY package*.json /
