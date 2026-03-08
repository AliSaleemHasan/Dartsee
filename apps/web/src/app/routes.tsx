import { createBrowserRouter } from "react-router";
import GamesList from "./pages/GamesList";
import GameDetail from "./pages/GameDetail";
import Statistics from "./pages/Statistics";
import PlayerHeatmap from "./pages/PlayerHeatmap";

import About from "./pages/About";
import NotFound from "./pages/NotFound";
import GlobalError from "./pages/GlobalError";

export const router = createBrowserRouter([
  {
    errorElement: <GlobalError />,
    children: [
      { path: "/", Component: GamesList },
      { path: "/games", Component: GamesList },
      { path: "/games/:gameId", Component: GameDetail },
      { path: "/statistics", Component: Statistics },
      { path: "/heatmap/:gameId/:playerId", Component: PlayerHeatmap },

      { path: "/about", Component: About },
      { path: "*", Component: NotFound },
    ],
  }
]);