import { ThemeToggle } from "@/components/theme-toggle";
import { KanbanBoard } from "@/components/kanban-board";
import { ColumnDialog } from "@/components/column-dialog";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="">
          <Image
            src="/TeachersTasksLogo.png"
            width={100}
            height={100}
            alt="Logo"
            priority
          />
        </div>
        <Image
          src="/ministere-de-leducation-maroc.png"
          width={200}
          height={200}
          alt="Logo Ministere"
          priority
          style={{ width: "20%", height: "auto" }}
        />
        <ThemeToggle />
      </div>
      <main className="container mx-auto p-4">
        <div className="flex justify-end mb-6">
          <ColumnDialog />
        </div>

        <KanbanBoard />
      </main>
    </main>
    <footer><h3 className="text-center">Made By School Solutions; Zak & Amina</h3></footer>
    </>
  );
}
