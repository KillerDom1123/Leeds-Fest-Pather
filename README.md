# Leeds-Fest-Pather
## Discover Overlapping and Matching Artists at Leeds Festival 2023

Leeds-Fest-Pather allows you to select artists performing at Leeds Fest 2023, compare your selections with your friends, and identify overlapping performances or matching choices.

All acts, stages, and timings have been sourced from [Clashfinder](https://clashfinder.com/m/leeds23).

## Setup and Running
Setting up and running this project is straightforward. Follow these steps:

1. **Clone the Repository:**

   * Open your terminal and run:
   ```sh
   git clone https://github.com/KillerDom1123/Leeds-Fest-Pather.git
   ```
2. **Frontend Setup:**
    * Navigate to the frontend directory in your terminal
    * Install required packages with:
    ```sh
    npm install
    ```
    * Start the React app:
    ```sh
    npm run start
    ```
3. **Backend Setup:**
    * Open a new terminal window
    * Go to the `backend` directory
    * Install packages
    ```sh
    npm install
    ```
    * Start the Express server
    ```sh
    npm run dev
    ```

## Usage
Once both the React app and Express server are up and running:

1. Open your browser and go to http://localhost:3000/
2. Click "Start" to begin selecting artists.
3. Choose your desired acts.
4. Click "Submit x Acts".
5. Select "Create New Results Room" or "Submit To Existing Results Room":
   * Choose the latter if someone shared a 'room code' with you.
6. Enter the required details (Name and/or Room Code).
7. You'll be directed to the 'Room Results' page. Here, you'll see selections made by others who submitted their choices to the same room.
   * Acts with overlapping start and end times are highlighted with a red border.
   * Matching acts chosen by multiple users have a green border.
8.  To modify your selection, click the edit button (pencil icon) next to your name.

## Note
Please be aware that this app was developed quickly and has a simplistic appearance and functionality. Expect a simple visual design and be prepared for possible bugs.
