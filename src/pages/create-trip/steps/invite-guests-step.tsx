import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestsStepProps {
  toggleGuestModal: () => void;
  emailsToInvite: string[];
  toggleConfirmTripModal: () => void;
}

export function InviteGuestsStep({
  toggleGuestModal,
  emailsToInvite,
  toggleConfirmTripModal
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">     
      <button 
        type='button'
        onClick={toggleGuestModal}
        className='flex items-center gap-2 flex-1'
      >
        <UserRoundPlus className='size-5 text-zinc-400' />
        {emailsToInvite.length ? (
          <span className="text-lg text-zinc-100 text-left flex-1">
            {emailsToInvite.length} pessoa(s) convidadas(s)
          </span>
        ) : (
          <span className="text-lg text-zinc-400 text-left flex-1">Quem estará na viagem?</span>
        )}
      </button>
    
      <div className='w-px h-6 bg-zinc-800' />

      <button 
        className='bg-lime-300 text-lime-900 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'
        onClick={toggleConfirmTripModal}
      >
        Confirmar Viagem
        <ArrowRight className='size-5 text-lime-950' />
      </button>
    </div>
  );
}