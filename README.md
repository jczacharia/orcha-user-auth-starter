# Orcha User Auth Starter App

## Steps to get setup:

1. Clone repository:

   ```sh
   https://github.com/jczacharia/orcha-user-auth-starter
   ```

2. Install Dependencies:

   ```sh
   cd orcha-user-auth-starter && npm install
   ```

3. Have a PostgreSQL instance running on `localhost:5432` (Environment variables found here: `libs/user-auth-starter/shared/domain/src/lib/environments/environment.ts`)

   - Username: `postgres`
   - Password: `1Qazxsw2`
   - DB Name: `orcha-user-auth-starter`
   - e2e (Integration Testing) DB Name: `orcha-user-auth-starter-e2e`

4. Open 2 terminals:

5. In Terminal 1, run the client (Angular):

   ```sh
   npx ng serve user-auth-starter
   ```

6. In Terminal 2 run the server (Nestjs):

   ```sh
   npx ng serve api
   ```

7. Visit: http://localhost:4200
