import { useQuery } from "@tanstack/react-query";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { User } from "../../types";

const FETCH_URL = "https://6752d87bf3754fcea7b9cea0.mockapi.io/users";
const REFETCH_INTERVAL = 60000;

const CHART_CONFIG = {
  gradient: {
    id: "colorCount",
    color: "#EBBA1E",
    opacity: { start: 0.8, end: 0 },
  },
  tooltip: {
    style: {
      backgroundColor: "white",
      border: "none",
      borderRadius: "0.5rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
  },
  axis: {
    xInterval: 4,
    fontSize: "12px",
    angle: -45,
  },
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(FETCH_URL);
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
};

const createTimeIntervals = () => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  return Array.from({ length: 61 }, (_, i) => ({
    time: new Date(oneHourAgo.getTime() + i * 60 * 1000),
    newUser: 0,
  }));
};

const formatIntervalTime = (date: Date): string => {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const Stats = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["recent-users"],
    queryFn: fetchUsers,
    refetchInterval: REFETCH_INTERVAL,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center p-4">
        An error occurred while loading the stats
      </p>
    );
  }

  const intervals = createTimeIntervals();
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  users?.forEach((user) => {
    const createdAt = new Date(user.customCreatedAt || user.createdAt);
    if (createdAt >= oneHourAgo && createdAt <= now && user.customCreatedAt) {
      const intervalIndex = Math.floor(
        (createdAt.getTime() - oneHourAgo.getTime()) / 60000
      );
      if (intervalIndex >= 0 && intervalIndex < intervals.length) {
        intervals[intervalIndex].newUser++;
      }
    }
  });

  const chartData = intervals.map((interval) => ({
    time: formatIntervalTime(interval.time),
    newUser: interval.newUser,
  }));

  return (
    <>
      <h1 className="font-bold text-xl text-[#EBBA1E] uppercase">Stats</h1>
      <h2 className="font-bold mb-6 text-2xl text-white uppercase">
        New users (last hour)
      </h2>
      <div className="bg-white/90 rounded-lg pl-0 pr-6 py-6 shadow-lg">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id={CHART_CONFIG.gradient.id}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={CHART_CONFIG.gradient.color}
                    stopOpacity={CHART_CONFIG.gradient.opacity.start}
                  />
                  <stop
                    offset="95%"
                    stopColor={CHART_CONFIG.gradient.color}
                    stopOpacity={CHART_CONFIG.gradient.opacity.end}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                interval={CHART_CONFIG.axis.xInterval}
                angle={CHART_CONFIG.axis.angle}
                textAnchor="end"
                tick={{ fontSize: CHART_CONFIG.axis.fontSize }}
              />
              <YAxis allowDecimals={false} domain={[0, "auto"]} />
              <Tooltip
                contentStyle={CHART_CONFIG.tooltip.style}
                formatter={(value: number) => [`${value}`, "New users"]}
                labelFormatter={() => ""}
              />
              <Area
                type="monotone"
                dataKey="newUser"
                stroke={CHART_CONFIG.gradient.color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#${CHART_CONFIG.gradient.id})`}
                dot={false}
                activeDot={{ r: 6, fill: CHART_CONFIG.gradient.color }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Stats;
