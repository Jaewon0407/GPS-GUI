==================================
SFU Rocketry GUI Instruction Guide      
==================================

[!GUI-Video](./Screen%20Recording%202023-11-10%20at%201.06.36%20PM.mov)

***File Exlanation:***

This GUI is a Full-stack Application (contains the frontend and the backend).

Frontend ( *used: React, OpenLayers API, Axios REST API* ): 
    - **index.js** is the entry point of the React. It is the file that gets executed when the application starts 
    - **App.js** is the main component 
    - **Map.js** is a subcomponent that displays the Map
    - **Coordinate.jsx** is a subcomponent that displays the Coordinates
    *Axios REST API allows the connection between the backend and the frontend*

Backend ( *used: Node.js, Express.js* ):
    - **server.js** is the main backend server that manages data extraction from CSV file onto the frontend

Extras:
    - update_csv can be ignored, just used for testing purposes 
    - Web.css in styles used for the overall UI structuring of the GUI

***How to run the applicaion***

Run the following in different terminals (Recommended)

1. Run the Backend (Go to the *backend folder*), then type 'node server'

2. Run the Frontend (Go to *GPS-Project folder*), then type 'npm start' 

- GPS can start sending data *before* Step #1 or *after* 
- **IF THERE IS NO CSV FILE, you can create one by going to src folder then typing 'node create_csv'**
- 'CTRL + C' to stop the frontend or backend
