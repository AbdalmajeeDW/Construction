export function InputField({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}