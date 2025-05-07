"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { deleteColumn, updateColumn } from "@/lib/actions/columns";
import { TaskDialog } from "./task-dialog";

interface KanbanColumnProps {
  title: string;
  children: React.ReactNode;
  columnId: number;
}

export function KanbanColumn({ title, children, columnId }: KanbanColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);

  const handleSave = async () => {
    if (draftTitle.trim() === "" || draftTitle === title) {
      setIsEditing(false);
      setDraftTitle(title);
      return;
    }
    await updateColumn({ id: columnId, title: draftTitle.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftTitle(title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete the column “${title}” and all its tasks permanently?`
      )
    ) {
      deleteColumn(columnId);
    }
  };

  return (
    <Card className="w-full min-w-[320px] max-w-[400px]">
      <CardHeader className="p-4">
        {isEditing ? (
          <div className="flex items-center w-full space-x-2">
            <Input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.currentTarget.value)}
              className="flex-1"
            />
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        ) : (
          <div className="items-center justify-between w-full">
            <CardTitle className="text-lg text-center mb-4">{title}</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <TaskDialog
                trigger={
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Task
                  </Button>
                }
                columnId={columnId}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    Edit Column
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleDelete}
                  >
                    Delete Column
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0">{children}</CardContent>
    </Card>
  );
}
