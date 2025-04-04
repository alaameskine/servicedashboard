import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, UserPlus, Filter } from "lucide-react";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { AddEmployeeForm } from "@/components/employees/AddEmployeeForm";
import { EditEmployeeForm } from "@/components/employees/EditEmployeeForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate, useLocation } from "react-router-dom";

// Définition du type Employee pour la cohérence
export interface Employee {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  poste: string;
  adresse: string;
  dateArrivee: string;
  status: "active" | "leave" | "inactive";
  isNew: boolean;
}

// Key pour le localStorage
const EMPLOYEES_STORAGE_KEY = "faculty-employees-data";

// Données initiales des fonctionnaires
const initialEmployees: Employee[] = [
  {
    id: 1,
    nom: "User",
    prenom: "Test",
    email: "user.test@science-faculty.edu",
    telephone: "06 12 34 56 78",
    poste: "Gestionnaire administratif",
    adresse: "23 rue du Campus, Ville Universitaire",
    dateArrivee: "2023-01-15",
    status: "active",
    isNew: true,
  },
  {
    id: 2,
    nom: "Smith",
    prenom: "John",
    email: "john.smith@science-faculty.edu",
    telephone: "06 98 76 54 32",
    poste: "Chargé de mission",
    adresse: "45 avenue des Sciences, Ville Universitaire",
    dateArrivee: "2022-06-10",
    status: "leave",
    isNew: false,
  },
  {
    id: 3,
    nom: "Jones",
    prenom: "Emma",
    email: "emma.jones@science-faculty.edu",
    telephone: "06 45 67 89 10",
    poste: "Assistant technique",
    adresse: "12 boulevard Académique, Ville Universitaire",
    dateArrivee: "2021-11-20",
    status: "active",
    isNew: false,
  },
  {
    id: 4,
    nom: "Brown",
    prenom: "Sarah",
    email: "sarah.brown@science-faculty.edu",
    telephone: "06 78 90 12 34",
    poste: "Responsable juridique",
    adresse: "67 rue des Chercheurs, Ville Universitaire",
    dateArrivee: "2023-03-05",
    status: "active",
    isNew: true,
  },
  {
    id: 5,
    nom: "Wilson",
    prenom: "David",
    email: "david.wilson@science-faculty.edu",
    telephone: "06 23 45 67 89",
    poste: "Chargé d'études",
    adresse: "34 rue des Laboratoires, Ville Universitaire",
    dateArrivee: "2019-09-15",
    status: "inactive",
    isNew: false,
  },
];

const Employes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Charger les données depuis localStorage ou utiliser les données initiales
  useEffect(() => {
    const savedEmployees = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      setEmployees(initialEmployees);
    }
  }, []);
  
  // Sauvegarder les données dans localStorage quand elles changent
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
    }
  }, [employees]);

  // Fonction pour ajouter un nouvel employé
  const handleAddEmployee = (newEmployee: Omit<Employee, 'id' | 'isNew'>) => {
    const newId = Math.max(...employees.map(e => e.id), 0) + 1;
    const employeeToAdd: Employee = {
      ...newEmployee,
      id: newId,
      isNew: true
    };
    
    const updatedEmployees = [...employees, employeeToAdd];
    setEmployees(updatedEmployees);
    setIsDialogOpen(false);
  };

  // Fonction pour supprimer un employé
  const handleDeleteEmployee = (id: number) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    
    // Rediriger vers la liste des fonctionnaires après la suppression
    if (location.pathname.includes("/supprimer")) {
      navigate("/employes");
    }
  };

  // Fonction pour modifier un employé
  const handleEditEmployee = (id: number, updatedEmployeeData: Partial<Employee>) => {
    const updatedEmployees = employees.map(employee => 
      employee.id === id 
        ? { ...employee, ...updatedEmployeeData } 
        : employee
    );
    setEmployees(updatedEmployees);
    setIsEditDialogOpen(false);
  };

  // Fonction pour ouvrir le dialogue d'édition
  const handleOpenEditDialog = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Sidebar />
      
      <main className="flex-1 pt-24 md:ml-64">
        <section className="container px-4 py-6">
          <FadeIn>
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">Fonctionnaires du Service</h2>
                  <p className="text-muted-foreground mt-1">
                    Gérez les fonctionnaires de votre service
                  </p>
                </div>
                <div className="flex gap-3">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Ajouter un fonctionnaire
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter un fonctionnaire</DialogTitle>
                      </DialogHeader>
                      <AddEmployeeForm onAddEmployee={handleAddEmployee} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un fonctionnaire..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Select
                    value={filterStatus}
                    onValueChange={setFilterStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actifs</SelectItem>
                      <SelectItem value="leave">En congé</SelectItem>
                      <SelectItem value="new">Nouveaux</SelectItem>
                      <SelectItem value="inactive">Inactifs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <EmployeeList 
                    employees={employees} 
                    searchQuery={searchQuery} 
                    filterStatus={filterStatus}
                    onDeleteEmployee={handleDeleteEmployee}
                    onEditEmployee={handleOpenEditDialog}
                  />
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* Dialog pour éditer un employé */}
      {employeeToEdit && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier un fonctionnaire</DialogTitle>
            </DialogHeader>
            <EditEmployeeForm 
              employee={employeeToEdit} 
              onEditEmployee={handleEditEmployee} 
              onClose={() => setIsEditDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Employes;
