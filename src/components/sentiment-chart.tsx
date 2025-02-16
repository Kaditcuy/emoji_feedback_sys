import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", positive: 40, neutral: 10, negative: 5 },
  { name: "Tue", positive: 35, neutral: 15, negative: 10 },
  { name: "Wed", positive: 50, neutral: 12, negative: 7 },
  { name: "Thu", positive: 45, neutral: 20, negative: 8 },
  { name: "Fri", positive: 60, neutral: 15, negative: 12 },
];

export function SentimentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="positive" stroke="#4CAF50" strokeWidth={2} />
            <Line type="monotone" dataKey="neutral" stroke="#FFC107" strokeWidth={2} />
            <Line type="monotone" dataKey="negative" stroke="#F44336" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
