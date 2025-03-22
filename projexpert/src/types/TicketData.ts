// types.ts
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Project {
    id: number;
    name: string;
}

export interface Comment {
    id: number;
    content: string;
    userId: number;
    createdAt: string;
    commenter: { name: string,avatar:any };
}

export interface Attachment {
    id: number;
    fileName: string;
    fileType: string;
    fileSize: number;
    uploadedBy: number;
    createdAt: string;
    uploader: { name: string };
}

export interface HistoryItem {
    id: number;
    fieldChanged: string;
    oldValue: string;
    newValue: string;
    changedBy: number;
    createdAt: string;
    actor: { name: string };
}

export interface Ticket {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: string;
    status: string;
    raisedBy: number;
    assignedTo: number | null;
    projectId: number;
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
    resolution?: string;
    raiser: User;
    assignee: User | null;
    project: Project;
    comments: Comment[];
    attachments: Attachment[];
    history: HistoryItem[];
}

