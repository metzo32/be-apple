import ButtonStrong from "../designs/ButtonStrong";
import ButtonBasic from "../designs/ButtonBasic";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  content: string;
  confirmBtnText: string;
}

export default function Modal({
  isModalOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  content,
  confirmBtnText,
}: ModalProps) {
  if (!isModalOpen) return null;

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div className="overlay z-50">
      <div className="w-[400px] h-[250px] p-10 rounded-xl bg-white flex flex-col justify-between items-center fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h3 className="text-3xl">{title}</h3>
        <p>{content}</p>
        <div className="flex gap-10">
          <ButtonBasic text="취소" onClick={handleCancel} />
          <ButtonStrong text={confirmBtnText} onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
