# QCodeTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build`

## Time needed to complete

About 2 - 3 days (since I got the task I coded much only on last Sunday (Jul 18th) and other days a little or not at all depending on the day)

## Structure

In `core` folder I put the models and api/state services. In `_shared` folder there are reusable components. Every reusable component has its own module. The `PostModule` is separated from main app module.

## API data fetching

The API has only 10 users and doesn't return their details with the post. That's why this solution fetches all of them at once and adds their details to associated posts. For comments there's a way to embed them to the post response by sending `_embed` query parameter in the request (but it includes all comments for the post, without pagination). If using pagination for comments a separate request would have to be made for each post when fetching the posts. I didn't like this and I don't really like the way I fetch data in this code test but I didn't want to ping server a lot of times to fetch few posts and associated data. In the real world scenario I would look to provide some comments with the posts in the response and would fetch more comments on the user request.

## Other notes

There are reusable components for post, comments list and loading. I didn't write unit tests, if I managed to organize some more time since I got this test I would probably write them too.
