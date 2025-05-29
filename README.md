# League List Viewer

A Vue 3 application that displays a list of sports leagues using the SportsDB API. This application simulates a component from an online bookmaker platform.

## How to Run the Project

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## Features

- Displays a list of sports leagues from the SportsDB API
- Search functionality to filter leagues by name
- Filter leagues by sport type
- View league badges when clicking on a league
- Responsive design for all device sizes
- Caching strategy for badge API calls

## Technologies Used

- Vue 3 with Composition API
- SCSS for styling (no external UI libraries)
- Vite as the build tool
- Fetch API for data retrieval

## Project Structure

```
league-list-viewer/
├── public/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── main.scss
│   │       └── variables.scss
│   ├── components/
│   │   ├── BadgeDisplay.vue
│   │   ├── LeagueItem.vue
│   │   ├── LeagueList.vue
│   │   ├── SearchBar.vue
│   │   └── SportFilter.vue
│   ├── composables/
│   │   ├── useBadges.js
│   │   └── useLeagues.js
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Design Choices

### Component Structure

The application follows a component-based architecture for better maintainability and reusability:

- **App.vue**: Main container component that orchestrates the application
- **SearchBar.vue**: Handles user input for searching leagues
- **SportFilter.vue**: Provides a dropdown to filter leagues by sport
- **LeagueList.vue**: Container for displaying the list of leagues
- **LeagueItem.vue**: Individual league card component
- **BadgeDisplay.vue**: Modal component for displaying league badges

### State Management

Instead of using a complex state management library, the application uses Vue 3's Composition API with composables:

- **useLeagues.js**: Handles fetching, filtering, and searching leagues
- **useBadges.js**: Manages badge fetching and caching

This approach provides a lightweight state management solution while maintaining good separation of concerns.

### Styling

The application uses SCSS for styling with:

- A variables file for consistent theming
- Responsive design using mixins
- Scoped styles for components
- Global styles for common elements

### Caching Strategy

To optimize performance and reduce API calls, the application implements a robust caching mechanism for badge images:

- URL caching: Badge URLs are stored in a reactive Map
- Blob caching: Images are fetched once and stored as Blob objects with object URLs
- Memory management: Object URLs are properly revoked when clearing the cache
- The cache persists during the application session
- Null results are also cached to avoid unnecessary API calls

### Styling Integration

The application implements a seamless integration between SCSS and JavaScript:

- Sport colors are defined once in SCSS variables
- Colors are exposed as CSS custom properties (variables)
- Vue components dynamically access these variables at runtime
- Text colors are automatically calculated based on background brightness

### Error Handling

The application includes comprehensive error handling:

- Loading states for API calls
- Error messages for failed requests
- Fallback UI for missing data

## API Endpoints Used

- All Leagues: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- Badge Lookup: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<league_id>`

## AI Usage

AI assistance was used for the following aspects of this project:

- Creating Blob-based caching logic for images to prevent downloading the badge every time it's shown
- Implementing the integration between SCSS variables and Vue components for sport type colors
- Adding comprehensive comments throughout the codebase
- Organizing the project structure with separate SCSS files for components
- Creating this README.md file
=======
# assignment
Home Assignment - FE - Sports Leagues
>>>>>>> 3ea1522f23dd4d7feaf7309139790d6fd2a8b779
