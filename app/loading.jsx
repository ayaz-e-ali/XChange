import { Loader } from 'lucide-react';
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Loader size={'2.5rem'} className='animate-spin ' />
    </div>
  );
}