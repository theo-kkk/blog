import React from "react";
import Button from "../system/Button";

interface Props {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  onClick?(): void;
  children: React.ReactNode;
  buttonText: string;
  closeAction?(): void;
}

export default function WriteForm({
  onSubmit,
  children,
  buttonText,
  onClick,
  closeAction,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="flex h-full">
      <div className="flex flex-1">{children}</div>
      <div className="bg-white h-16 fixed bottom-0 w-full flex items-center justify-end px-3 gap-3">
        <Button
          type="button"
          onClick={closeAction}
          className="text-lg bg-black text-white p-1 rounded-md disabled:bg-gray-500"
        >
          취소
        </Button>
        <Button
          type={onClick ? "button" : "submit"}
          onClick={onClick}
          className="text-lg bg-slate-400 text-white p-1 rounded-md disabled:bg-gray-500"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
