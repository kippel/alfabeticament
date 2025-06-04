export const Divapp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="block w-1/2 py-10 text-center border lg:w-1/4">
      {children}
    </div>
  );
};
