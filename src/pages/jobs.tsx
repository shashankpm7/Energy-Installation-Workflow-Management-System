import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, CheckCircle, AlertTriangle, Search, Filter, Plus } from 'lucide-react';
import { socket } from '@/lib/socket';
import { cn } from '@/lib/utils';

interface Job {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  customer: string;
  date: string;
  progress: number;
  location: string;
  type: string;
  assignee: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Solar Panel Installation - Residential',
    status: 'in_progress',
    customer: 'John Smith',
    date: '2024-03-15',
    progress: 65,
    location: '123 Main St, Springfield',
    type: 'Installation',
    assignee: 'Mike Johnson',
  },
  {
    id: '2',
    title: 'Wind Turbine Maintenance',
    status: 'pending',
    customer: 'Sarah Johnson',
    date: '2024-03-16',
    progress: 0,
    location: '456 Oak Ave, Riverside',
    type: 'Maintenance',
    assignee: 'David Wilson',
  },
  {
    id: '3',
    title: 'Battery System Setup',
    status: 'completed',
    customer: 'Michael Brown',
    date: '2024-03-14',
    progress: 100,
    location: '789 Pine Rd, Hillside',
    type: 'Installation',
    assignee: 'Emma Davis',
  },
  {
    id: '4',
    title: 'Solar Farm Inspection',
    status: 'in_progress',
    customer: 'Green Energy Corp',
    date: '2024-03-15',
    progress: 45,
    location: '321 Solar Way, Sunnyville',
    type: 'Inspection',
    assignee: 'James Wilson',
  },
  {
    id: '5',
    title: 'Emergency Generator Repair',
    status: 'failed',
    customer: 'City Hospital',
    date: '2024-03-15',
    progress: 20,
    location: '567 Hospital Dr, Metropolis',
    type: 'Repair',
    assignee: 'Robert Taylor',
  },
];

const statusIcons = {
  pending: Clock,
  in_progress: Clock,
  completed: CheckCircle,
  failed: AlertTriangle,
};

const statusColors = {
  pending: 'text-yellow-600',
  in_progress: 'text-blue-600',
  completed: 'text-green-600',
  failed: 'text-red-600',
};

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    socket.on('job_update', (updatedJob: Job) => {
      setJobs(currentJobs =>
        currentJobs.map(job =>
          job.id === updatedJob.id ? updatedJob : job
        )
      );
    });

    return () => {
      socket.off('job_update');
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Installation Jobs</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          New Job
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          <Filter className="h-5 w-5" />
          Filter
        </button>
      </div>

      <div className="grid gap-4">
        {jobs
          .filter(job => 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.customer.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((job) => {
            const StatusIcon = statusIcons[job.status];
            return (
              <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div
                    className="absolute h-1 bg-blue-600 transition-all duration-500"
                    style={{ width: `${job.progress}%` }}
                  />
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium">{job.title}</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                          <p>Customer: {job.customer}</p>
                          <p>Location: {job.location}</p>
                          <p>Type: {job.type}</p>
                          <p>Assignee: {job.assignee}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className={cn('h-5 w-5', statusColors[job.status])}
                        />
                        <span
                          className={cn(
                            'text-sm font-medium capitalize',
                            statusColors[job.status]
                          )}
                        >
                          {job.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Date: {job.date}
                      </span>
                      <span className="font-medium">{job.progress}% Complete</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}