# akkasls-demo
Demo repo to test akka serverless platform

## E-commerce Application
A generic e-commerce application to demonstrate and explore the capabilities of Akka serverless.

### Shopping cart
Shopping cart application supports 3 methods currently -
#### Add an item to cart
```bash=
curl --request POST \
      --url http://<appliation-endpoint>/cart/<userId>/items/add \
      --header 'Content-Type: application/json' \
      --data '{
          "userId": "<userId>",
          "productId": "dogbed",
          "name": "comfy dog bed",
          "quantity": 1
      }'
```
#### Remove an item from cart
```bash=
curl --request POST \
     --url http://<application-endpoint>/cart/<userId>/items/<productId>/remove
```
#### Get cart
```bash=
curl --request GET \
     --url http://<application-endpoint>/cart/<userId>
```

### Users
Users application currently supports 3 methods -
#### Add a new user
```bash=
curl --request POST \
     --url http://<application-endpoint>/users/<userId> \
     --header 'Content-Type: application/json' \
     --data '{
         "id": "<userId>",
         "name": "cucumber",
         "emailAddress": "cucumber@vegetable.com"
     }'
```
#### Get single user details
```bash=
curl --request GET \
     --url http://<application-endpoint>/user/<userId>
```
#### Get all user details (admin)
```bash=
curl --request GET \
     --url http://<application-endpoint>/admin
```

Before using the frontend, ensure to add the following environment varables to your environment
- CART_BACKEND as the endpoint to the shopping cart backend (like `https://<application-endpoint>/`)
- USER_BACKEND as the endpoint to the user backend.
