import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeedbackMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Feedback</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">1,245</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Positive</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-600">875</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Neutral</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-yellow-500">230</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Negative</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-red-600">140</CardContent>
      </Card>
    </div>
  );
}
