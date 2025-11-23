"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

/**
 * SheetDemo - Example sheet component
 * Sidebar implementation using Sheet
 */
export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Sheet content goes here. This is a sidebar implementation that extends the Dialog component.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

