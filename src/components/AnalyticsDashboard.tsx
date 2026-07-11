"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Globe, Users, TrendingUp, Eye, Clock, MapPin } from "lucide-react";

interface CountryStat {
  country: string;
  countryCode: string;
  count: number;
}

interface DailyStat {
  date: string;
  count: number;
}

interface PageStat {
  page: string;
  count: number;
}

interface RecentVisit {
  country: string;
  city: string;
  page: string;
  timestamp: string;
}

interface AnalyticsData {
  totalVisits: number;
  todayVisits: number;
  countryStats: CountryStat[];
  dailyStats: DailyStat[];
  pageStats: PageStat[];
  recentVisits: RecentVisit[];
}

const COLORS = ["#60a5fa", "#22d3ee", "#818cf8", "#34d399", "#f472b6", "#fb923c", "#facc15", "#a78bfa"];

function StatCard({
  icon,
  label,
  value,
  sub,
  color = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}
        style={{ background: `color-mix(in srgb, var(--${color}) 15%, transparent)`, color: `var(--${color})` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted font-label-caps uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-on-background font-h2">{value}</p>
        {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-outline-variant rounded-xl px-3 py-2 text-xs">
        <p className="text-muted mb-1">{label}</p>
        <p className="text-primary font-bold">{payload[0].value} visits</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const adminSecret = sessionStorage.getItem("admin_secret") || localStorage.getItem("admin_secret") || "";

    fetch("/api/analytics", {
      headers: { "x-admin-secret": adminSecret },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or server error");
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          setData(json.data);
        } else {
          setError("Failed to load analytics");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-muted">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Loading analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted">
        <Globe size={40} className="opacity-30" />
        <p className="text-sm">{error}</p>
        <p className="text-xs text-muted/60">Make sure ADMIN_SECRET is correct</p>
      </div>
    );
  }

  if (!data) return null;

  // Format daily dates to short form
  const chartData = data.dailyStats.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count: d.count,
  }));

  return (
    <div className="space-y-6 py-2">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Eye size={20} />} label="Total Visits" value={data.totalVisits.toLocaleString()} sub="All time" />
        <StatCard icon={<TrendingUp size={20} />} label="Today" value={data.todayVisits} sub="Unique page views" color="secondary" />
        <StatCard icon={<Globe size={20} />} label="Countries" value={data.countryStats.length} sub="Last 30 days" color="outline" />
        <StatCard icon={<Users size={20} />} label="Top Page" value={data.pageStats[0]?.count ?? 0} sub={data.pageStats[0]?.page ?? "/"} color="primary" />
      </div>

      {/* Daily visits chart */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-on-background mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" />
          Daily Visits — Last 14 Days
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" opacity={0.4} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#visitGradient)"
              dot={{ fill: "var(--primary)", r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Country + Page stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Countries */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-on-background mb-4 flex items-center gap-2">
            <MapPin size={16} className="text-secondary" />
            Top Countries
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.countryStats.slice(0, 8)} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" opacity={0.4} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="country"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {data.countryStats.slice(0, 8).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pages */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-on-background mb-4 flex items-center gap-2">
            <Eye size={16} className="text-primary" />
            Top Pages
          </h3>
          <div className="space-y-3">
            {data.pageStats.slice(0, 6).map((p, i) => {
              const max = data.pageStats[0]?.count || 1;
              const pct = Math.round((p.count / max) * 100);
              return (
                <div key={p.page}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-background font-medium truncate max-w-[180px]">{p.page}</span>
                    <span className="text-muted">{p.count} visits</span>
                  </div>
                  <div className="h-1.5 bg-outline-variant/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent visits */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-on-background mb-4 flex items-center gap-2">
          <Clock size={16} className="text-muted" />
          Recent Visits
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted font-label-caps uppercase tracking-wider border-b border-outline-variant/30">
                <th className="text-left pb-3 pr-4">Country</th>
                <th className="text-left pb-3 pr-4">City</th>
                <th className="text-left pb-3 pr-4">Page</th>
                <th className="text-left pb-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {data.recentVisits.map((v, i) => (
                <tr key={i} className="hover:bg-primary/5 transition-colors">
                  <td className="py-2.5 pr-4 text-on-background">{v.country}</td>
                  <td className="py-2.5 pr-4 text-muted">{v.city}</td>
                  <td className="py-2.5 pr-4 text-primary font-mono truncate max-w-[120px]">{v.page}</td>
                  <td className="py-2.5 text-muted">
                    {new Date(v.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                    {" "}
                    {new Date(v.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.recentVisits.length === 0 && (
            <p className="text-center text-muted text-xs py-8">No visits recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
