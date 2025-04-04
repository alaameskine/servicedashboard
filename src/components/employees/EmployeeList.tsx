
import { useState } from "react";
import { UserCog, MoreHorizontal, Mail, Phone, MapPin, UserMinus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/pages/Employes";
import { toast } from "sonner";

interface EmployeeListProps {
  employees: Employee[];
  searchQuery: string;
  filterStatus: string;
  onDeleteEmployee?: (id: number) => void;
  onEditEmployee?: (employee: Employee) => void;
}

export function EmployeeList({ employees, searchQuery, filterStatus, onDeleteEmployee, onEditEmployee }: EmployeeListProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredEmployees.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredEmployees.map((employee) => employee.id));
    }
  };

  const toggleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">Actif</Badge>;
      case "leave":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">En congé</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">Inactif</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const handleDeleteEmployee = () => {
    if (employeeToDelete && onDeleteEmployee) {
      onDeleteEmployee(employeeToDelete.id);
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
      toast.success(`${employeeToDelete.prenom} ${employeeToDelete.nom} a été supprimé avec succès.`);
    }
  };

  const openDeleteDialog = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  // Filtrage des employés
  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = `${employee.nom} ${employee.prenom}`.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const posteMatch = employee.poste.toLowerCase().includes(searchQuery.toLowerCase());
    
    let statusMatch = true;
    if (filterStatus !== "all") {
      statusMatch = employee.status === filterStatus || (filterStatus === "new" && employee.isNew);
    }
    
    return (nameMatch || emailMatch || posteMatch) && statusMatch;
  });

  return (
    <div>
      {selectedRows.length > 0 && (
        <div className="bg-muted p-2 flex justify-between items-center">
          <span className="text-sm font-medium">{selectedRows.length} sélectionné(s)</span>
          <div className="flex gap-2">
            <Button variant="destructive" size="sm">
              <UserMinus className="mr-2 h-4 w-4" />
              Désactiver
            </Button>
          </div>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedRows.length === filteredEmployees.length && filteredEmployees.length > 0} 
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Fonctionnaire</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Aucun fonctionnaire trouvé
              </TableCell>
            </TableRow>
          ) : (
            filteredEmployees.map((employee) => (
              <TableRow key={employee.id} className={employee.isNew ? "bg-primary/5" : ""}>
                <TableCell>
                  <Checkbox 
                    checked={selectedRows.includes(employee.id)} 
                    onCheckedChange={() => toggleSelectRow(employee.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {employee.prenom[0]}{employee.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{employee.prenom} {employee.nom}</div>
                      <div className="text-xs text-muted-foreground">
                        {employee.isNew && (
                          <span className="text-green-600 font-medium">Nouveau • </span>
                        )}
                        Arrivé le {new Date(employee.dateArrivee).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.poste}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{employee.telephone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(employee.status)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditEmployee && onEditEmployee(employee)}>
                        <UserCog className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(employee)}>
                        <UserMinus className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Supprimer le fonctionnaire</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer {employeeToDelete?.prenom} {employeeToDelete?.nom} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteEmployee}>
              <UserMinus className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
