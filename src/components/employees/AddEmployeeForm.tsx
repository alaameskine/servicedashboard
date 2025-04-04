
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/pages/Employes";

interface AddEmployeeFormProps {
  onAddEmployee: (employee: Omit<Employee, 'id' | 'isNew'>) => void;
}

export function AddEmployeeForm({ onAddEmployee }: AddEmployeeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    poste: "",
    adresse: "",
    dateArrivee: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
    status: "active" as "active" | "leave" | "inactive"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value as "active" | "leave" | "inactive" }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation simplifiée
    if (!formData.nom || !formData.prenom || !formData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Ajouter l'employé
    onAddEmployee(formData);
    
    // Afficher un toast
    toast({
      title: "Fonctionnaire ajouté",
      description: "Le fonctionnaire a été ajouté avec succès.",
    });
    
    // Réinitialiser le formulaire
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      poste: "",
      adresse: "",
      dateArrivee: new Date().toISOString().split('T')[0],
      status: "active"
    });
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom</Label>
          <Input 
            id="nom" 
            required 
            placeholder="Nom" 
            value={formData.nom}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input 
            id="prenom" 
            required 
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            required 
            placeholder="email@science-faculty.edu"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input 
            id="telephone" 
            required 
            placeholder="06 xx xx xx xx"
            value={formData.telephone}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="poste">Poste</Label>
        <Input 
          id="poste" 
          required 
          placeholder="Poste dans le service"
          value={formData.poste}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse</Label>
        <Input 
          id="adresse" 
          required 
          placeholder="Adresse postale"
          value={formData.adresse}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateArrivee">Date d'arrivée</Label>
          <Input 
            id="dateArrivee" 
            type="date" 
            required
            value={formData.dateArrivee}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select defaultValue={formData.status} onValueChange={handleSelectChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="leave">En congé</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ajout en cours..." : "Ajouter le fonctionnaire"}
        </Button>
      </div>
    </form>
  );
}
