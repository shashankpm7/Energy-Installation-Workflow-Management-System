import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Play, Pause, RefreshCw, Check, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutomationTask {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'completed' | 'failed';
  lastRun: string;
  nextRun: string;
  description: string;
  successCount: number;
  failureCount: number;
}

const automationTasks: AutomationTask[] = [
  {
    id: '1',
    name: 'Daily System Health Check',
    status: 'running',
    lastRun: '2024-03-15 08:00 AM',
    nextRun: '2024-03-16 08:00 AM',
    description: 'Performs system diagnostics and health checks on all installations',
    successCount: 145,
    failureCount: 2,
  },
  {
    id: '2',
    name: 'Performance Data Collection',
    status: 'completed',
    lastRun: '2024-03-15 07:30 AM',
    nextRun: '2024-03-15 07:30 PM',
    description: 'Collects and analyzes performance metrics from all active installations',
    successCount: 89,
    failureCount: 0,
  },
  {
    id: '3',
    name: 'Maintenance Schedule Generator',
    status: 'stopped',
    lastRun: '2024-03-14 11:00 PM',
    nextRun: '-',
    description: 'Generates optimal maintenance schedules based on system performance',
    successCount: 56,
    failureCount: 1,
  },
];

const statusColors = {
  running: 'text-blue-600',
  stopped: 'text-yellow-600',
  completed: 'text-green-600',
  failed: 'text-red-600',
};

const statusIcons = {
  running: RefreshCw,
  stopped: Pause,
  completed: Check,
  failed: X,
};

export function Automation() {
  const [tasks] = useState<AutomationTask[]>(automationTasks);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Automation</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Play className="h-4 w-4" />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">289</h3>
              <p className="text-blue-600 dark:text-blue-400">Total Tasks Run</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">98.5%</h3>
              <p className="text-green-600 dark:text-green-400">Success Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">5</h3>
              <p className="text-purple-600 dark:text-purple-400">Active Tasks</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Automation Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const StatusIcon = statusIcons[task.status];
              return (
                <div
                  key={task.id}
                  className="p-4 rounded-lg border bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{task.name}</h3>
                        <StatusIcon className={cn('h-5 w-5', statusColors[task.status])} />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Last Run</p>
                      <p className="font-medium">{task.lastRun}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Next Run</p>
                      <p className="font-medium">{task.nextRun}</p>
                    </div>
                    <div>
                      <p className="text-green-600">Success: {task.successCount}</p>
                    </div>
                    <div>
                      <p className="text-red-600">Failures: {task.failureCount}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}