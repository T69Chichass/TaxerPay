# Backend Connection Guide

## Quick Setup

Your frontend is now connected to your backend! Here's how to test it:

### 1. Start the Backend
```bash
cd TaxerPay-Backend
python app.py
```

### 2. Start the Frontend
```bash
cd frontend
npm start
```

### 3. Test the Connection

#### Option A: Use the Test Page
- Navigate to `http://localhost:3000/test`
- Click the test buttons to verify backend connectivity

#### Option B: Test Through Login
- Go to `http://localhost:3000`
- Enter a PAN number and click Continue
- On the login page, enter any password and complete CAPTCHA
- Click Continue to test the login API

## What's Connected

### ✅ API Endpoints
- **Health Check**: `GET /api/health`
- **API Info**: `GET /api`
- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Tax Calculation**: `POST /api/tax/calculate`

### ✅ Eel Functions (when running with Python backend)
- `python_function()` - Test connection
- `get_user_data(user_id)` - Get user data
- `create_tax_record_python(tax_data)` - Create tax record
- `calculate_tax_python(income, tax_type)` - Calculate tax

### ✅ Features Added
1. **BackendTest Component** - Test all API endpoints
2. **Login Integration** - Real backend authentication
3. **Registration Ready** - Backend registration API
4. **Token Management** - Automatic JWT token storage
5. **Error Handling** - Proper error messages for connection issues

## Troubleshooting

### If you see "Connection error" messages:
1. Make sure the backend is running on port 8000
2. Check that MongoDB Atlas is connected
3. Verify the proxy configuration in package.json

### If Eel functions don't work:
- The frontend will fall back to REST API calls
- This is normal when running frontend and backend separately

## Next Steps

1. **Add more pages** that use the backend APIs
2. **Implement registration** in GetStartedPage
3. **Add tax calculation** features
4. **Create dashboard** with user data

## API Usage Examples

```javascript
import { authAPI, taxAPI, eelAPI } from './utils/eelApi';

// Login
const loginResult = await authAPI.login({
  email: 'user@example.com',
  password: 'password123'
});

// Calculate tax
const taxResult = await eelAPI.calculateTax(50000, 'federal');

// Create tax record
const recordResult = await taxAPI.createRecord(token, {
  tax_year: 2024,
  income: 50000,
  tax_type: 'federal'
});
```
