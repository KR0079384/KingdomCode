import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import Dashboard from "@/pages/Dashboard";
import ContributorsPage from "@/pages/Contributes";
import TimelinePage from "@/pages/Timeline";
import HallOfFamePage from "@/pages/HallOfFame";
import SettingsPage from "@/pages/Settings";
import GraphPage from "@/pages/Graph";
import LeaderboardPage from "@/pages/Leaderboard";
import './styles.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-background text-foreground overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/contributors" element={<ContributorsPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/hall-of-fame" element={<HallOfFamePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
