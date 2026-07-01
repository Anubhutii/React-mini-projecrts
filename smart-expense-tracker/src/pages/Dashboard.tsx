import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  PieChart, LineChart, Line, CartesianGrid, XAxis, YAxis,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getExpenses, addExpense } from "../services/api";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import { useAuth } from "../context/AuthContext";
import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  type Expense = { id?: string; title: string; amount: number; category: string; subCategory?: string; date?: string };
  type CategoryDatum = { name: string; value: number; color?: string };

  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date");

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [subCategory, setSubCategory] = useState("");
  const [customSubCategory, setCustomSubCategory] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [note, setNote] = useState("");

  const subcategoriesMap: Record<string, string[]> = {
    Food: ["Zomato", "Swiggy", "Dining"],
    Travel: ["Ola", "Uber", "Rapido", "Metro", "Bus", "Train", "Flight"],
    Grocery: ["Zepto", "Blinkit", "BigBasket"],
    Shopping: ["Amazon", "Flipkart", "Myntra"],
    Bills: ["Electricity", "Water", "Internet", "Rent"],
    Entertainment: ["Movies", "Games", "OTT"],
    Other: []
  };

  const handleCategoryChange = (catLabel: string) => {
    setCategory(catLabel);
    setSubCategory("");
    setCustomSubCategory("");
    setIsCustomSelected(false);
  };

  const [budget, setBudget] = useState<number>(() => Number(localStorage.getItem("budget")) || 20000);
  const [budgetInput, setBudgetInput] = useState("");
  const [openBudgetModal, setOpenBudgetModal] = useState(false);

  const displayExpenses = dateParam
    ? expenses.filter(exp => exp.date && exp.date.split("T")[0] === dateParam)
    : expenses;

  const grouped: Record<string, number> = {};
  displayExpenses.forEach((item) => {
    if (!grouped[item.category]) {
      grouped[item.category] = 0;
    }
    grouped[item.category] += item.amount;
  });

  const colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#22c55e", "#f59e0b"];
  const categoryData: CategoryDatum[] = Object.keys(grouped).map((key, index) => ({
    name: key,
    value: grouped[key],
    color: colors[index % colors.length],
  }));

  const total = categoryData.reduce((acc, curr) => acc + curr.value, 0);

  const monthlyTotal = expenses
    .filter(exp => {
      if (!exp.date) return false;
      const expDate = new Date(exp.date);
      const today = new Date();
      return expDate.getMonth() === today.getMonth() && expDate.getFullYear() === today.getFullYear();
    })
    .reduce((sum, exp) => sum + exp.amount, 0);


  const getCategoryIcon = (cat: string) => {
  switch (cat) {
    case "Food": return "🍽";
    case "Travel": return "🚗";
    case "Grocery": return "🛒";
    case "Shopping": return "🛍";
    case "Bills": return "⚡";
    case "Entertainment": return "🎬";
    default: return "💸";
  }
};

