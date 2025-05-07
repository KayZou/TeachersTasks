"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { deleteTask, moveTask, updateTask } from "@/lib/actions/task";
import { assignees } from "@/lib/data/assignees";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { columns } from "@/drizzle/schema";
import type { InferSelectModel } from "drizzle-orm";

type Column = InferSelectModel<typeof columns>;

interface TaskCardProps {
  id: number;
  columnId: number;
  title: string;
  description?: string;
  assignee?: { id: string; name: string; avatarUrl?: string };
  onAssigneeChange?: (id: string) => void;
  availableColumns: Column[];
}

export function TaskCard({
  id,
  columnId,
  title,
  description = "",
  assignee: assigneeProp,
  onAssigneeChange,
  availableColumns,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDesc, setDraftDesc] = useState(description);

  const assignee = assignees.find((a) => a.id === assigneeProp?.id);

  const handleSave = async () => {
    await updateTask({ id, title: draftTitle, description: draftDesc, columnId });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftTitle(title);
    setDraftDesc(description);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm(`Delete task “${title}”?`)) {
      await deleteTask(id);
    }
  };

  const handleMove = async (targetColumnId: number) => {
    await moveTask(id, targetColumnId);
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        {isEditing ? (
          <div className="space-y-2 w-full">
            <Input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.currentTarget.value)}
              placeholder="Task title"
            />
            <Textarea
              value={draftDesc}
              onChange={(e) => setDraftDesc(e.currentTarget.value)}
              placeholder="Description (optional)"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between w-full">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="flex items-center gap-2">
              {/* Assignee selector */}
              <Select value={assignee?.id} onValueChange={onAssigneeChange}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Assign to...">
                    {assignee && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={assignee.avatarUrl} />
                          <AvatarFallback>
                            {assignee.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">{assignee.name}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {assignees.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>
                            {member.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    Edit
                  </DropdownMenuItem>

                  {availableColumns.length > 0 && (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {availableColumns
                          .filter((c) => c.id !== columnId)
                          .map((c) => (
                            <DropdownMenuItem
                              key={c.id}
                              onClick={() => handleMove(c.id)}
                            >
                              {c.title}
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  )}

                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </CardHeader>

      {!isEditing && description && (
        <CardContent className="p-4 pt-2 text-sm text-muted-foreground">
          {description}
        </CardContent>
      )}
    </Card>
  );
}
