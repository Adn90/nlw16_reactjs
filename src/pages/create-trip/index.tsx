import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';
import { toast } from 'sonner';

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  
  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

  const [emailsToInvite, setemailsToInvite] = useState<string[]>([]);

  function toggleGuestInput() {
    if (!destination || !eventStartAndEndDates) {
      toast.warning("Destino e datas devem ser preenchidos!");
      return;
    }
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
    if (emailsToInvite.length == 0) {
      toast.warning("Nunhuma pessoa foi convidada!");
      return;
    }
    setIsConfirmTripModalOpen(tripModalOpen => !tripModalOpen);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!destination) { return; }
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }
    if (emailsToInvite.length == 0) { return; }
    if (!ownerName || !ownerEmail) { return; }
    
    const response = await api.post('/trips', {
      destination: destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })
    .then(response => {
      const { tripId } = response.data;
      navigate(`/trips/${tripId}`);
    })
    .catch((error) => {
      toast.error(error.message)
    });    
  }
 
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <DestinationAndDateStep 
            isGuestInputOpen={isGuestInputOpen}
            toggleGuestInput={toggleGuestInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />
          {isGuestInputOpen && (
            <InviteGuestsStep
              toggleGuestModal={toggleGuestModal}
              emailsToInvite={emailsToInvite}
              toggleConfirmTripModal={toggleConfirmTripModal}
            />
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
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )};
      

    </div>
  );
}