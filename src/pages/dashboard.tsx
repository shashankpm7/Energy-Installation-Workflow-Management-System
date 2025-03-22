import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', installations: 4000 },
  { name: 'Feb', installations: 3000 },
  { name: 'Mar', installations: 2000 },
  { name: 'Apr', installations: 2780 },
  { name: 'May', installations: 1890 },
  { name: 'Jun', installations: 2390 },
];

const stats = [
  {
    name: 'Active Installations',
    value: '24',
    icon: Activity,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    name: 'Completed',
    value: '156',
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    name: 'Pending',
    value: '12',
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
  },
  {
    name: 'Issues',
    value: '3',
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className={cn('p-2 rounded-lg', stat.bg)}>
                  <stat.icon className={cn('w-6 h-6', stat.color)} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installation Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="installations"
                  stroke="#3b82f6"
                  fill="#93c5fd"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}