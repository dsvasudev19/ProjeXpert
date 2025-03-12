export interface Milestone {
    title: string;
    description: string;
    dueDate: string;
    completionDate?: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
    progress: number;
    deliverables: string;
    clientApprovalRequired: boolean;
    clientApproved: boolean;
    clientApprovalDate?: string;
    paymentPercentage: number;
  }


export interface ProjectFormData {
    // Core Project Information
    projectName: string;
    description: string;
    projectType: string;
    clientId: string;
    status: 'Not Started' | 'In Progress' | 'Completed'; // Enum-like restriction
    priority: 'Low' | 'Medium' | 'High';
  
    // Timeline Information
    startDate: string; // Consider Date type if handling as Date object
    targetEndDate: string;
    estimatedDuration: string;
  
    // Resource Management
    projectManager: number; // Assuming it's an ID, otherwise change to string if it's a name
    teamMembers: string; // Consider using an array if handling multiple members
    departments: string[]; // Array of department names or IDs
  
    // Financial Information
    budget: string; // Consider changing to number if handling currency calculations
    billingRate: string;
    revenueProjection: string;
  
    // Scope Information
    projectGoals: string;
    deliverables: string;
    requirements: string;
    constraints: string;
    acceptanceCriteria: string;
  
    // GitHub Repository Settings
    createGithubRepo: boolean;
    repoName: string;
    repoVisibility: 'private' | 'public';
    addCollaborators: boolean;
    collaborators: string; // Consider using an array for multiple collaborators

    milestones: Milestone[];
  }
  