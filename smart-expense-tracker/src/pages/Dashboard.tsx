const Dashboard = () => {
  return (
    <div className="space-y-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white text-gray-800 tracking-tight">
          Dashboard
        </h1>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200/80 shadow-sm">
          <p className="text-sm dark:text-gray-400 text-gray-500 font-medium">Total Balance</p>
          <p className="text-2xl font-bold dark:text-white text-gray-800 mt-2">$12,450.00</p>
        </div>
        <div className="p-6 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200/80 shadow-sm">
          <p className="text-sm dark:text-gray-400 text-gray-500 font-medium">Monthly Income</p>
          <p className="text-2xl font-bold text-emerald-500 mt-2">+$4,200.00</p>
        </div>
        <div className="p-6 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200/80 shadow-sm">
          <p className="text-sm dark:text-gray-400 text-gray-500 font-medium">Monthly Expenses</p>
          <p className="text-2xl font-bold text-rose-500 mt-2">-$1,840.00</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;