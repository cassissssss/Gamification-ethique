import { Wifi, Signal, BatteryFull } from 'lucide-react'

export function PhoneStatusBar() {
  return (
    <div className="mb-5 flex items-center justify-between">
      <span className="text-sm font-medium text-foreground">9:30</span>
      <span className="flex items-center gap-1.5 text-foreground">
        <Wifi className="h-4 w-4" aria-hidden="true" />
        <Signal className="h-4 w-4" aria-hidden="true" />
        <BatteryFull className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>
  )
}
