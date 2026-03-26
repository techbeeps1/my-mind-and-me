type Props = {
  width?: number;
  height?: number;
};

export default function LoadingSpin({ width = 5, height = 35 }: Props) {
  return (
    <div className="flex items-center">
      <span
        className="inline-block bg-white/50 rounded-[10px] animate-bar"
        style={{ width, height }}
      />
      <span
        className="inline-block mx-[5px] bg-white/50 rounded-[10px] animate-bar delay-[0.25s]"
        style={{ width, height: height + height / 1.8 }}
      />
      <span
        className="inline-block bg-white/50 rounded-[10px] animate-bar delay-[0.5s]"
        style={{ width, height }}
      />
    </div>
  );
}