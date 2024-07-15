import { Link2, Plus } from "lucide-react";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">Título Link</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://lerolero.bgnweb.com.br/121231545456d4adsadadjhjkdsa45454d5s4d5a
            </a>                 
          </div>
          <Link2 className='text-zinc-400 size-5' />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">Título Link</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://lerolero.bgnweb.com.br/121231545456d4adsadadjhjkdsa45454d5s4d5a
            </a>                 
          </div>
          <Link2 className='text-zinc-400 size-5' />
        </div>
      </div>
      
      <button 
        className='w-full bg-zinc-800 text-zinc-200 justify-center rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-zinc-700'
      >
        <Plus className='size-5' />
        Cadastrar novo link
      </button>
    </div>
  );
}