import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { getExpenses } from "../../services/api";

type Expense = { id?: string; title: string; amount: number; category: string; subCategory?: string; date?: string };

interface DashboardSidebarProps {
  expenses?: Expense[];
}

const DashboardSidebar = ({ expenses: expensesProp }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ? new Date(dateParam) : null;

  // Local expenses for pages where prop is not passed (Analytics, Reports, etc.)
  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (!expensesProp) {
      const fetchLocal = async () => {
        try {
          const data = await getExpenses();
          if (Array.isArray(data)) {
            setLocalExpenses(data);
          }
        } catch (err) {
          console.error("Sidebar local fetch error:", err);
        }
      };
      fetchLocal();
    }
  }, [expensesProp]);

  useEffect(() => {
    const handleToggle = () => setMobileOpen(prev => !prev);
    const handleOpen = () => setMobileOpen(true);
    const handleClose = () => setMobileOpen(false);

    window.addEventListener("toggle-sidebar", handleToggle);
    window.addEventListener("open-sidebar", handleOpen);
    window.addEventListener("close-sidebar", handleClose);

    return () => {
      window.removeEventListener("toggle-sidebar", handleToggle);
      window.removeEventListener("open-sidebar", handleOpen);
      window.removeEventListener("close-sidebar", handleClose);
    };
  }, []);

  const expenses = expensesProp || localExpenses;

  // Build a Set of dates with expenses (format: YYYY-MM-DD local timezone)
  const activeDates = new Set(
    expenses
      .map((exp) => {
        if (!exp.date) return null;
        const d = new Date(exp.date);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
      .filter(Boolean)
  );

  const getStreak = () => {
    let streak = 0;
    const checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    const todayStr = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
    
    // Check yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;

    let currentCheck = checkDate;
    
    // If today is not in activeDates and yesterday is not in activeDates, streak is 0
    if (!activeDates.has(todayStr) && !activeDates.has(yesterdayStr)) {
      return 0;
    }

    // If today is not active but yesterday is, start checking from yesterday
    if (!activeDates.has(todayStr) && activeDates.has(yesterdayStr)) {
      currentCheck = yesterday;
    }

    // Loop backwards and count consecutive active days
    while (true) {
      const yr = currentCheck.getFullYear();
      const mo = currentCheck.getMonth();
      const dy = currentCheck.getDate();
      const dateKey = `${yr}-${mo}-${dy}`;

      if (activeDates.has(dateKey)) {
        streak++;
        // Move to previous day
        currentCheck = new Date(yr, mo, dy - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const totalDays = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Update Expense", path: "/update_expense" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>

      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`w-64 bg-[#0b1220]/95 md:bg-[#0b1220]/80 border-r border-white/10 px-4 py-5 md:pt-20 flex flex-col justify-between
        fixed inset-y-0 left-0 z-[200] md:z-10 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0
        backdrop-blur-xl md:backdrop-blur-none
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="relative">
          {/* Close Button inside Drawer on Mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden absolute top-2 right-2 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer"
            title="Close Menu"
          >
            ✕
          </button>

          <h1 className="text-md font-semibold mb-6 text-white pt-2 md:pt-0">💼 ExpenseAI</h1>

          <div className="space-y-2 text-sm">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false); // Close sidebar after selecting page
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition duration-200 text-sm font-medium cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

        {/* MINI CALENDAR */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-white/10 rounded-md transition text-white/60 hover:text-white cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs font-semibold text-white/90">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-white/10 rounded-md transition text-white/60 hover:text-white cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] text-white/40 font-semibold mb-2">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-x-1 gap-y-1 text-center text-xs">
            {Array.from({ length: startDay }).map((_, i) => (
              <span key={`empty-${i}`} className="h-7 w-7" />
            ))}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const isToday =
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();
              const isSelected = !!(selectedDate &&
                day === selectedDate.getDate() &&
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear());

              const cellDate = new Date(year, month, day);
              const todayStart = new Date();
              todayStart.setHours(0, 0, 0, 0);
              const isFuture = cellDate > todayStart;

              const hasExpense = activeDates.has(`${year}-${month}-${day}`);

              return (
                <button
                  key={day}
                  disabled={isFuture}
                  onClick={() => {
                    const monthStr = String(month + 1).padStart(2, '0');
                    const dayStr = String(day).padStart(2, '0');
                    const targetPath = (location.pathname === "/update_expense" || location.pathname === "/dashboard")
                      ? location.pathname
                      : "/dashboard";
                    navigate(`${targetPath}?date=${year}-${monthStr}-${dayStr}`);
                  }}
                  className={`h-7 w-7 flex items-center justify-center rounded-full mx-auto transition-all duration-200 ${
                    isFuture
                      ? "text-white/20 pointer-events-none"
                      : isSelected
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-md shadow-purple-500/20 scale-105 cursor-pointer"
                      : isToday
                      ? hasExpense
                        ? "bg-gradient-to-br from-purple-600/40 to-blue-600/40 text-purple-200 border border-purple-500 font-semibold cursor-pointer"
                        : "border border-purple-500 text-purple-400 font-semibold cursor-pointer"
                      : hasExpense
                      ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/20 font-medium hover:bg-white/10 cursor-pointer"
                      : "hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* STREAK WIDGET */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
            getStreak() > 0
              ? "bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/20 text-orange-400 shadow-[0_4px_20px_rgba(249,115,22,0.05)]"
              : "bg-white/5 border-white/10 text-white/40"
          }`}>
            <span className={`text-2xl transition-transform duration-500 ${getStreak() > 0 ? "animate-bounce" : ""}`}>
              🔥
            </span>
            <div className="text-left font-sans">
              {getStreak() > 0 ? (
                <>
                  <p className="text-xs font-bold text-orange-400">
                    {getStreak()} Day Streak!
                  </p>
                  <p className="text-[10px] text-white/50 mt-0.5 font-medium">
                    Habit is building. Keep going!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold text-white/60">
                    No active streak
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5">
                    Log an expense to start!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  </>
  );
};

export default DashboardSidebar;
