export default function Header({ title, subtitle }) {
  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-900">{title}</h1>
      {subtitle && <h2 className="text-xl md:text-2xl text-orange-600 mt-1 font-semibold">{subtitle}</h2>}
    </div>
  );
}