import { useState } from "react";
import GradeReportCard from "./components/ReportCard";
import ReportCardCarousel from "./components/ReportCardCarousel";

type ViewMode = "list" | "carousel";

function App() {
  const [view, setView] = useState<ViewMode>("list");

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Student Reports</h1>
        </div>

        {/* Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`btn btn-sm ${
              view === "list" ? "btn-primary" : "btn-ghost"
            }`}
          >
            List View
          </button>

          <button
            onClick={() => setView("carousel")}
            className={`btn btn-sm ${
              view === "carousel" ? "btn-primary" : "btn-ghost"
            }`}
          >
            Carousel View
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="p-4">
        {view === "list" && <GradeReportCard />}
        {view === "carousel" && <ReportCardCarousel />}
      </main>
    </div>
  );
}

export default App;
