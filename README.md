# README

# Game Knight Client
Game Knight is an SPA that makes keeping score during your game nights easier.
You can add or remove players from a game and see all players scores, update them as you go and keep a record of wins an losses.


## How it works
Log in, create some players, go to the score keeper, add your players to the game and score you points. Once there is a winner, click declare
winner to clear the scores and update the leader board (note: highest score wins).

To create a player, click 'create player' and type in a name. If you click 'knight player' the app will add "the {random adjective}", for a little fun when creating player names.

To view all players, click the leader board and you can see all players and thier win/loss record. You can also view a single player by clicking the magnifying glass on the right side of the players score card.

To edit or delete a player, go to the leaderboard, click the magnifing glass on the players score card. Then select edit or delete. 

Enjoy!

## Technologies
  Front-End: HTML, CSS, Bootstrap, JavaScipt, React, Axios. Back-end: Ruby, Ruby on Rails, Heroku.

## Project Links
1. [Client Deployed Site](https://nathanfee.github.io/game-knight-client/#/)

2. [Client Repository](https://github.com/NathanFee/game-knight-client)

3. [API Deployed Site](https://game-knight-api.herokuapp.com/)

4. [API Repository](https://github.com/NathanFee/game-knight-api)

## Screen Shot of App
![Screen Shot](https://i.imgur.com/0Qlbo4m.png)

## Set Up and Install instructions
1. Fork and clone this repository.
2. Install dependencies with npm install.
3. Utalize npm run start to launch app locally.
    - Be sure to follow set up instructions for game-knight-api.
    - [API Repository](https://github.com/NathanFee/game-knight-api)
4. Utalize npm run deploy to deploy site to GH pages.

## Wire Frames
![Wire Frames](https://i.imgur.com/7lS2YkR.jpg)

## User Stories
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.

- As a signed in user, I would like to create a player.
- As a signed in user, I would like to update players names.
- As a signed in user, I would like to delete a player.
- As a signed in user, I would like to see all players and thier scores.
- As a signed in user, I would like to be able to add and remove points from a
  players score.
- As a signed in user, I would like to be able to clear all players scores.

## Planning, Process, and Execution
1. Create User Stories.
2. Create Wire Frames.
3. Set up Auth actions (e.g. sign-up, sign-in, and change-password)
4. CRUD actions for players
5. Basic layout for scoreboard with players
6. Add Logic for adding and removing points
7. Add logic for clearing all scores.
8. Update Read me
9. Troubleshoot/Debug
10. Style

Throughout:
1. Commit and Deploy often.
2. Take a 10min break every hour.

## Problem solving strategy
Break each problem down into simpler parts, attempt to talk out the problem,
pseudo code, utalize associates or issue que if stuck for more than an hour.

## Reach Goals & Unsolved Problems
  - Create a tournament bracket
