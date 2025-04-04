import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, ClipboardCheckIcon, UserCheck, ChevronDownIcon, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Employee } from "./Employes";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

type EvaluationStatus = "à planifier" | "planifiée" | "complétée";

interface EmployeeEvaluation {
  employeeId: number;
  date: string;
  status: EvaluationStatus;
  score?: number;
  competences?: {
    technique: number;
    communication: number;
    ponctualite: number;
    travailEquipe: number;
    problemSolving: number;
  };
  commentaire?: string;
}

const Evaluations = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [evaluations, setEvaluations] = useState<EmployeeEvaluation[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<EmployeeEvaluation | null>(null);
  const [evaluationForm, setEvaluationForm] = useState({
    technique: 70,
    communication: 70,
    ponctualite: 70,
    travailEquipe: 70,
    problemSolving: 70,
    commentaire: ""
  });
  const { toast } = useToast();

  // Récupérer les fonctionnaires et évaluations du localStorage
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    const employeeData = storedEmployees ? JSON.parse(storedEmployees) : [];
    setEmployees(employeeData);

    const storedEvaluations = localStorage.getItem('evaluations');
    const evaluationData = storedEvaluations ? JSON.parse(storedEvaluations) : [];
    
    // Si aucune évaluation n'existe, en créer pour chaque employé
    if (evaluationData.length === 0 && employeeData.length > 0) {
      const newEvaluations = employeeData.map((emp: Employee) => ({
        employeeId: emp.id,
        date: getRandomFutureDate(30),
        status: "à planifier" as EvaluationStatus
      }));
      
      localStorage.setItem('evaluations', JSON.stringify(newEvaluations));
      setEvaluations(newEvaluations);
    } else {
      setEvaluations(evaluationData);
    }
  }, []);

  // Générer une date aléatoire dans le futur
  const getRandomFutureDate = (maxDays: number): string => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * maxDays) + 1);
    return futureDate.toISOString();
  };

  // Filtrer les évaluations à venir
  const upcomingEvaluations = evaluations
    .filter(evaluation => evaluation.status !== "complétée")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Filtrer les évaluations complétées
  const completedEvaluations = evaluations
    .filter(evaluation => evaluation.status === "complétée")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Trouver l'employé correspondant à l'évaluation
  const getEmployeeById = (id: number) => {
    return employees.find(emp => emp.id === id) || null;
  };

  // Préparer une nouvelle évaluation
  const handlePrepareEvaluation = (employeeId: number) => {
    const employee = getEmployeeById(employeeId);
    const evaluation = evaluations.find(e => e.employeeId === employeeId) || null;
    
    if (employee && evaluation) {
      setSelectedEmployee(employee);
      setCurrentEvaluation(evaluation);
      
      // Si l'évaluation a déjà des scores, les utiliser
      if (evaluation.competences) {
        setEvaluationForm({
          technique: evaluation.competences.technique,
          communication: evaluation.competences.communication,
          ponctualite: evaluation.competences.ponctualite,
          travailEquipe: evaluation.competences.travailEquipe,
          problemSolving: evaluation.competences.problemSolving,
          commentaire: evaluation.commentaire || ""
        });
      } else {
        // Réinitialiser le formulaire
        setEvaluationForm({
          technique: 70,
          communication: 70,
          ponctualite: 70,
          travailEquipe: 70,
          problemSolving: 70,
          commentaire: ""
        });
      }
    }
  };

  // Soumettre l'évaluation
  const handleSubmitEvaluation = () => {
    if (!selectedEmployee || !currentEvaluation) return;
    
    // Calculer le score moyen
    const scores = [
      evaluationForm.technique,
      evaluationForm.communication,
      evaluationForm.ponctualite,
      evaluationForm.travailEquipe,
      evaluationForm.problemSolving
    ];
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    // Mettre à jour l'évaluation
    const updatedEvaluations = evaluations.map(evaluation => {
      if (evaluation.employeeId === selectedEmployee.id) {
        return {
          ...evaluation,
          status: "complétée" as EvaluationStatus,
          date: new Date().toISOString(), // Date de l'évaluation
          score: averageScore,
          competences: {
            technique: evaluationForm.technique,
            communication: evaluationForm.communication,
            ponctualite: evaluationForm.ponctualite,
            travailEquipe: evaluationForm.travailEquipe,
            problemSolving: evaluationForm.problemSolving
          },
          commentaire: evaluationForm.commentaire
        };
      }
      return evaluation;
    });
    
    // Sauvegarder les évaluations
    localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
    setEvaluations(updatedEvaluations);
    
    // Afficher une notification
    toast({
      title: "Évaluation enregistrée",
      description: `L'évaluation de ${selectedEmployee.prenom} ${selectedEmployee.nom} a été complétée avec succès.`,
    });

    // Ajouter une nouvelle évaluation pour cet employé (pour le futur)
    const newEvaluation = {
      employeeId: selectedEmployee.id,
      date: getRandomFutureDate(180), // Prochaine évaluation dans les 6 mois
      status: "à planifier" as EvaluationStatus
    };

    const finalEvaluations = [...updatedEvaluations, newEvaluation];
    localStorage.setItem('evaluations', JSON.stringify(finalEvaluations));
    setEvaluations(finalEvaluations);
  };

  // Obtenir le statut avec couleur
  const getStatusBadge = (status: EvaluationStatus) => {
    switch (status) {
      case "complétée":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Complétée
          </Badge>
        );
      case "planifiée":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Planifiée
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            À planifier
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Sidebar />
      
      <main className="flex-1 pt-24 md:ml-64">
        <div className="container px-4 py-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">Évaluations des fonctionnaires</h1>
                <p className="text-muted-foreground mt-1">
                  Planifiez et gérez les évaluations périodiques des fonctionnaires
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <ClipboardCheckIcon className="mr-2 h-4 w-4" />
                    Nouvelle évaluation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Sélectionnez un fonctionnaire</DialogTitle>
                    <DialogDescription>
                      Choisissez le fonctionnaire que vous souhaitez évaluer.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      {employees.map((employee) => (
                        <Button 
                          key={employee.id} 
                          variant="outline" 
                          className="justify-start font-normal"
                          onClick={() => handlePrepareEvaluation(employee.id)}
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          {employee.prenom} {employee.nom} - {employee.poste}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Évaluations à venir</CardTitle>
                  <CardDescription>
                    Fonctionnaires devant faire l'objet d'une évaluation dans les prochains jours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fonctionnaire</TableHead>
                        <TableHead>Poste</TableHead>
                        <TableHead>Date d'évaluation</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingEvaluations.length > 0 ? (
                        upcomingEvaluations.map((evaluation) => {
                          const employee = getEmployeeById(evaluation.employeeId);
                          if (!employee) return null;
                          
                          return (
                            <TableRow key={`${employee.id}-${evaluation.date}`}>
                              <TableCell className="font-medium">
                                {employee.prenom} {employee.nom}
                              </TableCell>
                              <TableCell>{employee.poste}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  {new Date(evaluation.date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </div>
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(evaluation.status)}
                              </TableCell>
                              <TableCell className="text-right">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handlePrepareEvaluation(employee.id)}
                                    >
                                      <UserCheck className="mr-1 h-4 w-4" />
                                      Évaluer
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[600px]">
                                    {selectedEmployee && currentEvaluation && (
                                      <>
                                        <DialogHeader>
                                          <DialogTitle>
                                            Évaluation de {selectedEmployee.prenom} {selectedEmployee.nom}
                                          </DialogTitle>
                                          <DialogDescription>
                                            {selectedEmployee.poste} - Évaluation périodique de performance
                                          </DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="py-4">
                                          <Tabs defaultValue="competences">
                                            <TabsList className="mb-4">
                                              <TabsTrigger value="competences">Compétences</TabsTrigger>
                                              <TabsTrigger value="commentaire">Commentaire</TabsTrigger>
                                            </TabsList>
                                            
                                            <TabsContent value="competences">
                                              <div className="space-y-6">
                                                <div className="space-y-2">
                                                  <div className="flex justify-between">
                                                    <label className="text-sm font-medium">
                                                      Compétences techniques
                                                    </label>
                                                    <span className="text-sm font-mono">
                                                      {evaluationForm.technique}/100
                                                    </span>
                                                  </div>
                                                  <Slider
                                                    value={[evaluationForm.technique]}
                                                    min={0}
                                                    max={100}
                                                    step={5}
                                                    onValueChange={(value) => setEvaluationForm({
                                                      ...evaluationForm,
                                                      technique: value[0]
                                                    })}
                                                  />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                  <div className="flex justify-between">
                                                    <label className="text-sm font-medium">
                                                      Communication
                                                    </label>
                                                    <span className="text-sm font-mono">
                                                      {evaluationForm.communication}/100
                                                    </span>
                                                  </div>
                                                  <Slider
                                                    value={[evaluationForm.communication]}
                                                    min={0}
                                                    max={100}
                                                    step={5}
                                                    onValueChange={(value) => setEvaluationForm({
                                                      ...evaluationForm,
                                                      communication: value[0]
                                                    })}
                                                  />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                  <div className="flex justify-between">
                                                    <label className="text-sm font-medium">
                                                      Ponctualité et assiduité
                                                    </label>
                                                    <span className="text-sm font-mono">
                                                      {evaluationForm.ponctualite}/100
                                                    </span>
                                                  </div>
                                                  <Slider
                                                    value={[evaluationForm.ponctualite]}
                                                    min={0}
                                                    max={100}
                                                    step={5}
                                                    onValueChange={(value) => setEvaluationForm({
                                                      ...evaluationForm,
                                                      ponctualite: value[0]
                                                    })}
                                                  />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                  <div className="flex justify-between">
                                                    <label className="text-sm font-medium">
                                                      Travail d'équipe
                                                    </label>
                                                    <span className="text-sm font-mono">
                                                      {evaluationForm.travailEquipe}/100
                                                    </span>
                                                  </div>
                                                  <Slider
                                                    value={[evaluationForm.travailEquipe]}
                                                    min={0}
                                                    max={100}
                                                    step={5}
                                                    onValueChange={(value) => setEvaluationForm({
                                                      ...evaluationForm,
                                                      travailEquipe: value[0]
                                                    })}
                                                  />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                  <div className="flex justify-between">
                                                    <label className="text-sm font-medium">
                                                      Résolution de problèmes
                                                    </label>
                                                    <span className="text-sm font-mono">
                                                      {evaluationForm.problemSolving}/100
                                                    </span>
                                                  </div>
                                                  <Slider
                                                    value={[evaluationForm.problemSolving]}
                                                    min={0}
                                                    max={100}
                                                    step={5}
                                                    onValueChange={(value) => setEvaluationForm({
                                                      ...evaluationForm,
                                                      problemSolving: value[0]
                                                    })}
                                                  />
                                                </div>
                                              </div>
                                            </TabsContent>
                                            
                                            <TabsContent value="commentaire">
                                              <div className="space-y-4">
                                                <p className="text-sm text-muted-foreground">
                                                  Ajoutez des commentaires sur les performances du fonctionnaire, 
                                                  des objectifs à atteindre ou des points d'amélioration.
                                                </p>
                                                <textarea
                                                  className="w-full min-h-[150px] p-2 border rounded-md"
                                                  placeholder="Commentaires et observations..."
                                                  value={evaluationForm.commentaire}
                                                  onChange={(e) => setEvaluationForm({
                                                    ...evaluationForm,
                                                    commentaire: e.target.value
                                                  })}
                                                />
                                              </div>
                                            </TabsContent>
                                          </Tabs>
                                        </div>
                                        
                                        <DialogFooter>
                                          <Button onClick={handleSubmitEvaluation}>
                                            Soumettre l'évaluation
                                          </Button>
                                        </DialogFooter>
                                      </>
                                    )}
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            Aucune évaluation à venir
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Évaluations récentes</CardTitle>
                  <CardDescription>
                    Évaluations effectuées au cours des 90 derniers jours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {completedEvaluations.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fonctionnaire</TableHead>
                          <TableHead>Poste</TableHead>
                          <TableHead>Date d'évaluation</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {completedEvaluations.map((evaluation) => {
                          const employee = getEmployeeById(evaluation.employeeId);
                          if (!employee) return null;
                          
                          return (
                            <TableRow key={`${employee.id}-${evaluation.date}`}>
                              <TableCell className="font-medium">
                                {employee.prenom} {employee.nom}
                              </TableCell>
                              <TableCell>{employee.poste}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  {new Date(evaluation.date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </div>
                              </TableCell>
                              <TableCell>
                                {evaluation.score && (
                                  <Badge variant={evaluation.score >= 80 ? "default" : "outline"} 
                                    className={
                                      evaluation.score >= 80 
                                        ? "bg-green-100 text-green-800" 
                                        : evaluation.score >= 60 
                                          ? "bg-yellow-100 text-yellow-800" 
                                          : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {evaluation.score}/100
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handlePrepareEvaluation(employee.id)}
                                    >
                                      <ClipboardCheckIcon className="mr-1 h-4 w-4" />
                                      Détails
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[600px]">
                                    {selectedEmployee && currentEvaluation && currentEvaluation.competences && (
                                      <>
                                        <DialogHeader>
                                          <DialogTitle>
                                            Évaluation de {selectedEmployee.prenom} {selectedEmployee.nom}
                                          </DialogTitle>
                                          <DialogDescription>
                                            {selectedEmployee.poste} - Évaluation du {new Date(currentEvaluation.date).toLocaleDateString('fr-FR')}
                                          </DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="py-4">
                                          <div className="mb-6 flex flex-col items-center justify-center">
                                            <div className="text-4xl font-bold">
                                              {currentEvaluation.score}/100
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              Score global d'évaluation
                                            </p>
                                          </div>
                                          
                                          <div className="space-y-4">
                                            <div>
                                              <div className="flex justify-between mb-1">
                                                <span className="text-sm">Compétences techniques</span>
                                                <span className="text-sm font-medium">
                                                  {currentEvaluation.competences.technique}/100
                                                </span>
                                              </div>
                                              <div className="w-full bg-muted rounded-full h-2">
                                                <div 
                                                  className="bg-primary rounded-full h-2" 
                                                  style={{width: `${currentEvaluation.competences.technique}%`}}
                                                />
                                              </div>
                                            </div>
                                            
                                            <div>
                                              <div className="flex justify-between mb-1">
                                                <span className="text-sm">Communication</span>
                                                <span className="text-sm font-medium">
                                                  {currentEvaluation.competences.communication}/100
                                                </span>
                                              </div>
                                              <div className="w-full bg-muted rounded-full h-2">
                                                <div 
                                                  className="bg-primary rounded-full h-2" 
                                                  style={{width: `${currentEvaluation.competences.communication}%`}}
                                                />
                                              </div>
                                            </div>
                                            
                                            <div>
                                              <div className="flex justify-between mb-1">
                                                <span className="text-sm">Ponctualité et assiduité</span>
                                                <span className="text-sm font-medium">
                                                  {currentEvaluation.competences.ponctualite}/100
                                                </span>
                                              </div>
                                              <div className="w-full bg-muted rounded-full h-2">
                                                <div 
                                                  className="bg-primary rounded-full h-2" 
                                                  style={{width: `${currentEvaluation.competences.ponctualite}%`}}
                                                />
                                              </div>
                                            </div>
                                            
                                            <div>
                                              <div className="flex justify-between mb-1">
                                                <span className="text-sm">Travail d'équipe</span>
                                                <span className="text-sm font-medium">
                                                  {currentEvaluation.competences.travailEquipe}/100
                                                </span>
                                              </div>
                                              <div className="w-full bg-muted rounded-full h-2">
                                                <div 
                                                  className="bg-primary rounded-full h-2" 
                                                  style={{width: `${currentEvaluation.competences.travailEquipe}%`}}
                                                />
                                              </div>
                                            </div>
                                            
                                            <div>
                                              <div className="flex justify-between mb-1">
                                                <span className="text-sm">Résolution de problèmes</span>
                                                <span className="text-sm font-medium">
                                                  {currentEvaluation.competences.problemSolving}/100
                                                </span>
                                              </div>
                                              <div className="w-full bg-muted rounded-full h-2">
                                                <div 
                                                  className="bg-primary rounded-full h-2" 
                                                  style={{width: `${currentEvaluation.competences.problemSolving}%`}}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {currentEvaluation.commentaire && (
                                            <div className="mt-6">
                                              <h4 className="text-sm font-medium mb-2">Commentaires</h4>
                                              <div className="p-3 bg-muted rounded-md text-sm">
                                                {currentEvaluation.commentaire}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      Aucune évaluation récente n'a été effectuée
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default Evaluations;
