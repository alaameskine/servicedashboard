
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "./animations/FadeIn";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function RequestForm() {
  const [requestType, setRequestType] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!requestType || !employee || !reason) {
      toast({
        title: "Erreur de formulaire",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    
    // Success message
    toast({
      title: "Demande soumise",
      description: "Votre demande a été enregistrée avec succès",
    });
    
    // Reset form
    setRequestType("");
    setEmployee("");
    setReason("");
  };

  return (
    <FadeIn>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Nouvelle Demande</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Fonctionnaire</label>
                <Input 
                  placeholder="User Test" 
                  className="bg-muted/30" 
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Type de Demande</label>
                <Select value={requestType} onValueChange={setRequestType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certificate">Attestation de Travail</SelectItem>
                    <SelectItem value="info">Modification d'Information</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Raison / Détails</label>
                <Textarea 
                  placeholder="Détails de la demande..." 
                  className="min-h-[100px] bg-muted/30"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full bg-black hover:bg-black/80 text-white">
                Soumettre la Demande
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
