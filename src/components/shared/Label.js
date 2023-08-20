export const Label = ({ required, children }) => {
  if (required) {
    return (
      <label className="py-2">
        {children}&nbsp;<span className="text-red-500">*</span>
      </label>
    );
  }

  return <label className="py-2">{children}</label>;
};
