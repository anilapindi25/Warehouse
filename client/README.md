# Warehouse Package System - React Client

A modern React frontend for managing warehouse packages with real-time capacity tracking.

## Features

- **Add Packages**: Form with dropdown to select package size (SMALL, MEDIUM, LARGE)
- **Capacity Tracking**: Real-time warehouse capacity display with progress bars
- **Package List**: View all stored packages with details
- **Remove Packages**: Delete packages with confirmation
- **Responsive Design**: Works on desktop and mobile devices
- **Axios Integration**: Seamless API communication with backend

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, backend proxy set in package.json):
```env
REACT_APP_API_URL=http://localhost:5000/api/packages
```

## Running the App

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddPackageForm.js     # Form to add packages
│   │   ├── CapacityStatus.js     # Capacity display component
│   │   └── PackageList.js        # List of stored packages
│   ├── App.js                    # Main app component
│   ├── App.css                   # Styling
│   └── index.js                  # React entry point
├── package.json
└── .gitignore
```

## Components

### AddPackageForm
- Functional component for adding new packages
- Dropdown selector for package size (SMALL, MEDIUM, LARGE)
- Input fields for tracking number, sender name, recipient name
- Form validation before submission

### CapacityStatus
- Displays real-time warehouse capacity for each size
- Shows used/available slots with progress bars
- Color-coded based on capacity percentage:
  - Green: < 50%
  - Orange: 50-80%
  - Red: > 80%

### PackageList
- Displays all stored packages
- Shows package details: tracking number, size, sender, recipient, status
- Remove button with confirmation dialog
- Empty state when no packages exist

## API Integration

Uses **axios** for all API calls:

- `GET /api/packages/` - Fetch all packages
- `GET /api/packages/capacity` - Get capacity status
- `POST /api/packages/add` - Add new package
- `DELETE /api/packages/remove/:id` - Remove package

## Building for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Styling

- Modern, gradient-based design
- Responsive CSS Grid layout
- Smooth transitions and hover effects
- Mobile-friendly media queries
- Color-coded package sizes

## Features in Detail

### Size Selection
- SMALL: 5 available slots
- MEDIUM: 3 available slots
- LARGE: 2 available slots

### Feedback
- Success messages after adding/removing packages
- Error messages with details
- Loading states during API calls
- Confirmation dialogs for destructive actions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
