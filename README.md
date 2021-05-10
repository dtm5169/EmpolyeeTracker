Unit 12 MySQL Homework: Employee Tracker
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as Content Management Systems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

Instructions
Design the following database schema containing three tables.


Build a command-line application that at a minimum allows the user to:

-Add departments, roles, employees
-View departments, roles, employees
-Update employee roles


-View the total utilized budget of a department -- ie the combined salaries of all employees in that department


We can frame this challenge as follows:
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
How do you deliver this? Here are some guidelines:


Use the MySQL NPM package to connect to your MySQL database and perform queries.

Use InquirerJs NPM package to interact with the user via the command-line.

Use console.table to print MySQL rows to the console. There is a built-in version of console.table, but the NPM package formats the data a little better for our purposes.


You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's activities if you need a refresher on this.
