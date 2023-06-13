import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function PokeStats({ pokeStats }: { pokeStats: pokeStats[] }) {
  console.log(pokeStats);

  const data = pokeStats?.length
    ? pokeStats.map((s) => {
        return {
          subject: s.stat.name.replace("-", " "),
          point: s.base_stat,
          fullMark: 250,
        }
      })
    : [];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#ffffff" />
        <PolarAngleAxis dataKey="subject" stroke="#ffffff" />
        <PolarRadiusAxis stroke="#ffffff" domain={[0, 255]}/>
        <Radar
          name="stats"
          dataKey="point"
          fill="#ffffff"
          fillOpacity={0.8}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
