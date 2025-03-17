interface TagProps {
  text: string;
}

export const Tag = ({ text }: TagProps) => {
  return (
    <div className="cursor-pointer rounded-[19px] bg-[#f2f4f6] px-2 py-2 text-[13px] text-[#4e5968] select-none hover:bg-[#e5e8eb]">
      {text}
    </div>
  );
};
