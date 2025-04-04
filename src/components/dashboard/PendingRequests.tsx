
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FadeIn } from "../animations/FadeIn";

interface PendingRequest {
  name: string;
  status: string;
  daysAgo: number;
}

const requestsData: PendingRequest[] = [
  { name: "Demande d'attestation - Fonctionnaire 7", status: "En attente", daysAgo: 1 },
  { name: "Attestation de travail - Fonctionnaire 2", status: "En attente", daysAgo: 2 },
  { name: "Modification d'horaire - Fonctionnaire 3", status: "En attente", daysAgo: 3 },
];

export function PendingRequests() {
  return (
    <FadeIn delay={400}>
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Demandes en attente d'approbation</h3>
            <Link to="/requests">
              <Button variant="outline" size="sm">Voir toutes les demandes</Button>
            </Link>
          </div>
          <div className="space-y-6">
            {requestsData.map((request, i) => (
              <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">{request.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                    {request.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Il y a {request.daysAgo} jour{request.daysAgo > 1 ? 's' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}
