import React, { useState } from 'react';
import { Search, Activity, Database, Users, AlertCircle, CheckCircle, Clock, Phone, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Investigation {
  id: string;
  question: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  startTime: string;
  systemQueries: number;
  humanContacts: number;
  findings: string[];
}

export function InvestigationDashboard() {
  const [query, setQuery] = useState('');
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(null);
  const [investigations] = useState<Investigation[]>([
    {
      id: '1',
      question: 'Why was production down 30% today?',
      status: 'completed',
      progress: 100,
      startTime: '2 hours ago',
      systemQueries: 8,
      humanContacts: 4,
      findings: ['Root cause: Missed forklift preventive maintenance', 'Impact: $47,000 lost production', '73 units behind schedule']
    },
    {
      id: '2',
      question: 'Why did we lose the Johnson account?',
      status: 'active',
      progress: 65,
      startTime: '15 minutes ago',
      systemQueries: 5,
      humanContacts: 2,
      findings: ['3 unresolved support tickets found', 'Account manager interview in progress']
    }
  ]);

  const handleStartInvestigation = () => {
    if (!query.trim()) return;
    
    const newInvestigation: Investigation = {
      id: Date.now().toString(),
      question: query,
      status: 'active',
      progress: 0,
      startTime: 'Just now',
      systemQueries: 0,
      humanContacts: 0,
      findings: []
    };
    
    setActiveInvestigation(newInvestigation);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Sentinel AI Intelligence</h1>
                <p className="text-sm text-slate-600">Investigative AI System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                All Systems Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Investigation Input */}
        <Card className="mb-8 border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-slate-900">Start New Investigation</CardTitle>
            <p className="text-sm text-slate-600">Ask any business question and watch Sentinel investigate in real-time</p>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="e.g., Why was production down 30% today?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStartInvestigation()}
                  className="text-base h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button 
                onClick={handleStartInvestigation}
                disabled={!query.trim()}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <Search className="w-4 h-4 mr-2" />
                Investigate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Investigation */}
        {activeInvestigation && (
          <Card className="mb-8 border-0 shadow-lg bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-slate-900">Live Investigation</CardTitle>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Activity className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <p className="text-slate-600 font-medium">{activeInvestigation.question}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Investigation Progress</span>
                    <span className="text-sm text-slate-600">{activeInvestigation.progress}%</span>
                  </div>
                  <Progress value={activeInvestigation.progress} className="h-2" />
                </div>

                {/* Activity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* System Queries */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-slate-900">System Queries</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">MES Database</span>
                        </div>
                        <Badge variant="outline" className="text-green-700 border-green-200">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">Inventory System</span>
                        </div>
                        <Badge variant="outline" className="text-green-700 border-green-200">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-blue-600 animate-spin" />
                          <span className="text-sm text-slate-700">Maintenance Logs</span>
                        </div>
                        <Badge variant="outline" className="text-blue-700 border-blue-200">Querying</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Human Intelligence */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <h3 className="font-medium text-slate-900">Human Intelligence</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">Jake (Line 3 Supervisor)</span>
                        </div>
                        <Badge variant="outline" className="text-green-700 border-green-200">Completed</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-green-600 animate-pulse" />
                          <span className="text-sm text-slate-700">Warehouse Manager</span>
                        </div>
                        <Badge variant="outline" className="text-green-700 border-green-200">Calling</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-700">Maintenance Team</span>
                        </div>
                        <Badge variant="outline" className="text-slate-600 border-slate-200">Pending</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emerging Findings */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-medium text-slate-900">Emerging Picture</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">• Production stopped due to material shortage</p>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">• Materials were available but not delivered</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">• Following up on delivery failure cause...</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Investigation History */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-slate-900">Recent Investigations</CardTitle>
            <p className="text-sm text-slate-600">Track all your investigations and their outcomes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investigations.map((investigation) => (
                <div key={investigation.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 mb-2">{investigation.question}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{investigation.startTime}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Database className="w-4 h-4" />
                          <span>{investigation.systemQueries} queries</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{investigation.humanContacts} contacts</span>
                        </span>
                      </div>
                      {investigation.findings.length > 0 && (
                        <div className="space-y-1">
                          {investigation.findings.map((finding, index) => (
                            <p key={index} className="text-sm text-slate-700">• {finding}</p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={investigation.status === 'completed' ? 'default' : 'secondary'}
                        className={investigation.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                      >
                        {investigation.status === 'completed' ? 'Completed' : 'Active'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}