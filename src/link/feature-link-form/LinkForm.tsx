import { Folder } from "folder/data-access-folder";
import { AddLinkModal } from "link/ui-add-link-modal";
import { LinkForm as UiLinkForm } from "link/ui-link-form";
import { KeyboardEvent, useState } from "react";

interface LinkFormProps {
  folders: Folder[];
  isSticky: boolean;
  isHidden: boolean;
}

export const LinkForm = ({ folders, isSticky, isHidden }: LinkFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(0);
  const closeModal = () => {
    setSelectedFolderId(0);
    setIsModalOpen(false);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  return (
    <>
      <UiLinkForm isSticky={isSticky} isHidden={isHidden} onSubmit={() => setIsModalOpen(true)} />
      <AddLinkModal
        isOpen={isModalOpen}
        folders={folders}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
        onAddClick={() => {}}
        onCloseClick={closeModal}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};
