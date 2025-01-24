# Opus Major - Front-end dev test

This test is a front-end developer test for Opus Major. It uses the following technologies:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [React Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com/)

## Why React?

React is a popular library for building user interfaces. I have 8 years of experience with it and I love it.

## Why Vite?

I was used to use Webpack under the hood in my previous experiences and I wanted to try something new. Vite is a build tool for modern web development. It's fast (faster than Webpack from what I've seen) and easy to use.

## Why Typescript?

I've been using it for more than a year now and that's the new standard. It's a great way to write code that is more robust and easier to understand.

## Why Tailwind CSS?

I've been using it for more than 4 years now and that's the new standard. I could do without it but it's a great and faster way to write CSS.

## Why Recharts?

Recharts is a library for building charts in React. I've already tried it in a previous project (with VisX from AirBnB) and I found it easy to use.

## Why React Query?

React Query is a library for managing server state in React. I've never used it before but I've heard a lot of good things about it so I wanted to try it.

## Why React Router?

React Router is a library for routing in React. It's easy to use and has a large community. I'm used to Next.js but I wanted something less complex for this test.

# Issues I got

The main issue I got is related to the API and the createdAt key when I wanted to display all users created from the last hour.

I made some tests and found something really weird. I created a user :
- at 14:37 and here's the value of createdAt: 2025-01-24T13:01:56.059Z
- at 14:38 and here's the value of createdAt: 2025-01-23T14:54:58.042Z
- at 14:39 and here's the value of createdAt: 2025-01-23T22:27:54.476Z

As you can see, time should be separated by 1 min every time, but in fact we go from 13:01 to 14:54 to 22:27.

That's why we can't rely on createdAt values on the chart. And since I can't edit the API, I didn't manage to display the users in the chart.