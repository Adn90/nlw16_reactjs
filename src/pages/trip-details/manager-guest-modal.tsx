import { Mail, User } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { toast } from "sonner";
import { Participants } from "./guests";


interface ManagerGuestModalProps {
  participants: Participants[];
  toggleManageGuestsModalOpen: () => void;
  setIsUserConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ManagerGuestModal({
  participants,
  toggleManageGuestsModalOpen,
  setIsUserConfirmed
}: ManagerGuestModalProps) {
  
  async function confirmGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();

    const participant = participants.find(participant => participant.email == email);

    if (participant) {
      const id = participant.id;
      await api.patch(`/participants/${id}/confirm`, {
        id,
        name,
        email,
      })
      .then(response => {
        console.log(response)
        toast.success(`${response}`);
        toggleManageGuestsModalOpen();
        setIsUserConfirmed(true);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }

    
  }
  return (
    <form onSubmit={confirmGuest} className='flex flex-col gap-3'>
      <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
        <User className='size-5 text-zinc-400' />
        <input 
          type="text" 
          name="name"
          placeholder="Seu nome completo" 
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
        />
      </div>

      <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
        <Mail className='size-5 text-zinc-400' />
        <input 
          type="email"
          name='email'
          placeholder="Seu e-mail" 
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
          required
        />
      </div>

      <Button variant="primary" type='submit' size="full">
        Confirmar minha presença
      </Button>
    </form>    
  );
}