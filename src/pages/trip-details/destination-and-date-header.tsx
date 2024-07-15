import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";

export function DestinationAndDateHeader() {
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className='size-5 text-zinc-400' />
        <span className="text-zinc-100">data</span>
      </div>

      <div className="flex items-center gap-2">
        <Calendar className='size-5 text-zinc-400' />
        <span className="text-zinc-100">Cidade</span>

        <div className='w-px h-6 bg-zinc-800' />

        <Button onClick={() => alert('teste')}>
          Alterar local/data
          <Settings2 className='size-5' />
        </Button>
      </div>
    </div>
  );
}