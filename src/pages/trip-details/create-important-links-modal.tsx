import { Link, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { toast } from "sonner";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";


interface LinkProps {
  setNewLink: React.Dispatch<React.SetStateAction<boolean>>
  toggleCreateNewImportantLinkOpen: () => void;
}

export function CreateImportantLinksModal({
  setNewLink,
  toggleCreateNewImportantLinkOpen
}: LinkProps) {
  const { tripId } = useParams();
  async function salvarLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('url_title')?.toString();
    const url = data.get('url')?.toString();

    if (!title || !url) {
      toast.warning("Título do link e url devem ser preenchidos!");
      return;
    }  

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    })
    .then(response => {
      toast.success(`Link: '${title}' foi criado com sucesso!`);
      toggleCreateNewImportantLinkOpen();
      setNewLink(true);
    })
    .catch((error) => {
      toast.error(error.message);
    });    
  }

  return(
    <form onSubmit={salvarLink} className='flex flex-col gap-3'>
    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
      <Tag className='size-5 text-zinc-400' />
      <input 
        type="text"
        name='url_title'
        placeholder="Título do link"
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
    </div>

    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
      <Link className='size-5 text-zinc-400' />
      <input 
        type="url"
        name='url'
        placeholder="url"
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
    </div>

    <Button 
      variant="primary" 
      size="full" 
      type="submit"
    >
      Salvar link
    </Button>   

  </form>
  );
}