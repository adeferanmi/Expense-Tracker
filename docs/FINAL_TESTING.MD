# Expense Tracker - Software Testing & Architecture Documentation

## 1. Document Control
| Version | Date | Author | Description |
| :--- | :--- | :--- | :--- |
| v1.0.0 | June 3, 2026 | Brian | Initial consolidated architecture specifications & QA defect tracking. |
| v1.2.0 | June 3, 2026 | Brian | Expanded specifications adding the structural properties and validation models for the 'Budgets' tab. |
| v1.3.0 | June 3, 2026 | Brian | Completed 'Analytics' tab specification integration, including data charting and newly identified UI layer glitches. |
| v1.4.0 | June 3, 2026 | Brian | Added 'Logout' tab functional specification, session clearance rules, and authentication lifecycle tests. |
| v1.5.0 | June 3, 2026 | Brian | Integrated the entry 'Registration & Authentication Gateway' specs and corresponding login/signup validations. |

---

## 2. Executive Summary
This document serves as the centralized testing and architectural specification file for the **Expense Tracker Application**. It bridges structural user interface properties, state management data structures, and live system testing matrices to provide a definitive quality assurance roadmap.

---

## 3. Application Architecture & Tab Specifications

### 3.1 Gateway Stage: Registration & Authentication
* **Functional Purpose:** Acts as the primary application entry firewall, managing user registration (Sign Up), identity verification (Login), credential hashing, and secure JSON Web Token (JWT) session assignment.

#### A. UI Components & Visual Layout
* **Toggle View Segment:** Tabbed selection switch at the top of the card allowing users to seamlessly transition between the **Login** and **Sign Up** views.
* **Sign Up Interface Form:**
  * *Username Input:* Plain-text field enforcing unique profile handle creation.
  * *Email Input:* Structured field requiring standard email syntax validation (`example@domain.com`).
  * *Password Input:* Masked secure string field requiring password complexity parameters.
  * *Action Button:* Submission hook labeled `Sign Up`.
* **Login Interface Form:**
  * *Identifier Input:* Email or Username string field matching existing records.
  * *Password Input:* Masked secure string field for credential verification.
  * *Action Button:* Submission hook labeled `Login`.
* **Validation Sub-Labels:** Contextual error/success texts rendering immediately under fields for handling live boundary exceptions (e.g., `"Email already in use"`, `"Password too weak"`).

#### B. State Properties & Data Variables
```json
{
  "authGatewayState": {
    "activeFormMode": "LOGIN", 
    "isSubmitting": false,
    "validationErrorMsg": "Invalid username or password"
  },
  "registrationPayload": {
    "username": "brian_dev",
    "email": "brian@pau.edu.ng",
    "password": "hashed_secure_string_63"
  }
}
```

---

### 3.2 Tab: Dashboard
* **Functional Purpose:** Serves as the primary landing hub for the user, delivering a high-level visual summary of financial status, recent activity, spending trends, and budget health metrics.

#### A. UI Components & Visual Layout
* **Sidebar Navigation:** Anchor highlights active tab location. Exposes branding header and descriptive system graphic.
* **Greeting & Mascot Card:** Houses a friendly customized welcome string ("Hi, Brian 👋") paired with an interactive bear mascot to drive user engagement.
* **KPI Metrics Row:** A collection of three container cards tracking master balances: Total Expenses, Monthly Budget, and Remaining Balance.
* **Spending Overview Section:** Embeds an intuitive time-series line chart mapping structural expenses across trailing calendar milestones.
* **Data Streams Display:** Flanks charts with a two-column operational ledger layout tracking "Recent Transactions" and a macro "Budget Progress Panel".

---

### 3.3 Tab: Update Expenses
* **Functional Purpose:** Acts as the data entry portal and transaction management ledger, enabling full Create, Read, Update, and Delete (CRUD) administrative actions over transaction records.

#### A. UI Components & Visual Layout
* **Add New Expense Form:** A stylized input field container processing new financial activities via Title text inputs, numerical Amount fields, Category dropdown hooks, and a localized System Date Picker.
* **Expenses You've Added Grid:** A modular template layout displaying dynamic, historical transaction record cards. Each layout card houses structural text fields alongside direct touch-points targeting mutation (`Edit` button) and layout removal (`Delete` button).

---

### 3.4 Tab: Budgets
* **Functional Purpose:** Offers granular tracking of overall, weekly, and monthly fiscal ceilings against categorical distributions, processing multi-stage state tags to warn users of spending velocities.

