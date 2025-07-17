import React, { useState, useEffect } from 'react';
import { Search, Activity, Database, Users, AlertCircle, CheckCircle, Clock, Phone, MessageSquare, Brain, Target, TrendingUp, Zap, ArrowRight, Eye, ChevronRight } from 'lucide-react';
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

interface ActivityItem {
  id: string;
  type: 'system' | 'human' | 'analysis';
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  timestamp: string;
  icon: React.ReactNode;
}

export function InvestigationDashboard() {
  const [query, setQuery] = useState('');
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(null);
  const [selectedInvestigation, setSelectedInvestigation] = useState<Investigation | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
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

  const [liveActivity, setLiveActivity] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'system',
      title: 'MES Database Query',
      description: 'Found: Line 3 stopped from 10:00 AM to 2:00 PM',
      status: 'completed',
      timestamp: '2 min ago',
      icon: <Database className="w-4 h-4" />
    },
    {
      id: '2',
      type: 'human',
      title: 'Jake (Line 3 Supervisor)',
      description: '"We ran out of raw materials around 10 AM"',
      status: 'completed',
      timestamp: '1 min ago',
      icon: <Phone className="w-4 h-4" />
    },
    {
      id: '3',
      type: 'system',
      title: 'Inventory System Query',
      description: 'Materials show as available in stock',
      status: 'completed',
      timestamp: '30 sec ago',
      icon: <Database className="w-4 h-4" />
    },
    {
      id: '4',
      type: 'human',
      title: 'Warehouse Manager',
      description: 'Currently calling...',
      status: 'active',
      timestamp: 'now',
      icon: <Phone className="w-4 h-4" />
    }
  ]);

  // Simulate live investigation progress
  useEffect(() => {
    if (activeInvestigation) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeInvestigation]);

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
    setCurrentStep(0);
  };

  const handleViewDetails = (investigation: Investigation) => {
    setSelectedInvestigation(investigation);
  };

  const investigationSteps = [
    { title: 'Analyzing Question', icon: <Brain className="w-5 h-5" />, color: 'blue' },
    { title: 'Querying Systems', icon: <Database className="w-5 h-5" />, color: 'purple' },
    { title: 'Contacting People', icon: <Users className="w-5 h-5" />, color: 'green' },
    { title: 'Building Report', icon: <Target className="w-5 h-5" />, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Sentinel AI</h1>
                <p className="text-sm text-slate-600 font-medium">Investigative Intelligence System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                All Systems Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Investigation Input */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-slate-900">Ask Sentinel Anything</CardTitle>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Ask any business question and watch as Sentinel investigates across systems and people in real-time
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Input
                  placeholder="e.g., Why was production down 30% today?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStartInvestigation()}
                  className="text-lg h-14 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pl-12 pr-4 rounded-xl shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
              <Button 
                onClick={handleStartInvestigation}
                disabled={!query.trim()}
                className="h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Zap className="w-5 h-5 mr-2" />
                Investigate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Investigation */}
        {activeInvestigation && (
          <div className="space-y-6">
            {/* Investigation Header */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Live Investigation</h2>
                      <p className="text-blue-100">Gathering intelligence in real-time</p>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                    <Activity className="w-3 h-3 mr-1 animate-pulse" />
                    Active
                  </Badge>
                </div>
                <p className="text-lg font-medium text-blue-50 mb-4">{activeInvestigation.question}</p>
                
                {/* Investigation Steps */}
                <div className="grid grid-cols-4 gap-4">
                  {investigationSteps.map((step, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                      index <= currentStep ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
                        index === currentStep ? 'bg-white text-blue-600 animate-pulse' : 
                        index < currentStep ? 'bg-green-500 text-white' : 'bg-white/20 text-white/60'
                      }`}>
                        {index < currentStep ? <CheckCircle className="w-4 h-4" /> : step.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium transition-all duration-500 ${
                          index <= currentStep ? 'text-white' : 'text-white/60'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Stream */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg font-bold text-slate-900">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Live Activity Stream</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {liveActivity.map((activity, index) => (
                      <div key={activity.id} className={`flex items-start space-x-3 p-4 rounded-xl transition-all duration-300 ${
                        activity.status === 'active' ? 'bg-blue-50 border border-blue-200' :
                        activity.status === 'completed' ? 'bg-green-50 border border-green-200' :
                        'bg-slate-50 border border-slate-200'
                      }`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          activity.status === 'active' ? 'bg-blue-600 text-white animate-pulse' :
                          activity.status === 'completed' ? 'bg-green-600 text-white' :
                          'bg-slate-400 text-white'
                        }`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-slate-900 text-sm">{activity.title}</h4>
                            <span className="text-xs text-slate-500">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-slate-600">{activity.description}</p>
                          {activity.status === 'active' && (
                            <div className="mt-2">
                              <div className="w-full bg-blue-200 rounded-full h-1">
                                <div className="bg-blue-600 h-1 rounded-full animate-pulse" style={{width: '60%'}}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emerging Insights */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg font-bold text-slate-900">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>Emerging Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-1">Pattern Detected</h4>
                          <p className="text-sm text-amber-700">Production stopped due to material shortage, but inventory shows materials available</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-1">Root Cause Emerging</h4>
                          <p className="text-sm text-blue-700">Investigating delivery failure between warehouse and production line</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <Target className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-purple-800 mb-1">Next Action</h4>
                          <p className="text-sm text-purple-700">Calling warehouse manager to understand delivery process breakdown</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Investigation Details Modal */}
        {selectedInvestigation && (
          <Card className="border-0 shadow-2xl bg-white">
            <CardHeader className="pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">Investigation Report</CardTitle>
                  <p className="text-slate-600 text-lg">{selectedInvestigation.question}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedInvestigation(null)}
                  className="rounded-lg"
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* Investigation Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                      <span className="font-semibold text-blue-800">Duration</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">
                      {selectedInvestigation.status === 'completed' ? '2h 15m' : 'In Progress'}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Database className="w-6 h-6 text-purple-600" />
                      <span className="font-semibold text-purple-800">System Queries</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{selectedInvestigation.systemQueries}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-green-800">Human Contacts</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{selectedInvestigation.humanContacts}</p>
                  </div>
                </div>

                {/* Detailed Timeline */}
                {selectedInvestigation.status === 'completed' && selectedInvestigation.id === '1' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900">Investigation Timeline</h3>
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                      <div className="space-y-6">
                        {[
                          { time: '08:00', title: 'Investigation Started', desc: 'Received question: "Why was production down 30% today?"', color: 'blue' },
                          { time: '08:02', title: 'MES Database Query', desc: 'Found: Line 3 stopped from 10:00 AM to 2:00 PM', color: 'purple' },
                          { time: '08:05', title: 'Human Contact', desc: 'Called Jake (Line 3 Supervisor): "We ran out of raw materials"', color: 'green' },
                          { time: '08:07', title: 'Inventory System Query', desc: 'Found: Materials show as available in stock', color: 'purple' },
                          { time: '08:10', title: 'Human Contact', desc: 'Called Warehouse Manager: "Forklift broke, couldn\'t deliver materials"', color: 'green' },
                          { time: '08:15', title: 'Root Cause Identified', desc: 'Maintenance records show forklift PM was overdue by 3 weeks', color: 'red' }
                        ].map((item, index) => (
                          <div key={index} className="relative flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                              item.color === 'blue' ? 'bg-blue-600' :
                              item.color === 'purple' ? 'bg-purple-600' :
                              item.color === 'green' ? 'bg-green-600' :
                              'bg-red-600'
                            }`}>
                              {item.color === 'blue' && <Search className="w-5 h-5 text-white" />}
                              {item.color === 'purple' && <Database className="w-5 h-5 text-white" />}
                              {item.color === 'green' && <Phone className="w-5 h-5 text-white" />}
                              {item.color === 'red' && <AlertCircle className="w-5 h-5 text-white" />}
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-sm font-bold text-slate-500">{item.time}</span>
                                <h4 className="font-bold text-slate-900">{item.title}</h4>
                              </div>
                              <p className="text-slate-600">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Impact Analysis */}
                {selectedInvestigation.status === 'completed' && selectedInvestigation.id === '1' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900">Impact Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl">
                        <h4 className="font-bold text-red-800 mb-4 text-lg">Financial Impact</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-red-700">Lost Production Value</span>
                            <span className="font-bold text-red-900">$47,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-red-700">Downtime Duration</span>
                            <span className="font-bold text-red-900">4 hours</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-red-700">Overtime Costs</span>
                            <span className="font-bold text-red-900">$8,500</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl">
                        <h4 className="font-bold text-amber-800 mb-4 text-lg">Operational Impact</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-amber-700">Units Behind Schedule</span>
                            <span className="font-bold text-amber-900">73 units</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-700">At-Risk Deliveries</span>
                            <span className="font-bold text-amber-900">2 customers</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-700">Team Morale</span>
                            <span className="font-bold text-amber-900">Affected</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Items */}
                {selectedInvestigation.status === 'completed' && selectedInvestigation.id === '1' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900">Recommended Actions</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Implement preventive maintenance alerts', desc: 'Set up automated alerts 1 week before PM due dates', priority: 'High', color: 'red' },
                        { title: 'Create backup material delivery plan', desc: 'Establish manual delivery procedures when equipment fails', priority: 'Medium', color: 'amber' },
                        { title: 'Improve communication protocols', desc: 'Ensure equipment failures are immediately escalated', priority: 'Medium', color: 'amber' }
                      ].map((action, index) => (
                        <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-900">{action.title}</h4>
                            <Badge variant="outline" className={`${
                              action.color === 'red' ? 'text-red-700 border-red-300 bg-red-50' : 'text-amber-700 border-amber-300 bg-amber-50'
                            }`}>
                              {action.priority} Priority
                            </Badge>
                          </div>
                          <p className="text-slate-600">{action.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Investigation History */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900">Recent Investigations</CardTitle>
            <p className="text-slate-600">Track all your investigations and their outcomes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investigations.map((investigation) => (
                <div key={investigation.id} className="group p-6 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-3 text-lg group-hover:text-blue-600 transition-colors">{investigation.question}</h3>
                      <div className="flex items-center space-x-6 text-sm text-slate-600 mb-4">
                        <span className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{investigation.startTime}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Database className="w-4 h-4" />
                          <span>{investigation.systemQueries} queries</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{investigation.humanContacts} contacts</span>
                        </span>
                      </div>
                      {investigation.findings.length > 0 && (
                        <div className="space-y-2">
                          {investigation.findings.slice(0, 2).map((finding, index) => (
                            <p key={index} className="text-sm text-slate-700 flex items-start space-x-2">
                              <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                              <span>{finding}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={investigation.status === 'completed' ? 'default' : 'secondary'}
                        className={`px-3 py-1 ${investigation.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}
                      >
                        {investigation.status === 'completed' ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Activity className="w-3 h-3 mr-1 animate-pulse" />
                            Active
                          </>
                        )}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(investigation)}
                        className="group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
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