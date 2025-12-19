@echo off
REM Quick Start Script for Portfolio (Windows)

echo.
echo === Modern Portfolio Setup ===
echo.

REM Check Node.js
echo Checking Node.js...
call node --version
call npm --version
echo.

REM Setup Backend
echo Setting up Backend...
cd backend
call npx --yes pnpm@9.12.3 i --registry https://registry.npmmirror.com
if not exist .env (
    copy .env.example .env
    echo Created .env - Please edit backend\.env with your MongoDB URI
)
cd ..
echo.

REM Setup Frontend
echo Setting up Frontend...
cd frontend
call npx --yes pnpm@9.12.3 i --registry https://registry.npmmirror.com
if not exist .env (
    copy .env.example .env
)
cd ..
echo.

echo === Setup Complete ===
echo.
echo To run the portfolio:
echo.
echo Terminal 1 (Backend):
echo   cd backend ^&^& node server.js
echo.
echo Terminal 2 (Frontend):
echo   cd frontend ^&^& npx vite
echo.
echo Then open: http://localhost:5173
echo.
echo To seed sample data:
echo   cd backend ^&^& npx --yes pnpm@9.12.3 exec node scripts/seed.js --registry https://registry.npmmirror.com
echo.
pause
