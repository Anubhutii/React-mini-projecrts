import {
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  Award,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

const getIcon = (category: string, size = 18) => {
  switch (category) {
    case "Graduation":
      return <GraduationCap size={size} />;
    case "Diploma":
      return <BookOpen size={size} />;
    case "Internship 1":
    case "Internship 2":
    case "Internship 3":
      return <BriefcaseBusiness size={size} />;
    case "Certifications":
      return <Award size={size} />;
    default:
      return <BookOpen size={size} />;
  }
};

const education = ["Graduation", "Diploma"];

const internships = [
  "Internship 1",
  "Internship 2",
//   
];

const certifications = ["Certifications"];

const Sidebar = ({
  categories,
  activeCategory,
  onSelect,
}: SidebarProps) => {
  const renderGroup = (title: string, items: string[]) => (
    <div className="mb-2">
      <h4 className="text-xs uppercase tracking-[3px] text-slate-500 mb-4">
        {title}
      </h4>

      <div className="space-y-1">
        {items.map((item) => {
          const active = activeCategory === item;

          return (
            <button
              key={item}
              onClick={() => onSelect(item)}
              className={`group w-full flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer
              ${
                active
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`transition ${
                    active
                      ? "text-cyan-400"
                      : "text-slate-500 group-hover:text-cyan-400"
                  }`}
                >
                  {getIcon(item, 18)}
                </div>

                <span className="font-medium">{item}</span>
              </div>

              <ChevronRight
                size={16}
                className={`transition ${
                  active
                    ? "translate-x-1 text-cyan-400"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-72 shrink-0">
      {/* Mobile Grid Card Selector (only visible below lg screens) */}
      <div className="lg:hidden w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 mb-0">
        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[3px] mb-3">
          Explore Journey
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelect(category)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-300 font-semibold text-xs cursor-pointer ${
                  active
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/5"
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-white/5 bg-white/5"
                }`}
              >
                <span className={active ? "text-cyan-400" : "text-slate-500"}>
                  {getIcon(category, 14)}
                </span>
                <span className="truncate">{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Vertical Sidebar Card (only visible on lg screens and above) */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 h-[580px] rounded-3xl border border-white/10 bg-[#0B1224]/80 backdrop-blur-xl p-6">
          <p className="text-cyan-400 uppercase tracking-[4px] text-xs">
            Workspace
          </p>

          <h2 className="text-2xl font-bold text-white mt-2 mb-6">
            My Journey
          </h2>

          <div className="h-[470px] overflow-y-auto pr-2 custom-scrollbar">
            {renderGroup("Education", education)}
            {renderGroup("Experience", internships)}
            {renderGroup("Achievements", certifications)}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;