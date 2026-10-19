import { apiClient, handleMockOrApiCall } from './api';

const MOCK_STUDY_PLANS = [
  {
    id: 1,
    subjectName: 'Distributed Systems',
    topicName: 'Consensus Algorithms (Raft & Paxos)',
    date: '2026-08-11',
    startTime: '09:00 AM',
    durationMinutes: 90,
    priority: 'HIGH',
    status: 'SCHEDULED',
    sessionType: 'DEEP_WORK',
  },
  {
    id: 2,
    subjectName: 'Machine Learning',
    topicName: 'Gradient Descent Optimization',
    date: '2026-08-11',
    startTime: '02:00 PM',
    durationMinutes: 60,
    priority: 'HIGH',
    status: 'SCHEDULED',
    sessionType: 'REVISION',
  },
  {
    id: 3,
    subjectName: 'Compiler Design',
    topicName: 'LALR Parsing Tables & AST Generation',
    date: '2026-08-12',
    startTime: '10:30 AM',
    durationMinutes: 120,
    priority: 'MEDIUM',
    status: 'SCHEDULED',
    sessionType: 'PRACTICE',
  },
  {
    id: 4,
    subjectName: 'Cloud Computing',
    topicName: 'Kubernetes Pod Scheduling & Services',
    date: '2026-08-12',
    startTime: '04:00 PM',
    durationMinutes: 45,
    priority: 'LOW',
    status: 'SCHEDULED',
    sessionType: 'FLASHCARDS',
  },
];

export const plannerService = {
  getStudyPlans: async () => {
    return handleMockOrApiCall(
      () => apiClient.get('/planner'),
      MOCK_STUDY_PLANS
    );
  },

  createStudyPlan: async (planData) => {
    const newPlan = { id: Date.now(), ...planData, status: 'SCHEDULED' };
    return handleMockOrApiCall(
      () => apiClient.post('/planner', planData),
      newPlan
    );
  },

  updatePlanStatus: async (planId, status) => {
    return handleMockOrApiCall(
      () => apiClient.patch(`/planner/${planId}`, { status }),
      { id: planId, status }
    );
  },
};
