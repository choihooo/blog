interface TagProps {
  text: string;
}

export const Tag = ({ text }: TagProps) => {
  return (
    <div className="bg-secondary text-secondary-foreground hover:bg-muted cursor-pointer rounded-[19px] px-2 py-2 text-[13px] select-none">
      {text}
    </div>
  );
}; 