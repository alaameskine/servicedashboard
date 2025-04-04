
import { StatCard } from "../ui/StatCard";
import { UsersIcon, ClipboardCheckIcon, UserCheckIcon } from "lucide-react";
import { Employee } from "@/pages/Employes";

interface StatCardsProps {
  employees: Employee[];
  newEmployeesCount: number;
}

export function StatCards({ employees, newEmployeesCount }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        title="Fonctionnaires" 
        value={`${employees.length}`} 
        trend={{ value: newEmployeesCount, isPositive: true }}
        icon={<UsersIcon className="w-5 h-5" />}
        delay={100}
      />
      <StatCard 
        title="Demandes en attente" 
        value="8" 
        icon={<ClipboardCheckIcon className="w-5 h-5" />}
        delay={200}
      />
      <StatCard 
        title="Évaluations à faire" 
        value="5" 
        icon={<UserCheckIcon className="w-5 h-5" />}
        delay={300}
      />
    </div>
  );
}
