import React from "react";
import Button from "../system/Button";

interface Props {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  onClick?(): void;
  children: React.ReactNode;
  buttonText: string;
}

export default function WriteForm({
  onSubmit,
  children,
  buttonText,
  onClick,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex">{children}</div>
      <div className="bg-white h-16 fixed bottom-0 w-full flex items-center justify-end px-3">
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
