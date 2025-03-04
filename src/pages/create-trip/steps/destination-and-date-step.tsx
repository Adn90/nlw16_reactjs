import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { Modal } from "../../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  toggleGuestInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  isGuestInputOpen,
  eventStartAndEndDates,
  toggleGuestInput,
  setDestination,
  setEventStartAndEndDates
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function toggleDatePicker() {
    setIsDatePickerOpen(datePicker => !datePicker);
  }

  const displayDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
    : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            
      <div className='flex items-center gap-2 flex-1'>
        <MapPin className='size-5 text-zinc-400' />
        <input 
          type="text" 
          placeholder="Para onde você vai?"
          disabled={isGuestInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
          onChange={event => setDestination(event.target.value)}
        />
      </div>
      
      <button 
        className='flex items-center gap-2 text-left w-[240px]'
        onClick={toggleDatePicker}
      >
        <Calendar className='size-5 text-zinc-400' />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayDate || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <Modal 
          modalTitle="Selecione a data"
          toggleFunction={toggleDatePicker}
        >
          <DayPicker 
            mode="range"
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
          />
        </Modal>
      )};

      <div className='w-px h-6 bg-zinc-800' />

      {isGuestInputOpen ? (
        <Button variant="secondary" onClick={toggleGuestInput}>
          Alterar local/data
          <Settings2 className='size-5' />
        </Button>
      ) : (
        <Button variant="secondary" onClick={toggleGuestInput}>
          Continuar
          <ArrowRight className='size-5 text-lime-950' />
        </Button>
      )}
    </div>
  );
}