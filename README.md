# NUS-Orbital-2022
NUS Orbital 2022 project - Mobile App Development
Workout Ethic is a comprehensive mobile application made with React Native that features functions useful to all gym-goers from dietary care to gyming routines.

## How to use
### Expo Go
Android Users can scan the following QR Code to use the application after downloading [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_SG&gl=US) application from Google Play Store. 

<p align="center">
<img width="278" alt="Screenshot 2022-09-07 at 4 39 37 PM" src="https://user-images.githubusercontent.com/97205844/188832400-7a4d6b01-9a0b-436a-b08b-be366e00af2f.png">
</p>


## Features
### Authentication
#### Basic authentication with Sign up/Sign in, reset password features
- The screen warns and prompts users to enter valid information if they are unacceptable (invalid email format, wrong password, empty input…etc)
- The entered user details will be stored in the Firebase Authentication system.
- As soon as a user enters an email to sign up, the user will be directed to set
 up his/her profile, which requires body information such as weight, age and gender.
 
 <p align="center">
 <img width="620" alt="Screenshot 2022-09-06 at 12 49 54 PM" src="https://user-images.githubusercontent.com/97205844/188549376-5b97b288-5af5-4586-ae2d-fb881c075da7.png">
 </p>

### User Profile
#### A typical user profile where the user inputs data (such as profile picture, name, body weight, height, gender, and age)
- This feature allows the app to provide users with a more customized experience, for example, target protein consumption each day can be calculated using the user’s body weight.

<p align="center">
<img width="368" alt="Screenshot 2022-09-06 at 12 54 37 PM" src="https://user-images.githubusercontent.com/97205844/188549908-170d9d9d-3632-4a28-95c8-997d30dddb48.png">
</p>

### Stopwatch & Animated Timer
#### Well-known stopwatch and timer features that keep track of the duration of each exercise. 
- The user can select the duration of the timer by scrolling left and right, and hit the red button to start. Once the timer starts, a red bar fills the screen and slowly runs out as time passes. When the timer reaches 0, the device alerts the user with vibration.
- Timer can be used to control the break times during each exercise set, or to allocate a certain span of time for a type of workout. 

<p align="center">
<img width="767" alt="Screenshot 2022-09-06 at 1 15 56 PM" src="https://user-images.githubusercontent.com/97205844/188552358-44e2421f-6951-4fcd-8832-71b01a642abf.png">
</p>

### Diet Tracker
#### Keeps track of nutrients intakes and daily target amount (protein and calories) through user input
- Visually shows nutritional objectives specific to the user, which is based on their height, weight, and their health goals. With the body data collected from the Profile feature, the user is provided with customized protein and calories consumption goals. 
- Target protein consumption per day is calculated as (Body weight * 1.8)g, and target calories consumption per day is calculated based on gender and age.
- The users can search for the food they consumed for each meal using the newly implemented search bar. [FoodData Central API](https://fdc.nal.usda.gov/) is fetched so that users can get accurate nutrient data for different serving sizes.

<p align="center">
<img width="641" alt="Screenshot 2022-09-06 at 1 25 02 PM" src="https://user-images.githubusercontent.com/97205844/188553445-bcabddfb-9db4-48d3-8bd2-8daab295d331.png">
</p>

### Workout Planner
#### A workout planner that stores list of workouts input by users for different dates
- Users can select days from the calendar and plan their workout on a daily basis.
- Users can add different workouts to the plan, manipulating the weight they are using, number of repetitions for each set, and the number of sets.
- Users can view a list of exercises that are to be done for the day’s workout. 
- Users can navigate between workout plans of the past to get an idea of the type of exercise and the weight they were handling a week ago. This can help them design their future workout plans. 
- Users can mark exercises as done as they progress through the workout session. They can also edit the information on their plan, or even delete the plan. 

<p align="center">
<img width="602" alt="Screenshot 2022-09-06 at 1 30 24 PM" src="https://user-images.githubusercontent.com/97205844/188554154-e6a4e2b8-6687-4b99-abd3-a7638fd26871.png">
</p>

### Progression Tracker
#### A progress tracker that allows users to keep track of their workout progress such as gradual change in their body shapes
- Users can input pictures of his/her body, which will provide visual indication to how their health/body shape has improved from their continuous dedication.
- Users can keep records of body weight, height, and any other health information on the memo tab of the progression log. Users can also use the space for notes and remarks. 
- The user will be able to browse through logs made and access records, as the logs will be organized in a scroll format. 
- Options will be available for the user to change the view mode to gallery, where users will be able to scroll through their body photos and visually observe how their body shape changed over time.

<p align="center">
<img width="389" alt="Screenshot 2022-09-06 at 1 34 14 PM" src="https://user-images.githubusercontent.com/97205844/188554658-9bc3b07d-1809-45d7-a22e-955b7cc5aa62.png">
</p>
