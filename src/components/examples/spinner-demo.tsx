"use client"

import { Spinner } from "@/registry/new-york-v4/ui/spinner"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Badge } from "@/registry/new-york-v4/ui/badge"

/**
 * SpinnerDemo - Example spinner component
 * Loading indicators in various contexts
 */
export function SpinnerDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Spinner />
        <Spinner className="size-6" />
        <Spinner className="size-8" />
        <Spinner className="size-10" />
      </div>

      <div className="flex items-center gap-4">
        <Spinner className="text-primary" />
        <Spinner className="text-secondary" />
        <Spinner className="text-destructive" />
        <Spinner className="text-muted-foreground" />
      </div>

      <div className="flex items-center gap-4">
        <Button disabled>
          <Spinner className="mr-2" />
          Loading...
        </Button>
        <Badge variant="outline">
          <Spinner className="mr-2 size-3" />
          Processing
        </Badge>
      </div>
    </div>
  )
}

