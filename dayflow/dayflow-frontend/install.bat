@echo off
REM Employee Dashboard - Installation Script (Windows)
REM Run this script to set up the employee dashboard

echo.
echo 🚀 Setting up Employee Dashboard...
echo.

REM Install axios (the only missing dependency)
echo 📦 Installing axios...
call npm install axios

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo VITE_API_URL=http://localhost:5000/api
    ) > .env
    echo ✅ .env file created
) else (
    echo ℹ️  .env file already exists
)

echo.
echo ✅ Setup complete!
echo.
echo 📚 Next steps:
echo 1. Make sure your backend is running on http://localhost:5000
echo 2. Run 'npm run dev' to start the frontend
echo 3. Open http://localhost:5173/login in your browser
echo.
echo 📖 Read SETUP_GUIDE.md for detailed instructions
echo 📖 Read IMPLEMENTATION_COMPLETE.md for feature overview
echo.
echo Happy coding! 🎉
echo.
pause
