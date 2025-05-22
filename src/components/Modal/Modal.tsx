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
  hideCancel?: boolean;
}

export default function Modal({
  isModalOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  content,
  confirmBtnText,
  hideCancel = false,
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
      <div className="w-[260px] h-[200px] md:w-[400px] md:h-[250px] px-6 py-8 md:p-10 rounded-xl bg-white flex flex-col justify-between items-center fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h3 className="text-base md:text-2xl">{title}</h3>
        <p className="text-xs md:text-sm text-center break-keep">{content}</p>
        <div className="flex gap-10">
          {!hideCancel && <ButtonBasic text="취소" onClick={handleCancel} />}
          <ButtonStrong text={confirmBtnText} onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
