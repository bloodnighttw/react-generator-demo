# react-generator-demo

## Overview

this is an experimental project to test the capabilities of generators in React with hooks or components.

this include:

1. `useAsyncGenerator` hook to use async generators in React components.
2. `AsyncGenerator` component to use async generators in React components.  
3. `useGenerator` hook to use generators in React components.

This project also provide some promise utilities to help with async operations. For example:

1. `waitTime` function to wait for a specific time in milliseconds (with signal to cancell).
2. `asCompleted` function to convert promises array into the async generator by the order of completion.

## Note

This project is experimental and may not work as expected. It is not recommended to use it in production.
Maybe after testing, I will write another package to let people use it in production.
