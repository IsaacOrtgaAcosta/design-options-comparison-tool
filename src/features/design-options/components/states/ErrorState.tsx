import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type ErrorStateProps = {
    error: string;
}

export const ErrorState = ({error}: ErrorStateProps) => {
  return (
          <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
  )
}

