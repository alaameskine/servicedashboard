
import { FadeIn } from "./animations/FadeIn";
import { useState, useEffect } from "react";
import { Employee } from "@/pages/Employes";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { StatCards } from "./dashboard/StatCards";
import { TeamStatus } from "./dashboard/TeamStatus";
import { NewEmployees } from "./dashboard/NewEmployees";
import { DepartedEmployees } from "./dashboard/DepartedEmployees";
import { PendingRequests } from "./dashboard/PendingRequests";

// On récupère les employés du localStorage
const getEmployeesFromStorage = (): Employee[] => {
  const storedEmployees = localStorage.getItem('employees');
  return storedEmployees ? JSON.parse(storedEmployees) : [];
};

// Ajout d'employés par défaut si aucun n'existe
const getSampleEmployees = (): Employee[] => {
  return [
    {
      id: 1,
      nom: "Fonctionnaire",
      prenom: "1",
      poste: "Chef de projet",
      dateArrivee: new Date("2023-12-01").toISOString(),
      status: "active",
      email: "fonctionnaire1@example.com",
      telephone: "06 12 34 56 78",
      adresse: "123 Rue de l'Administration",
      isNew: true
    },
    {
      id: 2,
      nom: "Fonctionnaire",
      prenom: "2",
      poste: "Développeur",
      dateArrivee: new Date("2023-12-15").toISOString(),
      status: "active",
      email: "fonctionnaire2@example.com",
      telephone: "06 23 45 67 89",
      adresse: "456 Avenue du Service Public",
      isNew: true
    },
    {
      id: 3,
      nom: "Fonctionnaire",
      prenom: "3", 
      poste: "Analyste",
      dateArrivee: new Date("2024-01-05").toISOString(),
      status: "active",
      email: "fonctionnaire3@example.com",
      telephone: "06 34 56 78 90",
      adresse: "789 Boulevard Administratif",
      isNew: true
    }
  ];
};

export function Dashboard() {
  const [newEmployees, setNewEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    // Récupérer les employés du localStorage
    let storedEmployees = getEmployeesFromStorage();
    
    // Si aucun employé n'existe, ajouter les employés d'exemple
    if (storedEmployees.length === 0) {
      storedEmployees = getSampleEmployees();
      localStorage.setItem('employees', JSON.stringify(storedEmployees));
    }
    
    setEmployees(storedEmployees);
    
    // Filtrer pour obtenir les 3 employés les plus récemment ajoutés
    const recentEmployees = [...storedEmployees]
      .sort((a, b) => new Date(b.dateArrivee).getTime() - new Date(a.dateArrivee).getTime())
      .slice(0, 3);
    
    setNewEmployees(recentEmployees);
  }, []);

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <StatCards employees={employees} newEmployeesCount={newEmployees.length} />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <TeamStatus />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NewEmployees newEmployees={newEmployees} employees={employees} />
        <DepartedEmployees />
      </div>

      <PendingRequests />
    </div>
  );
}
