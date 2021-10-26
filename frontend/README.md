# Front end for demo shopping cart application

This directory contains the website user interface for the API developed in javascript and gRPC, and deployed on Lightbend's Akkaserverless platform. 

This is the website user interface for a databaseless demo shopping cart application. Features of this application include - user login/signup, managing user's cart, and admin features to list all users and what each user's cart contains.

## User Login/Signup
Common Login and signup interface. User enters a user id, name and email. If the user already exists, then the user gets logged in. Else, a new user is created and the user is logged in.

## Catalog
A catalog of items that can be viewed and/or added to cart by the logged in user.

## View cart
User can view his/her cart by clicking on {user_name}'s cart. The user may then add more of the items already present in the cart or completely remove an item from their cart.

## Admin
Admin can view the details of all the users who have created an account by going to `localhost:3000/eekeekai`. Admin can click on any user's cart and view the items that have been added to their cart. Information like product ID, product name and quantity is available to the admin.

