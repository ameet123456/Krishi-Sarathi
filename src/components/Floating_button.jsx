import { MessageCircle } from 'lucide-react';

function Floating_button() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-colors">
        <MessageCircle size={20} />
        <span className="font-medium">Sarathi</span>
      </button>
    </div>
  );
}

export default Floating_button;
