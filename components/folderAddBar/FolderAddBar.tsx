import { ChangeEvent, FormEvent, useState } from "react";
import * as S from "@/components/folderAddBar/FolderAddBar.style";
import linkIcon from "@/images/link.png";
import ModalSelectButton from "../modalSelectButton/ModalSelectButton";
import Image from "next/image";
import { FolderAddBarProps } from "@/types/type";
import { MODALS_ID } from "@/constants/constants";
import Modal from "../modal/Modal";

const FolderAddBar = ({ folders, isSticky, isHidden }: FolderAddBarProps) => {
  const [addLinkValue, setAddLinkValue] = useState("");
  const [modalComponent, setModalComponent] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setAddLinkValue(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalComponent(MODALS_ID.addLinkToFolder);
  };

  return (
    <>
      <S.AddLinkBar $isSticky={isSticky} $isHidden={isHidden} aria-hidden={isHidden}>
        <S.AddLinkForm onSubmit={handleSubmit}>
          <Image src={linkIcon} alt="링크 아이콘" />
          <S.AddLinkInput placeholder="링크를 추가해 보세요" onChange={handleInputChange} value={addLinkValue} />
          <S.AddLinkButton>추가하기</S.AddLinkButton>
        </S.AddLinkForm>
      </S.AddLinkBar>
      {modalComponent === MODALS_ID.addLinkToFolder && (
        <Modal onClose={() => setModalComponent("")}>
          <Modal.Title>폴더에 추가</Modal.Title>
          <Modal.TargetName>{addLinkValue}</Modal.TargetName>
          <Modal.SelectButtonWrap>
            {folders?.map((folder) => (
              <li key={folder.id}>
                <ModalSelectButton folderName={folder.name} linkCount={folder.link.count} />
              </li>
            ))}
          </Modal.SelectButtonWrap>
          <Modal.BlueButton>추가하기</Modal.BlueButton>
        </Modal>
      )}
    </>
  );
};

export default FolderAddBar;
