import React from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsWidget() {
  const [counter, setCounter] = React.useState(0);
  const targetValue = 279;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < targetValue) {
          return Math.min(prev + 3, targetValue);
        }
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Total Mass Loss Since 2002",
      value: `${counter} Gt`,
      trend: "down",
      color: "text-red-400"
    },
    {
      label: "Sea Level Rise",
      value: "+3.4 mm/yr",
      trend: "up",
      color: "text-orange-400"
    },
    {
      label: "Ocean Temperature Anomaly",
      value: "+0.8°C",
      trend: "up",
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#0f1419] rounded-xl p-4 border border-cyan-500/20 holographic-border"
        >
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-gray-400">{stat.label}</p>
            {stat.trend === "up" ? (
              <TrendingUp className={`w-4 h-4 ${stat.color}`} />
            ) : (
              <TrendingDown className={`w-4 h-4 ${stat.color}`} />
            )}
          </div>
          <div className={`heading-font text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}