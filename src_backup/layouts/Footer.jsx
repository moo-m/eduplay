export default function Footer({ text }) {
  return (
    <div className="text-center text-sm text-gray-700">
      {text || "المملكة الأردنية الهاشمية - وزارة التربية والتعليم"}
    </div>
  );
}