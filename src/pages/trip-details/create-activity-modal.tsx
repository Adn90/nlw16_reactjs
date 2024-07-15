import { Calendar, Tag, X } from "lucide-react";

interface CreateActivityModalProps {
  toggleCreateActivitModalOpen: () => void;
}

export function CreateActivityModal({ 
  toggleCreateActivitModalOpen 
}: CreateActivityModalProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Cadastrar atividade</h2>
            <button type='button' onClick={toggleCreateActivitModalOpen}>
              <X className='size-5 text-zinc-400'/>
            </button>
          </div>
          <p className='text-sm text-zinc-400'>
            Todos os convidados podem visualizar todas as atividades.         
          </p>
        </div>

        <form className='flex flex-col gap-3'>
          <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <Tag className='size-5 text-zinc-400' />
            <input 
              type="text"
              name='title'
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <Calendar className='size-5 text-zinc-400' />
            <input 
              type="datetime-local"
              name='occurs_at'
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <button 
            type='submit'
            className='bg-lime-300 text-lime-900 rounded-lg px-5 h-14 font-medium justify-center flex items-center gap-2 hover:bg-lime-400'
          > Salvar atividade
          </button>
        </form>
      </div>
    </div>
  );
}