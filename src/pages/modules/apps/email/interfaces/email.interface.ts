import type { IQueryParams } from "@/interfaces/queryparam";

interface IAttachment {
  id: string;
  emailId: string;
  filename: string;
  size: number;
  type: string;
  url: string;
}

export interface IEmail {
  id: number;
  userId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  hasAttachments: boolean;
  attachments: IAttachment[];
  labels: string[];
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEmailMessage {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  starred?: boolean;
  unread?: boolean;
  hasAttachment?: boolean;
}

export interface IMailFolder {
  name: string;
  count?: number;
  active?: boolean;
}

export interface IMailLabel {
  name: string;
  color: string;
}

export interface IEmailQueryParams extends IQueryParams {
  view?: string;
  labels?: string;
  isRead?: boolean;
  isStarred?: boolean;
  isImportant?: boolean;
  hasAttachments?: boolean;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
}

export type EmailList = IEmail[];