#### A. UI Components & Visual Layout
* **Manage Budgets Trigger:** A localized top-header setting button (`⚙ Manage Budgets`) that exposes a target modal configuration panel, allowing manual customization of absolute budget limit parameters.
* **Overall Budget Health Card:** A horizontal high-level executive card parsing total categorical ceilings against outlays. Features include dynamic status indicator tags, sub-text string message lines, and an `Overall Progress` bar.
* **Dual Multi-Interval Trackers:** A split two-column structural pane layout comparing *Weekly Budget* metrics and *Monthly Budget* parameters using linear progress bars.
* **Circular Analytics Array:** A row of modular summary profile widgets for distinct items (`Shopping`, `Transport`, `Food`). Each widget renders a central color-blocked donut radial chart mapping percentage spent against remaining margin.

#### B. Threshold State-Tag Logic Matrix
$$	ext{Spent Ratio} = \left( rac{	ext{Category Spent}}{	ext{Category Budget Ceiling}} 
ight) 	imes 100$$

| Condition Criteria | Triggered Tag Label | Component Color Hex |
| :--- | :--- | :--- |
| $	ext{Spent Ratio} < 50\%$ | **SAFE** | Green System Tone |
| $50\% \le 	ext{Spent Ratio} \le 80\%$ | **CAUTION** | Lime/Yellow Accent |
| $80\% < 	ext{Spent Ratio} \le 100\%$ | **NEAR LIMIT** | Orange Warning Tone |
| $	ext{Spent Ratio} > 100\%$ | **EXCEEDED / LIMIT EXCEEDED** | Crimson/Pink High Alert |

---

### 3.5 Tab: Analytics
* **Functional Purpose:** Aggregates and displays long-term structural historical analytics data, calculating expenditure velocity metrics across distinct chronological cycles (Weekly vs. Monthly panels) via metric cards and distribution donut plots.

#### A. UI Components & Visual Layout
* **High-Level Statistics Row:** A grid layout containing four isolated analytics indicator data containers: `Total Spent`, `Transactions`, `Highest Expense`, and `Average Expense`.
* **Recent Transactions Sub-Ledger:** A secondary scrollable table viewport containing full descriptions, category types, relative dates, and currency parameters.
* **Weekly Expenses Analytical Section:** Houses an coordinate scatter plot and a simple single-slice category donut component.
* **Monthly Expenses Analytical Section:** Houses a continuous, time-series line plot trend line tracking rolling months and a complex concentric multi-slice segmented distribution ring.

---

### 3.6 Tab: Logout
* **Functional Purpose:** Terminates the active user session lifecycle securely, purges active state tokens, invalidates secure client cache hooks, and safely routes back to the unauthenticated Landing Homepage.

#### A. UI Components & Lifecycle Behavior
* **Sidebar Anchor Click Listener:** Listens for target interactions on the bottom-most navigation list element (`🚪 Logout`).
* **Session Destruction Script:** Intercepts click events to run clean state-clearing actions before letting the router complete.
* **Redirect Route Handler:** Programmatically triggers a view replacement call targeting the primary Root/Homepage route layout.

---

## 4. Test Cases & Execution Matrix

### 4.1 Functional, Calculation & Form Testing

#### TC-GATE-001: Email Syntax Validation Engine
* **Pre-conditions:** User initializes the Registration portal form.
* **Execution Steps:**
  1. Input a structural string format lacking standard email parameters (e.g., `brian_at_pau.edu.ng` or `brian@pau`).
  2. Attempt to trigger the execution action `Sign Up`.
* **Expected Result:** The registration submission pipeline must block execution, apply an alert red highlight state to the field border, and display an inline warning label string: `"Please enter a valid email address"`.
* **Status:** **PASSED**

#### TC-GATE-002: Password Field Obscuration Lifecycle Toggle
* **Pre-conditions:** Input fields holding string sequences have active value structures.
* **Execution Steps:**
  1. Input an alphanumeric password string into the Password field container.
  2. Verify that the input displays obscure masks (`••••••••`).
  3. Click the interactive trailing visibility icon (`👁 eye glyph`).
* **Expected Result:** The element must instantly transform its HTML DOM structural input type from `type="password"` to `type="text"`, exposing raw text clearly to check for spelling accuracy, before returning cleanly to masked strings upon another toggle event.
* **Status:** **PASSED**

* **TC-VAL-001: Aggregate Metric Logic Validation** -> **FAILED** (See DEF-001)
* **TC-VAL-002: Dynamic Progress Bar Scaling** -> **PASSED**
* **TC-FORM-001: Sanitization of Numeric Input Fields (Leading Zeros)** -> **PASSED**
* **TC-FORM-002: Lifecycle Component Generation & UI Binding** -> **PASSED**
* **TC-BUD-001: Multi-Tier State Tag Validation Engine** -> **PASSED**
* **TC-BUD-002: Circular Progress / Donut Component Boundary Constraints** -> **PASSED**
* **TC-ANA-001: Mathematical Average Calculation Verification** -> **PASSED WITH FORMATTING CONCERN** (See DEF-008)
* **TC-AUT-001: Session Eviction and Root Redirect Execution** -> **PASSED**

---

### 4.2 UI, Layout & Chronological Testing
* **TC-UI-001: Historical Analytics Timeline Sequencing** -> **CONCERN / REVIEW** (See DEF-003)
* **TC-ANA-002: Chart Typographical Layer Layout Integrity** -> **FAILED** (See DEF-007)

---

## 5. Defect Log & Remediation Tracker

| Defect ID | Component Context | Severity | Current Status | Defect Description & Remediation Notes |
| :--- | :--- | :--- | :--- | :--- |
| **DEF-001** | Dashboard Balance Engine | **CRITICAL** | **Open** | **Arithmetic Inversion Glitch:** The `Remaining Balance` UI element calculates a value of **₦-1,700** instead of the correct value **₦-101,700** when evaluating a ₦107,700 expenditure against a ₦6,000 budget framework. |
| **DEF-002** | Budget Percent Logic | **MEDIUM** | **Open** | **Progress Scaling Discrepancy:** While individual item indicators correctly scale text parameters upwards (e.g., Shopping text states `500%`), the main overarching macro calculation displays an absolute variance value (`1795% used`) that contradicts the localized dashboard summary layout. |
| **DEF-003** | Line Chart Component | **LOW** | **Review** | **Timeline Flow Ambiguity:** The `Expenses Over Time` chart charts a directional line mapping backward sequence trends from July to June along the primary horizontal data plot line. |
| **DEF-004** | Expense Card Layout | **LOW** | **Open** | **Text Case Standardization Lack:** Dynamic user generation cards display lowercase text input parameters unedited (e.g., displaying `asus prart px13`). The UI should implement clean standard string title-casing transformations (`Asus ProArt Px13`) globally. |
| **DEF-005** | Budget UI Card Text | **MEDIUM** | **Open** | **Conflicting Copy State:** The master status badge reads **EXCEEDED** and remaining funds are clearly in the negative (**₦-1,700**). However, the active greeting sub-header reads `"You're doing well this month 🎉"`. |
| **DEF-006** | Data Truncation Bug | **HIGH** | **Open** | **"Spent So Far" Array Slicing Error:** The Budgets tab shows `Spent So Far: ₦7,700`. However, your actual database contains a single transaction for an Asus laptop worth **₦100,000**, meaning your true expenditure is **₦107,700**. The Budgets engine is truncating or completely skipping the `Other` category when calculating data metrics, masking ₦100,000 in expenditures. |
| **DEF-007** | Analytics Donut Labels | **MEDIUM** | **Open** | **Typographical Collision Glitch:** In Monthly Expenses, the data leader text strings for `1200` and `1500` render on the exact same coordinate plane. The layout lines crash and overlap into an illegible string block. |
| **DEF-008** | Analytics Metric Style | **LOW** | **Open** | **Missing Thousands Separator Formatting:** Across the Analytics metric grid header cards, long numeric data strings are being rendered as raw integers without regional thousand currency commas (e.g., displaying `₦107700` and `₦21540` instead of `₦107,700` and `₦21,540`). |
| **DEF-009** | Weekly Analytics Chart | **HIGH** | **Open** | **Broken Broken Scatter Data Node:** In Weekly Expenses, the line trend chart fails to form an actual connecting trend path. It instead draws a completely decoupled single data node (`100000` at `Wed`) hovering inside space. |

---

## 6. Deployment Sign-off Status
```
[ Release Status: BLOCKED BY CRITICAL & HIGH DEFECTS ]
--------------------------------------------------
Total Test Cases Executed : 11
Passed                    : 8
Under Review / Concern    : 1
Failed (Critical/High)    : 2
--------------------------------------------------
Approval Note: Production migration remains paused until Defect DEF-001, 
Defect DEF-006, and Defect DEF-009 are fully resolved.
```
