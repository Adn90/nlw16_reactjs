import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  modalTitle: string;
  toggleFunction: () => void;
  children: ReactNode;
  modalSize?: number;
}

export function Modal({
  modalTitle,
  toggleFunction,
  children,
  modalSize
}: ModalProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className={`w-[${modalSize}px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5`}>
        <div className='flex flex-col gap-2'> {/*  */}
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>{modalTitle}</h2>
            <button type='button' onClick={toggleFunction}>
              <X className='size-5 text-zinc-400'/>
            </button>
          </div>
        </div>
        { children }
      </div>
    </div>
  );
}