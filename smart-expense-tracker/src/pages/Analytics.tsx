import { useState, useEffect } from "react";
import { getExpenses } from "../services/api";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import { FiCalendar } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, AreaChart, Area
} from "recharts";

type Expense = {
  _id?: string;
  id?: string;
  title: string;
  amount: number;
  category: string;
  subCategory?: string;
  date?: string;
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-3xl bg-white/5 border border-white/10 p-5 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, value, sub, color }: { title: string; value: string; sub: string; color: string }) => (
  <div className={`rounded-3xl p-5 border border-white/10 bg-gradient-to-br ${color} transition-all duration-300 hover:scale-[1.02]`}>
    <p className="text-sm text-white/60">{title}</p>
    <h2 className="text-2xl font-bold mt-1 text-white">{value}</h2>
    <p className="text-xs text-white/40 mt-1">{sub}</p>
  </div>
);

const Analytics = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedDeepDiveCategory, setSelectedDeepDiveCategory] = useState("Food");

  const colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#22c55e", "#f59e0b", "#ec4899", "#ef4444"];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      if (Array.isArray(data)) {
        setExpenses(data);
      }
    } catch (err) {
      console.error("Error fetching analytics data:", err);
    }
  };

  const budget = Number(localStorage.getItem("budget")) || 20000;

  // 1. Calculations
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const today = new Date();
  const currentMonthExpenses = expenses.filter(exp => {
    if (!exp.date) return false;
    const d = new Date(exp.date);
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });

  const currentMonthSpent = currentMonthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = Math.max(budget - currentMonthSpent, 0);

  const getAvgDailySpend = () => {
    if (expenses.length === 0) return 0;
    const uniqueDays = new Set(expenses.map(e => e.date ? e.date.split("T")[0] : null).filter(Boolean));
    const daysCount = uniqueDays.size || 1;
    return Math.round(totalSpent / daysCount);
  };

  const avgDailySpend = getAvgDailySpend();

  // 2. Spending by Category Data
  const getCategoryData = () => {
    const grouped: Record<string, number> = {};
    expenses.forEach(exp => {
      grouped[exp.category] = (grouped[exp.category] || 0) + exp.amount;
    });
    return Object.keys(grouped).map((key, index) => ({
      name: key,
      value: grouped[key],
      color: colors[index % colors.length]
    }));
  };

  const categoryData = getCategoryData();

  // 3. Monthly Comparison Data (Last 6 Months)
  const getMonthlyComparisonData = () => {
    const monthlyData: Record<string, number> = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      monthlyData[key] = 0;
    }

    expenses.forEach(exp => {
      if (!exp.date) return;
      const d = new Date(exp.date);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      if (key in monthlyData) {
        monthlyData[key] += exp.amount;
      }
    });

    return Object.keys(monthlyData).map(key => ({
      month: key,
      amount: monthlyData[key]
    }));
  };

  const monthlyComparisonData = getMonthlyComparisonData();

  // 4. Budget vs Actual Trend
  const getBudgetTrendData = () => {
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const data = [];
    
    let cumulative = 0;
    const dailyBudgetLimit = budget / daysInMonth;

    for (let day = 1; day <= daysInMonth; day++) {
      const dayExpenses = currentMonthExpenses.filter(exp => {
        if (!exp.date) return false;
        const d = new Date(exp.date);
        return d.getDate() === day;
      });
      const dayTotal = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      cumulative += dayTotal;

      const isPastOrToday = day <= today.getDate();

      data.push({
        day: `${day}`,
        Spent: isPastOrToday ? cumulative : null,
        Budget: Math.round(dailyBudgetLimit * day)
      });
    }
    return data;
  };

  const budgetTrendData = getBudgetTrendData();

  // 5. Category Deep Dive Line Chart
  const getCategoryTrendData = () => {
    const result: { date: string; amount: number }[] = [];
    const categoryExpenses = expenses.filter(e => e.category === selectedDeepDiveCategory);

    // Get last 15 days
    for (let i = 14; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      
      const totalForDay = categoryExpenses
        .filter(e => e.date && new Date(e.date).toDateString() === d.toDateString())
        .reduce((sum, e) => sum + e.amount, 0);

      result.push({
        date: dateStr,
        amount: totalForDay
      });
    }
    return result;
  };

  const categoryTrendData = getCategoryTrendData();

  // Available unique categories in database for dropdown selector
  const availableCategories = Array.from(new Set(expenses.map(e => e.category))).filter(Boolean);

  // 6. Sub-category Breakdown
  const getSubcategoryBreakdown = () => {
    const grouped: Record<string, number> = {};
    expenses.forEach(e => {
      const sub = e.subCategory || "Other";
      grouped[sub] = (grouped[sub] || 0) + e.amount;
    });
    
    return Object.keys(grouped)
      .map(key => ({ name: key, amount: grouped[key] }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  };

  const subcategoryBreakdown = getSubcategoryBreakdown();

  // 7. Heatmap Data (Last 150 Days)
  const getHeatmapData = () => {
    const result = [];
    for (let i = 149; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      
      const totalForDay = expenses
        .filter(e => e.date && new Date(e.date).toDateString() === d.toDateString())
        .reduce((sum, e) => sum + e.amount, 0);

      result.push({
        date: d.toDateString(),
        amount: totalForDay
      });
    }
    return result;
  };

  const heatmapData = getHeatmapData();

  const getHeatmapClass = (amount: number) => {
    if (amount === 0) return "bg-white/5";
    if (amount <= 500) return "bg-green-500/20 border border-green-500/30";
    if (amount <= 1500) return "bg-green-500/40 border border-green-500/50";
    if (amount <= 3000) return "bg-green-500/70 border border-green-500/80";
    return "bg-green-500 border border-green-400";
  };

  // 8. AI Dynamic Insights
  const getInsights = () => {
    const list = [];
    if (expenses.length === 0) {
      return ["No data available yet. Add some expenses to get insights!"];
    }
    
    // Insight 1: Top Category
    if (categoryData.length > 0) {
      const topCat = [...categoryData].sort((a, b) => b.value - a.value)[0];
      const percent = totalSpent ? ((topCat.value / totalSpent) * 100).toFixed(0) : "0";
      list.push(`📈 ${topCat.name} is your highest expense category, making up ${percent}% of your total spending.`);
    }

    // Insight 2: Budget status
    if (currentMonthSpent > budget) {
      list.push(`⚠️ You have exceeded your monthly budget by ₹${currentMonthSpent - budget}! Consider reducing non-essential spending.`);
    } else if (currentMonthSpent > budget * 0.8) {
      list.push(`⚠️ You have used ${((currentMonthSpent / budget) * 100).toFixed(0)}% of your budget. You are approaching your limit.`);
    } else {
      list.push(`✅ You are well within your monthly budget limits (${((currentMonthSpent / budget) * 100).toFixed(0)}% used). Keep it up!`);
    }

    // Insight 3: Weekend vs Weekday spending
    let weekdayTotal = 0;
    let weekendTotal = 0;
    expenses.forEach(e => {
      if (!e.date) return;
      const day = new Date(e.date).getDay();
      if (day === 0 || day === 6) {
        weekendTotal += e.amount;
      } else {
        weekdayTotal += e.amount;
      }
    });
    if (weekendTotal > weekdayTotal) {
      list.push(`📅 Weekend spending (₹${weekendTotal}) is higher than weekdays. Consider budgeting for weekend trips or dining.`);
    } else {
      list.push(`📅 Weekday spending (₹${weekdayTotal}) is higher. Regular daily commutes or subscriptions might be driving this.`);
    }

    return list;
  };

  const insights = getInsights();

  // 9. Top Transactions
  const topTransactions = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // 10. Spending Pattern details
  const getMostExpensiveDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const spendingByDay = Array(7).fill(0);
    expenses.forEach(e => {
      if (!e.date) return;
      const d = new Date(e.date).getDay();
      spendingByDay[d] += e.amount;
    });
    const maxIndex = spendingByDay.indexOf(Math.max(...spendingByDay));
    return spendingByDay[maxIndex] > 0 ? days[maxIndex] : "N/A";
  };

  const mostExpensiveDay = getMostExpensiveDay();
  const topCategoryName = categoryData.length > 0 ? [...categoryData].sort((a, b) => b.value - a.value)[0]?.name : "N/A";

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center">
        <div className="max-w-md p-8 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 shadow-2xl backdrop-blur-md">
          <h2 className="text-3xl font-bold dark:text-white text-gray-800 mb-4">
            Access Locked 🔒
          </h2>
          <p className="dark:text-gray-300 text-gray-600 mb-6">
            Please log in or sign up to view and manage your smart expense dashboard.
          </p>
          <p className="text-xs dark:text-gray-400 text-gray-500">
            Use the <strong>Login</strong> button at the top right of the navigation bar to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-[#0a0f1f] via-[#0b1f2a] to-[#120041]">
      
      <DashboardSidebar expenses={expenses} />

      <div className="flex-1 min-w-0 px-4 py-6 md:px-6 max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new Event("open-sidebar"))}
              className="md:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition cursor-pointer"
              title="Open menu"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Analysis Overview</h1>
              <p className="text-white/50 text-xs sm:text-sm mt-0.5">
                Deep insights into your spending behavior
              </p>
            </div>
          </div>

          <div className="flex gap-3 self-start sm:self-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/80">
              <FiCalendar /> {today.toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            </button>
          </div>
        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Spent"
            value={`₹${totalSpent}`}
            sub="Lifetime cumulative spend"
            color="from-indigo-500/20 to-purple-500/10"
          />
          <StatCard
            title="Remaining Budget"
            value={`₹${remainingBudget}`}
            sub={`Limit: ₹${budget} this month`}
            color="from-green-500/20 to-emerald-500/10"
          />
          <StatCard
            title="Avg. Daily Spend"
            value={`₹${avgDailySpend}`}
            sub="Average per active day"
            color="from-orange-500/20 to-yellow-500/10"
          />
          <StatCard
            title="Transactions"
            value={`${expenses.length}`}
            sub="Total recorded entries"
            color="from-blue-500/20 to-cyan-500/10"
          />
        </div>

        {/* CHART ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Monthly vs Last Month */}
          <Card className="lg:col-span-1 flex flex-col justify-between h-[300px]">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-sm">Monthly Trend</p>
              <span className="text-purple-400 text-xs font-semibold">Last 6 Months</span>
            </div>

            <div className="flex-1 w-full mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", color: "white" }} />
                  <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Budget vs Actual */}
          <Card className="lg:col-span-1 flex flex-col justify-between h-[300px]">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-sm">Cumulative Budget vs Actual</p>
              <span className="text-green-400 text-xs font-semibold">This Month</span>
            </div>

            <div className="flex-1 w-full mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={budgetTrendData}>
                  <defs>
                    <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", color: "white" }} />
                  <Area type="monotone" dataKey="Spent" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSpent)" name="Actual Spent" />
                  <Line type="monotone" dataKey="Budget" stroke="#6b7280" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Ideal Limit" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Pie */}
          <Card className="lg:col-span-1 flex flex-col justify-between h-[300px]">
            <p className="font-semibold text-sm mb-2">Spending by Category</p>

            <div className="flex-1 relative mt-2">
              {categoryData.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs">
                  No data to show
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", color: "white" }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-white/40 text-[9px] uppercase tracking-wider">Total</p>
                      <p className="text-sm font-bold text-white">₹{totalSpent}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Category Deep Dive */}
          <Card className="md:col-span-2 flex flex-col justify-between h-[300px]">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
              <p className="font-semibold text-sm">Category Deep Dive (Daily Trend)</p>
              <select
                value={selectedDeepDiveCategory}
                onChange={(e) => setSelectedDeepDiveCategory(e.target.value)}
                className="bg-[#0f172a] border border-white/10 px-3 py-1.5 rounded-xl text-xs text-white outline-none cursor-pointer self-start sm:self-auto"
              >
                {availableCategories.length === 0 ? (
                  <option value="Food">Food</option>
                ) : (
                  availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
              </select>
            </div>

            <div className="flex-1 w-full mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={categoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", color: "white" }} />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} name="Amount Spent" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Sub Category */}
          <Card className="flex flex-col justify-between h-[300px]">
            <p className="font-semibold text-sm mb-3">Top Sub-categories</p>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {subcategoryBreakdown.length === 0 ? (
                <div className="text-white/30 text-xs text-center pt-8">No subcategories tracked</div>
              ) : (
                subcategoryBreakdown.map((sub) => {
                  const percent = totalSpent ? ((sub.amount / totalSpent) * 100).toFixed(0) : "0";
                  return (
                    <div key={sub.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-white/90">{sub.name}</span>
                        <span className="text-white/50">₹{sub.amount} ({percent}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* HEATMAP */}
        <Card>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
            <p className="font-semibold text-sm">Spending Heatmap</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] text-white/40">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-white/5 inline-block"/> ₹0</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-500/20 inline-block"/> &le; ₹500</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-500/40 inline-block"/> &le; ₹1500</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-500/70 inline-block"/> &le; ₹3000</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-500 inline-block"/> &gt; ₹3000</span>
            </div>
          </div>
          <div className="w-full overflow-x-auto py-1">
            <div className="grid grid-cols-15 sm:grid-cols-30 gap-1.5 min-w-[420px] justify-items-center">
              {heatmapData.map((dayData) => (
                <div
                  key={dayData.date}
                  className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 ${getHeatmapClass(dayData.amount)}`}
                  title={`${new Date(dayData.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}: ₹${dayData.amount}`}
                />
              ))}
            </div>
          </div>
          <p className="text-[10px] text-white/30 text-right mt-2">Showing last 150 days of logging activity</p>
        </Card>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* AI Insights */}
          <Card className="h-[250px] flex flex-col">
            <p className="font-semibold text-sm mb-3">AI Insights</p>

            <ul className="flex-1 overflow-y-auto space-y-3 text-xs text-white/70 pr-1">
              {insights.map((insight, index) => (
                <li key={index} className="flex gap-2 items-start leading-relaxed bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                  {insight}
                </li>
              ))}
            </ul>
          </Card>

          {/* Top Transactions */}
          <Card className="h-[250px] flex flex-col">
            <p className="font-semibold text-sm mb-3">Top Transactions</p>

            <div className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
              {topTransactions.length === 0 ? (
                <div className="text-white/30 text-xs text-center pt-8">No transactions found</div>
              ) : (
                topTransactions.map((tx) => (
                  <div key={tx._id || tx.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-none">
                    <div>
                      <p className="font-medium text-white">{tx.title}</p>
                      <p className="text-[10px] text-white/40 mt-0.5">{tx.category} • {tx.date ? new Date(tx.date).toLocaleDateString("en-IN") : "N/A"}</p>
                    </div>
                    <span className="font-bold text-white text-sm">₹{tx.amount}</span>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Pattern */}
          <Card className="h-[250px] flex flex-col justify-between">
            <p className="font-semibold text-sm mb-3">Spending Pattern</p>

            <div className="flex-1 flex flex-col justify-center space-y-3 text-xs text-white/70">
              <div className="flex justify-between bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                <span>Most Expensive Day:</span>
                <span className="font-semibold text-green-400">{mostExpensiveDay}</span>
              </div>
              <div className="flex justify-between bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                <span>Top Category:</span>
                <span className="font-semibold text-green-400">{topCategoryName}</span>
              </div>
              <div className="flex justify-between bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                <span>Avg Daily Spend:</span>
                <span className="font-semibold text-green-400">₹{avgDailySpend}</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Analytics;