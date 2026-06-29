import { useState, useEffect, useMemo } from "react";
import { getExpenses, updateExpense, deleteExpense } from "../services/api";
import { useSearchParams } from "react-router-dom";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import { useAuth } from "../context/AuthContext";
import { DatePicker, ConfigProvider, theme, Select, Table } from "antd";
import dayjs from "dayjs";

type Expense = {
  _id?: string;
  id?: string;
  title: string;
  amount: number;
  category: string;
  subCategory?: string;
  date?: string;
};

const UpdateExpense = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const categoryParam = searchParams.get("category");

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit Modal states
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSubCategory, setEditSubCategory] = useState("");
  const [editCustomSubCategory, setEditCustomSubCategory] = useState("");
  const [editIsCustomSelected, setEditIsCustomSelected] = useState(false);
  const [editNote, setEditNote] = useState("");
  const [editDate, setEditDate] = useState("");

  // Delete Confirmation Modal states
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = [
    { label: "Food", icon: "🍔" },
    { label: "Travel", icon: "🚗" },
    { label: "Grocery", icon: "🛒" },
    { label: "Shopping", icon: "🛍" },
    { label: "Bills", icon: "⚡" },
    { label: "Entertainment", icon: "🎬" },
    { label: "Other", icon: "💸" }
  ];

  const dynamicCategories = useMemo(() => {
    const uniqueNames = new Set<string>();
    
    // Add default categories
    categories.forEach(c => uniqueNames.add(c.label));
    
    // Add categories dynamically found in fetched expenses
    expenses.forEach(exp => {
      if (exp.category) {
        uniqueNames.add(exp.category);
      }
    });

    return Array.from(uniqueNames).map(catName => {
      const known = categories.find(c => c.label === catName);
      return {
        label: catName,
        icon: known ? known.icon : "🏷️"
      };
    });
  }, [expenses]);

  const subcategoriesMap: Record<string, string[]> = {
    Food: ["Zomato", "Swiggy", "Dining"],
    Travel: ["Ola", "Uber", "Rapido", "Metro", "Bus", "Train", "Flight"],
    Grocery: ["Zepto", "Blinkit", "BigBasket"],
    Shopping: ["Amazon", "Flipkart", "Myntra"],
    Bills: ["Electricity", "Water", "Internet", "Rent"],
    Entertainment: ["Movies", "Games", "OTT"],
    Other: []
  };

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

  const columns = [
    {
      title: "Expense / Detail",
      key: "title",
      render: (_: any, exp: Expense) => (
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${getCategoryStyle(exp.category)}`}>
            {getCategoryIcon(exp.category)}
          </div>
          <div>
            <p className="font-semibold text-white">{exp.title}</p>
            {exp.subCategory && exp.subCategory !== exp.title && (
              <p className="text-xs text-white/40 mt-0.5">{exp.subCategory}</p>
            )}
          </div>
        </div>
      )
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["sm"] as const,
      render: (cat: string) => (
        <span
          onClick={() => {
            setCategoryFilter(cat);
            setSearchParams(prev => {
              const next = new URLSearchParams(prev);
              next.set("category", cat);
              return next;
            });
          }}
          className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold cursor-pointer hover:opacity-80 transition-all ${getCategoryStyle(cat)}`}
        >
          {cat}
        </span>
      )
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date?: string) => date
        ? new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })
        : "N/A"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt: number) => (
        <span className="font-bold text-white text-sm sm:text-base">
          ₹{amt}
        </span>
      )
    },
    {
      title: "Actions",
      key: "actions",
      align: "right" as const,
      render: (_: any, exp: Expense) => {
        const id = exp._id || exp.id;
        return (
          <div className="flex justify-end gap-2">
            {/* Edit Button */}
            <button
              onClick={() => handleEditClick(exp)}
              className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-colors cursor-pointer"
              title="Edit Expense"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            {/* Delete Button */}
            <button
              onClick={() => handleDeleteClick(id)}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
              title="Delete Expense"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (dateParam) {
      setDateFilter(dateParam);
    } else {
      const todayStr = new Date().toISOString().split("T")[0];
      setDateFilter(todayStr);
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set("date", todayStr);
        return next;
      });
    }
  }, [dateParam]);

  useEffect(() => {
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    } else {
      setCategoryFilter("All");
    }
  }, [categoryParam]);

  useEffect(() => {
    applyFilters();
  }, [expenses, dateFilter, categoryFilter, searchQuery]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await getExpenses();
      if (Array.isArray(data)) {
        setExpenses(data);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let temp = [...expenses];

    // Filter by Date - always filter by date, defaulting to today's date if empty
    const activeDate = dateFilter || new Date().toISOString().split("T")[0];
    temp = temp.filter(exp => exp.date && exp.date.split("T")[0] === activeDate);

    // Filter by Category
    if (categoryFilter !== "All") {
      temp = temp.filter(exp => exp.category === categoryFilter);
    }

    // Filter by Search (Title / Subcategory)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter(
        exp =>
          exp.title.toLowerCase().includes(query) ||
          (exp.subCategory && exp.subCategory.toLowerCase().includes(query))
      );
    }

    setFilteredExpenses(temp);
  };

  const handleEditClick = (exp: Expense) => {
    const id = exp._id || exp.id || "";
    setEditId(id);
    setEditAmount(exp.amount.toString());
    setEditCategory(exp.category);
    
    // Check if the subcategory is in standard list
    const subList = subcategoriesMap[exp.category] || [];
    const isCustom = exp.subCategory && !subList.includes(exp.subCategory);
    
    if (isCustom) {
      setEditSubCategory("");
      setEditCustomSubCategory(exp.subCategory || "");
      setEditIsCustomSelected(true);
    } else {
      setEditSubCategory(exp.subCategory || "");
      setEditCustomSubCategory("");
      setEditIsCustomSelected(false);
    }
    
    setEditNote(exp.title || "");
    setEditDate(exp.date ? exp.date.split("T")[0] : new Date().toISOString().split("T")[0]);
    setEditOpen(true);
  };

  const handleCategoryChange = (catLabel: string) => {
    setEditCategory(catLabel);
    setEditSubCategory("");
    setEditCustomSubCategory("");
    setEditIsCustomSelected(false);
  };

  const handleUpdate = async () => {
    if (!editAmount || !editCategory) {
      alert("Please enter amount and category.");
      return;
    }

    const subCatToSave = editIsCustomSelected ? editCustomSubCategory.trim() : editSubCategory;
    if (!subCatToSave) {
      alert("Please select or enter a subcategory");
      return;
    }

    const titleToSave = editNote.trim() || subCatToSave;

    try {
      await updateExpense(editId, {
        title: titleToSave,
        amount: Number(editAmount),
        category: editCategory,
        subCategory: subCatToSave,
        date: editDate,
      });

      setEditOpen(false);
      fetchExpenses();
    } catch (err) {
      console.error("Error updating expense:", err);
      alert("Failed to update expense");
    }
  };

  const handleDeleteClick = (id?: string) => {
    if (!id) return;
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteExpense(deleteId);
      setDeleteOpen(false);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert("Failed to delete expense");
    } finally {
      setIsDeleting(false);
    }
  };

  const clearFilters = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    setSearchParams({ date: todayStr });
    setCategoryFilter("All");
    setSearchQuery("");
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
    <div className="flex min-h-screen text-white bg-gradient-to-br from-[#0a0f1f] via-[#0b1f2a] to-[#120041]">
      {/* SIDEBAR */}
      <DashboardSidebar expenses={expenses} />

      {/* MAIN CONTAINER */}
      <div className="flex-1 min-w-0 px-4 py-6 md:px-6 max-w-6xl mx-auto space-y-6 transition-all duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Manage Expenses
              </h1>
              <p className="text-white/50 text-xs mt-1">
                Update details or permanently delete your records
              </p>
            </div>
          </div>
        </div>

        {/* FILTER CONTROLS */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white/5 border border-white/10 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          
          {/* Calendar Date Filter */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-white/60">Filter by Date</label>
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                  colorPrimary: '#3b82f6',
                  borderRadius: 12,
                },
              }}
            >
              <DatePicker
                value={dateFilter ? dayjs(dateFilter) : null}
                onChange={(date) => {
                  const val = date ? date.format("YYYY-MM-DD") : "";
                  setDateFilter(val);
                  setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    if (val) {
                      next.set("date", val);
                    } else {
                      next.delete("date");
                    }
                    return next;
                  });
                }}
                className="w-full h-[41px] rounded-xl text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                format="YYYY-MM-DD"
                allowClear={false}
              />
            </ConfigProvider>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-white/60">Category</label>
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                  colorPrimary: '#3b82f6',
                  borderRadius: 12,
                },
              }}
            >
              <Select
                value={categoryFilter}
                onChange={(val) => {
                  setCategoryFilter(val);
                  setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    if (val && val !== "All") {
                      next.set("category", val);
                    } else {
                      next.delete("category");
                    }
                    return next;
                  });
                }}
                className="w-full h-[41px]"
                options={[
                  { value: 'All', label: 'All Categories' },
                  ...dynamicCategories.map(cat => ({ value: cat.label, label: cat.label }))
                ]}
              />
            </ConfigProvider>
          </div>

          {/* Search Query Filter */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-white/60">Search note/subcategory</label>
            <input
              type="text"
              placeholder="e.g. Zomato, Rent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white"
            />
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="w-full p-2.5 bg-white/10 hover:bg-white/20 transition rounded-xl text-sm font-semibold cursor-pointer text-white/80 hover:text-white"
          >
            Clear Filters
          </button>
        </div>

        {/* EXPENSES LISTING */}
        <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-md font-semibold">Expenses ({filteredExpenses.length})</h3>
            {filteredExpenses.length > 0 && (
              <span className="text-xs text-white/50">
                Showing {filteredExpenses.length} transactions
              </span>
            )}
          </div>

          {loading ? (
            <div className="divide-y divide-white/5 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="py-4 px-3 sm:px-6 flex items-center justify-between gap-4">
                  {/* Left: Category Icon & Titles */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white/10 shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="h-4 bg-white/10 rounded-md w-3/4 max-w-[150px]" />
                      <div className="h-3 bg-white/10 rounded-md w-1/2 max-w-[100px]" />
                    </div>
                  </div>
                  {/* Middle: Category Pill (Desktop only) */}
                  <div className="hidden sm:block w-20 h-6 bg-white/10 rounded-full" />
                  {/* Middle: Date */}
                  <div className="w-20 h-4 bg-white/10 rounded-md shrink-0" />
                  {/* Right: Amount */}
                  <div className="w-16 h-5 bg-white/10 rounded-md shrink-0" />
                  {/* Actions */}
                  <div className="w-16 h-8 bg-white/10 rounded-lg shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                  colorPrimary: '#3b82f6',
                  colorBgContainer: 'transparent',
                  borderRadius: 12,
                },
                components: {
                  Table: {
                    headerBg: 'rgba(255, 255, 255, 0.02)',
                    headerColor: 'rgba(255, 255, 255, 0.4)',
                    headerBorderRadius: 0,
                    rowHoverBg: 'rgba(255, 255, 255, 0.02)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }
              }}
            >
              <Table
                dataSource={filteredExpenses}
                columns={columns}
                rowKey={(record) => record._id || record.id || ''}
                pagination={false}
                onRow={(_, index) => {
                  const delay = index !== undefined ? Math.min(index * 45, 360) : 0;
                  return {
                    className: "animate-fadeInUp text-xs sm:text-sm",
                    style: { animationDelay: `${delay}ms` }
                  } as React.HTMLAttributes<any>;
                }}
                locale={{
                  emptyText: (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 text-2xl mb-4">
                        📂
                      </div>
                      <h3 className="text-lg font-semibold text-white/80">No expenses found</h3>
                      <p className="text-sm text-white/40 mt-1 max-w-xs">
                        No records match your selected date and filters.
                      </p>
                    </div>
                  )
                }}
              />
            </ConfigProvider>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-[380px] mx-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-200 animate-fadeIn text-gray-800">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Edit Expense</h3>
                <p className="text-xs text-gray-500">Update details of this transaction</p>
              </div>
              <button
                onClick={() => setEditOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <input
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                placeholder="₹ Enter amount"
                className="w-full p-3 text-lg font-semibold bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              {/* Quick selectors */}
              <div className="flex gap-2 mt-2">
                {[100, 500, 1000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setEditAmount(val.toString())}
                    className="px-3 py-1 text-xs bg-gray-100 rounded-md hover:bg-blue-100 transition cursor-pointer text-gray-600"
                  >
                    ₹{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Category selection */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {dynamicCategories.map((cat) => (
                  <button
                    type="button"
                    key={cat.label}
                    onClick={() => handleCategoryChange(cat.label)}
                    className={`px-3 py-1 text-xs rounded-full transition duration-200 cursor-pointer
                      ${
                        editCategory === cat.label
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-blue-100 text-gray-700"
                      }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategory selection */}
            {editCategory && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subcategory</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(subcategoriesMap[editCategory] || []).map((sub) => (
                    <button
                      type="button"
                      key={sub}
                      onClick={() => {
                        setEditSubCategory(sub);
                        setEditIsCustomSelected(false);
                      }}
                      className={`px-3 py-1 text-xs rounded-full transition duration-200 cursor-pointer ${
                        editSubCategory === sub && !editIsCustomSelected
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
                      setEditSubCategory("");
                      setEditIsCustomSelected(true);
                    }}
                    className={`px-3 py-1 text-xs rounded-full transition duration-200 cursor-pointer ${
                      editIsCustomSelected
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 hover:bg-purple-100 text-gray-700"
                    }`}
                  >
                    + Add Custom
                  </button>
                </div>

                {editIsCustomSelected && (
                  <input
                    type="text"
                    value={editCustomSubCategory}
                    onChange={(e) => setEditCustomSubCategory(e.target.value)}
                    placeholder="Enter custom subcategory"
                    className="w-full mt-2 p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                  />
                )}
              </div>
            )}

            {/* Date picker */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Date</p>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#3b82f6',
                    borderRadius: 8,
                  },
                }}
              >
                <DatePicker
                  value={editDate ? dayjs(editDate) : null}
                  disabledDate={(current) => current && current > dayjs().endOf('day')}
                  onChange={(date) => {
                    const val = date ? date.format("YYYY-MM-DD") : "";
                    setEditDate(val);
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
                  format="YYYY-MM-DD"
                  allowClear={false}
                />
              </ConfigProvider>
            </div>

            {/* Note */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Note (Optional)</p>
              <input
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                placeholder="📝 Add note"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => setEditOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-[1.03] transition-all shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#0e1626] border border-white/10 rounded-2xl p-6 shadow-2xl animate-fadeIn text-white">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Warning Icon Container */}
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-bold">Delete Expense?</h3>
                <p className="text-sm text-white/60 mt-1">
                  Are you sure you want to delete this expense? This action cannot be undone.
                </p>
              </div>

              <div className="flex w-full gap-3 pt-2">
                <button
                  onClick={() => !isDeleting && setDeleteOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin h-4.5 w-4.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateExpense;