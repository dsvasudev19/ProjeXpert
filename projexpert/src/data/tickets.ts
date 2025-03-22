// data.ts

import { Ticket } from "../types/TicketData";


export const tickets: Ticket[] = [
    {
        id: 1,
        title: "Login authentication fails intermittently",
        description: "Users report being unable to login during peak hours. Errors occur randomly.",
        category: "Bug",
        priority: "High",
        status: "In Progress",
        raisedBy: 12,
        assignedTo: 5,
        projectId: 3,
        createdAt: "2025-03-15T10:45:23",
        updatedAt: "2025-03-21T14:23:10",
        raiser: { id: 12, name: "Sarah Johnson", email: "sjohnson@example.com" },
        assignee: { id: 5, name: "Michael Chen", email: "mchen@example.com" },
        project: { id: 3, name: "Customer Portal" },
        comments: [
            { id: 101, content: "Investigating server logs to identify pattern", userId: 5, createdAt: "2025-03-18T09:30:12", commenter: { name: "Michael Chen" ,avatar:""} },
            { id: 102, content: "Found potential race condition in authentication middleware", userId: 5, createdAt: "2025-03-20T16:45:32", commenter: { name: "Michael Chen",avatar:"" } }
        ],
        attachments: [
            { id: 201, fileName: "error_logs.txt", fileType: "text/plain", fileSize: 45600, uploadedBy: 12, createdAt: "2025-03-15T10:48:23", uploader: { name: "Sarah Johnson" } }
        ],
        history: [
            { id: 301, fieldChanged: "status", oldValue: "Open", newValue: "In Progress", changedBy: 5, createdAt: "2025-03-16T08:30:45", actor: { name: "Michael Chen" } },
            { id: 302, fieldChanged: "priority", oldValue: "Medium", newValue: "High", changedBy: 5, createdAt: "2025-03-17T11:20:18", actor: { name: "Michael Chen" } }
        ]
    },
    {
        id: 2,
        title: "Add export to PDF feature for reports",
        description: "Users need to export their analytics reports to PDF format for sharing",
        category: "Feature Request",
        priority: "Medium",
        status: "Open",
        raisedBy: 8,
        assignedTo: null,
        projectId: 2,
        createdAt: "2025-03-20T15:22:45",
        updatedAt: "2025-03-20T15:22:45",
        raiser: { id: 8, name: "David Wilson", email: "dwilson@example.com" },
        assignee: null,
        project: { id: 2, name: "Analytics Dashboard" },
        comments: [],
        attachments: [],
        history: []
    },
    {
        id: 3,
        title: "Incorrect billing amounts for premium tier",
        description: "Premium customers are being charged standard tier prices since last update",
        category: "Billing",
        priority: "Critical",
        status: "Open",
        raisedBy: 14,
        assignedTo: 7,
        projectId: 1,
        createdAt: "2025-03-21T09:15:30",
        updatedAt: "2025-03-21T12:32:15",
        raiser: { id: 14, name: "Alex Rodriguez", email: "arodriguez@example.com" },
        assignee: { id: 7, name: "Jennifer Lee", email: "jlee@example.com" },
        project: { id: 1, name: "Billing System" },
        comments: [
            { id: 103, content: "Looking into payment processing logs now", userId: 7, createdAt: "2025-03-21T10:15:30", commenter: { name: "Jennifer Lee" ,avatar:""} }
        ],
        attachments: [
            { id: 202, fileName: "invoice_screenshot.png", fileType: "image/png", fileSize: 283400, uploadedBy: 14, createdAt: "2025-03-21T09:18:45", uploader: { name: "Alex Rodriguez" } }
        ],
        history: [
            { id: 303, fieldChanged: "assignedTo", oldValue: "null", newValue: "Jennifer Lee", changedBy: 2, createdAt: "2025-03-21T09:30:22", actor: { name: "Admin User" } },
            { id: 304, fieldChanged: "priority", oldValue: "High", newValue: "Critical", changedBy: 7, createdAt: "2025-03-21T10:45:18", actor: { name: "Jennifer Lee" } }
        ]
    },
    {
        id: 4,
        title: "Mobile app crashes when uploading large images",
        description: "The app crashes consistently when uploading images larger than 5MB",
        category: "Bug",
        priority: "High",
        status: "Resolved",
        raisedBy: 10,
        assignedTo: 6,
        projectId: 4,
        createdAt: "2025-03-14T11:30:15",
        updatedAt: "2025-03-19T15:42:30",
        resolvedAt: "2025-03-19T15:42:30",
        resolution: "Added image compression and better error handling for large file uploads",
        raiser: { id: 10, name: "Emma Parker", email: "eparker@example.com" },
        assignee: { id: 6, name: "Robert Kim", email: "rkim@example.com" },
        project: { id: 4, name: "Mobile Application" },
        comments: [
            { id: 104, content: "Can you provide the device model and OS version?", userId: 6, createdAt: "2025-03-14T13:22:40", commenter: { name: "Robert Kim",avatar:"" } },
            { id: 105, content: "iPhone 14, iOS 18.2", userId: 10, createdAt: "2025-03-14T14:30:15", commenter: { name: "Emma Parker" ,avatar:""} },
            { id: 106, content: "Fix implemented, please update to latest version and test", userId: 6, createdAt: "2025-03-19T15:40:22", commenter: { name: "Robert Kim",avatar:"" } }
        ],
        attachments: [
            { id: 203, fileName: "crash_log.txt", fileType: "text/plain", fileSize: 18200, uploadedBy: 10, createdAt: "2025-03-14T11:35:42", uploader: { name: "Emma Parker" } },
            { id: 204, fileName: "fix_implementation.js", fileType: "application/javascript", fileSize: 5600, uploadedBy: 6, createdAt: "2025-03-19T15:38:20", uploader: { name: "Robert Kim" } }
        ],
        history: [
            { id: 305, fieldChanged: "status", oldValue: "Open", newValue: "In Progress", changedBy: 6, createdAt: "2025-03-14T13:20:10", actor: { name: "Robert Kim" } },
            { id: 306, fieldChanged: "status", oldValue: "In Progress", newValue: "Resolved", changedBy: 6, createdAt: "2025-03-19T15:42:30", actor: { name: "Robert Kim" } }
        ]
    }
];

export const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};