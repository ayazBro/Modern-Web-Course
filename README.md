# Задачи в проекте:
- Реализовать авторизацию, после чего выдать refresh и access токены, реализовать logout(черный список)
- Вывести список всех пользователей, изменять их данные(после изменения данных не надо делать новый get запрос на получение обновленных данных)
- На бэкенде реализовать **join** и **group by**, данные отобразить на фронте при помощи chart.js
---
## Стэк:
- Java
- Spring Framework(Boot, Security, Data JPA)
- React
- Postgre Sql
---
## Реализация работы:
1) Реализовал авторизацию при помощи Spring Security. Быстро, удобно и эффективно.
Защита от неавторизованного посещения стоит как на фронте(проверка наличия данных в localStorage), 
так и на бэке(проверка токенов). Refresh токен добавляется в базу данных в таблицу с разрешенными refresh токенами. Для access токена не создавал отдельную таблицу, так как установил для него короткое время жизни(60 секунд).
Пример работы авторизации: полученные токены кладем в localStorage.
![фото входа](https://github.com/ayazBro/Modern-Web-Course/blob/main/backend/src/main/resources/static/%D1%84%D0%BE%D1%82%D0%BE%20%D0%B2%D1%85%D0%BE%D0%B4%D0%B0.jpg)



2) Выход из приложения: при выходе из приложения на фронте очищается localStorage, а на 
бэке старый токен удаляется из списка разрешенных. Не обрабатывая access токен, в плане безопасности мы 
мало что теряем, так как если его украдут, то злоумышленники ничего не успеют за 1 минуту, а пользователю нужно как можно быстрее осуществить выход из приложения.
   ![хранение токенов](https://github.com/ayazBro/Modern-Web-Course/blob/main/backend/src/main/resources/static/%D1%84%D0%BE%D1%82%D0%BE%20%D0%B2%D1%85%D0%BE%D0%B4%D0%B0%202.jpg)

Пример работы:

3) Обновление токена: если вдруг при обращении к данным, мы получаем ошибку, то работаем по такому алгоритму:
 - если в localStorage пусто - перенаправляем на вход
 - если в localStorage не пусто, то вызываем метод обновления токена(обновляется только access токен, refresh не меняется)
 - если не получилось обновить токены, значит refresh токен или иссяк, или некорректен. В таком случае тоже перенаправляем на вход

4) В выводе списка всех пользователей и изменении их данных нет ничего интересного, все довольно тривиально, поэтому ниже приложил скрины работы:
   ![список юзеров](https://github.com/ayazBro/Modern-Web-Course/blob/main/backend/src/main/resources/static/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%B2%D1%81%D0%B5%D1%85%20%D1%8E%D0%B7%D0%B5%D1%80%D0%BE%D0%B2.jpg)
   ![изменение данных](https://github.com/ayazBro/Modern-Web-Course/blob/main/backend/src/main/resources/static/%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F.jpg)

5) Вот так выглядит схема моей базы данных:
   ![схема бд](https://github.com/ayazBro/Modern-Web-Course/blob/main/backend/src/main/resources/static/%D1%81%D1%85%D0%B5%D0%BC%D0%B0%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B.jpg)

6) На бэке реализовал join и group by, полученные данные отобразил на фронте. Мы увидели сколько штук конкретной модели телефона купили пользователи.
   ![запрос](https://github.com/ayazBro/Modern-Web-Course/blob/main/backend/src/main/resources/static/%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81.jpg)
   ![график](https://github.com/ayazBro/Modern-Web-Course/blob/main/backend/src/main/resources/static/%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%BA.jpg)
