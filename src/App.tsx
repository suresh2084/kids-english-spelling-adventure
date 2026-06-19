import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { GameProvider } from "./contexts/GameContext";
import { Navigation } from "./components/Navigation";

// Import pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MapScreen from "./pages/Map";
import Game from "./pages/Game";
import Rewards from "./pages/Rewards";
import Badges from "./pages/Badges";
import Daily from "./pages/Daily";
import Parent from "./pages/Parent";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="pb-24 min-h-screen">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/map" component={MapScreen} />
        <Route path="/game" component={Game} />
        <Route path="/rewards" component={Rewards} />
        <Route path="/badges" component={Badges} />
        <Route path="/daily" component={Daily} />
        <Route path="/parent" component={Parent} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
      <Navigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GameProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </GameProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
