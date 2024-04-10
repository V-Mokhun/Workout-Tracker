interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <header className="py-4">
      <div className="max-w-screen px-4 mx-auto">
        <div className="flex justify-between items-center gap-4">Header</div>
      </div>
    </header>
  );
};
