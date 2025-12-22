"use client";

import React from "react";
import {
  Paperclip,
  Search,
  Star,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  type EmailList,
  type IEmail,
  type IEmailMessage,
  type IEmailQueryParams,
  type IMailFolder,
  type IMailLabel,
} from "./interfaces/email.interface";
import { useEmailsQuery } from "./queries/email.query";
import Pagination from "@/components/app-pagination";

const mailFolders: IMailFolder[] = [
  { name: "Inbox", count: 24, active: true },
  { name: "Starred" },
  { name: "Sent" },
  { name: "Important" },
  { name: "Drafts", count: 30 },
  { name: "Trash" },
];

const mailLabels: IMailLabel[] = [
  { name: "Work", color: "bg-lime-500" },
  { name: "Family", color: "bg-orange-400" },
  { name: "Friends", color: "bg-blue-400" },
  { name: "Office", color: "bg-rose-500" },
];


function mapEmailsToMessages(emails: EmailList): IEmailMessage[] {
  return emails.map((email: IEmail) => ({
    id: email.id,
    sender: email.from,
    subject: email.subject,
    preview: email.body,
    time: new Date(email.timestamp ?? email.createdAt).toLocaleDateString(),
    starred: email.isStarred,
    unread: !email.isRead,
    hasAttachment: email.hasAttachments,
  }));
}

export default function EmailInbox() {
  const [queryParams, setQueryParams] = React.useState<IEmailQueryParams>({
    page: 1,
    limit: 10,
  });

  const { data: emailData } = useEmailsQuery(queryParams);

  const [messages, setMessages] = React.useState<IEmailMessage[]>([]);
  const [selectedMessages, setSelectedMessages] = React.useState<Set<number>>(
    () => new Set()
  );

  React.useEffect(() => {
    if (emailData && emailData.data.length) {
      setMessages(mapEmailsToMessages(emailData.data));
      setSelectedMessages(new Set());
      mailFolders[0].count = emailData.pagination.total;
    }
  }, [emailData]);

  const handleSearch = (value: string) => {
    setQueryParams((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const toggleStar = (id: number) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, starred: !message.starred } : message
      )
    );
  };

  const toggleSelect = (id: number) => {
    setSelectedMessages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allSelected =
    messages.length > 0 && selectedMessages.size === messages.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedMessages(new Set());
      return;
    }
    setSelectedMessages(new Set(messages.map((message) => message.id)));
  };

  const handlePageChange = (nextPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: nextPage }));
  };

  const totalItems = emailData?.pagination?.total ?? messages.length;
  const currentPage = queryParams.page ?? 1;
  const pageSize = queryParams.limit ?? 10;

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-6 overflow-hidden rounded-2xl border bg-white shadow-sm lg:flex-row">
        <aside className="w-full border-b p-6 lg:w-64 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-500 text-lg font-semibold text-white">
              AB
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Ari Budin</p>
              <p className="text-xs text-gray-500">Web developer</p>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-lime-500 py-2 text-sm font-semibold text-white transition hover:bg-lime-600"
          >
            + Compose
          </button>

          <div className="mt-6 space-y-5 text-sm">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-gray-400">
                Mailboxes
              </p>
              <ul className="space-y-1">
                {mailFolders.map((folder) => (
                  <li key={folder.name}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition ${
                        folder.active
                          ? "bg-lime-50 font-semibold text-lime-800"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span>{folder.name}</span>
                      {folder.count && (
                        <span
                          className={`text-xs ${
                            folder.active ? "text-lime-700" : "text-gray-500"
                          }`}
                        >
                          {folder.count}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-gray-400">
                Labels
              </p>
              <ul className="space-y-2">
                {mailLabels.map((label) => (
                  <li key={label.name} className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${label.color}`}
                    ></span>
                    <span className="text-gray-600">{label.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <section className="flex-1 p-6">
          <div className="flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Inbox</h2>
              <p className="text-sm text-gray-500">
                Stay on top of updates across your teams.
              </p>
            </div>
            <div className="flex flex-1 items-center gap-3 lg:justify-end">
              <div className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={queryParams.search ?? ""}
                  onChange={(event) => handleSearch(event.target.value)}
                  className="h-9 rounded-full border-gray-200 pl-9 text-sm"
                />
              </div>
              <Pagination
                total={totalItems}
                page={currentPage}
                limit={pageSize}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 border-b py-3 text-sm text-gray-500">
            <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => toggleSelectAll()}
                className="h-4 w-4 rounded border-gray-300"
              />
              Select All
            </label>
            {selectedMessages.size > 0 && (
              <span className="text-xs text-gray-400">
                {selectedMessages.size} selected
              </span>
            )}
          </div>

          <div className="divide-y overflow-x-auto">
            <div className="min-w-[520px]">
              {messages.map((message) => {
                const isSelected = selectedMessages.has(message.id);
                const trimmedPreview =
                  message.preview && message.preview.length > 50
                    ? `${message.preview.slice(0, 50)}…`
                    : message.preview;

                return (
                  <div
                    key={message.id}
                    className={`flex items-center gap-4 py-4 text-sm ${
                      message.unread ? "bg-lime-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={isSelected}
                      onChange={() => toggleSelect(message.id)}
                      aria-label={`Select message from ${message.sender}`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleStar(message.id)}
                      className="rounded-full p-1 text-gray-400 transition hover:text-amber-500"
                      aria-label={
                        message.starred ? "Remove star" : "Mark as starred"
                      }
                    >
                      <Star
                        className={`h-4 w-4 ${
                          message.starred ? "text-amber-400" : ""
                        }`}
                        fill={message.starred ? "currentColor" : "none"}
                      />
                    </button>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {message.sender}
                        </span>
                        {message.unread && (
                          <span className="rounded-full bg-lime-500/20 px-2 py-0.5 text-xs font-semibold uppercase text-lime-700">
                            New
                          </span>
                        )}
                      </div>
                      <p className="truncate text-gray-700">
                        <span className="font-medium">{message.subject}</span>
                        <span className="text-gray-500">{` — ${
                          trimmedPreview ?? ""
                        }`}</span>
                      </p>
                    </div>
                    {message.hasAttachment && (
                      <Paperclip className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-xs text-gray-400">
                      {message.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
