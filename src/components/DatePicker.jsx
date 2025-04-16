import React from "react";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DatePicker = ({date, setDate, dayAfterTomorrow}) => {

    return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-60 justify-start text-left rounded-full text-md text-textdark py-6 font-inter bg-bglight border-primary1",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mx-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={{ before: dayAfterTomorrow }}
              defaultSelected={dayAfterTomorrow}
              defaultMonth={dayAfterTomorrow}
              className={cn("font-inter text-textdark")}
            />
          </PopoverContent>
        </Popover>
    )

}

export default DatePicker