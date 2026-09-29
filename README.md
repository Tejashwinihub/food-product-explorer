## 1. Project Overview

The Food Product Explorer is a React and TypeScript application that focuses only on food-related products from the DummyJSON public API. It filters out non-food categories before display, supports client-side title search, category filtering, and rating filtering, and shows detailed product information on a dedicated route.

## 2. Technologies Used

- React
- TypeScript
- Vite
- React Router DOM
- Fetch API
- DummyJSON
- Plain CSS

## 3. Installation Instructions

1. Open the project folder in the terminal.
2. Run `npm install` to install dependencies.
3. Make sure the existing Vite React TypeScript setup in the current folder is used.

## 4. How to Run the Application

Start the app with:

```bash
npm run dev -- --host 0.0.0.0
```

Then open the local URL shown in the terminal, usually `http://localhost:5173`.

## 5. API Details

The app uses the public DummyJSON API through the single service in `src/services/api.ts`.

- Products list: `GET /products?limit=0`
- Single product: `GET /products/:id`
- The app filters the fetched product list to food-only categories before rendering the UI.
- The API service contains the only `fetch()` calls.
- A custom `ApiError` stores HTTP status details when available.
- `404` is treated as Product not found.
- Other API or network failures are displayed as load errors in the UI.

## 6. Project Structure

The project follows the required architecture:

- `src/services/api.ts` handles all API calls.
- `src/hooks/useProducts.ts` and `src/hooks/useProduct.ts` manage loading, error, retry, and AbortController behavior.
- `src/pages` contains the food product list, details page, and not-found page.
- `src/components` includes reusable UI components.
- `src/utils/productUtils.ts` holds formatting, filtering, and category logic.
- `src/types/product.ts` contains the TypeScript interfaces.
- `src/routes/AppRoutes.tsx` defines the routing.

## 7. Design Decisions

The Food Product Explorer uses a clean food-themed visual style with a soft green palette, rounded cards, category chips, and strong branding. Prices are displayed consistently in Indian Rupees using the `en-IN` locale, even though the API data is not INR-native. The app uses client-side filtering for food-only categories, title search, category selection, and minimum rating selection with AND logic. The layout stays responsive for desktop, tablet, and mobile screens, and the custom hook pattern keeps data fetching separate from the page components.

## 8. Known Limitations

- The application depends on the public DummyJSON API and external network availability.
- Search and filter behavior are client-side only.
- The app intentionally displays only food-related categories from the API data.
- Product data and image availability come from the external API and can vary by item.
- The UI is limited to the requested Food Product Explorer functionality and does not include backend or authentication features.