const getCategoryStyle = (cat: string) => {
  switch (cat) {
    case "Food": return "bg-green-500/20 text-green-400";
    case "Travel": return "bg-blue-500/20 text-blue-400";
    case "Grocery": return "bg-emerald-500/20 text-emerald-400";
    case "Shopping": return "bg-purple-500/20 text-purple-400";
    case "Bills": return "bg-yellow-500/20 text-yellow-400";
    case "Entertainment": return "bg-pink-500/20 text-pink-400";
    default: return "bg-gray-500/20 text-gray-400";
  }
};

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case "Food": return "#22c55e";
    case "Travel": return "#3b82f6";
    case "Grocery": return "#10b981";
    case "Shopping": return "#a855f7";
    case "Bills": return "#f59e0b";
    case "Entertainment": return "#ec4899";
    default: return "#6b7280";
  }
};

  const categories = [
    { label: "Food", icon: "🍔" },
    { label: "Travel", icon: "🚗" },
    { label: "Grocery", icon: "🛒" },
    { label: "Shopping", icon: "🛍" },
    { label: "Bills", icon: "⚡" },
    { label: "Entertainment", icon: "🎬" },
    { label: "Other", icon: "💸" }
  ];

  const getLast7DaysData = () => {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  
  const result: { day: string; value: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const dayName = days[d.getDay()];

    // total expense for that day
    const totalForDay = expenses
      .filter((exp) => {
        const expDate = new Date(exp.date || "");
        return expDate.toDateString() === d.toDateString();
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    result.push({
      day: dayName,
      value: totalForDay,
    });
  }

  return result;
};



  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (dateParam) {
      setDate(dateParam);
    } else {
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [dateParam]);

  // ✅ FETCH + GROUP DATA
  const fetchExpenses = async () => {
  try {
    const data = await getExpenses();

    if (!Array.isArray(data)) {
      console.error("Invalid data:", data);
      return;
    }

    setExpenses(data);

  } catch (err) {
    console.error("Fetch error:", err);
  }
};

  const handleSave = async () => {
    if (!amount || !category) {
      alert("Fill all fields");
      return;
    }

    const subCatToSave = isCustomSelected ? customSubCategory.trim() : subCategory;
    if (!subCatToSave) {
      alert("Please select or enter a subcategory");
      return;
    }

    const titleToSave = note.trim() || subCatToSave;

    await addExpense({
      title: titleToSave,
      amount: Number(amount),
      category: category,
      subCategory: subCatToSave,
      date: date,
    });

    setAmount("");
    setCategory("");
    setSubCategory("");
    setCustomSubCategory("");
    setIsCustomSelected(false);
    setNote("");
    setDate(dateParam || new Date().toISOString().split("T")[0]);
    setOpen(false);

    fetchExpenses();
  };

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
    <>
      <div className="flex min-h-screen min-w-[250px] text-white bg-gradient-to-br from-[#0a0f1f] via-[#0b1f2a] to-[#120041]">

        {/* SIDEBAR */}
        <DashboardSidebar expenses={expenses} />

        {/* MAIN */}
        <div className="flex-1 w-full min-w-0 px-4 pt-20 pb-4 max-w-6xl mx-auto text-[14px]">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 animate-fadeInDown">
            <div className="flex items-center gap-3 w-full sm:w-auto">
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
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-medium tracking-wide text-white">Dashboard</h2>
                  {dateParam && (
                    <span className="flex items-center gap-1 bg-purple-500/20 text-purple-300 text-[11px] px-2 py-0.5 rounded-full border border-purple-500/30">
                      📅 {dateParam}
                      <button
                        onClick={() => setSearchParams({})}
                        className="hover:text-white ml-1 font-bold cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                </div>
                <p className="text-white/50 text-xs mt-1">
                  Welcome back, {user?.name || "User"} 👋
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
              <button
                onClick={() => {
                  setBudgetInput(budget.toString());
                  setOpenBudgetModal(true);
                }}
                className="flex-1 sm:flex-initial px-3 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition duration-200 cursor-pointer shadow-md shadow-purple-600/20"
              >
                Update Budget
              </button>
              <button
                onClick={() => setOpen(true)}
                className="flex-1 sm:flex-initial px-3 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition duration-200 cursor-pointer shadow-md shadow-blue-500/20"
              >
                + Add Expense
              </button>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

  {/* CARD */}
  <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] border border-white/10 overflow-hidden animate-fadeInUp animation-delay-100">

  {/* 🔥 CONTENT */}
  <div className="relative z-10">
    <p className="text-white/60 text-xs">{dateParam ? "Spent on this Day" : "Total Spent"}</p>

    <h3 className="text-2xl font-semibold mt-1 text-white">
      ₹{total}
    </h3>

    <p className="text-green-400 text-xs mt-1">
      ↑ 1 dynamic
    </p>
  </div>

  {/* 🔥 ICON BOX */}
  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 backdrop-blur-md">
    
    {/* Wallet Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-indigo-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5m0 0h-6m6 0a2 2 0 100-4h-6a2 2 0 100 4" 
      />
    </svg>

  </div>

  {/* 🔥 WAVE LINE (BOTTOM GRAPH) */}
  <svg
    className="absolute bottom-0 left-0 w-full h-20"
    viewBox="0 0 300 80"
    preserveAspectRatio="none"
  >
    <path
      d="M0,60 C40,40 80,80 120,60 C160,40 200,70 240,55 C270,45 300,60 300,60 L300,80 L0,80 Z"
      fill="url(#waveGradient)"
      opacity="0.1"
    />
    <defs>
      <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </svg>

</div>

  <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#022c22] border border-white/10 overflow-hidden animate-fadeInUp animation-delay-200">

  {/* CONTENT */}
  <div className="relative z-10">
    <p className="text-white/60 text-xs">Monthly Budget</p>

    <h3 className="text-2xl font-semibold mt-1 text-white">
      ₹{budget}
    </h3>

    <p className={`${budget - monthlyTotal >= 0 ? 'text-green-400' : 'text-red-400'} text-xs mt-1 font-medium`}>
      {budget - monthlyTotal >= 0 ? `₹${budget - monthlyTotal} remaining` : `₹${Math.abs(budget - monthlyTotal)} over limit`}
    </p>
  </div>

  {/* ICON BOX */}
  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-white/10 backdrop-blur-md">
    
    <svg
      className="w-6 h-6 text-green-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M8 7V3M16 7V3M4 11h16M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
    </svg>

  </div>

  {/* SAME WAVE */}
  <svg
  className="absolute bottom-0 left-0 w-full h-20"
  viewBox="0 0 1440 120"
  preserveAspectRatio="none"
>
  <path
    d="M0,80 
       C200,40 400,120 600,80 
       C800,40 1000,120 1200,80 
       C1300,60 1400,80 1440,80 
       L1440,120 L0,120 Z"
    fill="url(#waveGreen)"
    opacity="0.1"
  />
  <defs>
    <linearGradient id="waveGreen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#22c55e" />
      <stop offset="100%" stopColor="#10b981" />
    </linearGradient>
  </defs>
</svg>

</div>

 <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#3f1d0f] to-[#1c1917] border border-white/10 overflow-hidden animate-fadeInUp animation-delay-300">

  {/* CONTENT */}
  <div className="relative z-10">
    <p className="text-white/60 text-xs">Transactions</p>

    <h3 className="text-2xl font-semibold mt-1 text-white">
      {displayExpenses.length}
    </h3>

    <p className="text-green-400 text-xs mt-1">
      ↑ 1 dynamic
    </p>
  </div>

  {/* ICON BOX */}
  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-white/10 backdrop-blur-md">
    
    <svg
      className="w-6 h-6 text-orange-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M4 7h12M4 7l4-4M4 7l4 4M20 17H8m12 0l-4-4m4 4l-4 4"/>
    </svg>

  </div>

  {/* SAME WAVE */}
  <svg
  className="absolute bottom-0 left-0 w-full h-20"
  viewBox="0 0 1440 120"
  preserveAspectRatio="none"
>
  <path
    d="M0,80 
       C200,40 400,120 600,80 
       C800,40 1000,120 1200,80 
       C1300,60 1400,80 1440,80 
       L1440,120 L0,120 Z"
    fill="url(#waveOrange)"
    opacity="0.1"
  />
  <defs>
    <linearGradient id="waveOrange" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#f59e0b" />
      <stop offset="100%" stopColor="#fb923c" />
    </linearGradient>
  </defs>
</svg>

</div>

</div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">

  {/* 🔥 LEFT - RECENT EXPENSES */}
  <div className="p-4 h-[300px] flex flex-col rounded-xl bg-white/5 border border-white/10 animate-fadeInUp animation-delay-300">

    <div className="flex justify-between items-center mb-2 shrink-0">
      <h3 className="text-sm font-medium">Recent Expenses</h3>
      <span className="text-blue-400 text-xs cursor-pointer">View All</span>
    </div>

    <div className="flex-1 overflow-y-auto pr-1 space-y-3">
      {displayExpenses.slice(0, 10).map((exp, i) => {
        const itemDelay = Math.min(i * 45, 360);
        return (
          <div
            key={i}
            className="flex justify-between items-center border-b border-white/5 pb-3 last:border-none animate-fadeInUp"
            style={{ animationDelay: `${itemDelay}ms` }}
          >

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${getCategoryStyle(exp.category)}`}>
              {getCategoryIcon(exp.category)}
            </div>

            <div>
              <p className="text-sm font-medium">{exp.title}</p>
              <p className="text-[11px] text-white/40">
                {exp.category}
                {exp.subCategory && exp.subCategory !== exp.title ? ` • ${exp.subCategory}` : ""}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium">₹{exp.amount}</p>
            <p className="text-[11px] text-white/40">
              {exp.date
                ? new Date(exp.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })
                : new Date().toLocaleDateString()}
            </p>
          </div>

        </div>
      );
      })}
    </div>
  </div>


  {/* 🔥 CENTER - SPENDING CHART */}
  <div className="p-5 h-[300px] rounded-xl bg-white/5 border border-white/10 flex flex-col animate-fadeInUp animation-delay-400">

    <h3 className="text-sm font-medium mb-3">Spending by Category</h3>

    <div className="flex-1 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {categoryData.map((entry, index) => (
              <linearGradient key={index} id={`grad-${index}`}>
                <stop offset="0%" stopColor={entry.color} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={categoryData}
            dataKey="value"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            isAnimationActive={true}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={index}
                fill={`url(#grad-${index})`}
                onClick={() => {
                  const params: Record<string, string> = { category: entry.name };
                  if (dateParam) params.date = dateParam;
                  const queryString = new URLSearchParams(params).toString();
                  navigate(`/update_expense?${queryString}`);
                }}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-[11px]">Total</p>
          <h3 className="text-base font-semibold">₹{total}</h3>
        </div>
      </div>
    </div>

  </div>


  {/* 🔥 RIGHT - TOP CATEGORIES */}
  <div className="p-5 h-[300px] rounded-xl bg-white/5 border border-white/10 flex flex-col animate-fadeInUp animation-delay-400">

    <div className="flex justify-between items-center mb-3">
      <h3 className="text-sm font-medium">Top Categories</h3>
      <span className="text-blue-400 text-xs cursor-pointer">View All</span>
    </div>

    <div className="flex-1 overflow-y-auto space-y-4 pr-1">

      {["Food", "Travel", "Grocery", "Shopping", "Bills", "Entertainment", "Other"].map((cat) => {
        const found = categoryData.find((c) => c.name === cat);
        const value = found ? found.value : 0;
        const percent = total ? ((value / total) * 100).toFixed(0) : 0;

        return (
          <div
            key={cat}
            onClick={() => {
              const params: Record<string, string> = { category: cat };
              if (dateParam) params.date = dateParam;
              const queryString = new URLSearchParams(params).toString();
              navigate(`/update_expense?${queryString}`);
            }}
            className="group cursor-pointer hover:bg-white/5 p-1 rounded-xl transition-all duration-200"
          >
            <div className="flex justify-between text-sm mb-1">

              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${getCategoryStyle(cat)}`}>
                  {getCategoryIcon(cat)}
                </div>
                <span>{cat}</span>
              </div>

              <div className="text-white/60 text-xs">
                ₹{value} • {percent}%
              </div>

            </div>

            <div className="w-full h-1 bg-white/10 rounded-full">
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: `${percent}%`,
                  background: getCategoryColor(cat),
                }}
              />
            </div>
          </div>
        );
      })}
        </div>
  </div>

          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

  {/* LEFT - TREND */}
  <div className="lg:col-span-2 p-5 rounded-xl bg-white/5 border border-white/10 animate-fadeInUp animation-delay-500">

    <div className="flex justify-between mb-4">
      <div>
        <h3 className="text-sm font-medium">Spending Trend</h3>
        <p className="text-[11px] text-white/40">Last 7 days</p>
      </div>
      <div className="text-xs bg-white/10 px-3 py-1 rounded-md">
        Last 7 Days
      </div>
    </div>

    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
  <LineChart
    data={getLast7DaysData()}
  >

    {/* ✅ GRID */}
    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />

    {/* ✅ X AXIS (DAYS) */}
    <XAxis 
      dataKey="day" 
      tick={{ fill: "#9ca3af", fontSize: 12 }} 
      axisLine={false}
      tickLine={false}
    />

    {/* ✅ Y AXIS (₹ VALUES) */}
    <YAxis 
      tick={{ fill: "#9ca3af", fontSize: 12 }}
      axisLine={false}
      tickLine={false}
    />

    {/* ✅ LINE */}
    <Line 
      type="monotone" 
      dataKey="value" 
      stroke="#8b5cf6" 
      strokeWidth={2.5}
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
      isAnimationActive={true}
      animationDuration={1500}
      animationEasing="ease-in-out"
    />

    {/* ✅ TOOLTIP */}
    <Tooltip 
      contentStyle={{ background: "#0f172a", border: "none" }}
    />

  </LineChart>
</ResponsiveContainer>
    </div>

  </div>

  {/* RIGHT */}
  <div className="flex flex-col gap-5 animate-fadeInUp animation-delay-500">

    {/* Budget */}
    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
      <h3 className="text-sm mb-2">Monthly Budget</h3>
      <p className="text-lg font-medium text-white">₹{monthlyTotal} / ₹{budget}</p>

      <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-2 ${monthlyTotal > budget ? "bg-red-500" : "bg-green-500"} rounded-full transition-all duration-300`}
          style={{ width: `${Math.min((monthlyTotal / budget) * 100, 100)}%` }}
        />
      </div>
    </div>

    {/* Insight */}
    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
      <h3 className="text-sm mb-2">Insight</h3>
      <p className="text-sm text-white/70">
        You spent more on{" "}
        <span className="text-purple-400">
          {[...categoryData].sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
        </span>
      </p>
    </div>

  </div>

</div>

        </div>
      </div>

      {/* MODAL */}
      {open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

    {/* MODAL */}
    <div className="w-full max-w-[380px] mx-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-200 animate-fadeIn">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Add Expense
          </h3>
          <p className="text-xs text-gray-500">
            Track your spending smartly 💸
          </p>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>

      {/* AMOUNT */}
      <div className="mb-4">
        <input
          value={amount}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || /^\d*\.?\d*$/.test(val)) {
              setAmount(val);
            }
          }}
          autoFocus
          placeholder="₹ Enter amount"
          className="w-full p-3 text-lg font-medium bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* QUICK SELECT */}
        <div className="flex gap-2 mt-2">
          {[100, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val.toString())}
              className="px-3 py-1 text-xs bg-gray-100 rounded-md hover:bg-blue-100 transition"
            >
              ₹{val}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Select Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.label}
              onClick={() => handleCategoryChange(cat.label)}
              className={`px-3 py-1 text-xs rounded-full transition duration-200 cursor-pointer
                ${
                  category === cat.label
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-blue-100 text-gray-700"
                }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUBCATEGORY */}
      {category && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">Select Subcategory</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {(subcategoriesMap[category] || []).map((sub) => (
              <button
                type="button"
                key={sub}
                onClick={() => {
                  setSubCategory(sub);
                  setIsCustomSelected(false);
                }}
                className={`px-3 py-1 text-xs rounded-full transition duration-200 cursor-pointer ${
                  subCategory === sub && !isCustomSelected
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 hover:bg-purple-100 text-gray-700"
                }`}
              >
                {sub}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setSubCategory("");
                setIsCustomSelected(true);
              }}
              className={`px-3 py-1 text-xs rounded-full transition duration-200 cursor-pointer ${
                isCustomSelected
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 hover:bg-purple-100 text-gray-700"
              }`}
            >
              + Add Custom
            </button>
          </div>

          {isCustomSelected && (
            <input
              type="text"
              value={customSubCategory}
              onChange={(e) => setCustomSubCategory(e.target.value)}
              placeholder="Enter custom subcategory"
              className="w-full mt-2 p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
              autoFocus
            />
          )}
        </div>
      )}

      {/* DATE */}
      <div className="mb-4">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#3b82f6',
              borderRadius: 8,
            },
          }}
        >
          <DatePicker
            value={date ? dayjs(date) : null}
            disabledDate={(current) => current && current > dayjs().endOf('day')}
            onChange={(dateVal) => {
              const val = dateVal ? dateVal.format("YYYY-MM-DD") : "";
              setDate(val);
            }}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
            format="YYYY-MM-DD"
            allowClear={false}
          />
        </ConfigProvider>
      </div>

      {/* NOTE */}
      <div className="mb-4">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="📝 Add note (optional)"
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center mt-5">

        <button
          onClick={() => setOpen(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-[1.05] transition-all shadow-md"
        >
          Save Expense
        </button>

      </div>

    </div>
  </div>
)}

      {/* UPDATE BUDGET MODAL */}
      {openBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-[380px] mx-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-200 animate-fadeIn">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Update Budget
                </h3>
                <p className="text-xs text-gray-500">
                  Set your monthly spending limit 🎯
                </p>
              </div>
              <button
                onClick={() => setOpenBudgetModal(false)}
                className="text-gray-400 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
            </div>

            {/* BUDGET INPUT */}
            <div className="mb-6">
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                autoFocus
                placeholder="₹ Enter budget limit"
                className="w-full p-3 text-lg font-medium bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setOpenBudgetModal(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const val = Number(budgetInput);
                  if (isNaN(val) || val <= 0) {
                    alert("Please enter a valid budget amount");
                    return;
                  }
                  setBudget(val);
                  localStorage.setItem("budget", val.toString());
                  setOpenBudgetModal(false);
                }}
                className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:scale-[1.05] transition-all shadow-md"
              >
                Save Budget
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;