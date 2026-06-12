import DashboardSidebar from "../components/layout/DashboardSidebar";

const Analytics = () => {
  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-[#0a0f1f] via-[#0b1f2a] to-[#120041]">
      <DashboardSidebar />
      <div className="flex-1 px-6 py-6 max-w-6xl mx-auto space-y-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Analytics
          </h1>
        </div>
        
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-sm">
          <p className="text-sm text-white/60 font-medium">Expense Category Analytics</p>
          <p className="text-white/40 mt-2">
            Analytical insights will appear here once you add transactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;