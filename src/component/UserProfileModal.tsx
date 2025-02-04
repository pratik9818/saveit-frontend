import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { isUserProfileModalOpen } from '../recoil/Store';
import LogoutButton from './LogoutButton';
import FeedbackFormButton from './FeedbackFormButton';


export default function UserProfileModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isUserProfileModalOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && !target.closest('.user-logo')) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div ref={modalRef} className="absolute rounded-sm bg-white p-3 flex flex-col items-center  justify-between z-1 w-[120px] border h-[100px] left-10 top-12">
     <FeedbackFormButton/>
     <LogoutButton/>
    </div>
  );
}
