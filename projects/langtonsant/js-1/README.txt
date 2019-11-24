# CPSC 335 Langtons Ant 12
Class Number 335-04
Project 1
John Scales
CWID: 888865730
Team Name: JES
Members of Team: John Scales
-----------------------------------------------------------------------------------------
This program is a demonstration of Turk & Propp's Ant 12, a cellular automaton.
-----------------------------------------------------------------------------------------
What the program does:
-----------------------------------------------------------------------------------------
This ant in has 4 states: 1100.
1 indicates the ant should turn left, and 0 means turn right.
The ant's heading is indicated by the white arrow.
The ant moves forward after every turn.
The grid is initially all black.
 If the ant hits a black or red cell it will turn left.
 If the ant hits a yellow or blue cell it will turn right.
 The colors of the cells increment by 1 starting at 0 which is black and is this position:
 1100
 ^
 and will go to red 1100 and then yellow 1100 then blue 1100 and then back to black 1100
                     ^                   ^                 ^                        ^
The cells increment to the next color when they are visited by the ant and the ant changes heading.
-----------------------------------------------------------------------------------------
To run the program:
-----------------------------------------------------------------------------------------
No installation is necessary.
Simply open js-1.html in a browser to run the program.
If you would like the change the speed of the program you can open js-1.html in a text editor like notepad and change the "250" on line 66 to some other time in milliseconds (lower to run faster, higher to run slower).
The program will run for 40,000 steps which is enough to fill a good amount of the grid.
You can increase the number of steps if you'd like to observe the ant further by increasing the "40000" on line 63. If you want it shorter just lower the number.
-----------------------------------------------------------------------------------------
No external requirement besides a browser
-----------------------------------------------------------------------------------------
No extra features & no missing features
-----------------------------------------------------------------------------------------
No bugs
-----------------------------------------------------------------------------------------
