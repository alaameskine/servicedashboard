
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { RequestForm } from "@/components/RequestForm";
import { FeatureCard } from "@/components/features/FeatureCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BarChart, Calendar, FileText, MessagesSquare, Settings, UserRound, Users, UserCheck, ClipboardCheck, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Sidebar />
      
      <main className="flex-1 pt-24 md:ml-64">
        <section className="container px-4 py-6">
          <FadeIn>
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                <TabsTrigger value="requests">Demandes</TabsTrigger>
                <TabsTrigger value="team">Mon Équipe</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <FadeIn className="glass rounded-2xl p-6 md:p-8">
                  <Dashboard />
                </FadeIn>
              </TabsContent>
              
              <TabsContent value="requests">
                <div className="grid md:grid-cols-2 gap-8">
                  <FadeIn>
                    <div className="glass rounded-2xl p-6 md:p-8">
                      <RequestForm />
                    </div>
                  </FadeIn>
                  
                  <FadeIn delay={150}>
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Types de demandes</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FeatureCard
                          title="Demande d'attestation"
                          description="Demander une attestation de travail ou de salaire."
                          icon={<FileText className="h-5 w-5" />}
                          delay={100}
                          href="/requests"
                        />
                        <FeatureCard
                          title="Attestations"
                          description="Générer des attestations de travail ou de salaire."
                          icon={<FileText className="h-5 w-5" />}
                          delay={200}
                          href="/requests"
                        />
                        <FeatureCard
                          title="Évaluations"
                          description="Planifier et conduire des évaluations de performance."
                          icon={<UserCheck className="h-5 w-5" />}
                          delay={300}
                          href="#"
                        />
                        <FeatureCard
                          title="Autorisations"
                          description="Gérer les autorisations spéciales et permissions."
                          icon={<ClipboardCheck className="h-5 w-5" />}
                          delay={400}
                          href="#"
                        />
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </TabsContent>
              
              <TabsContent value="team">
                <FadeIn className="glass rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Gestion de l'équipe</h2>
                      <p className="text-muted-foreground mt-1">
                        Gérez les membres de votre équipe, leurs rôles et leurs performances
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link to="/employes">
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Voir tous les fonctionnaires
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                      title="Liste complète"
                      description="Accédez à la liste complète des fonctionnaires de votre service."
                      icon={<Users className="h-5 w-5" />}
                      delay={100}
                      href="/employes"
                    />
                    <FeatureCard
                      title="Ajouter un fonctionnaire"
                      description="Ajoutez un nouveau fonctionnaire à votre service."
                      icon={<UserPlus className="h-5 w-5" />}
                      delay={200}
                      href="/employes"
                    />
                    <FeatureCard
                      title="Évaluations"
                      description="Gérez les évaluations périodiques des fonctionnaires."
                      icon={<ClipboardCheck className="h-5 w-5" />}
                      delay={300}
                      href="/evaluations"
                    />
                  </div>
                </FadeIn>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </section>
      </main>
    </div>
  );
};

export default Index;
