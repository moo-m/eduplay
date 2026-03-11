// export default function StationCard({ station, status, onClick }) {
//   const statusBadge = {
//     locked: <span className="text-6xl opacity-70">🔒</span>,
//     completed: <p className="text-green-600 font-bold mt-3">✔ مكتملة</p>,
//     "in-progress": <p className="text-orange-500 font-bold mt-3">⏳ قيد الإنجاز</p>,
//   };

//   return (
//     <div
//       onClick={onClick}
//       className="relative w-40 sm:w-64 p-4 sm:p-6 rounded-3xl bg-white shadow-lg cursor-pointer transition transform hover:scale-105"
//     >
//       <div className="text-5xl text-center">{station.icon}</div>
//       <h3 className="text-lg sm:text-xl font-bold text-center mt-2 text-purple-800">
//         مهارة {station.name}
//       </h3>

//       {status === "locked" ? (
//         <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center rounded-3xl">
//           {statusBadge[status]}
//         </div>
//       ) : (
//         statusBadge[status]
//       )}
//     </div>
//   );
// }
export default function StationCard({ station, status, onClick }) {
    const statusBadge = {
        locked: <span className="text-5xl opacity-70">🔒</span>,
        completed: <p className="text-green-600 font-bold mt-3">✔ مكتملة</p>,
        "in-progress": (
            <p className="text-orange-500 font-bold mt-3">⏳ قيد الإنجاز</p>
        )
    };

    return (
        <div
            onClick={onClick}
            className="relative w-40 sm:w-64 p-4 sm:p-6 rounded-3xl bg-white shadow-lg cursor-pointer transition transform hover:scale-105"
        >
            <div className="text-5xl text-center">{station.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-center mt-2 text-purple-800">
                مهارة {station.name}
            </h3>

            {status === "locked" ? (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">
                    {statusBadge[status]}
                </div>
            ) : (
                statusBadge[status]
            )}
        </div>
    );
}
