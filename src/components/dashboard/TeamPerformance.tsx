
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Employee } from "@/pages/Employes";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useNavigate } from "react-router-dom";

type EmployeeWithEvaluation = Employee & { 
  evaluationScore?: number;
};

// Fonction pour générer des scores d'évaluation aléatoires
const generateEvaluationScores = (employees: Employee[]): EmployeeWithEvaluation[] => {
  return employees.map(employee => ({
    ...employee,
    evaluationScore: Math.floor(Math.random() * 41) + 60 // Score entre 60 et 100
  }));
};

// Fonction pour préparer les données pour le graphique
const prepareChartData = (employees: EmployeeWithEvaluation[]) => {
  return employees.map(emp => ({
    name: `${emp.prenom} ${emp.nom.charAt(0)}.`,
    score: emp.evaluationScore || 0,
    fullName: `${emp.prenom} ${emp.nom}`,
    poste: emp.poste
  }));
};

export function TeamPerformance() {
  const [chartLoaded, setChartLoaded] = useState(false);
  const [employees, setEmployees] = useState<EmployeeWithEvaluation[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Récupérer les fonctionnaires du localStorage
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      const employeeData = JSON.parse(storedEmployees);
      // Générer des scores d'évaluation pour les employés
      const employeesWithScores = generateEvaluationScores(employeeData);
      setEmployees(employeesWithScores);
    }
    
    // Simuler le chargement des données du graphique
    const timer = setTimeout(() => {
      setChartLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const chartData = prepareChartData(employees);
  
  const handleViewDetails = () => {
    navigate('/evaluations');
  };

  const chartConfig = {
    score: {
      label: "Score d'évaluation",
      color: "#0ea5e9" // sky-500
    }
  };
  
  return (
    <FadeIn delay={150} className="lg:col-span-2">
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium">Performance de l'équipe</h3>
              <p className="text-sm text-muted-foreground">
                Évaluations des fonctionnaires
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleViewDetails}>
              Voir les détails
            </Button>
          </div>
          
          <div className={`h-[320px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {chartLoaded ? (
              employees.length > 0 ? (
                <ChartContainer 
                  className="w-full h-full" 
                  config={chartConfig}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 50
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={60}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        ticks={[0, 20, 40, 60, 80, 100]}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-md">
                                <div className="font-medium">{data.fullName}</div>
                                <div className="text-xs text-muted-foreground">{data.poste}</div>
                                <div className="mt-1 font-mono text-sm">
                                  Score: {data.score}/100
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="score" 
                        fill="#0ea5e9" 
                        name="Score d'évaluation" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <p>Aucune donnée d'évaluation disponible</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={handleViewDetails}
                  >
                    Évaluer les fonctionnaires
                  </Button>
                </div>
              )
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            )}
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}
