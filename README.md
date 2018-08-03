# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Table of Contents

* [Project-Overview](#project-overview)
* [Instructions](#instructions)
* [Issues](#issues)
* [Contributing](#contributing)


## Project-Overview

This is Stage 1 of the **Restaurant Reviews** project. This project is built on the starter code provided to Udacity students. I converted a static webpage to a mobile-ready web application. I took a static design that lacked accessibility and made it responsive on different sized displays and accessible for screen reader use. I also added a service worker for a better offline experience.


## Instructions

To view this project, you need to have Git Bash(on Windows) and Python installed.
In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.
Cd into the folder where you want to clone the project.
Run git clone https://github.com/mihaela-nastase/mws-restaurant-stage-1.git in the terminal.
Cd into the newly created folder.
Run npm install.
Run python -m http.server 8000.
With your server running, visit the site http://localhost:8000/ in your browser.

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). I replaced `<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information.
Dependencies: //normalize-css.googlecode.com/svn/trunk/normalize.css

## Issues

I wanted to create a button/link to skip the external links from the map for accessibility reasons, but the function to create it would only run once, for the first page, and not for the second one. I ended up setting an interval every 3 seconds, which  I'm not happy with.
Occasionally there are errors in the console but they don't seem consistent.

## Contributing

This repository is my personal project for the FEND program at Udacity. Therefore, I most likely will not accept pull requests.