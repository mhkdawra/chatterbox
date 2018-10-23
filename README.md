# ChatterBox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

This is an attempt to build a basic real time chat application using Angular 6 and Firebase.

Use the following commands to install the required packages for Angular Material and Firebase:

npm install --save @angular/material @angular/cdk @angular/animations
npm install --save firebase angularfire2

Update the credentials for firebase in environment/environment.ts and environment/environment.prod.ts

You can generate your firebase credentials using https://console.firebase.google.com/ and clicking on add project.

The firebase database collection should look like this:

rooms(collection) => roomname1 (document) => chat_messages(collection) => (messages are stored here as documents)
											roomname2 (document) => chat_messages(collection) => (messages are stored here as documents)
											roomname3 (document) => chat_messages(collection) => (messages are stored here as documents)
                     
messages have the following keys: message(string), msgDate(timestamp), user(string)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
