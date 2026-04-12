# 🏗️ Project Structure Overview (Frontend vs Backend)

This document explains the purpose of each folder in a practical, startup-scale full-stack architecture. The goal is to maintain **clear separation of concerns**, support **fast iteration**, and avoid unnecessary complexity while staying scalable.

---

## 🟦 Frontend Structure

```text
betterdays/
  assests/
  components/
  pages/
  api/
  utilities/
  ```

---

### 📁 assests/
Place related files to be called on in components
* Images, videos, icons, fonts

**Purpose**
Consolidates all media to one location
---

### 📁 components/
Reusable UI building blocks.
* Buttons, inputs, modals, cards, layouts
* Purely presentational

**Purpose:**
Provide a consistent UI system that can be reused across the app.
``` 
NEW!!! Styles Folder is outdated, new appoach has each component seperated into it's 
own folder with a style, local test, & tsx file. 
``` 
---
### 📁 api/
Frontend API communication layer.
* HTTP requests (fetch)
* ics conversion
* Endpoint definitions

**Purpose:** 
Centralize all backend communication and avoid scattered API calls.

---
### 📁 utils/
* Generic helper functions.
* Formatting functions
* Date/time helpers
* Pure utility functions
* holds data for now
* props

**Purpose:**
Provide reusable logic across the frontend.

---
### 📁 pages/
* Define’s what the user views
* Represents full pages or routes
* Composes `features` and `components`

**Purpose:**
Define what the user sees

---

## 🟩 Backend Structure
```text
backend/
  routes/
  controllers/
  services/
  models/
  dto/
  ```
---
### 📁 routes/
* Defines endpoints and request mapping.
* Maps HTTP routes to controllers

**Purpose:**
Define the API surface of the application.

---
### 📁 controllers/
* Handles HTTP request/response flow.
* Parses incoming requests
* Calls service layer
* Returns responses to client
* Light validation (if needed)

**Purpose:** 
Act as the interface between HTTP and application logic.

---
### 📁 services/
* Contains system logic.
* Core application rules
* Workflows and orchestration
* Calls models/data layer

**Purpose:**
Implement the actual behavior of the system.

---
### 📁 models/
* Database layer definitions.
* schemas
* Database structure representation
* Maps application data to persistence layer

**Purpose:**
Define how data is stored and structured in the database.

---
### 📁 dto/ (Data Transfer Objects)
* Defines response shapes sent to clients.
* Removes sensitive fields
* Standardizes API responses
* Transforms internal models into safe output objects

**Purpose:**
Ensure API responses are explicit, consistent, and safe for external consumption.

---