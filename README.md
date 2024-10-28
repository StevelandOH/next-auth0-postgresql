# Project Setup

## Create Auth0 Dashboard Application

#### 1. Create an Auth0 Account or Login to an Existing Account

- Go to [Auth0](https://auth0.com/) and click **Sign Up**.
- If you already have an account, login at [Auth0 Dashboard](https://manage.auth0.com/).

#### 2. Create a New Application

- In the sidebar, go to **Applications > Applications**.
- Click **Create Application**.
- Name your app whatever you'd like (you can change it later).
- Select **Regular Web Application** and click **Create**

### 3. Configure the Application

- Take note of the `Domain`, `Client ID`, and `Client Secret`
- In the **Settings** tab set the following for development:
  - **Allowed Callback URLs**: http://localhost:3000/api/auth/callback
  - **Logout URLs**: http://localhost:3000
  - **Allowed Web Origins**: http://localhost:3000
- Click **Save Changes**.

## Setup local postgresql database

### 1. Install PostgreSQL

- Install PostgreSQL on your system:
  - **macOS**: `brew install postgresql`
  - **Ubuntu**: `sudo apt update && sudo apt install postgresql postgresql-contrib`
- Start PostgreSQL service:
  - **macOS**: `brew services start postgresql`
  - **Ubuntu**: `sudo service postgresql start`

### 2. Open PostgreSQL CLI

- Open the PostgreSQL command-line interface:
  ```bash
  psql postgres
  ```

### 3. Create a New Database and User

- In the PostgreSQL CLI, create a db:
  ```sql
  CREATE DATABASE myapp;
  CREATE USER myuser WITH PASSWORD 'mypassword';
  GRANT ALL PRIVILEGES ON DATABASE myapp TO myuser;
  \c myapp
  ```
  - replace the values; myapp, myuser, and mypassword with whatever you would like

### 4. Create Users Table

- Create with the following command in PostgreSQL CLI:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth0_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Verify the Setup

- To check the table was created:

```sql
\dt
```

- To list the columns:

```sql
\d users
```

##

##

# Run the Application

## Install dependencies and run

- Make sure you have your values set up in the .env.local file before running application

```bash
npm install
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

##

##
