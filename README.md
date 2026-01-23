 # Assignment 2 - unit testing


This assignment is meant to improve your unit testing skills and teach you a few best practices when it comes to working with external libraries.

This project is using an outdated date library. Your task is to write unit tests for the functions in `src/dateUtils.ts` and then replace the outdated library with a newer one.
Since the library is abstracted the tests should still pass using the new library.

Another task for you is to add type definition to the `dateUtils.ts` file. Please note that TypeScript is already set up, all you should need to do is to introduce types.


**Group size:** 1 person

-----

## Prerequisite

Make sure you have [Bun](https://bun.sh/) (version 1.3 or later) installed before starting the assignment.
* Select "Use this Template" and create a new repository using this as a template repo

## Setup

* `bun install`

## Commands
* `npm run test`
    - This runs the test suite


------------------

## The assignment

Start by looking at `src/dateUtils.ts` and get familiar with the functions.

Add Type definition to arguments and functions in `src/dateUtils.ts`.

### **Commit your changes.**

Go to `src/__tests__/dateUtils.test.ts` and add unit tests that cover each function, please note that some functions can, and should have, more than one unit test.

### **Commit your changes.**

Once you have written unit tests and feel comfortable with the coverage you have, start replacing the deprecated `moment` library with `date-fns`. There are similar functions available. Look at the documentation (https://date-fns.org/docs/Getting-Started) and you should be able to find functions that behave the same way.
Your tests suite should not be touched at this point, the unit tests you wrote in the beginning should still be green, because the input and the output stays the same.

### **Commit your changes.**


--------
## Handin

Add me (arnif) as a contributor to the Github repo. There should be at least 3 commits that include each step described above.
Add a link to the Github repo when turning in your solution to Canvas.

