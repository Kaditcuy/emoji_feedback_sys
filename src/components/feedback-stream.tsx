import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockFeedback = [
  { emoji: "😊", message: "Great service!", time: "2 min ago" },
  { emoji: "😐", message: "Food was okay.", time: "5 min ago" },
  { emoji: "😡", message: "Slow service!", time: "10 min ago" },
];

export function FeedbackStream() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Feedback Stream</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockFeedback.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-2xl">{item.emoji}</span>
            <div className="flex-1">
              <p className="text-sm">{item.message}</p>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
