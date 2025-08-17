# Members-only Clubhouse App

A message board application built with **Node.js**, **Express**, **PostgreSQL** and **Passport**. The application allows users to view and create posted messages. Passport local strategy is used to authenticate users and there are different authorization roles for each type of user.

Unregistered users can view posted messages, users can sign-up where their credentials and password are safely stored in the database using **bcrypt** for password hashing. Logged in users can create messages while club members can post and view authors of each message. Admin roles can view all and have the ability to delete messages as well.

Authentication middleware is used to protect certain routes and **express-validator** is used for form validation.
