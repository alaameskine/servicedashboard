
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileTextIcon, InfoIcon, CheckIcon, XIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for demonstration
const initialRequestsData = [
  { 
    id: 1, 
    employee: "User Test", 
    type: "certificate",
    title: "Attestation de Travail",
    date: "2023-05-15", 
    status: "pending" 
  },
  { 
    id: 2, 
    employee: "User 1", 
    type: "info",
    title: "Modification d'Information",
    date: "2023-05-12", 
    status: "approved" 
  },
  { 
    id: 3, 
    employee: "User 2", 
    type: "certificate",
    title: "Attestation de Travail",
    date: "2023-05-10", 
    status: "rejected" 
  },
  { 
    id: 4, 
    employee: "User 3", 
    type: "info",
    title: "Modification d'Information",
    date: "2023-05-08", 
    status: "pending" 
  },
];

export function RequestsTable() {
  const [requestsData, setRequestsData] = useState(initialRequestsData);
  const { toast } = useToast();

  // Function to render the request type icon
  const getRequestIcon = (type: string) => {
    switch (type) {
      case "certificate":
        return <FileTextIcon className="h-4 w-4" />;
      case "info":
        return <InfoIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Function to render the status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">En attente</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approuvée</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejetée</Badge>;
      default:
        return null;
    }
  };

  // Handle approval of a request
  const handleApprove = (id: number) => {
    setRequestsData(requestsData.filter(request => request.id !== id));
    toast({
      title: "Demande approuvée",
      description: "La demande a été approuvée avec succès",
    });
  };

  // Handle rejection of a request
  const handleReject = (id: number) => {
    setRequestsData(requestsData.filter(request => request.id !== id));
    toast({
      title: "Demande rejetée",
      description: "La demande a été rejetée avec succès",
    });
  };

  if (requestsData.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md">
        <p className="text-muted-foreground">Aucune demande pour l'instant</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Demande</TableHead>
            <TableHead>Fonctionnaire</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestsData.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getRequestIcon(request.type)}
                  <span>{request.title}</span>
                </div>
              </TableCell>
              <TableCell>{request.employee}</TableCell>
              <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {request.status === "pending" && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleReject(request.id)}
                      >
                        <XIcon className="h-4 w-4" />
                        <span className="sr-only">Rejeter</span>
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleApprove(request.id)}
                      >
                        <CheckIcon className="h-4 w-4" />
                        <span className="sr-only">Approuver</span>
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" className="h-8">
                    Détails
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
