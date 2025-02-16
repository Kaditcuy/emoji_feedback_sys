import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ReportsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports & Exports</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Download detailed feedback reports.</p>
        <Button variant="outline">Download</Button>
      </CardContent>
    </Card>
  );
}
