import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { CreateImportantLinksModal } from "./create-important-links-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Links {
  id: string;
  title: string;
  url: string
}[];

export function ImportantLinks() {
  const { tripId } = useParams();
  const [isCreateNewImportantLinkOpen, setIsCreateNewImportantLinkOpen] = useState(false);
  const [links, setLinks] = useState<Links[]>([]);
  const [isNewLink, setNewLink] = useState(false);

  function toggleCreateNewImportantLinkOpen() {
    setIsCreateNewImportantLinkOpen(linkModal => !linkModal);
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(res => setLinks(res.data.links));
  }, [tripId]);

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(res => setLinks(res.data.links));
    setNewLink(false);
  }, [isNewLink == true]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      {links.map(link => {
        return (
          <div key={link.id} className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <span className="block font-medium text-zinc-100">{ link.title }</span>
              <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                { link.url }
              </a>                 
            </div>
            <Link2 className='text-zinc-400 size-5' />
          </div>
        </div>
        )
      })}
      
      
      <Button 
        variant="secondary" 
        size="full"
        onClick={toggleCreateNewImportantLinkOpen}
      >
        <Plus className='size-5' />
        Cadastrar novo link
      </Button>

      {isCreateNewImportantLinkOpen && (
        <Modal
          modalTitle="Cadastrar link importante"
          toggleFunction={toggleCreateNewImportantLinkOpen}
          modalSize={540}
        >
          <CreateImportantLinksModal
            setNewLink={setNewLink}
            isNewLink={isNewLink}
            toggleCreateNewImportantLinkOpen={toggleCreateNewImportantLinkOpen}
          />
        </Modal>
      
      )}
    </div>
  );
}