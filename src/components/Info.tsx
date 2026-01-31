export interface IInfoProps {
  label: string;
  value: string;
}

const Info = ({ label, value }: IInfoProps) => {
  return (
    <div className="rounded-xl border p-3">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
};

export default Info;
