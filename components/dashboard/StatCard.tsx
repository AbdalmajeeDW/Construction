import { StatCardAdmin } from "@/types";
import { motion } from "framer-motion";

export default function StatCard({
  id,
  title,
  value,
  icon: Icon,
  linear,
  onClick
}: StatCardAdmin) {
  return (
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -5 }}
  className="group relative cursor-pointer bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
  onClick={onClick}
>
      <div className="relative p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div
            className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-linear-to-br ${linear} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </div>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
          {value}
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm font-medium">{title}</p>
      </div>
    </motion.div>
  );
}
