# Functional Test Cases: Expense Tracker

## 1. Module: User Authentication

### Test Case ID: TC_AUTH_01
*   **Feature:** User Registration
*   **Description:** Verify that a user can successfully register with valid details.
*   **Pre-conditions:** User is on the registration page.
*   **Test Steps:**
    1. Enter a valid username (e.g., `testuser`).
    2. Enter a valid, unique email (e.g., `testuser@example.com`).
    3. Enter a strong password (e.g., `Password123!`).
    4. Click the "Sign Up" button.
*   **Expected Result:** User is redirected to the dashboard; a "Registration Successful" success message appears.

### Test Case ID: TC_AUTH_02
*   **Feature:** User Login (Negative Test)
*   **Description:** Verify that login fails when providing an incorrect password.
*   **Pre-conditions:** User account already exists. User is on the login page.
*   **Test Steps:**
    1. Enter the registered email.
    2. Enter an incorrect password.
    3. Click "Login".
*   **Expected Result:** User remains on the login page; an error message displaying "Invalid email or password" is shown.

---

## 2. Module: Expense Management

### Test Case ID: TC_EXP_01
*   **Feature:** Add Expense
*   **Description:** Verify a user can successfully log an expense.
*   **Pre-conditions:** User is logged in and viewing the main dashboard.
*   **Test Steps:**
    1. Click the "Add Expense" button.
    2. Enter `15000` in the Amount field.
    3. Select "Food" from the Category dropdown.
    4. Pick today's date.
    5. Click "Submit".
*   **Expected Result:** The transaction is added to the "Recent Expenses" list; the user's remaining monthly budget updates immediately.

### Test Case ID: TC_EXP_02
*   **Feature:** Invalid Expense Amount (Negative Test)
*   **Description:** Verify the system prevents entering a negative amount.
*   **Pre-conditions:** User is logged in and on the "Add Expense" form.
*   **Test Steps:**
    1. Enter `-500` in the Amount field.
    2. Select "Utilities" as the Category.
    3. Click "Submit".
*   **Expected Result:** Form submission is blocked; an error appears saying "Amount must be greater than 0."