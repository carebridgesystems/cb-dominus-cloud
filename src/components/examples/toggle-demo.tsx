"use client"

import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"

/**
 * ToggleDemo - Example toggle component
 * Two-state button that can be on or off
 */
export function ToggleDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Toggle aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <Underline />
        </Toggle>
      </div>

      <div className="flex items-center gap-2">
        <Toggle variant="outline" aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle italic">
          <Italic />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle underline">
          <Underline />
        </Toggle>
      </div>

      <div className="flex items-center gap-2">
        <Toggle size="sm" aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle size="default" aria-label="Toggle italic">
          <Italic />
        </Toggle>
        <Toggle size="lg" aria-label="Toggle underline">
          <Underline />
        </Toggle>
      </div>

      <div className="flex items-center gap-2">
        <Toggle disabled aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle disabled variant="outline" aria-label="Toggle italic">
          <Italic />
        </Toggle>
      </div>
    </div>
  )
}

