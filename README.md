# Your Car Your Way Chat

## Overview

This project is a web application built using Angular for the frontend and Spring Boot for the backend. It provides a chat interface.

## Technologies Used

- **Frontend:**
    - Angular 18
    - TypeScript
    - HTML
    - CSS
    - Angular Material 
    - stompjs 
    - types/sockjs-client
    - sockjs-client 
    - rxjs

- **Backend:**
    - Java 21 
    - Spring Boot 3.3
    - WebSocket
    - Maven
  
## Prerequisites

- Node.js and npm (Node.js v18.20 min) 
- Angular CLI
- Java JDK
- Maven

## Setup Instructions

### Backend

1. **Navigate to the backend directory:**
   ```bash
   cd back
   ```
2. **Build the Spring Boot application:**
   ```bash
   mvn clean install
   ```

3. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```

### Frontend

1. **Navigate to the frontend directory:**
   ```bash
   cd front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
## Usage

1. **Run the Angular application:**
   ```bash
   ng serve
   ```
2. **Access the application:**
   Open your browser and navigate to `http://localhost:4200` to access the chat interface for a user.

3. **Service Endpoint:**
   For accessing the service endpoint, navigate to `http://localhost:4200/chat/service`.