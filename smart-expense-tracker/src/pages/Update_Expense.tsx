import { useState, useEffect } from "react";
import { getExpenses, updateExpense, deleteExpense } from "../services/api";
import { useSearchParams } from "react-router-dom";
import DashboardSidebar from "../components/layout/DashboardSidebar";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date");

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

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

  const categories = [
    { label: "Food", icon: "🍔" },
    { label: "Travel", icon: "🚗" },
    { label: "Grocery", icon: "🛒" },
    { label: "Shopping", icon: "🛍" },
    { label: "Bills", icon: "⚡" },
    { label: "Entertainment", icon: "🎬" },
    { label: "Other", icon: "💸" }
  ];

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

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (dateParam) {
      setDateFilter(dateParam);
    } else {
      setDateFilter("");
    }
  }, [dateParam]);

  useEffect(() => {
    applyFilters();
  }, [expenses, dateFilter, categoryFilter, searchQuery]);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      if (Array.isArray(data)) {
        setExpenses(data);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const applyFilters = () => {
    let temp = [...expenses];

    // Filter by Date
    if (dateFilter) {
      temp = temp.filter(exp => exp.date && exp.date.split("T")[0] === dateFilter);
    }

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

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (err) {
        console.error("Error deleting expense:", err);
        alert("Failed to delete expense");
      }
    }
  };

  const clearFilters = () => {
    setSearchParams({});
    setDateFilter("");
    setCategoryFilter("All");
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-[#0a0f1f] via-[#0b1f2a] to-[#120041]">
      {/* SIDEBAR */}
      <DashboardSidebar expenses={expenses} />

      {/* MAIN CONTAINER */}
      <div className="flex-1 px-6 py-6 max-w-6xl mx-auto space-y-6 transition-all duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Manage Expenses
            </h1>
            <p className="text-white/50 text-xs mt-1">
              Update details or permanently delete your records
            </p>
          </div>
        </div>

        {/* FILTER CONTROLS */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Calendar Date Filter */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-white/60">Filter by Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                const val = e.target.value;
                setDateFilter(val);
                if (val) {
                  setSearchParams({ date: val });
                } else {
                  setSearchParams({});
                }
              }}
              className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white cursor-pointer"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-white/60">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2.5 bg-[#0e1626] border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat.label} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
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

          {filteredExpenses.length === 0 ? (
            <div className="p-12 text-center text-white/40">
              <span className="text-3xl block mb-2">🔍</span>
              No expenses match your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 font-semibold bg-white/[0.02]">
                    <th className="py-4 px-6">Expense / Detail</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredExpenses.map((exp) => {
                    const id = exp._id || exp.id;
                    return (
                      <tr key={id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-6">
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
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(exp.category)}`}>
                            {exp.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-white/70">
                          {exp.date
                            ? new Date(exp.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                              })
                            : "N/A"}
                        </td>
                        <td className="py-4 px-6 font-bold text-white text-base">
                          ₹{exp.amount}
                        </td>
                        <td className="py-4 px-6 text-right">
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
                              onClick={() => handleDelete(id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
                              title="Delete Expense"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-[380px] bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-200 animate-fadeIn text-gray-800">
            
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
                {categories.map((cat) => (
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
              <input
                type="date"
                value={editDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
              />
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
    </div>
  );
};

export default UpdateExpense;