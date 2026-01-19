# Mini Disk Space Analyzer (Node.js CLI Tool)

## a. Problem Being Solved

Over time, disk space on my system gets consumed by large folders such as application data, development tools, SDKs, and cached files. Manually identifying which directories occupy the most storage is time-consuming and error-prone.

The problem this utility solves is helping users quickly identify the largest folders on a given path and understand what type of data they contain, without risking accidental deletion of important system files.

---

## b. How to Run the Program

### Prerequisites

- Node.js (LTS version)
- No external libraries or installations required

### Steps to Run

1. Open a terminal (Command Prompt / PowerShell / VS Code terminal)
2. Navigate to the project directory:
   ```bash
   cd <project-folder>
   ```

node analyzer.js --path <directory-to-scan> --top <number>

Example :
node analyzer.js --path C:\Users\kavav\AppData\Local --top 5

### c. Design Decisions

1. Implemented as a command-line tool for simplicity and ease of use.
2. Used only Node.js standard libraries (fs, path) to comply with constraints.
3. The tool performs read-only analysis to avoid accidental data loss.
4. Folder classification and risk levels are based on common system and developer knowledge rather than destructive assumptions.
5. The final decision is left to the user, making the tool safe and informative.
