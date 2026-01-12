import { toast } from "sonner";
import { AlertCircleIcon } from "lucide-react";
import type { JSX } from "react/jsx-dev-runtime";
import { Progress } from "@/components/ui/progress";
import * as React from "react";

function ToastProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = 100;
    const totalDuration = 4000;
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return <Progress value={progress} className="h-1 mt-2 w-full" />;
}

export function Error(
  message: string | { title?: string; description?: JSX.Element },
) {
  const title =
    typeof message === "string" ? message : message.title || "Error";
  const description =
    typeof message === "string" ? undefined : message.description;

  toast(title, {
    description: (
      <div className="flex flex-col w-full">
        {description && <div>{description}</div>}
        <ToastProgress />
      </div>
    ),
    duration: 4000,
    icon: <AlertCircleIcon className="h-5 w-5 text-red-700" />,
  });
}
