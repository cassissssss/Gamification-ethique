"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root {...props} />
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger {...props} />
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close {...props} />
}

function SheetOverlay({
  className, 
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/30", 
        "data-[state=open]:animate-in data-[state=open]:fade-in-0", 
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0", 
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className, 
  children, 
  side = "bottom", 
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "bottom" | "right"
}) {
  const sideClasses =
    side === "bottom"
      ? cn(
          "inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl border-t border-border", 
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom"
        )
      : cn(
          "inset-y-0 right-0 h-full w-full max-w-xs border-l border-border", 
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
        )

  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col bg-background p-6 shadow-lg outline-none", 
          "data-[state=open]:animate-in data-[state=closed]:animate-out", 
          "duration-200", 
          sideClasses, 
          className
        )}
        {...props}
      >
        {children}

        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-md text-foreground/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <X size={18} />
          <span className="sr-only">Fermer</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

function SheetTitle({
  className, 
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn("text-sm font-semibold text-foreground",  className)}
      {...props}
    />
  )
}

export { Sheet,  SheetTrigger,  SheetClose,  SheetContent,  SheetTitle }
