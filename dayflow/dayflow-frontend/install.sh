#!/bin/bash

# Employee Dashboard - Installation Script
# Run this script to set up the employee dashboard

echo "🚀 Setting up Employee Dashboard..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")"

# Install axios (the only missing dependency)
echo "📦 Installing axios..."
npm install axios

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
VITE_API_URL=http://localhost:5000/api
EOL
    echo "✅ .env file created"
else
    echo "ℹ️  .env file already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Make sure your backend is running on http://localhost:5000"
echo "2. Run 'npm run dev' to start the frontend"
echo "3. Open http://localhost:5173/login in your browser"
echo ""
echo "📖 Read SETUP_GUIDE.md for detailed instructions"
echo "📖 Read IMPLEMENTATION_COMPLETE.md for feature overview"
echo ""
echo "Happy coding! 🎉"
