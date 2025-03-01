import { FeedbackMetrics } from "@/components/feedback-metrics";
import { FeedbackStream } from "@/components/feedback-stream";
import { SentimentChart } from "@/components/sentiment-chart";
import { ReportsSection } from "@/components/reports-section";
import { AppSidebar } from "@/components/app-sidebar";

export default function RestaurantAdminDashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Restaurant Admin Dashboard</h1>
        
        {/* Overview Metrics */}
        <FeedbackMetrics />

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Live Feedback Stream */}
          <FeedbackStream />

          {/* Sentiment Trends */}
          <SentimentChart />
        </div>

        {/* Reports Section */}
        <ReportsSection />
      </main>
    </div>
  );
}
