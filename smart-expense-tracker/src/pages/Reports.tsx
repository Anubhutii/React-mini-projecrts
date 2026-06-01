const Reports = () => {
  return (
    <div className="space-y-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white text-gray-800 tracking-tight">
          Reports
        </h1>
      </div>
      
      <div className="p-6 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200/80 shadow-sm">
        <p className="text-sm dark:text-gray-400 text-gray-500 font-medium">Monthly Expense Report</p>
        <p className="dark:text-gray-300 text-gray-600 mt-2">
          No reports generated for this period yet.
        </p>
      </div>
    </div>
  );
};

export default Reports;