# User Directory Table

A modern, responsive React web application that fetches and displays user data from the [ReqRes API](https://reqres.in/api/users) with advanced search, sorting, filtering, and pagination capabilities.

## 🚀 Features

### Core Functionality
- **Data Fetching**: Retrieves user data from ReqRes API
- **Table Display**: Clean, organized table layout with user avatars
- **Search**: Real-time search by name or email
- **Sorting**: Sort users by first name, last name, or email
- **Pagination**: Load more users with seamless pagination
- **Filtering**: Filter by email domain (Gmail) or first letter of name

### Enhanced Features
- **Loading Spinner**: Visual feedback during data loading
- **Mobile Responsive**: Optimized for all device sizes
- **Error Handling**: Graceful error messages for failed requests
- **No Results State**: User-friendly message when no matches found
- **Hover Effects**: Interactive table rows with hover states

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vanilla CSS** - Custom responsive styling
- **ReqRes API** - Mock user data source
- **ES6+** - Modern JavaScript features

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/1234-ad/user-directory-table.git
   cd user-directory-table
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Mobile Features
- Horizontal scrolling for table on small screens
- Stacked controls layout
- Optimized touch targets
- Compressed spacing for better mobile UX

## 🔍 API Integration

The app integrates with the ReqRes API:
- **Endpoint**: `https://reqres.in/api/users`
- **Method**: GET
- **Pagination**: Supports multiple pages
- **Response Format**: JSON with user objects containing:
  - `id`: Unique identifier
  - `first_name`: User's first name
  - `last_name`: User's last name
  - `email`: User's email address
  - `avatar`: Profile picture URL

## 🎨 Features Breakdown

### Search Functionality
- Real-time search as you type
- Searches across first name, last name, and email
- Case-insensitive matching
- Instant results with no page reload

### Sorting Options
- **First Name**: Alphabetical A-Z
- **Last Name**: Alphabetical A-Z  
- **Email**: Alphabetical A-Z
- Maintains search and filter states while sorting

### Filter Options
- **All Users**: Shows all available users
- **Gmail Users**: Filters users with @gmail.com emails
- **Names starting with A**: Shows users whose first name starts with 'A'

### Pagination
- Load more functionality instead of traditional page numbers
- Shows current count vs total available
- Disabled state when all users are loaded
- Loading indicator during fetch operations

## 🎯 Performance Optimizations

- **useMemo**: Optimized filtering and sorting calculations
- **Efficient Re-renders**: Minimized unnecessary component updates
- **Lazy Loading**: Users loaded on demand via pagination
- **Debounced Search**: Smooth search experience without excessive API calls

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Or connect GitHub repository for automatic deployments

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d build"`
3. Run: `npm run deploy`

## 📁 Project Structure

```
user-directory-table/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Main component
│   ├── index.js        # React entry point
│   └── index.css       # Styles
├── package.json
└── README.md
```

## 🔧 Customization

### Adding New Filters
To add new filter options, modify the `filterBy` logic in `App.js`:

```javascript
if (filterBy === 'your_filter') {
  return matchesSearch && /* your condition */;
}
```

### Styling Changes
All styles are in `src/index.css`. The CSS uses:
- CSS Grid and Flexbox for layouts
- CSS Variables for consistent theming
- Media queries for responsive design

### API Modifications
To use a different API, update the `fetchUsers` function in `App.js` and adjust the data structure mapping accordingly.

## 🐛 Troubleshooting

### Common Issues

1. **App won't start**
   - Ensure Node.js is installed (v14+)
   - Delete `node_modules` and run `npm install` again

2. **API errors**
   - Check internet connection
   - Verify ReqRes API is accessible
   - Check browser console for detailed error messages

3. **Styling issues**
   - Clear browser cache
   - Ensure CSS file is properly imported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [ReqRes](https://reqres.in/) for providing the mock API
- React team for the amazing framework
- Community for inspiration and best practices

---

**Live Demo**: [Coming Soon - Deploy to see it in action!]

**Repository**: https://github.com/1234-ad/user-directory-table