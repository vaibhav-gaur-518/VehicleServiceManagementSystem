# Vehicle Service Management System 🚗🔧

## Overview

The **Vehicle Service Management System** is a full-stack application that allows users to register vehicles 🚗, vehicle components ⚙️, report issues ⚠️, calculate service prices 💲, and visualize revenue data 📊. The project includes an interactive frontend with animations ✨ and a structured backend for managing vehicle service records.

## Tech Stack

- **Frontend:** Vite (React), Tailwind CSS, Lenis, Framer Motion
- **Backend:** Django, Django REST Framework (DRF)
- **Database:** PostgreSQL 🐘
- **Charts:** Recharts or Chart.js 📈
- **Styling Theme:** Dark Mode 🌙

## Features

### Frontend

- **Framer Motion Animations:** Enhances user experience with smooth and engaging animations ✨.
- **Smooth Scrolling:** Click a carousel item to smoothly scroll to its corresponding section ↕️.
- **Dynamic Carousel:** Replaces traditional navbar for sleek and modern section navigation 🔄.
- **Animated Cards:** Displays components interactively, making them visually appealing 🎴.

### Backend

- **Component Registration:** Users can register vehicle components ⚙️.
- **Vehicle Registrations:** Users can register vehicles 🚗.
- **Issue Reporting:** Users can report vehicle issues ⚠️.
- **Price Calculation:** Automated pricing based on services 💲.
- **Revenue Visualization:** Displays business insights using charts 📊.

## Walkthrough Video & Screenshots

### Walkthrough Video 🎥

https://github.com/user-attachments/assets/dd3fc122-c6de-4d66-8620-4d11bbc0b191

### Screenshots

Below are some key sections of the website:

- **Home**&#x20; 🏠

<img width="1280" alt="home" src="https://github.com/user-attachments/assets/12d0811e-8beb-436b-8724-f46b4d2e03f5" />

- **Services**&#x20; 🛠️

<img width="1280" alt="services" src="https://github.com/user-attachments/assets/cb4a1908-88b0-4ef7-bd34-b160634b2288" />

- **Dashboard**&#x20; 📊

<img width="1279" alt="components" src="https://github.com/user-attachments/assets/18a8ac3f-a3b5-4f10-a535-b29f5686cc79" />

- **Adding Components**&#x20; ➕⚙️

<img width="1280" alt="add components" src="https://github.com/user-attachments/assets/70c9ddbc-f34f-4f24-8b5a-e009dae5eb25" />

- **Adding Vehicles**&#x20; ➕🚗

<img width="1280" alt="add vehicle" src="https://github.com/user-attachments/assets/d591e644-ae4e-459a-8467-d8d30d5fa820" />

- **Creating Services**&#x20; 📝

<img width="1280" alt="Issue" src="https://github.com/user-attachments/assets/e902b75d-5560-4c4b-9f09-31a400cb2756" />

- **Payment**&#x20; 💲

<img width="1277" alt="payment" src="https://github.com/user-attachments/assets/06b67b2f-ff6e-4fa9-9f8f-6940d72bffd6" />

- **Revenue Graphs**&#x20; 📈

<img width="1280" alt="revenue" src="https://github.com/user-attachments/assets/6cf839ae-2841-4227-8b0d-ae9488dd60e1" />


## Setup Instructions

### Backend (Django)

#### Prerequisites

- Python 3.x 🐍
- PostgreSQL/ pgadmin 4 🐘

#### Installation

1. Clone the repository:

   ```sh
   clone repo using: git clone
   cd vehicle-service-management/backend
   ```

2. Create and activate a virtual environment:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Configure environment variables (e.g., `.env` file):

   ```sh
    DB_NAME=""
    DB_USER=""
    DB_PWD=""
    DB_HOST=""
    DB_PORT=""
   ```

5. create database migrations:

 ```sh
   cd vehicle_service_management
   python manage.py makemigrations
 ```

6. Apply database migrations:

   ```sh
   python manage.py migrate
   ```

7. Start the server:

   ```sh
   python manage.py runserver
   ```

### Frontend (Vite + React)

#### Prerequisites

- Node.js (>= 16.x)
- npm

#### Installation

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install  
   ```

3. Start the development server:

   ```sh
   npm run dev 
   ```

## Contact

For queries or support, reach out to **Vaibhav Gaur** 🙋‍♂️.
