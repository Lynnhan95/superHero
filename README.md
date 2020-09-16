
## Super Hero Combats!
This is a data visualization application concerning super hero super power stats. Users are able to search superheros by names, add heros to generated list, and make comparison with visual graphs. <br />
The design concept is shown in picture below : D <br />
![super.gif](https://i.loli.net/2019/12/12/8y2lbQi3sOk9tTa.gif) <br />
Technology: <br />
React, D3, Redux and superhero REST API (https://superheroapi.com/api). 
Link to the application: lynnhan95.github.io/superhero/

### Component overview

In the application, multiple UI elements and functions are presented as React components. <br />
There are 5 major UI components: Search box (+ close button), Search list (+ select button), Generated List (+ hero profile), Bar chart and Radar chart (both has tooltip.) <br />
And 2 functional components: Redux reducer that returns new state with actions dispatched to it; and search function that fetch data with superhero API. <br />
Using component makes code easier to read and manage.


### Visualization

I choose bar chart and radar chart as main visual representation for superheros super power. <br />
Because bar chart is simple and clear to present each hero's power in terms of intelligence, strength, speed, etc.<br />
And radar chart is cool and informative when compare multiple heros in one time. <br />
![design.jpg](https://i.loli.net/2019/12/12/9HAcNFT8PREI6w7.jpg)

### Data flow

The data will be fetched when user input superhero names in the search box (p.s. the https://cors-anywhere.herokuapp.com/ API is used to enable cross-origin requests.) Later on, the data will be stored and passed within components as state/ prop. This is how data flow in the application: <br />
![flow.jpg](https://i.loli.net/2019/12/12/E9dfI6Yz1csPRMj.jpg)

### Work flow
I started from the search function, and draw some UI elements based on API call results with React. Then, analyzed the JSON response to see how data looks like, draw sketches and design. After that, I started thinking of what visualizations to use and wrote code with D3. Entire time spent on the project: 20-30 hours.

## IllumioSuperHero
