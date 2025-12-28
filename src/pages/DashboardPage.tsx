import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Calendar,
  Activity
} from "lucide-react";
import { format, subDays, startOfWeek, startOfMonth, endOfDay } from "date-fns";

type DateFilter = "today" | "yesterday" | "weekly" | "monthly" | "custom";

const baseStats = {
  users: 12847,
  products: 3456,
  orders: 8923,
  revenue: 2847563
};

const multipliers: Record<DateFilter, number> = {
  today: 0.035,
  yesterday: 0.032,
  weekly: 0.25,
  monthly: 1,
  custom: 0.15
};

const DashboardPage = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("monthly");
  const [showCustom, setShowCustom] = useState(false);

  const stats = useMemo(() => {
    const mult = multipliers[dateFilter];
    return {
      users: Math.floor(baseStats.users * mult),
      products: baseStats.products,
      orders: Math.floor(baseStats.orders * mult),
      revenue: Math.floor(baseStats.revenue * mult)
    };
  }, [dateFilter]);

  const getDateRange = () => {
    const today = new Date();
    switch (dateFilter) {
      case "today":
        return format(today, "MMM dd, yyyy");
      case "yesterday":
        return format(subDays(today, 1), "MMM dd, yyyy");
      case "weekly":
        return `${format(startOfWeek(today), "MMM dd")} - ${format(today, "MMM dd, yyyy")}`;
      case "monthly":
        return `${format(startOfMonth(today), "MMM dd")} - ${format(today, "MMM dd, yyyy")}`;
      case "custom":
        return "Custom Range";
      default:
        return "";
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.users.toLocaleString(),
      icon: Users,
      trend: "+12.5%",
      color: "from-neon-cyan to-neon-blue"
    },
    {
      title: "Total Products",
      value: stats.products.toLocaleString(),
      icon: Package,
      trend: "+5.2%",
      color: "from-neon-purple to-neon-pink"
    },
    {
      title: "Total Orders",
      value: stats.orders.toLocaleString(),
      icon: ShoppingCart,
      trend: "+18.7%",
      color: "from-neon-cyan to-neon-purple"
    },
    {
      title: "Total Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      trend: "+24.3%",
      color: "from-neon-pink to-neon-purple"
    }
  ];

  const filterButtons: { label: string; value: DateFilter }[] = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Custom", value: "custom" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-wider gradient-text">Analytics Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              System Status: <span className="text-primary">Operational</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{getDateRange()}</span>
          </div>
        </div>

        <div className="cyber-line" />

        {/* Date Filters */}
        <div className="flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {filterButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={dateFilter === btn.value ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter(btn.value)}
            >
              {btn.label}
            </Button>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          {statCards.map((stat, index) => (
            <Card 
              key={stat.title} 
              variant="stat"
              className="group animate-fade-in overflow-hidden"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Gradient top border */}
              <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-muted-foreground font-normal">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                    <stat.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold tracking-wider neon-text">
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-primary text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
              </CardContent>

              {/* Animated scan line */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
              </div>
            </Card>
          ))}
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-bold tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { action: "New user registered", time: "2 min ago", type: "user" },
                { action: "Order #8923 completed", time: "15 min ago", type: "order" },
                { action: "Product inventory updated", time: "1 hour ago", type: "product" },
                { action: "Payment received $2,450", time: "2 hours ago", type: "payment" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm">{item.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-bold tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Performance Metrics
            </h3>
            <div className="space-y-4">
              {[
                { label: "Server Uptime", value: 99.9, color: "bg-primary" },
                { label: "API Response Time", value: 87, color: "bg-secondary" },
                { label: "Customer Satisfaction", value: 94, color: "bg-neon-pink" },
                { label: "System Efficiency", value: 91, color: "bg-neon-blue" },
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.label}</span>
                    <span className="text-primary">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
