import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Modal } from "../../components/modal";
import { ManagerGuestModal } from "./manager-guest-modal";

export interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participants[]>([]);

  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);
  const [isUserConfirmed, setIsUserConfirmed] = useState(false);

  function toggleManageGuestsModalOpen() {
    setIsManageGuestsModalOpen(guestManager => !guestManager);
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(res => setParticipants(res.data.participants));
  }, [tripId]);

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(res => setParticipants(res.data.participants));
  }, [isUserConfirmed == true]);  

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>
      
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div key={participant.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>                 
            </div>
            {participant.is_confirmed ? (
              <CircleCheck className='size-5 shrink-0 text-green-400' />
            ) : (
              <CircleDashed className='size-5 shrink-0 text-zinc-400' />
            )}
          </div>
          )
        })}
      </div>
      
      <Button 
        variant="secondary" 
        size="full"
        onClick={toggleManageGuestsModalOpen}
      >
        <UserCog className='size-5'/>
        Gerenciar convidados
      </Button>


      {isManageGuestsModalOpen && (
        <Modal
          modalTitle="Confirmar participação"
          toggleFunction={toggleManageGuestsModalOpen}
          modalSize={540}
        >
          <ManagerGuestModal 
            participants={participants}
            toggleManageGuestsModalOpen={toggleManageGuestsModalOpen}
            setIsUserConfirmed={setIsUserConfirmed}
          />
        </Modal>
      )}
    </div>
  );
}