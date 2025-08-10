# Test School Competency Assessment Platform - Backend

This is the backend API for the Test School Competency Assessment Platform. It provides user authentication, assessment management, question handling, and email verification features.

## Features

- User registration, login, and verification (with OTP via email)
- JWT-based authentication with access and refresh tokens
- Assessment progress tracking
- Question CRUD operations with pagination
- MongoDB integration via Mongoose
- Email sending via SMTP (Nodemailer)
- Secure password hashing (bcrypt)
- Encrypted OTP tokens

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT
- Nodemailer
- bcrypt

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance
- SMTP credentials for email sending

### Installation

1. Clone the repository:

   ```sh
   git clone <your-repo-url>
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and set the following variables:

   ```
   PORT=4000
   ORIGIN=http://localhost:5173
   MONGODB_URL=<your-mongodb-uri>
   SECRET=<your-key>:<your-iv>
   SMTP_HOST=<your-smtp-host>
   SMTP_PORT=<your-smtp-port>
   SMTP_USER=<your-smtp-user>
   SMTP_PASSWORD=<your-smtp-password>
   EMAIL_NAME=<your-email-name>
   EMAIL_FROM=<your-email-address>
   ```

   - To generate a SECRET, uncomment and run the block in [`src/utils/crypto.ts`](src/utils/crypto.ts).

4. Start the development server:

   ```sh
   npm run dev
   ```

## API Endpoints

All endpoints are prefixed with `/api`.

### User

- `POST /api/user` - Register a new user
- `POST /api/signin` - Login
- `GET /api/me` - Get current user (auth required)
- `POST /api/send-otp` - Send verification OTP
- `POST /api/verify-otp` - Verify OTP
- `POST /api/signout` - Logout

### Question

- `POST /api/question` - Create question (auth required)
- `GET /api/question` - List questions (auth required)
- `GET /api/question/assesment?step=1|2|3` - Get assessment questions by step (auth required)
- `GET /api/question/:id` - Get question by ID (auth required)
- `PATCH /api/question/:id` - Update question (auth required)
- `DELETE /api/question/:id` - Delete question (auth required)

### Demo

- `GET /api/demo` - Demo status

## Project Structure

See [src/](src/) for source code organization.

## License

MIT
