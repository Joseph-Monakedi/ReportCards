import GradeReportCard from "./components/ReportCard";
import ReportCardCarousel from "./components/ReportCardCarousel";
import { useViewFromUrl } from "./hooks/useViewFromUrl";
import { setUrlParam, ViewType } from "./utils/urlState";

function App() {
  const view = useViewFromUrl();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Student Reports</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setUrlParam("view", "list")}
            className={`btn btn-sm ${
              view === "list" ? "btn-primary" : "btn-ghost"
            }`}
          >
            List View
          </button>

          <button
            onClick={() => setUrlParam("view", "carousel")}
            className={`btn btn-sm ${
              view === "carousel" ? "btn-primary" : "btn-ghost"
            }`}
          >
            Carousel View
          </button>
        </div>
      </div>

      <main className="p-4">
        {view === ViewType.list && <GradeReportCard />}
        {view === ViewType.Carousel && <ReportCardCarousel />}
      </main>
    </div>
  );
}

export default App;