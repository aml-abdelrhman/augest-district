const data = [
  { label: "A Length (cm)", xs: 62, s: 64, m: 66, l: 70, xl: 72 },
  { label: "B 1/2 Chest (cm)", xs: 54, s: 56, m: 60, l: 70, xl: 72 },
  { label: "C Sleeve (cm)", xs: 41, s: 43, m: 45, l: 47, xl: 49 },
]

export default function SizeTable() {
  return (
    <div className="bg-[#161a23] rounded-xl p-8">

      <table className="w-full text-center">
        <thead>
          <tr className="text-gray-400">
            <th></th>
            <th>XS</th>
            <th>S</th>
            <th>M</th>
            <th>L</th>
            <th>XL</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.label} className="border-t border-gray-700">
              <td className="text-left py-4">{row.label}</td>
              <td>{row.xs}</td>
              <td>{row.s}</td>
              <td>{row.m}</td>
              <td>{row.l}</td>
              <td>{row.xl}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}