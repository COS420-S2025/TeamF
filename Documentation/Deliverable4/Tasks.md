# Project Task Breakdown (Assigned)

---

## 🔧 Core Architecture & System Design

### Online Communication (Team: Holy-Davison, Gavin)
- [ ] Define requirements for real-time/async communication
- [ ] Evaluate implementation approaches (WebSockets, polling, etc.)
- [ ] Prototype communication layer

### Backend / Database (Team: Will, Holy-Davison)
- [ ] Evaluate Supabase vs Firebase
- [ ] Decide on minimal connectivity strategy
- [ ] Implement basic connection layer

### Data Structures & Objects (Owner: Tom, Backup: Will)
- [ ] Define core data structures
- [ ] Refactor into 3 objects:
  - [ ] Task
  - [ ] Event
  - [ ] TaskEvent
- [ ] Ensure backend JSON supports new schema
- [ ] Update persistence logic to match new objects

### UML & System Design (Owner: Gavin, Backup: Will)
- [ ] Update UML diagrams to reflect new architecture
- [ ] Redesign interaction:
  - [ ] Frontend ↔ Middleware ↔ Backend

---

## 🧩 Middleware / Data Flow

### Research & Implementation (Owner: Holy-Davison)
- [ ] Research data flow architecture
- [ ] Define middleware responsibilities
- [ ] Begin middleware implementation

### CRUD Operations (Team: Holy-Davison, Tom)
- [ ] Create task → render in calendar cell
- [ ] Update task
- [ ] Delete task

---

## 📅 Calendar & Scheduling Features

### Core Features (Owner: Daniel)
- [ ] Complete day view
- [ ] Sticky time placement
- [ ] Make cells time-aware (current time awareness)
- [ ] Add current time indicator line
- [ ] Highlight current day
- [ ] Implement calendar view button

### ICS Integration (Owners: Holy-Davison, Daniel)
- [ ] Research ICS handling
- [ ] Debug existing ICS issues
- [ ] Implement import/export if feasible

---

## 🔐 Authentication

### Login System (Owner: Daniel)
- [ ] Build login modal/popup
- [ ] Prevent dismissal if login fails
- [ ] Validate username against Firebase/Supabase
- [ ] Dismiss modal on successful match

---

## 🧱 CRUD & UI Functionality

### Task Management (Owner: Tom, Support: Daniel)
- [ ] Ensure backend supports updated object schema
- [ ] Implement delete functionality
- [ ] Support multiple tags in create modal

### Edit Modal (Owners: Tom, Daniel)
- [ ] Define UX flow
- [ ] Implement edit modal UI
- [ ] Connect to backend update logic

---

## 🧪 Object Validation & Testing

### Object Redesign & Testing (Owner: Tom, Backup: Will)
- [ ] Redefine Task/Event objects
- [ ] Write tests for new object structures

---

## 📄 Documentation

### Technical Documentation (Owner: Gavin, Backup: Will)
- [ ] Create detailed technical design

### Deliverable Revisions (Owners: Gavin, Tom)
- [ ] Revise Deliverable 2 documentation

---

## 🎨 Frontend / UI Improvements

### Layout & Styling (Owner: Gavin)
- [ ] Fix sizing constraints
- [ ] Improve font sizes (especially mobile)
- [ ] Adjust header thickness (1.5–2rem)
- [ ] Sync with Holy-Davison if needed

### Settings Page (Owner: Holy-Davison)
- [ ] Design settings page UI
- [ ] Implement basic functionality

---

## 📊 Habit Tracker (Owner: Gavin)

- [ ] Build habit tracker components:
  - [ ] Progress circles or color indicators
  - [ ] Monthly calendar/grid view
- [ ] Reuse existing calendar components

---

## ❓ FAQ Section (Owner: Gavin)

- [ ] Write FAQ content
- [ ] Style FAQ page

---

## ⚡ Deadlines

### 🔴 Due by Tuesday

- Daniel:
  - [ ] Day view progress
  - [ ] Calendar interactions
- Holy-Davison:
  - [ ] Data flow research
  - [ ] Middleware progress
- Tom:
  - [ ] Object definitions draft
- Gavin:
  - [ ] UML draft
  - [ ] UI fixes started

---

## 🧠 Notes / Constraints

- Minimize reliance on Firebase/Supabase
- Ensure alignment across frontend, middleware, backend
- Keep object model consistent system-wide
