# VendingMachine

Backend Logic for a Vending Machine

## To Run
Setup .env file with DB_NAME & DB_CONN_STRING. I am using MongoDB Atlas.
package.json has defined commands for build, test and start.
### POSTMAN
Postman collection - https://www.getpostman.com/collections/d0bd6a935d17d259cc61
## Design Choices
- Language: Even though I have no professional experience with NodeJS,
JavaScript is the only overlapping technology between Onfido and my tech stack (JS, Java & PHP)
- Web based backend: Since the job opportunity is focused on building web based APIs
I figured this is the most relevant way of implementing the vending machine.
- Database: There is are no relationships between the collections so NoSQL made 
sense and MongoDB is quite popular
- Routing Library: Even though ExpressJS is quite old it is the most widely 
known and used NodeJS routing library
- DB Library: I didn't need many features so the base MongoDB driver was good enough.
All other libraries are based on it, so it should be quite good to know.
- API Design: I wanted to split the API into small simple chunks. There are quite a few
endpoints, but all are fairly simple to execute with no complicated logic.
- Calculating Change: I have decided on a greedy approach trying to minimize number of coins
by using the largest possible. This is because the lower denominations can be used to substitute
larger ones, but not vice versa.

## Future Improvements
- Add more tests. I have added simple unit tests, but there should be more,
especially end-to-end tests that follow the full path from inserting coins to buying a product.
- Utilize Request lifecycle to pass db instance, instead of having it globally.
- Validating inputs with more and more precise error messages.
- Add swagger documentation.
- Secure DB integrity when multiple updates are happening.
- More thought into naming. Maybe abstract from Pennies & Pounds.
I couldn't really decide on good naming.
