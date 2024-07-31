import { Link, Tag } from "lucide-react";
import { Button } from "../../components/button";


export function CreateImportantLinksModal() {
  return(
    <form  className='flex flex-col gap-3'>
    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
      <Tag className='size-5 text-zinc-400' />
      <input 
        type="text"
        name='title'
        placeholder="Descrição"
        className="bg-transparent text-lg placeholder-zinc-400 outline-none"
      />
    </div>

    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
      <Link className='size-5 text-zinc-400' />
      <input 
        type="url"
        name='occurs_at'
        placeholder="url"
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
    </div>

    <Button variant="primary" size="full" type="submit">
      Salvar link
    </Button>   

  </form>
  );
}