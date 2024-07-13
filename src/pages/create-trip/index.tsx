import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2 } from 'lucide-react'; 
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  
  const [emailsToInvite, setemailsToInvite] = useState<string[]>([]);

  function toggleGuestInput() {
    setIsGuestInputOpen(guestInputOpen => !guestInputOpen);
  }

  function toggleGuestModal() {
    setIsGuestModalOpen(guestModalOpen => !guestModalOpen);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) { return; }

    setemailsToInvite([
      ...emailsToInvite,
      email
    ]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const emails = emailsToInvite.filter(email => email !== emailToRemove);
    setemailsToInvite(emails);
  }

  function toggleConfirmTripModal() {
    setIsConfirmTripModalOpen(tripModalOpen => !tripModalOpen);
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('trips/123')
  }
 
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400' />
              <input 
                type="text" 
                placeholder="Para onde você vai?"
                disabled={isGuestInputOpen}
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
              />
            </div>
            
            <div className='flex items-center gap-2'>
              <Calendar className='size-5 text-zinc-400' />
              <input 
                type="date" 
                placeholder="Quando?"
                disabled={isGuestInputOpen}
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" 
              />
            </div>

            <div className='w-px h-6 bg-zinc-800' />

            {isGuestInputOpen ? (
              <button 
                className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'
                onClick={toggleGuestInput}
              >
                Alterar local/data
                <Settings2 className='size-5' />
              </button>
            ) : (
              <button 
                className='bg-lime-300 text-lime-900 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'
                onClick={toggleGuestInput}
              >
                Continuar
                <ArrowRight className='size-5 text-lime-950' />
              </button>
            )}
          </div>

          {isGuestInputOpen && (
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
          )}
        </div>

        

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e 
          <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestModalOpen &&  (
        <InviteGuestsModal 
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          toggleGuestModal={toggleGuestModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}


      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
          toggleConfirmTripModal={toggleConfirmTripModal} 
          createTrip={createTrip}
        />
      )};
      

    </div>
  );
}