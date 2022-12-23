Auth Mircoservice

<!--

Sequelize:Validate

In order to authenticate certain patterns example ->
email : abc@gmail.com we need this type of pattern
then for this sequelize provide custom validation
 -->

<!--

1. You need to make user signup to your application for the very first time.

So that you can store it's username and password on the Database.
And When next time user will login you can check it whether it is the same user that is loggin in or not. and then generate JWT token.


* Note:  email can be stored directly
but storing raw password is the worst design . We should not do it. Privacy Breach

 -->

<!--
To keep password encrypted -> use bcrypt pckg
when to keep the password the encrypted ? 
In which layer we should keep this algorithm 
ans : Model -> as for every user we should encrypt the password. In databases we can easily do this using TRIGGERS .
What are Triggers ? 
- Triggers are events in DB.
- ex: deleted a row, updated a row .. these are events.
- How we can setup the triggers ? using Sequelize triggers
- like afterCreate, beforeCreate
 -->
