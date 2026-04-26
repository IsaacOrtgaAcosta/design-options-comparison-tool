

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const EmptyDesignOptionsState = () => {
  return (
    <Card>
       <CardHeader className="flex flex-col items-center justify-center text-center mt-5">
        <CardTitle className="text-2xl font-bold">No design options are loaded yet</CardTitle>
          <CardDescription className="max-w-md text-base">
            Create a new option or import them to see different metrics
          </CardDescription>
      </CardHeader>
    </Card>
  )
}

