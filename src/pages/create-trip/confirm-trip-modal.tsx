import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  toggleConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export function ConfirmTripModal({
  toggleConfirmTripModal, 
  createTrip,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModalProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Confirmar criação da viagem</h2>
            <button type='button' onClick={toggleConfirmTripModal}>
              <X className='size-5 text-zinc-400'/>
            </button>
          </div>
          <p className='text-sm text-zinc-400'>
            Para concluir a criação da viagem para 
            <span className='font-semibold text-zinc-100'>Florianópolis, Brasil</span> 
            nas datas de <span className='font-semibold text-zinc-100'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:              
          </p>
        </div>

        <form onSubmit={createTrip} className='flex flex-col gap-3'>
          <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <User className='size-5 text-zinc-400' />
            <input 
              type="text"
              name='nome'
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
              onChange={event => setOwnerName(event.target.value)}
            />
          </div>

          <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <User className='size-5 text-zinc-400' />
            <input 
              type="email"
              name='email'
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
              onChange={event => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button variant="primary" type='submit' size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}