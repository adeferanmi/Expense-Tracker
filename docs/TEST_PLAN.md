# Software Test Plan: Expense Tracker Application

## 1. Introduction
This document outlines the testing strategy, resources, and schedule for the Expense Tracker web application. The goal is to ensure the application is reliable, secure, and user-friendly before deployment.

## 2. Scope of Testing
### In-Scope (What We Are Testing):
*   **User Authentication:** Registration, Login, Logout, and password validation.
*   **Expense Management:** Creating, reading, updating, and deleting (CRUD) expenses.
*   **Category Management:** Assigning expenses to categories (e.g., Food, Rent, Entertainment).
*   **Data Validation:** Ensuring amount fields only accept positive numbers and dates are valid.

### Out-of-Scope:
*   Multi-currency conversion (handled in later versions).
*   Integration with actual bank APIs.

## 3. Testing Levels & Strategy
1.  **Unit Testing:** Testing individual backend routes and frontend components in isolation using automated frameworks.
2.  **Integration Testing:** Verifying that the frontend properly communicates with the backend API endpoints.
3.  **System/Regression Testing:** Manual end-to-end (E2E) testing of user journeys (e.g., logging in, adding an expense, checking the dashboard).

## 4. Environment Requirements
*   **Browsers:** Google Chrome, Mozilla Firefox, Safari.
*   **Devices:** Laptop/Desktop views, Mobile responsive views.

## 5. Definition of Done (DoD)
A user story or feature is considered "Done" and ready for production when:
*   It passes all criteria defined in the specific Test Case document.
*   It has no open High or Critical severity defects.
*   The code has been peer-reviewed and approved by at least one other team member.